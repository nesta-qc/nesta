"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { getViewerContext } from "@/lib/auth";
import { resolveVirtualTourForSave } from "@/lib/virtual-tours";
import type { PropertyActionState } from "@/lib/action-state";
import {
  adminStatusSchema,
  propertyIdSchema,
  propertySchema,
  sellerStatusSchema,
  SEARCH_PAGE_SIZE,
  type PropertyInput,
  type PropertyMediaRow,
  type PropertyRow,
  type ProfileRow,
} from "@/lib/validation";

/* ============================================================
 * NESTA — Server Actions : annonces (rôle SELLER) + admin.
 *
 * Défense en profondeur : chaque écriture vérifie
 *  1. la configuration Supabase (erreur propre, jamais de crash),
 *  2. la session (utilisateur connecté),
 *  3. le rôle (rôle vendeur / ADMIN selon l'action),
 *  4. les données (zod),
 *  5. l'appartenance (owner_id = utilisateur courant avant tout
 *     UPDATE/DELETE — en plus des policies RLS).
 *
 * La colonne `location` (geography) n'est JAMAIS écrite à la
 * main : le trigger `trg_properties_location` la calcule depuis
 * latitude/longitude.
 * ============================================================ */

/* ---------- Types de retour ---------- */

/* La taille de page de recherche vit dans lib/validation.ts
   (SEARCH_PAGE_SIZE) : un module 'use server' ne peut exporter
   que des fonctions async. */

/** Taille maximale d'une photo : 10 Mo. */
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

/** Champs modifiables via le formulaire (owner_id et status exclus). */
const UPDATABLE_FIELDS = [
  "address",
  "city",
  "postal_code",
  "listing_type",
  "property_type",
  "asking_price",
  "bedrooms",
  "bathrooms",
  "living_area",
  "lot_area",
  "year_built",
  "latitude",
  "longitude",
  "municipal_tax",
  "school_tax",
  "description",
  "virtual_tour_provider",
  "virtual_tour_url",
] as const;

/* ---------- Petits utilitaires ---------- */

/**
 * Marqueur d'annonce interne de test : l'adresse commence par « [TEST ».
 * Ces annonces sont EXCLUES de toutes les surfaces publiques
 * (recherche, espace investisseurs, passeport via getPublicProperty),
 * même avec status='published'. Le propriétaire et les administrateurs
 * les voient toujours. Correction côté code uniquement : on ne touche
 * jamais au statut en base depuis ici.
 */
function isInternalTestProperty(p: { address: string | null | undefined }): boolean {
  return (p.address ?? "").startsWith("[TEST");
}

function asRows<T>(data: unknown): T[] {
  return Array.isArray(data) ? (data as T[]) : [];
}

function asSingle<T>(data: unknown): T | null {
  return data !== null && typeof data === "object" ? (data as T) : null;
}

function configError(): PropertyActionState {
  return {
    ok: false,
    message:
      "La base de données n'est pas configurée. Réessayez une fois la configuration terminée.",
  };
}

function fieldErrors(
  input: unknown,
): Record<string, string[]> | undefined {
  const parsed = propertySchema.safeParse(input);
  if (parsed.success) return undefined;
  return parsed.error.flatten().fieldErrors as Record<string, string[]>;
}

/** Extrait les champs du formulaire en objet brut pour zod. */
function formToInput(formData: FormData): Record<string, unknown> {
  const input: Record<string, unknown> = {};
  for (const field of UPDATABLE_FIELDS) {
    input[field] = formData.get(field);
  }
  return input;
}

function sanitizeFileName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "photo";
  const clean = base.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
  return clean.length > 0 ? clean : "photo";
}

/* ============================================================
 * CRÉATION
 * ============================================================ */

/**
 * Crée une annonce en brouillon ou publiée.
 * `intent` = "draft" | "published" (bouton cliqué).
 * En mode "published", redirige vers la page de l'annonce.
 */
