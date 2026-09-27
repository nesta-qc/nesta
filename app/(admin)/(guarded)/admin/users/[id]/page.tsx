import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminUserDetail } from "@/actions/admin";
import { Badge, EmptyState } from "@/components/ui";
import { RoleManager } from "@/components/admin/RoleManager";
import { AuditTimeline } from "@/components/admin/AuditTimeline";
import { Section } from "@/components/admin/Section";
import { StatCard } from "@/components/admin/StatCard";
import { displayNameOr, roleLabel, serviceRequestName, timeAgo } from "@/components/admin/format";
import { formatDate, formatNumber, formatPrice, statusBadgeVariant, statusLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Fiche utilisateur",
  description: "Détail d'un utilisateur NESTA.",
};

export default async function AdminUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const u = await getAdminUserDetail(id);
  if (!u) notFound();

  const facts: Array<[string, string]> = [
    ["Inscrit le", formatDate(u.createdAt)],
    ["Visites demandées", formatNumber(u.viewings.length)],
    ["Offres déposées", formatNumber(u.offers.length)],
    ["Demandes de service", formatNumber(u.serviceRequests.length)],
  ];

  return (
    <div>
      <Link
        href="/admin/users"
        className="text-sm font-medium text-forest underline-offset-4 hover:underline"
      >
        ← Tous les utilisateurs
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl text-charcoal">{displayNameOr(u.displayName)}</h1>
        {u.roles.map((r) => (
          <Badge key={r} variant={r === "ADMIN" ? "forest" : "muted"}>
            {roleLabel(r)}
          </Badge>
        ))}
      </div>
      <p className="mt-1 text-sm text-charcoal/60">
        Identifiant <span className="font-mono text-xs">{u.id}</span>
      </p>

      {/* Rôles. */}
      <Section title="Rôles" description="Attribution et révocation des accès.">
        <div className="rounded-2xl border border-border bg-white p-5">
          <RoleManager userId={u.id} roles={u.roles} />
        </div>
      </Section>

      {/* Faits. */}
      <Section title="Informations">
        <dl className="overflow-hidden rounded-2xl border border-border bg-white">
          {facts.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-border/60 px-5 py-3 text-sm last:border-0">
              <dt className="text-charcoal/55">{k}</dt>
              <dd className="text-right font-medium text-charcoal">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Annonces. */}
      <Section
        title="Annonces"
        description={`${u.properties.length} annonce${u.properties.length > 1 ? "s" : ""}`}
      >
        {u.properties.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-6">
            <EmptyState title="Aucune annonce" description="Cet utilisateur n'a publié aucune annonce." />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-charcoal/50">
                  <th scope="col" className="px-4 py-3 font-medium">Adresse</th>
                  <th scope="col" className="px-4 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {u.properties.map((prop) => (
                  <tr key={prop.id} className="border-b border-border/60 last:border-0">
                    <td className="max-w-56 truncate px-4 py-3">
                      <Link href={`/admin/properties/${prop.id}`} className="font-medium text-forest underline-offset-4 hover:underline">
                        {prop.address}, {prop.city}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusBadgeVariant(prop.status)}>{statusLabel(prop.status)}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      {/* Offres. */}
      <Section
        title="Offres déposées"
        description={`${u.offers.length} offre${u.offers.length > 1 ? "s" : ""}`}
      >
        {u.offers.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-6">
            <EmptyState title="Aucune offre" description="Cet utilisateur n'a déposé aucune offre." />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-charcoal/50">
                  <th scope="col" className="px-4 py-3 font-medium">Annonce</th>
                  <th scope="col" className="px-4 py-3 font-medium">Montant</th>
                  <th scope="col" className="px-4 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {u.offers.map((o) => (
                  <tr key={o.id} className="border-b border-border/60 last:border-0">
                    <td className="max-w-56 truncate px-4 py-3">
                      <Link href={`/admin/properties/${o.propertyId}`} className="font-medium text-forest underline-offset-4 hover:underline">
                        {o.address}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-medium">{formatPrice(o.amount)}</td>
                    <td className="px-4 py-3"><Badge variant="muted">{o.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      {/* Visites. */}
      <Section
        title="Visites demandées"
        description={`${u.viewings.length} visite${u.viewings.length > 1 ? "s" : ""}`}
      >
        {u.viewings.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-6">
            <EmptyState title="Aucune visite" description="Cet utilisateur n'a demandé aucune visite." />
          </div>
        ) : (
          <ul className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border bg-white">
            {u.viewings.map((v) => (
              <li key={v.id} className="flex items-center justify-between gap-4 px-5 py-3">
                <Link href={`/admin/properties/${v.propertyId}`} className="truncate text-sm font-medium text-forest underline-offset-4 hover:underline">
                  {v.address}
                </Link>
                <span className="shrink-0 text-xs text-charcoal/50">
                  <Badge variant="muted">{v.status}</Badge> {timeAgo(v.scheduled_at)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Favoris. */}
      <Section
        title="Favoris"
        description={`${u.favorites.length} annonce${u.favorites.length > 1 ? "s" : ""} sauvegardée${u.favorites.length > 1 ? "s" : ""}`}
      >
        {u.favorites.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-6">
            <EmptyState title="Aucun favori" description="Cet utilisateur n'a sauvegardé aucune annonce." />
          </div>
        ) : (
          <ul className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border bg-white">
            {u.favorites.map((f) => (
              <li key={f.propertyId} className="flex items-center justify-between gap-4 px-5 py-3">
                <Link href={`/admin/properties/${f.propertyId}`} className="truncate text-sm font-medium text-forest underline-offset-4 hover:underline">
                  {f.address}
                </Link>
                <span className="shrink-0 text-xs text-charcoal/50">{timeAgo(f.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Demandes de service. */}
      <Section
        title="Demandes de service"
        description={`${u.serviceRequests.length} demande${u.serviceRequests.length > 1 ? "s" : ""}`}
      >
        {u.serviceRequests.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-6">
            <EmptyState title="Aucune demande" description="Cet utilisateur n'a fait aucune demande de service." />
          </div>
        ) : (
          <ul className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border bg-white">
            {u.serviceRequests.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-4 px-5 py-3">
                <Link href={`/admin/requests/${r.id}`} className="block truncate text-sm font-medium text-forest underline-offset-4 hover:underline">
                  {serviceRequestName(r.service_id, r.project_name)}
                </Link>
                <span className="shrink-0 text-xs text-charcoal/50">{timeAgo(r.created_at)}</span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Historique administratif. */}
      <Section title="Historique administratif" description="Décisions enregistrées dans le journal d'audit.">
        <div className="rounded-2xl border border-border bg-white p-5">
          <AuditTimeline entries={u.audit} />
        </div>
      </Section>
    </div>
  );
}
