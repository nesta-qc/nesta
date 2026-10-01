import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return await pageMetadata({
    title: "Confidentialité",
    description: "Comment Nesta collecte et protège vos renseignements personnels.",
    path: "/confidentialite",
  });
}


/** Politique de confidentialité — sobre, conforme à l'esprit de la Loi 25. */
export default function ConfidentialitePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
        Légal
      </p>
      <h1 className="mt-4 font-display text-4xl text-charcoal">
        Confidentialité
      </h1>

      <div className="mt-8 flex flex-col gap-6 text-[15px] leading-relaxed text-charcoal/70">
        <section>
          <h2 className="font-display text-xl text-charcoal">Données collectées</h2>
          <p className="mt-2">
            Nesta collecte uniquement les renseignements nécessaires à son
            fonctionnement : votre compte (courriel), vos annonces
            (descriptions, photos, coordonnées publiées), vos favoris et vos
            demandes de services. Aucune donnée n&apos;est revendue.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-charcoal">Hébergement</h2>
          <p className="mt-2">
            Les données sont hébergées au Canada par Supabase (région Canada
            Central), avec chiffrement en transit et au repos.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-charcoal">Vos droits</h2>
          <p className="mt-2">
            Vous pouvez accéder à vos renseignements, les corriger ou demander
            leur suppression en nous écrivant via une demande de service.
            La suppression de votre compte entraîne celle de vos données
            personnelles, sous réserve des obligations légales de conservation.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-charcoal">Témoins</h2>
          <p className="mt-2">
            Nesta utilise uniquement les témoins nécessaires à la connexion et
            à la sécurité. Aucun traçage publicitaire.
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
