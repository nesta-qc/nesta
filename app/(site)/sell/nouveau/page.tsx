import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Container, EmptyState, Button } from "@/components/ui";
import { PropertyForm } from "@/components/properties/PropertyForm";
import { getViewerContext } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Nouvelle annonce",
  description: "Créez votre annonce de vente ou de location sur Nesta.",
  path: "/sell/nouveau",
  noIndex: true,
});

/** Page de création d'annonce — rôle vendeur requis. */
export default async function NewListingPage() {
  const viewer = await getViewerContext();

  if (!viewer.user) {
    redirect("/connexion");
  }

  if (!viewer.hasListingRole) {
    return (
      <Container className="py-12 sm:py-16">
        <EmptyState
          title="Compte vendeur requis"
          description="Crée ton compte vendeur via l'onboarding pour publier une annonce sur Nesta."
          action={
            <Link href="/sell">
              <Button variant="secondary">Retour à l’espace vendeur</Button>
            </Link>
          }
        />
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-3xl text-charcoal sm:text-4xl">
        Nouvelle annonce
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal/60">
        Décrivez votre propriété avec précision : des informations complètes
        inspirent confiance aux acheteurs. Vous pourrez ajouter des photos
        juste après la création.
      </p>
      <div className="mt-8">
        <PropertyForm mode="create" />
      </div>
    </Container>
  );
}
