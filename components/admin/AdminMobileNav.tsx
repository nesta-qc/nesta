"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Navigation horizontale du centre de contrôle (mobile). */
export function AdminMobileNav({
  draftCount,
  requestCount,
}: {
  draftCount: number;
  requestCount: number;
}) {
  const pathname = usePathname();
  const items = [
    { href: "/admin", label: "Tableau de bord", exact: true },
    { href: "/admin/map", label: "Carte" },
    { href: "/admin/properties", label: "Propriétés" },
    { href: "/admin/moderation", label: "Modération", badge: draftCount },
    { href: "/admin/users", label: "Utilisateurs" },
    { href: "/admin/requests", label: "Demandes", badge: requestCount },
  ];

  return (
    <div className="flex gap-1.5">
      {items.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium ${
              active
                ? "border-forest bg-forest text-white"
                : "border-border bg-white text-charcoal/75"
            }`}
          >
            {item.label}
            {item.badge != null && item.badge > 0 ? (
              <span
                className={`inline-flex min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-semibold ${
                  active ? "bg-white/20 text-white" : "bg-champagne/30 text-charcoal"
                }`}
              >
                {item.badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}
