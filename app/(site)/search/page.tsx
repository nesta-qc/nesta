import type { Metadata } from "next";
import {
  searchPublishedProperties,
  type SearchFilters as Filters,
} from "@/actions/properties";
import { getFavoriteIds } from "@/actions/favorites";
import { SEARCH_PAGE_SIZE } from "@/lib/validation";
import { SearchView, type SearchViewData } from "@/components/search/SearchView";
import type { FilterValues } from "@/components/search/SearchFilters";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rechercher",
  description: "Recherchez une propriété à vendre ou à louer au Québec.",
};

interface RawSearchParams {
  ville?: string;
  transaction?: string;
  prix_min?: string;
  prix_max?: string;
  type?: string;
  chambres?: string;
  sdb?: string;
  superficie?: string;
  visite_3d?: string;
  page?: string;
}

interface PageProps {
  searchParams: Promise<RawSearchParams>;
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function toPositiveNumber(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

function buildHref(params: RawSearchParams, page: number): string {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    const val = first(v as string | string[] | undefined);
    if (k === "page" || !val) continue;
    q.set(k, val);
  }
  if (page > 1) q.set("page", String(page));
  const qs = q.toString();
  return qs ? `/search?${qs}` : "/search";
}

function isNew(createdAt: string | null): boolean {
  if (!createdAt) return false;
  const d = new Date(createdAt);
  if (Number.isNaN(d.getTime())) return false;
  return Date.now() - d.getTime() < 14 * 24 * 60 * 60 * 1000;
}

/** Recherche : filtres réels, carte dominante, 100 % DB réelle. */
export default async function SearchPage({ searchParams }: PageProps) {
  const raw = await searchParams;

  const page = Math.max(1, toPositiveNumber(first(raw.page)) ?? 1);
  const filters: Filters = {
    city: first(raw.ville)?.trim() || undefined,
    listingType: first(raw.transaction) === "rent" ? "rent" : "sale",
    minPrice: toPositiveNumber(first(raw.prix_min)),
    maxPrice: toPositiveNumber(first(raw.prix_max)),
    propertyType: first(raw.type) || undefined,
    minBedrooms: (() => {
      const n = toPositiveNumber(first(raw.chambres));
      return n !== undefined ? Math.floor(n) : undefined;
    })(),
    minBathrooms: (() => {
      const n = toPositiveNumber(first(raw.sdb));
      return n !== undefined ? Math.floor(n) : undefined;
    })(),
    minLivingArea: toPositiveNumber(first(raw.superficie)),
    hasVirtualTour: first(raw.visite_3d) === "1" || undefined,
    page,
  };
  const hasActiveFilters =
    filters.city !== undefined ||
    filters.listingType === "rent" ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.propertyType !== undefined ||
    filters.minBedrooms !== undefined ||
    filters.minBathrooms !== undefined ||
    filters.minLivingArea !== undefined ||
    filters.hasVirtualTour !== undefined;

  const [result, favoriteIds] = await Promise.all([
    searchPublishedProperties(filters),
    getFavoriteIds(),
  ]);

  const total = result.total;
  const totalPages = Math.max(1, Math.ceil(total / SEARCH_PAGE_SIZE));

  const filterValues: FilterValues = {
    ville: first(raw.ville) ?? "",
    transaction: first(raw.transaction) === "rent" ? "rent" : "sale",
    prix_min: first(raw.prix_min) ?? "",
    prix_max: first(raw.prix_max) ?? "",
    type: first(raw.type) ?? "",
    chambres: first(raw.chambres) ?? "",
    sdb: first(raw.sdb) ?? "",
    superficie: first(raw.superficie) ?? "",
    visite_3d: first(raw.visite_3d) === "1",
  };

  const data: SearchViewData = {
    properties: [
      ...result.items.map((p) => ({
        id: p.id,
        asking_price: p.asking_price,
        address: p.address,
        city: p.city,
        property_type: p.property_type,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        living_area: p.living_area,
        coverPath: p.coverPath,
        virtual_tour_enabled: p.virtual_tour_enabled,
        latitude: p.latitude,
        longitude: p.longitude,
        isNew: isNew(p.created_at),
        isFavorite: favoriteIds.has(p.id),
      })),
    ],
    total,
    page: result.page,
    totalPages,
    filters: filterValues,
    hasActiveFilters,
    prevHref: result.page > 1 ? buildHref(raw, result.page - 1) : null,
    nextHref: result.page < totalPages ? buildHref(raw, result.page + 1) : null,
  };

  return <SearchView data={data} />;
}
