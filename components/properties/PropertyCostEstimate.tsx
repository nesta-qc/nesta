"use client";

import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/format";
import { Card, Input } from "@/components/ui";

interface Props {
  price: number | null;
  municipalTax: number | null;
  schoolTax: number | null;
}

/** Paiement hypothécaire mensuel (amortissement standard). */
function monthlyPayment(principal: number, annualRate: number, years: number): number {
  if (principal <= 0) return 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r <= 0) return principal / n;
  const f = Math.pow(1 + r, n);
  return (principal * r * f) / (f - 1);
}

/**
 * « Votre coût estimé » : calcul transparent à partir du prix affiché
 * et des taxes réelles de l'annonce. Hypothèses modifiables, libellées
 * comme telles. N'est JAMAIS présenté comme une approbation hypothécaire.
 */
export function PropertyCostEstimate({ price, municipalTax, schoolTax }: Props) {
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(25);
  const [condoFees, setCondoFees] = useState(0);

  const calc = useMemo(() => {
    const p = price ?? 0;
    const down = (p * downPct) / 100;
    const mortgage = Math.max(0, p - down);
    const payment = monthlyPayment(mortgage, rate, years);
    const taxes = ((municipalTax ?? 0) + (schoolTax ?? 0)) / 12;
    const total = payment + taxes + condoFees;
    return { down, mortgage, payment, taxes, total };
  }, [price, downPct, rate, years, municipalTax, schoolTax, condoFees]);

  if (price === null) return null;

  const rows: { label: string; value: string }[] = [
    { label: "Prix affiché", value: formatPrice(price) },
    { label: `Mise de fonds (${downPct} %)`, value: formatPrice(calc.down) },
    { label: "Montant hypothécaire", value: formatPrice(calc.mortgage) },
    { label: "Paiement hypothécaire / mois", value: `${formatPrice(calc.payment)} / mois` },
    { label: "Taxes (mun. + scol.) / mois", value: `${formatPrice(calc.taxes)} / mois` },
    { label: "Frais de condo / mois", value: `${formatPrice(condoFees)} / mois` },
  ];

  return (
    <Card className="p-6 sm:p-8">
      <h2 className="font-display text-xl text-charcoal">Votre coût estimé</h2>
      <p className="mt-2 text-sm leading-relaxed text-charcoal/55">
        Estimation indicative calculée à partir du prix affiché et des taxes
        de l&apos;annonce. Ce n&apos;est pas une approbation hypothécaire.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal/70">
          Mise de fonds (%)
          <Input
            type="number" min={0} max={100} value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value) || 0)}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal/70">
          Taux d&apos;intérêt (%)
          <Input
            type="number" min={0} max={20} step="0.01" value={rate}
            onChange={(e) => setRate(Number(e.target.value) || 0)}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal/70">
          Amortissement (ans)
          <Input
            type="number" min={1} max={30} value={years}
            onChange={(e) => setYears(Number(e.target.value) || 0)}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal/70">
          Frais de condo / mois ($)
          <Input
            type="number" min={0} value={condoFees}
            onChange={(e) => setCondoFees(Number(e.target.value) || 0)}
          />
        </label>
      </div>

      <dl className="mt-6 divide-y divide-border border-y border-border">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between py-3">
            <dt className="text-sm text-charcoal/60">{r.label}</dt>
            <dd className="text-sm font-medium text-charcoal">{r.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex items-baseline justify-between">
        <p className="text-sm font-medium text-charcoal">Coût mensuel estimé</p>
        <p className="font-display text-3xl text-forest">{formatPrice(calc.total)}<span className="text-base text-charcoal/50"> / mois</span></p>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-charcoal/45">
        Capacité estimée uniquement — ni approbation, ni admissibilité, ni
        solvabilité. Les chiffres réels dépendent de votre institution
        financière, de votre dossier et des conditions du marché.
      </p>
    </Card>
  );
}
