import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { profileIdSchema } from "@/lib/validation";

/* ============================================================
 * NESTA — Profils de propriétés publiques (table property_profiles,
 * migration 000013). Données ouvertes de la Ville de Montréal —
 * JAMAIS des annonces à vendre.
 *
 * Robustesse : si la configuration Supabase est absente ou si la
 * table n'existe pas encore (migration 000013 non appliquée),
 * chaque fonction renvoie une valeur vide honnête (null / [])
 * plutôt qu'une erreur. Aucun appel DB au build time : ces
 * fonctions ne s'exécutent qu'à la requête (force-dynamic).
 * ============================================================ */

export interface PropertyProfileRow {
  id: string;
  address: string;
  borough: string | null;
  city: string;
  latitude: number | null;
  longitude: number | null;
  lot_area_sqm: number | null;
  construction_year: number | null;
  assessment_land: number | null;
  assessment_building: number | null;
  assessment_total: number | null;
  assessment_year: number | null;
  property_category: string | null;
  data_source: string;
  source_url: string | null;
  street_photo_url: string | null;
  street_photo_taken_at: string | null;
  street_photo_author: string | null;
  street_photo_source: string | null;
  created_at: string;
}

export interface AddressSuggestion {
  id: string;
  address: string;
  borough: string | null;
}

const PROFILE_COLUMNS =
  "id, address, borough, city, latitude, longitude, lot_area_sqm, construction_year, assessment_land, assessment_building, assessment_total, assessment_year, property_category, data_source, source_url, street_photo_url, street_photo_taken_at, street_photo_author, street_photo_source, created_at";

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

function toRow(raw: Record<string, unknown>): PropertyProfileRow | null {
  const id = toText(raw.id);
  const address = toText(raw.address);
  if (!id || !address) return null;
  return {
    id,
    address,
    borough: toText(raw.borough),
    city: toText(raw.city) ?? "Montréal",
    latitude: toNumber(raw.latitude),
    longitude: toNumber(raw.longitude),
    lot_area_sqm: toNumber(raw.lot_area_sqm),
    construction_year: toNumber(raw.construction_year),
    assessment_land: toNumber(raw.assessment_land),
    assessment_building: toNumber(raw.assessment_building),
    assessment_total: toNumber(raw.assessment_total),
    assessment_year: toNumber(raw.assessment_year),
    property_category: toText(raw.property_category),
    data_source: toText(raw.data_source) ?? "Ville de Montréal — Données ouvertes",
    source_url: toText(raw.source_url),
    street_photo_url: toText(raw.street_photo_url),
    street_photo_taken_at: toText(raw.street_photo_taken_at),
    street_photo_author: toText(raw.street_photo_author),
    street_photo_source: toText(raw.street_photo_source),
    created_at: toText(raw.created_at) ?? "",
  };
}

