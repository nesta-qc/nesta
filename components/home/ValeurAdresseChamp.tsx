"use client";

import { useState } from "react";
import { VILLES, type VilleSlug } from "@/lib/estimation/villes";
import { AdresseAutocomplete } from "@/components/estimation/AdresseAutocomplete";
import type { Lang } from "@/lib/i18n/dictionaries";

interface Props {
  lang: Lang;
  placeholderAdresse: string;
  ariaAdresse: string;
  ariaVille: string;
}

/**
 * Barre d'adresse de la section « Combien vaut votre propriété ? »
 * (accueil) : sélecteur de ville + champ d'adresse avec suggestions
 * pendant la frappe. Soumission en GET vers /estimation (champs nommés).
 */
export function ValeurAdresseChamp({
  lang,
  placeholderAdresse,
  ariaAdresse,
  ariaVille,
}: Props) {
  const [ville, setVille] = useState<VilleSlug>("montreal");
  const [adresse, setAdresse] = useState("");

  return (
    <>
      <label htmlFor="valeur-ville" className="sr-only">
        {ariaVille}
      </label>
      <select
        id="valeur-ville"
        name="ville"
        value={ville}
        onChange={(e) => setVille(e.target.value as VilleSlug)}
        aria-label={ariaVille}
        className="shrink-0 rounded-full border border-charcoal/10 bg-white px-5 py-4 text-[15px] text-charcoal shadow-sm outline-none focus:ring-2 focus:ring-forest/30 sm:w-44"
      >
        {VILLES.map((v) => (
          <option key={v.slug} value={v.slug}>
            {v.nom}
          </option>
        ))}
      </select>
      <label htmlFor="valeur-adresse" className="sr-only">
        {ariaAdresse}
      </label>
      <div className="w-full flex-1">
        <AdresseAutocomplete
          id="valeur-adresse"
          name="adresse"
          value={adresse}
          onChange={setAdresse}
          ville={ville}
          lang={lang}
          placeholder={placeholderAdresse}
          required
          className="w-full rounded-full border border-charcoal/10 bg-white px-6 py-4 text-[15px] text-charcoal shadow-sm placeholder:text-charcoal/35 focus:outline-none focus:ring-2 focus:ring-forest/30"
        />
      </div>
    </>
  );
}
