"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { assertAdmin } from "@/lib/admin";
import { PROSPECT_STATUSES, type ProspectStatus } from "@/lib/prospects";
import { isEmailConfidence, type EmailConfidence } from "@/lib/crm";

/*
 * VEYLA — Server Actions de la prospection (/admin/prospection).
 * Toutes les fonctions exigent le rôle ADMIN (assertAdmin).
 * La RLS (policies prospects_admin_*, migration 000017) reste la
 * barrière principale côté base de données.
 */

export interface ProspectRow {
  id: string;
  company_name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  project_name: string | null;
  project_location: string | null;
  project_type: string | null;
  status: ProspectStatus;
  source: string | null;
  notes: string | null;
  last_contact_at: string | null;
  created_at: string;
  updated_at: string;
  /* Colonnes CRM (migration 000023). */
  assigned_to: string | null;
  next_follow_up_at: string | null;
  estimated_projects: number;
  email_confidence: EmailConfidence;
  email_step: number;
  do_not_contact: boolean;
}

export interface ProspectInput {
  company_name: string;
  contact_name?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  project_name?: string | null;
  project_location?: string | null;
  project_type?: string | null;
  status?: ProspectStatus;
  source?: string | null;
  notes?: string | null;
  /* Champs CRM (optionnels, migration 000023). */
  assigned_to?: string | null;
  next_follow_up_at?: string | null;
  estimated_projects?: number | null;
  email_confidence?: EmailConfidence | null;
  email_step?: number | null;
  do_not_contact?: boolean | null;
}

function clean(value: string | null | undefined): string | null {
  const v = (value ?? "").trim();
  return v.length > 0 ? v : null;
}

function toInput(form: ProspectInput): Record<string, unknown> {
  const status: ProspectStatus =
    form.status && (PROSPECT_STATUSES as readonly string[]).includes(form.status)
      ? form.status
      : "a_contacter";
  return {
    company_name: (form.company_name ?? "").trim(),
    contact_name: clean(form.contact_name),
    email: clean(form.email),
    phone: clean(form.phone),
    website: clean(form.website),
    project_name: clean(form.project_name),
    project_location: clean(form.project_location),
    project_type: clean(form.project_type),
    status,
    source: clean(form.source),
    notes: clean(form.notes),
    assigned_to: clean(form.assigned_to),
    next_follow_up_at: clean(form.next_follow_up_at),
    estimated_projects: Math.max(
      0,
      Math.round(Number(form.estimated_projects ?? 1) || 0),
    ),
    email_confidence: isEmailConfidence(form.email_confidence)
      ? form.email_confidence
      : "a_confirmer",
    email_step: Math.max(0, Math.round(Number(form.email_step ?? 0) || 0)),
    do_not_contact: form.do_not_contact === true,
  };
}

export async function getProspects(): Promise<ProspectRow[]> {
  const viewer = await assertAdmin();
  if (!viewer) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("prospects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return [];
  return (Array.isArray(data) ? data : []) as ProspectRow[];
}

export async function createProspect(
  input: ProspectInput,
): Promise<{ ok: boolean; message?: string }> {
  const viewer = await assertAdmin();
  if (!viewer) return { ok: false, message: "Accès réservé aux administrateurs." };
  if (!(input.company_name ?? "").trim()) {
    return { ok: false, message: "Le nom de l’entreprise est requis." };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("prospects").insert(toInput(input));
  if (error) return { ok: false, message: "La création a échoué." };
  revalidatePath("/admin/prospection");
  return { ok: true };
}

export async function updateProspect(
  id: string,
  input: ProspectInput,
): Promise<{ ok: boolean; message?: string }> {
  const viewer = await assertAdmin();
  if (!viewer) return { ok: false, message: "Accès réservé aux administrateurs." };
  if (!(input.company_name ?? "").trim()) {
    return { ok: false, message: "Le nom de l’entreprise est requis." };
  }
  const supabase = await createClient();
  const payload = { ...toInput(input), updated_at: new Date().toISOString() };
  const { error } = await supabase.from("prospects").update(payload).eq("id", id);
  if (error) return { ok: false, message: "La mise à jour a échoué." };
  revalidatePath("/admin/prospection");
  return { ok: true };
}

export async function setProspectStatus(
  id: string,
  status: ProspectStatus,
): Promise<{ ok: boolean; message?: string }> {
  const viewer = await assertAdmin();
  if (!viewer) return { ok: false, message: "Accès réservé aux administrateurs." };
  if (!(PROSPECT_STATUSES as readonly string[]).includes(status)) {
    return { ok: false, message: "Statut invalide." };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("prospects")
    .update({
      status,
      last_contact_at:
        status === "contacte" ? new Date().toISOString() : undefined,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) return { ok: false, message: "Le changement de statut a échoué." };
  revalidatePath("/admin/prospection");
  return { ok: true };
}

export async function deleteProspect(
  id: string,
): Promise<{ ok: boolean; message?: string }> {
  const viewer = await assertAdmin();
  if (!viewer) return { ok: false, message: "Accès réservé aux administrateurs." };
  const supabase = await createClient();
  const { error } = await supabase.from("prospects").delete().eq("id", id);
  if (error) return { ok: false, message: "La suppression a échoué." };
  revalidatePath("/admin/prospection");
  return { ok: true };
}
