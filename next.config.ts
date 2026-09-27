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
};

export default nextConfig;
