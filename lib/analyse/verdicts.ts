import type { CategorieBien } from "@/lib/estimation/engine";
import { analyserRegime, chargerConjoncture } from "@/lib/marche/conjoncture";

/* ============================================================
 * VEYLA — Verdicts Acheter / Vendre / Investir ENRICHIS.
 *
 * Chaque verdict est une analyse multi-facteurs, pas un simple
 * seuil : le facteur du bien (prix vendus APCIQ), le régime de
 * marché mesuré (indice), le coût du crédit, le calendrier
 * politique (élections) et la dynamique du segment.
 *
 * Chaque verdict expose SES DÉTAILS SÉPARÉMENT : score, facteurs
 * pour/contre avec chiffres à l'appui, risques, et conseil.
 * Ce sont des indicateurs de contexte argumentés — pas des
 * conseils financiers personnalisés, et jamais une évaluation
 * agréée. Les données viennent de la veille sourcée
 * (data/marche/conjoncture.json) : aucun chiffre inventé.
 * ============================================================ */

export type NiveauVerdict = "favorable" | "neutre" | "defavorable";
export type LangueVerdict = "fr" | "en";

export interface FacteurVerdict {
  sens: "positif" | "negatif" | "neutre";
  titre: string;
  detail: string;
}

export interface VerdictEnrichi {
  /** Acheter | Vendre | Investir */
  type: "acheter" | "vendre" | "investir";
  niveau: NiveauVerdict;
  /** 0–100, somme pondérée transparente. */
  score: number;
  chiffreCle: string;
  /** Le « pourquoi », facteur par facteur. */
  facteurs: FacteurVerdict[];
  risques: string[];
  /** Le conseil : quoi faire, concrètement. */
  conseil: string;
}

export interface ContexteBien {
  facteur: number;
  categorie: CategorieBien;
}

const SEUIL_VIF = 1.15;
const SEUIL_TIEDE = 1.05;

function pct(facteur: number, lang: LangueVerdict): string {
  const v = Math.round((facteur - 1) * 100);
  const signe = v > 0 ? "+" : "";
  return lang === "en" ? `${signe}${v}%` : `${signe}${v} %`;
}

/** "2026-10-05" → "5 octobre 2026" / "October 5, 2026". */
function dateLongue(iso: string, lang: LangueVerdict): string {
  const [a, m, j] = iso.split("-").map(Number);
  if (!a || !m || !j) return iso;
  const NOMS =
    lang === "fr"
      ? ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
      : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return lang === "fr" ? `${j} ${NOMS[m - 1]} ${a}` : `${NOMS[m - 1]} ${j}, ${a}`;
}

/** Écart vs le rôle formulé correctement dans les deux sens. */
function ecartRole(facteur: number, lang: LangueVerdict): string {
  const v = Math.round((facteur - 1) * 100);
  if (lang === "en") return v >= 0 ? `+${v}% above assessment` : `${-v}% below assessment`;
  return v >= 0 ? `+${v} % au-dessus de l'évaluation foncière` : `${-v} % en dessous de l'évaluation foncière`;
}

function niveauDe(score: number): NiveauVerdict {
  if (score >= 65) return "favorable";
  if (score >= 40) return "neutre";
  return "defavorable";
}

const T = (fr: string, en: string, lang: LangueVerdict): string =>
  lang === "en" ? en : fr;

/* ---------------- VENDRE ---------------- */

