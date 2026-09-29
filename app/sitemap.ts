import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = "https://nesta-drab.vercel.app";

/*
 * Plan du site, selon le site servi (même code, deux déploiements) :
 * - SITE_MODE=admin : site d'administration dédié → aucun URL exposée.
 * - sinon : pages publiques statiques + profils Passeport (table property_profiles).
 */
type StaticRoute = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
};

const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/passeport", changeFrequency: "daily", priority: 0.9 },
  { path: "/tarifs", changeFrequency: "weekly", priority: 0.8 },
  { path: "/investir", changeFrequency: "weekly", priority: 0.8 },
  { path: "/investir/calculateur", changeFrequency: "monthly", priority: 0.7 },
  { path: "/estimation", changeFrequency: "monthly", priority: 0.7 },
  { path: "/pro", changeFrequency: "weekly", priority: 0.7 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.7 },
  { path: "/services", changeFrequency: "monthly", priority: 0.6 },
  { path: "/a-propos", changeFrequency: "monthly", priority: 0.5 },
  { path: "/confidentialite", changeFrequency: "yearly", priority: 0.3 },
  { path: "/conditions", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (process.env.SITE_MODE === "admin") return [];

  const now = new Date();
  const urls: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("property_profiles")
      .select("id, created_at")
      .limit(1000);
    for (const row of (data ?? []) as Array<{
      id: string;
      created_at: string | null;
    }>) {
      urls.push({
        url: `${BASE_URL}/passeport/profil/${row.id}`,
        lastModified: row.created_at ? new Date(row.created_at) : now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  } catch {
    /* Sans base accessible, le sitemap statique reste servi. */
  }

  return urls;
}
