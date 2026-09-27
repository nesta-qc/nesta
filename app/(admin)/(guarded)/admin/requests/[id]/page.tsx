import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceRequestDetail } from "@/actions/admin";
import {
  RequestStatusChanger,
  RequestNoteEditor,
  RequestStatusBadge,
} from "@/components/admin/RequestManager";
import { AuditTimeline } from "@/components/admin/AuditTimeline";
import { Section } from "@/components/admin/Section";
import { displayNameOr, serviceRequestName, timeAgo } from "@/components/admin/format";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Détail de la demande",
  description: "Détail d'une demande de service NESTA.",
};

export default async function AdminRequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getServiceRequestDetail(id);
  if (!result) notFound();
  const r = result.request;
  const audit = result.audit;

  const serviceName = serviceRequestName(r.service_id, r.project_name);

  const facts: Array<[string, string]> = [
    ["Service", serviceName],
    ["Demandeur", displayNameOr(r.contact_name)],
    ["Courriel", r.contact_email ?? "—"],
    ["Téléphone", r.contact_phone ?? "—"],
    ["Projet", r.project_name || "—"],
    ["Demande faite", `${formatDate(r.created_at)} (${timeAgo(r.created_at)})`],
    ["Identifiant", r.id],
  ];

  return (
    <div>
      <Link
        href="/admin/requests"
        className="text-sm font-medium text-forest underline-offset-4 hover:underline"
      >
        ← Toutes les demandes
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl text-charcoal">{serviceName}</h1>
        <RequestStatusBadge status={r.status} />
      </div>
      <p className="mt-1 text-sm text-charcoal/60">
        {displayNameOr(r.contact_name)} · {timeAgo(r.created_at)}
      </p>

      {/* Gestion. */}
      <Section title="Gestion">
        <div className="grid gap-6 rounded-2xl border border-border bg-white p-5 md:grid-cols-2">
          <RequestStatusChanger id={r.id} status={r.status} />
          <RequestNoteEditor id={r.id} initialNote={r.admin_note} />
        </div>
      </Section>

      {/* Coordonnées. */}
      <Section title="Coordonnées du demandeur">
        <dl className="overflow-hidden rounded-2xl border border-border bg-white">
          {facts.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-border/60 px-5 py-3 text-sm last:border-0">
              <dt className="text-charcoal/55">{k}</dt>
              <dd className="break-all text-right font-medium text-charcoal">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Description. */}
      <Section title="Description de la demande">
        <div className="rounded-2xl border border-border bg-white p-5">
          {r.description ? (
            <p className="whitespace-pre-line text-sm text-charcoal/80">{r.description}</p>
          ) : (
            <p className="text-sm text-charcoal/50">Aucune description fournie.</p>
          )}
        </div>
      </Section>

      {/* Historique administratif. */}
      <Section title="Historique administratif" description="Décisions enregistrées dans le journal d'audit.">
        <div className="rounded-2xl border border-border bg-white p-5">
          <AuditTimeline entries={audit} />
        </div>
      </Section>
    </div>
  );
}
