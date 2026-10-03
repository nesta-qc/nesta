import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";

/* ============================================================
 * VEYLA — Statistiques du marché : source centrale des agrégats.
 * Toutes les pages qui affichent des statistiques (/statistiques,
 * /statistiques/villes, /statistiques/arrondissements, /passeport)
 * passent par ce module — jamais de requêtes d'agrégation dispersées.
 * Les agrégats sont calculés EXCLUSIVEMENT depuis les profils
 * Passeport (property_profiles, données ouvertes). Aucun chiffre
 * inventé : si la base est inaccessible, null.
 * ============================================================ */

export interface BoroughStat {
  borough: string;
  count: number;
  medianAssessment: number | null;
}

export interface CityStat {
  city: string;
  count: number;
  medianAssessment: number | null;
  boroughs: BoroughStat[];
}

export interface CategoryStat {
  category: string;
  count: number;
}

export interface AssessmentYearStat {
  year: number;
  count: number;
}

export interface MarketStats {
  total: number;
  medianAssessment: number | null;
  minAssessment: number | null;
  maxAssessment: number | null;
  boroughs: BoroughStat[];
  cities: CityStat[];
  categories: CategoryStat[];
  medianConstructionYear: number | null;
  oldestConstructionYear: number | null;
  newestConstructionYear: number | null;
  assessmentYears: AssessmentYearStat[];
}

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

function toText(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const s = String(value);
  return s === "" ? null : s;
}

/**
 * Agrégats bruts calculés côté Postgres via la fonction SQL market_stats()
 * (migration 000014) : UNE seule requête d'agrégation au lieu de balayer
 * les 500k+ lignes page par page.
 */
function toBoroughStat(raw: unknown): BoroughStat | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  const borough = toText(r.borough);
  const count = toNumber(r.count);
  if (borough === null || count === null) return null;
  return { borough, count, medianAssessment: toNumber(r.medianAssessment) };
}

function toCityStat(raw: unknown): CityStat | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  const city = toText(r.city);
  const count = toNumber(r.count);
  if (city === null || count === null) return null;
  const boroughs = Array.isArray(r.boroughs)
    ? r.boroughs.map(toBoroughStat).filter((b): b is BoroughStat => b !== null)
    : [];
  return {
    city,
    count,
    medianAssessment: toNumber(r.medianAssessment),
    boroughs,
  };
}

/** Valide et normalise un payload market_stats() brut (RPC ou snapshot). */
export function parseMarketStats(data: unknown): MarketStats | null {
  if (data === null || typeof data !== "object") return null;
  const s = data as Record<string, unknown>;
  const total = toNumber(s.total);
  if (total === null) return null;
  return {
    total,
    medianAssessment: toNumber(s.medianAssessment),
    minAssessment: toNumber(s.minAssessment),
    maxAssessment: toNumber(s.maxAssessment),
    boroughs: Array.isArray(s.boroughs)
      ? s.boroughs.map(toBoroughStat).filter((b): b is BoroughStat => b !== null)
      : [],
    cities: Array.isArray(s.cities)
      ? s.cities.map(toCityStat).filter((c): c is CityStat => c !== null)
      : [],
    categories: Array.isArray(s.categories)
      ? s.categories.flatMap((raw) => {
          if (typeof raw !== "object" || raw === null) return [];
          const r = raw as Record<string, unknown>;
          const category = toText(r.category);
          const count = toNumber(r.count);
          return category !== null && count !== null ? [{ category, count }] : [];
        })
      : [],
    medianConstructionYear: toNumber(s.medianConstructionYear),
    oldestConstructionYear: toNumber(s.oldestConstructionYear),
    newestConstructionYear: toNumber(s.newestConstructionYear),
    assessmentYears: Array.isArray(s.assessmentYears)
      ? s.assessmentYears.flatMap((raw) => {
          if (typeof raw !== "object" || raw === null) return [];
          const r = raw as Record<string, unknown>;
          const year = toNumber(r.year);
          const count = toNumber(r.count);
          return year !== null && count !== null ? [{ year, count }] : [];
        })
      : [],
  };
}

/**
 * Calcul live des agrégats (requête d'agrégation complète).
 * Utilisé comme repli si le snapshot centralisé n'existe pas encore,
 * et par le rafraîchissement du snapshot côté SQL.
 */
export async function fetchMarketStatsLive(): Promise<MarketStats | null> {
  if (!hasSupabaseConfig()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("market_stats");
  if (error || data === null) return null;
  return parseMarketStats(data);
}
