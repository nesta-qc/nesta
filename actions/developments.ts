"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { assertAdmin } from "@/lib/admin";
import { hasSupabaseConfig } from "@/lib/env";

/* ============================================================
 * NESTA — développements (projets neufs) : lecture des projets
 * réels uniquement + inscription aux alertes nouveaux projets.
 * Aucun projet fictif.
 * ============================================================ */

export interface DevelopmentUnitSummary {
  available: number;
  total: number;
  priceFrom: number | null;
}

export interface DevelopmentRow {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  description: string | null;
  completion_date: string | null;
  status: string;
  is_pro: boolean;
  units: DevelopmentUnitSummary;
}

/** Projets réels visibles (non-brouillon selon RLS). */
export async function getDevelopments(): Promise<DevelopmentRow[]> {
  if (!hasSupabaseConfig()) return [];
  const supabase = await createClient();

  const baseSelect =
    "id, name, address, city, description, completion_date, status";
  // `is_pro` vient de la migration 000026 ; repli sans elle si pas appliquée.
  let res = await supabase
    .from("developments")
    .select(`${baseSelect}, is_pro`)
    .order("created_at", { ascending: false })
    .limit(50);
  if (res.error && /is_pro/i.test(res.error.message)) {
    res = (await supabase
      .from("developments")
      .select(baseSelect)
      .order("created_at", { ascending: false })
      .limit(50)) as typeof res;
  }
  const { data, error } = res;
  if (error) return [];

  const devs = (data ?? []) as Omit<DevelopmentRow, "units">[];
  if (devs.length === 0) return [];

  const { data: units } = await supabase
    .from("development_units")
    .select("development_id, price, status")
    .in("development_id", devs.map((d) => d.id));

  const summary = new Map<string, DevelopmentUnitSummary>();
  for (const u of (units ?? []) as {
    development_id: string;
    price: number | null;
    status: string;
  }[]) {
    const s = summary.get(u.development_id) ?? {
      available: 0,
      total: 0,
      priceFrom: null,
    };
    s.total += 1;
    if (u.status === "AVAILABLE") {
      s.available += 1;
      if (u.price != null && (s.priceFrom == null || u.price < s.priceFrom)) {
        s.priceFrom = Number(u.price);
      }
    }
    summary.set(u.development_id, s);
  }

  return devs.map((d) => ({
    ...d,
    units: summary.get(d.id) ?? { available: 0, total: 0, priceFrom: null },
  }));
}

