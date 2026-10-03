/* ============================================================
 * VEYLA — Investisseur : moteur de cash-flow et scénarios.
 *
 * Fonctions pures (aucun I/O) : achat-réno-location,
 * achat-réno-revente (flip), BRRRR, score investisseur et
 * analyse de sensibilité. Les hypothèses sont explicites et
 * modifiables dans l'interface — le modèle interne reste privé.
 * ============================================================ */

export interface HypothesesInvestisseur {
  prixAchat: number;
  miseDeFondsPct: number;
  tauxHypothecairePct: number;
  amortissementAns: number;
  coutRenovation: number;
  /** Loyer mensuel par logement ($). */
  loyerMensuelParLogement: number;
  nbLogements: number;
  autresRevenusAnnuels: number;
  taxesAnnuelles: number;
  assuranceAnnuelle: number;
  /** % des revenus effectifs. */
  entretienPct: number;
  /** % des revenus effectifs (0 = autogéré). */
  gestionPct: number;
  /** % des revenus bruts. */
  vacancePct: number;
  /** Charges mensuelles fixes : frais de condo, etc. ($/mois). */
  chargesMensuelles: number;
  /** Taxe de bienvenue + notaire, % du prix. */
  fraisAchatPct: number;
  /** Commission + frais, % du prix de revente (flip). */
  fraisVentePct: number;
  /** Durée de détention pour le flip (mois). */
  dureeDetentionMoisFlip: number;
  /** Prix de revente après rénovations (si null : estimé). */
  prixReventeApresReno: number | null;
}

/** Paiement hypothécaire mensuel (formule d'amortissement standard). */
export function paiementHypothecaireMensuel(
  montantEmprunte: number,
  tauxAnnuelPct: number,
  amortissementAns: number,
): number {
  if (montantEmprunte <= 0 || amortissementAns <= 0) return 0;
  const n = Math.round(amortissementAns * 12);
  if (tauxAnnuelPct <= 0) return montantEmprunte / n;
  const i = tauxAnnuelPct / 100 / 12;
  return (montantEmprunte * i) / (1 - Math.pow(1 + i, -n));
}

/** Solde hypothécaire restant après k paiements mensuels. */
export function soldeHypothecaireApres(
  montantEmprunte: number,
  tauxAnnuelPct: number,
  amortissementAns: number,
  paiementsEffectues: number,
): number {
  if (montantEmprunte <= 0) return 0;
  const n = Math.round(amortissementAns * 12);
  const k = Math.min(Math.max(0, Math.round(paiementsEffectues)), n);
  if (tauxAnnuelPct <= 0) return montantEmprunte * (1 - k / n);
  const i = tauxAnnuelPct / 100 / 12;
  const m = paiementHypothecaireMensuel(montantEmprunte, tauxAnnuelPct, amortissementAns);
  return Math.max(0, montantEmprunte * Math.pow(1 + i, k) - m * ((Math.pow(1 + i, k) - 1) / i));
}

/** Coût total du projet : prix + rénovations + frais d'achat. */
export function coutTotalProjet(h: HypothesesInvestisseur): number {
  return Math.round(h.prixAchat * (1 + h.fraisAchatPct / 100) + h.coutRenovation);
}

/** Mise de fonds totale investie (cash sorti). */
export function cashInvesti(h: HypothesesInvestisseur): number {
  return Math.round((h.prixAchat * h.miseDeFondsPct) / 100 + h.coutRenovation + (h.prixAchat * h.fraisAchatPct) / 100);
}

/* ------------------------- SCÉNARIO 1 : LOUER ------------------------- */

export interface ResultatLocation {
  revenusBrutsAnnuels: number;
  perteVacanceAnnuelle: number;
  revenusEffectifs: number;
  taxes: number;
  assurance: number;
  charges: number;
  entretien: number;
  gestion: number;
  depensesExploitation: number;
  /** Revenu net d'exploitation (avant dette). */
  rno: number;
  paiementHypothecaireMensuel: number;
  serviceDetteAnnuel: number;
  cashFlowAnnuel: number;
  cashFlowMensuel: number;
  miseDeFonds: number;
  coutTotal: number;
  cashInvestiTotal: number;
  capRatePct: number;
  cashOnCashPct: number;
  /** % d'occupation nécessaire pour un cash-flow nul. */
  seuilRentabilitePct: number;
  /** Années pour récupérer la mise (si cash-flow > 0). */
  delaiRetourAns: number | null;
}

