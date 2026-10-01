"use client";

import { useMemo, useState } from "react";
import type { BoroughStat } from "@/actions/property-profiles";
import { Card } from "@/components/ui";
import { BoroughRow } from "../BoroughRow";

export interface ArrondissementsLabels {
  trierPar: string;
  triNombreDesc: string;
  triNombreAsc: string;
  triNom: string;
  triMedianeDesc: string;
  triMedianeAsc: string;
  profils: string;
  valeurMediane: string;
}

type TriBorough = "nombre-desc" | "nombre-asc" | "nom" | "mediane-desc" | "mediane-asc";

/** Liste complète des arrondissements/secteurs, triable. */
export function ArrondissementsClient({
  boroughs,
  lang,
  labels,
}: {
  boroughs: BoroughStat[];
  lang: "fr" | "en";
  labels: ArrondissementsLabels;
}) {
  const [tri, setTri] = useState<TriBorough>("nombre-desc");

  const tries = useMemo(() => {
    const liste = [...boroughs];
    switch (tri) {
      case "nombre-asc":
        liste.sort((a, b) => a.count - b.count);
        break;
      case "nom":
        liste.sort((a, b) => a.borough.localeCompare(b.borough, lang));
        break;
      case "mediane-desc":
        liste.sort(
          (a, b) => (b.medianAssessment ?? -1) - (a.medianAssessment ?? -1),
        );
        break;
      case "mediane-asc":
        liste.sort(
          (a, b) => (a.medianAssessment ?? -1) - (b.medianAssessment ?? -1),
        );
        break;
      case "nombre-desc":
      default:
        liste.sort((a, b) => b.count - a.count);
        break;
    }
    return liste;
  }, [boroughs, tri, lang]);

  const maxMedian = useMemo(
    () => Math.max(0, ...tries.map((b) => b.medianAssessment ?? 0)),
    [tries],
  );

  return (
    <div>
      <div className="flex sm:justify-end">
        <label className="flex items-center gap-2 text-sm text-charcoal/70">
          <span className="whitespace-nowrap">{labels.trierPar}</span>
          <select
            value={tri}
            onChange={(e) => setTri(e.target.value as TriBorough)}
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

      <Card className="mt-4 p-5 sm:p-6">
        <ul className="flex flex-col gap-5">
          {tries.map((b) => (
            <BoroughRow
              key={b.borough}
              borough={b}
              maxMedian={maxMedian}
              profilsLabel={labels.profils}
              valeurMedianeLabel={labels.valeurMediane}
            />
          ))}
        </ul>
      </Card>
    </div>
  );
}
