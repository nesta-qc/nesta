"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  latitude: number;
  longitude: number;
  address: string;
}

/** Carte Leaflet d'une seule annonce : marqueur vert forêt. */
export function PropertyMapInner({ latitude, longitude, address }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const map = L.map(containerRef.current, {
      center: [latitude, longitude],
      zoom: 14,
      scrollWheelZoom: false,
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
    const icon = L.divIcon({
      className: "",
      html: `<div style="width:18px;height:18px;border-radius:50%;background:#163d32;border:3px solid #fff;box-shadow:0 2px 8px rgb(24 26 25 / .3)"></div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
    L.marker([latitude, longitude], { icon, title: address }).addTo(map);
    map.on("focus", () => map.scrollWheelZoom.enable());
    map.on("blur", () => map.scrollWheelZoom.disable());
    return () => {
      map.remove();
    };
  }, [latitude, longitude, address]);

  return (
    <div ref={containerRef} className="z-0 h-full w-full" role="application" aria-label={`Carte — ${address}`} />
  );
}