export function analyserLocation(h: HypothesesInvestisseur): ResultatLocation {
  const revenusBrutsAnnuels = Math.round(h.loyerMensuelParLogement * h.nbLogements * 12 + h.autresRevenusAnnuels);
  const perteVacanceAnnuelle = Math.round((revenusBrutsAnnuels * h.vacancePct) / 100);
  const revenusEffectifs = revenusBrutsAnnuels - perteVacanceAnnuelle;
  const entretien = Math.round((revenusEffectifs * h.entretienPct) / 100);
  const gestion = Math.round((revenusEffectifs * h.gestionPct) / 100);
  const charges = Math.round(h.chargesMensuelles * 12);
  const depensesExploitation = Math.round(h.taxesAnnuelles + h.assuranceAnnuelle + entretien + gestion + charges);
  const rno = revenusEffectifs - depensesExploitation;

  const montantEmprunte = h.prixAchat * (1 - h.miseDeFondsPct / 100);
  const paiementMensuel = paiementHypothecaireMensuel(montantEmprunte, h.tauxHypothecairePct, h.amortissementAns);
  const serviceDetteAnnuel = Math.round(paiementMensuel * 12);

  const cashFlowAnnuel = Math.round(rno - serviceDetteAnnuel);
  const coutTotal = coutTotalProjet(h);
  const investi = cashInvesti(h);

  const seuilRentabilitePct =
    revenusBrutsAnnuels > 0
      ? Math.min(100, Math.max(0, ((depensesExploitation + serviceDetteAnnuel) / revenusBrutsAnnuels) * 100))
      : 100;

  return {
    revenusBrutsAnnuels,
    perteVacanceAnnuelle,
    revenusEffectifs,
    taxes: Math.round(h.taxesAnnuelles),
    assurance: Math.round(h.assuranceAnnuelle),
    charges,
    entretien,
    gestion,
    depensesExploitation,
    rno,
    paiementHypothecaireMensuel: Math.round(paiementMensuel),
    serviceDetteAnnuel,
    cashFlowAnnuel,
    cashFlowMensuel: Math.round(cashFlowAnnuel / 12),
    miseDeFonds: Math.round((h.prixAchat * h.miseDeFondsPct) / 100),
    coutTotal,
    cashInvestiTotal: investi,
    capRatePct: coutTotal > 0 ? Math.round((rno / coutTotal) * 1000) / 10 : 0,
    cashOnCashPct: investi > 0 ? Math.round((cashFlowAnnuel / investi) * 1000) / 10 : 0,
    seuilRentabilitePct: Math.round(seuilRentabilitePct * 10) / 10,
    delaiRetourAns: cashFlowAnnuel > 0 ? Math.round((investi / cashFlowAnnuel) * 10) / 10 : null,
  };
}

/* ------------------------- SCÉNARIO 2 : REVENDRE (FLIP) ------------------------- */

export interface ResultatFlip {
  prixRevente: number;
  fraisVente: number;
  /** Prix + rénos + frais d'achat + paiements pendant détention. */
  sortiesTotales: number;
  /** Prix de revente − solde hypothécaire − frais de vente. */
  entreesNettes: number;
  profitNet: number;
  roiPct: number;
  roiAnnualisePct: number;
  dureeMois: number;
}

/**
 * Prix de revente après rénovations par défaut : le marché récupère
 * typiquement 60–90 % du coût des travaux à la revente (hypothèse
 * centrale 75 %, modifiable dans l'interface).
 */
export function prixReventeDefaut(prixAchat: number, coutRenovation: number): number {
  return Math.round(prixAchat + coutRenovation * 0.75);
}

