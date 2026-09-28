import type { Metadata } from "next";
import Link from "next/link";
import { CapRateCalculator } from "@/components/investor/CapRateCalculator";

export const metadata: Metadata = {
  title: "Calculateur investisseur",
  description:
    "Calculez le taux de capitalisation, le cash-flow et le rendement sur mise de fonds d'un immeuble à partir de vos chiffres.",
};

/** Calculateur investisseur : indicateurs calculés des chiffres saisis. */
export default function CalculateurPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
          Investir
        </p>
        <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
          Calculateur investisseur
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-charcoal/60">
          Taux de capitalisation, cash-flow, rendement sur mise de fonds —
          calculés instantanément à partir de vos chiffres, avec les formules
          affichées.
        </p>
        <p className="mt-2 text-sm">
          <Link href="/investir" className="text-forest underline">
            ← Voir les comparables du marché
          </Link>
        </p>
      </div>
      <div className="mt-10">
        <CapRateCalculator />
      </div>
    </div>
  );
}
