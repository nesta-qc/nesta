import Link from "next/link";
import { EmptyState } from "@/components/ui";
import type { ExplorerProfile } from "@/actions/property-profiles";
import { formatPrice } from "@/lib/format";

interface ExplorerResultsLabels {
  resultats: string;
  aucunResultatTitre: string;
  aucunResultatTexte: string;
  limiteNote: string;
  inviteTitre: string;
  inviteTexte: string;
  valeurAuRole: string;
  voirPasseport: string;
  aConfirmer: string;
}

/**
 * Résultats de l'explorateur Passeport, rendus côté serveur.
 * Sans recherche : invite à lancer une recherche (aucun chargement massif).
 */
export function ExplorerResults({
  profiles,
  limited,
  searched,
  lang,
  labels,
}: {
  profiles: ExplorerProfile[];
  limited: boolean;
  searched: boolean;
  lang: "fr" | "en";
  labels: ExplorerResultsLabels;
}) {
  if (!searched) {
    return (
      <EmptyState title={labels.inviteTitre} description={labels.inviteTexte} />
    );
  }

  return (
    <div>
      <p className="text-sm font-medium text-charcoal/70" aria-live="polite">
        {labels.resultats.replace("{n}", String(profiles.length))}
        {limited ? ` — ${labels.limiteNote}` : ""}
      </p>

      <div className="mt-4">
        {profiles.length === 0 ? (
          <EmptyState
            title={labels.aucunResultatTitre}
            description={labels.aucunResultatTexte}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
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
                  {labels.valeurAuRole}
                </p>
                <p className="mt-0.5 text-base font-medium text-charcoal">
                  {profile.assessment_total != null ? (
                    formatPrice(profile.assessment_total, lang)
                  ) : (
                    <span className="italic text-charcoal/45">
                      {labels.aConfirmer}
                    </span>
                  )}
                </p>
                <p className="mt-3 text-sm font-medium text-forest">
                  {labels.voirPasseport}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
