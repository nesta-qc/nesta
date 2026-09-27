import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Badge, Container, EmptyState, Button } from "@/components/ui";
import { PropertyForm } from "@/components/properties/PropertyForm";
import { ListingActions } from "@/components/properties/ListingActions";
import { getPropertyForOwner } from "@/actions/properties";
import { getViewerContext } from "@/lib/auth";
import { statusBadgeVariant, statusLabel } from "@/lib/format";
import { propertyIdSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Modifier l'annonce",
  description: "Modifiez votre annonce sur Nesta.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

/** Page de modification — propriétaire (ou admin) uniquement. */
export default async function EditPropertyPage({ params }: PageProps) {
  const { id } = await params;
  if (!propertyIdSchema.safeParse(id).success) {
    notFound();
  }

  const viewer = await getViewerContext();
  if (!viewer.user) {
    redirect("/connexion");
  }

  const result = await getPropertyForOwner(id);
  if ("error" in result) {
    return (
      <Container className="py-12 sm:py-16">
        <EmptyState
          title="Annonce introuvable"
          description="Cette annonce n'existe pas ou vous n'êtes pas autorisé à la modifier."
          action={
            <Link href="/sell/annonces">
              <Button variant="secondary">Voir mes annonces</Button>
            </Link>
          }
        />
      </Container>
    );
  }

  const { property, media } = result.result;

  return (
    <Container className="py-12 sm:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-charcoal sm:text-4xl">
            Modifier l’annonce
          </h1>
          <p className="mt-2 text-sm text-charcoal/60">
            {property.address}, {property.city}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={statusBadgeVariant(property.status)}>
            {statusLabel(property.status)}
          </Badge>
          <Link
            href={`/properties/${property.id}`}
            className="text-sm font-medium text-forest underline-offset-4 hover:underline"
          >
            Voir l’annonce
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-white p-5">
        <p className="text-sm font-medium text-charcoal">Publication</p>
        <div className="mt-3">
          <ListingActions id={property.id} status={property.status} />
        </div>
      </div>

      <div className="mt-8">
        <PropertyForm mode="edit" property={property} media={media} />
      </div>
    </Container>
  );
}