export function analyserVendre(
  ctx: ContexteBien,
  lang: LangueVerdict = "fr",
): VerdictEnrichi {
  const regime = analyserRegime();
  const c = chargerConjoncture();
  const facteurs: FacteurVerdict[] = [];
  let score = 0;

  // 1. Facteur du bien (40 pts) : prime de marché = pouvoir du vendeur.
  const f = ctx.facteur;
  if (f >= SEUIL_VIF) {
    score += 40;
    facteurs.push({
      sens: "positif",
      titre: T("Prime de marché élevée", "High market premium", lang),
      detail: T(
        `Les prix vendus portent ce bien ${pct(f, lang)} au-dessus de l'évaluation foncière : la demande paie cher ce segment.`,
        `Sold prices put this property ${pct(f, lang)} above its assessment: demand is paying up for this segment.`,
        lang,
      ),
    });
  } else if (f >= SEUIL_TIEDE) {
    score += 25;
    facteurs.push({
      sens: "neutre",
      titre: T("Prime de marché modérée", "Moderate market premium", lang),
      detail: T(
        `Écart de ${pct(f, lang)} vs le rôle : marché porteur sans euphorie.`,
        `${pct(f, lang)} vs assessment: supportive market without exuberance.`,
        lang,
      ),
    });
  } else {
    score += 10;
    facteurs.push({
      sens: "negatif",
      titre: T("Prime de marché faible", "Low market premium", lang),
      detail: T(
        `Seulement ${pct(f, lang)} vs l'évaluation foncière : les acheteurs ne surenchérissent pas sur ce segment.`,
        `Only ${pct(f, lang)} vs assessment: buyers aren't bidding up this segment.`,
        lang,
      ),
    });
  }

  // 2. Régime de marché (20 pts) : inventaire et délais.
  const mtl = c.marche.montreal as Record<string, number | string>;
  if (regime.phase === "expansion") {
    score += 20;
    facteurs.push({
      sens: "positif",
      titre: T("Marché en expansion", "Expanding market", lang),
      detail: T(
        "La demande absorbe l'offre rapidement : un vendeur garde la main sur le prix et les conditions.",
        "Demand absorbs supply quickly: sellers keep the upper hand on price and terms.",
        lang,
      ),
    });
  } else if (regime.phase === "equilibre") {
    score += 14;
    facteurs.push({
      sens: "neutre",
      titre: T("Marché équilibré", "Balanced market", lang),
      detail: T(
        "Ni les acheteurs ni les vendeurs ne dominent : une mise en vente au juste prix trouve preneur.",
        "Neither buyers nor sellers dominate: a fairly priced listing will sell.",
        lang,
      ),
    });
  } else {
    score += regime.phase === "reequilibrage" ? 8 : 4;
    facteurs.push({
      sens: "negatif",
      titre: T(
        "Marché en rééquilibrage",
        "Rebalancing market",
        lang,
      ),
      detail: T(
        `À Montréal, les inscriptions bondissent (+${mtl.inscriptionsSur12Mois ?? "?"} % sur un an) et les délais s'allongent : plus de concurrence entre vendeurs, prévoir une négociation.`,
        `In Montreal, listings are surging (+${mtl.inscriptionsSur12Mois ?? "?"}% year over year) and days on market are lengthening: more competition among sellers, expect negotiation.`,
        lang,
      ),
    });
  }

  // 3. Coût du crédit (15 pts) : des taux qui montent = moins d'acheteurs solvables.
  if (regime.tauxSeResserre) {
    score += 5;
    facteurs.push({
      sens: "negatif",
      titre: T("Crédit en resserrement", "Tightening credit", lang),
      detail: T(
        `Taux fixe 5 ans à ${c.taux.fixe5ansQc} % et en hausse : chaque point rogne le pouvoir d'achat — le bassin d'acheteurs se rétrécit.`,
        `5-year fixed at ${c.taux.fixe5ansQc}% and rising: every point erodes purchasing power — the buyer pool is shrinking.`,
        lang,
      ),
    });
  } else {
    score += 12;
    facteurs.push({
      sens: "positif",
      titre: T("Crédit stable ou en détente", "Stable or easing credit", lang),
      detail: T(
        "Des taux stables élargissent le bassin d'acheteurs admissibles : plus d'enchérisseurs potentiels.",
        "Stable rates widen the pool of eligible buyers: more potential bidders.",
        lang,
      ),
    });
  }

  // 4. Calendrier politique (10 pts).
  const e = c.elections.quebec2026;
  if (regime.incertitudePolitique) {
    score += 5;
    facteurs.push({
      sens: "neutre",
      titre: T(
        `Élection québécoise le ${dateLongue(e.date, lang)}`,
        `Quebec election on ${dateLongue(e.date, lang)}`,
        lang,
      ),
      detail: T(
        `Scrutin dans quelques jours (${e.scenarioProbable.charAt(0).toLowerCase() + e.scenarioProbable.slice(1).replace(/\.$/, '')}). Les promesses d'aide à l'achat (TVQ, crédits) soutiendraient la demande à court terme — mais l'incertitude peut faire attendre certains acheteurs.`,
        `Vote in a few days (${e.scenarioProbable.charAt(0).toLowerCase() + e.scenarioProbable.slice(1).replace(/\.$/, '')}). Promised buyer aids (sales-tax rebates, credits) would support near-term demand — but uncertainty may keep some buyers waiting.`,
        lang,
      ),
    });
  } else {
    score += 7;
    facteurs.push({
      sens: "neutre",
      titre: T("Contexte politique lisible", "Readable political backdrop", lang),
      detail: T(
        "Pas d'échéance électorale imminente : les acheteurs décident sur les fondamentaux.",
        "No imminent election: buyers decide on fundamentals.",
        lang,
      ),
    });
  }

  // 5. Segment (15 pts).
  if (ctx.categorie === "plex" || ctx.categorie === "multi") {
    score += 13;
    facteurs.push({
      sens: "positif",
      titre: T("Segment plex en demande", "Plex segment in demand", lang),
      detail: T(
        "Les plex affichent les plus fortes hausses de prix au Québec : la demande d'investisseurs reste vive.",
        "Plexes post Quebec's strongest price gains: investor demand stays lively.",
        lang,
      ),
    });
  } else if (ctx.categorie === "condo") {
    score += 6;
    facteurs.push({
      sens: "negatif",
      titre: T("Condos : inventaire record au centre", "Condos: record downtown inventory", lang),
      detail: T(
        "Les inscriptions de condos au centre-ville n'ont jamais été aussi hautes et les prix stagnent depuis plusieurs trimestres : vendre vite exige un prix affûté.",
        "Downtown condo listings have never been higher and prices have stalled for several quarters: selling fast requires sharp pricing.",
        lang,
      ),
    });
  } else {
    score += 10;
    facteurs.push({
      sens: "neutre",
      titre: T("Unifamiliale : prix résilients", "Single-family: resilient prices", lang),
      detail: T(
        "Les prix des unifamiliales tiennent malgré le repli des ventes : l'offre reste limitée sur ce segment.",
        "Single-family prices hold despite softer sales: supply stays limited in this segment.",
        lang,
      ),
    });
  }

  const niveau = niveauDe(score);
  const risques: string[] = [];
  if (regime.tauxSeResserre)
    risques.push(
      T(
        "Une hausse du taux directeur le 28 octobre réduirait encore le pouvoir d'achat des acheteurs.",
        "A policy-rate hike on October 28 would further erode buyer purchasing power.",
        lang,
      ),
    );
  if (regime.phase === "reequilibrage" || regime.phase === "correction")
    risques.push(
      T(
        "L'inventaire continue de gonfler : chaque mois d'attente ajoute des concurrents.",
        "Inventory keeps growing: every month of waiting adds competitors.",
        lang,
      ),
    );
  risques.push(
    T(
      "Vendre maintenant, c'est aussi devoir se reloger dans le même marché.",
      "Selling now also means re-housing yourself in the same market.",
      lang,
    ),
  );

  const conseil =
    niveau === "favorable"
      ? T(
          "C'est une fenêtre vendeuse : affichez au prix du marché (pas au-dessus), soignez la présentation, et soyez prêt à conclure vite si une offre sérieuse arrive.",
          "It's a seller's window: list at market price (not above), stage well, and be ready to move fast on a serious offer.",
          lang,
        )
      : niveau === "neutre"
        ? T(
            "La vente est envisageable sans précipitation : fixez un prix réaliste et gardez une marge de négociation de 2 à 3 %.",
            "A sale is feasible without rushing: set a realistic price and keep 2–3% of negotiating room.",
            lang,
          )
        : T(
            "Sauf besoin impératif, attendre quelques mois peut rapporter davantage : le marché actuel ne récompense pas les vendeurs pressés.",
            "Unless you must sell, waiting a few months could pay more: the current market doesn't reward rushed sellers.",
            lang,
          );

  return {
    type: "vendre",
    niveau,
    score,
    chiffreCle: `${pct(f, lang)} ${T("vs l'évaluation foncière", "vs assessment", lang)}`,
    facteurs,
    risques,
    conseil,
  };
}

