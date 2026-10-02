"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  FavoriteButton,
  Modal,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { PropertyGallery } from "./PropertyGallery";
import { PropertyCostEstimate } from "./PropertyCostEstimate";
import { PropertyMap } from "./PropertyMap";
import { VirtualTour, type VirtualTourProps } from "@/components/virtual-tours/VirtualTour";
import {
  formatDate,
  formatNumber,
  formatPrice,
  listingTypeLabel,
  propertyTypeLabel,
  statusLabel,
} from "@/lib/format";

export interface PropertyDetailData {
  id: string;
  address: string;
  city: string;
  province: string;
  asking_price: number | null;
  listing_type: string;
  property_type: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  living_area: number | null;
  lot_area: number | null;
  year_built: number | null;
  municipal_tax: number | null;
  school_tax: number | null;
  postal_code: string | null;
  description: string | null;
  created_at: string;
  status: string;
}

interface Props {
  property: PropertyDetailData;
  photos: { url: string }[];
  floorPlans: { url: string }[];
  tour: {
    provider: "matterport" | "external";
    tourId: string | null;
    url: string;
    embedUrl: string | null;
  } | null;
  latitude: number | null;
  longitude: number | null;
  isOwner: boolean;
  isFavorite: boolean;
}

/**
 * Détail d'annonce : magazine immobilier premium + outil transactionnel.
 * La visite 3D n'apparaît que si elle existe vraiment (jamais de faux bouton).
 */
