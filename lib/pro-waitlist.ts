/* Professions proposées sur la liste d'attente pros (/pro).
 * Module partagé (pas de "use server") : utilisé par le formulaire
 * public et par la validation côté action serveur. */

export const WAITLIST_PROFESSIONS = [
  "Courtier",
  "Notaire",
  "Estimateur / Évaluateur",
  "Entrepreneur",
  "Autre",
] as const;

export type WaitlistProfession = (typeof WAITLIST_PROFESSIONS)[number];
