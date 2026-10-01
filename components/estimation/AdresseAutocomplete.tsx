"use client";

import { useEffect, useRef, useState } from "react";
import { dictionaries, type Lang } from "@/lib/i18n/dictionaries";
import type { VilleSlug } from "@/lib/estimation/villes";

/** "1000 AV DU MONT-ROYAL E" → "1000 av. Du Mont-royal Est" / "1000 Du Mont-Royal Ave E". */
export function prettyKey(key: string, lang: Lang): string {
  const [base, apt] = key.split("|APT ");
  const en = lang === "en";
  let pretty = base
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bR\b/, en ? "St" : "rue")
    .replace(/\bAv\b/, en ? "Ave" : "av.")
    .replace(/\bBoul\b/, en ? "Blvd" : "boul.")
    .replace(/\bCh\b/, en ? "Ch" : "ch.")
    .replace(/\bPl\b/, en ? "Pl" : "pl.");
  const orientations: Record<string, string> = en
    ? { E: "E", O: "W", N: "N", S: "S" }
    : {
        E: dictionaries.fr.estimation.orientationEst,
        O: dictionaries.fr.estimation.orientationOuest,
        N: dictionaries.fr.estimation.orientationNord,
        S: dictionaries.fr.estimation.orientationSud,
      };
  pretty = pretty.replace(
    / ([EONS])$/,
    (m, o: string) => ` ${orientations[o] ?? o}`,
  );
  if (!apt) return pretty;
  return en ? `${pretty}, apt. ${apt}` : `${pretty}, app. ${apt}`;
}

interface Props {
  id: string;
  /** Nom du champ pour la soumission d'un formulaire (GET). */
  name?: string;
  value: string;
  onChange: (v: string) => void;
  /** Ville dont l'index du rôle sert aux suggestions. */
  ville: VilleSlug;
  lang: Lang;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

/**
 * Champ d'adresse avec suggestions pendant la frappe.
 * Source : index d'adresses du rôle d'évaluation foncière
 * (GET /api/estimation/suggest). Navigation au clavier incluse
 * (flèches / Entrée / Échap.).
 */
export function AdresseAutocomplete({
  id,
  name,
  value,
  onChange,
  ville,
  lang,
  placeholder,
  className,
  required,
}: Props) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [ouvert, setOuvert] = useState(false);
  const [actif, setActif] = useState(-1);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // Évite de relancer une recherche juste après avoir choisi une suggestion.
  const selectionFaite = useRef(false);

  // Autocomplétion débouncée sur l'index du rôle d'évaluation.
  useEffect(() => {
    if (selectionFaite.current) {
      selectionFaite.current = false;
      return;
    }
    if (value.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/estimation/suggest?ville=${ville}&q=${encodeURIComponent(value)}`,
        );
        const data = (await res.json()) as string[];
        setSuggestions(Array.isArray(data) ? data : []);
        setActif(-1);
        setOuvert(true);
      } catch {
        setSuggestions([]);
      }
    }, 250);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [value, ville]);

  // Fermer les suggestions au clic hors du champ.
  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(ev.target as Node)) {
        setOuvert(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function choisir(s: string) {
    selectionFaite.current = true;
    onChange(prettyKey(s, lang));
    setSuggestions([]);
    setOuvert(false);
  }

  function onKeyDown(ev: React.KeyboardEvent) {
    if (!ouvert || suggestions.length === 0) return;
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      setActif((a) => (a + 1) % suggestions.length);
    } else if (ev.key === "ArrowUp") {
      ev.preventDefault();
      setActif((a) => (a - 1 + suggestions.length) % suggestions.length);
    } else if (ev.key === "Enter" && actif >= 0) {
      ev.preventDefault();
      choisir(suggestions[actif]);
    } else if (ev.key === "Escape") {
      setOuvert(false);
    }
  }

  return (
    <div ref={boxRef} className="relative">
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={(ev) => onChange(ev.target.value)}
        onFocus={() => {
          if (suggestions.length > 0) setOuvert(true);
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={className}
        required={required}
        autoComplete="off"
        role="combobox"
        aria-expanded={ouvert}
        aria-controls={`${id}-suggestions`}
        aria-autocomplete="list"
      />
      {ouvert && suggestions.length > 0 && (
        <ul
          id={`${id}-suggestions`}
          role="listbox"
          className="nesta-fade-in absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-border bg-white shadow-lg"
        >
          {suggestions.map((s, i) => (
            <li key={s} role="option" aria-selected={i === actif}>
              <button
                type="button"
                className={`w-full px-4 py-2.5 text-left text-sm text-charcoal hover:bg-cream ${
                  i === actif ? "bg-cream" : ""
                }`}
                onClick={() => choisir(s)}
              >
                {prettyKey(s, lang)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
