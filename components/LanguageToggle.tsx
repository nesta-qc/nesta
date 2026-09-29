"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { LANGS, type Lang } from "@/lib/i18n/dictionaries";

/**
 * Sélecteur de langue FR | EN — pastille segmentée sobre,
 * utilisable dans l'en-tête (desktop et mobile).
 */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.nav.langueAria}
      className={`inline-flex items-center rounded-full border border-border bg-white/70 p-0.5 text-xs font-semibold ${className}`}
    >
      {LANGS.map((l: Lang) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors duration-200 ${
            lang === l
              ? "bg-forest text-white"
              : "text-charcoal/55 hover:text-forest"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
