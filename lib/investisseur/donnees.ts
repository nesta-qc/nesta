/* ============================================================
 * VEYLA — Investisseur : données de marché locatif de référence.
 *
 * Données PUBLIÉES et SOURCÉES uniquement : jamais de chiffre
 * inventé. Chaque entrée porte sa source, sa période et sa
 * granularité (RMR / ville). Ces références servent à ESTIMER
 * un loyer de marché quand les loyers réels du bien sont inconnus —
 * l'interface l'indique explicitement et laisse modifier.
 *
 * Référence : recherche du 3 octobre 2026 (rapport du sous-agent).
 * La veille hebdo signale les nouveaux rapports SCHL/SHQ.
 * ============================================================ */

export type VilleInvestisseur =
  | "montreal"
  | "quebec"
  | "laval"
  | "gatineau"
  | "longueuil"
  | "brossard"
  | "terrasse-vaudreuil"
  | "levis";

export interface LoyersVille {
  ville: VilleInvestisseur;
  /** Nom de la RMR de référence. */
  rmr: string;
  /** Loyer mensuel de référence ($), par type de logement. */
  loyersMensuels: {
    studio: number;
    unChambre: number;
    deuxChambres: number;
    troisChambresPlus: number;
  };
  /** Source affichée dans l'interface (avec granularité). */
  sourceLoyers: string;
  /** Période des données, ex. "2025", "oct. 2025". */
  periodeLoyers: string;
  /** Taux d'inoccupation (%), même marché. */
  inoccupationPct: number;
  sourceInoccupation: string;
}

export interface FiscaliteVille {
  ville: VilleInvestisseur;
  /** Taxe foncière municipale, $ par 100 $ d'évaluation (taux vérifié). */
  tauxMunicipalPar100: number;
  /** Taux 6 logements et plus, si publié (sinon = tauxMunicipalPar100). */
  tauxMunicipal6LogementsPar100: number;
  /** Taxe scolaire ($/100 $) — 0 si non vérifiée, voir commentaire. */
  tauxScolairePar100: number;
  source: string;
  annee: number;
  /** true si le taux municipal est un taux officiel vérifié. */
  verifie: boolean;
}

/** Taux hypothécaire 5 ans fixe indicatif par défaut (%, modifiable). */
export const TAUX_HYPOTHECAIRE_DEFAUT_PCT = 4.59; // Nesto, meilleurs taux affichés, 2 oct. 2026

/**
 * Taux de taxe total par défaut quand le taux officiel de la ville
 * n'est pas vérifié (%, municipal + scolaire). Estimation prudente
 * documentée comme telle — l'interface laisse ajuster.
 */
export const TAUX_TAXE_DEFAUT_PCT = 1.0;

/* ------------------------------------------------------------
 * Loyers — SHQ « Loyers médians du marché » (LMM) 2025 pour les
 * RMR de Montréal et Québec (médianes ajustées, par chambre :
 * seule source officielle avec le détail par chambre pour ces
 * RMR) ; SCHL marché primaire (moyennes, oct. 2025) pour Gatineau.
 * Inoccupation : SCHL, mise à jour de mi-année (juin 2026).
 * ------------------------------------------------------------ */

const SHQ_2025 = "SHQ — Loyers médians du marché (LMM) 2025";
const SCHL_LOC_2025 = "SCHL — Rapport sur le marché locatif, oct. 2025";
const SCHL_MI_2026 = "SCHL — Mise à jour du marché locatif, juin 2026";

const LOYERS_RMR_MONTREAL = {
  loyersMensuels: { studio: 910, unChambre: 1095, deuxChambres: 1175, troisChambresPlus: 1630 },
  sourceLoyers: `${SHQ_2025} — RMR de Montréal`,
  periodeLoyers: "2025",
  inoccupationPct: 2.9,
  sourceInoccupation: `${SCHL_MI_2026} — RMR de Montréal`,
};

const LOYERS_RMR_QUEBEC = {
  loyersMensuels: { studio: 830, unChambre: 1055, deuxChambres: 1210, troisChambresPlus: 1375 },
  sourceLoyers: `${SHQ_2025} — RMR de Québec`,
  periodeLoyers: "2025",
  // 2,2 % = ville de Québec (source secondaire citant la Ville) ; provincial SCHL : 2,7 %.
  inoccupationPct: 2.2,
  sourceInoccupation: "Ville de Québec via source secondaire, 2025 (provincial SCHL : 2,7 %)",
};

