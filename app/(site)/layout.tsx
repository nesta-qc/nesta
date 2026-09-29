import { Suspense } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

/* Données structurées : l'organisation et le site (SEO, graphe de connaissance). */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organisation`,
      name: "Nesta",
      url: SITE_URL,
      logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      description:
        "Plateforme immobilière québécoise : recherchez, vendez et gérez vos projets immobiliers en toute transparence.",
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Québec",
        addressCountry: "CA",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#site`,
      url: SITE_URL,
      name: "Nesta",
      publisher: { "@id": `${SITE_URL}/#organisation` },
      inLanguage: "fr-CA",
    },
  ],
};

/* Habillage du site public NESTA (groupe de routes (site)). */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <SiteHeader />

      {/* Espace sous la barre d'onglets mobile. */}
      <main className="flex flex-1 flex-col pb-20 md:pb-0">{children}</main>

      <SiteFooter />

      {/* Compteur de visites (récap mensuel) — n'affiche rien. */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </div>
  );
}