/** Un profil par son id, ou null (invalide, inexistant, ou table absente). */
export const getPropertyProfile = cache(
  async (id: string): Promise<PropertyProfileRow | null> => {
  if (!profileIdSchema.safeParse(id).success) return null;
  if (!hasSupabaseConfig()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("property_profiles")
    .select(PROFILE_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return toRow(data as Record<string, unknown>);
  },
);

/** Liste des profils (les plus récents d'abord), [] si rien ou table absente. */
export async function listPropertyProfiles(
  limit = 24,
): Promise<PropertyProfileRow[]> {
  if (!hasSupabaseConfig()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("property_profiles")
    .select(PROFILE_COLUMNS)
    .order("created_at", { ascending: false })
    .order("address", { ascending: true })
    .limit(limit);
  if (error || !data) return [];
  return (data as Record<string, unknown>[])
    .map(toRow)
    .filter((r): r is PropertyProfileRow => r !== null);
}

/** Nombre de profils, ou null quand le décompte est impossible. */
export async function countPropertyProfiles(): Promise<number | null> {
  if (!hasSupabaseConfig()) return null;
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("property_profiles")
    .select("id", { count: "exact", head: true });
  if (error || count === null) return null;
  return count;
}

/** Profil allégé pour l'explorateur Passeport (recherche + filtres côté client). */
export interface ExplorerProfile {
  id: string;
  address: string;
  borough: string | null;
  city: string;
  assessment_total: number | null;
  property_category: string | null;
}

/** Filtres de la recherche explorateur Passeport (côté serveur). */
export interface ExplorerSearchFilters {
  query: string;
  borough: string;
  maxValue: string;
}

const EXPLORER_SEARCH_LIMIT = 60;

/**
 * Recherche de profils côté serveur : UNE seule requête, 60 résultats max.
 * Remplace listPropertyProfilesForExplorer() qui balayait les 532k+ lignes
 * en 533 requêtes (~59 s). Au moins un filtre est requis par l'appelant.
 */
export async function searchExplorerProfiles(
  filters: ExplorerSearchFilters,
): Promise<{ profiles: ExplorerProfile[]; limited: boolean }> {
  const empty = { profiles: [], limited: false };
  if (!hasSupabaseConfig()) return empty;
  const query = filters.query.trim();
  const borough = filters.borough.trim();
  const max = filters.maxValue.trim() === "" ? null : Number(filters.maxValue);
  if (!query && !borough && (max === null || !Number.isFinite(max))) return empty;

  const supabase = await createClient();
  let req = supabase
    .from("property_profiles")
    .select("id, address, borough, city, assessment_total, property_category")
    .order("address", { ascending: true })
    .limit(EXPLORER_SEARCH_LIMIT + 1);
  if (query) {
    /* Échappe les caractères spéciaux du motif LIKE (% _ \). */
    const pattern = query.replace(/[\\%_]/g, (m) => `\\${m}`);
    req = req.ilike("address", `%${pattern}%`);
  }
  if (borough) req = req.eq("borough", borough);
  if (max !== null && Number.isFinite(max)) req = req.lte("assessment_total", max);

  const { data, error } = await req;
  if (error || !data) return empty;
  const rows = (data as Record<string, unknown>[])
    .map((raw) => {
      const id = toText(raw.id);
      const address = toText(raw.address);
      if (!id || !address) return null;
      return {
        id,
        address,
        borough: toText(raw.borough),
        city: toText(raw.city) ?? "Montréal",
        assessment_total: toNumber(raw.assessment_total),
        property_category: toText(raw.property_category),
      } satisfies ExplorerProfile;
    })
    .filter((r): r is ExplorerProfile => r !== null);
  const limited = rows.length > EXPLORER_SEARCH_LIMIT;
  return { profiles: rows.slice(0, EXPLORER_SEARCH_LIMIT), limited };
}

/**
 * Profils similaires à une fiche : même arrondissement (ou même ville),
 * même catégorie quand elle est connue. UNE seule requête, colonnes
 * légères — sert le maillage interne entre les 532k fiches.
 */
export async function getSimilarProfiles(
  profile: Pick<ExplorerProfile, "id" | "borough" | "city" | "property_category">,
  limit = 6,
): Promise<ExplorerProfile[]> {
  if (!hasSupabaseConfig()) return [];
  const supabase = await createClient();
  let req = supabase
    .from("property_profiles")
    .select("id, address, borough, city, assessment_total, property_category")
    .neq("id", profile.id)
    .order("address", { ascending: true })
    .limit(limit);
  if (profile.borough) req = req.eq("borough", profile.borough);
  else if (profile.city) req = req.eq("city", profile.city);
  if (profile.property_category) req = req.eq("property_category", profile.property_category);

  const { data, error } = await req;
  if (error || !data) return [];
  return (data as Record<string, unknown>[])
    .map((raw) => {
      const id = toText(raw.id);
      const address = toText(raw.address);
      if (!id || !address) return null;
      return {
        id,
        address,
        borough: toText(raw.borough),
        city: toText(raw.city) ?? "Montréal",
        assessment_total: toNumber(raw.assessment_total),
        property_category: toText(raw.property_category),
      } satisfies ExplorerProfile;
    })
    .filter((r): r is ExplorerProfile => r !== null);
}

/** Suggestions d'adresses pour l'autocomplétion (ilike, triées, limitées). */
export async function searchPropertyProfiles(
  query: string,
  limit = 8,
): Promise<AddressSuggestion[]> {
  const q = query.trim();
  if (q.length < 2 || q.length > 100) return [];
  if (!hasSupabaseConfig()) return [];
  const supabase = await createClient();
  /* Échappe les caractères spéciaux du motif LIKE (% _ \). */
  const pattern = q.replace(/[\\%_]/g, (m) => `\\${m}`);
  const { data, error } = await supabase
    .from("property_profiles")
    .select("id, address, borough")
    .ilike("address", `%${pattern}%`)
    .order("address", { ascending: true })
    .limit(limit);
  if (error || !data) return [];
  const rows = data as Record<string, unknown>[];
  const suggestions: AddressSuggestion[] = [];
  for (const row of rows) {
    const id = toText(row.id);
    const address = toText(row.address);
    if (!id || !address) continue;
    suggestions.push({ id, address, borough: toText(row.borough) });
  }
  return suggestions;
}

/* ============================================================
 * NESTA — Statistiques du marché (hub /statistiques).
 * Agrégats calculés EXCLUSIVEMENT depuis les profils Passeport
 * (property_profiles, données ouvertes de la Ville de Montréal).
 * Aucun chiffre inventé : si la base est inaccessible, null.
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

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? Math.round((sorted[mid - 1] + sorted[mid]) / 2)
    : sorted[mid];
}

/**
 * Agrégats honnêtes sur les profils Passeport : répartition par
 * arrondissement et par catégorie, valeur au rôle (médiane/min/max),
 * années de construction et années de rôle couvertes.
 *
 * Calculés côté Postgres via la fonction SQL market_stats() (migration
 * 000014) : UNE seule requête d'agrégation au lieu de balayer les
 * 532k+ lignes page par page (timeout garanti depuis l'import Montérégie).
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

export async function getMarketStats(): Promise<MarketStats | null> {
  if (!hasSupabaseConfig()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("market_stats");
  if (error || data === null || typeof data !== "object") return null;
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
