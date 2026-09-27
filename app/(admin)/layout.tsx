import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "NESTA Admin",
    template: "%s — NESTA Admin",
  },
  description: "Centre de contrôle interne de la plateforme NESTA.",
  robots: { index: false, follow: false },
};

/*
 * Coquille minimale du groupe (admin) : aucun habillage, aucune
 * garde ici. La garde + le shell (sidebar) vivent dans le groupe
 * (guarded) ; la page /admin/login reste publique (c'est la porte
 * d'entrée du site d'administration dédié).
 */
export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
