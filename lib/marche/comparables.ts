/* ============================================================
 * NESTA — Système Marché : comparables façon courtier.
 *
 * Un courtier établit son prix d'opinion avec des comparables :
 * des biens semblables (même secteur, même type, taille proche).
 * Ici les comparables sont tirés du rôle d'évaluation (données
 * publiques) : chacun est valorisé avec la même méthode que le
 * bien étudié (rôle × facteur × ajustement marché), puis la
 * médiane des comparables sert de garde-fou.
 *
 * Limite honnête : ce sont des valeurs au rôle ajustées, PAS des
 * prix vendus (données Centris réservées aux courtiers). Le
 * système le dit explicitement dans la méthode du prix.
 * ============================================================ */

import {
  chargerIndexVille,
  getFacteur,
  loadFactors,
  seuilCondoM2,
  categorieDeTidx,
  type CategorieBien,
} from "./donnees";
import { ratioMarche } from "./indice";
import type { VilleSlug } from "../estimation/villes";

export interface Comparable {
  /** Clé d'adresse normalisée au rôle. */
  cleAdresse: string;
  /** Valeur marchande estimée du comparable ($, même méthode). */
  valeurEstimee: number;
  superficieBatimentM2: number;
  anneeConstruction: number;
}

interface EntreePool {
  bIdx: number;
  tIdx: number;
  supB: number;
  val: number;
  annee: number;
  cle: string;
}

/** Pool allégé par ville, construit une fois par processus serveur. */
const pools = new Map<VilleSlug, EntreePool[]>();

function construirePool(ville: VilleSlug): EntreePool[] {
  const { map } = chargerIndexVille(ville);
  const pool: EntreePool[] = [];
  for (const cle of Object.keys(map)) {
    if (cle.includes("|")) continue; // adresses de base seulement
    const fiches = map[cle];
    // Fiche médiane — même règle que le moteur d'estimation.
    const vals = fiches
      .map((r) => r[6])
      .filter((v) => v > 0)
      .sort((a, b) => a - b);
    if (vals.length === 0) continue;
    const med = vals[Math.floor(vals.length / 2)];
    const rec = fiches.find((r) => r[6] === med) ?? fiches[0];
    const supB = rec[3];
    if (supB <= 0) continue;
    pool.push({
      bIdx: rec[0],
      tIdx: rec[1],
      supB,
      val: med,
      annee: rec[4],
      cle,
    });
  }
  return pool;
}

function poolVille(ville: VilleSlug): EntreePool[] {
  let pool = pools.get(ville);
  if (!pool) {
    pool = construirePool(ville);
    pools.set(ville, pool);
  }
  return pool;
}

/**
 * Sélectionne jusqu'à `n` comparables : même secteur (bIdx),
 * même type de bien (règle aveugle condo < 150 m² incluse),
 * superficie du bâtiment à ±30 %. Triés par proximité de taille.
 */
export function comparablesProches(
  ville: VilleSlug,
  bIdx: number,
  categorie: CategorieBien,
  supBSujet: number,
  cleExclue: string | undefined,
  moisDe: string,
  moisVers: string,
  n = 12,
): Comparable[] {
  const pool = poolVille(ville);
  const seuil = seuilCondoM2();
  const factors = loadFactors();
  const ratio = ratioMarche(moisDe, moisVers);

  const tIdxVoulu =
    categorie === "terrain"
      ? 0
      : categorie === "maison" || categorie === "condo"
        ? 1
        : categorie === "multi"
          ? 2
          : categorie === "plex"
            ? 3
            : 4;

  const candidats: { e: EntreePool; score: number }[] = [];
  for (const e of pool) {
    if (e.bIdx !== bIdx) continue;
    if (e.tIdx !== tIdxVoulu) continue;
    if (cleExclue && e.cle === cleExclue) continue;
    // Règle aveugle : les « maisons » de < 150 m² sont des condos.
    if (tIdxVoulu === 1) {
      if (categorie === "condo" && e.supB >= seuil) continue;
      if (categorie === "maison" && e.supB < seuil) continue;
    }
    let score: number;
    if (supBSujet > 0) {
      const ecart = Math.abs(e.supB - supBSujet) / supBSujet;
      if (ecart > 0.3) continue;
      score = ecart;
    } else {
      score = 0;
    }
    candidats.push({ e, score });
  }
  candidats.sort((a, b) => a.score - b.score);

  return candidats.slice(0, n).map(({ e }) => {
    const cat =
      e.tIdx === 1 && e.supB < seuil ? "condo" : categorieDeTidx(e.tIdx);
    const facteur = getFacteur(factors, ville, e.bIdx, cat);
    return {
      cleAdresse: e.cle,
      valeurEstimee: Math.round(e.val * facteur * ratio),
      superficieBatimentM2: e.supB,
      anneeConstruction: e.annee,
    };
  });
}
