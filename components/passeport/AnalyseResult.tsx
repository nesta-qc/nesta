import type { EstimateSuccess } from "@/lib/estimation/engine";
import {
  analyserVerdicts,
  type NiveauVerdict,
  type VerdictEnrichi,
} from "@/lib/analyse/verdicts";
import { construireCourbe, ANNEE_COURANTE } from "@/lib/analyse/historique";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { CourbeValeur } from "./CourbeValeur";

interface Props {
  result: EstimateSuccess;
  lang: "fr" | "en";
}

const PASTILLE: Record<NiveauVerdict, string> = {
  favorable: "bg-emerald-100 text-emerald-900",
  neutre: "bg-champagne/40 text-charcoal",
  defavorable: "bg-rose-100 text-rose-900",
};

function fmtDevise(lang: "fr" | "en") {
  return new Intl.NumberFormat(lang === "fr" ? "fr-CA" : "en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  });
}

/**
 * Résultat complet d'analyse : fiche du bien, valeur, verdicts
 * Acheter/Vendre/Investir, horizon temporel et courbe historique.
 * Les calculs avancés et la méthode restent privés ; le client voit
 * des verdicts simples avec leur justification.
 */
export function AnalyseResult({ result: r, lang }: Props) {
  const t = dictionaries[lang].analyse;
  const tEst = dictionaries[lang].estimation;
  const fmt = fmtDevise(lang);
  const fmtM2 = (v: number) =>
    `${new Intl.NumberFormat(lang === "fr" ? "fr-CA" : "en-CA").format(v)} m²`;

  const age = ANNEE_COURANTE - r.anneeConstruction;

  // Verdicts enrichis : score multi-facteurs + détails séparés par verdict.
  const suffixe: Record<NiveauVerdict, string> = {
    favorable: "Favorable",
    neutre: "Neutre",
    defavorable: "Defavorable",
  };
  const [vVendre, vAcheter, vInvestir] = analyserVerdicts(
    { facteur: r.facteur, categorie: r.categorie },
    lang,
  );
  const verdicts: { titre: string; v: VerdictEnrichi }[] = [
    { titre: t.verdictVendre, v: vVendre },
    { titre: t.verdictAcheter, v: vAcheter },
    { titre: t.verdictInvestir, v: vInvestir },
  ];

  // Horizon : +3 et +5 ans au même taux tendanciel que le moteur.
  const taux = (r.projection?.tauxAnnuelPct ?? 0) / 100;
  const h3 = Math.round(r.estimation * Math.pow(1 + taux, 3));
  const h5 = r.projection?.estimation ?? Math.round(r.estimation * Math.pow(1 + taux, 5));

  const courbe = construireCourbe(r.estimation, r.anneeConstruction, r.projection?.tauxAnnuelPct ?? 0);

  const fiche: [string, string][] = [
    [t.ficheAdresse, r.adresseNormalisee],
    [t.ficheVille, r.villeNom + (r.arrondissement ? ` — ${r.arrondissement}` : "")],
    [t.ficheType, tEst.categorieLabels[r.categorie] ?? r.categorie],
    [t.ficheAnnee, `${r.anneeConstruction} (${age} ${t.ficheAge})`],
    ...(r.superficieTerrainM2 > 0 ? [[t.ficheTerrain, fmtM2(r.superficieTerrainM2)] as [string, string]] : []),
    ...(r.superficieBatimentM2 > 0 ? [[t.ficheBatiment, fmtM2(r.superficieBatimentM2)] as [string, string]] : []),
    ...(r.nbLogements > 1 ? [[t.ficheLogements, String(r.nbLogements)] as [string, string]] : []),
    [t.ficheValeurRole, fmt.format(r.valeurAuRole)],
  ];

  return (
    <div className="mt-8 space-y-10">
      {/* Fiche du bien */}
      <section className="rounded-2xl border border-charcoal/10 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-display text-xl text-charcoal">{t.ficheTitre}</h2>
        <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {fiche.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 border-b border-charcoal/5 pb-2">
              <dt className="text-sm text-charcoal/55">{k}</dt>
              <dd className="text-right text-sm font-medium tabular-nums text-charcoal">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-charcoal/45">
          {t.ficheMillesime.replace("{millesime}", r.millesimeRole).replace("{reference}", r.referenceMarche)}
        </p>
      </section>

      {/* Valeur estimée */}
      <section className="rounded-2xl bg-[#1D3A5F] p-5 text-white shadow-sm sm:p-6">
        <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-white/60">{t.valeurTitre}</h2>
        <p className="mt-2 font-display text-4xl tabular-nums sm:text-5xl">{fmt.format(r.estimation)}</p>
        <p className="mt-2 text-sm text-white/65">
          {t.ficheFourchette} : {fmt.format(r.fourchetteBasse)} – {fmt.format(r.fourchetteHaute)}
        </p>
      </section>

      {/* Verdicts enrichis */}
      <section>
        <h2 className="font-display text-xl text-charcoal">{t.verdictsTitre}</h2>
        <p className="mt-1 text-sm text-charcoal/60">{t.verdictsTexte}</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {verdicts.map(({ titre, v }) => (
            <div key={titre} className="flex flex-col rounded-2xl border border-charcoal/10 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-lg text-charcoal">{titre}</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${PASTILLE[v.niveau]}`}>
                  {t[`niveau${suffixe[v.niveau]}` as keyof typeof t] as string}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold tabular-nums text-forest">
                {v.chiffreCle} <span className="font-normal text-charcoal/45">· {t.verdictScore} {v.score}/100</span>
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-charcoal/80">{v.conseil}</p>
              <details className="mt-3 border-t border-charcoal/10 pt-3">
                <summary className="cursor-pointer text-sm font-medium text-forest">
                  {t.verdictPourquoi}
                </summary>
                <ul className="mt-2 space-y-2.5">
                  {v.facteurs.map((f, i) => (
                    <li key={i} className="text-[13px] leading-relaxed">
                      <span
                        className={`mr-1.5 inline-block h-2 w-2 rounded-full align-middle ${
                          f.sens === "positif"
                            ? "bg-emerald-500"
                            : f.sens === "negatif"
                              ? "bg-rose-500"
                              : "bg-charcoal/30"
                        }`}
                        aria-hidden="true"
                      />
                      <strong className="font-semibold text-charcoal">{f.titre}</strong>
                      <span className="text-charcoal/65"> — {f.detail}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[13px] font-medium text-charcoal">{t.verdictRisques}</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-charcoal/65">
                  {v.risques.map((r2, i) => (
                    <li key={i}>{r2}</li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-charcoal/45">{t.investirNote}</p>
      </section>

      {/* Horizon temporel */}
      <section className="rounded-2xl border border-charcoal/10 bg-ivory p-5 sm:p-6">
        <h2 className="font-display text-xl text-charcoal">{t.horizonTitre}</h2>
        <p className="mt-1 text-sm text-charcoal/60">{t.horizonTexte}</p>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          {[
            { label: t.horizonMaintenant, valeur: r.estimation, actif: true },
            { label: t.horizon3ans, valeur: h3, actif: false },
            { label: t.horizon5ans, valeur: h5, actif: false },
          ].map((h) => (
            <div
              key={h.label}
              className={`rounded-xl px-2 py-4 ${h.actif ? "bg-[#1D3A5F] text-white" : "bg-white text-charcoal"}`}
            >
              <p className={`text-xs ${h.actif ? "text-white/65" : "text-charcoal/55"}`}>{h.label}</p>
              <p className="mt-1 font-display text-lg tabular-nums sm:text-2xl">{fmt.format(h.valeur)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courbe historique */}
      <section className="rounded-2xl border border-charcoal/10 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-display text-xl text-charcoal">{t.courbeTitre}</h2>
        <p className="mt-1 text-sm text-charcoal/60">{t.courbeNote}</p>
        {courbe.tronquee && <p className="mt-1 text-xs text-charcoal/45">{t.courbeTronquee}</p>}
        <div className="mt-4">
          <CourbeValeur
            points={courbe.points}
            lang={lang}
            legendePasse={t.courbeLegendePasse}
            legendeActuel={t.courbeLegendeActuel}
            legendeScenario={t.courbeLegendeScenario}
            detailsLabel={t.courbeDetails}
            anneeLabel={lang === "fr" ? "Année" : "Year"}
            valeurLabel={t.ficheValeurEstimee}
            infobulleScenario={t.courbeInfobulleScenario}
            variationAnnee={t.courbeVariationAnnee}
            consigneSurvol={t.courbeConsigne}
          />
        </div>
      </section>

      {/* Avertissement légal */}
      <section>
        <p className="rounded-xl bg-champagne/25 p-4 text-[13px] leading-relaxed text-charcoal/70">
          {t.avertissement}
        </p>
      </section>
    </div>
  );
}
