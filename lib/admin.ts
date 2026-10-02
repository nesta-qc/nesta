import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getViewerContext, type ViewerContext } from "@/lib/auth";

/* ============================================================
 * VEYLA — helpers serveur pour le centre de contrôle (/admin).
 *
 * Sécurité (défense en profondeur) :
 *  1. requireAdmin() : vérifie la session + le rôle ADMIN côté
 *     serveur. Le layout /admin l'appelle avant tout rendu ;
 *     un non-admin est redirigé vers l'accueil (jamais de 404
 *     qui confirmerait l'existence de la route).
 *  2. Chaque Server Action revérifie getViewerContext().isAdmin.
 *  3. Les policies RLS (is_admin()) restent la barrière
 *     principale : même avec l'anon key, un non-admin ne peut
 *     ni lire ni écrire les données admin.
 * ============================================================ */

/** Exige un administrateur connecté, sinon redirection vers "/". */
export async function requireAdmin(): Promise<ViewerContext> {
  const viewer = await getViewerContext();
  if (!viewer.user || !viewer.isAdmin) {
    redirect("/");
  }
  return viewer;
}

/** Vérifie le rôle admin sans rediriger (pour les Server Actions). */
export async function assertAdmin(): Promise<ViewerContext | null> {
  const viewer = await getViewerContext();
  if (!viewer.user || !viewer.isAdmin) return null;
  return viewer;
}

export interface AuditInput {
  action: string;
  objectType: string;
  objectId: string;
  oldValue?: unknown;
  newValue?: unknown;
}

/**
 * Écrit une entrée dans le journal d'audit admin.
 * Best-effort : ne fait jamais échouer l'action appelante
 * (la migration 000014 doit être appliquée pour persister).
 */
export async function logAdminAction(
  adminId: string,
  input: AuditInput,
): Promise<void> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("admin_audit_log").insert({
      admin_id: adminId,
      action: input.action,
      object_type: input.objectType,
      object_id: input.objectId,
      old_value: input.oldValue ?? null,
      new_value: input.newValue ?? null,
    });
    if (error) {
      console.warn("[admin] audit log indisponible :", error.message);
    }
  } catch (e) {
    console.warn("[admin] audit log exception :", e);
  }
}

/** Début de période ISO pour les filtres temporels de l'Overview. */
export type AdminPeriod = "today" | "7d" | "30d" | "90d" | "1y";

export const ADMIN_PERIODS: { id: AdminPeriod; label: string }[] = [
  { id: "today", label: "Aujourd’hui" },
  { id: "7d", label: "7 derniers jours" },
  { id: "30d", label: "30 jours" },
  { id: "90d", label: "90 jours" },
  { id: "1y", label: "Année" },
];

export function periodStartIso(period: AdminPeriod): string {
  const now = new Date();
  const d = new Date(now);
  switch (period) {
    case "today":
      d.setHours(0, 0, 0, 0);
      break;
    case "7d":
      d.setDate(d.getDate() - 7);
      break;
    case "30d":
      d.setDate(d.getDate() - 30);
      break;
    case "90d":
      d.setDate(d.getDate() - 90);
      break;
    case "1y":
      d.setFullYear(d.getFullYear() - 1);
      break;
  }
  return d.toISOString();
}

export function isAdminPeriod(value: unknown): value is AdminPeriod {
  return (
    value === "today" ||
    value === "7d" ||
    value === "30d" ||
    value === "90d" ||
    value === "1y"
  );
}
