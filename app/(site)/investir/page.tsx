import type { Metadata } from "next";
import { InvestorView } from "@/components/investor/InvestorView";
import { getInvestmentProperties, getMarketComparables } from "@/actions/properties";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Investir",
  description:
    "Analysez des immeubles publiés sur Nesta et des comparables du marché vérifiés : prix, taxes, superficies, année.",
};

/** Espace investisseurs : annonces Nesta + comparables du marché vérifiés. */
export default async function InvestirPage() {
  const [properties, comparables] = await Promise.all([
    getInvestmentProperties(),
    getMarketComparables(),
  ]);
  return <InvestorView initial={properties} comparables={comparables} />;
}