export function analyserFlip(h: HypothesesInvestisseur): ResultatFlip {
  const prixRevente = h.prixReventeApresReno ?? prixReventeDefaut(h.prixAchat, h.coutRenovation);
  const fraisVente = Math.round((prixRevente * h.fraisVentePct) / 100);
  const montantEmprunte = h.prixAchat * (1 - h.miseDeFondsPct / 100);
  const paiementMensuel = paiementHypothecaireMensuel(montantEmprunte, h.tauxHypothecairePct, h.amortissementAns);
  const paiementsDetention = Math.round(paiementMensuel * h.dureeDetentionMoisFlip);
  const sortiesTotales = Math.round(h.prixAchat + h.coutRenovation + (h.prixAchat * h.fraisAchatPct) / 100 + paiementsDetention);
  const soldeRestant = Math.round(
    soldeHypothecaireApres(montantEmprunte, h.tauxHypothecairePct, h.amortissementAns, h.dureeDetentionMoisFlip),
  );
  const entreesNettes = prixRevente - soldeRestant - fraisVente;
  const investi = cashInvesti(h);
  const profitNet = Math.round(entreesNettes - investi);
  const roiPct = investi > 0 ? Math.round((profitNet / investi) * 1000) / 10 : 0;
  const annees = Math.max(h.dureeDetentionMoisFlip / 12, 0.25);
  const roiAnnualisePct = Math.round((Math.pow(1 + roiPct / 100, 1 / annees) - 1) * 1000) / 10;

  return { prixRevente, fraisVente, sortiesTotales, entreesNettes, profitNet, roiPct, roiAnnualisePct, dureeMois: h.dureeDetentionMoisFlip };
}

/* ------------------------- SCÉNARIO 3 : BRRRR ------------------------- */

export interface ResultatBrrrr {
  nouvelleValeur: number;
  /** Nouveau prêt à 80 % de la nouvelle valeur. */
  montantRefinance: number;
  /** Capital récupéré au refinancement. */
  capitalRecupere: number;
  /** % du cash investi récupéré. */
  pctRecupere: number;
  /** Cash qui reste dans le deal après refinancement. */
  cashRestant: number;
  nouveauPaiementMensuel: number;
  cashFlowAnnuelApresRefi: number;
  cashFlowMensuelApresRefi: number;
  /** Rendement sur le cash restant (infini si tout récupéré). */
  rendementCashRestantPct: number | null;
}

export function analyserBrrrr(h: HypothesesInvestisseur, loc: ResultatLocation): ResultatBrrrr {
  const nouvelleValeur = h.prixReventeApresReno ?? prixReventeDefaut(h.prixAchat, h.coutRenovation);
  const montantRefinance = Math.round(nouvelleValeur * 0.8);
  const pretInitial = h.prixAchat * (1 - h.miseDeFondsPct / 100);
  const capitalRecupere = Math.max(0, Math.round(montantRefinance - pretInitial));
  const investi = cashInvesti(h);
  const pctRecupere = investi > 0 ? Math.round((capitalRecupere / investi) * 1000) / 10 : 0;
  const cashRestant = Math.max(0, investi - capitalRecupere);

  const nouveauPaiementMensuel = paiementHypothecaireMensuel(montantRefinance, h.tauxHypothecairePct, h.amortissementAns);
  const cashFlowAnnuelApresRefi = Math.round(loc.rno - nouveauPaiementMensuel * 12);

  return {
    nouvelleValeur,
    montantRefinance,
    capitalRecupere,
    pctRecupere,
    cashRestant: Math.round(cashRestant),
    nouveauPaiementMensuel: Math.round(nouveauPaiementMensuel),
    cashFlowAnnuelApresRefi,
    cashFlowMensuelApresRefi: Math.round(cashFlowAnnuelApresRefi / 12),
    rendementCashRestantPct: cashRestant > 0 ? Math.round((cashFlowAnnuelApresRefi / cashRestant) * 1000) / 10 : null,
  };
}

/* ------------------------- SCORE INVESTISSEUR ------------------------- */

export type NiveauScore = "excellent" | "correct" | "faible";