/* ---------------- ACHETER ---------------- */

export function analyserAcheter(
  ctx: ContexteBien,
  lang: LangueVerdict = "fr",
): VerdictEnrichi {
  const regime = analyserRegime();
  const c = chargerConjoncture();
  const facteurs: FacteurVerdict[] = [];
  let score = 0;
  const f = ctx.facteur;

  // 1. Facteur du bien (40 pts) : lecture inversée — prime élevée = on paie cher.
  if (f < SEUIL_TIEDE) {
    score += 40;
    facteurs.push({
      sens: "positif",
      titre: T("Point d'entrée raisonnable", "Reasonable entry point", lang),
      detail: T(
        `Seulement ${ecartRole(f, lang)} : vous ne payez pas de prime d'euphorie.`,
        `Only ${ecartRole(f, lang)}: you're not paying an exuberance premium.`,
        lang,
      ),
    });
  } else if (f < SEUIL_VIF) {
    score += 25;
    facteurs.push({
      sens: "neutre",
      titre: T("Prime d'achat modérée", "Moderate buying premium", lang),
      detail: T(
        `Écart de ${pct(f, lang)} vs le rôle : marché haussier, la marge de négociation sera mince.`,
        `${pct(f, lang)} vs assessment: rising market, negotiating room will be thin.`,
        lang,
      ),
    });
  } else {
    score += 10;
    facteurs.push({
      sens: "negatif",
      titre: T("Vous paieriez le haut du marché", "You'd pay top of market", lang),
      detail: T(
        `Prime de ${pct(f, lang)} vs l'évaluation foncière : le vendeur capte toute la valeur — négociez serré ou attendez.`,
        `${pct(f, lang)} premium vs assessment: the seller captures all the value — negotiate hard or wait.`,
        lang,
      ),
    });
  }

  // 2. Régime (20 pts) : le rééquilibrage est l'ami de l'acheteur.
  if (regime.phase === "reequilibrage" || regime.phase === "marche_acheteurs" || regime.phase === "correction") {
    score += 18;
    const mtl = c.marche.montreal as Record<string, number | string>;
    facteurs.push({
      sens: "positif",
      titre: T("Le rapport de force tourne", "Leverage is shifting", lang),
      detail: T(
        `Inventaire en hausse (+${mtl.inscriptionsSur12Mois ?? "?"} % à Montréal) et délais qui s'allongent : plus de choix, plus de temps pour visiter, plus de place pour négocier.`,
        `Rising inventory (+${mtl.inscriptionsSur12Mois ?? "?"}% in Montreal) and lengthening days on market: more choice, more time to visit, more room to negotiate.`,
        lang,
      ),
    });
  } else if (regime.phase === "equilibre") {
    score += 12;
    facteurs.push({
      sens: "neutre",
      titre: T("Marché équilibré", "Balanced market", lang),
      detail: T(
        "Offre et demande se tiennent : un achat au juste prix reste sain, sans précipitation ni aubaine.",
        "Supply and demand hold each other: buying at fair price stays sound, no rush, no bargain.",
        lang,
      ),
    });
  } else {
    score += 6;
    facteurs.push({
      sens: "negatif",
      titre: T("Marché en expansion", "Expanding market", lang),
      detail: T(
        "La demande absorbe l'offre : attendez-vous à des surenchères et à des conditions vendeuses (sans garantie légale, délais courts).",
        "Demand absorbs supply: expect bidding wars and seller-friendly terms.",
        lang,
      ),
    });
  }

  // 3. Coût du crédit (15 pts).
  if (regime.tauxSeResserre) {
    score += 6;
    facteurs.push({
      sens: "negatif",
      titre: T("Financement plus cher", "Pricier financing", lang),
      detail: T(
        `Fixe 5 ans à ${c.taux.fixe5ansQc} % et en hausse : faites préqualifier votre capacité d'emprunt AVANT de visiter, et testez votre budget à +1 point.`,
        `5-year fixed at ${c.taux.fixe5ansQc}% and rising: get pre-qualified BEFORE visiting, and stress-test your budget at +1 point.`,
        lang,
      ),
    });
  } else {
    score += 12;
    facteurs.push({
      sens: "positif",
      titre: T("Financement accessible", "Accessible financing", lang),
      detail: T(
        "Des taux stables préservent votre pouvoir d'achat : c'est le moment de verrouiller un taux si vous achetez dans les 4 mois.",
        "Stable rates preserve your purchasing power: lock a rate now if you're buying within 4 months.",
        lang,
      ),
    });
  }

  // 4. Calendrier politique (10 pts) : des aides à l'achat pourraient arriver.
  const e = c.elections.quebec2026;
  if (regime.incertitudePolitique) {
    score += 7;
    facteurs.push({
      sens: "positif",
      titre: T("Aides à l'achat en vue", "Buyer aids on the horizon", lang),
      detail: T(
        `Élection le ${dateLongue(e.date, lang)} : le PQ (en tête) promet jusqu'à 45 000 $ de remboursement de TVQ sur le neuf, le PLQ 36 % de TVQ. Acheter juste avant leur entrée en vigueur peut faire gagner les deux tableaux — prix d'aujourd'hui, aides de demain.`,
        `Election on ${dateLongue(e.date, lang)}: the leading PQ promises up to $45,000 in sales-tax rebates on new homes, the Liberals 36%. Buying just before they take effect could win both ways — today's prices, tomorrow's aids.`,
        lang,
      ),
    });
  } else {
    score += 6;
    facteurs.push({
      sens: "neutre",
      titre: T("Aucun catalyseur politique imminent", "No imminent political catalyst", lang),
      detail: T(
        "Décidez sur les fondamentaux du bien et votre budget, pas sur l'actualité.",
        "Decide on the property's fundamentals and your budget, not on headlines.",
        lang,
      ),
    });
  }

  // 5. Segment (15 pts).
  if (ctx.categorie === "condo") {
    score += 13;
    facteurs.push({
      sens: "positif",
      titre: T("Condos : le moment des acheteurs", "Condos: buyers' moment", lang),
      detail: T(
        "Inventaire record au centre-ville, prix au point mort depuis des trimestres : c'est le segment où la négociation paie le plus en ce moment.",
        "Record downtown inventory, prices stalled for quarters: this is the segment where negotiating pays most right now.",
        lang,
      ),
    });
  } else if (ctx.categorie === "plex" || ctx.categorie === "multi") {
    score += 5;
    facteurs.push({
      sens: "negatif",
      titre: T("Plex : segment disputé", "Plex: contested segment", lang),
      detail: T(
        "Les plex sont les biens les plus demandés du moment : attendez-vous à payer plein prix et à agir vite.",
        "Plexes are the most sought-after properties right now: expect to pay full price and act fast.",
        lang,
      ),
    });
  } else {
    score += 9;
    facteurs.push({
      sens: "neutre",
      titre: T("Unifamiliale : offre limitée", "Single-family: limited supply", lang),
      detail: T(
        "Peu d'inventaire sur les unifamiliales : les bonnes propriétés partent encore vite malgré le ralentissement général.",
        "Little single-family inventory: good properties still go fast despite the general slowdown.",
        lang,
      ),
    });
  }

  const niveau = niveauDe(score);
  const risques: string[] = [];
  if (regime.tauxSeResserre)
    risques.push(
      T(
        "Si les taux montent encore, votre mensualité suivra (ou votre pouvoir d'achat baissera).",
        "If rates rise further, your monthly payment follows (or your purchasing power drops).",
        lang,
      ),
    );
  if (f >= SEUIL_VIF)
    risques.push(
      T(
        "Acheter au sommet d'un segment expose à une correction si le marché se retourne.",
        "Buying at a segment's peak exposes you to a correction if the market turns.",
        lang,
      ),
    );
  risques.push(
    T(
      "Ne jamais acheter au-dessus de sa préapprobation : gardez 3 à 6 mois de paiements en réserve.",
      "Never buy above your pre-approval: keep 3–6 months of payments in reserve.",
      lang,
    ),
  );

  const conseil =
    niveau === "favorable"
      ? T(
          "Les conditions sont réunies : visitez large, comparez au moins 5 biens similaires, et négociez — le marché vous donne du levier.",
          "Conditions are right: tour broadly, compare at least 5 similar properties, and negotiate — the market gives you leverage.",
          lang,
        )
      : niveau === "neutre"
        ? T(
            "Achat possible mais sans précipitation : exigez une inspection complète et ne dépassez pas votre budget maximal.",
            "Buying is possible but don't rush: demand a full inspection and never exceed your maximum budget.",
            lang,
          )
        : T(
            "Mauvais moment pour ce bien précis : soit négociez une baisse substantielle, soit attendez que le marché respire.",
            "Wrong time for this specific property: either negotiate a substantial reduction, or wait for the market to breathe.",
            lang,
          );

  return {
    type: "acheter",
    niveau,
    score,
    chiffreCle: `${pct(f, lang)} ${T("vs l'évaluation foncière", "vs assessment", lang)}`,
    facteurs,
    risques,
    conseil,
  };
}

