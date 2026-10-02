import type { Metadata } from "next";
import Link from "next/link";
import {
  getOverviewStats,
  getCommandCenter,
  getRecentActivity,
} from "@/actions/admin";
import { getRevenueStats } from "@/actions/revenue";
import { getVercelTraffic } from "@/lib/vercel-analytics";
import { activityKindLabel } from "@/components/admin/format";
import { ADMIN_PERIODS, isAdminPeriod } from "@/lib/admin";
import { StatCard } from "@/components/admin/StatCard";
import { Section } from "@/components/admin/Section";
import { EmptyState } from "@/components/ui";
import { timeAgo } from "@/components/admin/format";
import { formatNumber } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vue d’ensemble",
  description: "Tableau de bord du centre de contrôle VEYLA.",
};

/* ============================================================
 * VEYLA Admin — Vue d'ensemble.
 * 100 % données réelles : compteurs SQL, activité dérivée des
 * tables, empty states quand il n'y a rien à montrer.
 * ============================================================ */

export default async function AdminOverviewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const rawPeriod = Array.isArray(sp.period) ? sp.period[0] : sp.period;
  const period = isAdminPeriod(rawPeriod) ? rawPeriod : "30d";

  const [stats, command, activity, revenue] = await Promise.all([
    getOverviewStats(period),
    getCommandCenter(),
    getRecentActivity(20),
    getRevenueStats(),
  ]);

  /* Trafic Vercel Analytics : fenêtre plafonnée à 30 jours (plan Hobby). */
  const trafficDays =
    period === "today" ? 1 : period === "7d" ? 7 : 30;
  const traffic = await getVercelTraffic(trafficDays);
  const trafficLabel =
    period === "today"
      ? "aujourd’hui"
      : period === "7d"
        ? "7 derniers jours"
        : "30 derniers jours";

  const periodLabel =
    ADMIN_PERIODS.find((p) => p.id === period)?.label ?? "30 jours";

  return (
    <div>
      {/* En-tête + filtre temporel. */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
            VEYLA Admin
          </p>
          <h1 className="mt-1 font-display text-3xl text-charcoal">
            Vue d’ensemble
          </h1>
        </div>
        <nav aria-label="Période" className="flex flex-wrap gap-1.5">
          {ADMIN_PERIODS.map((p) => (
            <Link
              key={p.id}
              href={`/admin?period=${p.id}`}
              aria-current={p.id === period ? "true" : undefined}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                p.id === period
                  ? "bg-forest text-white"
                  : "border border-border bg-white text-charcoal/70 hover:border-forest"
              }`}
            >
              {p.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Cartes statistiques. */}
      <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard
          label="Utilisateurs"
          value={formatNumber(stats?.usersTotal ?? 0)}
          sub={
            stats
              ? `+${formatNumber(stats.usersNew)} sur ${periodLabel.toLowerCase()}`
              : "Données indisponibles"
          }
        />
        <StatCard
          label="Propriétés actives"
          value={formatNumber(stats?.propertiesActive ?? 0)}
          sub={
            stats
              ? `+${formatNumber(stats.propertiesNew)} créées sur ${periodLabel.toLowerCase()}`
              : "Données indisponibles"
          }
        />
        <StatCard
          label="Leads"
          value={formatNumber(stats?.leadsNew ?? 0)}
          sub={
            stats
              ? `${formatNumber(stats.leadsPending)} sans réponse`
              : "Données indisponibles"
          }
          subTone={stats && stats.leadsPending > 0 ? "warn" : "default"}
        />
        <Link href="/admin/revenus" className="block rounded-2xl transition-transform hover:-translate-y-0.5">
          <StatCard
            label="Revenus"
            value={`${(revenue.totalCents / 100).toLocaleString("fr-CA", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} $`}
            sub={
              !revenue.hasTable
                ? "Registre à initialiser (migration 000015)"
                : revenue.count === 0
                  ? "Aucun encaissement — voir l'onglet Revenus"
                  : `${revenue.count} encaissement${revenue.count > 1 ? "s" : ""} — voir le détail`
            }
          />
        </Link>
      </div>

      {/* Trafic web — Vercel Analytics. */}
      <Section
        title="Trafic web"
        description={`Données Vercel Analytics du site public — ${trafficLabel}.`}
      >
        {!traffic ? (
          <div className="rounded-2xl border border-border bg-white p-6">
            <EmptyState
              title="Données non disponibles"
              description="Le suivi Vercel Analytics n'est pas encore configuré ou aucune visite n'a été enregistrée."
            />
          </div>
        ) : (
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
                    Visiteurs
                  </p>
                  <p className="mt-1 font-display text-3xl text-charcoal">
                    {formatNumber(traffic.visitors)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
                    Pages vues
                  </p>
                  <p className="mt-1 font-display text-3xl text-charcoal">
                    {formatNumber(traffic.pageviews)}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs text-charcoal/55">
                Source : Vercel Analytics (sans cookies, conforme Loi 25).
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
                Pages les plus visitées
              </p>
              {traffic.topPages.length === 0 ? (
                <p className="mt-3 text-sm text-charcoal/55">
                  Aucune page enregistrée pour l’instant.
                </p>
              ) : (
                <ul className="mt-3 divide-y divide-border/60">
                  {traffic.topPages.map((p) => (
                    <li
                      key={p.path}
                      className="flex items-center justify-between gap-4 py-2"
                    >
                      <span className="truncate font-mono text-sm text-charcoal">
                        {p.path}
                      </span>
                      <span className="shrink-0 text-xs text-charcoal/55">
                        {formatNumber(p.pageviews)} vues
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </Section>

      {/* Command Center. */}
      <Section
        title="À traiter"
        description="Ce qui nécessite votre attention ce matin."
      >
        {command.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-6">
            <EmptyState
              title="Rien à traiter"
              description="Aucune annonce en attente ni demande de service sans réponse."
            />
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {command.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex items-center justify-between rounded-2xl border border-champagne/40 bg-white p-5 transition-colors hover:border-champagne"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-champagne/20 font-display text-xl text-charcoal">
                    {item.count}
                  </span>
                  <span className="text-sm font-medium text-charcoal">
                    {item.label}
                  </span>
                </div>
                <span
                  aria-hidden
                  className="text-charcoal/40 transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        )}
      </Section>

      {/* Activité récente. */}
      <Section
        title="Activité récente"
        description="Derniers événements réels de la plateforme."
      >
        {activity.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-6">
            <EmptyState
              title="Aucune activité"
              description="Les inscriptions, annonces, demandes et interactions apparaîtront ici."
            />
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-white">
            <ul className="divide-y divide-border/60">
              {activity.map((e) => (
                <li key={e.key}>
                  <Link
                    href={e.href}
                    className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-ivory"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-champagne">
                        {activityKindLabel(e.kind)}
                      </p>
                      <p className="mt-0.5 truncate text-sm font-medium text-charcoal">
                        {e.title}
                      </p>
                      <p className="truncate text-xs text-charcoal/55">
                        {e.detail}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-xs text-charcoal/50">
                        {timeAgo(e.at)}
                      </span>
                      <span aria-hidden className="text-sm text-charcoal/35">
                        →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </div>
  );
}
