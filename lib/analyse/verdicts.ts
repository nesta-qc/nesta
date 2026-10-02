import type { CategorieBien } from "@/lib/estimation/engine";

/**
 * VEYLA — Verdicts Acheter / Vendre / Investir.
 *
 * Lecture qualitative et CONSERVATRICE du marché pour UN bien précis,
 * à partir de données officielles uniquement :
 *  - facteur marché/rôle issu de la calibration APCIQ (prix VENDUS,
 *    jamais prix demandés) — proxy de la dynamique récente du segment ;
 *  - catégorie du bien (un plex n'a pas le même profil qu'un condo).
 *
 * Ce ne sont PAS des conseils financiers : des indicateurs de contexte,
 * avec la méthode affichée. Les calculs avancés restent cachés ;
 * le client voit le verdict, le chiffre clé et une explication simple.
 */

export type NiveauVerdict = "favorable" | "neutre" | "defavorable";

export interface Verdict {
  niveau: NiveauVerdict;
  /** ex. "+22 % au-dessus de l'évaluation foncière" */
  chiffreCle: string;
}

/** Seuils (facteur marché / rôle). Documentés, pas magiques. */
const SEUIL_VIF = 1.15;
const SEUIL_TIEDE = 1.05;

function pct(facteur: number): string {
  const v = Math.round((facteur - 1) * 100);
  return `${v > 0 ? "+" : ""}${v} %`;
}

/**
 * Vendre : un facteur élevé = la demande porte les prix bien au-delà
 * de l'évaluation foncière → contexte porteur pour un vendeur.
 */
export function verdictVendre(facteur: number): Verdict {
  if (facteur >= SEUIL_VIF)
    return { niveau: "favorable", chiffreCle: `${pct(facteur)} vs l'évaluation foncière` };
  if (facteur >= SEUIL_TIEDE)
    return { niveau: "neutre", chiffreCle: `${pct(facteur)} vs l'évaluation foncière` };
  return { niveau: "defavorable", chiffreCle: `${pct(facteur)} vs l'évaluation foncière` };
}

/**
 * Acheter : lecture inversée — un facteur élevé = prime d'entrée
 * élevée pour l'acheteur (on paie le haut du marché).
 */
export function verdictAcheter(facteur: number): Verdict {
  if (facteur >= SEUIL_VIF)
    return { niveau: "defavorable", chiffreCle: `${pct(facteur)} vs l'évaluation foncière` };
  if (facteur >= SEUIL_TIEDE)
    return { niveau: "neutre", chiffreCle: `${pct(facteur)} vs l'évaluation foncière` };
  return { niveau: "favorable", chiffreCle: `${pct(facteur)} vs l'évaluation foncière` };
}

/**
 * Investir : seuls les immeubles à revenus (plex, multi) ont un profil
 * investisseur naturel. Sans données de loyers, AUCUN rendement locatif
 * n'est calculé — on ne l'invente pas, on le dit.
 */
export function verdictInvestir(categorie: CategorieBien, facteur: number): Verdict {
  const aRevenus = categorie === "plex" || categorie === "multi";
  if (!aRevenus)
    return { niveau: "neutre", chiffreCle: "Appréciation uniquement" };
  if (facteur >= 1.1)
    return { niveau: "favorable", chiffreCle: `${pct(facteur)} vs l'évaluation foncière` };
  return { niveau: "neutre", chiffreCle: `${pct(facteur)} vs l'évaluation foncière` };
}
