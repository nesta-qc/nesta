import type { Metadata } from "next";
import { getProspects } from "@/actions/prospects";
import { getProLeads } from "@/actions/pro";
import { ProspectsTable } from "@/components/admin/ProspectsTable";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prospection",
  description: "Liste des promoteurs et développeurs à contacter pour Nesta.",
};

/**
 * Onglet Prospection du centre de contrôle : liste des promoteurs
 * et développeurs immobiliers à contacter pour publier leurs projets
 * sur Nesta, avec suivi du statut de chaque contact.
 */
export default async function AdminProspectionPage() {
  const prospects = await getProspects();
  const proLeads = await getProLeads();

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
        NESTA Admin
      </p>
      <h1 className="mt-1 font-display text-3xl text-charcoal">Prospection</h1>
      <p className="mt-1 text-sm text-charcoal/60">
        {prospects.length === 0
          ? "Aucun prospect pour le moment."
          : `${prospects.length} prospect${prospects.length > 1 ? "s" : ""} en suivi.`}
      </p>

      {proLeads.length > 0 ? (
        <section className="mt-8">
          <h2 className="font-display text-xl text-charcoal">
            Demandes NESTA Pro ({proLeads.length})
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

      <div className="mt-6">
        <ProspectsTable initialProspects={prospects} />
      </div>
    </div>
  );
}
