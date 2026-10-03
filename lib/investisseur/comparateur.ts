/* ============================================================
 * VEYLA — Investisseur : comparateur de villes.
 *
 * « Où ton dollar travaille le plus fort » : pour chaque ville
 * couverte, un plex type (3 logements) est modélisé à partir des
 * données centralisées du site (valeur médiane au rôle par ville
 * via le snapshot de statistiques) et des loyers de référence
 * SCHL. Hypothèses explicites, villes sans données exclues.
 * ============================================================ */

import { getStatsSnapshot } from "@/lib/statistiques";
import {
  LOYERS_PAR_VILLE,
  FISCALITE_PAR_VILLE,
  taxesEstimees,
  type VilleInvestisseur,
} from "./donnees";
import { analyserLocation, type HypothesesInvestisseur } from "./moteur";
import { estimerRenovation } from "./renovation";

export interface LigneComparateur {
  ville: VilleInvestisseur;
  nomVille: string;
  /** Prix d'achat typique estimé pour le plex type ($). */
  prixTypique: number;
  /** Loyer mensuel de référence par logement ($). */
  loyerMensuel: number;
  cashFlowAnnuel: number;
  capRatePct: number;
  cashOnCashPct: number;
  inoccupationPct: number;
}

/**
 * Hypothèse documentée : le prix de marché typique d'un petit plex
 * vaut ~1,15× la valeur médiane au rôle de la ville (prime de marché
 * moyenne observée). Modifiable ici, affichée dans l'interface.
 */
const PRIME_MARCHE_TYPQUE = 1.15;
/** Plex type du comparateur : 3 logements, rénovations standard. */
const LOGEMENTS_TYPE = 3;

const NOMS_VILLES: Record<VilleInvestisseur, string> = {
  montreal: "Montréal",
  quebec: "Québec",
  laval: "Laval",
  gatineau: "Gatineau",
  longueuil: "Longueuil",
  brossard: "Brossard",
  "terrasse-vaudreuil": "Terrasse-Vaudreuil",
  levis: "Lévis",
};

function hypothesesVille(
  ville: VilleInvestisseur,
  medianeRole: number,
  tauxHypothecairePct: number,
): HypothesesInvestisseur | null {
  const loyers = LOYERS_PAR_VILLE[ville];
  const loyer = loyers.loyersMensuels.deuxChambres;
  if (loyer <= 0 || loyers.inoccupationPct < 0) return null;

  const prixAchat = Math.round(medianeRole * PRIME_MARCHE_TYPQUE);
  const reno = estimerRenovation(LOGEMENTS_TYPE * 75, "standard");
  const taxes = taxesEstimees(ville, medianeRole, LOGEMENTS_TYPE);

  return {
    prixAchat,
    miseDeFondsPct: 20,
    tauxHypothecairePct,
    amortissementAns: 25,
    coutRenovation: reno ? reno.central : 0,
    loyerMensuelParLogement: loyer,
    nbLogements: LOGEMENTS_TYPE,
    autresRevenusAnnuels: 0,
    taxesAnnuelles: taxes.montant,
    assuranceAnnuelle: Math.round(prixAchat * 0.0035),
    entretienPct: 6,
    gestionPct: 0,
    vacancePct: loyers.inoccupationPct,
    chargesMensuelles: 0,
    fraisAchatPct: 1.8,
    fraisVentePct: 5,
    dureeDetentionMoisFlip: 8,
    prixReventeApresReno: null,
  };
}

/**
 * Classe les villes par cash-flow annuel du plex type.
 * Retourne null si les statistiques sont indisponibles.
 */
export async function comparerVilles(
  tauxHypothecairePct: number,
): Promise<LigneComparateur[] | null> {
  const snapshot = await getStatsSnapshot();
  if (!snapshot) return null;

  const lignes: LigneComparateur[] = [];
  for (const c of snapshot.stats.cities) {
    const slug = c.city as VilleInvestisseur;
    if (!(slug in LOYERS_PAR_VILLE)) continue;
    if (!c.medianAssessment || c.medianAssessment <= 0) continue;
    const h = hypothesesVille(slug, c.medianAssessment, tauxHypothecairePct);
    if (!h) continue;
    const loc = analyserLocation(h);
    lignes.push({
      ville: slug,
      nomVille: NOMS_VILLES[slug] ?? c.city,
      prixTypique: h.prixAchat,
      loyerMensuel: h.loyerMensuelParLogement,
      cashFlowAnnuel: loc.cashFlowAnnuel,
      capRatePct: loc.capRatePct,
      cashOnCashPct: loc.cashOnCashPct,
      inoccupationPct: LOYERS_PAR_VILLE[slug].inoccupationPct,
    });
  }

  lignes.sort((a, b) => b.cashFlowAnnuel - a.cashFlowAnnuel);
  return lignes.length > 0 ? lignes : null;
}