export async function createProperty(
  _prevState: PropertyActionState,
  formData: FormData,
): Promise<PropertyActionState> {
  if (!hasSupabaseConfig()) return configError();

  const viewer = await getViewerContext();
  if (!viewer.user) {
    return { ok: false, message: "Connectez-vous pour publier une annonce." };
  }
  if (!viewer.hasListingRole) {
    return {
      ok: false,
      message: "Crée ton compte vendeur via l'onboarding pour publier une annonce.",
    };
  }

  const intentRaw = formData.get("intent");
  const intentParsed = sellerStatusSchema.safeParse(
    intentRaw === "published" ? "published" : "draft",
  );
  const status = intentParsed.success ? intentParsed.data : "draft";

  const errors = fieldErrors(formToInput(formData));
  if (errors) {
    return { ok: false, errors, message: "Vérifiez les champs du formulaire." };
  }
  const parsed = propertySchema.parse(formToInput(formData));

  const tour = resolveTourColumns(parsed);
  if (!tour.ok) return tour.state;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .insert({
      owner_id: viewer.user.id,
      status,
      ...pickUpdatable(parsed),
      /* Colonnes visite virtuelle : valeurs résolues côté serveur. */
      ...tour.columns,
      /* location : jamais écrite à la main (trigger DB). */
    })
    .select("id")
    .single();

  if (error || !asSingle<{ id: string }>(data)) {
    return {
      ok: false,
      message: "La création de l'annonce a échoué. Réessayez.",
    };
  }
  const propertyId = asSingle<{ id: string }>(data)?.id as string;

  revalidatePath("/search");
  revalidatePath("/sell/annonces");
  revalidatePath(`/properties/${propertyId}`);

  if (status === "published") {
    redirect(`/properties/${propertyId}`);
  }
  return { ok: true, propertyId };
}

/** Ne conserve que les champs modifiables (jamais owner_id). */
function pickUpdatable(parsed: PropertyInput): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const field of UPDATABLE_FIELDS) {
    out[field] = parsed[field] ?? null;
  }
  return out;
}

/**
 * Validation autoritaire de la visite virtuelle (serveur).
 * Retourne les colonnes DB à écrire, ou un état d'erreur avec
 * l'erreur rattachée au champ URL du formulaire.
 */
function resolveTourColumns(
  parsed: PropertyInput,
):
  | { ok: true; columns: Record<string, unknown> }
  | { ok: false; state: PropertyActionState } {
  const result = resolveVirtualTourForSave(
    parsed.virtual_tour_provider ?? "none",
    parsed.virtual_tour_url ?? "",
  );
  if (!result.ok) {
    return {
      ok: false,
      state: {
        ok: false,
        errors: { virtual_tour_url: [result.error] },
        message: "Vérifiez les champs du formulaire.",
      },
    };
  }
  const t = result.tour;
  return {
    ok: true,
    columns: {
      virtual_tour_provider: t.provider,
      virtual_tour_url: t.url,
      virtual_tour_id: t.tourId,
      virtual_tour_enabled: t.enabled,
    },
  };
}

/* ============================================================
 * MODIFICATION / SUPPRESSION
 * ============================================================ */

/** Vérifie que l'utilisateur est owner de l'annonce (ou admin). */
async function checkOwnership(
  propertyId: string,
  userId: string,
  isAdmin: boolean,
): Promise<{ ok: true; property: PropertyRow } | { ok: false; message: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", propertyId)
    .single();

  const property = error ? null : asSingle<PropertyRow>(data);
  if (!property) {
    return { ok: false, message: "Annonce introuvable." };
  }
  if (property.owner_id !== userId && !isAdmin) {
    return { ok: false, message: "Vous n'êtes pas autorisé à modifier cette annonce." };
  }
  return { ok: true, property };
}

