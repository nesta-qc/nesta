"use client";

type Props = {
  latitude: number;
  longitude: number;
  zoom?: number;
  title?: string;
};

/**
 * Carte Google Maps gratuite via iframe, sans clé API.
 * Affiche un repère aux coordonnées données. Version simple :
 * pas de marqueurs personnalisés ni de clics synchronisés.
 */
export function GoogleMapEmbed({ latitude, longitude, zoom = 14, title = "Carte Google Maps" }: Props) {
  const src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;
  return (
    <iframe
      title={title}
      src={src}
      className="absolute inset-0 h-full w-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
