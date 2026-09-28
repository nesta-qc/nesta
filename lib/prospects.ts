/* Constantes partagées de la prospection (utilisables côté client). */

export const PROSPECT_STATUSES = [
  "a_contacter",
  "contacte",
  "interesse",
  "en_discussion",
  "partenaire",
  "refuse",
  "sans_reponse",
] as const;

export type ProspectStatus = (typeof PROSPECT_STATUSES)[number];

export const PROSPECT_STATUS_LABELS: Record<ProspectStatus, string> = {
  a_contacter: "À contacter",
  contacte: "Contacté",
  interesse: "Intéressé",
  en_discussion: "En discussion",
  partenaire: "Partenaire",
  refuse: "Refusé",
  sans_reponse: "Sans réponse",
};
