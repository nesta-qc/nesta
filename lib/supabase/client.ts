import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/env";

/**
 * Crée un client Supabase pour le navigateur (composants client, hooks).
 * Ne plante jamais au build : si les variables d'environnement sont absentes,
 * des valeurs factices sont utilisées (voir lib/env.ts).
 */
export function createClient() {
  return createBrowserClient(getSupabaseUrl(), getSupabaseAnonKey());
}
