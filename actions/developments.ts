"use server";

import { createClient } from "@/lib/supabase/server";
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
  units: DevelopmentUnitSummary;
}

/** Projets réels visibles (non-brouillon selon RLS). */
export async function getDevelopments(): Promise<DevelopmentRow[]> {
  if (!hasSupabaseConfig()) return [];
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("developments")
    .select("id, name, address, city, description, completion_date, status")
    .order("created_at", { ascending: false })
    .limit(50);
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
