"use client";

import { useState } from "react";
import { PropertyGallery } from "./PropertyGallery";
import { VirtualTour } from "@/components/virtual-tours/VirtualTour";
import type { VirtualTourDbProvider } from "@/lib/virtual-tours";

/* ============================================================
 * VEYLA — onglets médias de la page détail :
 * Photos | Visite 3D | Plan.
 *
 * L'onglet « Visite 3D » n'apparaît QUE si l'annonce possède une
 * vraie visite configurée. La visite est chargée paresseusement
 * (lazy-load) : rien n'est chargé tant que l'utilisateur ne
 * clique pas sur l'onglet puis sur la lecture.
 * ============================================================ */

export interface PropertyTour {
  provider: VirtualTourDbProvider;
  tourId: string | null;
  url: string;
  embedUrl: string | null;
}

interface Props {
  photos: { url: string }[];
  address: string;
  propertyId: string;
  tour: PropertyTour | null;
  mapSrc: string | null;
}

type Tab = "photos" | "tour" | "plan";

const TAB_LABELS: Record<Tab, string> = {
  photos: "Photos",
  tour: "Visite 3D",
  plan: "Plan",
};

export function PropertyMediaTabs({
  photos,
  address,
  propertyId,
  tour,
  mapSrc,
}: Props) {
  const [tab, setTab] = useState<Tab>("photos");

  const tabs: Tab[] = ["photos"];
  if (tour) tabs.push("tour");
  if (mapSrc) tabs.push("plan");

  /* Aucun onglet supplémentaire : galerie simple, comme avant. */
  if (tabs.length === 1) {
    return <PropertyGallery photos={photos} address={address} />;
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Médias de l'annonce"
        className="flex gap-1 border-b border-border"
      >
        {tabs.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                active ? "text-forest" : "text-charcoal/50 hover:text-charcoal"
              }`}
            >
              {TAB_LABELS[t]}
              {active ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-4" role="tabpanel">
        {tab === "photos" ? (
          <PropertyGallery photos={photos} address={address} />
        ) : null}

        {tab === "tour" && tour ? (
          <VirtualTour
            provider={tour.provider}
            tourId={tour.tourId}
            url={tour.url}
            embedUrl={tour.embedUrl}
            propertyId={propertyId}
            title={address}
          />
        ) : null}

        {tab === "plan" && mapSrc ? (
          <div className="overflow-hidden rounded-2xl border border-border bg-white">
            <iframe
              title={`Plan — ${address}`}
              src={mapSrc}
              className="aspect-[16/9] w-full border-0"
              loading="lazy"
            />
            <p className="px-6 py-3 text-xs text-charcoal/40">
              Carte : OpenStreetMap.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
