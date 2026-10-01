import type { BoroughStat } from "@/actions/property-profiles";
import { formatPrice } from "@/lib/format";

interface BoroughRowProps {
  borough: BoroughStat;
  maxMedian: number;
  profilsLabel: string;
  valeurMedianeLabel: string;
}

/** Ligne « arrondissement » : nom, nombre de profils, médiane + barre. */
export function BoroughRow({
  borough: b,
  maxMedian,
  profilsLabel,
  valeurMedianeLabel,
}: BoroughRowProps) {
  return (
    <li>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-charcoal">{b.borough}</p>
        <p className="text-sm text-charcoal/60">
          {b.count} {profilsLabel} ·{" "}
          <span className="font-semibold text-forest">
            {b.medianAssessment != null
              ? formatPrice(b.medianAssessment)
              : "—"}
          </span>
        </p>
      </div>
      <div
        className="mt-2 h-2.5 overflow-hidden rounded-full bg-cream"
        role="img"
        aria-label={`${b.borough} : ${valeurMedianeLabel} ${b.medianAssessment != null ? formatPrice(b.medianAssessment) : "—"}`}
      >
        <div
          className="h-full rounded-full bg-forest/80"
          style={{
            width: `${
              maxMedian > 0 && b.medianAssessment != null
                ? Math.max(
                    2,
                    Math.round((b.medianAssessment / maxMedian) * 100),
                  )
                : 0
            }%`,
          }}
        />
      </div>
    </li>
  );
}
