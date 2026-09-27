import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { getCommandCenter } from "@/actions/admin";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "NESTA Admin",
    template: "%s — NESTA Admin",
  },
  description: "Centre de contrôle interne de la plateforme NESTA.",
  robots: { index: false, follow: false },
};

/* ============================================================
 * NESTA — coquille protégée du centre de contrôle interne.
 *
 * SÉCURITÉ : requireAdmin() s'exécute côté serveur AVANT tout
 * rendu. Sans session ADMIN, redirection vers "/" — l'interface
 * n'est jamais exposée à un non-admin, même en connaissant l'URL.
 * Les Server Actions et les policies RLS (is_admin()) ajoutent
 * deux barrières supplémentaires. Le proxy (SITE_MODE) bloque
 * déjà en amont.
 * ============================================================ */

function BrandMark() {
  return (
    <Link href="/admin" className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest font-display text-lg text-white"
      >
        N
      </span>
      <span className="leading-tight">
        <span className="block font-display text-base text-charcoal">NESTA</span>
        <span className="block text-[11px] font-semibold uppercase tracking-widest text-champagne">
          Admin
        </span>
      </span>
    </Link>
  );
}

export default async function GuardedAdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewer = await requireAdmin();

  /* Sur le site d'administration dédié, il n'y a pas de "site"
     vers lequel retourner : on masque le lien. */
  const showBackToSite = process.env.SITE_MODE !== "admin";

  let draftCount = 0;
  let requestCount = 0;
  try {
    const command = await getCommandCenter();
    draftCount = command.find((c) => c.id === "drafts")?.count ?? 0;
    requestCount = command.find((c) => c.id === "requests")?.count ?? 0;
  } catch {
    /* Compteurs indisponibles : la navigation reste fonctionnelle. */
  }

  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      {/* Barre mobile : navigation horizontale. */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <BrandMark />
          <AdminSignOutButton compact />
        </div>
        <nav className="overflow-x-auto px-4 pb-3" aria-label="Administration">
          <AdminMobileNav draftCount={draftCount} requestCount={requestCount} />
        </nav>
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        {/* Sidebar desktop. */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-white px-5 py-6 md:flex">
          <BrandMark />
          <div className="mt-8 flex-1">
            <AdminNav draftCount={draftCount} requestCount={requestCount} />
          </div>
          <div className="border-t border-border pt-4">
            <p className="truncate text-xs text-charcoal/55" title={viewer.user?.email ?? ""}>
              {viewer.user?.email ?? "Admin"}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <AdminSignOutButton />
              {showBackToSite ? (
                <Link
                  href="/"
                  className="text-xs font-medium text-forest underline-offset-4 hover:underline"
                >
                  ← Retour au site
                </Link>
              ) : null}
            </div>
          </div>
        </aside>

        {/* Contenu. */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
