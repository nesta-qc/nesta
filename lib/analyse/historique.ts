/**
 * NESTA — Courbe historique indicative de la valeur d'un bien.
 *
 * MÉTHODE (affichée au client) : on part de la valeur marchande estimée
 * aujourd'hui et on la « rembobine » avec l'indice annuel des prix
 * résidentiels au Québec. C'est une RECONSTITUTION INDICATIVE — pas
 * l'historique réel des transactions de CE bien (données non publiques).
 *
 * Indice : variation annuelle du prix médian unifamiliale, province de
 * Québec, d'après les bilans APCIQ (prix VENDUS Centris) :
 *  - 2019 : +4 % (cumul 2019, mensuel APCIQ mai 2019)
 *  - 2020 : +13 % / 2021 : +24 % / 2022 : +14 % (bilan annuel APCIQ)
 *  - 2023 : 0 % (bilan annuel APCIQ)
 *  - 2024 : +8 % (bilan annuel APCIQ)
 *  - 2025 : +8 % (cumul jan–oct 2025, mensuel APCIQ oct. 2025)
 *  - 2026 : +6 % (prévision APCIQ, janv. 2026)
 * Avant 2019 : pas d'indice homogène sous la main → la courbe commence
 * en 2019 avec une note explicite. Après 2026 : scénario tendanciel
 * (taux de la calibration, plafonné à 5 %/an — même règle que le moteur).
 */

export const ANNEE_INDICE_MIN = 2019;
export const ANNEE_COURANTE = 2026;

/** Variation annuelle de l'indice (ex. 2021 → +24 %). */
const TAUX_ANNUELS: Record<number, number> = {
  2019: 0.04,
  2020: 0.13,
  2021: 0.24,
  2022: 0.14,
  2023: 0.0,
  2024: 0.08,
  2025: 0.08,
  2026: 0.06,
};

export type TypePoint = "reconstitue" | "actuel" | "scenario";

export interface PointCourbe {
  annee: number;
  /** Valeur centrale arrondie ($) */
  valeur: number;
  type: TypePoint;
}

export interface CourbeValeur {
  points: PointCourbe[];
  /** Année de début effective (2019 si construction antérieure). */
  anneeDebut: number;
  /** true si la construction est antérieure à l'indice. */
  tronquee: boolean;
}

/**
 * Construit la courbe : passé reconstitué (2019→2026) + scénario
 * futur (+1 à +5 ans au taux tendanciel plafonné).
 */
export function construireCourbe(
  valeurActuelle: number,
  anneeConstruction: number,
  tauxScenarioPct: number,
): CourbeValeur {
  const tauxScenario = Math.min(Math.max(tauxScenarioPct, 0), 5) / 100;
  const debut = Math.max(anneeConstruction, ANNEE_INDICE_MIN);
  const points: PointCourbe[] = [];

  // Rembobinage : valeur(année) = valeurActuelle / Π(1+taux) sur ]année..2026]
  let diviseur = 1;
  const passe: { annee: number; valeur: number }[] = [];
  for (let a = ANNEE_COURANTE; a >= debut; a--) {
    passe.unshift({ annee: a, valeur: valeurActuelle / diviseur });
    if (a > ANNEE_INDICE_MIN) diviseur *= 1 + (TAUX_ANNUELS[a] ?? 0);
  }
  for (const p of passe) {
    points.push({
      annee: p.annee,
      valeur: Math.round(p.valeur),
      type: p.annee === ANNEE_COURANTE ? "actuel" : "reconstitue",
    });
  }

  // Scénario futur en pointillés (même règle que le moteur : taux plafonné).
  let v = valeurActuelle;
  for (let i = 1; i <= 5; i++) {
    v *= 1 + tauxScenario;
    points.push({ annee: ANNEE_COURANTE + i, valeur: Math.round(v), type: "scenario" });
  }

  return {
    points,
    anneeDebut: debut,
    tronquee: anneeConstruction < ANNEE_INDICE_MIN,
  };
}
