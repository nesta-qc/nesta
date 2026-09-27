/* Formateurs d'affichage du centre de contrôle (sans dépendance client). */

/** « il y a 12 min », « hier », ou date courte fr-CA. */
export function timeAgo(iso: string | null | undefined): string {
  if (!iso) return "—";
  const at = new Date(iso).getTime();
  if (Number.isNaN(at)) return "—";
  const diff = Date.now() - at;
  if (diff < 0) return "à l'instant";
  const min = Math.floor(diff / 60000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `il y a ${h} h`;
  const d = Math.floor(h / 24);
  if (d === 1) return "hier";
  if (d < 30) return `il y a ${d} j`;
  return new Date(iso).toLocaleDateString("fr-CA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Libellés lisibles des types d'événements d'activité. */
export function activityKindLabel(
  kind: "user" | "property" | "service_request" | "viewing" | "offer" | "favorite",
): string {
  const labels: Record<string, string> = {
    user: "Nouvel utilisateur",
    property: "Annonce",
    service_request: "Demande de service",
    viewing: "Demande de visite",
    offer: "Offre",
    favorite: "Favori",
  };
  return labels[kind] ?? kind;
}

/** Libellés lisibles des actions du journal d'audit. */
export function auditActionLabel(action: string): string {
  const labels: Record<string, string> = {
    "property.approved": "Annonce approuvée",
    "property.suspended": "Annonce suspendue",
    "property.archived": "Annonce archivée",
    "property.sent_back_to_draft": "Annonce renvoyée en brouillon",
    "property.status_changed": "Statut de l'annonce modifié",
    "user.role_granted": "Rôle attribué",
    "user.role_revoked": "Rôle révoqué",
    "service_request.status_changed": "Statut de la demande modifié",
    "service_request.note_updated": "Note interne mise à jour",
  };
  return labels[action] ?? action;
}

import { getServiceById } from "@/lib/services";

/** Rôles utilisateur affichables. */
export function roleLabel(role: string): string {
  const labels: Record<string, string> = {
    BUYER: "Acheteur",
    SELLER: "Vendeur",
    BROKER: "Courtier",
    AGENCY: "Agence",
    DEVELOPER: "Développeur",
    ADMIN: "Admin",
  };
  return labels[role] ?? role;
}

/** Nom d'un service à partir de son identifiant (avec repli). */
export function serviceRequestName(
  serviceId: string,
  fallback: string | null,
): string {
  return getServiceById(serviceId)?.name ?? fallback ?? serviceId;
}

/** « Sans nom » quand le profil n'a pas de nom d'affichage. */
export function displayNameOr(value: string | null | undefined): string {
  const clean = (value ?? "").trim();
  return clean.length > 0 ? clean : "Sans nom";
}