/* ---------------- INVESTIR ---------------- */

export function analyserInvestir(
  ctx: ContexteBien,
  lang: LangueVerdict = "fr",
): VerdictEnrichi {
  const regime = analyserRegime();
  const c = chargerConjoncture();
  const facteurs: FacteurVerdict[] = [];
  let score = 0;
  const f = ctx.facteur;
  const aRevenus = ctx.categorie === "plex" || ctx.categorie === "multi";

  // 1. Nature du bien (25 pts) : seuls les immeubles à revenus ont un profil investisseur.
  if (!aRevenus) {
    score += 5;
    facteurs.push({
      sens: "neutre",
      titre: T("Pas de revenus locatifs", "No rental income", lang),
      detail: T(
        "Ce bien ne génère aucun loyer : l'investissement miserait uniquement sur l'appréciation — spéculatif, pas locatif.",
        "This property generates no rent: the investment would bet purely on appreciation — speculative, not rental.",
        lang,
      ),
    });
  } else {
    score += 20;
    facteurs.push({
      sens: "positif",
      titre: T("Immeuble à revenus", "Income property", lang),
      detail: T(
        "Plex/multi-logements : loyers + appréciation, le seul profil où l'investissement locatif a un sens.",
        "Plex/multi-unit: rents + appreciation, the only profile where rental investing makes sense.",
        lang,
      ),
    });
  }

  // 2. Dynamique du segment plex (25 pts).
  if (aRevenus) {
    const mtl = c.marche.montreal as Record<string, number | string>;
    score += 22;
    facteurs.push({
      sens: "positif",
      titre: T("Segment plex en feu", "Plex segment on fire", lang),
      detail: T(
        `Prix médians des plex en hausse de +${mtl.medianPlexSur12Mois ?? "?"} % à Montréal (+10 % à Québec) : la demande d'investisseurs est la plus forte du marché.`,
        `Plex median prices up +${mtl.medianPlexSur12Mois ?? "?"}% in Montreal (+10% in Quebec City): investor demand is the market's strongest.`,
        lang,
      ),
    });
  } else {
    score += 8;
    facteurs.push({
      sens: "neutre",
      titre: T("Appréciation seule", "Appreciation only", lang),
      detail: T(
        "Sans loyers, le rendement dépend entièrement de la revente : horizon long et tolérance au risque requis.",
        "Without rents, returns depend entirely on resale: long horizon and risk tolerance required.",
        lang,
      ),
    });
  }

  // 3. Facteur du bien (20 pts).
  if (f >= 1.1) {
    score += 20;
    facteurs.push({
      sens: "positif",
      titre: T("Valorisation forte du segment", "Strong segment valuation", lang),
      detail: T(
        `Marché/rôle à ${pct(f, lang)} : le segment est reconnu et liquide — revente facilitée.`,
        `Market/assessment at ${pct(f, lang)}: the segment is proven and liquid — easier resale.`,
        lang,
      ),
    });
  } else {
    score += 12;
    facteurs.push({
      sens: "neutre",
      titre: T("Valorisation modérée", "Moderate valuation", lang),
      detail: T(
        `Écart de ${pct(f, lang)} vs le rôle : point d'entrée moins tendu, mais segment moins porteur.`,
        `${pct(f, lang)} vs assessment: less stretched entry point, but a softer segment.`,
        lang,
      ),
    });
  }

  // 4. Coût du financement (15 pts) : critique pour un investisseur.
  if (regime.tauxSeResserre) {
    score += 6;
    facteurs.push({
      sens: "negatif",
      titre: T("Financement cher : calcul serré", "Costly financing: tight math", lang),
      detail: T(
        `Avec un fixe 5 ans à ${c.taux.fixe5ansQc} %, le cash-flow se comprime : ne comptez que sur des loyers vérifiés, jamais sur l'appréciation future.`,
        `With 5-year fixed at ${c.taux.fixe5ansQc}%, cash flow is squeezed: count only on verified rents, never on future appreciation.`,
        lang,
      ),
    });
  } else {
    score += 12;
    facteurs.push({
      sens: "positif",
      titre: T("Financement stable", "Stable financing", lang),
      detail: T(
        "Des taux stables préservent l'effet de levier : le montage financier reste lisible.",
        "Stable rates preserve leverage: the financing math stays readable.",
        lang,
      ),
    });
  }

  // 5. Risque politico-fiscal (15 pts) : l'élection peut changer les règles du jeu locatif.
  const e = c.elections.quebec2026;
  score += 8;
  facteurs.push({
    sens: "neutre",
    titre: T(`Élection le ${dateLongue(e.date, lang)} : règles du jeu en suspens`, `Election on ${dateLongue(e.date, lang)}: rules in flux`, lang),
    detail: T(
      "Scénario probable (PQ) : aides à l'achat et offre neuve — neutre pour les plex existants. À surveiller : QS propose de taxer 100 % des gains en capital sur les immeubles locatifs, le PCQ de libérer les loyers ≥ 2 500 $.",
      "Likely scenario (PQ): buyer aids and new supply — neutral for existing plexes. Watch: QS proposes taxing 100% of capital gains on rental buildings; the PCQ would free rents ≥ $2,500.",
      lang,
    ),
  });

  const niveau = niveauDe(score);
  const risques: string[] = [
    T(
      "Sans données de loyers réels, aucun rendement locatif n'est calculé : exigez les baux et les dépenses avant toute offre.",
      "Without real rent data, no rental yield is computed: demand leases and expenses before any offer.",
      lang,
    ),
  ];
  if (regime.tauxSeResserre)
    risques.push(
      T(
        "Un refinancement à taux plus élevé peut effacer la marge : simulez +2 points.",
        "Refinancing at higher rates can erase your margin: simulate +2 points.",
        lang,
      ),
    );
  risques.push(
    T(
      "Vacance, impayés, rénovations majeures : prévoyez 5 à 10 % des loyers en réserve.",
      "Vacancy, arrears, major repairs: budget 5–10% of rents in reserve.",
      lang,
    ),
  );

  const conseil =
    niveau === "favorable"
      ? T(
          "Le profil est solide : validez les loyers réels et les dépenses, visez un cash-flow positif dès l'achat, et négociez les inclusions.",
          "The profile is solid: verify real rents and expenses, target positive cash flow from day one, and negotiate inclusions.",
          lang,
        )
      : niveau === "neutre"
        ? T(
            "Investissement possible avec prudence : l'affaire doit tenir sans parier sur la hausse des prix — chiffres réels exigés.",
            "Possible investment with caution: the deal must work without betting on rising prices — real numbers required.",
            lang,
          )
        : T(
            "Ce bien n'est pas un véhicule d'investissement : cherchez un immeuble à revenus avec des loyers vérifiables.",
            "This property isn't an investment vehicle: look for an income property with verifiable rents.",
            lang,
          );

  return {
    type: "investir",
    niveau,
    score,
    chiffreCle: aRevenus
      ? `${pct(f, lang)} ${T("vs l'évaluation foncière", "vs assessment", lang)}`
      : T("Appréciation uniquement", "Appreciation only", lang),
    facteurs,
    risques,
    conseil,
  };
}

/**
 * Les trois verdicts d'un coup, dans l'ordre d'affichage.
 * Lève si la conjoncture est illisible (fichier absent/corrompu).
 */
export function analyserVerdicts(
  ctx: ContexteBien,
  lang: LangueVerdict = "fr",
): VerdictEnrichi[] {
  return [analyserVendre(ctx, lang), analyserAcheter(ctx, lang), analyserInvestir(ctx, lang)];
}
