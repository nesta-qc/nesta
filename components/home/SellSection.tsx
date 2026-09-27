import Link from "next/link";
import { EDITORIAL_IMAGES } from "@/lib/site-images";
import { EditorialImage } from "./EditorialImage";

const options = [
  {
    title: "Sans courtier",
    text: "Vous publiez, vous gérez les visites, vous négociez. Nesta vous donne les outils.",
  },
  {
    title: "Avec accompagnement à la carte",
    text: "Photos, description, mise en valeur : choisissez l'aide dont vous avez besoin.",
  },
  {
    title: "Avec un professionnel",
    text: "Vous préférez déléguer ? Travaillez avec un courtier de votre choix.",
  },
];

/**
 * « Vendez à votre façon. » — composition éditoriale texte/image.
 * Nesta n'est pas contre les courtiers : trois options neutres.
 */
export function SellSection() {
  return (
    <section className="bg-forest-ink">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
            Vendre
          </p>
          <h2 className="mt-4 font-display text-3xl text-white sm:text-5xl">
            Vendez à votre façon.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">
            Créez votre annonce en quelques minutes. Choisissez le niveau
            d&apos;accompagnement qui vous convient — Nesta reste votre
            outil, pas votre intermédiaire.
          </p>

          <div className="mt-8 space-y-0 divide-y divide-white/10 border-y border-white/10">
            {options.map((o) => (
              <div key={o.title} className="py-5">
                <h3 className="font-display text-lg text-white">{o.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/55">
                  {o.text}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/sell"
            className="mt-8 inline-flex items-center rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold text-forest transition-colors duration-200 hover:bg-ivory"
          >
            Vendre avec Nesta
            <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>

        <div className="overflow-hidden rounded-[var(--radius-lg)]">
          <EditorialImage
            image={EDITORIAL_IMAGES.sellSection}
            aspect="aspect-[4/5]"
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="sm:aspect-[4/3] lg:aspect-[4/5]"
          />
        </div>
      </div>
    </section>
  );
}
