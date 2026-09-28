import type { Metadata } from "next";
import { getProspects } from "@/actions/prospects";
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

      <div className="mt-6">
        <ProspectsTable initialProspects={prospects} />
      </div>
    </div>
  );
}
