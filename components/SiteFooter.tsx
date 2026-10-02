import Link from "next/link";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";

/** Pied de page institutionnel Groupe Veyla. */
export async function SiteFooter() {
  const t = dictionaries[await getLang()].footer;
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-1">
            <p className="font-display text-2xl text-forest">Veyla</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-charcoal/55">
              {t.tagline}
            </p>
          </div>
          {t.colonnes.map((col) => (
            <nav key={col.titre} aria-label={col.titre}>
              <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/45">
                {col.titre}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.liens.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-charcoal/70 transition-colors duration-200 hover:text-forest"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-charcoal/45">{t.droits}</p>
          <p className="text-xs text-charcoal/45">{t.avertissement}</p>
        </div>
      </div>
    </footer>
  );
}