export async function updateProperty(
  _prevState: PropertyActionState,
  formData: FormData,
): Promise<PropertyActionState> {
  if (!hasSupabaseConfig()) return configError();

  const viewer = await getViewerContext();
  if (!viewer.user) {
    return { ok: false, message: "Connectez-vous pour modifier une annonce." };
  }

  const idRaw = formData.get("id");
  const idParsed = propertyIdSchema.safeParse(idRaw);
  if (!idParsed.success) {
    return { ok: false, message: "Identifiant d'annonce invalide." };
  }

  const ownership = await checkOwnership(
    idParsed.data,
    viewer.user.id,
    viewer.isAdmin,
  );
  if (!ownership.ok) return ownership;

  const errors = fieldErrors(formToInput(formData));
  if (errors) {
    return { ok: false, errors, message: "Vérifiez les champs du formulaire." };
  }
  const parsed = propertySchema.parse(formToInput(formData));

  const tour = resolveTourColumns(parsed);
  if (!tour.ok) return tour.state;

  const supabase = await createClient();
  const { error } = await supabase
    .from("properties")
    .update({ ...pickUpdatable(parsed), ...tour.columns })
    .eq("id", idParsed.data);

  if (error) {
    return {
      ok: false,
      message: "La mise à jour a échoué. Réessayez.",
    };
  }

  revalidatePath("/search");
  revalidatePath("/sell/annonces");
  revalidatePath(`/properties/${idParsed.data}`);
  revalidatePath(`/properties/${idParsed.data}/modifier`);

  return { ok: true, propertyId: idParsed.data, message: "Modifications enregistrées." };
}

export async function deleteProperty(
  propertyId: string,
): Promise<PropertyActionState> {
  if (!hasSupabaseConfig()) return configError();

  const viewer = await getViewerContext();
  if (!viewer.user) {
    return { ok: false, message: "Connectez-vous pour supprimer une annonce." };
  }

  const idParsed = propertyIdSchema.safeParse(propertyId);
  if (!idParsed.success) {
    return { ok: false, message: "Identifiant d'annonce invalide." };
  }

  const ownership = await checkOwnership(
    idParsed.data,
    viewer.user.id,
    viewer.isAdmin,
  );
  if (!ownership.ok) return ownership;

  const supabase = await createClient();

  /* Nettoyage best-effort des fichiers du bucket (jamais bloquant). */
  try {
    const { data: objects } = await supabase.storage
      .from("property-media")
      .list(idParsed.data);
    const paths = asRows<{ name: string }>(objects).map(
      (o) => `${idParsed.data}/${o.name}`,
    );
    if (paths.length > 0) {
      await supabase.storage.from("property-media").remove(paths);
    }
  } catch {
    /* Le nettoyage du stockage ne doit pas empêcher la suppression. */
  }

  const { error } = await supabase
    .from("properties")
    .delete()
    .eq("id", idParsed.data);

  if (error) {
    return { ok: false, message: "La suppression a échoué. Réessayez." };
  }

  revalidatePath("/search");
  revalidatePath("/sell/annonces");

  return { ok: true, message: "Annonce supprimée." };
}

/* ============================================================
 * STATUTS
 * ============================================================ */

/**
 * Change le statut d'une annonce (vendeur) : 'published' | 'draft'
 * | 'withdrawn'. 'suspended' est réservé aux administrateurs.
 */
export async function setPropertyStatus(
  propertyId: string,
  status: string,
): Promise<PropertyActionState> {
  if (!hasSupabaseConfig()) return configError();

  const viewer = await getViewerContext();
  if (!viewer.user) {
    return { ok: false, message: "Connectez-vous pour gérer vos annonces." };
  }

  const idParsed = propertyIdSchema.safeParse(propertyId);
  const statusParsed = sellerStatusSchema.safeParse(status);
  if (!idParsed.success || !statusParsed.success) {
    return { ok: false, message: "Paramètres invalides." };
  }

  const ownership = await checkOwnership(
    idParsed.data,
    viewer.user.id,
    viewer.isAdmin,
  );
  if (!ownership.ok) return ownership;

  const supabase = await createClient();
  const { error } = await supabase
    .from("properties")
    .update({ status: statusParsed.data })
    .eq("id", idParsed.data);

  if (error) {
    return { ok: false, message: "Le changement de statut a échoué." };
  }

  revalidatePath("/search");
  revalidatePath("/sell/annonces");
  revalidatePath(`/properties/${idParsed.data}`);

  return { ok: true, propertyId: idParsed.data };
}