export interface FacteurScore {
  points: number;
  max: number;
  detail: string;
}

export interface ScoreInvestisseur {
  score: number;
  niveau: NiveauScore;
  facteurs: { id: string; label: string; points: number; max: number; detail: string }[];
}

export function calculerScore(
  loc: ResultatLocation,
  flip: ResultatFlip,
  inoccupationVillePct: number,
  cashFlowStressTauxPlus2: number,
): ScoreInvestisseur {
  const facteurs: ScoreInvestisseur["facteurs"] = [];

  // 1. Rendement sur cash investi (35 pts)
  const coc = loc.cashOnCashPct;
  const ptsCoc = coc >= 10 ? 35 : coc >= 7 ? 25 : coc >= 4 ? 15 : coc >= 0 ? 8 : 0;
  facteurs.push({
    id: "cashoncash",
    label: "Rendement sur mise de fonds",
    points: ptsCoc,
    max: 35,
    detail: `${coc} % par an sur le cash investi`,
  });

  // 2. Taux de capitalisation (25 pts)
  const cap = loc.capRatePct;
  const ptsCap = cap >= 7 ? 25 : cap >= 5.5 ? 18 : cap >= 4 ? 10 : 4;
  facteurs.push({
    id: "caprate",
    label: "Taux de capitalisation",
    points: ptsCap,
    max: 25,
    detail: `Cap rate de ${cap} % sur le coût total`,
  });

  // 3. Marge du flip (20 pts)
  const roi = flip.roiPct;
  const ptsFlip = roi >= 20 ? 20 : roi >= 12 ? 14 : roi >= 5 ? 8 : 3;
  facteurs.push({
    id: "flip",
    label: "Potentiel de revente",
    points: ptsFlip,
    max: 20,
    detail: `ROI de ${roi} % sur une revente après rénovations`,
  });

  // 4. Solidité (20 pts) : demande locale + résistance aux taux
  const ptsDemande = inoccupationVillePct >= 0 && inoccupationVillePct < 2 ? 10 : inoccupationVillePct < 4 ? 6 : 3;
  const ptsStress = cashFlowStressTauxPlus2 > 0 ? 10 : cashFlowStressTauxPlus2 > -2000 ? 5 : 0;
  facteurs.push({
    id: "solidite",
    label: "Solidité",
    points: ptsDemande + ptsStress,
    max: 20,
    detail:
      `Inoccupation ${inoccupationVillePct >= 0 ? `${inoccupationVillePct} %` : "n.d."} dans la ville` +
      (cashFlowStressTauxPlus2 > 0 ? " · cash-flow positif même à taux +2 %" : " · cash-flow fragile si les taux montent"),
  });

  const score = facteurs.reduce((s, f) => s + f.points, 0);
  const niveau: NiveauScore = score >= 70 ? "excellent" : score >= 45 ? "correct" : "faible";
  return { score, niveau, facteurs };
}

/* ------------------------- SENSIBILITÉ ------------------------- */

export interface LigneSensibilite {
  scenario: string;
  cashFlowAnnuel: number;
}

/** Cash-flow annuel sous différents chocs (taux, vacance, loyers). */
export function analyserSensibilite(h: HypothesesInvestisseur): LigneSensibilite[] {
  const base = analyserLocation(h);
  const cas: { scenario: string; patch: Partial<HypothesesInvestisseur> }[] = [
    { scenario: "base", patch: {} },
    { scenario: "taux+1", patch: { tauxHypothecairePct: h.tauxHypothecairePct + 1 } },
    { scenario: "taux+2", patch: { tauxHypothecairePct: h.tauxHypothecairePct + 2 } },
    { scenario: "vacance5", patch: { vacancePct: 5 } },
    { scenario: "vacance10", patch: { vacancePct: 10 } },
    { scenario: "loyers-10", patch: { loyerMensuelParLogement: h.loyerMensuelParLogement * 0.9 } },
  ];
  return cas.map(({ scenario, patch }) => ({
    scenario,
    cashFlowAnnuel: analyserLocation({ ...h, ...patch }).cashFlowAnnuel,
  }));
}
