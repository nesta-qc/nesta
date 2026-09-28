import type { Metadata } from "next";
import { getRevenueStats } from "@/actions/revenue";
import { revenueCategoryLabel } from "@/lib/revenue";
import { StatCard } from "@/components/admin/StatCard";
import { Section } from "@/components/admin/Section";
import { RevenueChart, RevenueTrend } from "@/components/admin/RevenueChart";
import { RevenueForm } from "@/components/admin/RevenueForm";
import { EmptyState } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Revenus",
  description: "Revenus NESTA par catégorie : forfaits et services.",
};

function formatDollars(cents: number): string {
  return `${(cents / 100).toLocaleString("fr-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} $`;
}

/**
 * Onglet Revenus du centre de contrôle : graphique par catégorie
 * (LIST / SELL / SIGNATURE / Service / Autre), tendance 6 mois et
 * registre manuel des encaissements réels.
 */
export default async function AdminRevenuePage() {
  const stats = await getRevenueStats();

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
        NESTA Admin
      </p>
      <h1 className="mt-1 font-display text-3xl text-charcoal">Revenus</h1>
      <p className="mt-1 text-sm text-charcoal/60">
        Encaissements réels enregistrés, par catégorie.
      </p>

      {!stats.hasTable ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <EmptyState
            title="Registre des revenus non initialisé"
            description="Applique la migration 000015_revenue_events.sql dans Supabase pour activer le suivi des revenus."
          />
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <StatCard
              label="Total encaissé"
              value={formatDollars(stats.totalCents)}
              sub={
                stats.count === 0
                  ? "Aucun encaissement enregistré"
                  : `${stats.count} encaissement${stats.count > 1 ? "s" : ""}`
              }
            />
            <StatCard
              label="Ce mois-ci"
              value={formatDollars(stats.monthCents)}
            />
            <StatCard
              label="Transactions"
              value={String(stats.count)}
              sub="Depuis le début du suivi"
            />
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white p-6 lg:col-span-2">
              <h2 className="font-display text-xl text-charcoal">
                Revenus par catégorie
              </h2>
              <div className="mt-4 text-charcoal">
                <RevenueChart byCategory={stats.byCategory} />
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <h2 className="font-display text-xl text-charcoal">
                6 derniers mois
              </h2>
              <div className="mt-6">
                <RevenueTrend byMonth={stats.byMonth} />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Section
              title="Enregistrer un encaissement"
              description="Chaque vente réelle saisie ici alimente le graphique."
            >
              <div className="rounded-2xl border border-border bg-white p-6">
                <RevenueForm />
              </div>
            </Section>
            <Section
              title="Historique"
              description="Les 20 derniers encaissements enregistrés."
            >
              <div className="rounded-2xl border border-border bg-white p-6">
                {stats.recent.length === 0 ? (
                  <EmptyState
                    title="Aucun encaissement"
                    description="Utilise le formulaire pour enregistrer ta première vente."
                  />
                ) : (
                  <ul className="divide-y divide-border">
                    {stats.recent.map((r) => (
                      <li key={r.id} className="flex items-center justify-between gap-3 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-charcoal">
                            {r.label}
                          </p>
                          <p className="mt-0.5 text-xs text-charcoal/50">
                            {revenueCategoryLabel(r.category)} ·{" "}
                            {new Date(r.occurred_on + "T12:00:00").toLocaleDateString(
                              "fr-CA",
                              { day: "numeric", month: "short", year: "numeric" },
                            )}
                          </p>
                        </div>
                        <span className="shrink-0 text-sm font-semibold text-forest">
                          {formatDollars(r.amount_cents)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Section>
          </div>
        </>
      )}
    </div>
  );
}
