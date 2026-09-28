"use client";

import {
  REVENUE_CATEGORIES,
  revenueCategoryLabel,
} from "@/lib/revenue";

/*
 * Graphique en barres des revenus par catégorie (abonnement/forfait).
 * SVG pur, aucune dépendance : montants réels issus de revenue_events.
 */

function formatDollars(cents: number): string {
  return `${Math.round(cents / 100).toLocaleString("fr-CA")} $`;
}

export function RevenueChart({
  byCategory,
}: {
  byCategory: { category: string; totalCents: number; count: number }[];
}) {
  const data = REVENUE_CATEGORIES.map((c) => {
    const found = byCategory.find((b) => b.category === c.id);
    return {
      id: c.id,
      label: revenueCategoryLabel(c.id),
      detail: c.detail,
      totalCents: found?.totalCents ?? 0,
      count: found?.count ?? 0,
    };
  });

  const max = Math.max(1, ...data.map((d) => d.totalCents));
  const W = 560;
  const H = 260;
  const PAD_B = 56;
  const PAD_T = 28;
  const chartH = H - PAD_B - PAD_T;
  const n = data.length;
  const slot = W / n;
  const barW = Math.min(72, slot * 0.55);

  return (
    <figure>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Revenus par catégorie"
        className="w-full"
      >
        {[0.25, 0.5, 0.75, 1].map((f) => {
          const y = PAD_T + chartH * (1 - f);
          return (
            <g key={f}>
              <line
                x1={0}
                x2={W}
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeOpacity={0.12}
                strokeDasharray="3 4"
              />
              <text
                x={W - 4}
                y={y - 4}
                textAnchor="end"
                fontSize={10}
                fill="currentColor"
                opacity={0.5}
              >
                {formatDollars(max * f)}
              </text>
            </g>
          );
        })}

        {data.map((d, i) => {
          const h = Math.max(d.totalCents > 0 ? 4 : 0, (d.totalCents / max) * chartH);
          const x = i * slot + (slot - barW) / 2;
          const y = PAD_T + chartH - h;
          return (
            <g key={d.id}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={h}
                rx={6}
                fill={d.totalCents > 0 ? "#2f4a3c" : "currentColor"}
                fillOpacity={d.totalCents > 0 ? 1 : 0.08}
              />
              {d.totalCents > 0 ? (
                <text
                  x={x + barW / 2}
                  y={y - 8}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={700}
                  fill="#2f4a3c"
                >
                  {formatDollars(d.totalCents)}
                </text>
              ) : null}
              <text
                x={x + barW / 2}
                y={H - 36}
                textAnchor="middle"
                fontSize={12}
                fontWeight={600}
                fill="currentColor"
              >
                {d.label}
              </text>
              <text
                x={x + barW / 2}
                y={H - 20}
                textAnchor="middle"
                fontSize={10}
                fill="currentColor"
                opacity={0.55}
              >
                {d.count === 0
                  ? "—"
                  : `${d.count} encaissement${d.count > 1 ? "s" : ""}`}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-xs text-charcoal/50">
        Forfaits vendeur LIST / SELL / SIGNATURE, prestations de service et
        autres encaissements réels.
      </figcaption>
    </figure>
  );
}

/** Mini-barres des 6 derniers mois. */
export function RevenueTrend({
  byMonth,
}: {
  byMonth: { month: string; label: string; totalCents: number }[];
}) {
  const max = Math.max(1, ...byMonth.map((m) => m.totalCents));
  return (
    <div
      role="img"
      aria-label="Revenus des 6 derniers mois"
      className="flex items-end gap-2"
    >
      {byMonth.map((m) => {
        const h = Math.max(m.totalCents > 0 ? 6 : 2, (m.totalCents / max) * 96);
        return (
          <div key={m.month} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[10px] font-semibold text-charcoal/70">
              {m.totalCents > 0 ? `${Math.round(m.totalCents / 100)} $` : ""}
            </span>
            <div
              style={{ height: h }}
              className={`w-full rounded-t-md ${
                m.totalCents > 0 ? "bg-champagne" : "bg-charcoal/10"
              }`}
              title={`${m.label} : ${formatDollars(m.totalCents)}`}
            />
            <span className="text-[10px] text-charcoal/50">{m.label}</span>
          </div>
        );
      })}
    </div>
  );
}
