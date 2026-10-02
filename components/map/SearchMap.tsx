"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { formatPriceShort } from "@/lib/format";

export interface MapProperty {
  id: string;
  latitude: number;
  longitude: number;
  asking_price: number | null;
  address: string;
  city: string;
}

interface SearchMapProps {
  properties: MapProperty[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  onHover?: (id: string | null) => void;
  className?: string;
}

function priceIcon(price: number | null, active: boolean): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<div class="nesta-price-marker${active ? " nesta-price-marker--active" : ""}">${formatPriceShort(price)}</div>`,
  });
}

const DEFAULT_CENTER: [number, number] = [46.8, -71.2]; // Québec

/**
 * Carte interactive VEYLA (Leaflet + OpenStreetMap) : marqueurs de prix,
 * survol synchronisé avec la liste, sélection mise en évidence.
 */
export function SearchMap({
  properties,
  selectedId,
  onSelect,
  onHover,
  className = "",
}: SearchMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const callbacksRef = useRef({ onSelect, onHover });
  callbacksRef.current = { onSelect, onHover };

  /* Création de la carte (une seule fois). */
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: DEFAULT_CENTER,
      zoom: 8,
      scrollWheelZoom: true,
      attributionControl: true,
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, []);

  /* Marqueurs : recréés quand les propriétés changent. */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    for (const marker of markersRef.current.values()) marker.remove();
    markersRef.current.clear();

    for (const p of properties) {
      const marker = L.marker([p.latitude, p.longitude], {
        icon: priceIcon(p.asking_price, p.id === selectedId),
        keyboard: true,
        title: `${p.address}, ${p.city}`,
      });
      marker.on("click", () => callbacksRef.current.onSelect?.(p.id));
      marker.on("mouseover", () => callbacksRef.current.onHover?.(p.id));
      marker.on("mouseout", () => callbacksRef.current.onHover?.(null));
      marker.addTo(map);
      markersRef.current.set(p.id, marker);
    }

    if (properties.length > 0) {
      const bounds = L.latLngBounds(
        properties.map((p) => [p.latitude, p.longitude] as [number, number]),
      );
      map.fitBounds(bounds.pad(0.15));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties]);

  /* Mise en évidence de la sélection / du survol. */
  useEffect(() => {
    for (const [id, marker] of markersRef.current) {
      const p = properties.find((x) => x.id === id);
      if (!p) continue;
      marker.setIcon(priceIcon(p.asking_price, id === selectedId));
      if (id === selectedId) marker.setZIndexOffset(1000);
      else marker.setZIndexOffset(0);
    }
  }, [selectedId, properties]);

  return (
    <div ref={containerRef} className={`z-0 ${className}`} role="application" aria-label="Carte des propriétés" />
  );
}
