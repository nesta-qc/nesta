"use server";

import { redirect } from "next/navigation";
import { getViewerContext } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { estLimite, ipAction } from "@/lib/rate-limit";
import { getServiceById } from "@/lib/services";

/* ============================================================
 * NESTA — demandes de services : création, suivi, fichiers.
 * Le statut n'avance que côté admin (politique RLS).
 * ============================================================ */

export interface ServiceRequestRow {
  id: string;
  user_id: string | null;
  service_id: string;
  project_name: string;
  description: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  status: string;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Résultat d'une insertion anonyme : jamais de fausse confirmation. */
export type AnonymousInsertResult =
  | { ok: true }
  | { ok: false; message: string };

const INSERT_FAILURE_MESSAGE =
  "La demande n'a pas pu être enregistrée pour le moment, réessayez plus tard.";

/**
 * Insère une demande de devis SANS compte (user_id NULL).
 * Couverte par la migration 000012 (policy « création anonyme »).
 * Le suivi en ligne reste réservé aux comptes connectés.
 */
export async function createAnonymousServiceRequest(
  formData: FormData,
): Promise<AnonymousInsertResult> {
  /* Anti-abus : 10 demandes / heure / IP (un humain n'en fait jamais plus). */
  const quota = estLimite(`devis-anonyme:${await ipAction()}`, 10, 3_600_000);
  if (quota.limite) {
    return {
      ok: false,
      message: "Trop de demandes rapprochées, réessayez dans quelques minutes.",
    };
  }
  /* Champ piège anti-robots (invisible à l'écran) : s'il est rempli,
     c'est un robot → succès silencieux, rien n'est enregistré. */
  if (String(formData.get("site_web") ?? "").trim() !== "") {
    return { ok: true };
  }

  if (!hasSupabaseConfig()) {
    return { ok: false, message: "Base de données non configurée." };
  }

  const serviceId = String(formData.get("service_id") ?? "");
  const service = getServiceById(serviceId);
  if (!service) {
    return { ok: false, message: "Service inconnu." };
  }

  const projectName = String(formData.get("project_name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const contactName = String(formData.get("contact_name") ?? "").trim();
  const contactEmail = String(formData.get("contact_email") ?? "").trim();
  const contactPhone = String(formData.get("contact_phone") ?? "").trim();

  if (contactName.length < 2) {
    return { ok: false, message: "Indiquez votre nom (2 caractères minimum)." };
  }
  if (!EMAIL_RE.test(contactEmail)) {
    return { ok: false, message: "Indiquez un courriel valide." };
  }
  if (projectName.length < 3) {
    return { ok: false, message: "Nommez votre projet (3 caractères minimum)." };
  }
  if (description.length < 20) {
    return {
      ok: false,
      message: "Décrivez votre besoin en quelques phrases (20 caractères minimum).",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("service_requests")
    .insert({
      user_id: null,
      service_id: serviceId,
      project_name: projectName,
      description,
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phone: contactPhone || null,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { ok: false, message: INSERT_FAILURE_MESSAGE };
  }
  return { ok: true };
}

const ANALYSIS_OBJECTIVES = {
  acheter: "Acheter",
  renover: "Rénover",
  investir: "Investir",
} as const;

type AnalysisObjective = keyof typeof ANALYSIS_OBJECTIVES;

/**
 * Demande d'analyse de propriété (parcours Passeport) SANS compte :
 * adresse → fiche → demande. N'exige AUCUNE session.
 * Insère service_id = 'analyse-propriete', project_name = adresse,
 * user_id = NULL. Couverte par la migration 000012.
 * En cas d'échec d'insert (migration non appliquée, réseau…),
 * retourne un message d'erreur honnête — jamais de fausse confirmation.
 */
export async function createAnalysisRequest(
  formData: FormData,
): Promise<AnonymousInsertResult> {
  /* Anti-abus : 10 demandes / heure / IP (un humain n'en fait jamais plus). */
  const quota = estLimite(`analyse-anonyme:${await ipAction()}`, 10, 3_600_000);
  if (quota.limite) {
    return {
      ok: false,
      message: "Trop de demandes rapprochées, réessayez dans quelques minutes.",
    };
  }
  /* Champ piège anti-robots (invisible à l'écran) : s'il est rempli,
     c'est un robot → succès silencieux, rien n'est enregistré. */
  if (String(formData.get("site_web") ?? "").trim() !== "") {
    return { ok: true };
  }

  if (!hasSupabaseConfig()) {
    return { ok: false, message: "Base de données non configurée." };
  }

  const contactName = String(formData.get("contact_name") ?? "").trim();
  const contactEmail = String(formData.get("contact_email") ?? "").trim();
  const contactPhone = String(formData.get("contact_phone") ?? "").trim();
  const address = String(formData.get("adresse") ?? "").trim();
  const objective = String(formData.get("objectif") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (contactName.length < 2) {
    return { ok: false, message: "Indiquez votre nom (2 caractères minimum)." };
  }
  if (!EMAIL_RE.test(contactEmail)) {
    return { ok: false, message: "Indiquez un courriel valide." };
  }
  if (address.length < 5) {
    return {
      ok: false,
      message: "Indiquez l'adresse de la propriété (5 caractères minimum).",
    };
  }
  if (!Object.keys(ANALYSIS_OBJECTIVES).includes(objective)) {
    return { ok: false, message: "Choisissez un objectif (acheter, rénover ou investir)." };
  }

  const objectiveLabel =
    ANALYSIS_OBJECTIVES[objective as AnalysisObjective];
  const description =
    `Objectif : ${objectiveLabel}` + (message ? `\n\n${message}` : "");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("service_requests")
    .insert({
      user_id: null,
      service_id: "analyse-propriete",
      project_name: address,
      description,
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phone: contactPhone || null,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { ok: false, message: INSERT_FAILURE_MESSAGE };
  }
  return { ok: true };
}

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 Mo

/** Crée une demande de devis. Redirige vers la confirmation. */
export async function createServiceRequest(formData: FormData): Promise<void> {
  const viewer = await getViewerContext();
  if (!viewer.user) {
    redirect("/connexion?redirect=/services/demande");
  }
  if (!hasSupabaseConfig()) {
    throw new Error("Base de données non configurée.");
  }

  const serviceId = String(formData.get("service_id") ?? "");
  const service = getServiceById(serviceId);
  if (!service) {
    throw new Error("Service inconnu.");
  }

  const projectName = String(formData.get("project_name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const contactEmail = String(formData.get("contact_email") ?? "").trim();
  const contactPhone = String(formData.get("contact_phone") ?? "").trim();

  if (projectName.length < 3) {
    throw new Error("Nommez votre projet (3 caractères minimum).");
  }
  if (description.length < 20) {
    throw new Error("Décrivez votre besoin en quelques phrases (20 caractères minimum).");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("service_requests")
    .insert({
      user_id: viewer.user.id,
      service_id: serviceId,
      project_name: projectName,
      description,
      contact_email: contactEmail || null,
      contact_phone: contactPhone || null,
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error("Impossible d'envoyer la demande. Réessayez.");
  }

  /* Fichiers joints (plans, PDF) — optionnels. */
  const files = formData.getAll("files").filter((f) => f instanceof File) as File[];
  for (const file of files) {
    if (file.size === 0) continue;
    if (file.size > MAX_FILE_SIZE) continue;
    if (!ALLOWED_FILE_TYPES.includes(file.type)) continue;
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
    const path = `${viewer.user.id}/${data.id}/${Date.now()}-${safeName}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await supabase.storage.from("service-request-files").upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });
  }

  redirect("/services/suivi?nouveau=1");
}

/** Demandes de l'utilisateur connecté, plus récentes d'abord. */
export async function getMyServiceRequests(): Promise<ServiceRequestRow[]> {
  const viewer = await getViewerContext();
  if (!viewer.user || !hasSupabaseConfig()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("service_requests")
    .select("*")
    .eq("user_id", viewer.user.id)
    .order("created_at", { ascending: false });
  return (data ?? []) as ServiceRequestRow[];
}

/** Annule une demande encore en cours (statut → cancelled). */
export async function cancelServiceRequest(
  id: string,
): Promise<{ ok: boolean; message?: string }> {
  const viewer = await getViewerContext();
  if (!viewer.user) return { ok: false, message: "Connectez-vous." };
  if (!hasSupabaseConfig()) return { ok: false, message: "Base de données non configurée." };
  const supabase = await createClient();
  const { error } = await supabase
    .from("service_requests")
    .update({ status: "cancelled" })
    .eq("id", id)
    .eq("user_id", viewer.user.id);
  if (error) return { ok: false, message: "Annulation impossible." };
  return { ok: true };
}
