import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import {
  fetchMarketStatsLive,
  parseMarketStats,
  type MarketStats,
} from "./agregats";

/* ============================================================
 * VEYLA — Snapshot centralisé des statistiques.
 * Avec ~5 000 nouvelles propriétés par jour, recalculer les
 * agrégats à chaque visite serait du gaspillage : UNE seule ligne
 * (table stats_snapshot, migration 000027) porte les agrégats
 * pré-calculés pour tout le site. Le snapshot se rafraîchit
 * automatiquement dès qu'il dépasse TTL_MS — verrou consultatif
 * côté SQL pour qu'une seule instance le recalcule à la fois.
 * Repli : si la table n'existe pas encore (migration non appliquée),
 * calcul live direct via market_stats(), comme avant.
 * ============================================================ */

/** Durée de validité d'un snapshot avant rafraîchissement : 1 h. */
export const STATS_TTL_MS = 60 * 60 * 1000;

export interface StatsSnapshot {
  stats: MarketStats;
  /** Date réelle du calcul (ISO) — affichée sur les pages, pas "aujourd'hui". */
  computedAt: string;
  /** true si le snapshot servi dépasse le TTL (refresh a échoué). */
  stale: boolean;
}

function toSnapshot(
  payload: unknown,
  computedAt: unknown,
  stale: boolean,
): StatsSnapshot | null {
  const stats = parseMarketStats(payload);
  if (!stats) return null;
  const at =
    typeof computedAt === "string" && !Number.isNaN(Date.parse(computedAt))
      ? computedAt
      : new Date().toISOString();
  return { stats, computedAt: at, stale };
}

async function liveFallback(): Promise<StatsSnapshot | null> {
  const stats = await fetchMarketStatsLive();
  if (!stats) return null;
  return { stats, computedAt: new Date().toISOString(), stale: false };
}

/**
 * Point d'entrée unique pour les statistiques du site.
 * Lit le snapshot centralisé, le rafraîchit s'il est périmé,
 * replie sur le calcul live si la table n'existe pas encore.
 */
export async function getStatsSnapshot(): Promise<StatsSnapshot | null> {
  if (!hasSupabaseConfig()) return null;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("stats_snapshot")
    .select("payload, computed_at")
    .eq("id", 1)
    .maybeSingle();

  // Table absente ou illisible (migration pas encore appliquée) : repli live.
  if (error || !data) return await liveFallback();

  const ageMs = Date.now() - Date.parse(data.computed_at as string);

  if (Number.isNaN(ageMs) || ageMs > STATS_TTL_MS) {
    // Snapshot périmé : demander un rafraîchissement (fonction SQL
    // SECURITY DEFINER avec verrou anti-concurrence, migration 000027).
    const { error: refreshError } = await supabase.rpc(
      "refresh_stats_snapshot",
    );
    if (!refreshError) {
      const { data: fresh, error: reReadError } = await supabase
        .from("stats_snapshot")
        .select("payload, computed_at")
        .eq("id", 1)
        .maybeSingle();
      if (!reReadError && fresh) {
        return toSnapshot(fresh.payload, fresh.computed_at, false);
      }
    }
    // Le refresh a échoué : servir l'ancien snapshot en le signalant,
    // ou repli live s'il n'y en a tout simplement pas.
    const stale = toSnapshot(data.payload, data.computed_at, true);
    return stale ?? (await liveFallback());
  }

  return toSnapshot(data.payload, data.computed_at, false);
}