export function PropertyDetail({
  property: p,
  photos,
  floorPlans,
  tour,
  latitude,
  longitude,
  isOwner,
  isFavorite,
}: Props) {
  const [visitOpen, setVisitOpen] = useState(false);

  const specs: { label: string; value: string }[] = [
    { label: "Chambres", value: formatNumber(p.bedrooms) },
    { label: "Salles de bain", value: formatNumber(p.bathrooms) },
    { label: "Superficie habitable", value: p.living_area != null ? `${formatNumber(p.living_area)} pi²` : "—" },
    { label: "Terrain", value: p.lot_area != null ? `${formatNumber(p.lot_area)} pi²` : "—" },
    { label: "Année de construction", value: p.year_built != null ? String(p.year_built) : "—" },
    { label: "Taxes municipales", value: p.municipal_tax != null ? `${formatPrice(p.municipal_tax)}/an` : "—" },
    { label: "Taxes scolaires", value: p.school_tax != null ? `${formatPrice(p.school_tax)}/an` : "—" },
    { label: "Code postal", value: p.postal_code ?? "—" },
  ];

  const heroSpecs = [
    p.bedrooms != null ? `${formatNumber(p.bedrooms)} chambres` : null,
    p.bathrooms != null ? `${formatNumber(p.bathrooms)} salles de bain` : null,
    p.living_area != null ? `${formatNumber(p.living_area)} pi²` : null,
  ].filter(Boolean);

  const hasCoords = typeof latitude === "number" && typeof longitude === "number";

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8">
      <Link
        href="/search"
        className="text-sm font-medium text-charcoal/55 underline-offset-4 transition-colors hover:text-forest hover:underline"
      >
        ← Retour à la recherche
      </Link>

      <div className="mt-6">
        <PropertyGallery photos={photos} address={p.address} />
      </div>

      {/* ---------- En-tête éditorial ---------- */}
      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="forest">{listingTypeLabel(p.listing_type)}</Badge>
            {p.property_type ? <Badge>{propertyTypeLabel(p.property_type)}</Badge> : null}
            {tour ? <Badge variant="gold">Visite 3D</Badge> : null}
            {isOwner && p.status !== "published" ? (
              <Badge variant="gold">{statusLabel(p.status)}</Badge>
            ) : null}
          </div>
          <h1 className="mt-4 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
            {p.address}
          </h1>
          <p className="mt-2 text-[15px] text-charcoal/55">
            {p.city}, {p.province}
          </p>
          {heroSpecs.length > 0 ? (
            <p className="mt-3 text-[15px] text-charcoal/70">{heroSpecs.join(" · ")}</p>
          ) : null}
        </div>
        <div className="flex flex-col items-start gap-4 lg:items-end">
          <p className="font-display text-4xl text-forest">{formatPrice(p.asking_price)}</p>
          <div className="flex items-center gap-3">
            <Button size="lg" onClick={() => setVisitOpen(true)}>
              Planifier une visite
            </Button>
            <FavoriteButton propertyId={p.id} initialFavorite={isFavorite} />
          </div>
          <Link
            href={`/passeport/${p.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-2.5 text-sm font-medium text-charcoal transition-colors duration-200 hover:border-gold hover:bg-cream"
          >
            Voir le Passeport Veyla
          </Link>
          {isOwner ? (
            <Link
              href={`/properties/${p.id}/modifier`}
              className="text-sm font-medium text-charcoal/60 underline-offset-4 hover:text-forest hover:underline"
            >
              Modifier mon annonce
            </Link>
          ) : null}
        </div>
      </div>

      {/* ---------- Onglets ---------- */}
      <div className="mt-10">
        <Tabs defaultValue="apercu">
          <TabsList aria-label="Sections de l'annonce">
            <TabsTrigger value="apercu">Aperçu</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            {tour ? <TabsTrigger value="visite">Visite 3D</TabsTrigger> : null}
            {floorPlans.length > 0 ? <TabsTrigger value="plan">Plan</TabsTrigger> : null}
            {hasCoords ? <TabsTrigger value="carte">Carte</TabsTrigger> : null}
          </TabsList>

          <TabsContent value="apercu" className="pt-8">
            {p.description ? (
              <div className="max-w-3xl">
                <h2 className="font-display text-2xl text-charcoal">Description</h2>
                <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-charcoal/75">
                  {p.description}
                </p>
              </div>
            ) : null}
            <div className={p.description ? "mt-10" : ""}>
              <h2 className="font-display text-2xl text-charcoal">Caractéristiques</h2>
              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border sm:grid-cols-4">
                {specs.map((s) => (
                  <div key={s.label} className="bg-white px-5 py-4">
                    <dt className="text-xs text-charcoal/50">{s.label}</dt>
                    <dd className="mt-1 text-[15px] font-medium text-charcoal">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-8 text-xs text-charcoal/40">
              Annonce publiée le {formatDate(p.created_at)} — Veyla.
            </p>
          </TabsContent>

          <TabsContent value="photos" className="pt-8">
            {photos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                {photos.map((ph, i) => (
                  <div key={ph.url} className="overflow-hidden rounded-[var(--radius-md)] bg-sand">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ph.url}
                      alt={i === 0 ? `Photo de ${p.address}` : `Photo ${i + 1} — ${p.address}`}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-charcoal/50">Aucune photo pour le moment.</p>
            )}
          </TabsContent>

          {tour ? (
            <TabsContent value="visite" className="pt-8">
              <VirtualTour
                provider={tour.provider}
                tourId={tour.tourId}
                url={tour.url}
                embedUrl={tour.embedUrl}
                propertyId={p.id}
                title={`Visite 3D — ${p.address}`}
              />
            </TabsContent>
          ) : null}

          {floorPlans.length > 0 ? (
            <TabsContent value="plan" className="pt-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {floorPlans.map((pl, i) => (
                  <div key={pl.url} className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-white p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pl.url}
                      alt={`Plan ${i + 1} — ${p.address}`}
                      loading="lazy"
                      className="w-full rounded-[var(--radius-sm)] object-contain"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          ) : null}

          {hasCoords ? (
            <TabsContent value="carte" className="pt-8">
              <PropertyMap latitude={latitude as number} longitude={longitude as number} address={p.address} />
              <p className="mt-3 text-xs text-charcoal/45">
                Position approximative — l&apos;adresse exacte est communiquée lors de la visite.
              </p>
            </TabsContent>
          ) : null}
        </Tabs>
      </div>

      {/* ---------- Coût estimé ---------- */}
      <div className="mt-12">
        <PropertyCostEstimate
          price={p.asking_price}
          municipalTax={p.municipal_tax}
          schoolTax={p.school_tax}
        />
      </div>

      {/* ---------- Visite : message honnête ---------- */}
      <Modal open={visitOpen} onClose={() => setVisitOpen(false)} title="Planifier une visite">
        <Card className="border-0 p-0 shadow-none">
          <p className="text-[15px] leading-relaxed text-charcoal/70">
            La réservation de visite en ligne arrive bientôt sur Veyla.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-charcoal/70">
            En attendant, retrouvez cette annonce dans vos favoris pour la
            suivre facilement.
          </p>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setVisitOpen(false)}>Compris</Button>
          </div>
        </Card>
      </Modal>
    </div>
  );
}
