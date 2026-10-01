import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetail, type PropertyDetailData } from "@/components/properties/PropertyDetail";
import { getPublicProperty } from "@/actions/properties";
import { getFavoriteIds } from "@/actions/favorites";
import { getViewerContext } from "@/lib/auth";
import { propertyMediaPublicUrl } from "@/lib/media";
import { resolveVirtualTourUrl } from "@/lib/virtual-tours";
import { propertyIdSchema } from "@/lib/validation";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getPublicProperty(id);
  if (!result) {
    return await pageMetadata({
      title: "Annonce introuvable",
      description: "Cette annonce n'existe pas ou n'est plus publiée sur Nesta.",
      path: "/search",
    });
  }
  const { property } = result;
  return await pageMetadata({
    title: `${property.address}, ${property.city}`,
    description:
      property.description?.slice(0, 160) ??
      `Annonce immobilière à ${property.city}.`,
    path: `/properties/${id}`,
  });
}

/** Page détail d'une annonce (publique si publiée, sinon 404 sauf owner/admin). */
export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (!propertyIdSchema.safeParse(id).success) {
    notFound();
  }

  const result = await getPublicProperty(id);
  if (!result) {
    notFound();
  }
  const { property, media } = result;
  const viewer = await getViewerContext();
  const isOwner = viewer.user?.id === property.owner_id;
  const favoriteIds = await getFavoriteIds();

  const photos = media
    .filter((m) => m.kind === "photo")
    .map((m) => ({ url: propertyMediaPublicUrl(m.storage_path) }));
  const floorPlans = media
    .filter((m) => m.kind === "floor_plan")
    .map((m) => ({ url: propertyMediaPublicUrl(m.storage_path) }));

  /* Visite 3D : revalidée côté serveur à partir des colonnes DB.
     L'onglet n'apparaît que si la visite est réellement affichable. */
  const tour = ((): {
    provider: "matterport" | "external";
    tourId: string | null;
    url: string;
    embedUrl: string | null;
  } | null => {
    if (
      property.virtual_tour_enabled !== true ||
      !property.virtual_tour_url ||
      (property.virtual_tour_provider !== "matterport" &&
        property.virtual_tour_provider !== "external")
    ) {
      return null;
    }
    const resolved = resolveVirtualTourUrl(property.virtual_tour_url);
    if (!resolved || resolved.provider !== property.virtual_tour_provider) {
      return null;
    }
    return {
      provider: resolved.provider,
      tourId: resolved.tourId,
      url: resolved.url,
      embedUrl: resolved.embedUrl,
    };
  })();

  const data: PropertyDetailData = {
    id: property.id,
    address: property.address,
    city: property.city,
    province: property.province,
    asking_price: property.asking_price,
    listing_type: property.listing_type,
    property_type: property.property_type,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    living_area: property.living_area,
    lot_area: property.lot_area,
    year_built: property.year_built,
    municipal_tax: property.municipal_tax,
    school_tax: property.school_tax,
    postal_code: property.postal_code,
    description: property.description,
    created_at: property.created_at,
    status: property.status,
  };

  return (
    <PropertyDetail
      property={data}
      photos={photos}
      floorPlans={floorPlans}
      tour={tour}
      latitude={property.latitude}
      longitude={property.longitude}
      isOwner={isOwner}
      isFavorite={favoriteIds.has(property.id)}
    />
  );
}
