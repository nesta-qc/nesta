"use client";

import { useMemo, useState } from "react";
import type { CityStat } from "@/actions/property-profiles";
import { Card } from "@/components/ui";
import { formatPrice } from "@/lib/format";
import { BoroughRow } from "../BoroughRow";

export interface VillesLabels {
  rechercher: string;
  trierPar: string;
  triNombreDesc: string;
  triNombreAsc: string;
  triNom: string;
  triMedianeDesc: string;
  triMedianeAsc: string;
  aucunResultat: string;
  resultats: string;
  profils: string;
  valeurMediane: string;
  detailsSecteurs: string;
}

type TriVille = "nombre-desc" | "nombre-asc" | "nom" | "mediane-desc" | "mediane-asc";

/** Normalisation insensible aux accents pour la recherche. */
function norm(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Liste des villes : recherche instantanée + tri croissant/décroissant.
 * Les secteurs de chaque ville sont repliés par défaut (<details>) pour
 * garder le DOM léger.
 */
export function VillesClient({
  cities,
  lang,
  labels,
}: {
  cities: CityStat[];
  lang: "fr" | "en";
  labels: VillesLabels;
}) {
  const [recherche, setRecherche] = useState("");
  const [tri, setTri] = useState<TriVille>("nombre-desc");

  const villes = useMemo(() => {
    const q = norm(recherche.trim());
    const filtre = q
      ? cities.filter((c) => norm(c.city).includes(q))
      : cities;
    const trie = [...filtre];
    switch (tri) {
      case "nombre-asc":
        trie.sort((a, b) => a.count - b.count);
        break;
      case "nom":
        trie.sort((a, b) => a.city.localeCompare(b.city, lang));
        break;
      case "mediane-desc":
        trie.sort(
          (a, b) => (b.medianAssessment ?? -1) - (a.medianAssessment ?? -1),
        );
        break;
      case "mediane-asc":
        trie.sort(
          (a, b) => (a.medianAssessment ?? -1) - (b.medianAssessment ?? -1),
        );
        break;
      case "nombre-desc":
      default:
        trie.sort((a, b) => b.count - a.count);
        break;
    }
    return trie;
  }, [cities, recherche, tri, lang]);

  const maxMedian = useMemo(
    () =>
      Math.max(0, ...villes.map((c) => c.medianAssessment ?? 0)),
    [villes],
  );

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">{labels.rechercher}</span>
          <input
            type="search"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder={labels.rechercher}
            className="w-full rounded-full border border-border bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-forest focus:outline-none"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-charcoal/70">
          <span className="whitespace-nowrap">{labels.trierPar}</span>
          <select
            value={tri}
            onChange={(e) => setTri(e.target.value as TriVille)}
            className="rounded-full border border-border bg-white px-3 py-2.5 text-sm text-charcoal focus:border-forest focus:outline-none"
          >
            <option value="nombre-desc">{labels.triNombreDesc}</option>
            <option value="nombre-asc">{labels.triNombreAsc}</option>
            <option value="nom">{labels.triNom}</option>
            <option value="mediane-desc">{labels.triMedianeDesc}</option>
            <option value="mediane-asc">{labels.triMedianeAsc}</option>
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-charcoal/55" role="status">
        {labels.resultats.replace("{n}", String(villes.length))}
      </p>

      {villes.length === 0 ? (
        <p className="mt-6 text-sm text-charcoal/60">{labels.aucunResultat}</p>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {villes.map((c) => (
            <Card key={c.city} className="p-5">
              <details>
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-3">
                  <span className="font-display text-lg text-charcoal">
                    {c.city}
                  </span>
                  <span className="text-sm text-charcoal/60">
                    {c.count} {labels.profils} ·{" "}
                    <span className="font-semibold text-forest">
                      {c.medianAssessment != null
                        ? formatPrice(c.medianAssessment, lang)
                        : "—"}
                    </span>
                  </span>
                </summary>
                <p className="mt-1 text-xs text-charcoal/45">
                  {labels.detailsSecteurs} ({c.boroughs.length})
                </p>
                <ul className="mt-4 flex flex-col gap-5 border-t border-border/60 pt-4">
                  {c.boroughs.map((b) => (
                    <BoroughRow
                      key={`${c.city}||${b.borough}`}
                      borough={b}
                      maxMedian={maxMedian}
                      profilsLabel={labels.profils}
                      valeurMedianeLabel={labels.valeurMediane}
                    />
                  ))}
                </ul>
              </details>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
