import type { Metadata } from "next";
import { InvestorView } from "@/components/investor/InvestorView";
import { getInvestmentProperties } from "@/actions/properties";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Investir",
  description:
    "Analysez des immeubles publiés sur Nesta : prix, taxes, superficies, année.",
};

/** Espace investisseurs : données réelles d'annonces uniquement. */
export default async function InvestirPage() {
  const properties = await getInvestmentProperties();
  return <InvestorView initial={properties} />;
}
