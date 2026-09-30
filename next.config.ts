import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /* Les photos d'annonces (jusqu'à 10 Mo) transitent par les Server
       Actions : la limite par défaut de 1 Mo doit être relevée. */
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },
  images: {
    /* Photos du bucket public Supabase `property-media`. */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    /* En-têtes de sécurité de base (défense en profondeur).
     * Pas de CSP stricte ici : Leaflet/OpenStreetMap et les
     * tuiles satellites la casseraient — à durcir plus tard
     * avec une politique testée page par page. */
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          /* Géolocalisation volontairement autorisée : la carte
           * monde de l'admin propose « vous êtes ici ». */
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
