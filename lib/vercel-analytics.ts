"use server";

/* ============================================================
 * NESTA — Trafic Vercel Analytics dans le dashboard admin.
 * Interroge l'API REST Vercel côté serveur uniquement :
 *  - visits/count     → totaux (visitors, pageviews)
 *  - visits/aggregate → tendance par jour, top routes
 * Le jeton ne quitte jamais le serveur.
 * En cas d'échec ou de données vides : null → le dashboard
 * affiche « Non disponible » (jamais de chiffre inventé).
 * ============================================================ */

const API_BASE = "https://api.vercel.com/v1/query/web-analytics";

export interface VercelTrafficDay {
  date: string;
  visitors: number;
  pageviews: number;
}

export interface VercelTrafficPage {
  path: string;
  visitors: number;
  pageviews: number;
}

export interface VercelTrafficSummary {
  visitors: number;
  pageviews: number;
  daily: VercelTrafficDay[];
  topPages: VercelTrafficPage[];
}

function creds(): { token: string; projectId: string; teamId?: string } | null {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!token || !projectId) return null;
  return {
    token,
    projectId,
    teamId: process.env.VERCEL_TEAM_ID || undefined,
  };
}

async function vercelGet(
  path: string,
  params: Record<string, string>,
): Promise<unknown> {
  const c = creds();
  if (!c) return null;
  const search = new URLSearchParams({
    ...params,
    projectId: c.projectId,
    ...(c.teamId ? { teamId: c.teamId } : {}),
  });
  const res = await fetch(`${API_BASE}${path}?${search.toString()}`, {
    headers: { Authorization: `Bearer ${c.token}` },
    next: { revalidate: 3600 }, // rafraîchi au plus 1×/heure
  });
  if (!res.ok) return null;
  return res.json();
}

function num(row: Record<string, unknown>, patterns: RegExp[]): number {
  for (const [key, value] of Object.entries(row)) {
    if (patterns.some((p) => p.test(key)) && typeof value === "number") {
      return value;
    }
  }
  return 0;
}

function dayLabel(row: Record<string, unknown>): string {
  for (const key of ["start", "date", "day", "key", "name"]) {
    const v = row[key];
    if (typeof v === "string" && v.length > 0) return v.slice(0, 10);
  }
  for (const key of ["timestamp", "start", "time"]) {
    const v = row[key];
    if (typeof v === "number" && Number.isFinite(v) && v > 0) {
      return new Date(v).toISOString().slice(0, 10);
    }
  }
  return "";
}

function routeLabel(row: Record<string, unknown>): string {
  for (const key of ["route", "path", "key", "name"]) {
    const v = row[key];
    if (typeof v === "string" && v.length > 0) return v;
  }
  return "/";
}

/** Trafic des `days` derniers jours depuis Vercel Analytics. */
export async function getVercelTraffic(
  days = 30,
): Promise<VercelTrafficSummary | null> {
  if (!creds()) return null;

  const until = new Date();
  const since = new Date(until.getTime() - days * 24 * 3600 * 1000);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const range = { since: fmt(since), until: fmt(until) };

  try {
    const [countJson, dayJson, routeJson] = await Promise.all([
      vercelGet("/visits/count", range),
      vercelGet("/visits/aggregate", { ...range, by: "day" }),
      vercelGet("/visits/aggregate", { ...range, by: "route", limit: "10" }),
    ]);

    const countData = (countJson as { data?: Record<string, unknown> } | null)
      ?.data;
    const visitors =
      countData && typeof countData.visitors === "number"
        ? countData.visitors
        : 0;
    const pageviews =
      countData && typeof countData.pageviews === "number"
        ? countData.pageviews
        : 0;

    const dayRows = (
      (dayJson as { data?: unknown } | null)?.data as
        | Record<string, unknown>[]
        | undefined
    ) ?? [];
    const daily: VercelTrafficDay[] = (Array.isArray(dayRows) ? dayRows : [])
      .map((row) => ({
        date: dayLabel(row),
        visitors: num(row, [/visitor/i]),
        pageviews: num(row, [/pageview/i]),
      }))
      .filter((d) => d.date >= range.since && d.date <= range.until);

    const routeRows = (
      (routeJson as { data?: unknown } | null)?.data as
        | Record<string, unknown>[]
        | undefined
    ) ?? [];
    const topPages: VercelTrafficPage[] = (Array.isArray(routeRows)
      ? routeRows
      : []
    )
      .map((row) => ({
        path: routeLabel(row),
        visitors: num(row, [/visitor/i]),
        pageviews: num(row, [/pageview/i]),
      }))
      .sort((a, b) => b.pageviews - a.pageviews)
      .slice(0, 5);

    // Données vides = « Non disponible », jamais des zéros trompeurs.
    if (visitors === 0 && pageviews === 0 && topPages.length === 0) {
      return null;
    }

    return { visitors, pageviews, daily, topPages };
  } catch {
    return null;
  }
}
