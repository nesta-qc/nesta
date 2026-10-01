"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Select } from "@/components/ui";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface ExplorerSearchProps {
  boroughs: string[];
  initialQuery: string;
  initialBorough: string;
  initialMaxValue: string;
}

/**
 * Formulaire de recherche de l'explorateur Passeport.
 * La recherche s'exécute côté serveur via les paramètres d'URL
 * (?q=, ?arrondissement=, ?max=) — aucun balayage des 532k profils.
 */
export function ExplorerSearch({
  boroughs,
  initialQuery,
  initialBorough,
  initialMaxValue,
}: ExplorerSearchProps) {
  const { t } = useLanguage();
  const e = t.passeport.explorer;
  const router = useRouter();

  const [query, setQuery] = useState(initialQuery);
  const [borough, setBorough] = useState(initialBorough);
  const [maxValue, setMaxValue] = useState(initialMaxValue);

  const hasFilters =
    query.trim() !== "" || borough !== "" || maxValue.trim() !== "";

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (borough) params.set("arrondissement", borough);
    if (maxValue.trim()) params.set("max", maxValue.trim());
    const qs = params.toString();
    router.push(qs ? `/passeport?${qs}` : "/passeport");
  }

  function reset() {
    setQuery("");
    setBorough("");
    setMaxValue("");
    router.push("/passeport");
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label={e.rechercheAria}
      className="grid gap-3 rounded-2xl border border-border bg-white p-4 sm:grid-cols-[1fr_220px_200px_auto_auto]"
    >
      <Input
        type="search"
        value={query}
        onChange={(ev) => setQuery(ev.target.value)}
        placeholder={e.recherchePlaceholder}
        aria-label={e.rechercheAria}
      />
      <Select
        value={borough}
        onChange={(ev) => setBorough(ev.target.value)}
        aria-label={e.arrondissement}
      >
        <option value="">{e.tousArrondissements}</option>
        {boroughs.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </Select>
      <Input
        inputMode="numeric"
        value={maxValue}
        onChange={(ev) => setMaxValue(ev.target.value.replace(/\D/g, ""))}
        placeholder={e.valeurMax}
        aria-label={e.valeurMax}
      />
      <Button type="submit" size="lg">
        {e.rechercher}
      </Button>
      {hasFilters ? (
        <Button type="button" variant="secondary" onClick={reset}>
          {e.reinitialiser}
        </Button>
      ) : null}
    </form>
  );
}
