import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAdminProperties } from "@/actions/admin";
import { Badge, EmptyState } from "@/components/ui";
import { ModerationButtons } from "@/components/admin/ModerationButtons";
import { Pagination } from "@/components/admin/Pagination";
import { propertyMediaPublicUrl } from "@/lib/media";
import { timeAgo } from "@/components/admin/format";
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
  title: "Modération",
  description: "File d'annonces à modérer sur NESTA.",
};

const TABS = [
  { id: "draft", label: "En attente", hint: "Brouillons à approuver ou suspendre." },
  { id: "published", label: "Publiées", hint: "Annonces visibles — suspendre si problème." },
  { id: "suspended", label: "Suspendues", hint: "Annonces masquées — réactiver ou archiver." },
] as const;

export default async function AdminModerationPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const first = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;
  const rawStatus = first(sp.status) ?? "draft";
  const status = ["draft", "published", "suspended"].includes(rawStatus)
    ? rawStatus
    : "draft";
  const page = Math.max(1, parseInt(first(sp.page) ?? "1", 10) || 1);

  const result = await getAdminProperties({ status, q: "", page });
  const items = result?.items ?? [];
  const total = result?.total ?? 0;
  const active = TABS.find((t) => t.id === status)!;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
        NESTA Admin
      </p>
      <h1 className="mt-1 font-display text-3xl text-charcoal">Modération</h1>
      <p className="mt-1 text-sm text-charcoal/60">{active.hint}</p>

      <div className="mt-5 flex flex-wrap gap-1.5" role="tablist" aria-label="File de modération">
        {TABS.map((t) => (
          <Link
            key={t.id}
            href={`/admin/moderation?status=${t.id}`}
            role="tab"
            aria-selected={t.id === status}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              t.id === status
                ? "bg-forest text-white"
                : "border border-border bg-white text-charcoal/70 hover:border-forest"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border bg-white p-6">
          <EmptyState
            title="File vide"
            description="Aucune annonce dans cette file pour le moment."
          />
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {items.map((p) => (
            <article
              key={p.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-5 sm:flex-row sm:items-center"
            >
              {p.photoPath ? (
                <Image
                  src={propertyMediaPublicUrl(p.photoPath)}
                  alt=""
                  width={160}
                  height={112}
                  className="aspect-[10/7] w-full shrink-0 rounded-xl object-cover sm:w-40"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex aspect-[10/7] w-full shrink-0 items-center justify-center rounded-xl bg-sand text-sm text-charcoal/40 sm:w-40"
                >
                  Sans photo
                </span>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/admin/properties/${p.id}`}
                    className="font-medium text-forest underline-offset-4 hover:underline"
                  >
                    {p.address}
                  </Link>
                  <Badge variant={statusBadgeVariant(p.status)}>
                    {statusLabel(p.status)}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-charcoal/60">
                  {p.city} · {propertyTypeLabel(p.property_type)} ·{" "}
                  {listingTypeLabel(p.listing_type)} ·{" "}
                  <span className="font-medium text-charcoal">
                    {formatPrice(p.asking_price)}
                  </span>
                </p>
                <p className="mt-1 text-xs text-charcoal/50">
                  Vendeur : {p.ownerName ?? "—"} · créée le {formatDate(p.created_at)}
                  {" "}({timeAgo(p.created_at)})
                </p>
              </div>
              <div className="shrink-0">
                <ModerationButtons id={p.id} status={p.status} />
              </div>
            </article>
          ))}
        </div>
      )}

      <Pagination
        page={page}
        total={total}
        pageSize={result?.pageSize ?? 20}
        basePath="/admin/moderation"
        params={{ status }}
      />
    </div>
  );
}
