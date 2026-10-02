import type { Metadata } from "next";
import { getCrmOverview } from "@/actions/crm";
import { getProLeads } from "@/actions/pro";
import { getProWaitlist } from "@/actions/pro-waitlist";
import { CrmKpis } from "@/components/admin/CrmKpis";
import { CrmChart } from "@/components/admin/CrmChart";
import { CrmBoard } from "@/components/admin/CrmBoard";
import { CsvImport } from "@/components/admin/CsvImport";
import { EmailTemplates } from "@/components/admin/EmailTemplates";
import { SendBatches } from "@/components/admin/SendBatches";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prospection",
  description: "CRM de prospection Veyla : pipeline, relances, modèles d’emails et lots d’envoi.",
};

/**
 * Onglet Prospection du centre de contrôle : vrai CRM commercial.
 * - KPIs + graphique du pipeline (valeur pondérée par probabilité) ;
 * - tableau / kanban des prospects avec filtres, tri, actions groupées ;
 * - import CSV, modèles d’emails, lots d’envoi à approbation manuelle ;
 * - demandes VEYLA Pro et liste d’attente pros (sections existantes).
 */
export default async function AdminProspectionPage() {
  const [overview, proLeads, waitlist] = await Promise.all([
    getCrmOverview(),
    getProLeads(),
    getProWaitlist(),
  ]);

  if (!overview) {
    return (
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
          VEYLA Admin
        </p>
        <h1 className="mt-1 font-display text-3xl text-charcoal">Prospection</h1>
        <p className="mt-4 text-sm text-charcoal/60">
          Impossible de charger le CRM. Vérifie que la migration{" "}
          <code className="rounded bg-sand px-1.5 py-0.5 text-xs">
            000023_crm_prospection.sql
          </code>{" "}
          a été appliquée dans Supabase.
        </p>
      </div>
    );
  }

  const { prospects, kpis, chart, templates, batches, emailMap } = overview;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
        VEYLA Admin
      </p>
      <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="font-display text-3xl text-charcoal">Prospection</h1>
        <nav aria-label="Sections" className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <a href="#pipeline" className="font-medium text-forest hover:underline">Pipeline</a>
          <a href="#import" className="font-medium text-forest hover:underline">Import CSV</a>
          <a href="#modeles" className="font-medium text-forest hover:underline">Modèles</a>
          <a href="#lots" className="font-medium text-forest hover:underline">Lots d’envoi</a>
        </nav>
      </div>
      <p className="mt-1 text-sm text-charcoal/60">
        {prospects.length === 0
          ? "Aucun prospect pour le moment — importe un CSV pour commencer."
          : `${prospects.length} prospect${prospects.length > 1 ? "s" : ""} en suivi.`}
      </p>

      {/* KPIs */}
      <div className="mt-6">
        <CrmKpis kpis={kpis} />
      </div>

      {/* Graphique pipeline */}
      <section id="pipeline" aria-label="Évolution du pipeline" className="mt-6 scroll-mt-6 rounded-2xl border border-border bg-white p-5">
        <h2 className="font-display text-xl text-charcoal">Pipeline — 30 derniers jours</h2>
        <div className="mt-3">
          <CrmChart days={chart} />
        </div>
      </section>

      {/* Tableau / Kanban */}
      <section aria-label="Prospects" className="mt-6">
        <CrmBoard prospects={prospects} templates={templates} />
      </section>

      {/* Import CSV */}
      <section id="import" aria-label="Import CSV" className="mt-8 scroll-mt-6">
        <h2 className="font-display text-xl text-charcoal">Import CSV</h2>
        <p className="mt-1 text-sm text-charcoal/60">
          Ajoute des centaines de prospects d’un coup. Les doublons sur
          (entreprise, courriel) sont ignorés.
        </p>
        <div className="mt-3">
          <CsvImport />
        </div>
      </section>

      {/* Modèles d'emails */}
      <section id="modeles" aria-label="Modèles d’emails" className="mt-8 scroll-mt-6">
        <h2 className="font-display text-xl text-charcoal">Modèles d’emails</h2>
        <p className="mt-1 text-sm text-charcoal/60">
          Séquence de prospection VEYLA Projets : pilote gratuit 3 mois, puis
          4 800 $/an par projet, sans commission en pourcentage.
        </p>
        <div className="mt-3">
          <EmailTemplates templates={templates} />
        </div>
      </section>

      {/* Lots d'envoi */}
      <section id="lots" aria-label="Lots d’envoi" className="mt-8 scroll-mt-6">
        <h2 className="font-display text-xl text-charcoal">Lots d’envoi</h2>
        <p className="mt-1 text-sm text-charcoal/60">
          File d’approbation : un lot approuvé est prêt à être envoyé
          manuellement via Gmail — aucun envoi automatique.
        </p>
        <div className="mt-3">
          <SendBatches batches={batches} templates={templates} emailMap={emailMap} />
        </div>
      </section>

      {proLeads.length > 0 ? (
        <section className="mt-8">
          <h2 className="font-display text-xl text-charcoal">
            Demandes VEYLA Pro ({proLeads.length})
          </h2>
          <p className="mt-1 text-sm text-charcoal/60">
            Promoteurs arrivés via le formulaire du site — à recontacter sous
            48 h.
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {proLeads.map((lead) => (
              <li
                key={lead.id}
                className="rounded-xl border border-border bg-white p-4 text-sm"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-charcoal">
                    {lead.name}
                    {lead.company ? (
                      <span className="font-normal text-charcoal/55">
                        {" "}
                        — {lead.company}
                      </span>
                    ) : null}
                  </p>
                  <p className="text-xs text-charcoal/45">
                    {new Date(lead.created_at).toLocaleDateString("fr-CA", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <a
                  href={`mailto:${lead.email}`}
                  className="mt-1 block text-forest hover:underline"
                >
                  {lead.email}
                </a>
                {lead.message ? (
                  <p className="mt-2 text-charcoal/70">{lead.message}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {waitlist.length > 0 ? (
        <section className="mt-8">
          <h2 className="font-display text-xl text-charcoal">
            Liste d&apos;attente pros ({waitlist.length})
          </h2>
          <p className="mt-1 text-sm text-charcoal/60">
            Professionnels inscrits depuis /pro — à inviter à l&apos;ouverture
            de l&apos;espace partenaires.
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {waitlist.map((entry) => (
              <li
                key={entry.id}
                className="flex flex-wrap items-baseline justify-between gap-2 rounded-xl border border-border bg-white p-4 text-sm"
              >
                <p>
                  <a
                    href={`mailto:${entry.email}`}
                    className="font-semibold text-forest hover:underline"
                  >
                    {entry.email}
                  </a>
                  <span className="text-charcoal/55">
                    {" "}
                    — {entry.profession}
                  </span>
                </p>
                <p className="text-xs text-charcoal/45">
                  {new Date(entry.created_at).toLocaleDateString("fr-CA", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
