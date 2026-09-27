"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import {
  assertAdmin,
  logAdminAction,
  periodStartIso,
  type AdminPeriod,
} from "@/lib/admin";
import { SERVICE_REQUEST_STATUSES } from "@/lib/services";
import type { PropertyRow, PropertyMediaRow } from "@/lib/validation";

/* ============================================================
 * NESTA — Server Actions du centre de contrôle (/admin).
 *
 * Toutes les fonctions exigent le rôle ADMIN (assertAdmin) :
 * un appel sans session admin retourne { ok:false } ou null.
 * La RLS (policies is_admin(), migration 000014) reste la
 * barrière principale côté base de données.
 *
 * RÈGLE D'HONNÊTETÉ : aucune donnée inventée. Les compteurs
 * reflètent exactement la base ; les sections sans données
 * affichent 0 ou un empty state côté UI.
 * ============================================================ */

function asRows<T>(data: unknown): T[] {
  return Array.isArray(data) ? (data as T[]) : [];
}

const ADMIN_PAGE_SIZE = 20;

const MANAGEABLE_ROLES = [
  "BUYER",
  "SELLER",
  "BROKER",
  "AGENCY",
  "DEVELOPER",
  "ADMIN",
] as const;

const PROPERTY_DECISIONS = {
  approve: "published",
  redraft: "draft",
  suspend: "suspended",
  archive: "withdrawn",
} as const;

export type PropertyDecision = keyof typeof PROPERTY_DECISIONS;

const AUDIT_ACTION_FOR_DECISION: Record<PropertyDecision, string> = {
  approve: "property.approved",
  redraft: "property.sent_back_to_draft",
  suspend: "property.suspended",
  archive: "property.archived",
};

/* ---------- Types ---------- */

export interface OverviewStats {
  usersTotal: number;
  usersNew: number;
  propertiesActive: number;
  propertiesNew: number;
  leadsNew: number;
  leadsPending: number;
  drafts: number;
  /** Aucune infrastructure de paiement : toujours 0, signalé honnêtement. */
  revenueTotal: number;
  revenueHasData: boolean;
}

export interface ActivityEvent {
  key: string;
  kind:
    | "user"
    | "property"
    | "service_request"
    | "viewing"
    | "offer"
    | "favorite";
  title: string;
  detail: string;
  at: string;
  href: string;
}

export interface CommandItem {
  id: string;
  label: string;
  count: number;
  href: string;
}

export interface AdminPropertyListItem extends PropertyRow {
  ownerName: string | null;
  favoritesCount: number;
  viewingsCount: number;
  photoPath: string | null;
}

export interface AdminUserListItem {
  id: string;
  displayName: string | null;
  roles: string[];
  createdAt: string;
  propertiesCount: number;
  viewingsCount: number;
  lastActivityAt: string | null;
}

export interface ServiceRequestListItem {
  id: string;
  service_id: string;
  project_name: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  status: string;
  created_at: string;
}

export interface AuditEntry {
  id: string;
  action: string;
  object_type: string;
  object_id: string;
  old_value: unknown;
  new_value: unknown;
  created_at: string;
  adminName: string | null;
}

/* ---------- Helpers internes ---------- */

async function count(
  table: string,
  filters?: (q: {
    eq: (c: string, v: string) => unknown;
    gte: (c: string, v: string) => unknown;
    in: (c: string, v: string[]) => unknown;
  }) => unknown,
): Promise<number> {
  const supabase = await createClient();
  let query = supabase.from(table).select("id", { count: "exact", head: true });
  if (filters) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query = filters(query as any) as typeof query;
  }
  const { count: n, error } = await query;
  if (error) {
    console.warn(`[admin] count ${table}:`, error.message);
    return 0;
  }
  return n ?? 0;
}

async function displayNamesById(ids: string[]): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  if (ids.length === 0) return map;
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, display_name")
    .in("id", [...new Set(ids)]);
  for (const r of asRows<{ id: string; display_name: string | null }>(data)) {
    if (r.display_name) map.set(r.id, r.display_name);
  }
  return map;
}

/* ============================================================
 * OVERVIEW
 * ============================================================ */

/** Statistiques de l'Overview pour une période donnée. */
export async function getOverviewStats(
  period: AdminPeriod,
): Promise<OverviewStats | null> {
  if (!hasSupabaseConfig()) return null;
  const admin = await assertAdmin();
  if (!admin) return null;
  const start = periodStartIso(period);

  const [
    usersTotal,
    usersNew,
    propertiesActive,
    propertiesNew,
    leadsNew,
    leadsPending,
    drafts,
  ] = await Promise.all([
    count("profiles"),
    count("profiles", (q) => q.gte("created_at", start)),
    count("properties", (q) => q.eq("status", "published")),
    count("properties", (q) => q.gte("created_at", start)),
    count("service_requests", (q) => q.gte("created_at", start)),
    count("service_requests", (q) => q.eq("status", "pending")),
    count("properties", (q) => q.eq("status", "draft")),
  ]);

  return {
    usersTotal,
    usersNew,
    propertiesActive,
    propertiesNew,
    leadsNew,
    leadsPending,
    drafts,
    revenueTotal: 0,
    revenueHasData: false, // aucune table de paiements — affiché honnêtement
  };
}

