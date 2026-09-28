/* ============================================================
 * NESTA — Estimation : moteur centralisé d'évaluation indicative.
 *
 * C'est LE point d'entrée unique pour toute évaluation immobilière
 * sur le site, côté vendeur comme côté acheteur :
 *
 *   import { estimate, suggestAddresses } from "@/lib/estimation";
 *
 *   const r = estimate({ ville: "montreal", adresse: "2219 rue Duvernay" });
 *   if (r.found) console.log(r.estimation, r.fourchetteBasse, r.fourchetteHaute);
 *
 * Méthode (identique au prototype validé par Merouane) :
 *   estimation  = valeur au rôle × facteur de marché (calibré APCIQ)
 *   fourchette  = ±12 % autour de la valeur centrale
 *   condo < 150 m² → facteur condo, sinon facteur maison
 *
 * Données : rôles d'évaluation foncière officiels (MAMH, Données Québec,
 * CC-BY 4.0), index compressés dans data/estimation/. Chaque index de
 * ville est chargé à la demande (gzip → mémoire) puis mis en cache
 * pour la durée de vie du processus serveur.
 *
 * Les valeurs produites sont INDICATIVES et ne constituent en aucun
 * cas une évaluation agréée (OEAQ).
 * ============================================================ */

import { gunzipSync } from "node:zlib";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  normalizeAddress,
  normalizeSuite,
  stripParticules,
} from "./normalize";
import { getVille, type VilleSlug } from "./villes";

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

const TYPES = ["terrain", "maison", "multi", "plex", "commercial"] as const;

export type CategorieBien =
  | "terrain"
  | "maison"
  | "condo"
  | "plex"
  | "multi"
  | "commercial";

export interface EstimateInput {
  ville: VilleSlug;
  /** Adresse en saisie libre, ex. "2219 rue Duvernay" */
  adresse: string;
  /** Numéro d'appartement/bureau, ex. "201" (optionnel) */
  suite?: string;
  /**
   * Type de bien connu (optionnel). Quand il est fourni, la sélection
   * des fiches et le facteur suivent exactement la méthodologie de
   * validation (type d'annonce connu) :
   * - "condo"  : fiches de < 150 m² → facteur condo, sinon repli
   *              « maison » (grands condos) ;
   * - "maison" : fiches maison non marquées condo → facteur maison.
   * Sans type, la règle aveugle documentée s'applique :
   * fiche « maison » de < 150 m² → facteur condo, sinon son type.
   */
  typeBien?: CategorieBien;
}

export interface EstimateSuccess {
  found: true;
  ville: VilleSlug;
  villeNom: string;
  /** Clé d'index effectivement appariée, ex. "2219 R DUVERNAY" */
  cleAppariee: string;
  adresseNormalisee: string;
  /** Type de bien demandé (le cas échéant) */
  typeBienDemande?: CategorieBien;
  categorie: CategorieBien;
  facteur: number;
  valeurAuRole: number;
  /** Valeur centrale estimée ($) */
  estimation: number;
  fourchetteBasse: number;
  fourchetteHaute: number;
  superficieTerrainM2: number;
  superficieBatimentM2: number;
  anneeConstruction: number;
  nbLogements: number;
  /** Nombre de fiches à cette adresse (sans n° de suite) */
  nbFichesAdresse: number;
  /** Précision sur un repli de règle (ex. grand condo classé maison) */
  note?: string;
  arrondissement?: string;
  millesimeRole: string;
  dateReferenceMarche: string;
  avertissement: string;
}

export interface EstimateNotFound {
  found: false;
  reason: "adresse_invalide" | "adresse_introuvable";
  cleNormalisee?: string;
}

export type EstimateResult = EstimateSuccess | EstimateNotFound;

/* ---------- Chargement des données ---------- */

const DATA_DIR = join(process.cwd(), "data", "estimation");

