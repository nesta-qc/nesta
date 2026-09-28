import Link from "next/link";
import { HERO_IMAGES } from "@/lib/site-images";
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
 * Accueil NESTA : hero cinématique plein écran, recherche premium,
 * sections éditoriales photographiques. Aucune statistique inventée,
 * aucune fausse annonce, aucun faux témoignage.
 */
export default function Home() {
  return (
    <>
      {/* ---------- Hero cinématique ---------- */}
      <HeroBackgroundSlider images={HERO_IMAGES}>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne">
          Nesta
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.06] text-white sm:text-6xl lg:text-7xl">
          Voyez le potentiel
          <br />
          derrière chaque propriété
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          Avant d&apos;acheter, de rénover ou d&apos;investir, comprenez ce
          qu&apos;une propriété peut devenir — sans promesse, sans jargon.
        </p>
        <HeroAddressAnalyzer />
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href="#recherche"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-forest transition-colors duration-200 hover:bg-ivory"
          >
            Rechercher une propriété
          </a>
          <Link
            href="/sell"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
          >
            Vendre avec Nesta
          </Link>
        </div>
        <div id="recherche" className="scroll-mt-24">
          <p className="mb-3 mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Ou explorez les annonces
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

      {/* ---------- Confiance sobre ---------- */}
      <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Données transparentes",
              text: "Chaque annonce affiche ses caractéristiques réelles : taxes, superficie, année. Quand une information manque, c'est indiqué.",
            },
            {
              title: "Visites immersives",
              text: "Les vendeurs peuvent ajouter une vraie visite 3D Matterport, intégrée directement dans l'annonce.",
            },
            {
              title: "Sans intermédiaire obligé",
              text: "Achetez ou vendez avec ou sans courtier. Nesta reste votre outil, pas votre intermédiaire.",
            },
          ].map((f) => (
            <div key={f.title} className="border-t-2 border-forest/15 pt-5">
              <h3 className="font-display text-lg text-charcoal">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/55">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA final ---------- */}
      <FinalCTA />
    </>
  );
}
