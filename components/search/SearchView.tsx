"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { SearchMapDynamic } from "@/components/map/SearchMapDynamic";
import {
  PropertyCard,
  SegmentedControl,
  EmptyState,
  Button,
  type PropertyCardData,
} from "@/components/ui";
import { SearchFilters, type FilterValues } from "./SearchFilters";
import type { MapProperty } from "@/components/map/SearchMap";
import { formatPrice } from "@/lib/format";
import { propertyMediaPublicUrl } from "@/lib/media";

export interface SearchViewData {
  properties: (PropertyCardData & { latitude: number | null; longitude: number | null })[];
  total: number;
  page: number;
  totalPages: number;
  filters: FilterValues;
  hasActiveFilters: boolean;
  prevHref: string | null;
  nextHref: string | null;
}

interface SearchViewProps {
  data: SearchViewData;
}

/**
 * Vue de recherche NESTA : liste (40 %) + carte dominante (60 %).
 * Survol synchronisé carte ↔ liste, sélection mise en évidence.
 * Mobile : toggle Carte | Liste, aperçu en bottom sheet.
 */
export function SearchView({ data }: SearchViewProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<"carte" | "liste">("carte");
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const { properties, total, page, totalPages, filters, hasActiveFilters } = data;

  const mapProperties: MapProperty[] = properties
    .filter((p) => p.latitude !== null && p.longitude !== null)
    .map((p) => ({
      id: p.id,
      latitude: p.latitude as number,
      longitude: p.longitude as number,
      asking_price: p.asking_price,
      address: p.address,
      city: p.city,
    }));

  const selected = properties.find((p) => p.id === selectedId) ?? null;

  const scrollToCard = (id: string) => {
    cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleMarkerSelect = (id: string) => {
    setSelectedId(id);
    scrollToCard(id);
  };

  const resultsList = (
    <div className="flex flex-col gap-5">
      {properties.map((p) => (
        <div
          key={p.id}
          ref={(el) => {
            cardRefs.current[p.id] = el;
          }}
          onMouseEnter={() => setHoveredId(p.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <PropertyCard
            property={p}
            highlighted={hoveredId === p.id || selectedId === p.id}
          />
        </div>
      ))}
    </div>
  );

  const pagination =
    totalPages > 1 ? (
      <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-3">
        {data.prevHref ? (
          <Link href={data.prevHref}>
            <Button variant="secondary" size="sm">← Précédent</Button>
          </Link>
        ) : null}
        <span className="text-sm text-charcoal/55">
          Page {page} sur {totalPages}
        </span>
        {data.nextHref ? (
          <Link href={data.nextHref}>
            <Button variant="secondary" size="sm">Suivant →</Button>
          </Link>
        ) : null}
      </nav>
    ) : null;

  const emptyState = (
    <EmptyState
      title={hasActiveFilters ? "Aucune annonce trouvée" : "Aucune annonce pour le moment"}
      description={
        hasActiveFilters
          ? "Essayez d'élargir vos critères de recherche."
          : "Les premières annonces publiées apparaîtront ici."
      }
    />
  );

  return (
    <>
      {/* ================= Desktop : liste + carte ================= */}
      <div className="hidden lg:flex lg:h-[calc(100vh-4rem)]">
        <aside className="w-[42%] max-w-[600px] shrink-0 overflow-y-auto border-r border-border bg-ivory">
          <div className="p-6 xl:p-8">
            <SearchFilters initial={filters} />
            <p className="mt-6 text-sm text-charcoal/55" role="status">
              {total} annonce{total > 1 ? "s" : ""} trouvée{total > 1 ? "s" : ""}
            </p>
            <div className="mt-4">
              {properties.length === 0 ? emptyState : resultsList}
            </div>
            {pagination}
          </div>
        </aside>
        <div className="relative flex-1">
          <SearchMapDynamic
            properties={mapProperties}
            selectedId={selectedId ?? hoveredId}
            onSelect={handleMarkerSelect}
            onHover={setHoveredId}
          />
          {mapProperties.length === 0 && properties.length > 0 ? (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-xs text-charcoal/60 shadow-[var(--shadow-card)]">
              Ces annonces n&apos;ont pas de position sur la carte.
            </p>
          ) : null}
        </div>
      </div>

      {/* ================= Mobile : toggle Carte | Liste ================= */}
      <div className="lg:hidden">
        <div className="sticky top-16 z-30 border-b border-border bg-ivory/95 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center justify-center">
            <SegmentedControl
              ariaLabel="Basculer entre carte et liste"
              value={mobileTab}
              onChange={setMobileTab}
              options={[
                { value: "carte", label: "Carte" },
                { value: "liste", label: "Liste" },
              ]}
            />
          </div>
          <div className="mt-3">
            <SearchFilters initial={filters} />
          </div>
          <p className="mt-3 text-center text-xs text-charcoal/55" role="status">
            {total} annonce{total > 1 ? "s" : ""}
          </p>
        </div>

        {mobileTab === "carte" ? (
          <div className="relative h-[calc(100vh-16rem)] min-h-[420px]">
            <SearchMapDynamic
              properties={mapProperties}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id)}
            />
            {/* Aperçu de la propriété sélectionnée (bottom sheet). */}
            {selected ? (
              <div className="absolute inset-x-3 bottom-3 z-10">
                <div className="nesta-fade-up overflow-hidden rounded-[var(--radius-lg)] border border-border bg-white shadow-[var(--shadow-pop)]">
                  <Link href={`/properties/${selected.id}`} className="flex gap-4 p-4">
                    <div className="h-20 w-24 shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-sand">
                      {selected.coverPath ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={propertyMediaPublicUrl(selected.coverPath)}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-lg text-forest">
                        {formatPrice(selected.asking_price)}
                      </p>
                      <p className="truncate text-sm font-medium text-charcoal">{selected.address}</p>
                      <p className="text-sm text-charcoal/55">{selected.city}</p>
                    </div>
                    <span aria-hidden="true" className="self-center text-xl text-charcoal/40">→</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    aria-label="Fermer l'aperçu"
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-lg text-charcoal/60"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="px-4 py-5">
            {properties.length === 0 ? emptyState : resultsList}
            {pagination}
          </div>
        )}
      </div>
    </>
  );
}