/**
 * Change le statut d'une annonce (admin uniquement) :
 * 'suspended' | 'published' | 'draft' | 'withdrawn'.
 */
export async function adminSetPropertyStatus(
  propertyId: string,
  status: string,
): Promise<PropertyActionState> {
  if (!hasSupabaseConfig()) return configError();

  const viewer = await getViewerContext();
  if (!viewer.user) {
    return { ok: false, message: "Connectez-vous." };
  }
  if (!viewer.isAdmin) {
    return { ok: false, message: "Action réservée aux administrateurs." };
  }

  const idParsed = propertyIdSchema.safeParse(propertyId);
  const statusParsed = adminStatusSchema.safeParse(status);
  if (!idParsed.success || !statusParsed.success) {
    return { ok: false, message: "Paramètres invalides." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("properties")
    .update({ status: statusParsed.data })
    .eq("id", idParsed.data);

  if (error) {
    return { ok: false, message: "Le changement de statut a échoué." };
  }

  revalidatePath("/search");
  revalidatePath("/admin");
  revalidatePath(`/properties/${idParsed.data}`);

  return { ok: true, propertyId: idParsed.data };
}

/* ============================================================
 * MÉDIAS (photos)
 * ============================================================ */

/** Ajoute une photo à une annonce (10 Mo max, images uniquement). */
export async function uploadPropertyMedia(
  _prevState: PropertyActionState,
  formData: FormData,
): Promise<PropertyActionState> {
  if (!hasSupabaseConfig()) return configError();

  const viewer = await getViewerContext();
  if (!viewer.user) {
    return { ok: false, message: "Connectez-vous pour ajouter des photos." };
  }

  const idParsed = propertyIdSchema.safeParse(formData.get("propertyId"));
  if (!idParsed.success) {
    return { ok: false, message: "Identifiant d'annonce invalide." };
  }

  const ownership = await checkOwnership(
    idParsed.data,
    viewer.user.id,
    viewer.isAdmin,
  );
  if (!ownership.ok) return ownership;

  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Sélectionnez une image à téléverser." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, message: "L'image dépasse la limite de 10 Mo." };
  }
  if (!file.type.startsWith("image/")) {
    return { ok: false, message: "Seuls les fichiers image sont acceptés." };
  }

  const storagePath = `${idParsed.data}/${Date.now()}-${sanitizeFileName(file.name)}`;

  const supabase = await createClient();
  const { error: uploadError } = await supabase.storage
    .from("property-media")
    .upload(storagePath, file, { contentType: file.type, upsert: false });

  if (uploadError) {
    return { ok: false, message: "Le téléversement a échoué. Réessayez." };
  }

  const { count } = await supabase
    .from("property_media")
    .select("id", { count: "exact", head: true })
    .eq("property_id", idParsed.data);

  const { data: inserted, error: mediaError } = await supabase
    .from("property_media")
    .insert({
      property_id: idParsed.data,
      kind: "photo",
      storage_path: storagePath,
      position: count ?? 0,
    })
    .select("id")
    .single();

  if (mediaError) {
    /* Rollback best-effort du fichier orphelin. */
    await supabase.storage.from("property-media").remove([storagePath]);
    return { ok: false, message: "L'enregistrement de la photo a échoué." };
  }

  revalidatePath(`/properties/${idParsed.data}`);
  revalidatePath(`/properties/${idParsed.data}/modifier`);
  revalidatePath("/search");

  return {
    ok: true,
    propertyId: idParsed.data,
    mediaId: asSingle<{ id: string }>(inserted)?.id,
    storagePath,
    message: "Photo ajoutée.",
  };
}

/** Supprime une photo (ligne + fichier du bucket). */
export async function deletePropertyMedia(
  mediaId: string,
): Promise<PropertyActionState> {
  if (!hasSupabaseConfig()) return configError();

  const viewer = await getViewerContext();
  if (!viewer.user) {
    return { ok: false, message: "Connectez-vous." };
  }

  const idParsed = propertyIdSchema.safeParse(mediaId);
  if (!idParsed.success) {
    return { ok: false, message: "Identifiant de photo invalide." };
  }

  const supabase = await createClient();
  const { data: mediaData } = await supabase
    .from("property_media")
    .select("id, property_id, storage_path")
    .eq("id", idParsed.data)
    .single();

  const media = asSingle<PropertyMediaRow>(mediaData);
  if (!media) {
    return { ok: false, message: "Photo introuvable." };
  }

  const ownership = await checkOwnership(
    media.property_id,
    viewer.user.id,
    viewer.isAdmin,
  );
  if (!ownership.ok) return ownership;

  await supabase.storage.from("property-media").remove([media.storage_path]);
  const { error } = await supabase
    .from("property_media")
    .delete()
    .eq("id", idParsed.data);

  if (error) {
    return { ok: false, message: "La suppression de la photo a échoué." };
  }

  revalidatePath(`/properties/${media.property_id}`);
  revalidatePath(`/properties/${media.property_id}/modifier`);
  revalidatePath("/search");

  return { ok: true, message: "Photo supprimée." };
}

/* ============================================================
 * LECTURE (utilisées par les pages serveur)
 * ============================================================ */

export interface PropertyWithMedia {
  property: PropertyRow;
  media: PropertyMediaRow[];
}

/** Annonces du vendeur connecté (tous statuts). */
export async function getMyProperties(): Promise<{
  properties: (PropertyRow & { coverPath: string | null })[];
  error?: string;
}> {
  if (!hasSupabaseConfig()) {
    return { properties: [], error: "Base de données non configurée." };
  }
  const viewer = await getViewerContext();
  if (!viewer.user) {
    return { properties: [], error: "Connectez-vous pour voir vos annonces." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("owner_id", viewer.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return { properties: [], error: "Impossible de charger vos annonces." };
  }
  const properties = asRows<PropertyRow>(data);

  /* Photo de couverture : première photo de chaque annonce (1 requête). */
  const coverByProperty = new Map<string, string>();
  if (properties.length > 0) {
    const { data: mediaData } = await supabase
      .from("property_media")
      .select("property_id, storage_path, position")
      .in(
        "property_id",
        properties.map((p) => p.id),
      )
      .eq("kind", "photo")
      .order("position", { ascending: true });
    for (const m of asRows<PropertyMediaRow>(mediaData)) {
      if (!coverByProperty.has(m.property_id)) {
        coverByProperty.set(m.property_id, m.storage_path);
      }
    }
  }

  return {
    properties: properties.map((p) => ({
      ...p,
      coverPath: coverByProperty.get(p.id) ?? null,
    })),
  };
}

/**
 * Annonce + médias pour le propriétaire (page de modification).
 * Retourne null si l'annonce n'existe pas ou n'appartient pas
 * au visiteur (sauf admin).
 */
export async function getPropertyForOwner(
  propertyId: string,
): Promise<{ result: PropertyWithMedia } | { error: string }> {
  if (!hasSupabaseConfig()) {
    return { error: "Base de données non configurée." };
  }
  const idParsed = propertyIdSchema.safeParse(propertyId);
  if (!idParsed.success) return { error: "Identifiant d'annonce invalide." };

  const viewer = await getViewerContext();
  if (!viewer.user) return { error: "Connectez-vous." };

  const ownership = await checkOwnership(
    idParsed.data,
    viewer.user.id,
    viewer.isAdmin,
  );
  if (!ownership.ok) return { error: ownership.message };

  const supabase = await createClient();
  const { data: mediaData } = await supabase
    .from("property_media")
    .select("*")
    .eq("property_id", idParsed.data)
    .order("position", { ascending: true });

  return {
    result: {
      property: ownership.property,
      media: asRows<PropertyMediaRow>(mediaData),
    },
  };
}

/**
 * Annonce publique + médias : visible si publiée, ou si le
 * visiteur est le propriétaire / un admin. Sinon null (→ 404).
 */
export async function getPublicProperty(
  propertyId: string,
): Promise<PropertyWithMedia | null> {
  if (!hasSupabaseConfig()) return null;
  const idParsed = propertyIdSchema.safeParse(propertyId);
  if (!idParsed.success) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", idParsed.data)
    .single();

  const property = error ? null : asSingle<PropertyRow>(data);
  if (!property) return null;

  /* Annonce interne de test : traitée comme non-publiée —
     visible uniquement par le propriétaire ou un admin
     (même logique que les brouillons). */
  const requiresPrivileged =
    property.status !== "published" || isInternalTestProperty(property);

  if (requiresPrivileged) {
    const viewer = await getViewerContext();
    const isOwner = viewer.user?.id === property.owner_id;
    if (!isOwner && !viewer.isAdmin) return null;
  }

  const { data: mediaData } = await supabase
    .from("property_media")
    .select("*")
    .eq("property_id", idParsed.data)
    .order("position", { ascending: true });

  return { property, media: asRows<PropertyMediaRow>(mediaData) };
}

/* ---------- Recherche publique ---------- */

export interface SearchFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  listingType?: "sale" | "rent";
  minBedrooms?: number;
  minBathrooms?: number;
  minLivingArea?: number;
  /** Visites 3D uniquement. */
  hasVirtualTour?: boolean;
  page: number;
}

export interface SearchResult {
  items: (PropertyRow & { coverPath: string | null })[];
  total: number;
  page: number;
  pageSize: number;
}

/** Recherche d'annonces publiées avec filtres et pagination. */
export async function searchPublishedProperties(
  filters: SearchFilters,
): Promise<SearchResult> {
  const empty: SearchResult = {
    items: [],
    total: 0,
    page: filters.page,
    pageSize: SEARCH_PAGE_SIZE,
  };
  if (!hasSupabaseConfig()) return empty;

  const supabase = await createClient();
  const from = (filters.page - 1) * SEARCH_PAGE_SIZE;
  const to = from + SEARCH_PAGE_SIZE - 1;

  let query = supabase
    .from("properties")
    /* Colonnes strictement utilisées par /search (pas de SELECT * :
       description et URLs de visite 3D alourdissent chaque ligne). */
    .select(
      "id, asking_price, address, city, property_type, bedrooms, bathrooms, living_area, virtual_tour_enabled, latitude, longitude, created_at",
      { count: "exact" },
    )
    .eq("status", "published")
    /* Exclusion des annonces internes de test (adresse « [TEST… »),
       sans fausser le count (même requête). */
    .not("address", "ilike", "[TEST%");

  if (filters.city) {
    query = query.ilike("city", `%${filters.city.trim()}%`);
  }
  if (filters.minPrice !== undefined) {
    query = query.gte("asking_price", filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    query = query.lte("asking_price", filters.maxPrice);
  }
  if (filters.propertyType) {
    query = query.eq("property_type", filters.propertyType);
  }
  if (filters.minBedrooms !== undefined) {
    query = query.gte("bedrooms", filters.minBedrooms);
  }
  if (filters.minBathrooms !== undefined) {
    query = query.gte("bathrooms", filters.minBathrooms);
  }
  if (filters.minLivingArea !== undefined) {
    query = query.gte("living_area", filters.minLivingArea);
  }
  if (filters.listingType) {
    query = query.eq("listing_type", filters.listingType);
  }
  if (filters.hasVirtualTour) {
    query = query.eq("virtual_tour_enabled", true);
  }

  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) return empty;
  const properties = asRows<PropertyRow>(data);

  /* Photo de couverture : première photo de chaque annonce (1 requête). */
  const coverByProperty = new Map<string, string>();
  if (properties.length > 0) {
    const { data: mediaData } = await supabase
      .from("property_media")
      .select("property_id, storage_path, position")
      .in(
        "property_id",
        properties.map((p) => p.id),
      )
      .eq("kind", "photo")
      .order("position", { ascending: true });
    for (const m of asRows<PropertyMediaRow>(mediaData)) {
      if (!coverByProperty.has(m.property_id)) {
        coverByProperty.set(m.property_id, m.storage_path);
      }
    }
  }

  return {
    items: properties.map((p) => ({
      ...p,
      coverPath: coverByProperty.get(p.id) ?? null,
    })),
    total: count ?? 0,
    page: filters.page,
    pageSize: SEARCH_PAGE_SIZE,
  };
}

/* ---------- Analytics : visites 3D ---------- */

/**
 * Nombre d'ouvertures de visite 3D par annonce (dashboard vendeur).
 * Retourne { [propertyId]: count }. Lecture restreinte par RLS
 * (propriétaire ou admin).
 */
export async function getVirtualTourViewCounts(
  propertyIds: string[],
): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};
  if (!hasSupabaseConfig() || propertyIds.length === 0) return counts;
  const viewer = await getViewerContext();
  if (!viewer.user) return counts;

  const supabase = await createClient();
  const { data } = await supabase
    .from("virtual_tour_events")
    .select("property_id")
    .in("property_id", propertyIds)
    .eq("event_type", "opened");

  for (const row of asRows<{ property_id: string }>(data)) {
    counts[row.property_id] = (counts[row.property_id] ?? 0) + 1;
  }
  return counts;
}

