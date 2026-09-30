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
export async function getPropertyProfile(
  id: string,
): Promise<PropertyProfileRow | null> {
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
}

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

/**
 * Tous les profils, colonnes allégées, triés par adresse.
 * Sert l'explorateur avec recherche et filtres instantanés (240 profils).
 */
export async function listPropertyProfilesForExplorer(
  limit = 500,
): Promise<ExplorerProfile[]> {
  if (!hasSupabaseConfig()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("property_profiles")
    .select("id, address, borough, city, assessment_total, property_category")
    .order("address", { ascending: true })
    .limit(limit);
  if (error || !data) return [];
  const out: ExplorerProfile[] = [];
  for (const raw of data as Record<string, unknown>[]) {
    const id = toText(raw.id);
    const address = toText(raw.address);
    if (!id || !address) continue;
    out.push({
      id,
      address,
      borough: toText(raw.borough),
      city: toText(raw.city) ?? "Montréal",
      assessment_total: toNumber(raw.assessment_total),
      property_category: toText(raw.property_category),
    });
  }
  return out;
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
