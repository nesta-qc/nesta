/* ============================================================
 * NESTA — Système Marché : moteur de prix façon courtier.
 *
 * C'est le « courtier algorithmique » de NESTA : pour un bien, il
 * établit un prix d'opinion comme le ferait une firme de courtage —
 * dossier d'évaluation structuré, pas un chiffre sorti d'un
 * chapeau :
 *
 *   1. Base : valeur au rôle × facteur calibré (par secteur et par
 *      type de bien, version du modèle tracée).
 *   2. Datation : le prix est ramené au mois courant via l'indice
 *      mensuel du marché (le système « suit le cours du marché »).
 *   3. Comparables : biens semblables au rôle, valorisés avec la
 *      même méthode ; leur médiane valide ou élargit la fourchette.
 *   4. Confiance : haute / moyenne / faible selon la convergence
 *      des comparables et leur nombre.
 *
 * Limites affichées au client : estimation indicative (jamais une
 * évaluation agréée OEAQ) ; les comparables sont des valeurs au
 * rôle ajustées, pas des prix vendus (données Centris réservées
 * aux courtiers détenant un contrat de données).
 * ============================================================ */

import {
  getFacteur,
  loadFactors,
  type CategorieBien,
} from "./donnees";
import { moisLePlusRecent, ratioMarche } from "./indice";
import { versionActive } from "./registre";
import { comparablesProches, type Comparable } from "./comparables";
import { getVille, type VilleSlug } from "../estimation/villes";

export type ConfiancePrix = "haute" | "moyenne" | "faible";

/** Langue du dossier d'évaluation généré (étapes de la méthode). */
export type LangueMarche = "fr" | "en";

export interface EntreePrixMarche {
  ville: VilleSlug;
  /** Indice d'arrondissement (Montréal ; 0 ailleurs). */
  bIdx: number;
  categorie: CategorieBien;
  /** Valeur au rôle du bien ($). */
  valeurAuRole: number;
  /** Superficie du bâtiment (m²), 0 si inconnue. */
  superficieBatimentM2: number;
  /** Clé d'adresse du bien (exclue de ses propres comparables). */
  cleAdresse?: string;
}

export interface PrixMarche {
  /** Prix d'opinion central ($). */
  prix: number;
  bas: number;
  haut: number;
  facteur: number;
  /** Ajustement marché appliqué (%, ex. +2,4). */
  ajustementMarchePct: number;
  /** Mois auquel le prix est établi ("2026-10"). */
  moisPrix: string;
  /** Mois de référence de la calibration ("2026-06"). */
  moisReference: string;
  confiance: ConfiancePrix;
  nbComparables: number;
  /** Écart médiane des comparables vs prix (%), null si < 3 comparables. */
  ecartComparablesPct: number | null;
  comparables: Comparable[];
  versionModele: string;
  /** Déroulé de la méthode, lisible par le client. */
  methode: string[];
}

