import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { HERO_IMAGES } from "@/lib/site-images";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { HeroBackgroundSlider } from "@/components/home/HeroBackgroundSlider";
import { HeroAddressAnalyzer } from "@/components/home/HeroAddressAnalyzer";
import { HeroSearch } from "@/components/home/HeroSearch";
import { ExploreSection } from "@/components/home/ExploreSection";
import { PropertyValueSection } from "@/components/home/PropertyValueSection";
import { SellSection } from "@/components/home/SellSection";
import { InvestSection } from "@/components/home/InvestSection";
import { EstimateSection } from "@/components/home/EstimateSection";
import { FinalCTA } from "@/components/home/FinalCTA";

/**
 * Accueil VEYLA : hero cinématique plein écran, recherche premium,
 * sections éditoriales photographiques. Aucune statistique inventée,
 * aucune fausse annonce, aucun faux témoignage.
 */
export async function generateMetadata(): Promise<Metadata> {
  return await pageMetadata({
    // Titre absolu : l'accueil garde l'intitulé de marque sans le suffixe du template.
    title: "Veyla — L'immobilier, à votre façon",
    description:
      "Veyla, la plateforme immobilière québécoise : recherchez une propriété, vendez sans commission en pourcentage, estimez et investissez en toute transparence.",
    path: "/",
    absoluteTitle: true,
    titleEn: "Veyla — Real estate, your way",
    descriptionEn:
      "Veyla, the Quebec real estate platform: search properties, sell without percentage commissions, estimate and invest with full transparency.",
  });
}

export default async function Home() {
  const t = dictionaries[await getLang()].accueil;
  return (
    <>
      {/* ---------- Hero cinématique ---------- */}
      <HeroBackgroundSlider images={HERO_IMAGES}>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne">
          {t.heroSurTitre}
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.06] text-white sm:text-6xl lg:text-7xl">
          {t.heroTitre1}
          <br />
          {t.heroTitre2}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          {t.heroSousTitre}
        </p>
        <HeroAddressAnalyzer />
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href="#recherche"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-forest transition-colors duration-200 hover:bg-ivory"
          >
            {t.ctaRecherche}
          </a>
          <Link
            href="/estimation"
            className="inline-flex items-center justify-center rounded-full bg-champagne px-7 py-3.5 text-[15px] font-semibold text-charcoal transition-colors duration-200 hover:bg-champagne/85"
          >
            {t.ctaEstimer}
          </Link>
          <Link
            href="/sell"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
          >
            {t.ctaVendre}
          </Link>
        </div>
        <div id="recherche" className="scroll-mt-24">
          <p className="mb-3 mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            {t.ouExplorer}
          </p>
          <HeroSearch />
        </div>
      </HeroBackgroundSlider>

      {/* ---------- Parcours éditoriaux ---------- */}
      <ExploreSection />

      {/* ---------- Valeur de propriété (estimation) ---------- */}
      <PropertyValueSection />

      {/* ---------- Vendre ---------- */}
      <SellSection />

      {/* ---------- Investir ---------- */}
      <InvestSection />

      {/* ---------- Estimation ---------- */}
      <EstimateSection />

      {/* ---------- Pourquoi Veyla : les angles d'attaque ---------- */}
      <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            {t.pourquoiSurTitre}
          </p>
          <h2 className="mt-4 font-display text-2xl text-charcoal sm:text-3xl">
            {t.pourquoiTitre1}
            <br />
            {t.pourquoiTitre2}
          </h2>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {t.confiance.map((f) => (
            <div key={f.titre} className="border-t-2 border-forest/15 pt-5">
              <h3 className="font-display text-lg text-charcoal">{f.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/55">{f.texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA final ---------- */}
      <FinalCTA />
    </>
  );
}
