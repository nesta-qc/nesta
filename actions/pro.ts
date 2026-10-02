"use server";

import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { assertAdmin } from "@/lib/admin";

/* ============================================================
 * VEYLA — demandes entrantes VEYLA Pro (section /projects).
 * Le formulaire public remplace le mailto : pas de courriel
 * de contact Veyla pour l'instant. Lecture réservée aux admins.
 * ============================================================ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ProLead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string | null;
  created_at: string;
}

/** Envoi public d'une demande VEYLA Pro. */
export async function submitProLead(
  formData: FormData,
): Promise<{ ok: boolean; message: string }> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const company = String(formData.get("company") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim() || null;

  if (name.length < 2) {
    return { ok: false, message: "Indiquez votre nom." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "Courriel invalide." };
  }
  if (!hasSupabaseConfig()) {
    return { ok: false, message: "Service temporairement indisponible." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("pro_leads")
    .insert({ name, email, company, message });

  if (error) {
    return { ok: false, message: "Envoi impossible pour le moment." };
  }
  return { ok: true, message: "Demande envoyée. Gabriel vous recontacte personnellement sous 48 h." };
}

/** Demandes entrantes — réservé ADMIN. */
export async function getProLeads(): Promise<ProLead[]> {
  const viewer = await assertAdmin();
  if (!viewer || !hasSupabaseConfig()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pro_leads")
    .select("id, name, email, company, message, created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) return [];
  return (data ?? []) as ProLead[];
}