const fmtCache = new Map<string, Intl.NumberFormat>();
function fmtDevise(langue: LangueMarche): Intl.NumberFormat {
  let f = fmtCache.get(langue);
  if (!f) {
    f = new Intl.NumberFormat(langue === "en" ? "en-CA" : "fr-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    });
    fmtCache.set(langue, f);
  }
  return f;
}

function mediane(vals: number[]): number {
  const t = [...vals].sort((a, b) => a - b);
  return t[Math.floor(t.length / 2)];
}

const CONFIANCE: Record<LangueMarche, Record<ConfiancePrix, string>> = {
  fr: { haute: "haute", moyenne: "moyenne", faible: "faible" },
  en: { haute: "high", moyenne: "medium", faible: "low" },
};

function libelleMoisLocal(mois: string, langue: LangueMarche): string {
  const NOMS: Record<LangueMarche, string[]> = {
    fr: [
      "janv.", "févr.", "mars", "avr.", "mai", "juin",
      "juil.", "août", "sept.", "oct.", "nov.", "déc.",
    ],
    en: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
  };
  const [a, m] = mois.split("-").map(Number);
  if (!a || !m || m < 1 || m > 12) return mois;
  return langue === "en" ? `${NOMS.en[m - 1]} ${a}` : `${NOMS.fr[m - 1]} ${a}`;
}

function nomZone(ville: VilleSlug, bIdx: number): string {
  const factors = loadFactors();
  const v = factors.villes[ville];
  if (v.granularite_facteurs === "arrondissement") {
    return v.boroughs_bidx?.[bIdx] ?? getVille(ville).nom;
  }
  return getVille(ville).nom;
}

/**
 * Établit le prix de marché d'un bien. Ne lance jamais d'exception
 * pour un cas métier (l'appelant a déjà validé l'adresse) ; les
 * erreurs de données (facteur manquant, indice vide) remontent.
 */
export function prixMarche(
  entree: EntreePrixMarche,
  langue: LangueMarche = "fr",
): PrixMarche {
  const modele = versionActive();
  const factors = loadFactors();
  const facteur = getFacteur(factors, entree.ville, entree.bIdx, entree.categorie);

  // 1. Base : rôle × facteur calibré.
  const base = entree.valeurAuRole * facteur;

  // 2. Datation au mois courant via l'indice du marché.
  const moisPrix = moisLePlusRecent();
  const ratio = ratioMarche(modele.moisReferenceMarche, moisPrix);
  const ajustementMarchePct = Math.round((ratio - 1) * 1000) / 10;
  const prixAjuste = base * ratio;

  // 3. Comparables : garde-fou façon courtier.
  const comps = comparablesProches(
    entree.ville,
    entree.bIdx,
    entree.categorie,
    entree.superficieBatimentM2,
    entree.cleAdresse,
    modele.moisReferenceMarche,
    moisPrix,
    12,
  );

  let pctFourchette = 0.12;
  let confiance: ConfiancePrix = "moyenne";
  let ecartComparablesPct: number | null = null;
  let medComparables: number | null = null;
  if (comps.length >= 3) {
    medComparables = mediane(comps.map((c) => c.valeurEstimee));
    const ecart = Math.abs(medComparables - prixAjuste) / prixAjuste;
    ecartComparablesPct = Math.round(ecart * 1000) / 10;
    // Le ±12 % est le plancher validé par les tests à l'aveugle : les
    // comparables ne le resserrent jamais, ils ne font que l'élargir
    // (prudence) quand ils divergent du prix de base.
    if (ecart <= 0.08) {
      pctFourchette = 0.12;
      confiance = "haute";
    } else if (ecart <= 0.15) {
      pctFourchette = 0.12;
      confiance = "moyenne";
    } else {
      pctFourchette = 0.18;
      confiance = "faible";
    }
  } else {
    // Trop peu de comparables : on reste prudent.
    pctFourchette = 0.15;
    confiance = "moyenne";
  }

  const prix = Math.round(prixAjuste);
  const signe = ajustementMarchePct >= 0 ? "+" : "";
  const zone = nomZone(entree.ville, entree.bIdx);
  const fmt$ = fmtDevise(langue);
  const pctTxt = String(ajustementMarchePct).replace(".", langue === "en" ? "." : ",");
  const ecartTxt =
    ecartComparablesPct === null
      ? null
      : String(ecartComparablesPct).replace(".", langue === "en" ? "." : ",");
  const confTxt = CONFIANCE[langue][confiance];
  const moisRefTxt = libelleMoisLocal(modele.moisReferenceMarche, langue);
  const moisPrixTxt = libelleMoisLocal(moisPrix, langue);
  const fourchetteTxt = `±${Math.round(pctFourchette * 100)}${langue === "en" ? "%" : " %"}`;

  const methode: string[] =
    langue === "en"
      ? [
          `Assessed value ${fmt$.format(entree.valeurAuRole)} × ${entree.categorie} factor (${zone}) ${facteur} — ${factors.reference_marche} market calibration.`,
          `Market adjustment: ${signe}${pctTxt}% (${moisRefTxt} → ${moisPrixTxt} index).`,
          ...(medComparables !== null
            ? [
                `${comps.length} similar roll-based comparables (median ${fmt$.format(medComparables)}, spread ${ecartTxt}%) — ${fourchetteTxt} range, ${confTxt} confidence.`,
              ]
            : [
                `Too few comparables (${comps.length}): ${fourchetteTxt} range as a precaution, ${confTxt} confidence.`,
              ]),
          `Model ${modele.version} — indicative estimate, not a certified appraisal.`,
        ]
      : [
          `Valeur au rôle ${fmt$.format(entree.valeurAuRole)} × facteur ${entree.categorie} (${zone}) ${facteur} — calibration marché ${factors.reference_marche}.`,
          `Ajustement marché : ${signe}${pctTxt} % (indice ${moisRefTxt} → ${moisPrixTxt}).`,
          ...(medComparables !== null
            ? [
                `${comps.length} comparables similaires au rôle (médiane ${fmt$.format(medComparables)}, écart ${ecartTxt} %) — fourchette ${fourchetteTxt}, confiance ${confTxt}.`,
              ]
            : [
                `Comparables insuffisants (${comps.length}) : fourchette ${fourchetteTxt} par prudence, confiance ${confTxt}.`,
              ]),
          `Modèle ${modele.version} — estimation indicative, pas une évaluation agréée.`,
        ];

  return {
    prix,
    bas: Math.round(prix * (1 - pctFourchette)),
    haut: Math.round(prix * (1 + pctFourchette)),
    facteur,
    ajustementMarchePct,
    moisPrix,
    moisReference: modele.moisReferenceMarche,
    confiance,
    nbComparables: comps.length,
    ecartComparablesPct,
    comparables: comps,
    versionModele: modele.version,
    methode,
  };
}
