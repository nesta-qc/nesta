"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, EmptyState, Input, Select } from "@/components/ui";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { ExplorerProfile } from "@/actions/property-profiles";
import { formatPrice } from "@/lib/format";

/**
 * Explorateur des profils Passeport : recherche textuelle instantanée
 * (adresse, arrondissement, ville) + filtre par arrondissement +
 * filtre par valeur au rôle maximale. Tout est calculé côté client
 * à partir des profils chargés par la page.
 */
export function ProfileExplorer({ profiles }: { profiles: ExplorerProfile[] }) {
  const { t } = useLanguage();
  const e = t.passeport.explorer;

  const [query, setQuery] = useState("");
  const [borough, setBorough] = useState("");
  const [maxValue, setMaxValue] = useState("");

  const boroughs = useMemo(() => {
    const set = new Set<string>();
    for (const p of profiles) {
      if (p.borough) set.add(p.borough);
    }
    return [...set].sort((a, b) => a.localeCompare(b, "fr"));
  }, [profiles]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const max = maxValue.trim() === "" ? null : Number(maxValue);
    return profiles.filter((p) => {
      if (borough && p.borough !== borough) return false;
      if (
        max !== null &&
        Number.isFinite(max) &&
        (p.assessment_total === null || p.assessment_total > max)
      )
        return false;
      if (q) {
        const haystack =
          `${p.address} ${p.borough ?? ""} ${p.city}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [profiles, query, borough, maxValue]);

  const hasFilters =
    query.trim() !== "" || borough !== "" || maxValue.trim() !== "";

  function reset() {
    setQuery("");
    setBorough("");
    setMaxValue("");
  }

  return (
    <div>
      <div
        role="search"
        aria-label={e.rechercheAria}
        className="grid gap-3 rounded-2xl border border-border bg-white p-4 sm:grid-cols-[1fr_220px_200px_auto]"
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
        {hasFilters ? (
          <Button type="button" variant="secondary" onClick={reset}>
            {e.reinitialiser}
          </Button>
        ) : null}
      </div>

      <p className="mt-4 text-sm font-medium text-charcoal/70" aria-live="polite">
        {e.resultats.replace("{n}", String(results.length))}
      </p>

      <div className="mt-4">
        {results.length === 0 ? (
          <EmptyState
            title={e.aucunResultatTitre}
            description={e.aucunResultatTexte}
            action={
              hasFilters ? (
                <Button type="button" variant="secondary" onClick={reset}>
                  {e.reinitialiser}
                </Button>
              ) : undefined
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((profile) => (
              <Link
                key={profile.id}
                href={`/passeport/profil/${profile.id}`}
                className="group rounded-2xl border border-border bg-white p-5 transition-colors duration-200 hover:border-forest/40 hover:bg-cream"
              >
                <p className="text-[15px] font-semibold text-charcoal group-hover:text-forest">
                  {profile.address}
                </p>
                {profile.borough ? (
                  <p className="mt-1 text-sm text-charcoal/55">{profile.borough}</p>
                ) : null}
                <p className="mt-3 text-xs font-medium uppercase tracking-wider text-charcoal/45">
                  Valeur au rôle
                </p>
                <p className="mt-0.5 text-base font-medium text-charcoal">
                  {profile.assessment_total != null ? (
                    formatPrice(profile.assessment_total)
                  ) : (
                    <span className="italic text-charcoal/45">À confirmer</span>
                  )}
                </p>
                <p className="mt-3 text-sm font-medium text-forest">
                  Voir le Passeport →
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