/** Inscription aux alertes nouveaux projets (email réel, rien d'autre). */
export async function subscribeDevelopmentAlert(
  formData: FormData,
): Promise<{ ok: boolean; message: string }> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const city = String(formData.get("city") ?? "").trim() || null;

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, message: "Courriel invalide." };
  }
  if (!hasSupabaseConfig()) {
    return { ok: false, message: "Service temporairement indisponible." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("development_alerts")
    .upsert({ email, city }, { onConflict: "email,city" });

  if (error) {
    return { ok: false, message: "Inscription impossible pour le moment." };
  }
  return { ok: true, message: "Vous serez avisé des nouveaux projets." };
}

/* ============================================================
 * NESTA — création de projets (pilote promoteurs) + fiche
 * publique détaillée. Réservé ADMIN (assertAdmin + RLS).
 * ============================================================ */

export interface DeveloperOption {
  id: string;
  display_name: string | null;
}

/** Profils ayant le rôle DEVELOPER — pour le sélecteur du formulaire. */
export async function getDeveloperOptions(): Promise<DeveloperOption[]> {
  const viewer = await assertAdmin();
  if (!viewer || !hasSupabaseConfig()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, user_roles!inner(role)")
    .eq("user_roles.role", "DEVELOPER")
    .order("display_name", { ascending: true })
    .limit(200);
  if (error) return [];
  return ((data ?? []) as { id: string; display_name: string | null }[]).map(
    (p) => ({ id: p.id, display_name: p.display_name }),
  );
}

export type DevelopmentUnitStatus = "AVAILABLE" | "RESERVED" | "SOLD";

export interface DevelopmentUnitInput {
  unit_number: string;
  floor?: number | null;
  price?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  area?: number | null;
  orientation?: string | null;
  status?: DevelopmentUnitStatus;
}

export interface DevelopmentCreateInput {
  name: string;
  developer_id: string;
  address?: string | null;
  city?: string | null;
  /** draft = non publié (RLS) ; planned / under_construction / completed */
  status?: string;
  /** Date de livraison, format AAAA-MM-JJ. */
  completion_date?: string | null;
  description?: string | null;
  sales_contact_name?: string | null;
  sales_contact_email?: string | null;
  sales_contact_phone?: string | null;
  units: DevelopmentUnitInput[];
}

export type CreateDevelopmentResult =
  | { ok: true; id: string; warning?: string }
  | { ok: false; message: string };

const DEVELOPMENT_STATUSES = [
  "draft",
  "planned",
  "under_construction",
  "completed",
] as const;

const UNIT_STATUSES: DevelopmentUnitStatus[] = ["AVAILABLE", "RESERVED", "SOLD"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: string | null | undefined): string | null {
  const v = (value ?? "").trim();
  return v.length > 0 ? v : null;
}

function cleanNumber(value: number | null | undefined): number | null {
  if (value == null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function isMissingColumn(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "42703"
  );
}

/**
 * Crée un projet + ses unités en une opération (admin uniquement).
 * Le statut « draft » garde le projet invisible du public (RLS)
 * jusqu'à sa validation. Si la migration 000018 n'est pas encore
 * appliquée, le projet est créé sans les coordonnées du contact
 * ventes et un avertissement honnête est retourné (pas de perte
 * silencieuse : l'avertissement est affiché à l'admin).
 */
export async function createDevelopmentWithUnits(
  input: DevelopmentCreateInput,
): Promise<CreateDevelopmentResult> {
  const viewer = await assertAdmin();
  if (!viewer) {
    return { ok: false, message: "Accès réservé aux administrateurs." };
  }
  if (!hasSupabaseConfig()) {
    return { ok: false, message: "Base de données non configurée." };
  }

  const name = (input.name ?? "").trim();
  if (name.length < 2) {
    return { ok: false, message: "Le nom du projet est requis." };
  }
  const developerId = (input.developer_id ?? "").trim();
  if (!developerId) {
    return { ok: false, message: "Choisissez le compte promoteur du projet." };
  }
  const status = (input.status ?? "draft").trim();
  if (!(DEVELOPMENT_STATUSES as readonly string[]).includes(status)) {
    return { ok: false, message: "Statut du projet invalide." };
  }
  const completionDate = clean(input.completion_date);
  if (completionDate && !/^\d{4}-\d{2}-\d{2}$/.test(completionDate)) {
    return { ok: false, message: "Date de livraison invalide (AAAA-MM-JJ)." };
  }
  const salesEmail = clean(input.sales_contact_email);
  if (salesEmail && !EMAIL_RE.test(salesEmail)) {
    return { ok: false, message: "Courriel du contact ventes invalide." };
  }

  const units = (input.units ?? [])
    .map((u) => ({
      unit_number: (u.unit_number ?? "").trim(),
      floor: cleanNumber(u.floor),
      price: cleanNumber(u.price),
      bedrooms: cleanNumber(u.bedrooms),
      bathrooms: cleanNumber(u.bathrooms),
      area: cleanNumber(u.area),
      orientation: clean(u.orientation),
      status: UNIT_STATUSES.includes(u.status as DevelopmentUnitStatus)
        ? (u.status as DevelopmentUnitStatus)
        : "AVAILABLE",
    }))
    .filter((u) => u.unit_number.length > 0)
    .slice(0, 500);

  const supabase = await createClient();

  const basePayload = {
    developer_id: developerId,
    name,
    address: clean(input.address),
    city: clean(input.city),
    description: clean(input.description),
    completion_date: completionDate,
    status,
  };
  const salesPayload = {
    sales_contact_name: clean(input.sales_contact_name),
    sales_contact_email: salesEmail,
    sales_contact_phone: clean(input.sales_contact_phone),
  };

  let devId: string | null = null;
  let warning: string | undefined;

  const first = await supabase
    .from("developments")
    .insert({ ...basePayload, ...salesPayload })
    .select("id")
    .single();

  if (first.error) {
    if (isMissingColumn(first.error)) {
      /* Migration 000018 pas encore appliquée : on crée sans le
         contact ventes plutôt que d'échouer, et on le dit. */
      const retry = await supabase
        .from("developments")
        .insert(basePayload)
        .select("id")
        .single();
      if (retry.error || !retry.data) {
        return { ok: false, message: "La création du projet a échoué." };
      }
      devId = retry.data.id as string;
      warning =
        "Projet créé SANS les coordonnées du contact ventes : la migration 000018 n'est pas encore appliquée en base.";
    } else {
      return { ok: false, message: "La création du projet a échoué." };
    }
  } else {
    devId = first.data.id as string;
  }

  if (units.length > 0 && devId) {
    const { error: unitsError } = await supabase
      .from("development_units")
      .insert(units.map((u) => ({ ...u, development_id: devId })));
    if (unitsError) {
      const suffix =
        "Le projet a été créé, mais les unités n'ont pas pu être enregistrées.";
      return {
        ok: true,
        id: devId,
        warning: warning ? `${warning} ${suffix}` : suffix,
      };
    }
  }

  revalidatePath("/projects");
  return { ok: true, id: devId as string, warning };
}

/* ---------- Fiche publique détaillée ---------- */

export interface DevelopmentUnitRow {
  id: string;
  unit_number: string;
  floor: number | null;
  price: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  orientation: string | null;
  status: string;
}

export interface DevelopmentDetail {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  description: string | null;
  completion_date: string | null;
  status: string;
  is_pro: boolean;
  sales_contact_name: string | null;
  sales_contact_email: string | null;
  sales_contact_phone: string | null;
  latitude: number | null;
  longitude: number | null;
  units: DevelopmentUnitRow[];
}

interface GeoJsonPoint {
  type: string;
  coordinates: [number, number];
}

function parseLocation(value: unknown): {
  latitude: number | null;
  longitude: number | null;
} {
  if (
    typeof value === "object" &&
    value !== null &&
    "coordinates" in value &&
    Array.isArray((value as GeoJsonPoint).coordinates)
  ) {
    const [lng, lat] = (value as GeoJsonPoint).coordinates;
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      return { latitude: Number(lat), longitude: Number(lng) };
    }
  }
  return { latitude: null, longitude: null };
}

/**
 * Fiche complète d'un projet pour la page publique.
 * La RLS masque les projets « draft » aux non-admins : un projet
 * invisible retourne null (→ 404). N'invente rien : seules les
 * données en base sont retournées.
 */
export async function getDevelopmentById(
  id: string,
): Promise<DevelopmentDetail | null> {
  if (!hasSupabaseConfig()) return null;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const supabase = await createClient();

  const baseSelect =
    "id, name, address, city, description, completion_date, status, location";
  // `is_pro` vient de la migration 000026 ; repli sans elle si pas appliquée.
  let devRes = await supabase
    .from("developments")
    .select(`${baseSelect}, is_pro`)
    .eq("id", id)
    .single();
  if (devRes.error && /is_pro/i.test(devRes.error.message)) {
    devRes = (await supabase
      .from("developments")
      .select(baseSelect)
      .eq("id", id)
      .single()) as typeof devRes;
  }
  const { data: dev, error } = devRes;
  if (error || !dev) return null;
  const d = dev as Record<string, unknown>;

  /* Coordonnées du contact ventes (migration 000018). Absentes =
     colonnes pas encore créées : on continue sans, sans inventer. */
  let sales: {
    sales_contact_name: string | null;
    sales_contact_email: string | null;
    sales_contact_phone: string | null;
  } = { sales_contact_name: null, sales_contact_email: null, sales_contact_phone: null };
  const salesRes = await supabase
    .from("developments")
    .select("sales_contact_name, sales_contact_email, sales_contact_phone")
    .eq("id", id)
    .single();
  if (!salesRes.error && salesRes.data) {
    const s = salesRes.data as Record<string, unknown>;
    sales = {
      sales_contact_name: (s.sales_contact_name as string | null) ?? null,
      sales_contact_email: (s.sales_contact_email as string | null) ?? null,
      sales_contact_phone: (s.sales_contact_phone as string | null) ?? null,
    };
  }

  const { data: unitsData } = await supabase
    .from("development_units")
    .select(
      "id, unit_number, floor, price, bedrooms, bathrooms, area, orientation, status",
    )
    .eq("development_id", id)
    .order("price", { ascending: true, nullsFirst: false })
    .order("unit_number", { ascending: true })
    .limit(500);

  const units = ((unitsData ?? []) as Record<string, unknown>[]).map((u) => ({
    id: u.id as string,
    unit_number: u.unit_number as string,
    floor: (u.floor as number | null) ?? null,
    price: u.price != null ? Number(u.price) : null,
    bedrooms: (u.bedrooms as number | null) ?? null,
    bathrooms: u.bathrooms != null ? Number(u.bathrooms) : null,
    area: u.area != null ? Number(u.area) : null,
    orientation: (u.orientation as string | null) ?? null,
    status: (u.status as string) ?? "AVAILABLE",
  }));

  const { latitude, longitude } = parseLocation(d.location);

  return {
    id: d.id as string,
    name: d.name as string,
    address: (d.address as string | null) ?? null,
    city: (d.city as string | null) ?? null,
    description: (d.description as string | null) ?? null,
    completion_date: (d.completion_date as string | null) ?? null,
    status: (d.status as string) ?? "planned",
    is_pro: (d.is_pro as boolean) ?? false,
    ...sales,
    latitude,
    longitude,
    units,
  };
}
