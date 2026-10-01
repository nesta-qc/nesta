"use client";

import { useState } from "react";
import type { PointCourbe } from "@/lib/analyse/historique";

interface Props {
  points: PointCourbe[];
  lang: "fr" | "en";
  legendePasse: string;
  legendeActuel: string;
  legendeScenario: string;
  detailsLabel: string;
  anneeLabel: string;
  valeurLabel: string;
  infobulleScenario: string;
  variationAnnee: string;
  consigneSurvol: string;
}

/**
 * Courbe de valeur année par année, en SVG pur (aucune dépendance).
 * Passé reconstitué en trait plein, scénario futur en pointillés.
 * Chaque année est un point interactif : survol (souris) ou toucher
 * (mobile) affiche une infobulle avec la valeur de l'année.
 */
export function CourbeValeur({
  points,
  lang,
  legendePasse,
  legendeActuel,
  legendeScenario,
  detailsLabel,
  anneeLabel,
  valeurLabel,
  infobulleScenario,
  variationAnnee,
  consigneSurvol,
}: Props) {
  const [actif, setActif] = useState<number | null>(null);
  const locale = lang === "fr" ? "fr-CA" : "en-CA";
  const fmt = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  });
  const fmtPct = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  });
  const fmtCourt = (v: number) =>
    v >= 1_000_000
      ? `${(v / 1_000_000).toLocaleString(locale, { maximumFractionDigits: 1 })} M$`
      : `${Math.round(v / 1000)} k$`;

  const W = 680;
  const H = 340;
  const PAD = { l: 62, r: 14, t: 14, b: 34 };
  const valeurs = points.map((p) => p.valeur);
  const min = Math.min(...valeurs);
  const max = Math.max(...valeurs);
  const marge = (max - min) * 0.12 || max * 0.05;
  const yMin = Math.max(0, min - marge);
  const yMax = max + marge;

  const x = (i: number) => PAD.l + (i / (points.length - 1)) * (W - PAD.l - PAD.r);
  const y = (v: number) => PAD.t + (1 - (v - yMin) / (yMax - yMin)) * (H - PAD.t - PAD.b);

  const passe = points.filter((p) => p.type !== "scenario");
  // Le scénario repart du point actuel pour une jonction continue.
  const actuel = points.find((p) => p.type === "actuel")!;
  const ligneScenario = [actuel, ...points.filter((p) => p.type === "scenario")];

  const chemin = (pts: PointCourbe[]) =>
    pts.map((p) => `${x(points.indexOf(p)).toFixed(1)},${y(p.valeur).toFixed(1)}`).join(" ");

  const ticksY = [0, 1, 2, 3].map((i) => yMin + ((yMax - yMin) * i) / 3);

  const pointActif = actif !== null ? points[actif] : null;
  const variationActive =
    actif !== null && actif > 0 && points[actif].type !== "scenario"
      ? points[actif].valeur / points[actif - 1].valeur - 1
      : null;

  // Position de l'infobulle en % du conteneur (même référentiel que le SVG).
  const bulleGauchePct = pointActif ? (x(actif!) / W) * 100 : 0;
  const bulleHautPct = pointActif ? (y(pointActif.valeur) / H) * 100 : 0;
  const ancrage =
    actif !== null && actif <= 1
      ? "translate-x-0"
      : actif !== null && actif >= points.length - 2
        ? "-translate-x-full"
        : "-translate-x-1/2";

  const bascule = (i: number) => setActif((a) => (a === i ? null : i));

  return (
    <div>
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label={`${points[0].annee}–${points[points.length - 1].annee} : ${fmt.format(min)} → ${fmt.format(max)}`}
          onMouseLeave={() => setActif(null)}
        >
          {ticksY.map((v, i) => (
            <g key={i}>
              <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} stroke="#1D3A5F" strokeOpacity="0.08" />
              <text x={PAD.l - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#1D3A5F" opacity="0.55">
                {fmtCourt(v)}
              </text>
            </g>
          ))}
          <polyline
            points={chemin(passe)}
            fill="none"
            stroke="#1D3A5F"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <polyline
            points={chemin(ligneScenario)}
            fill="none"
            stroke="#B98A2F"
            strokeWidth="2.5"
            strokeDasharray="7 5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Points visibles */}
          {points.map((p, i) =>
            p.type === "actuel" ? (
              <circle
                key={p.annee}
                cx={x(i)}
                cy={y(p.valeur)}
                r={actif === i ? 7 : 5}
                fill="#1D3A5F"
                stroke="#fff"
                strokeWidth="2"
                className="pointer-events-none"
              />
            ) : (
              <circle
                key={p.annee}
                cx={x(i)}
                cy={y(p.valeur)}
                r={actif === i ? 6 : 3}
                fill={p.type === "scenario" ? "#fff" : "#1D3A5F"}
                stroke={p.type === "scenario" ? "#B98A2F" : "none"}
                strokeWidth={p.type === "scenario" ? 2 : 0}
                className="pointer-events-none"
              />
            ),
          )}
          {/* Zones de survol / toucher : une par année */}
          {points.map((p, i) => (
            <circle
              key={`hit-${p.annee}`}
              cx={x(i)}
              cy={y(p.valeur)}
              r="14"
              fill="transparent"
              className="cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label={`${p.annee} : ${fmt.format(p.valeur)}`}
              onMouseEnter={() => setActif(i)}
              onFocus={() => setActif(i)}
              onBlur={() => setActif(null)}
              onClick={() => bascule(i)}
            />
          ))}
          {points.map((p, i) =>
            i === 0 || p.annee % 4 === 0 || i === points.length - 1 ? (
              <text
                key={`t-${p.annee}`}
                x={x(i)}
                y={H - 12}
                textAnchor="middle"
                fontSize="11"
                fill="#1D3A5F"
                opacity="0.55"
              >
                {p.annee}
              </text>
            ) : null,
          )}
        </svg>

        {pointActif && (
          <div
            className={`pointer-events-none absolute z-10 -translate-y-full ${ancrage} mb-3 rounded-lg border border-charcoal/10 bg-white px-3 py-2 shadow-lg`}
            style={{ left: `${bulleGauchePct}%`, top: `${bulleHautPct}%` }}
          >
            <div className="text-xs font-semibold text-charcoal">{pointActif.annee}</div>
            <div className="whitespace-nowrap text-sm font-bold tabular-nums text-forest">
              {fmt.format(pointActif.valeur)}
            </div>
            {variationActive !== null ? (
              <div className="whitespace-nowrap text-xs tabular-nums text-charcoal/60">
                {fmtPct.format(variationActive)} {variationAnnee}
              </div>
            ) : (
              <div className="whitespace-nowrap text-xs text-charcoal/60">{infobulleScenario}</div>
            )}
          </div>
        )}
      </div>

      <p className="mt-2 text-xs text-charcoal/50">{consigneSurvol}</p>

      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-charcoal/60">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-6 bg-[#1D3A5F]" /> {legendePasse}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-[#1D3A5F]" /> {legendeActuel}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0 w-6 border-t-2 border-dashed border-[#B98A2F]" /> {legendeScenario}
        </span>
      </div>

      <details className="mt-3 text-sm">
        <summary className="cursor-pointer text-forest underline underline-offset-2">{detailsLabel}</summary>
        <table className="mt-2 w-full max-w-sm text-left text-[13px]">
          <thead>
            <tr className="text-charcoal/50">
              <th className="py-1 pr-4 font-medium">{anneeLabel}</th>
              <th className="py-1 font-medium">{valeurLabel}</th>
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={p.annee} className="border-t border-charcoal/10">
                <td className="py-1 pr-4 tabular-nums">{p.annee}</td>
                <td className="py-1 tabular-nums">{fmt.format(p.valeur)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
