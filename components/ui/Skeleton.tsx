interface SkeletonProps {
  className?: string;
  /** Forme : bloc rectangulaire, ligne de texte ou cercle. */
  shape?: "block" | "line" | "circle";
}

/**
 * État de chargement élégant : balayage subtil, jamais de spinner agressif.
 */
export function Skeleton({ className = "", shape = "block" }: SkeletonProps) {
  const shapeClass =
    shape === "circle"
      ? "rounded-full"
      : shape === "line"
        ? "h-4 rounded-full"
        : "rounded-[var(--radius-md)]";
  return (
    <div
      aria-hidden="true"
      className={`nesta-skeleton ${shapeClass} ${className}`}
    />
  );
}

/** Carte de propriété en chargement (liste de recherche). */
export function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-white">
      <Skeleton className="aspect-[16/10] w-full" />
      <div className="space-y-3 p-5">
        <Skeleton shape="line" className="w-1/3" />
        <Skeleton shape="line" className="w-2/3" />
        <Skeleton shape="line" className="w-1/2" />
      </div>
    </div>
  );
}
