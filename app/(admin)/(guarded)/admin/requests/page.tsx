import type { Metadata } from "next";
import Link from "next/link";
import { getAdminServiceRequests } from "@/actions/admin";
import { EmptyState } from "@/components/ui";
import { Pagination } from "@/components/admin/Pagination";
import { RequestStatusBadge } from "@/components/admin/RequestManager";
import { displayNameOr, serviceRequestName, timeAgo } from "@/components/admin/format";
import { SERVICE_REQUEST_STATUSES } from "@/lib/services";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Demandes de service",
  description: "Suivi des demandes de service NESTA.",
};

export default async function AdminRequestsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const first = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;
  const status = first(sp.status) ?? "all";
  const page = Math.max(1, parseInt(first(sp.page) ?? "1", 10) || 1);

  const result = await getAdminServiceRequests({ status, page });
  const items = result?.items ?? [];
  const total = result?.total ?? 0;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
        NESTA Admin
      </p>
      <h1 className="mt-1 font-display text-3xl text-charcoal">Demandes de service</h1>
      <p className="mt-1 text-sm text-charcoal/60">
        {total === 0
          ? "Aucune demande."
          : `${total} demande${total > 1 ? "s" : ""} au total.`}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5" role="tablist" aria-label="Filtrer par statut">
        <Link
          href="/admin/requests"
          role="tab"
          aria-selected={status === "all"}
          className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
            status === "all"
              ? "bg-forest text-white"
              : "border border-border bg-white text-charcoal/70 hover:border-forest"
          }`}
        >
          Toutes
        </Link>
        {SERVICE_REQUEST_STATUSES.map((s) => (
          <Link
            key={s.id}
            href={`/admin/requests?status=${s.id}`}
            role="tab"
            aria-selected={status === s.id}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              status === s.id
                ? "bg-forest text-white"
                : "border border-border bg-white text-charcoal/70 hover:border-forest"
            }`}
          >
            {s.label}
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border bg-white p-6">
          <EmptyState
            title="Aucune demande"
            description={
              status !== "all"
                ? "Aucune demande dans ce statut."
                : "Les demandes de devis apparaîtront ici."
            }
          />
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {items.map((r) => (
            <Link
              key={r.id}
              href={`/admin/requests/${r.id}`}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-white p-5 transition-colors hover:border-forest sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="font-medium text-charcoal">
                  {serviceRequestName(r.service_id, r.project_name)}
                </p>
                <p className="mt-0.5 truncate text-sm text-charcoal/60">
                  {displayNameOr(r.contact_name)}
                  {r.contact_email ? ` · ${r.contact_email}` : ""}
                  {r.contact_phone ? ` · ${r.contact_phone}` : ""}
                </p>
                <p className="mt-0.5 text-xs text-charcoal/50">
                  {timeAgo(r.created_at)}
                </p>
              </div>
              <div className="shrink-0">
                <RequestStatusBadge status={r.status} />
              </div>
            </Link>
          ))}
        </div>
      )}

      <Pagination
        page={page}
        total={total}
        pageSize={result?.pageSize ?? 20}
        basePath="/admin/requests"
        params={{ status: status === "all" ? undefined : status }}
      />
    </div>
  );
}
