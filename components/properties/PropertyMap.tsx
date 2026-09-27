"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui";

const SingleMap = dynamic(
  () => import("./PropertyMapInner").then((m) => m.PropertyMapInner),
  {
    ssr: false,
    loading: () => <Skeleton className="h-full w-full" />,
  },
);

interface Props {
  latitude: number;
  longitude: number;
  address: string;
}

/** Carte de localisation d'une annonce (Leaflet, chargement client). */
export function PropertyMap(props: Props) {
  return (
    <div className="h-[320px] w-full overflow-hidden rounded-[var(--radius-lg)] border border-border sm:h-[400px]">
      <SingleMap {...props} />
    </div>
  );
}