interface FactorsFile {
  version: string;
  fourchette_pct: number;
  seuil_condo_m2: number;
  villes: Record<
    string,
    {
      nom: string;
      millesime_role: string;
      date_reference_marche_role: string;
      granularite_facteurs: "arrondissement" | "ville";
      facteurs?: Record<CategorieBien, number>;
      facteurs_par_arrondissement?: Record<string, Record<CategorieBien, number>>;
      boroughs_bidx?: string[];
    }
  >;
}

let factorsCache: FactorsFile | null = null;

function loadFactors(): FactorsFile {
  if (!factorsCache) {
    const raw = readFileSync(join(DATA_DIR, "factors.json"), "utf-8");
    factorsCache = JSON.parse(raw) as FactorsFile;
  }
  return factorsCache;
}

interface CityIndex {
  map: Record<string, IndexRecord[]>;
  sortedKeys: string[];
}

const indexCache = new Map<VilleSlug, CityIndex>();

function loadIndex(ville: VilleSlug): CityIndex {
  const cached = indexCache.get(ville);
  if (cached) return cached;
  const gz = readFileSync(join(DATA_DIR, `index-${ville}.json.gz`));
  const map = JSON.parse(gunzipSync(gz).toString("utf-8")) as Record<
    string,
    IndexRecord[]
  >;
  const sortedKeys = Object.keys(map).sort();
  const idx: CityIndex = { map, sortedKeys };
  indexCache.set(ville, idx);
  return idx;
}

/* ---------- Moteur ---------- */

const AVERTISSEMENT =
  "Estimation indicative calculée à partir du rôle d'évaluation foncière et des prix de vente médians du marché. Elle ne constitue pas une évaluation agréée et ne remplace pas l'avis d'un évaluateur agréé.";