/** Éléments « À traiter » du Command Center (comptes > 0 uniquement). */
export async function getCommandCenter(): Promise<CommandItem[]> {
  if (!hasSupabaseConfig()) return [];
  const admin = await assertAdmin();
  if (!admin) return [];

  const [drafts, pendingRequests] = await Promise.all([
    count("properties", (q) => q.eq("status", "draft")),
    count("service_requests", (q) => q.eq("status", "pending")),
  ]);

  const items: CommandItem[] = [];
  if (drafts > 0) {
    items.push({
      id: "drafts",
      label: drafts === 1 ? "annonce à vérifier" : "annonces à vérifier",
      count: drafts,
      href: "/admin/moderation",
    });
  }
  if (pendingRequests > 0) {
    items.push({
      id: "requests",
      label:
        pendingRequests === 1
          ? "demande de service sans réponse"
          : "demandes de service sans réponse",
      count: pendingRequests,
      href: "/admin/requests",
    });
  }
  return items;
}


/**
 * Activité récente : derniers événements issus des vraies tables
 * (profils, annonces, demandes de service, visites, offres, favoris).
 */
export async function getRecentActivity(
  limit = 20,
): Promise<ActivityEvent[]> {
  if (!hasSupabaseConfig()) return [];
  const admin = await assertAdmin();
  if (!admin) return [];
  const supabase = await createClient();

  const [usersRes, propsRes, reqsRes, viewingsRes, offersRes, favsRes] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("id, display_name, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("properties")
        .select("id, address, city, status, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("service_requests")
        .select("id, service_id, project_name, contact_name, status, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("viewings")
        .select("id, property_id, scheduled_at, status, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("offers")
        .select("id, property_id, amount, status, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("favorites")
        .select("id, property_id, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

  const propertyIds = new Set<string>();
  for (const r of asRows<{ property_id: string }>(viewingsRes.data))
    propertyIds.add(r.property_id);
  for (const r of asRows<{ property_id: string }>(offersRes.data))
    propertyIds.add(r.property_id);
  for (const r of asRows<{ property_id: string }>(favsRes.data))
    propertyIds.add(r.property_id);

  const addressById = new Map<string, string>();
  if (propertyIds.size > 0) {
    const { data } = await supabase
      .from("properties")
      .select("id, address, city")
      .in("id", [...propertyIds]);
    for (const r of asRows<{ id: string; address: string; city: string }>(
      data,
    )) {
      addressById.set(r.id, `${r.address} — ${r.city}`);
    }
  }

  const events: ActivityEvent[] = [];

  for (const r of asRows<{
    id: string;
    display_name: string | null;
    created_at: string;
  }>(usersRes.data)) {
    events.push({
      key: `user-${r.id}`,
      kind: "user",
      title: "Nouvel utilisateur inscrit",
      detail: r.display_name ?? "Sans nom",
      at: r.created_at,
      href: `/admin/users/${r.id}`,
    });
  }
  for (const r of asRows<{
    id: string;
    address: string;
    city: string;
    status: string;
    created_at: string;
  }>(propsRes.data)) {
    events.push({
      key: `property-${r.id}`,
      kind: "property",
      title:
        r.status === "draft" ? "Nouvelle annonce en brouillon" : "Nouvelle annonce",
      detail: `${r.address} — ${r.city}`,
      at: r.created_at,
      href: `/admin/properties/${r.id}`,
    });
  }
  for (const r of asRows<{
    id: string;
    service_id: string;
    project_name: string;
    contact_name: string | null;
    status: string;
    created_at: string;
  }>(reqsRes.data)) {
    events.push({
      key: `req-${r.id}`,
      kind: "service_request",
      title: "Nouvelle demande de service",
      detail: `${r.project_name}${r.contact_name ? ` — ${r.contact_name}` : ""}`,
      at: r.created_at,
      href: `/admin/requests/${r.id}`,
    });
  }
  for (const r of asRows<{
    id: string;
    property_id: string;
    status: string;
    created_at: string;
  }>(viewingsRes.data)) {
    events.push({
      key: `viewing-${r.id}`,
      kind: "viewing",
      title: "Demande de visite",
      detail: addressById.get(r.property_id) ?? "Annonce",
      at: r.created_at,
      href: `/admin/properties/${r.property_id}`,
    });
  }
  for (const r of asRows<{
    id: string;
    property_id: string;
    amount: number;
    created_at: string;
  }>(offersRes.data)) {
    events.push({
      key: `offer-${r.id}`,
      kind: "offer",
      title: "Nouvelle offre",
      detail: addressById.get(r.property_id) ?? "Annonce",
      at: r.created_at,
      href: `/admin/properties/${r.property_id}`,
    });
  }
  for (const r of asRows<{ id: string; property_id: string; created_at: string }>(
    favsRes.data,
  )) {
    events.push({
      key: `fav-${r.id}`,
      kind: "favorite",
      title: "Annonce ajoutée aux favoris",
      detail: addressById.get(r.property_id) ?? "Annonce",
      at: r.created_at,
      href: `/admin/properties/${r.property_id}`,
    });
  }

  return events
    .sort((a, b) => (a.at < b.at ? 1 : -1))
    .slice(0, Math.max(1, Math.min(50, limit)));
}

/* ============================================================
 * PROPRIÉTÉS
 * ============================================================ */

export async function getAdminProperties(options: {
  status?: string;
  q?: string;
  page?: number;
}): Promise<{
  items: AdminPropertyListItem[];
  total: number;
  page: number;
  pageSize: number;
} | null> {
  if (!hasSupabaseConfig()) return null;
  const admin = await assertAdmin();
  if (!admin) return null;
  const supabase = await createClient();

  const page = Math.max(1, options.page ?? 1);
  const from = (page - 1) * ADMIN_PAGE_SIZE;
  const to = from + ADMIN_PAGE_SIZE - 1;

  let query = supabase
    .from("properties")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (options.status && options.status !== "all") {
    if (options.status === "sold_rented") {
      query = query.in("status", ["sold", "rented"]);
    } else {
      query = query.eq("status", options.status);
    }
  }
  const q = (options.q ?? "").trim();
  if (q.length > 0) {
    const like = `%${q.replace(/[%_]/g, "")}%`;
    query = query.or(`address.ilike.${like},city.ilike.${like}`);
  }

  const { data, count: total, error } = await query.range(from, to);
  if (error) {
    console.warn("[admin] properties:", error.message);
    return { items: [], total: 0, page, pageSize: ADMIN_PAGE_SIZE };
  }
  const properties = asRows<PropertyRow>(data);
  const ids = properties.map((p) => p.id);

  const [names, favRows, viewingRows, mediaRows] = await Promise.all([
    displayNamesById(properties.map((p) => p.owner_id)),
    ids.length > 0
      ? supabase.from("favorites").select("property_id").in("property_id", ids)
      : Promise.resolve({ data: [] }),
    ids.length > 0
      ? supabase.from("viewings").select("property_id").in("property_id", ids)
      : Promise.resolve({ data: [] }),
    ids.length > 0
      ? supabase
          .from("property_media")
          .select("property_id, storage_path, position")
          .in("property_id", ids)
          .eq("kind", "photo")
          .order("position", { ascending: true })
      : Promise.resolve({ data: [] }),
  ]);

  const favCount = new Map<string, number>();
  for (const r of asRows<{ property_id: string }>(favRows.data)) {
    favCount.set(r.property_id, (favCount.get(r.property_id) ?? 0) + 1);
  }
  const viewingCount = new Map<string, number>();
  for (const r of asRows<{ property_id: string }>(viewingRows.data)) {
    viewingCount.set(r.property_id, (viewingCount.get(r.property_id) ?? 0) + 1);
  }
  const photoById = new Map<string, string>();
  for (const r of asRows<{
    property_id: string;
    storage_path: string;
  }>(mediaRows.data)) {
    if (!photoById.has(r.property_id)) photoById.set(r.property_id, r.storage_path);
  }

  return {
    items: properties.map((p) => ({
      ...p,
      ownerName: names.get(p.owner_id) ?? null,
      favoritesCount: favCount.get(p.id) ?? 0,
      viewingsCount: viewingCount.get(p.id) ?? 0,
      photoPath: photoById.get(p.id) ?? null,
    })),
    total: total ?? 0,
    page,
    pageSize: ADMIN_PAGE_SIZE,
  };
}

export interface AdminPropertyDetail {
  property: PropertyRow;
  ownerName: string | null;
  ownerRoles: string[];
  media: PropertyMediaRow[];
  features: { feature_key: string; feature_value: string | null }[];
  documents: { id: string; name: string; doc_type: string; created_at: string }[];
  favoritesCount: number;
  viewings: {
    id: string;
    scheduled_at: string;
    status: string;
    party_size: number;
    buyerName: string | null;
    created_at: string;
  }[];
  offers: {
    id: string;
    amount: number | null;
    status: string;
    buyerName: string | null;
    created_at: string;
  }[];
  audit: AuditEntry[];
}

/** Fiche admin complète d'une annonce. */
export async function getAdminPropertyDetail(
  id: string,
): Promise<AdminPropertyDetail | null> {
  if (!hasSupabaseConfig()) return null;
  const admin = await assertAdmin();
  if (!admin) return null;
  const supabase = await createClient();

  const { data: propData, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !propData) return null;
  const property = propData as PropertyRow;

  const [mediaRes, featRes, docRes, favRes, viewRes, offerRes, auditRes] =
    await Promise.all([
      supabase
        .from("property_media")
        .select("*")
        .eq("property_id", id)
        .order("position", { ascending: true }),
      supabase.from("property_features").select("*").eq("property_id", id),
      supabase
        .from("property_documents")
        .select("id, name, doc_type, created_at")
        .eq("property_id", id)
        .order("created_at", { ascending: true }),
      supabase
        .from("favorites")
        .select("id", { count: "exact", head: true })
        .eq("property_id", id),
      supabase
        .from("viewings")
        .select("id, scheduled_at, status, party_size, buyer_id, created_at")
        .eq("property_id", id)
        .order("scheduled_at", { ascending: false }),
      supabase
        .from("offers")
        .select("id, amount, status, buyer_id, created_at")
        .eq("property_id", id)
        .order("created_at", { ascending: false }),
      getAuditEntries({ objectType: "property", objectId: id, limit: 30 }),
    ]);

  const viewings = asRows<{
    id: string;
    scheduled_at: string;
    status: string;
    party_size: number;
    buyer_id: string;
    created_at: string;
  }>(viewRes.data);
  const offers = asRows<{
    id: string;
    amount: number | null;
    status: string;
    buyer_id: string;
    created_at: string;
  }>(offerRes.data);

  const personIds = [
    property.owner_id,
    ...viewings.map((v) => v.buyer_id),
    ...offers.map((o) => o.buyer_id),
  ];
  const names = await displayNamesById(personIds);

  const { data: roleRows } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", property.owner_id);

  return {
    property,
    ownerName: names.get(property.owner_id) ?? null,
    ownerRoles: asRows<{ role: string }>(roleRows).map((r) => r.role),
    media: asRows<PropertyMediaRow>(mediaRes.data),
    features: asRows<{ feature_key: string; feature_value: string | null }>(
      featRes.data,
    ),
    documents: asRows<{
      id: string;
      name: string;
      doc_type: string;
      created_at: string;
    }>(docRes.data),
    favoritesCount: favRes.count ?? 0,
    viewings: viewings.map((v) => ({
      id: v.id,
      scheduled_at: v.scheduled_at,
      status: v.status,
      party_size: v.party_size,
      buyerName: names.get(v.buyer_id) ?? null,
      created_at: v.created_at,
    })),
    offers: offers.map((o) => ({
      id: o.id,
      amount: o.amount,
      status: o.status,
      buyerName: names.get(o.buyer_id) ?? null,
      created_at: o.created_at,
    })),
    audit: auditRes,
  };
}

/**
 * Décision de modération sur une annonce (admin uniquement).
 * Chaque décision destructive est confirmée côté UI avant l'appel.
 */
export async function moderateProperty(
  propertyId: string,
  decision: PropertyDecision,
): Promise<{ ok: boolean; message?: string }> {
  if (!hasSupabaseConfig())
    return { ok: false, message: "Base de données non configurée." };
  const admin = await assertAdmin();
  if (!admin) return { ok: false, message: "Action réservée aux administrateurs." };
  const adminId = admin.user?.id;
  if (!adminId) return { ok: false, message: "Action réservée aux administrateurs." };
  if (!PROPERTY_DECISIONS[decision])
    return { ok: false, message: "Décision invalide." };

  const supabase = await createClient();
  const { data: current } = await supabase
    .from("properties")
    .select("id, status")
    .eq("id", propertyId)
    .maybeSingle();
  if (!current) return { ok: false, message: "Annonce introuvable." };

  const nextStatus = PROPERTY_DECISIONS[decision];
  const { error } = await supabase
    .from("properties")
    .update({ status: nextStatus })
    .eq("id", propertyId);
  if (error) {
    return { ok: false, message: "La décision n'a pas pu être enregistrée." };
  }

  await logAdminAction(adminId, {
    action: AUDIT_ACTION_FOR_DECISION[decision],
    objectType: "property",
    objectId: propertyId,
    oldValue: { status: (current as { status: string }).status },
    newValue: { status: nextStatus },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/properties");
  revalidatePath("/admin/moderation");
  revalidatePath(`/admin/properties/${propertyId}`);
  revalidatePath("/search");
  revalidatePath(`/properties/${propertyId}`);
  return { ok: true };
}

/* ============================================================
 * UTILISATEURS
 * ============================================================ */

export async function getAdminUsers(options: {
  role?: string;
  q?: string;
  page?: number;
}): Promise<{
  items: AdminUserListItem[];
  total: number;
  page: number;
  pageSize: number;
} | null> {
  if (!hasSupabaseConfig()) return null;
  const admin = await assertAdmin();
  if (!admin) return null;
  const supabase = await createClient();

  const page = Math.max(1, options.page ?? 1);
  const from = (page - 1) * ADMIN_PAGE_SIZE;
  const to = from + ADMIN_PAGE_SIZE - 1;

  // Filtre par rôle : via user_roles d'abord.
  let userIds: string[] | null = null;
  if (options.role && options.role !== "all") {
    const { data: roleRows } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", options.role);
    userIds = asRows<{ user_id: string }>(roleRows).map((r) => r.user_id);
    if (userIds.length === 0) {
      return { items: [], total: 0, page, pageSize: ADMIN_PAGE_SIZE };
    }
  }

  let query = supabase
    .from("profiles")
    .select("id, display_name, created_at, updated_at", { count: "exact" })
    .order("created_at", { ascending: false });

  if (userIds) query = query.in("id", userIds);
  const q = (options.q ?? "").trim();
  if (q.length > 0) {
    query = query.ilike("display_name", `%${q.replace(/[%_]/g, "")}%`);
  }

  const { data, count: total, error } = await query.range(from, to);
  if (error) {
    console.warn("[admin] users:", error.message);
    return { items: [], total: 0, page, pageSize: ADMIN_PAGE_SIZE };
  }
  const profiles = asRows<{
    id: string;
    display_name: string | null;
    created_at: string;
    updated_at: string;
  }>(data);
  const ids = profiles.map((p) => p.id);
  if (ids.length === 0) {
    return { items: [], total: total ?? 0, page, pageSize: ADMIN_PAGE_SIZE };
  }

  const [rolesRes, propsRes, viewingsRes, favsRes, reqsRes] = await Promise.all([
    supabase.from("user_roles").select("user_id, role").in("user_id", ids),
    supabase.from("properties").select("owner_id, created_at").in("owner_id", ids),
    supabase.from("viewings").select("buyer_id, created_at").in("buyer_id", ids),
    supabase.from("favorites").select("user_id, created_at").in("user_id", ids),
    supabase.from("service_requests").select("user_id, created_at").in("user_id", ids),
  ]);

  const rolesByUser = new Map<string, string[]>();
  for (const r of asRows<{ user_id: string; role: string }>(rolesRes.data)) {
    const arr = rolesByUser.get(r.user_id) ?? [];
    arr.push(r.role);
    rolesByUser.set(r.user_id, arr);
  }
  const propCount = new Map<string, number>();
  const lastByUser = new Map<string, string>();
  const bump = (uid: string, at: string) => {
    const prev = lastByUser.get(uid);
    if (!prev || prev < at) lastByUser.set(uid, at);
  };
  for (const r of asRows<{ owner_id: string; created_at: string }>(propsRes.data)) {
    propCount.set(r.owner_id, (propCount.get(r.owner_id) ?? 0) + 1);
    bump(r.owner_id, r.created_at);
  }
  const viewingCount = new Map<string, number>();
  for (const r of asRows<{ buyer_id: string; created_at: string }>(viewingsRes.data)) {
    viewingCount.set(r.buyer_id, (viewingCount.get(r.buyer_id) ?? 0) + 1);
    bump(r.buyer_id, r.created_at);
  }
  for (const r of asRows<{ user_id: string; created_at: string }>(favsRes.data))
    bump(r.user_id, r.created_at);
  for (const r of asRows<{ user_id: string; created_at: string }>(reqsRes.data))
    bump(r.user_id, r.created_at);

  return {
    items: profiles.map((p) => ({
      id: p.id,
      displayName: p.display_name,
      roles: rolesByUser.get(p.id) ?? [],
      createdAt: p.created_at,
      propertiesCount: propCount.get(p.id) ?? 0,
      viewingsCount: viewingCount.get(p.id) ?? 0,
      lastActivityAt: lastByUser.get(p.id) ?? p.updated_at ?? null,
    })),
    total: total ?? 0,
    page,
    pageSize: ADMIN_PAGE_SIZE,
  };
}

export interface AdminUserDetail {
  id: string;
  displayName: string | null;
  roles: string[];
  createdAt: string;
  properties: { id: string; address: string; city: string; status: string }[];
  favorites: { propertyId: string; address: string; createdAt: string }[];
  viewings: {
    id: string;
    propertyId: string;
    address: string;
    scheduled_at: string;
    status: string;
  }[];
  offers: {
    id: string;
    propertyId: string;
    address: string;
    amount: number | null;
    status: string;
  }[];
  serviceRequests: {
    id: string;
    service_id: string;
    project_name: string;
    status: string;
    created_at: string;
  }[];
  audit: AuditEntry[];
}

/** Fiche admin complète d'un utilisateur. */
export async function getAdminUserDetail(
  id: string,
): Promise<AdminUserDetail | null> {
  if (!hasSupabaseConfig()) return null;
  const admin = await assertAdmin();
  if (!admin) return null;
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, display_name, created_at")
    .eq("id", id)
    .maybeSingle();
  if (error || !profile) return null;
  const p = profile as { id: string; display_name: string | null; created_at: string };

  const [rolesRes, propsRes, favsRes, viewingsRes, offersRes, reqsRes, audit] =
    await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", id),
      supabase
        .from("properties")
        .select("id, address, city, status")
        .eq("owner_id", id)
        .order("created_at", { ascending: false }),
      supabase
        .from("favorites")
        .select("property_id, created_at, properties(id, address, city)")
        .eq("user_id", id)
        .order("created_at", { ascending: false }),
      supabase
        .from("viewings")
        .select("id, property_id, scheduled_at, status, properties(id, address, city)")
        .eq("buyer_id", id)
        .order("created_at", { ascending: false }),
      supabase
        .from("offers")
        .select("id, property_id, amount, status, properties(id, address, city)")
        .eq("buyer_id", id)
        .order("created_at", { ascending: false }),
      supabase
        .from("service_requests")
        .select("id, service_id, project_name, status, created_at")
        .eq("user_id", id)
        .order("created_at", { ascending: false }),
      getAuditEntries({ objectType: "user", objectId: id, limit: 30 }),
    ]);

  const addrOf = (rel: unknown): string => {
    const r = rel as { address?: string; city?: string } | null;
    return r?.address ? `${r.address} — ${r.city ?? ""}`.trim() : "Annonce";
  };

  return {
    id: p.id,
    displayName: p.display_name,
    roles: asRows<{ role: string }>(rolesRes.data).map((r) => r.role),
    createdAt: p.created_at,
    properties: asRows<{
      id: string;
      address: string;
      city: string;
      status: string;
    }>(propsRes.data),
    favorites: asRows<{
      property_id: string;
      created_at: string;
      properties: unknown;
    }>(favsRes.data).map((f) => ({
      propertyId: f.property_id,
      address: addrOf(f.properties),
      createdAt: f.created_at,
    })),
    viewings: asRows<{
      id: string;
      property_id: string;
      scheduled_at: string;
      status: string;
      properties: unknown;
    }>(viewingsRes.data).map((v) => ({
      id: v.id,
      propertyId: v.property_id,
      address: addrOf(v.properties),
      scheduled_at: v.scheduled_at,
      status: v.status,
    })),
    offers: asRows<{
      id: string;
      property_id: string;
      amount: number | null;
      status: string;
      properties: unknown;
    }>(offersRes.data).map((o) => ({
      id: o.id,
      propertyId: o.property_id,
      address: addrOf(o.properties),
      amount: o.amount,
      status: o.status,
    })),
    serviceRequests: asRows<{
      id: string;
      service_id: string;
      project_name: string;
      status: string;
      created_at: string;
    }>(reqsRes.data),
    audit,
  };
}

/**
 * Attribue ou révoque un rôle (admin uniquement).
 * Sécurité : impossible de se retirer son propre rôle ADMIN
 * (évite de se verrouiller hors du dashboard).
 */
export async function setUserRole(
  userId: string,
  role: string,
  assign: boolean,
): Promise<{ ok: boolean; message?: string }> {
  if (!hasSupabaseConfig())
    return { ok: false, message: "Base de données non configurée." };
  const admin = await assertAdmin();
  if (!admin) return { ok: false, message: "Action réservée aux administrateurs." };
  const adminId = admin.user?.id;
  if (!adminId) return { ok: false, message: "Action réservée aux administrateurs." };
  if (!(MANAGEABLE_ROLES as readonly string[]).includes(role)) {
    return { ok: false, message: "Rôle invalide." };
  }
  if (!assign && role === "ADMIN" && userId === adminId) {
    return {
      ok: false,
      message: "Vous ne pouvez pas retirer votre propre rôle ADMIN.",
    };
  }

  const supabase = await createClient();
  if (assign) {
    const { error } = await supabase
      .from("user_roles")
      .upsert({ user_id: userId, role }, { onConflict: "user_id,role" });
    if (error) return { ok: false, message: "L'attribution a échoué." };
  } else {
    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", userId)
      .eq("role", role);
    if (error) return { ok: false, message: "La révocation a échoué." };
  }

  await logAdminAction(adminId, {
    action: assign ? "user.role_granted" : "user.role_revoked",
    objectType: "user",
    objectId: userId,
    newValue: { role, assign },
  });

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
  return { ok: true };
}

/* ============================================================
 * DEMANDES DE SERVICE
 * ============================================================ */

export async function getAdminServiceRequests(options: {
  status?: string;
  page?: number;
}): Promise<{
  items: ServiceRequestListItem[];
  total: number;
  page: number;
  pageSize: number;
} | null> {
  if (!hasSupabaseConfig()) return null;
  const admin = await assertAdmin();
  if (!admin) return null;
  const supabase = await createClient();

  const page = Math.max(1, options.page ?? 1);
  const from = (page - 1) * ADMIN_PAGE_SIZE;
  const to = from + ADMIN_PAGE_SIZE - 1;

  let query = supabase
    .from("service_requests")
    .select(
      "id, service_id, project_name, contact_name, contact_email, contact_phone, status, created_at",
      { count: "exact" },
    )
    .order("created_at", { ascending: false });

  if (options.status && options.status !== "all") {
    query = query.eq("status", options.status);
  }

  const { data, count: total, error } = await query.range(from, to);
  if (error) {
    console.warn("[admin] service_requests:", error.message);
    return { items: [], total: 0, page, pageSize: ADMIN_PAGE_SIZE };
  }
  return {
    items: asRows<ServiceRequestListItem>(data),
    total: total ?? 0,
    page,
    pageSize: ADMIN_PAGE_SIZE,
  };
}

export interface ServiceRequestDetail extends ServiceRequestListItem {
  user_id: string | null;
  description: string;
  admin_note: string | null;
  updated_at: string;
}

/** Détail d'une demande de service (+ historique admin). */
export async function getServiceRequestDetail(
  id: string,
): Promise<{ request: ServiceRequestDetail; audit: AuditEntry[] } | null> {
  if (!hasSupabaseConfig()) return null;
  const admin = await assertAdmin();
  if (!admin) return null;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("service_requests")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  const audit = await getAuditEntries({
    objectType: "service_request",
    objectId: id,
    limit: 30,
  });
  return { request: data as ServiceRequestDetail, audit };
}

function isServiceRequestStatus(value: string): boolean {
  return SERVICE_REQUEST_STATUSES.some((s) => s.id === value);
}

/** Fait avancer le statut d'une demande (admin uniquement). */
export async function setServiceRequestStatus(
  id: string,
  status: string,
): Promise<{ ok: boolean; message?: string }> {
  if (!hasSupabaseConfig())
    return { ok: false, message: "Base de données non configurée." };
  const admin = await assertAdmin();
  if (!admin) return { ok: false, message: "Action réservée aux administrateurs." };
  const adminId = admin.user?.id;
  if (!adminId) return { ok: false, message: "Action réservée aux administrateurs." };
  if (!isServiceRequestStatus(status))
    return { ok: false, message: "Statut invalide." };

  const supabase = await createClient();
  const { data: current } = await supabase
    .from("service_requests")
    .select("id, status")
    .eq("id", id)
    .maybeSingle();
  if (!current) return { ok: false, message: "Demande introuvable." };

  const { error } = await supabase
    .from("service_requests")
    .update({ status })
    .eq("id", id);
  if (error) return { ok: false, message: "Le statut n'a pas pu être mis à jour." };

  await logAdminAction(adminId, {
    action: "service_request.status_changed",
    objectType: "service_request",
    objectId: id,
    oldValue: { status: (current as { status: string }).status },
    newValue: { status },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/requests");
  revalidatePath(`/admin/requests/${id}`);
  return { ok: true };
}

/** Note interne admin sur une demande (admin uniquement). */
export async function setServiceRequestNote(
  id: string,
  note: string,
): Promise<{ ok: boolean; message?: string }> {
  if (!hasSupabaseConfig())
    return { ok: false, message: "Base de données non configurée." };
  const admin = await assertAdmin();
  if (!admin) return { ok: false, message: "Action réservée aux administrateurs." };
  const adminId = admin.user?.id;
  if (!adminId) return { ok: false, message: "Action réservée aux administrateurs." };

  const clean = note.trim().slice(0, 2000);
  const supabase = await createClient();
  const { error } = await supabase
    .from("service_requests")
    .update({ admin_note: clean.length > 0 ? clean : null })
    .eq("id", id);
  if (error) return { ok: false, message: "La note n'a pas pu être enregistrée." };

  await logAdminAction(adminId, {
    action: "service_request.note_updated",
    objectType: "service_request",
    objectId: id,
  });

  revalidatePath(`/admin/requests/${id}`);
  return { ok: true };
}

/* ============================================================
 * AUDIT LOG
 * ============================================================ */

/** Entrées du journal d'audit pour un objet (ou global si non précisé). */
export async function getAuditEntries(options: {
  objectType?: string;
  objectId?: string;
  limit?: number;
}): Promise<AuditEntry[]> {
  if (!hasSupabaseConfig()) return [];
  const admin = await assertAdmin();
  if (!admin) return [];
  const supabase = await createClient();

  let query = supabase
    .from("admin_audit_log")
    .select("id, action, object_type, object_id, old_value, new_value, created_at, admin_id")
    .order("created_at", { ascending: false })
    .limit(Math.max(1, Math.min(100, options.limit ?? 30)));

  if (options.objectType) query = query.eq("object_type", options.objectType);
  if (options.objectId) query = query.eq("object_id", options.objectId);

  const { data, error } = await query;
  if (error) {
    // Table absente (migration non appliquée) : journal vide, pas de crash.
    return [];
  }
  const entries = asRows<{
    id: string;
    action: string;
    object_type: string;
    object_id: string;
    old_value: unknown;
    new_value: unknown;
    created_at: string;
    admin_id: string;
  }>(data);
  const names = await displayNamesById(entries.map((e) => e.admin_id));
  return entries.map((e) => ({
    id: e.id,
    action: e.action,
    object_type: e.object_type,
    object_id: e.object_id,
    old_value: e.old_value,
    new_value: e.new_value,
    created_at: e.created_at,
    adminName: names.get(e.admin_id) ?? null,
  }));
}

/* ============================================================
 * Carte / Globe 3D — positions réelles des biens.
 *
 * RÈGLE D'HONNÊTETÉ :
 * - Seules les propriétés avec latitude/longitude en base sont
 *   placées précisément.
 * - Les propriétés sans coordonnées sont regroupées par ville
 *   (position approximative = centre-ville connu, jamais inventé
 *   à l'adresse près) et marquées comme telles.
 * - Les villes inconnues de la table de correspondance sont
 *   comptées comme « non localisables », pas placées au hasard.
 * - Les clients (profiles) n'ont AUCUNE donnée de localisation
 *   en base : ils ne sont pas affichés, et l'UI le dit.
 * ============================================================ */

export interface MapPoint {
  /** Libellé affiché au survol. */
  label: string;
  city: string;
  lat: number;
  lng: number;
  /** precise = coordonnées réelles en base ; city = centre-ville approximatif. */
  kind: "precise" | "city";
  /** Nombre de biens représentés par ce point. */
  count: number;
}

export interface MapData {
  points: MapPoint[];
  preciseCount: number;
  cityCount: number;
  unlocatedCount: number;
  total: number;
}

/** Centres-villes connus (Québec) — positions publiques approximatives. */
const CITY_COORDS: Record<string, { lat: number; lng: number; label: string }> = {
  montreal: { lat: 45.5017, lng: -73.5673, label: "Montréal" },
  quebec: { lat: 46.8139, lng: -71.208, label: "Québec" },
  laval: { lat: 45.6066, lng: -73.7124, label: "Laval" },
  gatineau: { lat: 45.4765, lng: -75.7013, label: "Gatineau" },
  longueuil: { lat: 45.5312, lng: -73.5181, label: "Longueuil" },
  sherbrooke: { lat: 45.4042, lng: -71.8929, label: "Sherbrooke" },
  saguenay: { lat: 48.4281, lng: -71.0685, label: "Saguenay" },
  levis: { lat: 46.7382, lng: -71.1712, label: "Lévis" },
  "trois-rivieres": { lat: 46.3432, lng: -72.5477, label: "Trois-Rivières" },
  terrebonne: { lat: 45.7, lng: -73.6333, label: "Terrebonne" },
  brossard: { lat: 45.4667, lng: -73.45, label: "Brossard" },
  repentigny: { lat: 45.7333, lng: -73.4667, label: "Repentigny" },
  drummondville: { lat: 45.8833, lng: -72.4833, label: "Drummondville" },
  "saint-jerome": { lat: 45.7667, lng: -74.0, label: "Saint-Jérôme" },
  granby: { lat: 45.4, lng: -72.7333, label: "Granby" },
  blainville: { lat: 45.6667, lng: -73.8833, label: "Blainville" },
  mirabel: { lat: 45.65, lng: -74.0833, label: "Mirabel" },
  shawinigan: { lat: 46.5667, lng: -72.75, label: "Shawinigan" },
  rimouski: { lat: 48.45, lng: -68.5333, label: "Rimouski" },
  "saint-jean-sur-richelieu": { lat: 45.3074, lng: -73.2627, label: "Saint-Jean-sur-Richelieu" },
};

function normalizeCity(city: string): string {
  return city
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** Points du globe : 100 % dérivés de la base, rien d'inventé. */
export async function getMapPoints(): Promise<MapData | null> {
  if (!hasSupabaseConfig()) return null;
  const admin = await assertAdmin();
  if (!admin) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("properties")
    .select("id, address, city, latitude, longitude, status")
    .limit(2000);

  const rows = asRows<{
    id: string;
    address: string;
    city: string;
    latitude: number | null;
    longitude: number | null;
    status: string;
  }>(data);

  const points: MapPoint[] = [];
  const byCity = new Map<string, { raw: string; count: number }>();
  let unlocatedCount = 0;
  let preciseCount = 0;

  for (const r of rows) {
    const lat = typeof r.latitude === "number" ? r.latitude : null;
    const lng = typeof r.longitude === "number" ? r.longitude : null;
    if (lat != null && lng != null && Number.isFinite(lat) && Number.isFinite(lng)) {
      points.push({
        label: r.address,
        city: r.city,
        lat,
        lng,
        kind: "precise",
        count: 1,
      });
      preciseCount += 1;
      continue;
    }
    const key = normalizeCity(r.city ?? "");
    const known = CITY_COORDS[key];
    if (known) {
      const entry = byCity.get(key) ?? { raw: known.label, count: 0 };
      entry.count += 1;
      byCity.set(key, entry);
    } else {
      unlocatedCount += 1;
    }
  }

  let cityCount = 0;
  for (const [key, entry] of byCity) {
    const known = CITY_COORDS[key];
    points.push({
      label: `${entry.count} bien${entry.count > 1 ? "s" : ""} — ${entry.raw} (ville)`,
      city: entry.raw,
      lat: known.lat,
      lng: known.lng,
      kind: "city",
      count: entry.count,
    });
    cityCount += entry.count;
  }

  return { points, preciseCount, cityCount, unlocatedCount, total: rows.length };
}
