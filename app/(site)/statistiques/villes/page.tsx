import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EmptyState } from "@/components/ui";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { getMarketStats } from "@/actions/property-profiles";
import { StatsNav } from "../StatsNav";
import { VillesClient } from "./VillesClient";

export async function generateMetadata(): Promise<Metadata> {
  return await pageMetadata({
    title: "Statistiques par ville",
    description:
      "Répartition des profils du Passeport Veyla par municipalité : recherche, tri croissant/décroissant, valeur au rôle médiane. Données ouvertes (Ville de Montréal et MAMH, Données Québec).",
    path: "/statistiques/villes",
    titleEn: "Statistics by city",
    descriptionEn:
      "Veyla Passport profiles by municipality: search, ascending/descending sort, median assessment value. Open data (City of Montreal and MAMH, Données Québec).",
  });
}


export const dynamic = "force-dynamic";

/** /statistiques/villes : recherche + tri sur les 150+ municipalités. */
export default async function VillesPage() {
  const lang = await getLang();
  const t = dictionaries[lang].statistiques;
  const stats = await getMarketStats();

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
        {t.ongletVilles}
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
        <VillesClient
          cities={stats.cities}
          lang={lang}
          labels={{
            rechercher: t.rechercherVille,
            trierPar: t.trierPar,
            triNombreDesc: t.triNombreDesc,
            triNombreAsc: t.triNombreAsc,
            triNom: t.triNom,
            triMedianeDesc: t.triMedianeDesc,
            triMedianeAsc: t.triMedianeAsc,
            aucunResultat: t.aucunResultat,
            resultats: t.resultatsVilles,
            profils: t.profils,
            valeurMediane: t.valeurMedianeColonne,
            detailsSecteurs: t.detailsSecteurs,
          }}
        />
      </div>
    </div>
  );
}
