import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";

/* ============================================================
 * VEYLA — contexte d'authentification côté serveur.
 *
 * Utilisé par les pages et les Server Actions pour gater
 * l'accès. Défense en profondeur : les policies RLS restent
 * la barrière principale, ces vérifications évitent en plus
 * d'exposer des formulaires ou des données à qui n'y a pas droit.
 * ============================================================ */

/** Rôles autorisés à créer/gérer des annonces (miroir de has_listing_role()). */
export const LISTING_ROLES = [
  "SELLER",
  "BROKER",
  "AGENCY",
  "DEVELOPER",
  "ADMIN",
] as const;

export interface ViewerContext {
  user: User | null;
  roles: string[];
  isAdmin: boolean;
  hasListingRole: boolean;
}

const ANONYMOUS: ViewerContext = {
  user: null,
  roles: [],
  isAdmin: false,
  hasListingRole: false,
};

/**
 * Retourne l'utilisateur connecté et ses rôles.
 * Ne plante jamais : sans configuration Supabase ou sans
 * session, retourne un contexte anonyme.
 */
export async function getViewerContext(): Promise<ViewerContext> {
  if (!hasSupabaseConfig()) return ANONYMOUS;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return ANONYMOUS;

  const { data: roleRows } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", data.user.id);

  const roles: string[] = Array.isArray(roleRows)
    ? roleRows
        .map((r: { role?: unknown }) =>
          typeof r.role === "string" ? r.role : "",
        )
        .filter(Boolean)
    : [];

  return {
    user: data.user,
    roles,
    isAdmin: roles.includes("ADMIN"),
    hasListingRole: roles.some((r) =>
      (LISTING_ROLES as readonly string[]).includes(r),
    ),
  };
}
