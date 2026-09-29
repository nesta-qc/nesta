import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button, EmptyState } from "@/components/ui";
import { PropertyCard } from "@/components/ui";
import { getFavoriteProperties } from "@/actions/favorites";
import { getViewerContext } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Mes favoris",
  description: "Retrouvez les propriétés que vous avez sauvegardées.",
  path: "/favoris",
  noIndex: true,
});

/** Favoris réels de l'utilisateur connecté. */
export default async function FavoritesPage() {
  const viewer = await getViewerContext();
  if (!viewer.user) {
    redirect("/connexion?redirect=/favoris");
  }

  const favorites = (await getFavoriteProperties()) as {
    id: string;
    asking_price: number;
    address: string;
    city: string;
    property_type: string | null;
    bedrooms: number | null;
    bathrooms: number | null;
    living_area: number | null;
    virtual_tour_enabled: boolean;
  }[];

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
        Espace personnel
      </p>
      <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
        Mes favoris
      </h1>
      <p className="mt-2 text-sm text-charcoal/55">
        {favorites.length === 0
          ? "Aucune propriété sauvegardée pour le moment."
          : `${favorites.length} propriété${favorites.length > 1 ? "s" : ""} sauvegardée${favorites.length > 1 ? "s" : ""}.`}
      </p>

      {favorites.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Aucun favori"
            description="Touchez le cœur sur une annonce pour la retrouver ici."
            action={
              <Link href="/search">
                <Button>Explorer les propriétés</Button>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((p) => (
            <PropertyCard
              key={p.id}
              property={{
                id: p.id,
                asking_price: p.asking_price,
                address: p.address,
                city: p.city,
                property_type: p.property_type,
                bedrooms: p.bedrooms,
                bathrooms: p.bathrooms,
                living_area: p.living_area,
                coverPath: null,
                virtual_tour_enabled: p.virtual_tour_enabled,
                isFavorite: true,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
