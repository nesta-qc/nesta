"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { requireAdmin } from "@/lib/admin";
import {
  REVENUE_CATEGORIES,
  type RevenueCategory,
} from "@/lib/revenue";

export interface RevenueEvent {
  id: string;
  category: string;
  amount_cents: number;
  label: string;
  occurred_on: string;
  notes: string | null;
  created_at: string;
}

export interface RevenueStats {
  hasTable: boolean;
  totalCents: number;
  count: number;
  monthCents: number;
  byCategory: { category: string; totalCents: number; count: number }[];
  byMonth: { month: string; label: string; totalCents: number }[];
  recent: RevenueEvent[];
}

const EMPTY_STATS: RevenueStats = {
  hasTable: false,
  totalCents: 0,
  count: 0,
  monthCents: 0,
  byCategory: [],
  byMonth: [],
  recent: [],
};

function isMissingTable(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { code?: string }).code === "42P01"
  );
}

/** Statistiques de revenus pour le dashboard admin. */
export async function getRevenueStats(): Promise<RevenueStats> {
  if (!hasSupabaseConfig()) return EMPTY_STATS;
  const admin = await requireAdmin().catch(() => null);
  if (!admin) return EMPTY_STATS;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("revenue_events")
    .select("id, category, amount_cents, label, occurred_on, notes, created_at")
    .order("occurred_on", { ascending: false })
    .limit(2000);

  if (error) {
    if (!isMissingTable(error)) {
      console.warn("[admin] revenue_events:", error.message);
    }
    return EMPTY_STATS;
  }

  const rows = (data ?? []) as RevenueEvent[];
  const totalCents = rows.reduce((s, r) => s + r.amount_cents, 0);

  const monthKey = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  const now = new Date();
  const currentMonth = monthKey(now);
  const monthCents = rows
    .filter((r) => r.occurred_on.slice(0, 7) === currentMonth)
    .reduce((s, r) => s + r.amount_cents, 0);

  const byCategory = REVENUE_CATEGORIES.map((c) => {
    const cat = rows.filter((r) => r.category === c.id);
    return {
      category: c.id,
      totalCents: cat.reduce((s, r) => s + r.amount_cents, 0),
      count: cat.length,
    };
  });

  const monthNames = [
    "janv.", "févr.", "mars", "avr.", "mai", "juin",
    "juil.", "août", "sept.", "oct.", "nov.", "déc.",
  ];
  const byMonth: RevenueStats["byMonth"] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = monthKey(d);
    byMonth.push({
      month: key,
      label: monthNames[d.getMonth()] ?? "",
      totalCents: rows
        .filter((r) => r.occurred_on.slice(0, 7) === key)
        .reduce((s, r) => s + r.amount_cents, 0),
    });
  }

  return {
    hasTable: true,
    totalCents,
    count: rows.length,
    monthCents,
    byCategory,
    byMonth,
    recent: rows.slice(0, 20),
  };
}

const recordRevenueSchema = z.object({
  category: z.enum(["list", "sell", "signature", "service", "autre"], {
    message: "Catégorie invalide.",
  }),
  amount: z
    .number({ message: "Montant invalide." })
    .positive("Le montant doit être supérieur à 0.")
    .max(10_000_000, "Montant trop élevé."),
  label: z
    .string()
    .trim()
    .min(1, "Le libellé est requis.")
    .max(160, "Libellé trop long (160 caractères max)."),
  occurredOn: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date invalide.")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Date invalide."),
  notes: z.string().trim().max(500, "Note trop longue.").optional(),
});

export interface RevenueFormState {
  ok: boolean;
  error?: string;
}

/**
 * Enregistre un encaissement réel (admin uniquement).
 * Le montant est saisi en dollars, stocké en cents.
 */
export async function recordRevenueEvent(
  _prevState: RevenueFormState,
  formData: FormData,
): Promise<RevenueFormState> {
  if (!hasSupabaseConfig()) {
    return { ok: false, error: "Base de données non configurée." };
  }
  const admin = await requireAdmin().catch(() => null);
  if (!admin) {
    return { ok: false, error: "Action réservée aux administrateurs." };
  }

  const rawAmount = String(formData.get("amount") ?? "").replace(",", ".");
  const parsed = recordRevenueSchema.safeParse({
    category: formData.get("category"),
    amount: rawAmount === "" ? NaN : Number(rawAmount),
    label: formData.get("label"),
    occurredOn: formData.get("occurredOn"),
    notes: formData.get("notes") || undefined,
  });

  if (!parsed.success) {
    return {
      ok: false,
      error:
        parsed.error.issues[0]?.message ?? "Les données fournies sont invalides.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("revenue_events").insert({
    category: parsed.data.category,
    amount_cents: Math.round(parsed.data.amount * 100),
    label: parsed.data.label,
    occurred_on: parsed.data.occurredOn,
    notes: parsed.data.notes ?? null,
    created_by: admin.user?.id ?? null,
  });

  if (error) {
    if (isMissingTable(error)) {
      return {
        ok: false,
        error:
          "La table des revenus n'est pas encore créée — applique la migration 000015.",
      };
    }
    return { ok: false, error: "L'enregistrement a échoué. Réessaie." };
  }

  revalidatePath("/admin/revenus");
  revalidatePath("/admin");
  return { ok: true };
}
