import { Suspense } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";

/* Habillage du site public NESTA (groupe de routes (site)). */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
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