function getFacteur(
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

/**
 * Apparie une adresse à une fiche du rôle d'évaluation, puis calcule
 * l'estimation. Ne lance jamais d'exception pour un cas métier
 * (adresse invalide / introuvable → { found: false }).
 */
export function estimate(input: EstimateInput): EstimateResult {
  const factors = loadFactors();
  const ville = getVille(input.ville);
  const { map } = loadIndex(input.ville);

  const baseKey = normalizeAddress(input.adresse);
  if (!baseKey) return { found: false, reason: "adresse_invalide" };

  // 1) avec la suite d'abord, 2) sans la suite, 3) variantes sans particules
  const candidates: string[] = [];
  if (input.suite && normalizeSuite(input.suite)) {
    candidates.push(`${baseKey}|APT ${normalizeSuite(input.suite)}`);
  }
  candidates.push(baseKey);
  const stripped = stripParticules(baseKey);
  if (stripped && stripped !== baseKey) {
    if (input.suite && normalizeSuite(input.suite)) {
      candidates.push(`${stripped}|APT ${normalizeSuite(input.suite)}`);
    }
    candidates.push(stripped);
  }

  let cleAppariee: string | null = null;
  let fiches: IndexRecord[] | undefined;
  for (const c of candidates) {
    const hit = map[c];
    if (hit && hit.length > 0) {
      cleAppariee = c;
      fiches = hit;
      break;
    }
  }
  if (!cleAppariee || !fiches) {
    return {
      found: false,
      reason: "adresse_introuvable",
      cleNormalisee: baseKey,
    };
  }

  // Plusieurs fiches à la même adresse : on constitue le sous-ensemble
  // pertinent (méthodologie de validation), puis on retient la valeur
  // médiane haute — déterministe et robuste aux extrêmes.
  const seuil = factors.seuil_condo_m2;
  let pool = fiches;
  let note: string | undefined;
  const typeBien = input.typeBien;

  if (typeBien === "condo") {
    const petits = fiches.filter((r) => r[3] > 0 && r[3] < seuil);
    if (petits.length > 0) {
      pool = petits;
    } else {
      const maisons = fiches.filter((r) => TYPES[r[1]] === "maison");
      pool = maisons.length > 0 ? maisons : fiches;
      note = "Aucune unité de moins de 150 m² : classé « maison ».";
    }
  } else if (typeBien) {
    const filtres =
      typeBien === "maison"
        ? fiches.filter((r) => TYPES[r[1]] === "maison" && !(r[7] & 1))
        : fiches.filter((r) => TYPES[r[1]] === typeBien);
    if (filtres.length > 0) {
      pool = filtres;
    } else {
      const maisons = fiches.filter((r) => TYPES[r[1]] === "maison");
      pool = maisons.length > 0 ? maisons : fiches;
    }
  }

  const valsTriees = pool
    .map((r) => r[6])
    .filter((v) => v > 0)
    .sort((a, b) => a - b);
  const valRef =
    valsTriees.length > 0
      ? valsTriees[Math.floor(valsTriees.length / 2)]
      : pool[0]?.[6] ?? 0;
  const rec = pool.find((r) => r[6] === valRef) ?? pool[0];
  const [bIdx, tIdx, supT, supB, annee, nblog] = rec;
  const val = valRef;

  // Catégorie → facteur. Règle aveugle documentée : une fiche « maison »
  // de moins de 150 m² est traitée comme un condo (petites copropriétés
  // non marquées au rôle) ; au-delà, c'est le type du rôle qui compte.
  // Le drapeau condo du rôle ne sert qu'à la calibration, pas au calcul.
  let categorie: CategorieBien;
  if (typeBien === "condo" && !note) {
    categorie = "condo";
  } else if (typeBien && typeBien !== "condo") {
    categorie = typeBien;
  } else if (typeBien === "condo" /* repli */) {
    categorie = "maison";
  } else {
    categorie =
      TYPES[tIdx] === "maison" && supB > 0 && supB < seuil
        ? "condo"
        : (TYPES[tIdx] ?? "maison");
  }

  const facteur = getFacteur(factors, input.ville, bIdx, categorie);
  const estimation = Math.round(val * facteur);
  const pct = factors.fourchette_pct / 100;

  return {
    found: true,
    ville: input.ville,
    villeNom: ville.nom,
    cleAppariee,
    adresseNormalisee: baseKey,
    ...(typeBien ? { typeBienDemande: typeBien } : {}),
    categorie,
    facteur,
    valeurAuRole: val,
    estimation,
    fourchetteBasse: Math.round(estimation * (1 - pct)),
    fourchetteHaute: Math.round(estimation * (1 + pct)),
    superficieTerrainM2: supT,
    superficieBatimentM2: supB,
    anneeConstruction: annee,
    nbLogements: nblog,
    nbFichesAdresse: fiches.length,
    ...(note ? { note } : {}),
    ...(input.ville === "montreal"
      ? {
          arrondissement:
            factors.villes.montreal.boroughs_bidx?.[bIdx] ?? undefined,
        }
      : {}),
    millesimeRole: ville.millesimeRole,
    dateReferenceMarche: ville.dateReferenceMarche,
    avertissement: AVERTISSEMENT,
  };
}

/**
 * Suggestions d'autocomplétion pour un champ d'adresse
 * (recherche par préfixe sur les clés normalisées, via dichotomie).
 */
export function suggestAddresses(
  ville: VilleSlug,
  query: string,
  limit = 8,
): string[] {
  const prefix = normalizeAddress(query);
  if (!prefix || prefix.length < 2) return [];
  const { sortedKeys } = loadIndex(ville);
  let lo = 0;
  let hi = sortedKeys.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (sortedKeys[mid] < prefix) lo = mid + 1;
    else hi = mid;
  }
  const out: string[] = [];
  for (let i = lo; i < sortedKeys.length && out.length < limit; i++) {
    const k = sortedKeys[i];
    if (!k.startsWith(prefix)) break;
    out.push(k);
  }
  return out;
}
