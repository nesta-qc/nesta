"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VILLES, isVilleSlug, type VilleSlug } from "@/lib/estimation/villes";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { AdresseAutocomplete } from "@/components/estimation/AdresseAutocomplete";

interface Props {
  initialAdresse?: string;
  initialVille?: string;
}

/** Formulaire d'entrée de l'analyse : ville + adresse, soumission en GET. */
export function AnalyseStartForm({ initialAdresse = "", initialVille = "montreal" }: Props) {
  const { lang } = useLanguage();
  const t = dictionaries[lang].analyse;
  const router = useRouter();
  const [adresse, setAdresse] = useState(initialAdresse);
  const [ville, setVille] = useState<VilleSlug>(
    isVilleSlug(initialVille) ? initialVille : "montreal",
  );

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const a = adresse.trim();
    if (!a) return;
    router.push(`/passeport/analyse?adresse=${encodeURIComponent(a)}&ville=${encodeURIComponent(ville)}`);
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 rounded-2xl border border-charcoal/10 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-charcoal/70">{t.champAdresse}</span>
          <AdresseAutocomplete
            id="analyse-adresse"
            value={adresse}
            onChange={setAdresse}
            ville={ville}
            lang={lang}
            placeholder={t.champAdressePlaceholder}
            className="w-full rounded-xl border border-charcoal/15 bg-ivory px-4 py-3 text-[15px] text-charcoal outline-none placeholder:text-charcoal/35 focus:border-forest"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-charcoal/70">{t.champVille}</span>
          <select
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            className="w-full rounded-xl border border-charcoal/15 bg-ivory px-4 py-3 text-[15px] text-charcoal outline-none focus:border-forest"
          >
            {VILLES.map((v) => (
              <option key={v.slug} value={v.slug}>
                {v.nom}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        type="submit"
        disabled={!adresse.trim()}
        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-champagne px-7 py-3.5 text-[15px] font-semibold text-charcoal transition-colors duration-200 hover:bg-champagne/85 disabled:opacity-40 sm:w-auto"
      >
        {t.boutonAnalyser}
      </button>
    </form>
  );
}
