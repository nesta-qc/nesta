import { Skeleton } from "@/components/ui";

/**
 * Écran de chargement de /statistiques : affiché automatiquement par Next.js
 * pendant que les agrégats sont calculés côté serveur (quelques secondes).
 * Reprend la structure de la page (titre + 3 cartes + liste) en balayage subtil.
 */
export default function StatistiquesLoading() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <Skeleton shape="line" className="w-40" />
      <div className="mt-2">
        <Skeleton shape="line" className="h-9 w-72" />
      </div>
      <div className="mt-4 max-w-2xl">
        <Skeleton shape="line" className="w-full" />
        <Skeleton shape="line" className="mt-2 w-5/6" />
      </div>

      <div className="mt-10">
        <Skeleton shape="line" className="h-7 w-48" />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-[var(--radius-lg)] border border-border bg-white p-5"
          >
            <Skeleton shape="line" className="w-2/3" />
            <Skeleton shape="line" className="mt-3 h-8 w-1/2" />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Skeleton shape="line" className="h-7 w-56" />
      </div>
      <ul className="mt-4 space-y-5">
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
  );
}