export const LOYERS_PAR_VILLE: Record<VilleInvestisseur, LoyersVille> = {
  montreal: { ville: "montreal", rmr: "Montréal", ...LOYERS_RMR_MONTREAL },
  laval: { ville: "laval", rmr: "Montréal", ...LOYERS_RMR_MONTREAL },
  longueuil: { ville: "longueuil", rmr: "Montréal", ...LOYERS_RMR_MONTREAL },
  brossard: { ville: "brossard", rmr: "Montréal", ...LOYERS_RMR_MONTREAL },
  "terrasse-vaudreuil": { ville: "terrasse-vaudreuil", rmr: "Montréal", ...LOYERS_RMR_MONTREAL },
  quebec: { ville: "quebec", rmr: "Québec", ...LOYERS_RMR_QUEBEC },
  levis: { ville: "levis", rmr: "Québec", ...LOYERS_RMR_QUEBEC },
  gatineau: {
    ville: "gatineau",
    rmr: "Ottawa-Gatineau (partie QC)",
    loyersMensuels: { studio: 1046, unChambre: 1360, deuxChambres: 1450, troisChambresPlus: 1506 },
    sourceLoyers: `${SCHL_LOC_2025} — ville de Gatineau (marché primaire)`,
    periodeLoyers: "oct. 2025",
    inoccupationPct: 3.0,
    sourceInoccupation: `${SCHL_MI_2026} — RMR d'Ottawa-Gatineau`,
  },
};

/* ------------------------------------------------------------
 * Fiscalité — taux municipaux 2026 vérifiés. Taxe scolaire 2026 :
 * non vérifiée (aucune source fiable trouvée le 3 oct. 2026) → 0,
 * le total est donc municipal seulement, indiqué comme tel.
 * Villes sans taux vérifié : heuristique documentée (1,0 %).
 * ------------------------------------------------------------ */

const NON_VERIFIE: FiscaliteVille = {
  ville: "montreal",
  tauxMunicipalPar100: -1,
  tauxMunicipal6LogementsPar100: -1,
  tauxScolairePar100: 0,
  source: "taux officiel non vérifié — heuristique",
  annee: 2026,
  verifie: false,
};

export const FISCALITE_PAR_VILLE: Record<VilleInvestisseur, FiscaliteVille> = {
  montreal: { ...NON_VERIFIE, ville: "montreal" },
  laval: { ...NON_VERIFIE, ville: "laval" },
  longueuil: { ...NON_VERIFIE, ville: "longueuil" },
  brossard: { ...NON_VERIFIE, ville: "brossard" },
  "terrasse-vaudreuil": { ...NON_VERIFIE, ville: "terrasse-vaudreuil" },
  levis: { ...NON_VERIFIE, ville: "levis" },
  gatineau: { ...NON_VERIFIE, ville: "gatineau" },
  quebec: {
    ville: "quebec",
    tauxMunicipalPar100: 0.7464,
    tauxMunicipal6LogementsPar100: 0.7697,
    tauxScolairePar100: 0, // non vérifiée — total = municipal seulement
    source: "Ville de Québec — R.V.Q. 3492",
    annee: 2026,
    verifie: true,
  },
};

/** Les données de marché sont-elles complètes pour cette ville ? */
export function donneesCompletes(ville: VilleInvestisseur): boolean {
  const l = LOYERS_PAR_VILLE[ville];
  return l.loyersMensuels.deuxChambres > 0 && l.inoccupationPct >= 0;
}

/** Loyer mensuel de référence pour un logement type (2 chambres par défaut). */
export function loyerReference(
  ville: VilleInvestisseur,
  type: keyof LoyersVille["loyersMensuels"] = "deuxChambres",
): number | null {
  const v = LOYERS_PAR_VILLE[ville].loyersMensuels[type];
  return v > 0 ? v : null;
}

/**
 * Taxes annuelles estimées (municipales). Taux officiel vérifié si
 * disponible, sinon heuristique documentée (TAUX_TAXE_DEFAUT_PCT).
 * Retourne aussi si le taux est vérifié (pour l'affichage).
 */
export function taxesEstimees(
  ville: VilleInvestisseur,
  evaluation: number,
  nbLogements: number = 1,
): { montant: number; verifie: boolean } {
  const f = FISCALITE_PAR_VILLE[ville];
  if (f.verifie && f.tauxMunicipalPar100 > 0) {
    const taux =
      nbLogements >= 6 && f.tauxMunicipal6LogementsPar100 > 0
        ? f.tauxMunicipal6LogementsPar100
        : f.tauxMunicipalPar100;
    return { montant: Math.round((evaluation * taux) / 100), verifie: true };
  }
  return { montant: Math.round((evaluation * TAUX_TAXE_DEFAUT_PCT) / 100), verifie: false };
}
