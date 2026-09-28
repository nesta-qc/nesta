"use server";

import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { assertAdmin } from "@/lib/admin";
import {
  WAITLIST_PROFESSIONS,
  type WaitlistProfession,
} from "@/lib/pro-waitlist";

/* ============================================================
 * NESTA — liste d'attente des professionnels (/pro).
 * Un courtier, notaire, estimateur ou partenaire laisse son
 * courriel pour être prévenu à l'ouverture de l'espace pros.
 * Insertion publique, lecture réservée aux admins.
 * ============================================================ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ProWaitlistEntry {
  id: string;
  email: string;
  profession: string;
  created_at: string;
}

/** Inscription publique à la liste d'attente pros. */
export async function submitProWaitlist(
  formData: FormData,
): Promise<{ ok: boolean; message: string }> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const profession = String(formData.get("profession") ?? "").trim();

  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "Courriel invalide." };
  }
  if (
    !WAITLIST_PROFESSIONS.includes(profession as WaitlistProfession)
  ) {
    return { ok: false, message: "Choisissez votre profession." };
  }
  if (!hasSupabaseConfig()) {
    return { ok: false, message: "Service temporairement indisponible." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("pro_waitlist")
    .insert({ email, profession });

  if (error) {
    return { ok: false, message: "Inscription impossible pour le moment." };
  }

  return {
    ok: true,
    message: "C'est noté. On vous écrit dès l'ouverture de l'espace pros.",
  };
}

/** Lecture admin de la liste d'attente pros. */
export async function getProWaitlist(): Promise<ProWaitlistEntry[]> {
  if (!hasSupabaseConfig()) return [];
  await assertAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pro_waitlist")
    .select("id, email, profession, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) return [];
  return (data ?? []) as ProWaitlistEntry[];
}
