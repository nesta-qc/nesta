/* ============================================================
 * VEYLA — Système Marché : accès aux données de référence.
 *
 * Regroupe les primitives de lecture partagées par le moteur
 * d'estimation (lib/estimation) et le moteur de prix de marché
 * (lib/marche/moteur) : facteurs de calibration, index des rôles
 * d'évaluation foncière par ville.
 *
 * Données : rôles d'évaluation foncière officiels (MAMH, Données
 * Québec, CC-BY 4.0), index compressés dans data/estimation/.
 * Chaque index de ville est chargé à la demande (gzip → mémoire)
 * puis mis en cache pour la durée de vie du processus serveur.
 * ============================================================ */

import { gunzipSync } from "node:zlib";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { VilleSlug } from "../estimation/villes";

/* ---------- Types ---------- */

/**
 * Fiche d'index : [b_idx, t_idx, supT, supB, annee, nblog, val, flags, civfin]
 *  b_idx : indice d'arrondissement (Montréal ; 0 ailleurs)
 *  t_idx : 0=terrain 1=maison 2=multi 3=plex 4=commercial
 *  supT  : superficie du terrain (m²)
 *  supB  : superficie du bâtiment (m²)
 *  val   : valeur de l'immeuble au rôle ($)
 *  flags : bit 1 = condo
 */
export type IndexRecord = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export const TYPES = [
  "terrain",
  "maison",
  "multi",
  "plex",
  "commercial",
] as const;

export type CategorieBien =
  | "terrain"
  | "maison"
  | "condo"
  | "plex"
  | "multi"
  | "commercial";

/** t_idx → catégorie de rôle correspondante. */
export function categorieDeTidx(tIdx: number): CategorieBien {
  return (TYPES[tIdx] ?? "maison") as CategorieBien;
}

/* ---------- Facteurs de calibration ---------- */

const DATA_DIR = join(process.cwd(), "data", "estimation");

export interface FactorsFile {
  version: string;
  /** Référence de marché de la calibration, ex. "T2 2026" (APCIQ). */
  reference_marche: string;
  fourchette_pct: number;
  seuil_condo_m2: number;
  /**
   * Plafond du taux annuel utilisé pour les projections (+3/+5 ans).
   * Le taux implicite de la calibration mesure le rattrapage entre la
   * date de référence du rôle (2022-2024 selon la ville) et le marché
   * T2 2026 — une période de forte croissance qu'il serait
   * irresponsable de prolonger telle quelle. La projection compose
   * donc avec min(taux implicite, plafond), un scénario tendanciel
   * amorti.
   */
  plafond_taux_projection: number;
  villes: Record<
    string,
    {
      nom: string;
      millesime_role: string;
      date_reference_marche_role: string;
      granularite_facteurs: "arrondissement" | "ville";
      facteurs?: Record<CategorieBien, number>;
      facteurs_par_arrondissement?: Record<
        string,
        Record<CategorieBien, number>
      >;
      boroughs_bidx?: string[];
    }
  >;
}

let factorsCache: FactorsFile | null = null;

export function loadFactors(): FactorsFile {
  if (!factorsCache) {
    const raw = readFileSync(join(DATA_DIR, "factors.json"), "utf-8");
    factorsCache = JSON.parse(raw) as FactorsFile;
  }
  return factorsCache;
}

export function getFacteur(
  factors: FactorsFile,
  ville: VilleSlug,
  bIdx: number,
  categorie: CategorieBien,
): number {
  const v = factors.villes[ville];
  if (!v) throw new Error(`Facteurs manquants pour la ville : ${ville}`);
  if (v.granularite_facteurs === "arrondissement") {
    const borough = v.boroughs_bidx?.[bIdx];
    const f = borough
      ? v.facteurs_par_arrondissement?.[borough]?.[categorie]
      : undefined;
    if (typeof f !== "number")
      throw new Error(`Facteur manquant : ${borough ?? "?"} / ${categorie}`);
    return f;
  }
  const f = v.facteurs?.[categorie];
  if (typeof f !== "number")
    throw new Error(`Facteur manquant : ${ville} / ${categorie}`);
  return f;
}

/** Seuil (m²) sous lequel une fiche « maison » est traitée comme un condo. */
export function seuilCondoM2(): number {
  return loadFactors().seuil_condo_m2;
}

/* ---------- Index des rôles par ville ---------- */

export interface CityIndex {
  map: Record<string, IndexRecord[]>;
  sortedKeys: string[];
  /** Noms de rues normalisés triés ("R SAINT-DENIS"), pour la recherche sans numéro civique. */
  streets: string[];
  /** rue normalisée → indices dans sortedKeys (toutes les adresses de la rue). */
  streetKeys: Map<string, number[]>;
}

const indexCache = new Map<VilleSlug, CityIndex>();

export function chargerIndexVille(ville: VilleSlug): CityIndex {
  const cached = indexCache.get(ville);
  if (cached) return cached;
  const gz = readFileSync(join(DATA_DIR, `index-${ville}.json.gz`));
  const map = JSON.parse(gunzipSync(gz).toString("utf-8")) as Record<
    string,
    IndexRecord[]
  >;
  const sortedKeys = Object.keys(map).sort();
  // Index des rues : nom normalisé → adresses. Dérivé des clés, sans
  // toucher aux fichiers d'index. Sert la recherche par nom de rue
  // ("saint-denis") quand l'utilisateur tape sans numéro civique.
  const streetKeys = new Map<string, number[]>();
  for (let i = 0; i < sortedKeys.length; i++) {
    const key = sortedKeys[i];
    const base = key.includes("|") ? key.slice(0, key.indexOf("|")) : key;
    const sp = base.indexOf(" ");
    if (sp < 0) continue;
    const street = base.slice(sp + 1);
    const arr = streetKeys.get(street);
    if (arr) arr.push(i);
    else streetKeys.set(street, [i]);
  }
  const idx: CityIndex = {
    map,
    sortedKeys,
    streets: [...streetKeys.keys()].sort(),
    streetKeys,
  };
  indexCache.set(ville, idx);
  return idx;
}
