"use client";

import { AddressAutocomplete } from "@/components/passeport/AddressAutocomplete";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * Action principale du hero : « Analyser une adresse ».
 * Soumet en GET vers /passeport/analyse?adresse=… en saisie libre
 * (l'adresse est encodée automatiquement par le navigateur).
 * Pendant la frappe, l'autocomplétion propose des adresses réelles
 * (données ouvertes) ; sélectionner une suggestion ouvre le
 * Passeport du profil correspondant.
 */
export function HeroAddressAnalyzer() {
  const { t } = useLanguage();
  const a = t.accueil;
  return (
    <form
      method="get"
      action="/passeport/analyse"
      role="search"
      aria-label={a.analyseTitre}
      className="mt-8 w-full max-w-3xl rounded-2xl bg-white/95 p-2 shadow-[0_24px_60px_-12px_rgb(10_31_25/0.45)] backdrop-blur-sm"
    >
      <label
        htmlFor="hero-adresse"
        className="block px-4 pt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-forest"
      >
        {a.analyseTitre}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <AddressAutocomplete
          id="hero-adresse"
          name="adresse"
          required
          placeholder={a.analysePlaceholder}
          wrapperClassName="relative w-full flex-1"
          className="w-full rounded-xl bg-transparent px-4 py-3.5 text-[15px] font-medium text-charcoal placeholder:text-charcoal/35 focus:outline-none focus:ring-2 focus:ring-forest/30"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-forest-deep"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 21l-4.35-4.35" />
            <circle cx="11" cy="11" r="7" />
            <path d="M11 8v6M8 11h6" />
          </svg>
          {a.analyseBouton}
        </button>
      </div>
      <p className="px-4 pb-2 pt-1 text-xs leading-relaxed text-charcoal/45">
        {a.analyseNote}
      </p>
    </form>
  );
}
