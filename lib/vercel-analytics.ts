"use server";

/* ============================================================
 * NESTA — Trafic Vercel Analytics dans le dashboard admin.
 * Interroge l'API REST Vercel (agrégats web-analytics) côté
 * serveur uniquement. Le jeton ne quitte jamais le serveur.
 * En cas d'échec : null → le dashboard affiche « Non disponible »
 * (jamais de chiffre inventé).
 * ============================================================ */

const AGGREGATE_URL =
  "https://api.vercel.com/v1/query/web-analytics/visits/aggregate";

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

function pickNumber(row: Record<string, unknown>, patterns: RegExp[]): number {
  for (const [key, value] of Object.entries(row)) {
    if (patterns.some((p) => p.test(key)) && typeof value === "number") {
      return value;
    }
  }
  return 0;
}

function pickLabel(row: Record<string, unknown>): string {
  for (const key of ["path", "route", "key", "name", "start", "date"]) {
    const v = row[key];
    if (typeof v === "string" && v.length > 0) return v;
  }
  return "";
}

async function queryAggregate(
  params: Record<string, string>,
): Promise<Record<string, unknown>[]> {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!token || !projectId) return [];

  const teamId = process.env.VERCEL_TEAM_ID;
  const search = new URLSearchParams({
    ...params,
    projectId,
    ...(teamId ? { teamId } : {}),
  });

  const res = await fetch(`${AGGREGATE_URL}?${search.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 }, // rafraîchi au plus 1×/heure
  });
  if (!res.ok) return [];
  const json = (await res.json()) as { data?: unknown };
  return Array.isArray(json.data)
    ? (json.data as Record<string, unknown>[])
    : [];
}

/** Trafic des `days` derniers jours depuis Vercel Analytics. */
export async function getVercelTraffic(
  days = 30,
): Promise<VercelTrafficSummary | null> {
  if (!process.env.VERCEL_ANALYTICS_TOKEN || !process.env.VERCEL_PROJECT_ID) {
    return null;
  }

  const until = new Date();
  const since = new Date(until.getTime() - days * 24 * 3600 * 1000);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  try {
    const [byDay, byRoute] = await Promise.all([
      queryAggregate({ since: fmt(since), until: fmt(until), by: "day" }),
      queryAggregate({ since: fmt(since), until: fmt(until), by: "route" }),
    ]);
    if (byDay.length === 0 && byRoute.length === 0) return null;

    const daily: VercelTrafficDay[] = byDay.map((row) => ({
      date: pickLabel(row),
      visitors: pickNumber(row, [/visitor/i]),
      pageviews: pickNumber(row, [/pageview/i, /^views?$/i]),
    }));
    const topPages: VercelTrafficPage[] = byRoute
      .map((row) => ({
        path: pickLabel(row) || "/",
        visitors: pickNumber(row, [/visitor/i]),
        pageviews: pickNumber(row, [/pageview/i, /^views?$/i]),
      }))
      .sort((a, b) => b.pageviews - a.pageviews)
      .slice(0, 5);

    const visitors = daily.reduce((s, d) => s + d.visitors, 0);
    const pageviews = daily.reduce((s, d) => s + d.pageviews, 0);

    return { visitors, pageviews, daily, topPages };
  } catch {
    return null;
  }
}
