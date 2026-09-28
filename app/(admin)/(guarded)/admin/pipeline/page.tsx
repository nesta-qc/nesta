import type { Metadata } from "next";
import { getPipelineServiceRequests } from "@/actions/admin";
import { PipelineBoard } from "@/components/admin/PipelineBoard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pipeline des devis",
  description: "Suivi visuel des demandes de devis : reçus, intéressés, négo.",
};

/**
 * Onglet Pipeline du centre de contrôle : kanban des demandes de devis
 * avec glisser-déposer entre les étapes (Devis reçus → Intéressés →
 * Négo → En cours → Livré / Annulé).
 */
export default async function AdminPipelinePage() {
  const items = await getPipelineServiceRequests();

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
        NESTA Admin
      </p>
      <h1 className="mt-1 font-display text-3xl text-charcoal">
        Pipeline des devis
      </h1>
      <p className="mt-1 text-sm text-charcoal/60">
        {items.length === 0
          ? "Aucune demande pour le moment."
          : `${items.length} demande${items.length > 1 ? "s" : ""} en suivi.`}
      </p>

      <div className="mt-6">
        <PipelineBoard initialItems={items} />
      </div>
    </div>
  );
}
