import { formatMoney } from "@/lib/crm";
import type { CrmKpis } from "@/actions/crm";

/*
 * Bandeau de KPIs du CRM de prospection (rendu serveur).
 * La valeur du pipeline est pondérée par la probabilité de
 * conversion de chaque étape (voir lib/crm.ts).
 */

function KpiCard({
  label,
  value,
  sub,
  highlight,
  big,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  big?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border bg-white p-4 ${
        highlight ? "border-champagne/70 shadow-sm" : "border-border"
      }`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-charcoal/50">
        {label}
      </p>
      <p
        className={`mt-1.5 font-display ${
          big ? "text-3xl md:text-4xl" : "text-2xl"
        } ${highlight ? "text-champagne" : "text-charcoal"}`}
      >
        {value}
      </p>
      {sub ? <p className="mt-1 text-xs text-charcoal/55">{sub}</p> : null}
    </div>
  );
}

export function CrmKpis({ kpis }: { kpis: CrmKpis }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      <KpiCard
        label="Valeur pipeline (pondérée)"
        value={formatMoney(kpis.pipelineCents)}
        sub="Probabilité × 4 800 $/projet"
        highlight
        big
      />
      <KpiCard
        label="Prospects"
        value={kpis.total.toLocaleString("fr-CA")}
        sub="en suivi"
      />
      <KpiCard
        label="À relancer"
        value={kpis.aRelancer.toLocaleString("fr-CA")}
        sub="relance dépassée"
        highlight={kpis.aRelancer > 0}
      />
      <KpiCard
        label="Taux de réponse"
        value={`${kpis.tauxReponse} %`}
        sub="réponses / prospects contactés"
      />
      <KpiCard
        label="RDV à venir"
        value={kpis.rdvAVenir.toLocaleString("fr-CA")}
        sub="rendez-vous planifiés"
      />
    </div>
  );
}
