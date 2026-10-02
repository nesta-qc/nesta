import Link from "next/link";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";

/**
 * 404 aux couleurs de Veyla : l'utilisateur reste dans l'univers du
 * site (pas de page blanche générique) et repart vers le Passeport.
 */
export default async function NotFound() {
  const t = dictionaries[await getLang()].notFound;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center px-5 py-16 text-center sm:py-24">
      <p className="font-display text-7xl text-forest/20 sm:text-8xl">404</p>
      <h1 className="mt-4 font-display text-3xl text-charcoal sm:text-4xl">
        {t.titre}
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-charcoal/65">
        {t.texte}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/passeport"
          className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-forest-deep"
        >
          {t.ctaPasseport}
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-2.5 text-sm font-medium text-charcoal transition-colors duration-200 hover:border-forest/40"
        >
          {t.ctaAccueil}
        </Link>
      </div>
    </div>
  );
}
