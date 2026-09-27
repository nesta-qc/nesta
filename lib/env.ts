/*
 * Lecture centralisée des variables d'environnement NESTA.
 *
 * Les fonctions `get*` ne plantent jamais : si une variable est absente,
 * elles retournent une valeur factice inoffensive (utile pour le build et
 * les états dégradés). Utilisez `hasSupabaseConfig()` pour décider
 * d'afficher un état dégradé propre plutôt que de tenter une connexion.
 */

/* Valeurs factices utilisées uniquement quand la configuration est absente. */
const FALLBACK_SUPABASE_URL = "http://127.0.0.1:1";
const FALLBACK_SUPABASE_ANON_KEY = "dummy-key";

/** URL publique du projet Supabase (ou valeur factice si absente). */
export function getSupabaseUrl(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL;
}

/** Clé publique « anon » du projet Supabase (ou valeur factice si absente). */
export function getSupabaseAnonKey(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;
}

/**
 * Clé « service_role » — serveur uniquement, jamais exposée au navigateur.
 * Retourne une chaîne vide si absente (aucune valeur factice : son usage
 * doit rester explicite).
 */
export function getSupabaseServiceRoleKey(): string {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
}

/**
 * Indique si la configuration Supabase est réellement fournie.
 * `false` → afficher des états dégradés propres, ne pas tenter d'appels réseau.
 */
export function hasSupabaseConfig(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
