"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { assertAdmin } from "@/lib/admin";
import {
  PROSPECT_STATUSES,
  PROSPECT_STATUS_LABELS,
  type ProspectStatus,
} from "@/lib/prospects";
import {
  pipelineValue,
  isEmailConfidence,
  isActivityType,
  parseRdvDate,
  type ActivityType,
  type EmailConfidence,
} from "@/lib/crm";
import type { ProspectRow } from "@/actions/prospects";

/*
 * NESTA — Server Actions du CRM de prospection (/admin/prospection).
 * Toutes les fonctions exigent le rôle ADMIN (assertAdmin).
 * La RLS (policies *_admin_*, migrations 000017 et 000023) reste la
 * barrière principale côté base de données.
 *
 * Note : aucune action n'envoie d'email. Les lots d'envoi sont
 * approuvés ici puis envoyés manuellement via Gmail.
 */

export interface EmailTemplateRow {
  id: string;
  name: string;
  subject: string;
  body: string;
  step: number;
  created_at: string;
}

export interface SendBatchRow {
  id: string;
  name: string;
  template_id: string | null;
  prospect_ids: string[];
  status: "brouillon" | "approuve" | "envoye";
  created_by: string | null;
  approved_at: string | null;
  created_at: string;
}

export interface ProspectActivityRow {
  id: string;
  prospect_id: string;
  type: ActivityType;
  body: string | null;
  created_by: string | null;
  created_at: string;
}

export interface CrmKpis {
  total: number;
  pipelineCents: number;
  aRelancer: number;
  rdvAVenir: number;
  tauxReponse: number;
}

export interface ChartDay {
  date: string;
  label: string;
  /** Instantané réel du jour (null = aucun snapshot enregistré). */
  snapshotCents: number | null;
  /** Reconstitution honnête depuis les dates de création (à afficher en pointillés). */
  estimatedCents: number;
  /** Emails + appels + réponses + RDV du jour. */
  activities: number;
}

export interface CrmOverview {
  prospects: ProspectRow[];
  kpis: CrmKpis;
  chart: ChartDay[];
  templates: EmailTemplateRow[];
  batches: SendBatchRow[];
  /** id du prospect → courriel (pour copier les emails d'un lot). */
  emailMap: Record<string, string>;
}

const TRACKED_ACTIVITY_TYPES = ["email_envoye", "appel", "reponse", "rdv"];
const CONTACTED_STATUSES: ProspectStatus[] = [
  "contacte",
  "sans_reponse",
  "interesse",
  "en_discussion",
  "partenaire",
];

/** Replis défensifs si la migration 000023 n'est pas encore appliquée. */
function toCrmRow(r: Record<string, unknown>): ProspectRow {
  return {
    ...(r as object),
    assigned_to: (r.assigned_to as string | null) ?? null,
    next_follow_up_at: (r.next_follow_up_at as string | null) ?? null,
    estimated_projects:
      typeof r.estimated_projects === "number" ? r.estimated_projects : 1,
    email_confidence: isEmailConfidence(r.email_confidence)
      ? (r.email_confidence as EmailConfidence)
      : "a_confirmer",
    email_step: typeof r.email_step === "number" ? r.email_step : 0,
    do_not_contact: r.do_not_contact === true,
  } as ProspectRow;
}

function localIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function clean(value: string | null | undefined): string | null {
  const v = (value ?? "").trim();
  return v.length > 0 ? v : null;
}

function isValidStatus(value: unknown): value is ProspectStatus {
  return (PROSPECT_STATUSES as readonly string[]).includes(value as string);
}

/* ------------------------------------------------------------------ */
/* Vue d'ensemble (page principale)                                    */
/* ------------------------------------------------------------------ */

