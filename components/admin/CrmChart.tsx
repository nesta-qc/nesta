import { formatMoney } from "@/lib/crm";
import type { ChartDay } from "@/actions/crm";

/*
 * Graphique du pipeline de prospection : valeur pondérée par jour
 * + activités (emails, appels, réponses, RDV) par jour, 30 derniers jours.
 * SVG pur, aucune dépendance.
 *
 * Deux sources de données :
 * - trait plein : instantanés réels (crm_snapshots, enregistrés à chaque
 *   visite de la page) ;
 * - pointillés : reconstitution « estimée » depuis les dates de création
 *   des prospects (mention honnête dans la légende).
 */

const W = 720;
const H = 300;
const PAD_L = 8;
const PAD_R = 52;
const PAD_T = 24;
const PAD_B = 34;
const CW = W - PAD_L - PAD_R;
const CH = H - PAD_T - PAD_B;

const FOREST = "#2f4a3c";
const GOLD = "#b98a2f";
const ESTIMATED = "#9db3a4";

export function CrmChart({ days }: { days: ChartDay[] }) {
  const n = days.length;
  if (n === 0) {
    return (
      <p className="py-8 text-center text-sm text-charcoal/50">
        Pas encore de données — reviens demain, l’instantané du jour sera
        enregistré.
      </p>
    );
  }

  const maxPipeline = Math.max(
    1,
    ...days.map((d) => Math.max(d.snapshotCents ?? 0, d.estimatedCents)),
  );
  const maxAct = Math.max(1, ...days.map((d) => d.activities));

  const x = (i: number) => PAD_L + (n === 1 ? CW / 2 : (i / (n - 1)) * CW);
  const yPipe = (v: number) => PAD_T + CH * (1 - v / maxPipeline);
  const yAct = (v: number) => PAD_T + CH * (1 - v / maxAct);

  const estimatedPath = days
    .map((d, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${yPipe(d.estimatedCents).toFixed(1)}`)
    .join(" ");

  /* Segments pleins uniquement entre jours avec instantané réel. */
  const realSegments: string[] = [];
  let run: string[] = [];
  days.forEach((d, i) => {
    if (d.snapshotCents !== null) {
      run.push(
        `${run.length === 0 ? "M" : "L"}${x(i).toFixed(1)},${yPipe(d.snapshotCents as number).toFixed(1)}`,
      );
    } else if (run.length > 0) {
      realSegments.push(run.join(" "));
      run = [];
    }
  });
  if (run.length > 0) realSegments.push(run.join(" "));

  const actPath = days
    .map((d, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${yAct(d.activities).toFixed(1)}`)
    .join(" ");

  const last = days[n - 1];
  const hasReal = days.some((d) => d.snapshotCents !== null);

  return (
    <figure>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Évolution du pipeline de prospection sur 30 jours"
        className="w-full"
      >
        {/* Grille horizontale */}
        {[0.25, 0.5, 0.75, 1].map((f) => {
          const y = PAD_T + CH * (1 - f);
          return (
            <g key={f}>
              <line
                x1={PAD_L}
                x2={W - PAD_R}
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeOpacity={0.1}
                strokeDasharray="3 4"
              />
              <text
                x={W - PAD_R + 6}
                y={y + 3}
                fontSize={10}
                fill="currentColor"
                opacity={0.55}
              >
                {formatMoney(maxPipeline * f)}
              </text>
            </g>
          );
        })}

        {/* Ligne estimée (pointillés) */}
        <path
          d={estimatedPath}
          fill="none"
          stroke={ESTIMATED}
          strokeWidth={2}
          strokeDasharray="5 4"
          opacity={0.8}
        />

        {/* Ligne réelle (plein) */}
        {realSegments.map((seg, i) => (
          <path
            key={i}
            d={seg}
            fill="none"
            stroke={FOREST}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        ))}

        {/* Activités par jour */}
        <path
          d={actPath}
          fill="none"
          stroke={GOLD}
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.9}
        />
        {days.map((d, i) =>
          d.activities > 0 ? (
            <circle
              key={d.date}
              cx={x(i)}
              cy={yAct(d.activities)}
              r={3}
              fill={GOLD}
            >
              <title>{`${d.label} : ${d.activities} activité${d.activities > 1 ? "s" : ""}`}</title>
            </circle>
          ) : null,
        )}

        {/* Étiquettes X (1 jour sur 5) */}
        {days.map((d, i) =>
          i % 5 === 0 || i === n - 1 ? (
            <text
              key={d.date}
              x={x(i)}
              y={H - 12}
              textAnchor="middle"
              fontSize={10}
              fill="currentColor"
              opacity={0.55}
            >
              {d.label}
            </text>
          ) : null,
        )}

        {/* Valeur du jour */}
        <text
          x={x(n - 1)}
          y={yPipe(Math.max(last.snapshotCents ?? 0, last.estimatedCents)) - 10}
          textAnchor="end"
          fontSize={13}
          fontWeight={700}
          fill={FOREST}
        >
          {formatMoney(last.snapshotCents ?? last.estimatedCents)}
        </text>
      </svg>

      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-charcoal/60">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-6 rounded bg-forest" />
          Pipeline (réel)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="inline-block h-0 w-6 border-t-2 border-dashed"
            style={{ borderColor: ESTIMATED }}
          />
          Pipeline (estimé)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-6 rounded" style={{ background: GOLD }} />
          Activités / jour
        </span>
      </div>
      <figcaption className="mt-1 text-xs text-charcoal/45">
        {hasReal
          ? "L’instantané réel est enregistré à chaque visite de cette page. "
          : ""}
        La ligne « estimé » reconstitue le pipeline depuis les dates de
        création des prospects — elle sera remplacée par du réel jour après
        jour.
      </figcaption>
    </figure>
  );
}
