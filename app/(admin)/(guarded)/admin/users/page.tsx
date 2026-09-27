import type { Metadata } from "next";
import Link from "next/link";
import { getAdminUsers } from "@/actions/admin";
import { Badge, EmptyState } from "@/components/ui";
import { Pagination } from "@/components/admin/Pagination";
import { displayNameOr, roleLabel, timeAgo } from "@/components/admin/format";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Utilisateurs",
  description: "Gestion des utilisateurs NESTA.",
};

const ROLE_TABS = [
  { id: "all", label: "Tous" },
  { id: "ADMIN", label: "Admins" },
  { id: "SELLER", label: "Vendeurs" },
  { id: "BUYER", label: "Acheteurs" },
];

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const first = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;
  const role = first(sp.role) ?? "all";
  const q = first(sp.q) ?? "";
  const page = Math.max(1, parseInt(first(sp.page) ?? "1", 10) || 1);

  const result = await getAdminUsers({ q, role, page });
  const items = result?.items ?? [];
  const total = result?.total ?? 0;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
            NESTA Admin
          </p>
          <h1 className="mt-1 font-display text-3xl text-charcoal">Utilisateurs</h1>
          <p className="mt-1 text-sm text-charcoal/60">
            {total === 0
              ? "Aucun utilisateur."
              : `${total} utilisateur${total > 1 ? "s" : ""} inscrit${total > 1 ? "s" : ""}.`}
          </p>
        </div>
        <form
          method="GET"
          action="/admin/users"
          className="flex gap-2"
          role="search"
        >
          {role !== "all" ? <input type="hidden" name="role" value={role} /> : null}
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Nom, courriel…"
            aria-label="Rechercher un utilisateur"
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

      <div className="mt-5 flex flex-wrap gap-1.5" role="tablist" aria-label="Filtrer par rôle">
        {ROLE_TABS.map((t) => {
          const active = role === t.id;
          const href =
            t.id === "all"
              ? `/admin/users${q ? `?q=${encodeURIComponent(q)}` : ""}`
              : `/admin/users?role=${t.id}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
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
            title="Aucun utilisateur"
            description={
              q || role !== "all"
                ? "Aucun utilisateur ne correspond à ces filtres."
                : "Les inscriptions apparaîtront ici."
            }
          />
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-charcoal/50">
                <th scope="col" className="px-4 py-3.5 font-medium">Utilisateur</th>
                <th scope="col" className="px-4 py-3.5 font-medium">Rôles</th>
                <th scope="col" className="px-4 py-3.5 font-medium">Annonces</th>
                <th scope="col" className="px-4 py-3.5 font-medium">Inscrit le</th>
                <th scope="col" className="px-4 py-3.5 font-medium">Dernière activité</th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.id} className="border-b border-border/60 last:border-0 hover:bg-ivory/60">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/users/${u.id}`}
                      className="block font-medium text-forest underline-offset-4 hover:underline"
                    >
                      {displayNameOr(u.displayName)}
                    </Link>
                    <span className="block font-mono text-xs text-charcoal/40">
                      {u.id.slice(0, 8)}…
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {u.roles.length === 0 ? (
                        <span className="text-xs text-charcoal/40">—</span>
                      ) : (
                        u.roles.map((r) => (
                          <Badge
                            key={r}
                            variant={r === "ADMIN" ? "forest" : "muted"}
                          >
                            {roleLabel(r)}
                          </Badge>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 tabular-nums text-charcoal/70">
                    {u.propertiesCount}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">
                    {formatDate(u.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">
                    {u.lastActivityAt ? timeAgo(u.lastActivityAt) : "—"}
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
        basePath="/admin/users"
        params={{ role: role === "all" ? undefined : role, q: q || undefined }}
      />
    </div>
  );
}