/* ---------- Investisseurs ---------- */

export interface InvestmentProperty {
  id: string;
  address: string;
  city: string;
  asking_price: number;
  property_type: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  living_area: number | null;
  lot_area: number | null;
  year_built: number | null;
  municipal_tax: number | null;
  school_tax: number | null;
  latitude: number | null;
  longitude: number | null;
  updated_at: string | null;
  coverPath: string | null;
}

/**
 * Annonces publiées pour l'espace investisseurs.
 * Uniquement des colonnes réelles : aucun zonage, évaluation
 * municipale ou donnée de rôle n'est inventé.
 */
export async function getInvestmentProperties(
  filters: { city?: string; propertyType?: string; maxPrice?: number; minYear?: number } = {},
): Promise<InvestmentProperty[]> {
  if (!hasSupabaseConfig()) return [];
  const supabase = await createClient();

  let query = supabase
    .from("properties")
    .select(
      "id, address, city, asking_price, property_type, bedrooms, bathrooms, living_area, lot_area, year_built, municipal_tax, school_tax, latitude, longitude, updated_at",
    )
    .eq("status", "published")
    /* Exclusion des annonces internes de test (adresse « [TEST… »). */
    .not("address", "ilike", "[TEST%");

  if (filters.city) query = query.ilike("city", `%${filters.city}%`);
  if (filters.propertyType) query = query.eq("property_type", filters.propertyType);
  if (filters.maxPrice !== undefined) query = query.lte("asking_price", filters.maxPrice);
  if (filters.minYear !== undefined) query = query.gte("year_built", filters.minYear);

  const { data, error } = await query
    .order("updated_at", { ascending: false })
    .limit(200);
  if (error) return [];

  const rows = asRows<
    Omit<InvestmentProperty, "coverPath">
  >(data);

  const coverByProperty = new Map<string, string>();
  if (rows.length > 0) {
    const { data: mediaData } = await supabase
      .from("property_media")
      .select("property_id, storage_path, position")
      .in("property_id", rows.map((p) => p.id))
      .eq("kind", "photo")
      .order("position", { ascending: true });
    for (const m of asRows<PropertyMediaRow>(mediaData)) {
      if (!coverByProperty.has(m.property_id)) {
        coverByProperty.set(m.property_id, m.storage_path);
      }
    }
  }

  return rows.map((p) => ({
    ...p,
    coverPath: coverByProperty.get(p.id) ?? null,
  }));
}

