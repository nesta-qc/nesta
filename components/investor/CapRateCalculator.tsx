"use client";

import { useMemo, useState } from "react";
import { Card, Field, Input } from "@/components/ui";

/* ============================================================
 * Calculateur investisseur — taux de capitalisation et cash-flow.
 * 100 % calculé à partir des chiffres saisis par l'utilisateur :
 * aucune donnée inventée, aucun défaut pré-rempli.
 * ============================================================ */

function parseNumber(raw: string): number {
  const cleaned = raw.replace(/[\s$]/g, "").replace(",", ".");
  const n = Number(cleaned);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

const fmtCAD = (n: number) =>
  new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);

const fmtPct = (n: number) =>
  `${new Intl.NumberFormat("fr-CA", { maximumFractionDigits: 2 }).format(n)} %`;

function ResultRow({
  label,
  value,
  hint,
  strong = false,
}: {
  label: string;
  value: string;
  hint?: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/60 py-3 last:border-0">
      <div>
        <p className="text-sm text-charcoal/60">{label}</p>
        {hint ? <p className="mt-0.5 text-xs text-charcoal/40">{hint}</p> : null}
      </div>
      <p
        className={`shrink-0 font-display ${strong ? "text-2xl text-forest" : "text-lg text-charcoal"}`}
      >
        {value}
      </p>
    </div>
  );
}

