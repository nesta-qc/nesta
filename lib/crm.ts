/* Constantes et calculs du CRM de prospection (utilisables côté client). */

import {
  PROSPECT_STATUS_LABELS,
  type ProspectStatus,
} from "@/lib/prospects";

/** Libellés français des étapes du pipeline (alias de la prospection). */
export const STAGE_LABELS: Record<ProspectStatus, string> =
  PROSPECT_STATUS_LABELS;

/**
 * Probabilité de conversion estimée par étape du pipeline.
 * Sert au calcul de la valeur pondérée (probabilité × valeur du deal).
 */
export const STAGE_PROBABILITY: Record<ProspectStatus, number> = {
  a_contacter: 0.05,
  contacte: 0.1,
  sans_reponse: 0.08,
  interesse: 0.3,
  en_discussion: 0.6,
  partenaire: 1.0,
  refuse: 0,
};

/** Valeur d'un deal VEYLA Projets : 4 800 $/an par projet, en cents. */
export const DEAL_VALUE_PER_PROJECT_CENTS = 480000;

export interface PipelineProspect {
  status: ProspectStatus;
  estimated_projects?: number | null;
}

/** Valeur pondérée du pipeline, en cents. */
export function pipelineValue(prospects: PipelineProspect[]): number {
  return prospects.reduce((sum, p) => {
    const prob = STAGE_PROBABILITY[p.status] ?? 0;
    const projects = Math.max(0, p.estimated_projects ?? 1);
    return sum + prob * projects * DEAL_VALUE_PER_PROJECT_CENTS;
  }, 0);
}

/** « 1 234 567 $ » à partir de cents. */
export function formatMoney(cents: number): string {
  return `${Math.round(cents / 100).toLocaleString("fr-CA")} $`;
}

/* Confiance dans l'adresse courriel du prospect. */

export const EMAIL_CONFIDENCE = [
  "verifie",
  "a_confirmer",
  "manquant",
] as const;

export type EmailConfidence = (typeof EMAIL_CONFIDENCE)[number];

export const EMAIL_CONFIDENCE_LABELS: Record<EmailConfidence, string> = {
  verifie: "Vérifié",
  a_confirmer: "À confirmer",
  manquant: "Manquant",
};

export function isEmailConfidence(value: unknown): value is EmailConfidence {
  return (EMAIL_CONFIDENCE as readonly string[]).includes(value as string);
}

/* Types d'activités du journal de suivi. */

export const ACTIVITY_TYPES = [
  "note",
  "email_envoye",
  "reponse",
  "appel",
  "rdv",
  "changement_statut",
] as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  note: "Note",
  email_envoye: "Email envoyé",
  reponse: "Réponse reçue",
  appel: "Appel",
  rdv: "Rendez-vous",
  changement_statut: "Changement de statut",
};

export function isActivityType(value: unknown): value is ActivityType {
  return (ACTIVITY_TYPES as readonly string[]).includes(value as string);
}

/** Statuts des lots d'envoi. */
export const BATCH_STATUS_LABELS: Record<string, string> = {
  brouillon: "Brouillon",
  approuve: "Approuvé",
  envoye: "Envoyé",
};

/**
 * Remplace {{prenom}} {{entreprise}} {{projet}} dans un modèle.
 * Valeurs de démonstration quand le prospect n'en a pas.
 */
export function renderTemplate(
  template: string,
  vars: { prenom?: string | null; entreprise?: string | null; projet?: string | null },
): string {
  return template
    .replace(/\{\{\s*prenom\s*\}\}/g, (vars.prenom ?? "").trim() || "Marie")
    .replace(/\{\{\s*entreprise\s*\}\}/g, (vars.entreprise ?? "").trim() || "Constructions Exemple")
    .replace(/\{\{\s*projet\s*\}\}/g, (vars.projet ?? "").trim() || "le Boisé du Parc");
}

/**
 * Un RDV peut porter sa date en préfixe du body : "[2026-10-05 14:00] ...".
 * Retourne la date ISO si présente, sinon null.
 */
export function parseRdvDate(body: string | null | undefined): string | null {
  if (!body) return null;
  const m = body.match(/^\[(\d{4}-\d{2}-\d{2})(?: (\d{2}:\d{2}))?\]/);
  if (!m) return null;
  const d = new Date(`${m[1]}T${m[2] ?? "09:00"}:00`);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

/** Retire le préfixe de date d'un body de RDV pour l'affichage. */
export function stripRdvDatePrefix(body: string | null | undefined): string {
  return (body ?? "").replace(/^\[\d{4}-\d{2}-\d{2}(?: \d{2}:\d{2})?\] ?/, "");
}
