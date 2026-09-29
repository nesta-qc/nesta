import Link from "next/link";
import { EDITORIAL_IMAGES } from "@/lib/site-images";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { EditorialImage } from "./EditorialImage";

/**
 * « Vendez à votre façon. » — composition éditoriale texte/image.
 * Nesta n'est pas contre les courtiers : trois options neutres.
 */
export async function SellSection() {
  const t = dictionaries[await getLang()].accueil;
  return (
    <section className="bg-forest-ink">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
            {t.vendreSurTitre}
          </p>
          <h2 className="mt-4 font-display text-3xl text-white sm:text-5xl">
            {t.vendreTitre}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">
            {t.vendreTexte}
          </p>

          <div className="mt-8 space-y-0 divide-y divide-white/10 border-y border-white/10">
            {t.vendreOptions.map((o) => (
              <div key={o.titre} className="py-5">
                <h3 className="font-display text-lg text-white">{o.titre}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/55">
                  {o.texte}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/sell"
            className="mt-8 inline-flex items-center rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold text-forest transition-colors duration-200 hover:bg-ivory"
          >
            {t.vendreCta}
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
