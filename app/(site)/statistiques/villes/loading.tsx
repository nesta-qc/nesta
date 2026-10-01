import { Skeleton } from "@/components/ui";

/** Chargement de /statistiques/villes. */
export default function VillesLoading() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <Skeleton shape="line" className="w-40" />
      <div className="mt-2">
        <Skeleton shape="line" className="h-9 w-32" />
      </div>
      <div className="mt-6 flex gap-3">
        <Skeleton className="h-11 flex-1 rounded-full" />
        <Skeleton className="h-11 w-44 rounded-full" />
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-[var(--radius-lg)] border border-border bg-white p-5"
          >
            <div className="flex items-baseline justify-between gap-3">
              <Skeleton shape="line" className="h-6 w-1/3" />
              <Skeleton shape="line" className="w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
