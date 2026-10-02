import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { InvestorView } from "@/components/investor/InvestorView";
import { getInvestmentProperties, getMarketComparables } from "@/actions/properties";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await pageMetadata({
    title: "Investir",
    description: "Analysez des immeubles publiés sur Veyla et des comparables du marché vérifiés : prix, taxes, superficies, année.",
    path: "/investir",
    titleEn: "Invest",
    descriptionEn: "Analyze buildings listed on Veyla and verified market comparables: price, taxes, areas, year built.",
  });
}


/** Espace investisseurs : annonces Veyla + comparables du marché vérifiés. */
export default async function InvestirPage() {
  const [properties, comparables] = await Promise.all([
    getInvestmentProperties(),
    getMarketComparables(),
  ]);
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-5 pt-8 sm:px-8">
        <Link
          href="/investir/calculateur"
          className="block rounded-2xl bg-forest px-6 py-5 text-ivory transition-opacity hover:opacity-95"
        >
          <p className="font-display text-lg">
            Calculateur investisseur →
          </p>
          <p className="mt-1 text-sm text-ivory/70">
            Taux de capitalisation, cash-flow et rendement sur mise de fonds à
            partir de vos chiffres.
          </p>
        </Link>
      </div>
      <InvestorView initial={properties} comparables={comparables} />
    </>
  );
}
