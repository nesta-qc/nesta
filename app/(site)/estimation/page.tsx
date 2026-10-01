import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { EstimationForm } from "./EstimationForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = dictionaries[await getLang()].estimation;
  return pageMetadata({
    title: t.metaTitre,
    description: t.metaDescription,
    path: "/estimation",
  });
}

/** Page d'estimation indicative : formulaire + résultat. */
export default async function EstimationPage({
  searchParams,
}: {
  searchParams: Promise<{ adresse?: string }>;
}) {
  const t = dictionaries[await getLang()].estimation;
  const { adresse } = await searchParams;
  return (
    <Container className="pb-20 pt-14 sm:pt-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
          {t.pageSurTitre}
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1.08] text-charcoal sm:text-5xl">
          {t.pageTitre1}
          <br />
          {t.pageTitre2}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/60">
          {t.pageSousTitre}
        </p>
      </div>

      <div className="mt-10 max-w-2xl">
        <EstimationForm initialAdresse={typeof adresse === "string" ? adresse : ""} />
      </div>
    </Container>
  );
}
