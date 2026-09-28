"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  badge?: number;
  exact?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

/** Navigation latérale du centre de contrôle (état actif via le path). */
export function AdminNav({
  draftCount,
  requestCount,
  onNavigate,
}: {
  draftCount: number;
  requestCount: number;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const sections: NavSection[] = [
    {
      title: "Vue d’ensemble",
      items: [
        { href: "/admin", label: "Tableau de bord", exact: true },
        { href: "/admin/map", label: "Carte" },
      ],
    },
    {
      title: "Marketplace",
      items: [
        { href: "/admin/properties", label: "Propriétés" },
        { href: "/admin/moderation", label: "Modération", badge: draftCount },
        { href: "/admin/users", label: "Utilisateurs" },
      ],
    },
    {
      title: "Services",
      items: [
        { href: "/admin/pipeline", label: "Pipeline" },
        { href: "/admin/requests", label: "Demandes", badge: requestCount },
      ],
    },
    {
      title: "Finances",
      items: [{ href: "/admin/revenus", label: "Revenus" }],
    },
    {
      title: "Développement",
      items: [{ href: "/admin/prospection", label: "Prospection" }],
    },
    {
      title: "Développement",
      items: [{ href: "/admin/projets/nouveau", label: "Nouveau projet" }],
    },
  ];

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <nav aria-label="Administration" className="space-y-6">
      {sections.map((s) => (
        <div key={s.title}>
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-charcoal/40">
            {s.title}
          </p>
          <ul className="space-y-0.5">
            {s.items.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-forest font-medium text-white"
                        : "text-charcoal/75 hover:bg-sand hover:text-charcoal"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge != null && item.badge > 0 ? (
                      <span
                        className={`inline-flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-champagne/25 text-charcoal"
                        }`}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
