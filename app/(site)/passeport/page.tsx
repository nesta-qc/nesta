import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Button, Card, EmptyState } from "@/components/ui";
import { AddressAutocomplete } from "@/components/passeport/AddressAutocomplete";
import {
  countPropertyProfiles,
  listPropertyProfiles,
} from "@/actions/property-profiles";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = pageMetadata({
  title: "Passeport Nesta",
  description: "Une fiche honnête pour chaque adresse : caractéristiques, données sourcées, hypothèses affichées. Analyse d'une propriété sans créer de compte.",
  path: "/passeport",
});

/* Compteur calculé en live : les profils arrivent via les données
   ouvertes (migration 000013 + seeds). */
export const dynamic = "force-dynamic";

const EXPLORER_LIMIT = 12;

/** Passeport Nesta : fiche adresse → analyse, sans compte. */
export default async function PasseportPage() {
  const [count, profiles] = await Promise.all([
    countPropertyProfiles(),
    listPropertyProfiles(EXPLORER_LIMIT),
  ]);

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
        Passeport Nesta
      </p>
      <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
        Une fiche claire pour chaque adresse.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal/70">
        Le Passeport Nesta regroupe ce que nous savons d&apos;une propriété,
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

        <div className="mt-6">
          {count !== null && count > 0 ? (
            <>
              <p className="text-sm font-medium text-charcoal/70">
                {count === 1
                  ? "1 propriété réelle issue des données ouvertes"
                  : `${count} propriétés réelles issues des données ouvertes`}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {profiles.map((profile) => (
                  <Link
                    key={profile.id}
                    href={`/passeport/profil/${profile.id}`}
                    className="group rounded-2xl border border-border bg-white p-5 transition-colors duration-200 hover:border-forest/40 hover:bg-cream"
                  >
                    <p className="text-[15px] font-semibold text-charcoal group-hover:text-forest">
                      {profile.address}
                    </p>
                    {profile.borough ? (
                      <p className="mt-1 text-sm text-charcoal/55">
                        {profile.borough}
                      </p>
                    ) : null}
                    <p className="mt-3 text-xs font-medium uppercase tracking-wider text-charcoal/45">
                      Valeur au rôle
                    </p>
                    <p className="mt-0.5 text-base font-medium text-charcoal">
                      {profile.assessment_total != null ? (
                        formatPrice(profile.assessment_total)
                      ) : (
                        <span className="italic text-charcoal/45">
                          À confirmer
                        </span>
                      )}
                    </p>
                    <p className="mt-3 text-sm font-medium text-forest">
                      Voir le Passeport →
                    </p>
                  </Link>
                ))}
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
