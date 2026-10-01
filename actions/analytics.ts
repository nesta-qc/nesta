"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { estLimite, ipAction } from "@/lib/rate-limit";

/* ============================================================
 * NESTA — compteur de visites (récap mensuel de Gabriel).
 * Enregistre une ligne par page vue, sans IP ni identifiant.
 * Les robots évidents sont exclus ; les chiffres restent
 * approximatifs et présentés comme tels.
 * ============================================================ */

const BOT_RE = /bot|crawl|spider|slurp|mediapartners|baidu|yandex|sogou|semrush|ahrefs|mj12|dotbot|petal/i;
const MAX_PATH = 500;

export async function trackPageView(path: string): Promise<void> {
  try {
    if (!hasSupabaseConfig()) return;
    if (typeof path !== "string" || !path.startsWith("/")) return;
    const cleanPath = path.slice(0, MAX_PATH);

    const h = await headers();
    const ua = h.get("user-agent") ?? "";
    if (BOT_RE.test(ua)) return;

    /* Anti-abus : 100 pages vues / minute / IP. */
    if (estLimite(`pageview:${await ipAction()}`, 100, 60_000).limite) return;

    const referer = h.get("referer");
    const referrer =
      referer && referer.length <= 1000 ? referer : null;

    const supabase = await createClient();
    await supabase.from("page_views").insert({ path: cleanPath, referrer });
  } catch {
    /* Le tracking ne doit jamais casser la navigation. */
  }
}
