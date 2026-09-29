import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { CalculatorWizard } from "@/components/investor/CalculatorWizard";

export const metadata: Metadata = pageMetadata({
  title: "Calculateur investisseur",
  description: "Répondez à 8 questions simples et obtenez le taux de capitalisation, le cash-flow et le rendement sur mise de fonds d'un immeuble.",
  path: "/investir/calculateur",
});

/** Calculateur investisseur : assistant guidé, une question à la fois. */
export default function CalculateurPage() {
  return (
    <div>
      <CalculatorWizard />
      <p className="pb-10 text-center text-sm">
        <Link href="/investir" className="text-forest underline">
          ← Voir les comparables du marché
        </Link>
      </p>
    </div>
  );
}
