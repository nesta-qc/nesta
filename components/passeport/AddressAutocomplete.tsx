"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { AddressSuggestion } from "@/actions/property-profiles";

/* ============================================================
 * NESTA — Autocomplétion d'adresses réelles (données ouvertes).
 *
 * Rend un <input> standard (name transmis tel quel) : en saisie
 * libre, le formulaire parent se comporte exactement comme avant.
 * Pendant la frappe (debounce 250 ms), un menu déroulant propose
 * des profils réels ; sélectionner une suggestion navigue vers le
 * Passeport du profil (/passeport/profil/[id]).
 *
 * Clavier : ↓/↑ navigue, Entrée sélectionne la suggestion active
 * (ou laisse le formulaire se soumettre en saisie libre), Échap
 * ferme. Si l'API échoue, aucune suggestion — le champ reste
 * utilisable en saisie libre (dégradation gracieuse).
 * ============================================================ */

const DEBOUNCE_MS = 250;
const MIN_CHARS = 2;

interface AddressAutocompleteProps {
  id?: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  autoComplete?: string;
  /** Classes appliquées à l'<input>. */
  className?: string;
  /** Classes appliquées au conteneur positionné. */
  wrapperClassName?: string;
}

export function AddressAutocomplete({
  id,
  name,
  defaultValue = "",
  placeholder,
  required,
  minLength,
  maxLength,
  autoComplete = "off",
  className = "",
  wrapperClassName = "relative w-full",
}: AddressAutocompleteProps) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [failed, setFailed] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const blurTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listboxId = `${id ?? name}-suggestions`;

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
      abortRef.current?.abort();
    };
  }, []);

  async function fetchSuggestions(query: string) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch(
        `/api/adresses?q=${encodeURIComponent(query)}`,
        { signal: controller.signal },
      );
      if (!res.ok) throw new Error("api");
      const data = (await res.json()) as AddressSuggestion[];
      setSuggestions(Array.isArray(data) ? data : []);
      setFailed(false);
      setOpen(true);
      setActiveIndex(-1);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      /* Dégradation gracieuse : pas de suggestions, champ utilisable. */
      setFailed(true);
      setSuggestions([]);
      setOpen(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setValue(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (next.trim().length < MIN_CHARS) {
      setSuggestions([]);
      setOpen(false);
      setActiveIndex(-1);
      return;
    }
    debounceRef.current = setTimeout(() => fetchSuggestions(next.trim()), DEBOUNCE_MS);
  }

  function selectSuggestion(s: AddressSuggestion) {
    setValue(s.address);
    setOpen(false);
    setSuggestions([]);
    router.push(`/passeport/profil/${s.id}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!open || suggestions.length === 0) return;
      e.preventDefault();
      setActiveIndex((prev) => {
        const next =
          e.key === "ArrowDown"
            ? (prev + 1) % suggestions.length
            : (prev - 1 + suggestions.length) % suggestions.length;
        return next;
      });
    } else if (e.key === "Enter") {
      /* Suggestion active → navigue vers le Passeport du profil.
         Sinon : on laisse le formulaire parent se soumettre (saisie libre). */
      if (open && activeIndex >= 0 && suggestions[activeIndex]) {
        e.preventDefault();
        selectSuggestion(suggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  function handleBlur() {
    /* Délai : laisse le clic souris (onMouseDown) sélectionner avant. */
    blurTimerRef.current = setTimeout(() => setOpen(false), 120);
  }

  function handleFocus() {
    if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
    if (suggestions.length > 0 && !failed) setOpen(true);
  }

  const showEmptyHint =
    open &&
    !failed &&
    suggestions.length === 0 &&
    value.trim().length >= MIN_CHARS;

  return (
    <div className={wrapperClassName}>
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={
          activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined
        }
        aria-autocomplete="list"
        className={className}
      />
      {open ? (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Adresses suggérées"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-white shadow-[0_18px_50px_-12px_rgb(10_31_25/0.35)]"
        >
          {suggestions.length > 0 ? (
            <ul className="max-h-72 overflow-y-auto py-1">
              {suggestions.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    id={`${listboxId}-${i}`}
                    role="option"
                    aria-selected={i === activeIndex}
                    onMouseDown={(e) => {
                      /* Avant le blur : sélectionne la suggestion. */
                      e.preventDefault();
                      selectSuggestion(s);
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`flex w-full items-baseline justify-between gap-3 px-4 py-2.5 text-left transition-colors ${
                      i === activeIndex ? "bg-forest/[0.08]" : "bg-white"
                    }`}
                  >
                    <span className="text-[15px] font-medium text-charcoal">
                      {s.address}
                    </span>
                    {s.borough ? (
                      <span className="shrink-0 text-xs text-charcoal/50">
                        {s.borough}
                      </span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          ) : showEmptyHint ? (
            <p className="px-4 py-3 text-sm text-charcoal/55">
              Aucune adresse connue — appuyez sur Entrée pour analyser
              «&nbsp;{value.trim()}&nbsp;».
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export type { AddressSuggestion };
