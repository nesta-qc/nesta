import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAdminPropertyDetail } from "@/actions/admin";
import { Badge, EmptyState } from "@/components/ui";
import { ModerationButtons } from "@/components/admin/ModerationButtons";
import { AuditTimeline } from "@/components/admin/AuditTimeline";
import { Section } from "@/components/admin/Section";
import { StatCard } from "@/components/admin/StatCard";
import { propertyMediaPublicUrl } from "@/lib/media";
import { timeAgo } from "@/components/admin/format";
import {
  formatDate,
  formatNumber,
  formatPrice,
  listingTypeLabel,
  propertyTypeLabel,
  statusBadgeVariant,
  statusLabel,
} from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Fiche propriété",
  description: "Détail d'une annonce VEYLA.",
};

export default async function AdminPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = await getAdminPropertyDetail(id);
  if (!detail) notFound();

  const p = detail.property;

  const facts: Array<[string, string]> = [
    ["Adresse", `${p.address}, ${p.city}`],
    ["Type", `${propertyTypeLabel(p.property_type)} · ${listingTypeLabel(p.listing_type)}`],
    ["Prix demandé", formatPrice(p.asking_price)],
    ["Chambres / Sdb", `${p.bedrooms ?? "—"} / ${p.bathrooms ?? "—"}`],
    ["Superficie habitable", p.living_area ? `${formatNumber(p.living_area)} pi²` : "—"],
    ["Terrain", p.lot_area ? `${formatNumber(p.lot_area)} pi²` : "—"],
    ["Année de construction", p.year_built ? String(p.year_built) : "—"],
    ["Vendeur", detail.ownerName ?? "—"],
    ["Créée le", formatDate(p.created_at)],
  ];

  return (
    <div>
      <Link
        href="/admin/properties"
        className="text-sm font-medium text-forest underline-offset-4 hover:underline"
      >
        ← Toutes les propriétés
      </Link>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl text-charcoal">{p.address}</h1>
            <Badge variant={statusBadgeVariant(p.status)}>
              {statusLabel(p.status)}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-charcoal/60">
            {p.city} · identifiant <span className="font-mono text-xs">{p.id}</span>
          </p>
        </div>
        <ModerationButtons id={p.id} status={p.status} />
      </div>

      {/* Stats d'intérêt. */}
      <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Favoris" value={formatNumber(detail.favoritesCount)} />
        <StatCard label="Visites demandées" value={formatNumber(detail.viewings.length)} />
        <StatCard label="Offres" value={formatNumber(detail.offers.length)} />
        <StatCard label="Documents" value={formatNumber(detail.documents.length)} />
      </div>

      {/* Photos + faits. */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Section title="Photos" description={`${detail.media.length} photo${detail.media.length > 1 ? "s" : ""}`}>
          {detail.media.length === 0 ? (
            <div className="rounded-2xl border border-border bg-white p-6">
              <EmptyState title="Aucune photo" description="Le vendeur n'a pas encore ajouté de photos." />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {detail.media.map((photo) => (
                <Image
                  key={photo.id}
                  src={propertyMediaPublicUrl(photo.storage_path)}
                  alt=""
                  width={240}
                  height={160}
                  className="aspect-[3/2] w-full rounded-xl object-cover"
                />
              ))}
            </div>
          )}
        </Section>

        <Section title="Caractéristiques">
          <dl className="overflow-hidden rounded-2xl border border-border bg-white">
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-border/60 px-5 py-3 text-sm last:border-0">
                <dt className="text-charcoal/55">{k}</dt>
                <dd className="text-right font-medium text-charcoal">{v}</dd>
              </div>
            ))}
          </dl>
          {detail.features.length > 0 ? (
            <div className="mt-4 rounded-2xl border border-border bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-charcoal/50">Détails</p>
              <dl className="mt-2 space-y-1.5">
                {detail.features.map((f, i) => (
                  <div key={i} className="flex justify-between gap-4 text-sm">
                    <dt className="text-charcoal/55">{f.feature_key}</dt>
                    <dd className="font-medium text-charcoal">{f.feature_value ?? "—"}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
          {p.description ? (
            <div className="mt-4 rounded-2xl border border-border bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-charcoal/50">Description</p>
              <p className="mt-2 whitespace-pre-line text-sm text-charcoal/80">{p.description}</p>
            </div>
          ) : null}
        </Section>
      </div>

      {/* Offres. */}
      <Section title="Offres reçues" description={`${detail.offers.length} offre${detail.offers.length > 1 ? "s" : ""}`}>
        {detail.offers.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-6">
            <EmptyState title="Aucune offre" description="Aucune offre n'a été déposée sur cette annonce." />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-charcoal/50">
                  <th scope="col" className="px-4 py-3 font-medium">Acheteur</th>
                  <th scope="col" className="px-4 py-3 font-medium">Montant</th>
                  <th scope="col" className="px-4 py-3 font-medium">Statut</th>
                  <th scope="col" className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {detail.offers.map((o) => (
                  <tr key={o.id} className="border-b border-border/60 last:border-0">
                    <td className="max-w-48 truncate px-4 py-3">{o.buyerName ?? "—"}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-medium">{formatPrice(o.amount)}</td>
                    <td className="px-4 py-3"><Badge variant="muted">{o.status}</Badge></td>
                    <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">{timeAgo(o.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      {/* Visites. */}
      <Section title="Visites" description={`${detail.viewings.length} demande${detail.viewings.length > 1 ? "s" : ""}`}>
        {detail.viewings.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-6">
            <EmptyState title="Aucune visite" description="Aucune demande de visite pour cette annonce." />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-charcoal/50">
                  <th scope="col" className="px-4 py-3 font-medium">Visiteur</th>
                  <th scope="col" className="px-4 py-3 font-medium">Statut</th>
                  <th scope="col" className="px-4 py-3 font-medium">Demandée</th>
                </tr>
              </thead>
              <tbody>
                {detail.viewings.map((v) => (
                  <tr key={v.id} className="border-b border-border/60 last:border-0">
                    <td className="max-w-48 truncate px-4 py-3">{v.buyerName ?? "—"}</td>
                    <td className="px-4 py-3"><Badge variant="muted">{v.status}</Badge></td>
                    <td className="whitespace-nowrap px-4 py-3 text-charcoal/70">{timeAgo(v.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      {/* Historique administratif. */}
      <Section title="Historique administratif" description="Décisions enregistrées dans le journal d'audit.">
        <div className="rounded-2xl border border-border bg-white p-5">
          <AuditTimeline entries={detail.audit} />
        </div>
      </Section>
    </div>
  );
}
