import type { Metadata } from "next";
import { getDeveloperOptions } from "@/actions/developments";
import { NewDevelopmentForm } from "@/components/admin/NewDevelopmentForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nouveau projet",
  description:
    "Créer un projet de développement (pilote promoteurs) avec ses unités.",
};

/**
 * Admin — création d'un projet promoteur : la garde ADMIN est
 * assurée par le layout (guarded). Après création, la page affiche
 * un récapitulatif (paramètre ?cree=<id>).
 */
export default async function AdminNewDevelopmentPage({
  searchParams,
}: {
  searchParams: Promise<{ cree?: string }>;
}) {
  const params = await searchParams;
  const createdId =
    typeof params.cree === "string" && params.cree.length > 0
      ? params.cree
      : null;
  const developers = await getDeveloperOptions();

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
        VEYLA Admin
      </p>
      <h1 className="mt-1 font-display text-3xl text-charcoal">
        Nouveau projet
      </h1>
      <p className="mt-1 max-w-2xl text-sm text-charcoal/60">
        Publier un projet d&apos;un promoteur partenaire (phase pilote) :
        informations du projet, contact ventes et unités — saisie manuelle
        ou import CSV.
      </p>

      {developers.length === 0 ? (
        <div className="mt-6 max-w-4xl rounded-2xl border border-amber-300 bg-amber-50 p-5">
          <p className="text-sm font-medium text-amber-900">
            Aucun compte promoteur trouvé.
          </p>
          <p className="mt-1 text-sm text-amber-800">
            Attribuez d&apos;abord le rôle « Développeur » au compte du
            promoteur dans <span className="font-medium">Utilisateurs</span>,
            puis revenez ici.
          </p>
        </div>
      ) : null}

      <NewDevelopmentForm developers={developers} createdId={createdId} />
    </div>
  );
}
