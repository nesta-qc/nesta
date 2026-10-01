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
}

/**
 * Courbe de valeur année par année, en SVG pur (aucune dépendance).
 * Passé reconstitué en trait plein, scénario futur en pointillés.
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
}: Props) {
  const fmt = new Intl.NumberFormat(lang === "fr" ? "fr-CA" : "en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  });
  const fmtCourt = (v: number) =>
    v >= 1_000_000
      ? `${(v / 1_000_000).toLocaleString(lang === "fr" ? "fr-CA" : "en-CA", { maximumFractionDigits: 1 })} M$`
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

  // Étiquettes d'années : ~6 repères max.
  const pasAnnee = Math.max(1, Math.ceil(points.length / 6));
  const ticksY = [0, 1, 2, 3].map((i) => yMin + ((yMax - yMin) * i) / 3);

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`${points[0].annee}–${points[points.length - 1].annee} : ${fmt.format(min)} → ${fmt.format(max)}`}
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
        <circle cx={x(points.indexOf(actuel))} cy={y(actuel.valeur)} r="5" fill="#1D3A5F" stroke="#fff" strokeWidth="2" />
        {points.map((p, i) =>
          i % pasAnnee === 0 || i === points.length - 1 ? (
            <text
              key={p.annee}
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
