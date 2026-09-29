import Link from "next/link";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";

/**
 * NESTA — Valeur de propriété.
 * Section d'accueil qui mène vers /estimation : l'estimé instantané
 * de la valeur d'une propriété à partir du rôle d'évaluation foncière,
 * ajusté aux prix du marché. Composition centrée sur fond ivoire,
 * dans le design system du site (aucune retouche d'identité visuelle).
 */
export async function PropertyValueSection() {
  const t = dictionaries[await getLang()].accueil;
  return (
    <section className="bg-ivory" aria-labelledby="valeur-propriete-titre">
      <div className="mx-auto w-full max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
          {t.valeurSurTitre}
        </p>
        <h2
          id="valeur-propriete-titre"
          className="mt-4 font-display text-3xl text-charcoal sm:text-5xl"
        >
          {t.valeurTitre}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-charcoal/70 sm:text-lg">
          {t.valeurTexte}
        </p>
        <ul className="mx-auto mt-8 grid max-w-2xl gap-3 text-left text-[15px] text-charcoal/80 sm:grid-cols-3 sm:text-center">
          {t.valeurPuces.map((item) => (
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
          {t.valeurCta}
          <span aria-hidden="true" className="ml-2">→</span>
        </Link>
      </div>
    </section>
  );
}
