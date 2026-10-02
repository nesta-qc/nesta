import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseServiceRoleKey } from "@/lib/env";

/* ============================================================
 * VEYLA — client Supabase « service_role » (serveur uniquement).
 *
 * Réservé aux traitements de confiance : webhook Stripe, tâches
 * d'administration. Contourne le RLS : à n'utiliser que sur des
 * données déjà validées (signature webhook vérifiée, etc.).
 *
 * Retourne null si la clé service_role est absente : l'appelant
 * doit dégrader proprement (log, pas de crash).
 * ============================================================ */

let cached: SupabaseClient | null = null;

export function getServiceClient(): SupabaseClient | null {
  const key = getSupabaseServiceRoleKey();
  if (!key) return null;
  if (!cached) {
    cached = createClient(getSupabaseUrl(), key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}
