import Link from "next/link";
import { EDITORIAL_IMAGES } from "@/lib/site-images";
import { EditorialImage } from "./EditorialImage";

/**
 * Section Investir : photographie de multilogement + mini-interface
 * d'analyse. Les chiffres affichés sont des DONNÉES RÉELLES : un
 * comparable DuProprio vérifié (aucun chiffre inventé).
 */
export function InvestSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Photo avec interface superposée */}
        <div className="relative">
          <div className="overflow-hidden rounded-[var(--radius-lg)]">
            <EditorialImage
              image={EDITORIAL_IMAGES.investir}
              aspect="aspect-[4/3]"
              sizes="(max-width: 1024px) 100vw, 48vw"
            />
          </div>
          {/* Mini-interface d'analyse — données réelles (comparable vérifié). */}
          <figure className="absolute -bottom-8 left-4 right-4 rounded-[var(--radius-lg)] border border-border bg-white/95 p-5 shadow-[var(--shadow-lift)] backdrop-blur-sm sm:left-8 sm:right-auto sm:w-[340px]">
            <figcaption className="text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal/45">
              Comparable réel — DuProprio
            </figcaption>
            <p className="mt-2 font-display text-3xl text-forest">828 000 $</p>
            <p className="mt-1 text-sm text-charcoal/60">48, rue Charlevoix, Kirkland</p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="text-charcoal/45">Superficie</dt>
                <dd className="font-semibold text-charcoal">1 096 pi²</dd>
              </div>
              <div>
                <dt className="text-charcoal/45">$/pi²</dt>
                <dd className="font-semibold text-charcoal">755 $</dd>
              </div>
              <div>
                <dt className="text-charcoal/45">Chambres</dt>
                <dd className="font-semibold text-charcoal">3</dd>
              </div>
              <div>
                <dt className="text-charcoal/45">Année</dt>
                <dd className="font-semibold text-charcoal">1979</dd>
              </div>
            </dl>
            <p className="mt-3 text-[11px] text-charcoal/40">
              Données vérifiées le 28 sept. 2026
            </p>
          </figure>
        </div>

        {/* Texte */}
        <div className="pt-10 sm:pt-12 lg:pt-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            Investir
          </p>
          <h2 className="mt-4 font-display text-3xl text-charcoal sm:text-5xl">
            Comprenez l&apos;actif, pas juste la photo.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-charcoal/60 sm:text-lg">
            Saisissez les chiffres d&apos;un immeuble : Nesta calcule le taux
            de capitalisation, le cash-flow et le rendement sur mise de fonds.
            Vos hypothèses, affichées clairement.
          </p>
          <Link
            href="/investir/calculateur"
            className="mt-8 inline-flex items-center rounded-full bg-forest px-8 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-forest-deep"
          >
            Analyser un immeuble
            <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
