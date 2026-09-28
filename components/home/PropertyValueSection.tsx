import Link from "next/link";

/**
 * NESTA — Valeur de propriété.
 * Section d'accueil qui mène vers /estimation : l'estimé instantané
 * de la valeur d'une propriété à partir du rôle d'évaluation foncière,
 * ajusté aux prix du marché. Composition centrée sur fond ivoire,
 * dans le design system du site (aucune retouche d'identité visuelle).
 */
export function PropertyValueSection() {
  return (
    <section className="bg-ivory" aria-labelledby="valeur-propriete-titre">
      <div className="mx-auto w-full max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
          Estimation
        </p>
        <h2
          id="valeur-propriete-titre"
          className="mt-4 font-display text-3xl text-charcoal sm:text-5xl"
        >
          Combien vaut votre propriété&nbsp;?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-charcoal/70 sm:text-lg">
          Obtenez en quelques secondes une estimation indicative de la
          valeur marchande d&apos;une propriété au Québec — gratuitement,
          sans inscription.
        </p>
        <ul className="mx-auto mt-8 grid max-w-2xl gap-3 text-left text-[15px] text-charcoal/80 sm:grid-cols-3 sm:text-center">
          {[
            "Basée sur le rôle d'évaluation foncière",
            "Ajustée aux prix récents du marché",
            "Fourchette indicative, sans engagement",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 sm:justify-center">
              <span aria-hidden="true" className="mt-0.5 shrink-0 font-bold text-forest">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/estimation"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-forest px-9 py-4 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-forest-deep"
        >
          Estimer ma propriété
          <span aria-hidden="true" className="ml-2">→</span>
        </Link>
      </div>
    </section>
  );
}
