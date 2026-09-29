import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Conditions d'utilisation",
  description: "Les règles d'utilisation de la plateforme Nesta.",
  path: "/conditions",
});

/** Conditions d'utilisation — claires, sans jargon inutile. */
export default function ConditionsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
        Légal
      </p>
      <h1 className="mt-4 font-display text-4xl text-charcoal">
        Conditions d&apos;utilisation
      </h1>

      <div className="mt-8 flex flex-col gap-6 text-[15px] leading-relaxed text-charcoal/70">
        <section>
          <h2 className="font-display text-xl text-charcoal">Le rôle de Nesta</h2>
          <p className="mt-2">
            Nesta est un outil technologique : elle diffuse vos annonces et
            facilite la mise en relation. Nesta n&apos;est pas courtier
            immobilier, ne négocie pas à votre place et ne transmet pas
            d&apos;offres d&apos;achat.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-charcoal">Vos annonces</h2>
          <p className="mt-2">
            Vous êtes responsable de l&apos;exactitude des informations
            publiées (prix, superficies, taxes, photos). Toute annonce
            trompeuse ou frauduleuse sera retirée.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-charcoal">Comptes</h2>
          <p className="mt-2">
            Un compte par personne. Vous êtes responsable de la confidentialité
            de votre mot de passe. Les rôles professionnels (courtier,
            évaluateur) sont vérifiés manuellement : ils ne peuvent pas
            s&apos;attribuer un rôle eux-mêmes.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-charcoal">Estimations</h2>
          <p className="mt-2">
            Les estimations de coût affichées sur les annonces sont
            indicatives : elles ne constituent ni une approbation
            hypothécaire ni un avis professionnel.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-charcoal">Résiliation</h2>
          <p className="mt-2">
            Vous pouvez supprimer votre compte à tout moment. Nesta peut
            suspendre un compte en cas d&apos;utilisation abusive ou
            frauduleuse de la plateforme.
          </p>
        </section>
        <p className="text-xs text-charcoal/45">
          Dernière mise à jour : septembre 2026. Ce texte est informatif et ne
          constitue pas un avis juridique.
        </p>
      </div>
    </div>
  );
}
