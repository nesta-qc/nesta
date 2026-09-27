"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { propertyIdSchema } from "@/lib/validation";

export interface FavoriteToggleResult {
  ok: boolean;
  favorite: boolean;
  error?: string;
}

/**
 * Ajoute ou retire une propriété des favoris de l'utilisateur connecté.
 * Utilise la table réelle `favorites` (RLS : accès strict au propriétaire).
 */
export async function toggleFavorite(
  propertyId: string,
): Promise<FavoriteToggleResult> {
  if (!hasSupabaseConfig()) {
    return { ok: false, favorite: false, error: "Service indisponible." };
  }
  if (!propertyIdSchema.safeParse(propertyId).success) {
    return { ok: false, favorite: false, error: "Annonce invalide." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      ok: false,
      favorite: false,
      error: "Connectez-vous pour sauvegarder des favoris.",
    };
  }

  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("property_id", propertyId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("property_id", propertyId);
    if (error) {
      return { ok: false, favorite: true, error: "Impossible de retirer le favori." };
    }
    revalidatePath("/favoris");
    revalidatePath("/search");
    return { ok: true, favorite: false };
  }

  const { error } = await supabase.from("favorites").insert({
    user_id: user.id,
    property_id: propertyId,
  });
  if (error) {
    return { ok: false, favorite: false, error: "Impossible d'ajouter le favori." };
  }
  revalidatePath("/favoris");
  revalidatePath("/search");
  return { ok: true, favorite: true };
}

/** IDs des propriétés favorites de l'utilisateur connecté (ensemble vide si anonyme). */
export async function getFavoriteIds(): Promise<Set<string>> {
  if (!hasSupabaseConfig()) return new Set();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Set();
  const { data } = await supabase
    .from("favorites")
    .select("property_id")
    .eq("user_id", user.id);
  return new Set((data ?? []).map((r: { property_id: string }) => r.property_id));
}

/** Propriétés favorites publiées de l'utilisateur (pour /favoris). */
export async function getFavoriteProperties() {
  if (!hasSupabaseConfig()) return [];
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase
    .from("favorites")
    .select(
      "property_id, properties!inner(id, asking_price, address, city, property_type, bedrooms, bathrooms, living_area, virtual_tour_enabled, status)",
    )
    .eq("user_id", user.id)
    .eq("properties.status", "published")
    .order("created_at", { ascending: false });
  return (data ?? []).map((r: { properties: unknown }) => r.properties);
}
