/* ============================================================
 * VEYLA — Investisseur : estimation des coûts de rénovation.
 *
 * Trois niveaux de travaux, coûts en $/m² (Québec, 2026).
 * Ce sont des FOURCHETTES du marché (main-d'œuvre + matériaux),
 * pas des soumissions : l'interface affiche toujours min–max et
 * laisse ajuster. Calibration fine sur les prix réels des
 * matériaux (Le Catalogue) = prochaine étape documentée.
 * ============================================================ */

export type NiveauReno = "rafraichir" | "standard" | "complete";

export interface NiveauRenoInfo {
  niveau: NiveauReno;
  /** Coût par m² habitable, borne basse ($). */
  coutM2Min: number;
  /** Coût par m² habitable, borne haute ($). */
  coutM2Max: number;
  /** Ce que couvre le niveau. */
  inclut: string[];
  /** Durée indicative des travaux. */
  dureeMois: [number, number];
}

export const NIVEAUX_RENO: Record<NiveauReno, NiveauRenoInfo> = {
  rafraichir: {
    niveau: "rafraichir",
    coutM2Min: 100,
    coutM2Max: 175,
    inclut: [
      "Peinture complète",
      "Planchers (flottant / vinyle)",
      "Luminaires et quincaillerie",
      "Menues réparations",
    ],
    dureeMois: [1, 2],
  },
  standard: {
    niveau: "standard",
    coutM2Min: 450,
    coutM2Max: 750,
    inclut: [
      "Cuisine (armoires, comptoirs, appareils)",
      "Salle(s) de bain",
      "Planchers et peinture",
      "Électricité d'appoint",
    ],
    dureeMois: [2, 4],
  },
  complete: {
    niveau: "complete",
    coutM2Min: 1000,
    coutM2Max: 1600,
    inclut: [
      "Remise à neuf complète",
      "Électricité et plomberie",
      "Isolation et fenêtres",
      "Structure et mécanique au besoin",
    ],
    dureeMois: [4, 8],
  },
};

export interface EstimationReno {
  niveau: NiveauReno;
  superficieM2: number;
  min: number;
  max: number;
  /** Point central (médiane de la fourchette). */
  central: number;
  dureeMois: [number, number];
}

/**
 * Coût de rénovation estimé pour une superficie donnée.
 * Retourne null si la superficie est inconnue ou nulle —
 * l'interface demande alors une saisie manuelle.
 */
export function estimerRenovation(
  superficieM2: number,
  niveau: NiveauReno,
): EstimationReno | null {
  if (!Number.isFinite(superficieM2) || superficieM2 <= 0) return null;
  const info = NIVEAUX_RENO[niveau];
  const min = Math.round(superficieM2 * info.coutM2Min);
  const max = Math.round(superficieM2 * info.coutM2Max);
  return {
    niveau,
    superficieM2: Math.round(superficieM2),
    min,
    max,
    central: Math.round((min + max) / 2),
    dureeMois: info.dureeMois,
  };
}

/**
 * Superficie à rénover pour un bien : surface du bâtiment si connue,
 * sinon estimation prudente depuis le nombre de logements
 * (75 m² par logement, moyenne québécoise d'un 4½).
 */
export function superficieARenover(
  superficieBatimentM2: number,
  nbLogements: number,
): number | null {
  if (superficieBatimentM2 > 0) return superficieBatimentM2;
  if (nbLogements > 0) return nbLogements * 75;
  return null;
}
