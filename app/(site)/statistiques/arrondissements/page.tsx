import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EmptyState } from "@/components/ui";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { getStatsSnapshot } from "@/lib/statistiques";
import { StatsNav } from "../StatsNav";
import { ArrondissementsClient } from "./ArrondissementsClient";

export async function generateMetadata(): Promise<Metadata> {
  return await pageMetadata({
    title: "Statistiques par arrondissement",
    description:
      "Valeur au rôle médiane et nombre de profils par arrondissement ou secteur du Passeport Veyla, triables. Données ouvertes (Ville de Montréal et MAMH, Données Québec).",
    path: "/statistiques/arrondissements",
    titleEn: "Statistics by borough",
    descriptionEn:
      "Median assessment value and profile counts by Veyla Passport borough or sector, sortable. Open data (City of Montreal and MAMH, Données Québec).",
  });
}


export const dynamic = "force-dynamic";

/** /statistiques/arrondissements : tri croissant/décroissant sur tous les secteurs. */
export default async function ArrondissementsPage() {
  const lang = await getLang();
  const t = dictionaries[lang].statistiques;
  const stats = (await getStatsSnapshot())?.stats ?? null;

  if (!stats) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <EmptyState
          title={t.indisponibleTitre}
          description={t.indisponibleTexte}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
        {t.eyebrow}
      </p>
      <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
        {t.ongletArrondissements}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal/70">
        {t.intro.replace("{n}", String(stats.total))}
      </p>

      <StatsNav
        labels={{
          apercu: t.ongletApercu,
          villes: t.ongletVilles,
          arrondissements: t.ongletArrondissements,
        }}
      />

      <div className="mt-8">
        <ArrondissementsClient
          boroughs={stats.boroughs}
          lang={lang}
          labels={{
            trierPar: t.trierPar,
            triNombreDesc: t.triNombreDesc,
            triNombreAsc: t.triNombreAsc,
            triNom: t.triNom,
            triMedianeDesc: t.triMedianeDesc,
            triMedianeAsc: t.triMedianeAsc,
            profils: t.profils,
            valeurMediane: t.valeurMedianeColonne,
          }}
        />
      </div>
    </div>
  );
}
