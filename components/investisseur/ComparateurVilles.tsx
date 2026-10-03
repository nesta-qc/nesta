import { comparerVilles } from "@/lib/investisseur/comparateur";
import { dictionaries } from "@/lib/i18n/dictionaries";

function fmtMontant(n: number, lang: "fr" | "en"): string {
  const abs = Math.abs(Math.round(n))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, lang === "fr" ? " " : ",");
  return `${n < 0 ? "−" : ""}${abs} $`;
}

function fmtPct(n: number, lang: "fr" | "en"): string {
  return `${n.toString().replace(".", lang === "fr" ? "," : ".")} %`;
}

/**
 * Comparateur de villes : un plex type de 3 logements modélisé
 * ville par ville, classé par cash-flow annuel. Données centralisées
 * du site (snapshot statistiques) + loyers SCHL.
 */
export async function ComparateurVilles({
  lang,
  taux,
}: {
  lang: "fr" | "en";
  taux: number;
}) {
  const lignes = await comparerVilles(taux);
  if (!lignes || lignes.length === 0) return null;
  const t = dictionaries[lang].investisseur;

  return (
    <section className="mt-10 rounded-2xl border border-charcoal/10 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
        {t.surTitre}
      </p>
      <h2 className="mt-2 font-display text-xl text-charcoal">{t.comparateurTitre}</h2>
      <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{t.comparateurTexte}</p>

      <ol className="mt-4 space-y-2">
        {lignes.map((l, i) => (
          <li
            key={l.ville}
            className="flex items-center gap-3 rounded-xl border border-charcoal/10 p-3"
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                i === 0 ? "bg-forest text-white" : "bg-charcoal/5 text-charcoal/60"
              }`}
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-charcoal">{l.nomVille}</p>
              <p className="text-xs text-charcoal/50">
                {t.comparateurPrix} {fmtMontant(l.prixTypique, lang)} · {t.comparateurLoyer}{" "}
                {fmtMontant(l.loyerMensuel, lang)} · {t.comparateurInoccupation} {fmtPct(l.inoccupationPct, lang)}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p
                className={`font-display text-lg tabular-nums ${
                  l.cashFlowAnnuel >= 0 ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {fmtMontant(l.cashFlowAnnuel, lang)}
              </p>
              <p className="text-xs tabular-nums text-charcoal/50">
                {t.cashFlowAnnuel.toLowerCase()} · Cap {fmtPct(l.capRatePct, lang)}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs leading-relaxed text-charcoal/45">{t.comparateurNote}</p>
    </section>
  );
}
