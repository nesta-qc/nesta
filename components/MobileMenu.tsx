"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { dictionaries } from "@/lib/i18n/dictionaries";

type NavDict = (typeof dictionaries)["fr"]["nav"];

function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/**
 * Menu hamburger mobile : remplace la barre d'onglets du bas.
 * Contient TOUTE la navigation (dont Statistiques), en tiroir latéral.
 */
export function MobileMenu({
  t,
  connected,
}: {
  t: NavDict;
  connected: boolean;
}) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/passeport", label: t.passeport, highlight: true },
    { href: "/search", label: t.acheter, highlight: false },
    { href: "/sell", label: t.vendre, highlight: false },
    { href: "/investir", label: t.investir, highlight: false },
    { href: "/statistiques", label: t.statistiques, highlight: false },
    { href: "/projects", label: t.projets, highlight: false },
    { href: "/services", label: t.services, highlight: false },
    { href: "/tarifs", label: t.tarifs, highlight: false },
    { href: "/favoris", label: t.favoris, highlight: false },
    {
      href: connected ? "/profil" : "/connexion",
      label: connected ? t.profil : t.connexion,
      highlight: false,
    },
  ];

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.menu}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal/80 transition-colors hover:bg-white active:text-forest"
      >
        <MenuIcon />
      </button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={t.navMobileAria}>
          {/* Fond assombri */}
          <button
            type="button"
            aria-label={t.fermerMenu}
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-charcoal/40 backdrop-blur-[2px]"
          />
          {/* Tiroir */}
          <aside className="absolute inset-y-0 right-0 flex w-[82%] max-w-xs flex-col bg-ivory shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-border/70 px-5">
              <span className="font-display text-lg text-charcoal">{t.menu}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.fermerMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal/80 transition-colors hover:bg-white active:text-forest"
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label={t.navMobileAria}>
              <ul className="flex flex-col gap-1">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={
                        link.highlight
                          ? "flex items-center rounded-xl border border-forest/30 bg-white/70 px-4 py-3 text-[16px] font-semibold text-forest"
                          : "flex items-center rounded-xl px-4 py-3 text-[16px] font-medium text-charcoal/80 transition-colors hover:bg-white active:text-forest"
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {!connected && (
              <div className="border-t border-border/70 p-4">
                <Link
                  href="/inscription"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-forest px-5 py-3 text-[15px] font-medium text-white transition-colors active:bg-forest-deep"
                >
                  {t.inscription}
                </Link>
              </div>
            )}
            <div className="h-[env(safe-area-inset-bottom)]" aria-hidden="true" />
          </aside>
        </div>
      )}
    </div>
  );
}
