import { createClient } from "@/lib/supabase/server";

/*
 * Index de sitemaps — /sitemap.xml reste l'URL déclarée dans robots.ts.
 * La table property_profiles dépasse les 50 000 URL d'un sitemap unique :
 * les profils sont découpés en sitemaps de 40 000 URL.
 */

const BASE_URL = "https://nesta-drab.vercel.app";
const PER_SITEMAP = 40_000;

/*
 * Le décompte exact (COUNT sur 532k lignes) ne change qu'aux imports :
 * servi depuis le cache 24 h au lieu d'être recalculé à chaque hit.
 */
export const revalidate = 86_400;

export async function GET(): Promise<Response> {
  if (process.env.SITE_MODE === "admin") {
    return new Response("Sitemap disabled", { status: 404 });
  }

  const entries: string[] = [
    `  <sitemap><loc>${BASE_URL}/sitemaps/statiques.xml</loc></sitemap>`,
  ];

  try {
    const supabase = await createClient();
    const { count } = await supabase
      .from("property_profiles")
      .select("id", { count: "exact", head: true });
    const pages = Math.max(1, Math.ceil((count ?? 0) / PER_SITEMAP));
    for (let p = 1; p <= pages; p++) {
      entries.push(
        `  <sitemap><loc>${BASE_URL}/sitemaps/profils-${p}.xml</loc></sitemap>`
      );
    }
  } catch {
    entries.push(
      `  <sitemap><loc>${BASE_URL}/sitemaps/profils-1.xml</loc></sitemap>`
    );
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries.join("\n") + `\n</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