export async function getCrmOverview(): Promise<CrmOverview | null> {
  const viewer = await assertAdmin();
  if (!viewer) return null;
  const supabase = await createClient();
  const now = new Date();
  const todayIso = localIsoDate(now);
  const cutoff30 = new Date(now);
  cutoff30.setDate(cutoff30.getDate() - 30);
  const cutoff120 = new Date(now);
  cutoff120.setDate(cutoff120.getDate() - 120);

  const [
    prospectsRes,
    snapshotsRes,
    templatesRes,
    batchesRes,
    recentActivitiesRes,
    rdvRes,
    respondedRes,
  ] = await Promise.all([
    supabase.from("prospects").select("*").order("created_at", { ascending: false }),
    supabase.from("crm_snapshots").select("*").order("date", { ascending: true }).limit(31),
    supabase.from("email_templates").select("*").order("step", { ascending: true }),
    supabase.from("send_batches").select("*").order("created_at", { ascending: false }),
    supabase
      .from("prospect_activities")
      .select("id, prospect_id, type, created_at")
      .gte("created_at", cutoff30.toISOString())
      .limit(10000),
    supabase
      .from("prospect_activities")
      .select("id, prospect_id, body, created_at")
      .eq("type", "rdv")
      .gte("created_at", cutoff120.toISOString())
      .limit(2000),
    supabase
      .from("prospect_activities")
      .select("prospect_id")
      .in("type", ["reponse", "rdv"])
      .limit(20000),
  ]);

  const prospects: ProspectRow[] = (
    Array.isArray(prospectsRes.data) ? prospectsRes.data : []
  ).map((r) => toCrmRow(r as Record<string, unknown>));
  const snapshots: { date: string; pipeline_cents: number }[] = Array.isArray(
    snapshotsRes.data,
  )
    ? snapshotsRes.data
    : [];
  const templates: EmailTemplateRow[] = (
    Array.isArray(templatesRes.data) ? templatesRes.data : []
  ) as EmailTemplateRow[];
  const batches: SendBatchRow[] = (
    Array.isArray(batchesRes.data) ? batchesRes.data : []
  ) as SendBatchRow[];
  const recentActivities: { type: string; created_at: string }[] = Array.isArray(
    recentActivitiesRes.data,
  )
    ? recentActivitiesRes.data
    : [];
  const rdvRows: { body: string | null; created_at: string }[] = Array.isArray(
    rdvRes.data,
  )
    ? rdvRes.data
    : [];
  const respondedIds = new Set(
    (Array.isArray(respondedRes.data) ? respondedRes.data : []).map(
      (r: { prospect_id: string }) => r.prospect_id,
    ),
  );

  /* Instantané du jour (best-effort : ignore si la migration 000023
     n'est pas encore appliquée). */
  const pipelineCents = Math.round(pipelineValue(prospects));
  const emailsSentToday = recentActivities.filter(
    (a) =>
      a.type === "email_envoye" &&
      localIsoDate(new Date(a.created_at)) === todayIso,
  ).length;
  try {
    await supabase.from("crm_snapshots").upsert(
      {
        date: todayIso,
        pipeline_cents: pipelineCents,
        prospects_count: prospects.length,
        emails_sent: emailsSentToday,
      },
      { onConflict: "date" },
    );
  } catch {
    /* Table absente : le graphique utilisera la reconstitution estimée. */
  }
  const snapshotByDate = new Map<string, number>(
    snapshots.map((s) => [s.date, Number(s.pipeline_cents) || 0]),
  );
  if (!snapshotByDate.has(todayIso)) snapshotByDate.set(todayIso, pipelineCents);

  /* Graphique des 30 derniers jours. */
  const chart: ChartDay[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const iso = localIsoDate(d);
    const estimatedCents = Math.round(
      pipelineValue(
        prospects.filter((p) => (p.created_at ?? "").slice(0, 10) <= iso),
      ),
    );
    const activities = recentActivities.filter(
      (a) =>
        TRACKED_ACTIVITY_TYPES.includes(a.type) &&
        localIsoDate(new Date(a.created_at)) === iso,
    ).length;
    chart.push({
      date: iso,
      label: d.toLocaleDateString("fr-CA", { day: "numeric", month: "short" }),
      snapshotCents: snapshotByDate.get(iso) ?? null,
      estimatedCents,
      activities,
    });
  }

  /* KPIs. */
  const aRelancer = prospects.filter(
    (p) =>
      p.next_follow_up_at &&
      new Date(p.next_follow_up_at).getTime() < now.getTime() &&
      !p.do_not_contact &&
      p.status !== "refuse" &&
      p.status !== "partenaire",
  ).length;
  const rdvAVenir = rdvRows.filter((r) => {
    const at = parseRdvDate(r.body);
    return at !== null && new Date(at).getTime() >= now.getTime();
  }).length;
  const contactedIds = new Set(
    prospects.filter((p) => CONTACTED_STATUSES.includes(p.status)).map((p) => p.id),
  );
  const respondedContacted = [...respondedIds].filter((id) =>
    contactedIds.has(id),
  ).length;
  const tauxReponse =
    contactedIds.size > 0
      ? Math.round((respondedContacted / contactedIds.size) * 100)
      : 0;

  const emailMap: Record<string, string> = {};
  for (const p of prospects) {
    if (p.email) emailMap[p.id] = p.email;
  }

  return {
    prospects,
    kpis: { total: prospects.length, pipelineCents, aRelancer, rdvAVenir, tauxReponse },
    chart,
    templates,
    batches,
    emailMap,
  };
}

