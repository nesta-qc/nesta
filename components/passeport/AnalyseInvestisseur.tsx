"use client";

import { useMemo, useState } from "react";
import type { EstimateSuccess } from "@/lib/estimation/engine";
import { dictionaries } from "@/lib/i18n/dictionaries";
import {
  LOYERS_PAR_VILLE,
  FISCALITE_PAR_VILLE,
  TAUX_HYPOTHECAIRE_DEFAUT_PCT,
  donneesCompletes,
  loyerReference,
  taxesEstimees,
  type VilleInvestisseur,
} from "@/lib/investisseur/donnees";
import {
  NIVEAUX_RENO,
  estimerRenovation,
  superficieARenover,
  type NiveauReno,
} from "@/lib/investisseur/renovation";
import {
  analyserBrrrr,
  analyserFlip,
  analyserLocation,
  analyserSensibilite,
  calculerScore,
  prixReventeDefaut,
  type HypothesesInvestisseur,
  type NiveauScore,
} from "@/lib/investisseur/moteur";

const CATEGORIES_ADMISSIBLES = ["plex", "multi", "condo", "maison"] as const;

function fmtMontant(n: number, lang: "fr" | "en"): string {
  const v = Math.round(n);
  const signe = v < 0 ? "−" : "";
  const abs = Math.abs(v)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, lang === "fr" ? " " : ",");
  return `${signe}${abs} $`;
}

function fmtPct(n: number, lang: "fr" | "en"): string {
  return `${n.toString().replace(".", lang === "fr" ? "," : ".")} %`;
}

const COULEUR_SCORE: Record<NiveauScore, string> = {
  excellent: "bg-emerald-100 text-emerald-900",
  correct: "bg-champagne/40 text-charcoal",
  faible: "bg-rose-100 text-rose-900",
};

function Champ({
  label,
  value,
  onChange,
  suffixe,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffixe: string;
  min?: number;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-charcoal/60">{label}</span>
      <span className="flex items-center gap-1">
        <input
          type="number"
          min={min}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-lg border border-charcoal/15 bg-white px-3 py-2 text-charcoal outline-none focus:border-forest"
        />
        <span className="shrink-0 text-xs text-charcoal/45">{suffixe}</span>
      </span>
    </label>
  );
}

function Ligne({ k, v, fort }: { k: string; v: string; fort?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-charcoal/5 py-1.5 text-sm last:border-0">
      <dt className="text-charcoal/60">{k}</dt>
      <dd className={`tabular-nums text-charcoal ${fort ? "font-semibold" : ""}`}>{v}</dd>
    </div>
  );
}

function Carte({ titre, valeur, sous, positif }: { titre: string; valeur: string; sous?: string; positif?: boolean }) {
  return (
    <div className="rounded-xl border border-charcoal/10 bg-white p-4">
      <p className="text-xs text-charcoal/55">{titre}</p>
      <p
        className={`mt-1 font-display text-2xl tabular-nums ${
          positif === undefined ? "text-charcoal" : positif ? "text-emerald-700" : "text-rose-700"
        }`}
      >
        {valeur}
      </p>
      {sous && <p className="mt-1 text-xs text-charcoal/50">{sous}</p>}
    </div>
  );
}

/**
 * Volet investisseur : cash-flow annuel estimé d'un bien —
 * acheter, rénover, puis louer ou revendre. Les hypothèses sont
 * modifiables ; le modèle interne reste privé.
 */
