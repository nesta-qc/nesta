import Link from "next/link";
import Image from "next/image";
import { propertyMediaPublicUrl } from "@/lib/media";
import {
  formatNumber,
  formatPrice,
  propertyTypeLabel,
} from "@/lib/format";
import { FavoriteButton } from "./FavoriteButton";

export interface PropertyCardData {
  id: string;
  asking_price: number | null;
  address: string;
  city: string;
  property_type: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  living_area: number | null;
  coverPath: string | null;
  virtual_tour_enabled: boolean | null;
  isNew?: boolean;
  isOwnerListing?: boolean;
  isFavorite?: boolean;
}

interface PropertyCardProps {
  property: PropertyCardData;
  /** Mise en surbrillance (sélection carte ↔ liste). */
  highlighted?: boolean;
}

/**
 * Carte de propriété NESTA : photographique, ratio 4/3 cohérent,
 * next/image optimisée (aucun layout shift), survol discret
 * (zoom 2 % max, infos secondaires en fondu), favori en overlay.
 */
export function PropertyCard({ property, highlighted }: PropertyCardProps) {
  const p = property;
  const specs = [
    p.bedrooms != null ? `${formatNumber(p.bedrooms)} ch.` : null,
    p.bathrooms != null ? `${formatNumber(p.bathrooms)} sdb` : null,
    p.living_area != null ? `${formatNumber(p.living_area)} pi²` : null,
  ].filter(Boolean);

  const coverSrc = p.coverPath ? propertyMediaPublicUrl(p.coverPath) : null;

  return (
    <article
      className={`group relative overflow-hidden rounded-[var(--radius-lg)] border bg-white transition-shadow duration-300 ${
        highlighted
          ? "border-forest shadow-[var(--shadow-lift)]"
          : "border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)]"
      }`}
    >
      <Link
        href={`/properties/${p.id}`}
        className="block"
        aria-label={`${p.address}, ${p.city} — ${formatPrice(p.asking_price)}`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
          {p.coverPath && coverSrc ? (
            <Image
              src={coverSrc}
              alt={`${p.address}, ${p.city}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              quality={78}
              loading="lazy"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-lg text-charcoal/30">
                Nesta
              </span>
            </div>
          )}

          {/* Badges utiles uniquement. */}
          <div className="absolute left-3 top-3 flex gap-2">
            {p.virtual_tour_enabled ? (
              <span className="rounded-full bg-charcoal/85 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm">
                3D
              </span>
            ) : null}
            {p.isNew ? (
              <span className="rounded-full bg-forest px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
                Nouveau
              </span>
            ) : null}
            {p.isOwnerListing ? (
              <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-charcoal backdrop-blur-sm">
                Propriétaire
              </span>
            ) : null}
          </div>

          {/* Voile + infos secondaires au survol (desktop). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/55 to-transparent p-4 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <p className="translate-y-1 text-[13px] font-medium text-white transition-transform duration-300 group-hover:translate-y-0">
              {p.property_type ? `${propertyTypeLabel(p.property_type)} · ` : ""}
              Voir l&apos;annonce →
            </p>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <p className="font-display text-[22px] leading-none text-forest">
              {formatPrice(p.asking_price)}
            </p>
          </div>
          <p className="mt-2 truncate text-[15px] font-medium text-charcoal">
            {p.address}
          </p>
          <p className="text-sm text-charcoal/55">{p.city}</p>
          {specs.length > 0 ? (
            <p className="mt-2.5 text-[13px] text-charcoal/50">
              {specs.join(" · ")}
            </p>
          ) : null}
        </div>
      </Link>

      {/* Favori discret en overlay sur la photo. */}
      <div className="nesta-favorite-overlay absolute right-3 top-3">
        <FavoriteButton propertyId={p.id} initialFavorite={p.isFavorite} />
      </div>
    </article>
  );
}
