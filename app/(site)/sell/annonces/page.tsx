import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Badge, Button, Card, EmptyState } from "@/components/ui";
import { ListingActions } from "@/components/properties/ListingActions";
import { getMyProperties, getVirtualTourViewCounts } from "@/actions/properties";
import { getViewerContext } from "@/lib/auth";
import { propertyMediaPublicUrl } from "@/lib/media";
import {
  formatPrice,
  statusBadgeVariant,
  statusLabel,
} from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mes annonces",
  description: "Gérez vos annonces publiées sur Nesta.",
};

/**
 * Tableau de bord vendeur : une propriété dominante par carte,
 * quelques métriques réelles, navigation simple. Pas d'analytics complexe.
 */
export default async function MyListingsPage() {
  const viewer = await getViewerContext();

  if (!viewer.user) {
    redirect("/connexion");
  }
  if (!viewer.hasListingRole) {
    redirect("/sell");
  }

  const { properties, error } = await getMyProperties();
  const tourViews = await getVirtualTourViewCounts(properties.map((p) => p.id));

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            Tableau de bord
          </p>
          <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
            Mes annonces
          </h1>
          <p className="mt-2 text-sm text-charcoal/55">
            {properties.length === 0
              ? "Vous n'avez pas encore d'annonce."
              : `${properties.length} annonce${properties.length > 1 ? "s" : ""} au total.`}
          </p>
        </div>
        <Link href="/sell/nouveau">
          <Button>Publier une annonce</Button>
        </Link>
      </div>

      {error ? (
        <p role="alert" className="mt-8 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      {properties.length === 0 && !error ? (
        <div className="mt-8">
          <EmptyState
            title="Aucune annonce"
            description="Créez votre première annonce : décrivez votre propriété, ajoutez des photos, puis publiez-la."
            action={
              <Link href="/sell/nouveau">
                <Button>Créer une annonce</Button>
              </Link>
            }
          />
        </div>
      ) : null}

      {properties.length > 0 ? (
        <div className="mt-8 flex flex-col gap-5">
          {properties.map((p) => {
            const views = tourViews[p.id] ?? 0;
            return (
              <Card key={p.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {/* Photo dominante. */}
                  <Link
                    href={`/properties/${p.id}`}
                    className="relative block shrink-0 bg-sand sm:w-72"
                    aria-label={`Voir ${p.address}`}
                  >
                    {p.coverPath ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={propertyMediaPublicUrl(p.coverPath)}
                        alt={`${p.address}, ${p.city}`}
                        loading="lazy"
                        className="aspect-[16/10] h-full w-full object-cover sm:aspect-auto sm:min-h-[220px]"
                      />
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center sm:aspect-auto sm:min-h-[220px]">
                        <span className="font-display text-lg text-charcoal/30">Nesta</span>
                      </div>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={statusBadgeVariant(p.status)}>
                        {statusLabel(p.status)}
                      </Badge>
                      {p.virtual_tour_enabled ? (
                        <Badge variant="gold">Visite 3D</Badge>
                      ) : null}
                    </div>
                    <p className="mt-3 font-display text-2xl text-forest">
                      {formatPrice(p.asking_price)}
                    </p>
                    <p className="mt-1 text-[15px] font-medium text-charcoal">
                      {p.address}
                    </p>
                    <p className="text-sm text-charcoal/55">{p.city}</p>

                    {/* Métriques réelles uniquement. */}
                    <dl className="mt-5 flex gap-8">
                      <div>
                        <dt className="text-xs text-charcoal/50">Visites 3D</dt>
                        <dd className="mt-0.5 font-display text-xl text-charcoal">
                          {views}
                        </dd>
                      </div>
                    </dl>

                    {/* Navigation simple. */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-sm">
                      <Link
                        href={`/properties/${p.id}`}
                        className="font-medium text-forest underline-offset-4 hover:underline"
                      >
                        Annonce
                      </Link>
                      <Link
                        href={`/properties/${p.id}/modifier`}
                        className="font-medium text-charcoal/65 underline-offset-4 hover:text-forest hover:underline"
                      >
                        Photos et détails
                      </Link>
                      <span className="ml-auto">
                        <ListingActions id={p.id} status={p.status} />
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
