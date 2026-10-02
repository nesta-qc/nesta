import type { ReactNode } from "react";
import Link from "next/link";
import { Badge, Card } from "@/components/ui";

/* ============================================================
 * VEYLA — Passeport : blocs de présentation partagés entre le
 * Passeport des profils publics (/passeport/profil/[id]) et les
 * autres surfaces Passeport. Aucun chiffre n'est inventé ici :
 * chaque bloc affiche « À confirmer » quand la donnée manque.
 * ============================================================ */

/** Carte de section du Passeport : titre + intro + contenu. */
export function PassportSectionCard({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <Card className="p-6 sm:p-8">
      <h2 className="font-display text-xl text-charcoal">{title}</h2>
      {intro ? (
        <p className="mt-2 text-sm leading-relaxed text-charcoal/55">{intro}</p>
      ) : null}
      <div className="mt-5">{children}</div>
    </Card>
  );
}

export interface SpecItem {
  label: string;
  value: string | null;
}

/** Grille de caractéristiques : valeur réelle ou « À confirmer ». */
export function SpecsGrid({ specs }: { specs: SpecItem[] }) {
  return (
    <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border border-border bg-border sm:grid-cols-2">
      {specs.map((s) => (
        <div key={s.label} className="bg-white px-5 py-4">
          <dt className="text-xs text-charcoal/50">{s.label}</dt>
          <dd className="mt-1 text-[15px] font-medium text-charcoal">
            {s.value ?? (
              <span className="font-normal italic text-charcoal/45">
                À confirmer
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Puces des informations manquantes (« X — à confirmer »). */
export function MissingChips({ fields }: { fields: string[] }) {
  if (fields.length === 0) {
    return (
      <p className="text-[15px] text-charcoal/60">
        Tous les champs usuels sont renseignés pour ce profil.
      </p>
    );
  }
  return (
    <ul className="flex flex-wrap gap-2">
      {fields.map((field) => (
        <li key={field}>
          <Badge className="normal-case tracking-normal">
            {field} — à confirmer
          </Badge>
        </li>
      ))}
    </ul>
  );
}

/**
 * Avertissement légal permanent : aucune possibilité de
 * construction, d'agrandissement ou de changement d'usage n'est
 * présentée comme une autorisation.
 */
export function PotentialDisclaimer() {
  return (
    <p className="mt-5 text-xs leading-relaxed text-charcoal/45">
      Aucune possibilité de construction, d&apos;agrandissement ou de
      changement d&apos;usage n&apos;est présentée ici comme une
      autorisation : seul le règlement municipal applicable, vérifié
      auprès de la ville, fait foi.
    </p>
  );
}

/** Appel à l'action final : demander l'analyse de la propriété. */
export function ProfileAnalysisCta({ address }: { address: string }) {
  return (
    <Card className="border-forest/20 bg-forest p-6 text-white sm:p-8">
      <h2 className="font-display text-xl">Aller plus loin</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/75">
        Recevez une analyse de cette propriété préparée par un
        professionnel — basée sur les données réelles ci-dessus, sans
        engagement.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={`/passeport/analyse?adresse=${encodeURIComponent(address)}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-8 py-3.5 text-base font-medium text-forest transition-colors duration-200 hover:bg-white"
        >
          Demander l&apos;analyse de cette propriété
        </Link>
        <Link
          href="/services/demande"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:border-white/60"
        >
          Demander une estimation
        </Link>
      </div>
    </Card>
  );
}
