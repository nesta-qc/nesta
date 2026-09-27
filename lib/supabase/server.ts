import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/env";

/**
 * Crée un client Supabase pour le serveur (Server Components, Server Actions,
 * Route Handlers). Les cookies de session sont lus/écrits via next/headers.
 *
 * Un nouveau client doit être créé à chaque requête (jamais de singleton).
 * Ne plante jamais au build : valeurs factices si la config est absente.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          /* Appelé depuis un Server Component : l'écriture de cookies
             n'y est pas permise, la session sera rafraîchie par le proxy. */
        }
      },
    },
  });
}