/* ------------------------------------------------------------------ */
/* Fiche prospect                                                      */
/* ------------------------------------------------------------------ */

export async function getProspectDetail(id: string): Promise<{
  prospect: ProspectRow;
  activities: ProspectActivityRow[];
} | null> {
  const viewer = await assertAdmin();
  if (!viewer) return null;
  const supabase = await createClient();
  const { data: prospectRaw } = await supabase
    .from("prospects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!prospectRaw) return null;
  const { data: activitiesRaw } = await supabase
    .from("prospect_activities")
    .select("*")
    .eq("prospect_id", id)
    .order("created_at", { ascending: false });
  return {
    prospect: toCrmRow(prospectRaw as Record<string, unknown>),
    activities: (Array.isArray(activitiesRaw) ? activitiesRaw : []).filter((a) =>
      isActivityType((a as { type: unknown }).type),
    ) as ProspectActivityRow[],
  };
}

export interface ProspectFullInput {
  company_name: string;
  contact_name?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  project_name?: string | null;
  project_location?: string | null;
  project_type?: string | null;
  source?: string | null;
  notes?: string | null;
  status?: ProspectStatus;
  assigned_to?: string | null;
  next_follow_up_at?: string | null;
  estimated_projects?: number | null;
  email_confidence?: EmailConfidence | null;
  email_step?: number | null;
  do_not_contact?: boolean | null;
}

/** Mise à jour complète d'un prospect (fiche). Logue le changement de statut. */
export async function updateProspectFull(
  id: string,
  input: ProspectFullInput,
): Promise<{ ok: boolean; message?: string }> {
  const viewer = await assertAdmin();
  if (!viewer) return { ok: false, message: "Accès réservé aux administrateurs." };
  if (!(input.company_name ?? "").trim()) {
    return { ok: false, message: "Le nom de l’entreprise est requis." };
  }
  const status: ProspectStatus = isValidStatus(input.status)
    ? input.status
    : "a_contacter";
  const supabase = await createClient();

  const { data: current } = await supabase
    .from("prospects")
    .select("status")
    .eq("id", id)
    .maybeSingle();
  const oldStatus = (current as { status?: string } | null)?.status ?? null;

  const payload: Record<string, unknown> = {
    company_name: input.company_name.trim(),
    contact_name: clean(input.contact_name),
    email: clean(input.email),
    phone: clean(input.phone),
    website: clean(input.website),
    project_name: clean(input.project_name),
    project_location: clean(input.project_location),
    project_type: clean(input.project_type),
    source: clean(input.source),
    notes: clean(input.notes),
    status,
    assigned_to: clean(input.assigned_to),
    next_follow_up_at: clean(input.next_follow_up_at),
    estimated_projects: Math.max(0, Math.round(Number(input.estimated_projects ?? 1) || 0)),
    email_confidence: isEmailConfidence(input.email_confidence)
      ? input.email_confidence
      : "a_confirmer",
    email_step: Math.max(0, Math.round(Number(input.email_step ?? 0) || 0)),
    do_not_contact: input.do_not_contact === true,
    updated_at: new Date().toISOString(),
  };
  if (status === "contacte") payload.last_contact_at = new Date().toISOString();

  const { error } = await supabase.from("prospects").update(payload).eq("id", id);
  if (error) return { ok: false, message: "La mise à jour a échoué." };

  if (oldStatus && oldStatus !== status) {
    await supabase.from("prospect_activities").insert({
      prospect_id: id,
      type: "changement_statut",
      body: `Statut : ${PROSPECT_STATUS_LABELS[oldStatus as ProspectStatus] ?? oldStatus} → ${PROSPECT_STATUS_LABELS[status]}`,
      created_by: viewer.user?.email ?? null,
    });
  }

  revalidatePath("/admin/prospection");
  revalidatePath(`/admin/prospection/${id}`);
  return { ok: true };
}

/** Ajoute une entrée au journal d'activités d'un prospect. */
export async function addProspectActivity(
  prospectId: string,
  type: ActivityType,
  body: string | null,
): Promise<{ ok: boolean; message?: string }> {
  const viewer = await assertAdmin();
  if (!viewer) return { ok: false, message: "Accès réservé aux administrateurs." };
  if (!isActivityType(type)) return { ok: false, message: "Type d’activité invalide." };
  const supabase = await createClient();
  const { error } = await supabase.from("prospect_activities").insert({
    prospect_id: prospectId,
    type,
    body: clean(body),
    created_by: viewer.user?.email ?? null,
  });
  if (error) return { ok: false, message: "L’ajout a échoué." };
  if (type === "reponse" || type === "rdv" || type === "appel" || type === "email_envoye") {
    await supabase
      .from("prospects")
      .update({
        last_contact_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", prospectId);
  }
  revalidatePath("/admin/prospection");
  revalidatePath(`/admin/prospection/${prospectId}`);
  return { ok: true };
}

/** Planifie (ou efface) la prochaine relance d'un prospect. */
export async function setProspectFollowUp(
  id: string,
  iso: string | null,
): Promise<{ ok: boolean; message?: string }> {
  const viewer = await assertAdmin();
  if (!viewer) return { ok: false, message: "Accès réservé aux administrateurs." };
  const supabase = await createClient();
  const value = iso && !Number.isNaN(new Date(iso).getTime()) ? new Date(iso).toISOString() : null;
  const { error } = await supabase
    .from("prospects")
    .update({ next_follow_up_at: value, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { ok: false, message: "La relance n’a pas pu être définie." };
  if (value) {
    await supabase.from("prospect_activities").insert({
      prospect_id: id,
      type: "note",
      body: `Relance planifiée au ${new Date(value).toLocaleDateString("fr-CA", { day: "numeric", month: "long", year: "numeric" })}.`,
      created_by: viewer.user?.email ?? null,
    });
  }
  revalidatePath("/admin/prospection");
  revalidatePath(`/admin/prospection/${id}`);
  return { ok: true };
}

export interface BulkPatch {
  status?: ProspectStatus;
  assigned_to?: string | null;
  next_follow_up_at?: string | null;
  do_not_contact?: boolean | null;
}

/** Actions groupées sur une sélection de prospects (avec journalisation). */
export async function bulkUpdateProspects(
  ids: string[],
  patch: BulkPatch,
): Promise<{ ok: boolean; message?: string; updated?: number }> {
  const viewer = await assertAdmin();
  if (!viewer) return { ok: false, message: "Accès réservé aux administrateurs." };
  if (ids.length === 0) return { ok: false, message: "Aucun prospect sélectionné." };
  if (ids.length > 2000) return { ok: false, message: "Maximum 2 000 prospects par action." };
  const supabase = await createClient();

  const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (patch.status !== undefined) {
    if (!isValidStatus(patch.status)) return { ok: false, message: "Statut invalide." };
    payload.status = patch.status;
    if (patch.status === "contacte") payload.last_contact_at = new Date().toISOString();
  }
  if (patch.assigned_to !== undefined) payload.assigned_to = clean(patch.assigned_to);
  if (patch.next_follow_up_at !== undefined) {
    payload.next_follow_up_at =
      patch.next_follow_up_at &&
      !Number.isNaN(new Date(patch.next_follow_up_at).getTime())
        ? new Date(patch.next_follow_up_at).toISOString()
        : null;
  }
  if (patch.do_not_contact !== undefined) payload.do_not_contact = patch.do_not_contact === true;

  let oldStatuses = new Map<string, string>();
  if (patch.status !== undefined) {
    const { data } = await supabase.from("prospects").select("id, status").in("id", ids);
    oldStatuses = new Map(
      (Array.isArray(data) ? data : []).map((r: { id: string; status: string }) => [r.id, r.status]),
    );
  }

  const { error } = await supabase.from("prospects").update(payload).in("id", ids);
  if (error) return { ok: false, message: "L’action groupée a échoué." };

  if (patch.status !== undefined) {
    const rows = ids
      .filter((id) => oldStatuses.get(id) && oldStatuses.get(id) !== patch.status)
      .map((id) => ({
        prospect_id: id,
        type: "changement_statut",
        body: `Statut : ${PROSPECT_STATUS_LABELS[oldStatuses.get(id) as ProspectStatus] ?? oldStatuses.get(id)} → ${PROSPECT_STATUS_LABELS[patch.status as ProspectStatus]} (action groupée)`,
        created_by: viewer.user?.email ?? null,
      }));
    if (rows.length > 0) {
      await supabase.from("prospect_activities").insert(rows);
    }
  }

  revalidatePath("/admin/prospection");
  return { ok: true, updated: ids.length };
}

/* ------------------------------------------------------------------ */
/* Modèles d'emails                                                   */
/* ------------------------------------------------------------------ */

export async function getEmailTemplates(): Promise<EmailTemplateRow[] | null> {
  const viewer = await assertAdmin();
  if (!viewer) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("email_templates")
    .select("*")
    .order("step", { ascending: true });
  return (Array.isArray(data) ? data : []) as EmailTemplateRow[];
}

export async function saveEmailTemplate(
  id: string | null,
  input: { name: string; subject: string; body: string; step: number },
): Promise<{ ok: boolean; message?: string; id?: string }> {
  const viewer = await assertAdmin();
  if (!viewer) return { ok: false, message: "Accès réservé aux administrateurs." };
  if (!input.name.trim() || !input.subject.trim() || !input.body.trim()) {
    return { ok: false, message: "Nom, objet et contenu sont requis." };
  }
  const supabase = await createClient();
  const payload = {
    name: input.name.trim(),
    subject: input.subject.trim(),
    body: input.body.trim(),
    step: Math.max(1, Math.round(Number(input.step) || 1)),
  };
  const { data, error } = id
    ? await supabase.from("email_templates").update(payload).eq("id", id).select("id").maybeSingle()
    : await supabase.from("email_templates").insert(payload).select("id").maybeSingle();
  if (error || !data) return { ok: false, message: "L’enregistrement a échoué." };
  revalidatePath("/admin/prospection");
  return { ok: true, id: (data as { id: string }).id };
}

/* ------------------------------------------------------------------ */
/* Lots d'envoi (approbation manuelle — aucun envoi automatique)        */
/* ------------------------------------------------------------------ */

export async function createSendBatch(
  name: string,
  templateId: string | null,
  prospectIds: string[],
): Promise<{ ok: boolean; message?: string; id?: string }> {
  const viewer = await assertAdmin();
  if (!viewer) return { ok: false, message: "Accès réservé aux administrateurs." };
  if (!name.trim()) return { ok: false, message: "Le lot doit avoir un nom." };
  if (prospectIds.length === 0) {
    return { ok: false, message: "Sélectionne au moins un prospect." };
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("send_batches")
    .insert({
      name: name.trim(),
      template_id: templateId,
      prospect_ids: prospectIds,
      status: "brouillon",
      created_by: viewer.user?.email ?? null,
    })
    .select("id")
    .maybeSingle();
  if (error || !data) return { ok: false, message: "La création du lot a échoué." };
  revalidatePath("/admin/prospection");
  return { ok: true, id: (data as { id: string }).id };
}

/**
 * Approbation du patron : le lot passe en « approuve ».
 * Journalise un email_envoye par prospect et avance son étape d'envoi.
 * L'envoi réel reste manuel (via Gmail).
 */
export async function approveSendBatch(
  id: string,
): Promise<{ ok: boolean; message?: string }> {
  const viewer = await assertAdmin();
  if (!viewer) return { ok: false, message: "Accès réservé aux administrateurs." };
  const supabase = await createClient();
  const { data: batchRaw } = await supabase
    .from("send_batches")
    .select("id, status")
    .eq("id", id)
    .maybeSingle();
  const batch = batchRaw as { id: string; status: string } | null;
  if (!batch) return { ok: false, message: "Lot introuvable." };
  if (batch.status !== "brouillon") {
    return { ok: false, message: "Seul un brouillon peut être approuvé." };
  }

  /* L'approbation = le go du patron. Elle ne journalise RIEN :
   * l'envoi réel se fait ensuite manuellement via Gmail, et c'est
   * « Marquer envoyé » qui journalise l'activité email_envoye. */
  const { error } = await supabase
    .from("send_batches")
    .update({ status: "approuve", approved_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { ok: false, message: "L’approbation a échoué." };

  revalidatePath("/admin/prospection");
  return { ok: true };
}

/** Marque un lot approuvé comme envoyé (après l'envoi manuel via Gmail). */
export async function markBatchSent(
  id: string,
): Promise<{ ok: boolean; message?: string }> {
  const viewer = await assertAdmin();
  if (!viewer) return { ok: false, message: "Accès réservé aux administrateurs." };
  const supabase = await createClient();
  const { data: batchRaw } = await supabase
    .from("send_batches")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  const batch = batchRaw as SendBatchRow | null;
  if (!batch) return { ok: false, message: "Lot introuvable." };
  if (batch.status === "envoye") return { ok: false, message: "Lot déjà marqué comme envoyé." };
  if (batch.status !== "approuve") {
    return { ok: false, message: "Le lot doit d’abord être approuvé." };
  }

  /* Étape de la séquence portée par le modèle du lot. */
  let templateName = "modèle";
  let templateStep = 1;
  if (batch.template_id) {
    const { data: tpl } = await supabase
      .from("email_templates")
      .select("name, step")
      .eq("id", batch.template_id)
      .maybeSingle();
    if (tpl) {
      templateName = (tpl as { name: string }).name;
      templateStep = (tpl as { step: number }).step ?? 1;
    }
  }

  /* C'est ici — et seulement ici — que l'envoi est journalisé, parce que
   * c'est le moment où les courriels ont réellement quitté Gmail. */
  const nowIso = new Date().toISOString();
  const ids: string[] = Array.isArray(batch.prospect_ids) ? batch.prospect_ids : [];
  if (ids.length > 0) {
    const rows = ids.map((pid) => ({
      prospect_id: pid,
      type: "email_envoye",
      body: `Lot « ${batch.name} » — modèle « ${templateName} » (étape ${templateStep}) · envoyé via Gmail`,
      created_by: viewer.user?.email ?? null,
    }));
    for (let i = 0; i < rows.length; i += 500) {
      const { error: actError } = await supabase
        .from("prospect_activities")
        .insert(rows.slice(i, i + 500));
      if (actError) return { ok: false, message: "La journalisation a échoué." };
    }
    /* Avance la séquence (jamais en arrière) + date du dernier contact. */
    for (let i = 0; i < ids.length; i += 500) {
      const { error: stepError } = await supabase
        .from("prospects")
        .update({ email_step: templateStep, last_contact_at: nowIso, updated_at: nowIso })
        .in("id", ids.slice(i, i + 500))
        .lt("email_step", templateStep);
      if (stepError) return { ok: false, message: "La mise à jour des séquences a échoué." };
    }
    /* Dernier contact pour ceux déjà à une étape égale ou supérieure. */
    const { error: touchError } = await supabase
      .from("prospects")
      .update({ last_contact_at: nowIso, updated_at: nowIso })
      .in("id", ids);
    if (touchError) return { ok: false, message: "La mise à jour des contacts a échoué." };
  }

  const { error } = await supabase
    .from("send_batches")
    .update({ status: "envoye" })
    .eq("id", id);
  if (error) return { ok: false, message: "La mise à jour du lot a échoué." };
  revalidatePath("/admin/prospection");
  return { ok: true };
}

/** Supprime un lot encore à l'état brouillon. */
export async function deleteSendBatch(
  id: string,
): Promise<{ ok: boolean; message?: string }> {
  const viewer = await assertAdmin();
  if (!viewer) return { ok: false, message: "Accès réservé aux administrateurs." };
  const supabase = await createClient();
  const { error } = await supabase
    .from("send_batches")
    .delete()
    .eq("id", id)
    .eq("status", "brouillon");
  if (error) return { ok: false, message: "Seul un brouillon peut être supprimé." };
  revalidatePath("/admin/prospection");
  return { ok: true };
}

/* ------------------------------------------------------------------ */
/* Import CSV (avec déduplication)                                     */
/* ------------------------------------------------------------------ */

export interface CsvProspectRow {
  company_name: string;
  contact_name?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  project_name?: string | null;
  project_location?: string | null;
  project_type?: string | null;
  source?: string | null;
}

function dedupeKey(company: string, email: string | null | undefined): string {
  return `${company.trim().toLowerCase()}|${(email ?? "").trim().toLowerCase()}`;
}

/**
 * Importe des prospects en ignorant les doublons sur (company_name, email),
 * insensible à la casse et aux espaces — y compris dans le fichier lui-même.
 */
export async function importProspectsCsv(
  rows: CsvProspectRow[],
): Promise<{ ok: boolean; message?: string; inserted?: number; skipped?: number }> {
  const viewer = await assertAdmin();
  if (!viewer) return { ok: false, message: "Accès réservé aux administrateurs." };
  if (rows.length === 0) return { ok: false, message: "Aucune ligne à importer." };
  if (rows.length > 5000) return { ok: false, message: "Maximum 5 000 lignes par import." };

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("prospects")
    .select("company_name, email");
  const seen = new Set(
    (Array.isArray(existing) ? existing : []).map((r: { company_name: string; email: string | null }) =>
      dedupeKey(r.company_name, r.email),
    ),
  );

  const toInsert: Record<string, unknown>[] = [];
  let skipped = 0;
  for (const row of rows) {
    const company = (row.company_name ?? "").trim();
    if (!company) {
      skipped += 1;
      continue;
    }
    const key = dedupeKey(company, row.email);
    if (seen.has(key)) {
      skipped += 1;
      continue;
    }
    seen.add(key);
    toInsert.push({
      company_name: company,
      contact_name: clean(row.contact_name),
      email: clean(row.email),
      phone: clean(row.phone),
      website: clean(row.website),
      project_name: clean(row.project_name),
      project_location: clean(row.project_location),
      project_type: clean(row.project_type),
      status: "a_contacter",
      source: clean(row.source) ?? "import_csv",
      email_confidence: clean(row.email) ? "a_confirmer" : "manquant",
    });
  }

  for (let i = 0; i < toInsert.length; i += 500) {
    const { error } = await supabase.from("prospects").insert(toInsert.slice(i, i + 500));
    if (error) {
      return { ok: false, message: "L’import a échoué en cours de route." };
    }
  }

  revalidatePath("/admin/prospection");
  return { ok: true, inserted: toInsert.length, skipped };
}
