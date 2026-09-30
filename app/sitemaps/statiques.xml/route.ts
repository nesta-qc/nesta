/*
 * Sitemap des pages statiques publiques (1er volet de l'index /sitemap.xml).
 */

const BASE_URL = "https://nesta-drab.vercel.app";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: string;
  priority: number;
}> = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/passeport", changeFrequency: "daily", priority: 0.9 },
  { path: "/tarifs", changeFrequency: "weekly", priority: 0.8 },
  { path: "/investir", changeFrequency: "weekly", priority: 0.8 },
  { path: "/statistiques", changeFrequency: "weekly", priority: 0.8 },
  { path: "/investir/calculateur", changeFrequency: "monthly", priority: 0.7 },
  { path: "/estimation", changeFrequency: "monthly", priority: 0.7 },
  { path: "/pro", changeFrequency: "weekly", priority: 0.7 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.7 },
  { path: "/services", changeFrequency: "monthly", priority: 0.6 },
  { path: "/a-propos", changeFrequency: "monthly", priority: 0.5 },
  { path: "/confidentialite", changeFrequency: "yearly", priority: 0.3 },
  { path: "/conditions", changeFrequency: "yearly", priority: 0.3 },
];

export async function GET(): Promise<Response> {
  if (process.env.SITE_MODE === "admin") {
    return new Response("Sitemap disabled", { status: 404 });
  }
  const now = new Date().toISOString();
  const urls = STATIC_ROUTES.map(
    (r) =>
      `  <url>\n` +
      `    <loc>${BASE_URL}${r.path}</loc>\n` +
      `    <lastmod>${now}</lastmod>\n` +
      `    <changefreq>${r.changeFrequency}</changefreq>\n` +
      `    <priority>${r.priority.toFixed(1)}</priority>\n` +
      `  </url>`
  );
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.join("\n") +
    `\n</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