export function AnalyseInvestisseur({
  result: r,
  lang,
}: {
  result: EstimateSuccess;
  lang: "fr" | "en";
}) {
  const t = dictionaries[lang].investisseur;
  const ville = r.ville as VilleInvestisseur;
  const complet = donneesCompletes(ville);

  const nbLogements = Math.max(1, r.nbLogements || 1);
  const loyerDefaut = loyerReference(ville) ?? 0;
  const taxesRef = taxesEstimees(ville, r.valeurAuRole, nbLogements);
  const superficie = superficieARenover(r.superficieBatimentM2, nbLogements);
  const renoDefaut = superficie ? estimerRenovation(superficie, "standard") : null;
  const vacanceDefaut = LOYERS_PAR_VILLE[ville]?.inoccupationPct ?? 3;

  const [onglet, setOnglet] = useState<"louer" | "revendre" | "brrrr">("louer");
  const [miseDeFondsPct, setMiseDeFondsPct] = useState(20);
  const [taux, setTaux] = useState(TAUX_HYPOTHECAIRE_DEFAUT_PCT);
  const [loyer, setLoyer] = useState(loyerDefaut);
  const [niveauReno, setNiveauReno] = useState<NiveauReno>("standard");
  const [coutRenoManuel, setCoutRenoManuel] = useState<number | null>(null);
  const [vacancePct, setVacancePct] = useState(vacanceDefaut >= 0 ? vacanceDefaut : 3);
  const [chargesMensuelles, setChargesMensuelles] = useState(0);
  const [prixReventeManuel, setPrixReventeManuel] = useState<number | null>(null);
  const [dureeFlip, setDureeFlip] = useState(8);
  const [taxes, setTaxes] = useState(taxesRef.montant);

  const coutReno = useMemo(() => {
    if (coutRenoManuel !== null) return Math.max(0, coutRenoManuel);
    if (!superficie) return 0;
    return estimerRenovation(superficie, niveauReno)?.central ?? 0;
  }, [coutRenoManuel, superficie, niveauReno]);

  const hypotheses: HypothesesInvestisseur = useMemo(
    () => ({
      prixAchat: r.estimation,
      miseDeFondsPct,
      tauxHypothecairePct: taux,
      amortissementAns: 25,
      coutRenovation: coutReno,
      loyerMensuelParLogement: loyer,
      nbLogements,
      autresRevenusAnnuels: 0,
      taxesAnnuelles: taxes,
      assuranceAnnuelle: Math.round(r.estimation * 0.0035),
      entretienPct: 6,
      gestionPct: 0,
      vacancePct,
      chargesMensuelles,
      fraisAchatPct: 1.8,
      fraisVentePct: 5,
      dureeDetentionMoisFlip: dureeFlip,
      prixReventeApresReno: prixReventeManuel,
    }),
    [r.estimation, miseDeFondsPct, taux, coutReno, loyer, nbLogements, taxes, vacancePct, chargesMensuelles, dureeFlip, prixReventeManuel],
  );

  const loc = useMemo(() => analyserLocation(hypotheses), [hypotheses]);
  const flip = useMemo(() => analyserFlip(hypotheses), [hypotheses]);
  const brrrr = useMemo(() => analyserBrrrr(hypotheses, loc), [hypotheses, loc]);
  const sensibilite = useMemo(() => analyserSensibilite(hypotheses), [hypotheses]);
  const score = useMemo(
    () =>
      calculerScore(
        loc,
        flip,
        vacanceDefaut,
        sensibilite.find((s) => s.scenario === "taux+2")?.cashFlowAnnuel ?? 0,
      ),
    [loc, flip, vacanceDefaut, sensibilite],
  );

  if (!CATEGORIES_ADMISSIBLES.includes(r.categorie as (typeof CATEGORIES_ADMISSIBLES)[number])) {
    return null;
  }

  const niveauLabel =
    score.niveau === "excellent" ? t.scoreExcellent : score.niveau === "correct" ? t.scoreCorrect : t.scoreFaible;
  const prixReventeAffiche = prixReventeManuel ?? prixReventeDefaut(r.estimation, coutReno);
  const louerGagne = loc.cashFlowAnnuel >= (flip.roiAnnualisePct / 100) * loc.cashInvestiTotal;

  const onglets = [
    { id: "louer" as const, label: t.ongletLouer },
    { id: "revendre" as const, label: t.ongletRevendre },
    { id: "brrrr" as const, label: t.ongletBrrrr },
  ];

  return (
    <section className="rounded-2xl border border-charcoal/10 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">{t.surTitre}</p>
          <h2 className="mt-2 font-display text-xl text-charcoal">{t.titre}</h2>
        </div>
        <div className={`rounded-full px-4 py-2 text-sm font-bold ${COULEUR_SCORE[score.niveau]}`}>
          {score.score}/100 · {niveauLabel}
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{t.sousTitre}</p>

      {!complet && (
        <p className="mt-3 rounded-xl bg-champagne/25 p-3 text-[13px] text-charcoal/70">{t.noteDonneesEnCours}</p>
      )}

      {/* Onglets de stratégie */}
      <div className="mt-5 flex gap-2" role="tablist">
        {onglets.map((o) => (
          <button
            key={o.id}
            role="tab"
            aria-selected={onglet === o.id}
            onClick={() => setOnglet(o.id)}
            className={`flex-1 rounded-full border px-3 py-2.5 text-sm font-semibold transition-colors ${
              onglet === o.id
                ? "border-forest bg-forest text-white"
                : "border-border bg-white text-charcoal hover:border-forest/50"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* --- LOUER --- */}
      {onglet === "louer" && (
        <div className="mt-5">
          <div className="grid grid-cols-2 gap-3">
            <Carte titre={t.cashFlowAnnuel} valeur={fmtMontant(loc.cashFlowAnnuel, lang)} positif={loc.cashFlowAnnuel >= 0} />
            <Carte titre={t.cashFlowMensuel} valeur={fmtMontant(loc.cashFlowMensuel, lang)} positif={loc.cashFlowAnnuel >= 0} />
            <Carte titre={t.capRate} valeur={fmtPct(loc.capRatePct, lang)} />
            <Carte titre={t.cashOnCash} valeur={fmtPct(loc.cashOnCashPct, lang)} />
          </div>
          <dl className="mt-4">
            <Ligne k={t.revenusBruts} v={fmtMontant(loc.revenusBrutsAnnuels, lang)} />
            <Ligne k={`${t.vacance} (${fmtPct(vacancePct, lang)})`} v={`−${fmtMontant(loc.perteVacanceAnnuelle, lang)}`} />
            <Ligne k={t.revenusEffectifs} v={fmtMontant(loc.revenusEffectifs, lang)} fort />
            <Ligne k={t.taxes} v={fmtMontant(loc.taxes, lang)} />
            <Ligne k={t.assurance} v={fmtMontant(loc.assurance, lang)} />
            {chargesMensuelles > 0 && <Ligne k={t.charges} v={fmtMontant(loc.charges, lang)} />}
            <Ligne k={t.entretien} v={fmtMontant(loc.entretien, lang)} />
            <Ligne k={t.depensesExploitation} v={fmtMontant(loc.depensesExploitation, lang)} fort />
            <Ligne k={t.rno} v={fmtMontant(loc.rno, lang)} fort />
            <Ligne k={t.serviceDette} v={fmtMontant(loc.serviceDetteAnnuel, lang)} />
          </dl>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-ivory p-3">
              <p className="text-xs text-charcoal/55">{t.seuilRentabilite}</p>
              <p className="mt-1 font-semibold tabular-nums text-charcoal">
                {fmtPct(loc.seuilRentabilitePct, lang)} <span className="text-xs font-normal text-charcoal/50">{t.seuilRentabiliteDetail}</span>
              </p>
            </div>
            <div className="rounded-xl bg-ivory p-3">
              <p className="text-xs text-charcoal/55">{t.delaiRetour}</p>
              <p className="mt-1 font-semibold tabular-nums text-charcoal">
                {loc.delaiRetourAns !== null ? `${loc.delaiRetourAns.toString().replace(".", lang === "fr" ? "," : ".")} ` : "— "}
                <span className="text-xs font-normal text-charcoal/50">{t.delaiRetourDetail}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- REVENDRE --- */}
      {onglet === "revendre" && (
        <div className="mt-5">
          <div className="grid grid-cols-2 gap-3">
            <Carte titre={t.profitNet} valeur={fmtMontant(flip.profitNet, lang)} positif={flip.profitNet >= 0} />
            <Carte titre={t.roi} valeur={fmtPct(flip.roiPct, lang)} positif={flip.roiPct >= 0} />
            <Carte titre={t.roiAnnualise} valeur={fmtPct(flip.roiAnnualisePct, lang)} positif={flip.roiAnnualisePct >= 0} />
            <Carte titre={t.prixRevente} valeur={fmtMontant(flip.prixRevente, lang)} />
          </div>
          <dl className="mt-4">
            <Ligne k={t.prixRevente} v={fmtMontant(flip.prixRevente, lang)} />
            <Ligne k={t.fraisVente} v={`−${fmtMontant(flip.fraisVente, lang)}`} />
            <Ligne k={t.coutTotalProjet} v={fmtMontant(loc.coutTotal, lang)} fort />
          </dl>
        </div>
      )}

      {/* --- BRRRR --- */}
      {onglet === "brrrr" && (
        <div className="mt-5">
          <div className="grid grid-cols-2 gap-3">
            <Carte titre={t.capitalRecupere} valeur={fmtMontant(brrrr.capitalRecupere, lang)} sous={`${fmtPct(brrrr.pctRecupere, lang)} du cash investi`} />
            <Carte titre={t.cashRestant} valeur={fmtMontant(brrrr.cashRestant, lang)} />
            <Carte titre={t.cashFlowApresRefi} valeur={fmtMontant(brrrr.cashFlowAnnuelApresRefi, lang)} positif={brrrr.cashFlowAnnuelApresRefi >= 0} />
            <Carte
              titre={t.rendementCashRestant}
              valeur={brrrr.rendementCashRestantPct !== null ? fmtPct(brrrr.rendementCashRestantPct, lang) : "∞"}
            />
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-charcoal/60">
            {t.lectureBrrrr
              .replace("{pct}", fmtPct(brrrr.pctRecupere, lang))
              .replace("{cf}", fmtMontant(brrrr.cashFlowAnnuelApresRefi, lang))}
          </p>
        </div>
      )}

      {/* Lecture : quelle stratégie gagne ? */}
      <div className="mt-5 rounded-xl bg-forest/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">{t.lectureTitre}</p>
        <p className="mt-1 text-sm leading-relaxed text-charcoal/75">
          {louerGagne ? t.lectureLouerGagne : t.lectureFlipGagne}
        </p>
      </div>

      {/* Score détaillé */}
      <div className="mt-4">
        <div className="h-2 overflow-hidden rounded-full bg-charcoal/10">
          <div
            className={`h-full rounded-full ${score.niveau === "excellent" ? "bg-emerald-500" : score.niveau === "correct" ? "bg-champagne" : "bg-rose-400"}`}
            style={{ width: `${score.score}%` }}
          />
        </div>
        <ul className="mt-2 space-y-1">
          {score.facteurs.map((f) => (
            <li key={f.id} className="flex items-baseline justify-between gap-3 text-[13px]">
              <span className="text-charcoal/65">
                <span className="font-medium text-charcoal">{f.label}</span> — {f.detail}
              </span>
              <span className="shrink-0 tabular-nums text-charcoal/60">{f.points}/{f.max}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sensibilité */}
      <details className="mt-4 rounded-xl border border-charcoal/10 p-4">
        <summary className="cursor-pointer text-sm font-medium text-charcoal">{t.sensibiliteTitre}</summary>
        <dl className="mt-2">
          {sensibilite.map((s) => (
            <Ligne
              key={s.scenario}
              k={
                s.scenario === "base" ? t.sensibiliteBase
                : s.scenario === "taux+1" ? t.sensibiliteTaux1
                : s.scenario === "taux+2" ? t.sensibiliteTaux2
                : s.scenario === "vacance5" ? t.sensibiliteVacance5
                : s.scenario === "vacance10" ? t.sensibiliteVacance10
                : t.sensibiliteLoyers
              }
              v={fmtMontant(s.cashFlowAnnuel, lang)}
              fort={s.scenario === "base"}
            />
          ))}
        </dl>
      </details>

      {/* Hypothèses modifiables */}
      <details className="mt-3 rounded-xl border border-charcoal/10 p-4">
        <summary className="cursor-pointer text-sm font-medium text-charcoal">{t.hypotheses}</summary>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Champ label={t.hMiseDeFonds} value={miseDeFondsPct} onChange={setMiseDeFondsPct} suffixe="%" />
          <Champ label={t.hTaux} value={taux} onChange={setTaux} suffixe="%" />
          <Champ label={t.hLoyer} value={loyer} onChange={setLoyer} suffixe="$" />
          <Champ label={t.hVacance} value={vacancePct} onChange={setVacancePct} suffixe="%" />
          <Champ label={t.hCoutReno} value={coutReno} onChange={(v) => setCoutRenoManuel(v)} suffixe="$" />
          <Champ label={t.hPrixRevente} value={prixReventeAffiche} onChange={(v) => setPrixReventeManuel(v)} suffixe="$" />
          <Champ label={t.hDureeFlip} value={dureeFlip} onChange={setDureeFlip} suffixe={t.mois} min={1} />
          <Champ label={t.hTaxes} value={taxes} onChange={setTaxes} suffixe="$" />
          {r.categorie === "condo" && (
            <Champ label={t.hCharges} value={chargesMensuelles} onChange={setChargesMensuelles} suffixe="$" />
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2" role="radiogroup" aria-label={t.hNiveauReno}>
          <span className="w-full text-sm text-charcoal/60">{t.hNiveauReno}</span>
          {(Object.keys(NIVEAUX_RENO) as NiveauReno[]).map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={niveauReno === n && coutRenoManuel === null}
              onClick={() => {
                setNiveauReno(n);
                setCoutRenoManuel(null);
              }}
              className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
                niveauReno === n && coutRenoManuel === null
                  ? "border-forest bg-forest text-white"
                  : "border-border bg-white text-charcoal hover:border-forest/50"
              }`}
            >
              {n === "rafraichir" ? t.renoRafraichir : n === "standard" ? t.renoStandard : t.renoComplete}
            </button>
          ))}
          {coutRenoManuel !== null && (
            <button
              type="button"
              onClick={() => setCoutRenoManuel(null)}
              className="rounded-full border border-champagne bg-champagne/20 px-4 py-2 text-[13px] font-semibold text-charcoal"
            >
              {t.auto} : {fmtMontant(superficie ? estimerRenovation(superficie, niveauReno)?.central ?? 0 : 0, lang)}
            </button>
          )}
        </div>
        {complet && (
          <p className="mt-3 text-xs leading-relaxed text-charcoal/50">
            {t.noteLoyers
              .replace("{source}", LOYERS_PAR_VILLE[ville].sourceLoyers)
              .replace("{periode}", LOYERS_PAR_VILLE[ville].periodeLoyers)}
          </p>
        )}
        <p className="mt-2 text-xs leading-relaxed text-charcoal/50">
          {taxesRef.verifie
            ? t.noteTaxesVerifiees.replace("{source}", FISCALITE_PAR_VILLE[ville].source)
            : t.noteTaxesHeuristique}
        </p>
      </details>

      <p className="mt-4 rounded-xl bg-champagne/25 p-4 text-[13px] leading-relaxed text-charcoal/70">
        {t.avertissement}
      </p>
    </section>
  );
}
