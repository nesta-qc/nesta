"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui";
import type { MapProperty } from "./SearchMap";

const SearchMap = dynamic(
  () => import("./SearchMap").then((m) => m.SearchMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-sand">
        <Skeleton className="h-full w-full" />
      </div>
    ),
  },
);

interface SearchMapDynamicProps {
  properties: MapProperty[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  onHover?: (id: string | null) => void;
  className?: string;
}

/** Carte chargée côté client uniquement (Leaflet n'est pas SSR-compatible). */
export function SearchMapDynamic(props: SearchMapDynamicProps) {
  return <SearchMap {...props} />;
}
