import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { estimate } from "@/lib/estimation/engine";
import { isVilleSlug } from "@/lib/estimation/villes";
import { AnalysisRequestForm } from "@/components/passeport/AnalysisRequestForm";
import { AnalyseStartForm } from "@/components/passeport/AnalyseStartForm";
import { AnalyseResult } from "@/components/passeport/AnalyseResult";

export async function generateMetadata(): Promise<Metadata> {
  const t = dictionaries[await getLang()].analyse;
  return pageMetadata({
    title: t.demarrerTitre,
    description: t.demarrerTexte,
    path: "/passeport/analyse",
  });
}

/**
 * Passeport : analyse instantanée d'une propriété.
 * Sans adresse → formulaire d'entrée. Adresse trouvée → analyse
 * complète (fiche, valeur, verdicts, horizon, courbe). Adresse
 * introuvable → repli vers la demande d'analyse manuelle par courriel.
 */
export default async function AnalysePage({
  searchParams,
}: {
  searchParams: Promise<{ adresse?: string; ville?: string }>;
}) {
  const lang = await getLang();
  const t = dictionaries[lang].analyse;
  const params = await searchParams;
  const adresse = (params.adresse ?? "").trim();
  const villeParam = (params.ville ?? "montreal").trim().toLowerCase();
  const ville = isVilleSlug(villeParam) ? villeParam : "montreal";

  // Pas d'adresse : page d'entrée.
  if (!adresse) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
          {t.demarrerSurTitre}
        </p>
        <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">{t.demarrerTitre}</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-charcoal/65">{t.demarrerTexte}</p>
        <AnalyseStartForm initialVille={ville} />
      </div>
    );
  }

  const resultat = estimate({ ville, adresse, projectionAnnees: 5, langue: lang });

  // Adresse ambiguë (ex. orientation E/O non précisée) : proposer les options.
  if (!resultat.found && resultat.reason === "adresse_ambigue" && resultat.options?.length) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <h1 className="font-display text-3xl text-charcoal">{adresse}</h1>
        <p className="mt-3 text-sm text-charcoal/65">
          {dictionaries[lang].estimation.erreurAmbigue}
        </p>
        <ul className="mt-4 space-y-2">
          {resultat.options.map((opt) => (
            <li key={opt}>
              <Link
                href={`/passeport/analyse?adresse=${encodeURIComponent(opt)}&ville=${ville}`}
                className="block rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm font-medium text-forest shadow-sm hover:border-forest"
              >
                {opt}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Adresse introuvable : repli vers la demande manuelle.
  if (!resultat.found) {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
          {t.demarrerSurTitre}
        </p>
        <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">{t.introuvableTitre}</h1>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{t.introuvableTexte}</p>
        <div className="mt-8">
          <AnalysisRequestForm initialAddress={adresse} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
        {t.demarrerSurTitre}
      </p>
      <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
        {resultat.adresseNormalisee}
      </h1>
      <AnalyseResult result={resultat} lang={lang} />
    </div>
  );
}
