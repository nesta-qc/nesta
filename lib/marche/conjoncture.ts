import { readFileSync } from "node:fs";
import { join } from "node:path";
import { tendance12Mois, moisLePlusRecent } from "./indice";

/* ============================================================
 * VEYLA — Système Marché : régime de marché et conjoncture.
 *
 * Combine deux sources :
 *  1. la dynamique mesurée (indice mensuel APCIQ/FCIQ :
 *     tendance 12 mois, phase du cycle) ;
 *  2. la conjoncture curatorée (data/marche/conjoncture.json :
 *     taux, élections, économie — veille sourcée, mise à jour
 *     par la veille hebdomadaire).
 *
 * Le régime alimente les verdicts Acheter/Vendre/Investir avec
 * du contexte réel, pas seulement le facteur du bien.
 * ============================================================ */

const CONJONCTURE_PATH = join(process.cwd(), "data", "marche", "conjoncture.json");

export type PhaseMarche =
  | "expansion"
  | "equilibre"
  | "reequilibrage"
  | "correction"
  | "marche_acheteurs";

export interface Conjoncture {
  miseAJour: string;
  taux: {
    bdc: number;
    bdcDepuis: string;
    bdcProchaineDecision: string;
    bdcDirection: string;
    bdcPerspective: string;
    fixe5ansQc: number;
    variable5ansQc: number;
    tauxFixesTendance: string;
    fed: string;
    hypothecaireUS30ans: number;
    usdCad: number;
  };
  marche: Record<string, Record<string, number | string>>;
  elections: {
    quebec2026: {
      date: string;
      statut: string;
      sondages: string;
      scenarioProbable: string;
      impacts: Record<string, string>;
    };
  };
  economie: Record<string, number | string>;
  previsions: Record<string, string>;
  sources: string[];
  note: string;
}

let conjonctureCache: Conjoncture | null = null;

/** Conjoncture curatorée (veille sourcée). Lève si le fichier est absent. */
export function chargerConjoncture(): Conjoncture {
  if (conjonctureCache) return conjonctureCache;
  const raw = readFileSync(CONJONCTURE_PATH, "utf-8");
  conjonctureCache = JSON.parse(raw) as Conjoncture;
  return conjonctureCache;
}

export interface RegimeMarche {
  /** Phase dominante pour Montréal/Québec (marché couvert par le moteur). */
  phase: PhaseMarche;
  /** Tendance mesurée de l'indice sur 12 mois (%, null si inconnue). */
  tendance12: number | null;
  /** Mois le plus récent de l'indice. */
  moisReference: string;
  /** Le coût du crédit se resserre-t-il ? */
  tauxSeResserre: boolean;
  /** L'incertitude politique est-elle élevée (élection imminente) ? */
  incertitudePolitique: boolean;
  /** Résumé en une phrase, prêt à afficher. */
  resume: string;
}

/**
 * Détermine le régime de marché : phase mesurée (Montréal, marché
 * de référence du moteur) croisée avec la direction des taux et
 * le calendrier électoral.
 */
export function analyserRegime(): RegimeMarche {
  const c = chargerConjoncture();
  const tendance12 = tendance12Mois();
  const moisReference = moisLePlusRecent();

  const mtl = c.marche.montreal ?? {};
  const phaseBrute = String(mtl.phase ?? "equilibre");
  const phase: PhaseMarche = (
    ["expansion", "equilibre", "reequilibrage", "correction", "marche_acheteurs"] as const
  ).includes(phaseBrute as PhaseMarche)
    ? (phaseBrute as PhaseMarche)
    : "equilibre";

  const tauxSeResserre =
    c.taux.tauxFixesTendance === "hausse" || c.taux.bdcDirection !== "baisse";

  // Élection dans moins de 30 jours → incertitude élevée.
  const dateScrutin = new Date(c.elections.quebec2026.date + "T00:00:00");
  const joursAvant = Math.ceil(
    (dateScrutin.getTime() - Date.now()) / (24 * 3600 * 1000),
  );
  const incertitudePolitique = joursAvant >= 0 && joursAvant <= 30;

  const morceaux: string[] = [];
  if (phase === "reequilibrage")
    morceaux.push("en rééquilibrage (plus d'inventaire, délais qui s'allongent)");
  else if (phase === "correction") morceaux.push("en correction");
  else if (phase === "marche_acheteurs") morceaux.push("d'acheteurs");
  else if (phase === "expansion") morceaux.push("en expansion");
  else morceaux.push("équilibré");
  if (tendance12 !== null)
    morceaux.push(`tendance ${tendance12 >= 0 ? "+" : ""}${tendance12} % sur 12 mois`);
  if (tauxSeResserre) morceaux.push("coût du crédit en resserrement");
  if (incertitudePolitique)
    morceaux.push(`élection québécoise dans ${joursAvant} jour${joursAvant > 1 ? "s" : ""}`);

  return {
    phase,
    tendance12,
    moisReference,
    tauxSeResserre,
    incertitudePolitique,
    resume: `Marché ${morceaux.join(" ; ")}.`,
  };
}

/** Pour les tests et le diagnostic : vide le cache. */
export function _viderCacheConjoncture(): void {
  conjonctureCache = null;
}