export function CapRateCalculator() {
  const [prix, setPrix] = useState("");
  const [revenus, setRevenus] = useState("");
  const [depenses, setDepenses] = useState("");
  const [miseDeFonds, setMiseDeFonds] = useState("");
  const [taux, setTaux] = useState("");
  const [amortissement, setAmortissement] = useState("");

  const r = useMemo(() => {
    const p = parseNumber(prix);
    const rev = parseNumber(revenus);
    const dep = parseNumber(depenses);
    const mdf = parseNumber(miseDeFonds);
    const t = parseNumber(taux);
    const amort = parseNumber(amortissement);

    const noi = rev - dep;
    const capRate = p > 0 ? (noi / p) * 100 : null;

    const principal = Math.max(p - mdf, 0);
    const monthlyRate = t / 100 / 12;
    const n = Math.round(amort * 12);
    let paiementMensuel: number | null = null;
    if (principal > 0 && n > 0) {
      paiementMensuel =
        monthlyRate > 0
          ? (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
            (Math.pow(1 + monthlyRate, n) - 1)
          : principal / n;
    }
    const paiementAnnuel =
      paiementMensuel !== null ? paiementMensuel * 12 : null;
    const cashflowAnnuel =
      paiementAnnuel !== null ? noi - paiementAnnuel : null;
    const cashOnCash =
      cashflowAnnuel !== null && mdf > 0
        ? (cashflowAnnuel / mdf) * 100
        : null;

    const hasBase = p > 0 && (rev > 0 || dep > 0);
    return {
      noi,
      capRate,
      paiementMensuel,
      cashflowAnnuel,
      cashOnCash,
      hasBase,
    };
  }, [prix, revenus, depenses, miseDeFonds, taux, amortissement]);

  const dash = "—";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
      {/* Saisie */}
      <Card className="p-6 sm:p-8">
        <h2 className="font-display text-xl text-charcoal">
          Les chiffres de l&apos;immeuble
        </h2>
        <p className="mt-1 text-sm text-charcoal/55">
          Saisissez vos propres chiffres — aucun exemple n&apos;est pré-rempli.
        </p>
        <div className="mt-6 flex flex-col gap-5">
          <Field
            label="Prix d'achat"
            htmlFor="calc-prix"
            hint="Prix demandé ou prix d'achat envisagé, en dollars."
          >
            <Input
              id="calc-prix"
              inputMode="decimal"
              placeholder="Ex. 650000"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
            />
          </Field>
          <Field
            label="Revenus bruts annuels"
            htmlFor="calc-revenus"
            hint="Loyers annuels totaux, tous logements confondus."
          >
            <Input
              id="calc-revenus"
              inputMode="decimal"
              placeholder="Ex. 48000"
              value={revenus}
              onChange={(e) => setRevenus(e.target.value)}
            />
          </Field>
          <Field
            label="Dépenses d'exploitation annuelles"
            htmlFor="calc-depenses"
            hint="Taxes, assurances, entretien, gestion, provision pour vacance. Exclut l'hypothèque."
          >
            <Input
              id="calc-depenses"
              inputMode="decimal"
              placeholder="Ex. 15000"
              value={depenses}
              onChange={(e) => setDepenses(e.target.value)}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Mise de fonds" htmlFor="calc-mdf">
              <Input
                id="calc-mdf"
                inputMode="decimal"
                placeholder="Ex. 130000"
                value={miseDeFonds}
                onChange={(e) => setMiseDeFonds(e.target.value)}
              />
            </Field>
            <Field label="Taux hypothécaire (%)" htmlFor="calc-taux">
              <Input
                id="calc-taux"
                inputMode="decimal"
                placeholder="Ex. 5,25"
                value={taux}
                onChange={(e) => setTaux(e.target.value)}
              />
            </Field>
          </div>
          <Field
            label="Amortissement (années)"
            htmlFor="calc-amort"
            hint="Durée du prêt hypothécaire."
          >
            <Input
              id="calc-amort"
              inputMode="decimal"
              placeholder="Ex. 25"
              value={amortissement}
              onChange={(e) => setAmortissement(e.target.value)}
            />
          </Field>
        </div>
      </Card>

      {/* Résultats */}
      <div className="flex flex-col gap-6 lg:sticky lg:top-6">
        <Card className="p-6 sm:p-8">
          <h2 className="font-display text-xl text-charcoal">Résultats</h2>
          {!r.hasBase ? (
            <p className="mt-4 text-sm leading-relaxed text-charcoal/55">
              Saisissez au moins le prix et les revenus (ou les dépenses) pour
              voir les indicateurs.
            </p>
          ) : (
            <div className="mt-2">
              <ResultRow
                label="Revenu net d'exploitation"
                value={fmtCAD(r.noi)}
                hint="Revenus − dépenses, avant hypothèque"
                strong
              />
              <ResultRow
                label="Taux de capitalisation"
                value={r.capRate !== null ? fmtPct(r.capRate) : dash}
                hint="Revenu net ÷ prix d'achat"
                strong
              />
              <ResultRow
                label="Paiement hypothécaire mensuel"
                value={
                  r.paiementMensuel !== null ? fmtCAD(r.paiementMensuel) : dash
                }
                hint="Capital + intérêts"
              />
              <ResultRow
                label="Cash-flow annuel"
                value={
                  r.cashflowAnnuel !== null ? fmtCAD(r.cashflowAnnuel) : dash
                }
                hint="Revenu net − hypothèque annuelle"
                strong
              />
              <ResultRow
                label="Cash-flow mensuel"
                value={
                  r.cashflowAnnuel !== null
                    ? fmtCAD(r.cashflowAnnuel / 12)
                    : dash
                }
              />
              <ResultRow
                label="Rendement sur mise de fonds"
                value={r.cashOnCash !== null ? fmtPct(r.cashOnCash) : dash}
                hint="Cash-flow annuel ÷ mise de fonds"
              />
            </div>
          )}
        </Card>

        <Card className="p-6 sm:p-8">
          <h2 className="font-display text-lg text-charcoal">
            Hypothèses et formules
          </h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-charcoal/60">
            <li>
              Revenu net = revenus bruts annuels − dépenses
              d&apos;exploitation annuelles.
            </li>
            <li>
              Taux de capitalisation = revenu net ÷ prix d&apos;achat. Il mesure
              le rendement de l&apos;actif, sans tenir compte du financement.
            </li>
            <li>
              Paiement hypothécaire calculé par amortissement constant sur le
              montant financé (prix − mise de fonds).
            </li>
            <li>Cash-flow = revenu net − paiements hypothécaires annuels.</li>
          </ul>
          <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-charcoal/45">
            Outil indicatif : les résultats dépendent entièrement des chiffres
            que vous saisissez. Ceci n&apos;est pas un conseil financier.
          </p>
        </Card>
      </div>
    </div>
  );
}
