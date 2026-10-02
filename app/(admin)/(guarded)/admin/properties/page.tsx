import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAdminProperties } from "@/actions/admin";
import { Badge, EmptyState } from "@/components/ui";
import { ModerationButtons } from "@/components/admin/ModerationButtons";
import { Pagination } from "@/components/admin/Pagination";
import { propertyMediaPublicUrl } from "@/lib/media";
import {
  formatDate,
  formatPrice,
  listingTypeLabel,
  propertyTypeLabel,
  statusBadgeVariant,
  statusLabel,
} from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Propriétés",
  description: "Gestion des annonces VEYLA.",
};

const STATUS_TABS = [
  { id: "all", label: "Toutes" },
  { id: "draft", label: "Brouillons" },
  { id: "published", label: "Publiées" },
  { id: "suspended", label: "Suspendues" },
  { id: "sold_rented", label: "Vendues / Louées" },
  { id: "withdrawn", label: "Retirées" },
];

export default async function AdminPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const first = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;
  const status = first(sp.status) ?? "all";
  const q = first(sp.q) ?? "";
  const page = Math.max(1, parseInt(first(sp.page) ?? "1", 10) || 1);

  const result = await getAdminProperties({ status, q, page });
  const items = result?.items ?? [];
  const total = result?.total ?? 0;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
            VEYLA Admin
          </p>
          <h1 className="mt-1 font-display text-3xl text-charcoal">Propriétés</h1>
          <p className="mt-1 text-sm text-charcoal/60">
            {total === 0
              ? "Aucune annonce."
              : `${total} annonce${total > 1 ? "s" : ""} au total.`}
          </p>
        </div>
        <form
          method="GET"
          action="/admin/properties"
          className="flex gap-2"
          role="search"
        >
          {status !== "all" ? (
            <input type="hidden" name="status" value={status} />
          ) : null}
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Adresse, ville…"
            aria-label="Rechercher une annonce"
            className="w-52 rounded-full border border-border bg-white px-4 py-2 text-sm text-charcoal placeholder:text-charcoal/40"
          />
          <button
            type="submit"
            className="rounded-full bg-forest px-4 py-2 text-sm font-medium text-white hover:bg-forest-deep"
          >
            Chercher
          </button>
        </form>
      </div>

      {/* Filtres par statut. */}
      <div className="mt-5 flex flex-wrap gap-1.5" role="tablist" aria-label="Filtrer par statut">
        {STATUS_TABS.map((t) => {
          const active = status === t.id;
          const href =
            t.id === "all"
              ? `/admin/properties${q ? `?q=${encodeURIComponent(q)}` : ""}`
              : `/admin/properties?status=${t.id}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
          return (
            <Link
              key={t.id}
              href={href}
              role="tab"
              aria-selected={active}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "bg-forest text-white"
                  : "border border-border bg-white text-charcoal/70 hover:border-forest"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border bg-white p-6">
          <EmptyState
            title="Aucune annonce"
            description={
              q || status !== "all"
                ? "Aucune annonce ne correspond à ces filtres."
                : "Les annonces créées par les vendeurs apparaîtront ici."
            }
          />
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full min-w-[1020px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-charcoal/50">
                <th scope="col" className="px-4 py-3.5 font-medium">Annonce</th>
                <th scope="col" className="px-4 py-3.5 font-medium">Prix</th>
                <th scope="col" className="px-4 py-3.5 font-medium">Type</th>
                <th scope="col" className="px-4 py-3.5 font-medium">Vendeur</th>
                <th scope="col" className="px-4 py-3.5 font-medium">Statut</th>
                <th scope="col" className="px-4 py-3.5 text-center font-medium" title="Ajouts aux favoris">♥</th>
                <th scope="col" className="px-4 py-3.5 text-center font-medium" title="Demandes de visite">Visites</th>
                <th scope="col" className="px-4 py-3.5 font-medium">Créée le</th>
                <th scope="col" className="px-4 py-3.5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-b border-border/60 last:border-0 hover:bg-ivory/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.photoPath ? (
                        <Image
                          src={propertyMediaPublicUrl(p.photoPath)}
                          alt=""
                          width={56}
                          height={42}
                          className="h-[42px] w-14 shrink-0 rounded-lg object-cover"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="flex h-[42px] w-14 shrink-0 items-center justify-center rounded-lg bg-sand text-xs text-charcoal/40"
                        >
                          —
                        </span>
                      )}
                      <div className="min-w-0">
                        <Link
                          href={`/admin/properties/${p.id}`}
                          className="block max-w-56 truncate font-medium text-forest underline-offset-4 hover:underline"
                        >
                          {p.address}
                        </Link>
                        <p className="text-xs text-charcoal/50">
                          {p.city} · {listingTypeLabel(p.listing_type)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium">
                    {formatPrice(p.asking_price)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">
                    {propertyTypeLabel(p.property_type)}
                  </td>
                  <td className="max-w-36 truncate px-4 py-3 text-charcoal/70">
                    {p.ownerName ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusBadgeVariant(p.status)}>
                      {statusLabel(p.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center tabular-nums text-charcoal/70">
                    {p.favoritesCount}
                  </td>
                  <td className="px-4 py-3 text-center tabular-nums text-charcoal/70">
                    {p.viewingsCount}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">
                    {formatDate(p.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <ModerationButtons id={p.id} status={p.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        page={page}
        total={total}
        pageSize={result?.pageSize ?? 20}
        basePath="/admin/properties"
        params={{ status: status === "all" ? undefined : status, q: q || undefined }}
      />
    </div>
  );
}
