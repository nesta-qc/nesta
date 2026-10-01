import { Skeleton } from "@/components/ui";

/**
 * Écran de chargement de /passeport : affiché automatiquement par Next.js
 * pendant la recherche serveur (navigations ?q=). Reprend la structure
 * de la page (titre + formulaire + zone de résultats) en balayage subtil.
 */
export default function PasseportLoading() {
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

      <div className="mt-8">
        <Skeleton className="h-[104px] w-full rounded-2xl" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-white p-5"
          >
            <Skeleton shape="line" className="w-3/4" />
            <Skeleton shape="line" className="mt-3 h-7 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
