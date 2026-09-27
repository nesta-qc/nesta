import Link from "next/link";
import { EDITORIAL_IMAGES } from "@/lib/site-images";
import { EditorialImage } from "./EditorialImage";

/**
 * NESTA Estimate — visuellement distinct du marketplace (fond charbon,
 * imagerie construction), même design system.
 */
export function EstimateSection() {
  return (
    <section className="bg-charcoal">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <EditorialImage
            image={EDITORIAL_IMAGES.estimate}
            aspect="aspect-square"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="rounded-[var(--radius-lg)]"
          />
        </div>
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
            Nesta Estimate
          </p>
          <h2 className="mt-4 font-display text-3xl text-white sm:text-5xl">
            Des plans au budget.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Téléversez vos plans et obtenez une estimation structurée de
            votre projet de construction — poste par poste, avec les
            hypothèses affichées clairement.
          </p>
          <ul className="mt-6 space-y-3 text-[15px] text-white/70">
            {[
              "Estimation par un estimateur qualifié",
              "Détail transparent, sans chiffre inventé",
              "Idéal avant d'acheter un terrain ou de rénover",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 text-champagne">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/services/demande?service=estimation"
            className="mt-8 inline-flex items-center rounded-full border border-white/25 px-8 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:border-champagne hover:text-champagne"
          >
            Demander une estimation
            <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
