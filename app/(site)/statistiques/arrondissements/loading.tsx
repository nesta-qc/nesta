import { Skeleton } from "@/components/ui";

/** Chargement de /statistiques/arrondissements. */
export default function ArrondissementsLoading() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <Skeleton shape="line" className="w-40" />
      <div className="mt-2">
        <Skeleton shape="line" className="h-9 w-56" />
      </div>
      <div className="mt-6 flex justify-end">
        <Skeleton className="h-11 w-56 rounded-full" />
      </div>
      <div className="mt-4 rounded-[var(--radius-lg)] border border-border bg-white p-5">
        <ul className="flex flex-col gap-5">
          {[0, 1, 2, 3, 4].map((i) => (
            <li key={i}>
              <div className="flex items-baseline justify-between gap-3">
                <Skeleton shape="line" className="w-1/3" />
                <Skeleton shape="line" className="w-1/4" />
              </div>
              <Skeleton className="mt-2 h-2.5 w-full rounded-full" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
