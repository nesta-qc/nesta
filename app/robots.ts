import type { MetadataRoute } from "next";

/*
 * Robots, selon le site servi (même code, deux déploiements) :
 * - SITE_MODE=admin : site d'administration dédié → rien à indexer.
 * - sinon : les robots n'ont rien à faire dans le centre de contrôle
 *   (/admin interdit, en plus du noindex des métadonnées du layout).
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_MODE === "admin") {
    return {
      rules: [{ userAgent: "*", disallow: ["/"] }],
    };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"],
      },
    ],
    sitemap: "https://nesta-gabriel56785s-projects.vercel.app/sitemap.xml",
  };
}
