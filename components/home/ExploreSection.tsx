import Link from "next/link";
import { EDITORIAL_IMAGES } from "@/lib/site-images";
import { EditorialImage } from "./EditorialImage";

/**
 * « Explorez autrement. » — composition éditoriale asymétrique :
 * trois parcours, trois grandes photographies, beaucoup d'espace.
 * Pas de cartes SaaS identiques.
 */
export function ExploreSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
          Parcours
        </p>
        <h2 className="mt-4 font-display text-3xl text-charcoal sm:text-5xl">
          Explorez autrement.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-charcoal/60 sm:text-lg">
          Trois façons d&apos;avancer dans votre projet immobilier — avec ou
          sans courtier.
        </p>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-8">
        {/* Acheter — grand, en avant */}
        <Link
          href="/search"
          className="group md:col-span-7"
        >
          <div className="overflow-hidden rounded-[var(--radius-lg)]">
            <div className="transition-transform duration-500 ease-out group-hover:scale-[1.015]">
              <EditorialImage
                image={EDITORIAL_IMAGES.acheter}
                aspect="aspect-[16/10]"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>
          </div>
          <div className="mt-5 flex items-baseline justify-between">
            <div>
              <h3 className="font-display text-2xl text-charcoal sm:text-3xl">
                Acheter
              </h3>
              <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-charcoal/55">
                Explorez les propriétés au Québec, visitez en 3D et estimez
                votre coût réel.
              </p>
            </div>
            <span
              aria-hidden="true"
              className="ml-4 shrink-0 text-xl text-forest transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </Link>

        {/* Vendre + Investir — colonne décalée */}
        <div className="flex flex-col gap-10 md:col-span-5 md:pt-16">
          <Link href="/sell" className="group">
            <div className="overflow-hidden rounded-[var(--radius-lg)]">
              <div className="transition-transform duration-500 ease-out group-hover:scale-[1.015]">
                <EditorialImage
                  image={EDITORIAL_IMAGES.vendre}
                  aspect="aspect-[16/11]"
                  sizes="(max-width: 768px) 100vw, 38vw"
                />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <h3 className="font-display text-xl text-charcoal sm:text-2xl">
                  Vendre
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-charcoal/55">
                  Publiez votre annonce vous-même, avec accompagnement ou
                  avec un courtier.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="ml-4 shrink-0 text-lg text-forest transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </div>
          </Link>

          <Link href="/investir" className="group">
            <div className="overflow-hidden rounded-[var(--radius-lg)]">
              <div className="transition-transform duration-500 ease-out group-hover:scale-[1.015]">
                <EditorialImage
                  image={EDITORIAL_IMAGES.investir}
                  aspect="aspect-[16/11]"
                  sizes="(max-width: 768px) 100vw, 38vw"
                />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <h3 className="font-display text-xl text-charcoal sm:text-2xl">
                  Investir
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-charcoal/55">
                  Analysez des immeubles et préparez vos offres avec des
                  données claires.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="ml-4 shrink-0 text-lg text-forest transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
