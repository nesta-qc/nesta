import { createClient } from "@/lib/supabase/server";

/*
 * Sitemaps des profils Passeport — un fichier par tranche de 40 000 URL
 * (limite d'un sitemap : 50 000 URL / 50 Mo).
 * URL : /sitemaps/profils-1.xml, /sitemaps/profils-2.xml, …
 */

const BASE_URL = "https://nesta-drab.vercel.app";
const PER_SITEMAP = 40_000;

/*
 * 40 000 URL assemblées en ~40 requêtes paginées (~22 s) : les robots
 * n'ont pas besoin de fraîcheur à la minute — cache 24 h.
 */
export const revalidate = 86_400;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ fichier: string }> }
): Promise<Response> {
  if (process.env.SITE_MODE === "admin") {
    return new Response("Sitemap disabled", { status: 404 });
  }

  const { fichier } = await params;
  const match = /^profils-(\d+)\.xml$/.exec(fichier ?? "");
  const page = match ? parseInt(match[1], 10) : NaN;
  if (!Number.isFinite(page) || page < 1) {
    return new Response("Not found", { status: 404 });
  }

  const now = new Date().toISOString();
  const urls: string[] = [];

  try {
    const supabase = await createClient();
    const start = (page - 1) * PER_SITEMAP;
    const PAGE = 1000;
    for (let offset = start; ; offset += PAGE) {
      if (offset >= start + PER_SITEMAP) break;
      const end = Math.min(offset + PAGE - 1, start + PER_SITEMAP - 1);
      const { data } = await supabase
        .from("property_profiles")
        .select("id, created_at")
        .order("id")
        .range(offset, end);
      const rows = (data ?? []) as Array<{
        id: string;
        created_at: string | null;
      }>;
      for (const row of rows) {
        const lastmod = row.created_at
          ? new Date(row.created_at).toISOString()
          : now;
        urls.push(
          `  <url>\n` +
            `    <loc>${BASE_URL}/passeport/profil/${row.id}</loc>\n` +
            `    <lastmod>${lastmod}</lastmod>\n` +
            `    <changefreq>weekly</changefreq>\n` +
            `    <priority>0.7</priority>\n` +
            `  </url>`
        );
      }
      if (rows.length < PAGE) break;
    }
  } catch {
    /* Sans base accessible, sitemap vide plutôt qu'erreur. */
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.join("\n") +
    `\n</urlset>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