/* ---------- Comparables du marché ---------- */

export interface MarketComparable {
  id: string;
  address: string;
  city: string;
  borough: string | null;
  property_type: string;
  asking_price: number;
  bedrooms: number | null;
  bathrooms: number | null;
  living_area: number | null;
  lot_area: number | null;
  year_built: number | null;
  condo_fees_monthly: number | null;
  gross_revenue_annual: number | null;
  latitude: number | null;
  longitude: number | null;
  source_name: string;
  source_url: string | null;
  verified_at: string;
  notes: string | null;
  /** true = comparable illustratif (exemple) : affiché avec un badge « Exemple ». */
  is_example: boolean;
}

const MARKET_COMPARABLE_COLUMNS =
  "id, address, city, borough, property_type, asking_price, bedrooms, bathrooms, living_area, lot_area, year_built, condo_fees_monthly, gross_revenue_annual, latitude, longitude, source_name, source_url, verified_at, notes";

/**
 * Comparables du marché : faits publics vérifiés (adresse, prix demandé,
 * caractéristiques) relevés sur des annonces DuProprio actives, avec URL
 * source et date de vérification. Ce NE SONT PAS des annonces Nesta.
 * Les lignes marquées is_example sont illustratives (badge « Exemple »).
 */
export async function getMarketComparables(
  filters: { city?: string; propertyType?: string; maxPrice?: number; minYear?: number } = {},
): Promise<MarketComparable[]> {
  if (!hasSupabaseConfig()) return [];
  const supabase = await createClient();

  /* La colonne is_example arrive avec la migration 000025. Si elle n'est
     pas encore appliquée en base, on relit sans le flag (tout = false)
     plutôt que de casser la page. */
  async function run(withFlag: boolean) {
    let query = supabase
      .from("market_comparables")
      .select(
        withFlag
          ? `${MARKET_COMPARABLE_COLUMNS}, is_example`
          : MARKET_COMPARABLE_COLUMNS,
      );

    if (filters.city) query = query.ilike("city", `%${filters.city}%`);
    if (filters.propertyType) query = query.eq("property_type", filters.propertyType);
    if (filters.maxPrice !== undefined) query = query.lte("asking_price", filters.maxPrice);
    if (filters.minYear !== undefined) query = query.gte("year_built", filters.minYear);

    return query.order("asking_price", { ascending: true }).limit(200);
  }

  let { data, error } = await run(true);
  if (error && /is_example/i.test(error.message ?? "")) {
    ({ data, error } = await run(false));
  }
  if (error || !data) return [];

  return asRows<Record<string, unknown>>(data).map((row) => ({
    ...(row as object),
    is_example: (row as { is_example?: unknown }).is_example === true,
  })) as MarketComparable[];
}

/* ---------- Admin ---------- */

export interface AdminPropertyRow extends PropertyRow {
  ownerName: string | null;
}

/** Toutes les annonces (admin uniquement), avec le nom du propriétaire. */
export async function getAllPropertiesAdmin(): Promise<{
  items: AdminPropertyRow[];
  error?: string;
}> {
  if (!hasSupabaseConfig()) {
    return { items: [], error: "Base de données non configurée." };
  }
  const viewer = await getViewerContext();
  if (!viewer.user || !viewer.isAdmin) {
    return { items: [], error: "Action réservée aux administrateurs." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return { items: [], error: "Impossible de charger les annonces." };
  }
  const properties = asRows<PropertyRow>(data);

  const ownerIds = [...new Set(properties.map((p) => p.owner_id))];
  const nameByOwner = new Map<string, string>();
  if (ownerIds.length > 0) {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("id, display_name")
      .in("id", ownerIds);
    for (const pr of asRows<ProfileRow>(profileData)) {
      if (pr.display_name) nameByOwner.set(pr.id, pr.display_name);
    }
  }

  return {
    items: properties.map((p) => ({
      ...p,
      ownerName: nameByOwner.get(p.owner_id) ?? null,
    })),
  };
}
