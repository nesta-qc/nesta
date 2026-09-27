import Link from "next/link";

/** Pagination par liens (conserve les filtres via searchParams). */
export function Pagination({
  page,
  total,
  pageSize,
  basePath,
  params,
}: {
  page: number;
  total: number;
  pageSize: number;
  basePath: string;
  params: Record<string, string | undefined>;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  const hrefFor = (p: number) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v) sp.set(k, v);
    }
    sp.set("page", String(p));
    return `${basePath}?${sp.toString()}`;
  };

  const pages: number[] = [];
  for (
    let p = Math.max(1, page - 2);
    p <= Math.min(totalPages, page + 2);
    p++
  ) {
    pages.push(p);
  }

  const btn =
    "inline-flex min-w-9 items-center justify-center rounded-lg border px-2.5 py-1.5 text-sm";

  return (
    <nav
      aria-label="Pagination"
      className="mt-6 flex flex-wrap items-center justify-between gap-3"
    >
      <p className="text-xs text-charcoal/55">
        Page {page} sur {totalPages} · {total} résultat{total > 1 ? "s" : ""}
      </p>
      <div className="flex items-center gap-1.5">
        {page > 1 ? (
          <Link
            href={hrefFor(page - 1)}
            className={`${btn} border-border bg-white text-charcoal hover:border-forest`}
          >
            ←
          </Link>
        ) : null}
        {pages.map((p) => (
          <Link
            key={p}
            href={hrefFor(p)}
            aria-current={p === page ? "page" : undefined}
            className={
              p === page
                ? `${btn} border-forest bg-forest font-medium text-white`
                : `${btn} border-border bg-white text-charcoal hover:border-forest`
            }
          >
            {p}
          </Link>
        ))}
        {page < totalPages ? (
          <Link
            href={hrefFor(page + 1)}
            className={`${btn} border-border bg-white text-charcoal hover:border-forest`}
          >
            →
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
