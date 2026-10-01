"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface StatsNavLabels {
  apercu: string;
  villes: string;
  arrondissements: string;
}

/** Sous-navigation des pages /statistiques : Aperçu · Villes · Arrondissements. */
export function StatsNav({ labels }: { labels: StatsNavLabels }) {
  const pathname = usePathname();
  const tabs = [
    { href: "/statistiques", label: labels.apercu },
    { href: "/statistiques/villes", label: labels.villes },
    { href: "/statistiques/arrondissements", label: labels.arrondissements },
  ];

  return (
    <nav
      aria-label="Statistiques"
      className="mt-6 inline-flex rounded-full border border-border bg-white p-1"
    >
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-forest text-white"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
