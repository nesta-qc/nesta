import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Button, Card, EmptyState } from "@/components/ui";
import { AddressAutocomplete } from "@/components/passeport/AddressAutocomplete";
import { ExplorerSearch } from "@/components/passeport/ExplorerSearch";
import { ExplorerResults } from "@/components/passeport/ExplorerResults";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import {
  countPropertyProfiles,
  getMarketStats,
  searchExplorerProfiles,
} from "@/actions/property-profiles";

export async function generateMetadata(): Promise<Metadata> {
  return await pageMetadata({
    title: "Passeport Veyla",
    description: "Une fiche honnête pour chaque adresse : caractéristiques, données sourcées, hypothèses affichées. Analyse d'une propriété sans créer de compte.",
    path: "/passeport",
    titleEn: "Veyla Passport",
    descriptionEn: "An honest fact sheet for every address: features, sourced data, stated assumptions. Analyze a property with no account needed.",
  });
}


/* Compteur calculé en live : les profils arrivent via les données
   ouvertes (migration 000013 + seeds). */
export const dynamic = "force-dynamic";

/** Passeport Veyla : fiche adresse → analyse, sans compte. */
export default async function PasseportPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; arrondissement?: string; max?: string }>;
}) {
  const params = await searchParams;
  const lang = await getLang();
  const q = (params.q ?? "").slice(0, 100);
  const arrondissement = (params.arrondissement ?? "").slice(0, 120);
  const max = (params.max ?? "").slice(0, 20);
  const searched = q.trim() !== "" || arrondissement !== "" || max.trim() !== "";

  /* Compteur + liste des arrondissements (cache ~7 ms) + recherche si filtres. */
  const [count, stats, search] = await Promise.all([
    countPropertyProfiles(),
    getMarketStats(),
    searched
      ? searchExplorerProfiles({ query: q, borough: arrondissement, maxValue: max })
      : Promise.resolve({ profiles: [], limited: false }),
  ]);
  const t = dictionaries[lang].passeport;
  const e = t.explorer;
  const boroughs = (stats?.boroughs ?? []).map((b) => b.borough);

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
        Passeport Veyla
      </p>
      <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
        Une fiche claire pour chaque adresse.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal/70">
        Le Passeport Veyla regroupe ce que nous savons d&apos;une propriété,
        avant que vous ne décidiez d&apos;aller plus loin.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-charcoal">Caractéristiques</h2>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
            Type de bien, chambres, salles de bain, superficie, année de
            construction, zonage.
          </p>
        </Card>
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-charcoal">Données sourcées</h2>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
            Chaque chiffre est accompagné de sa source et de sa date.
          </p>
        </Card>
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-charcoal">Hypothèses affichées</h2>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
            Les calculs (coût estimé, potentiel) montrent toujours les
            hypothèses utilisées.
          </p>
        </Card>
      </div>

      <div className="mt-8 rounded-[var(--radius-md)] border border-border bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl text-charcoal">
          Notre règle d&apos;honnêteté
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
          Quand une donnée n&apos;est pas disponible, nous écrivons
          «&nbsp;À confirmer&nbsp;» — nous n&apos;inventons jamais de chiffre.
          Si une donnée manque, c&apos;est indiqué ; si elle est incertaine,
          c&apos;est indiqué aussi.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-xl text-charcoal">Analyser une adresse</h2>
        <p className="mt-2 text-sm text-charcoal/65">
          Saisissez une adresse pour demander l&apos;analyse de la propriété —
          sans créer de compte.
        </p>
        <form action="/passeport/analyse" method="get" className="mt-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="adresse" className="sr-only">
              Adresse de la propriété
            </label>
            <AddressAutocomplete
              id="adresse"
              name="adresse"
              required
              minLength={5}
              placeholder="Ex. : 1234 rue Sainte-Catherine, Montréal"
              wrapperClassName="relative w-full sm:flex-1"
              className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 transition-colors focus:border-forest focus:outline-none"
            />
            <Button type="submit" size="lg">
              Analyser
            </Button>
          </div>
        </form>
      </div>

      {/* ---------- Explorer : profils réels issus des données ouvertes ---------- */}
      <div className="mt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
          Explorer
        </p>
        <h2 className="mt-2 font-display text-2xl text-charcoal sm:text-3xl">
          Explorez des propriétés réelles
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
          Des profils issus des données publiques de la Ville de Montréal —
          ce ne sont pas des annonces à vendre, mais des fiches honnêtes :
          caractéristiques connues, sources nommées, points à confirmer.
        </p>
        <p className="mt-3">
          <Link
            href="/statistiques"
            className="text-sm font-medium text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest"
          >
            {t.voirStats} →
          </Link>
        </p>

        <div className="mt-6">
          {count !== null && count > 0 ? (
            <>
              <p className="text-sm font-medium text-charcoal/70">
                {count === 1
                  ? "1 propriété réelle issue des données ouvertes"
                  : `${count} propriétés réelles issues des données ouvertes`}
              </p>
              <div className="mt-4">
                <ExplorerSearch
                  boroughs={boroughs}
                  initialQuery={q}
                  initialBorough={arrondissement}
                  initialMaxValue={max}
                />
              </div>
              <div className="mt-6">
                <ExplorerResults
                  profiles={search.profiles}
                  limited={search.limited}
                  searched={searched}
                  lang={lang}
                  labels={{
                    resultats: e.resultats,
                    aucunResultatTitre: e.aucunResultatTitre,
                    aucunResultatTexte: e.aucunResultatTexte,
                    limiteNote: e.limiteNote,
                    inviteTitre: e.inviteTitre,
                    inviteTexte: e.inviteTexte,
                    valeurAuRole: e.valeurAuRole,
                    voirPasseport: e.voirPasseport,
                    aConfirmer: e.aConfirmer,
                  }}
                />
              </div>
            </>
          ) : (
            <EmptyState
              title="Les profils arrivent bientôt"
              description="La base des profils issus des données ouvertes de la Ville de Montréal est en cours de préparation. Revenez bientôt pour explorer des propriétés réelles."
            />
          )}
        </div>
      </div>
    </div>
  );
}
