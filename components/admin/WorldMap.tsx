"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapPoint } from "@/actions/admin";

/* ============================================================
 * NESTA Admin — Carte du monde des biens + repère « vous ».
 *
 * Carte Leaflet (imagerie satellite Esri assombrie, assortie au thème) :
 * - point champagne plein = coordonnées réelles en base (précis)
 * - anneau ivoire        = regroupement par ville (approximatif)
 * - halo lumineux pulsant = position de la personne qui consulte
 *   le dashboard (géolocalisation du navigateur, avec permission ;
 *   rien n'est inventé si elle est refusée).
 * ============================================================ */

type GeoStatus = "locating" | "found" | "denied" | "unavailable";

const CHAMPAGNE = "#c3a877";
const IVORY = "#f7f5ef";

function userLightIcon(): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<div class="nesta-user-light" aria-hidden="true"><span class="nesta-user-light__core"></span></div>`,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
}

export function WorldMap({ points }: { points: MapPoint[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("locating");
  const [retryKey, setRetryKey] = useState(0);

  /* Création de la carte (une seule fois). */
  useEffect(() => {
    if (!containerRef.current) return;
    const map = L.map(containerRef.current, {
      center: [30, -40],
      zoom: 2,
      minZoom: 2,
      maxZoom: 12,
      worldCopyJump: true,
      scrollWheelZoom: true,
    });
    /* Fond satellite sombre (Esri World Imagery assombri par CSS,
       assorti au thème forêt). */
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "Imagery &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics",
        maxZoom: 19,
        className: "nesta-satellite-tiles",
      },
    ).addTo(map);

    /* Biens : 100 % données réelles. */
    for (const p of points) {
      if (p.kind === "precise") {
        L.circleMarker([p.lat, p.lng], {
          radius: p.count > 1 ? 8 : 5,
          color: CHAMPAGNE,
          weight: 2,
          fillColor: CHAMPAGNE,
          fillOpacity: 0.9,
        })
          .bindTooltip(`${p.label} — ${p.city}`, { direction: "top", offset: [0, -6] })
          .addTo(map);
      } else {
        L.circleMarker([p.lat, p.lng], {
          radius: 11,
          color: IVORY,
          weight: 2,
          fillOpacity: 0,
        })
          .bindTooltip(`${p.label} — position approximative (ville)`, {
            direction: "top",
            offset: [0, -8],
          })
          .addTo(map);
        L.circleMarker([p.lat, p.lng], {
          radius: 3,
          color: IVORY,
          weight: 0,
          fillColor: IVORY,
          fillOpacity: 0.9,
          interactive: false,
        }).addTo(map);
      }
    }

    /* Repère lumineux : position réelle de la personne connectée. */
    let userMarker: L.Marker | null = null;
    const onOk = (pos: GeolocationPosition) => {
      userMarker = L.marker([pos.coords.latitude, pos.coords.longitude], {
        icon: userLightIcon(),
        keyboard: false,
        zIndexOffset: 1000,
      })
        .bindTooltip("Vous êtes ici", { direction: "top", offset: [0, -18] })
        .addTo(map);
      setGeoStatus("found");
    };
    const onErr = (err: GeolocationPositionError) => {
      setGeoStatus(err.code === err.PERMISSION_DENIED ? "denied" : "unavailable");
    };

    if (!("geolocation" in navigator)) {
      setGeoStatus("unavailable");
    } else {
      setGeoStatus("locating");
      navigator.geolocation.getCurrentPosition(onOk, onErr, { timeout: 12000 });
    }

    return () => {
      map.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retryKey]);

  return (
    <div className="nesta-worldmap relative h-full w-full overflow-hidden rounded-2xl">
      <div ref={containerRef} className="absolute inset-0 z-0" role="application" aria-label="Carte du monde des biens" />

      {/* Légende */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 space-y-1.5 rounded-xl bg-black/40 px-3 py-2.5 backdrop-blur-sm">
        <p className="flex items-center gap-2 text-xs text-ivory/85">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-champagne" />
          Adresse exacte en base
        </p>
        <p className="flex items-center gap-2 text-xs text-ivory/85">
          <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-ivory" />
          Regroupé par ville (approximatif)
        </p>
        <p className="flex items-center gap-2 text-xs text-ivory/85">
          <span className="nesta-user-light__legend" />
          Votre position
        </p>
      </div>

      {/* État géolocalisation */}
      {geoStatus === "locating" && (
        <p className="absolute bottom-4 left-4 z-10 rounded-lg bg-black/40 px-3 py-1.5 text-xs text-ivory/75 backdrop-blur-sm">
          Localisation en cours…
        </p>
      )}
      {(geoStatus === "denied" || geoStatus === "unavailable") && (
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between gap-3 rounded-xl bg-black/45 px-3.5 py-2.5 backdrop-blur-sm">
          <p className="text-xs text-ivory/80">
            {geoStatus === "denied"
              ? "Position non partagée — autorisez la géolocalisation pour allumer votre repère."
              : "Géolocalisation indisponible sur cet appareil — votre repère ne peut pas s'allumer."}
          </p>
          <button
            type="button"
            onClick={() => setRetryKey((k) => k + 1)}
            className="shrink-0 rounded-lg border border-ivory/25 px-2.5 py-1 text-xs font-medium text-ivory/85 transition hover:bg-ivory/10"
          >
            Réessayer
          </button>
        </div>
      )}

      {points.length === 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-8 text-center">
          <p className="max-w-xs text-sm text-ivory/70">
            Aucun bien à afficher pour le moment. Les biens publiés avec une adresse apparaîtront ici.
          </p>
        </div>
      )}
    </div>
  );
}
