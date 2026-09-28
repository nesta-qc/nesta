"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui";

/* ============================================================
 * Calculateur investisseur — assistant guidé.
 * Une question à la fois, centrée à l'écran : l'utilisateur
 * remplit un chiffre ou choisit une option, puis passe à la
 * suivante. 100 % calculé des chiffres saisis : aucune donnée
 * inventée, aucun défaut pré-rempli.
 * ============================================================ */

type NumberQuestion = {
  kind: "number";
  id: string;
  title: string;
  intro: string;
  details: string[];
  unit: string;
  placeholder: string;
  mustBePositive?: boolean;
};

type ChoiceQuestion = {
  kind: "choice";
  id: string;
  title: string;
  intro: string;
  options: { value: string; label: string; desc: string }[];
};

type Question = NumberQuestion | ChoiceQuestion;

const QUESTIONS: Question[] = [
  {
    kind: "choice",
    id: "type",
    title: "Quel type de propriété analysez-vous ?",
    intro: "Pour adapter le vocabulaire du rapport à votre situation.",
    options: [
      {
        value: "plex",
        label: "Plex (2 à 5 logements)",
        desc: "Duplex, triplex, quadruplex, quintuplex",
      },
      {
        value: "immeuble",
        label: "Immeuble de 6 logements et plus",
        desc: "Petit ou grand immeuble locatif",
      },
      {
        value: "condo",
        label: "Condo locatif",
        desc: "Unité en copropriété mise en location",
      },
      {
        value: "maison",
        label: "Maison unifamiliale",
        desc: "Maison louée ou à revenus",
      },
      {
        value: "autre",
        label: "Autre",
        desc: "Mixte, commercial, terrain à revenus",
      },
    ],
  },
  {
    kind: "number",
    id: "prix",
    title: "Quel est le prix d'achat ?",
    intro:
      "Le prix demandé par le vendeur, ou le prix que vous envisagez d'offrir.",
    details: [
      "Comptez uniquement le prix de l'immeuble : pas les frais de notaire ni la taxe de bienvenue.",
      "Si vous hésitez entre deux prix, faites le calcul deux fois pour comparer.",
    ],
    unit: "$",
    placeholder: "650 000",
    mustBePositive: true,
  },
  {
    kind: "number",
    id: "revenus",
    title: "Quels sont les revenus bruts annuels ?",
    intro: "La somme de tous les loyers perçus sur une année complète.",
    details: [
      "Additionnez le loyer mensuel de chaque logement, puis multipliez par 12.",
      "Ajoutez les autres revenus : stationnement, buanderie, espaces de rangement.",
      "Utilisez les loyers réels actuels — pas des loyers espérés après rénovation.",
    ],
    unit: "$",
    placeholder: "48 000",
  },
  {
    kind: "choice",
    id: "inoccupation",
    title: "Quel taux d'inoccupation prévoyez-vous ?",
    intro:
      "La part des revenus perdue quand un logement reste vide entre deux locataires, ou lors de loyers impayés.",
    options: [
      { value: "0", label: "0 %", desc: "Aucune vacance prévue" },
      { value: "3", label: "3 %", desc: "Environ 2 semaines de vacance par année" },
      { value: "5", label: "5 %", desc: "Environ 3 semaines de vacance par année" },
      {
        value: "10",
        label: "10 %",
        desc: "Scénario prudent : plus d'un mois de vacance",
      },
    ],
  },
  {
    kind: "number",
    id: "depenses",
    title: "Quelles sont les dépenses d'exploitation annuelles ?",
    intro:
      "Tout ce que l'immeuble vous coûte chaque année — sauf l'hypothèque, calculée séparément.",
    details: [
      "Taxes municipales et taxes scolaires",
      "Assurances de l'immeuble",
      "Entretien et réparations courantes",
      "Frais de gestion ou conciergerie, s'il y en a",
      "Électricité, chauffage et déneigement — seulement si c'est vous qui les payez",
    ],
    unit: "$",
    placeholder: "15 000",
  },
  {
    kind: "number",
    id: "mdf",
    title: "Quelle est votre mise de fonds ?",
    intro: "L'argent que vous sortez réellement de votre poche à l'achat.",
    details: [
      "Au Canada, la mise de fonds minimale pour un immeuble locatif est de 20 % du prix.",
      "Plus elle est élevée, plus votre paiement hypothécaire mensuel sera bas.",
    ],
    unit: "$",
    placeholder: "130 000",
  },
  {
    kind: "number",
    id: "taux",
    title: "Quel est le taux hypothécaire ?",
    intro: "Le taux d'intérêt annuel de votre prêt, en pourcentage.",
    details: [
      "Utilisez le taux affiché par votre banque ou votre courtier hypothécaire.",
      "Astuce : refaites le calcul avec un taux 1 ou 2 points plus haut — c'est votre test de résistance.",
    ],
    unit: "%",
    placeholder: "5,25",
  },
  {
    kind: "choice",
    id: "amortissement",
    title: "Sur combien d'années le prêt est-il amorti ?",
    intro: "La durée totale prévue pour rembourser complètement l'hypothèque.",
    options: [
      {
        value: "15",
        label: "15 ans",
        desc: "Paiements plus élevés, beaucoup moins d'intérêts",
      },
      {
        value: "20",
        label: "20 ans",
        desc: "Équilibre entre paiement et intérêts",
      },
      {
        value: "25",
        label: "25 ans",
        desc: "Le choix le plus courant au Québec",
      },
      {
        value: "30",
        label: "30 ans",
        desc: "Paiements plus bas, plus d'intérêts au total",
      },
    ],
  },
];

const TYPE_LABELS: Record<string, string> = {
  plex: "votre plex",
  immeuble: "votre immeuble",
  condo: "votre condo",
  maison: "votre maison",
  autre: "votre propriété",
};

function parseNumber(raw: string): number {
  const cleaned = raw.replace(/[\s$]/g, "").replace(",", ".");
  const n = Number(cleaned);
  return Number.isFinite(n) && n >= 0 ? n : NaN;
}

const fmtCAD = (n: number) =>
  new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);

const fmtNum = (n: number) =>
  new Intl.NumberFormat("fr-CA", { maximumFractionDigits: 2 }).format(n);

const fmtPct = (n: number) => `${fmtNum(n)} %`;

export function CalculatorWizard() {
  const [step, setStep] = useState(-1); // -1 = écran d'accueil
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");

  const totalQuestions = QUESTIONS.length;
  const question = step >= 0 && step < totalQuestions ? QUESTIONS[step] : null;
  const isSummary = step === totalQuestions;
  const isResults = step === totalQuestions + 1;

  const startQuestion = (index: number) => {
    setError("");
    setDraft(answers[QUESTIONS[index].id] ?? "");
    setStep(index);
  };

  const goNext = () => {
    if (!question) return;
    if (question.kind === "number") {
      const n = parseNumber(draft);
      if (!Number.isFinite(n)) {
        setError("Entrez un montant valide (chiffres seulement).");
        return;
      }
      if (question.mustBePositive && n <= 0) {
        setError("Le prix d'achat doit être supérieur à 0 pour calculer.");
        return;
      }
      setAnswers((a) => ({ ...a, [question.id]: draft.trim() }));
    }
    setError("");
    if (step + 1 < totalQuestions) startQuestion(step + 1);
    else setStep(totalQuestions); // récapitulatif
  };

  const choose = (value: string) => {
    if (!question || question.kind !== "choice") return;
    setAnswers((a) => ({ ...a, [question.id]: value }));
    setError("");
    if (step + 1 < totalQuestions) startQuestion(step + 1);
    else setStep(totalQuestions);
  };

  const goBack = () => {
    setError("");
    if (step > 0) startQuestion(step - 1);
    else setStep(-1);
  };

  const results = useMemo(() => {
    if (!isResults) return null;
    const prix = parseNumber(answers.prix ?? "");
    const revenus = parseNumber(answers.revenus ?? "");
    const depenses = parseNumber(answers.depenses ?? "");
    const inoc = parseNumber(answers.inoccupation ?? "0");
    const mdf = parseNumber(answers.mdf ?? "");
    const taux = parseNumber(answers.taux ?? "");
    const amort = parseNumber(answers.amortissement ?? "25");
    if (![prix, revenus, depenses, mdf, taux].every(Number.isFinite) || prix <= 0)
      return null;

    const revenusEffectifs = revenus * (1 - (Number.isFinite(inoc) ? inoc : 0) / 100);
    const noi = revenusEffectifs - depenses;
    const capRate = (noi / prix) * 100;

    const principal = Math.max(prix - mdf, 0);
    const monthlyRate = taux / 100 / 12;
    const n = Math.round((Number.isFinite(amort) ? amort : 25) * 12);
    let paiementMensuel: number | null = null;
    if (principal > 0 && n > 0) {
      paiementMensuel =
        monthlyRate > 0
          ? (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
            (Math.pow(1 + monthlyRate, n) - 1)
          : principal / n;
    }
    const paiementAnnuel = paiementMensuel !== null ? paiementMensuel * 12 : null;
    const cashflowAnnuel = paiementAnnuel !== null ? noi - paiementAnnuel : null;
    const cashOnCash =
      cashflowAnnuel !== null && mdf > 0 ? (cashflowAnnuel / mdf) * 100 : null;

    return {
      revenusEffectifs,
      noi,
      capRate,
      paiementMensuel,
      cashflowAnnuel,
      cashOnCash,
      typeLabel: TYPE_LABELS[answers.type ?? "autre"] ?? "votre propriété",
      inoc: Number.isFinite(inoc) ? inoc : 0,
    };
  }, [isResults, answers]);

  /* ---------- Écran d'accueil ---------- */
  if (step === -1) {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-14 text-center sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
          Calculateur investisseur
        </p>
        <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">
          Est-ce que cet immeuble est un bon investissement ?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-charcoal/60">
          Répondez à {totalQuestions} questions simples — un chiffre à la fois
          ou un choix parmi des options. À la fin, vous obtenez le taux de
          capitalisation, le cash-flow et le rendement sur votre mise de
          fonds, avec toutes les formules expliquées.
        </p>
        <div className="mx-auto mt-8 grid max-w-lg gap-3 text-left sm:grid-cols-3">
          {[
            { t: "Taux de capitalisation", d: "Le rendement de l'actif lui-même" },
            { t: "Cash-flow", d: "Ce qui reste dans vos poches chaque année" },
            { t: "Rendement / mise de fonds", d: "Ce que votre argent vous rapporte" },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-2xl border border-border bg-white p-4"
            >
              <p className="text-sm font-semibold text-charcoal">{c.t}</p>
              <p className="mt-1 text-xs leading-relaxed text-charcoal/55">
                {c.d}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button onClick={() => startQuestion(0)} className="px-8 py-3 text-base">
            Commencer l'analyse →
          </Button>
        </div>
        <p className="mt-4 text-xs text-charcoal/45">
          2 minutes environ. Vos chiffres restent dans votre navigateur.
        </p>
      </div>
    );
  }

  /* ---------- Résultats ---------- */
  if (isResults && results) {
    const r = results;
    const dash = "—";
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:py-14">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-forest">
          Résultats
        </p>
        <h2 className="mt-3 text-center font-display text-3xl text-charcoal sm:text-4xl">
          L'analyse de {r.typeLabel}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-[15px] text-charcoal/60">
          Calculé à partir des chiffres que vous avez saisis
          {r.inoc > 0
            ? `, avec une provision d'inoccupation de ${fmtNum(r.inoc)} %`
            : ""}
          .
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-forest/25 bg-white p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
              Taux de capitalisation
            </p>
            <p className="mt-2 font-display text-4xl text-forest">
              {fmtPct(r.capRate)}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-charcoal/55">
              Le rendement annuel de l'actif par rapport à son prix, sans
              tenir compte du financement. Plus il est élevé, plus l'immeuble
              rapporte pour chaque dollar investi.
            </p>
            <p className="mt-3 border-t border-border/60 pt-3 font-mono text-[11px] text-charcoal/45">
              Revenu net ÷ prix d'achat
            </p>
          </div>
          <div className="rounded-2xl border border-forest/25 bg-white p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
              Cash-flow annuel
            </p>
            <p
              className={`mt-2 font-display text-4xl ${r.cashflowAnnuel !== null && r.cashflowAnnuel >= 0 ? "text-forest" : "text-charcoal"}`}
            >
              {r.cashflowAnnuel !== null ? fmtCAD(r.cashflowAnnuel) : dash}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-charcoal/55">
              L'argent qui reste chaque année une fois toutes les dépenses et
              l'hypothèque payées. S'il est positif, l'immeuble se paie tout
              seul.
            </p>
            <p className="mt-3 border-t border-border/60 pt-3 font-mono text-[11px] text-charcoal/45">
              Revenu net − hypothèque annuelle
            </p>
          </div>
          <div className="rounded-2xl border border-forest/25 bg-white p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
              Rendement / mise de fonds
            </p>
            <p className="mt-2 font-display text-4xl text-forest">
              {r.cashOnCash !== null ? fmtPct(r.cashOnCash) : dash}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-charcoal/55">
              Le rendement annuel sur l'argent que vous avez réellement sorti
              de votre poche. C'est votre vrai retour sur investissement.
            </p>
            <p className="mt-3 border-t border-border/60 pt-3 font-mono text-[11px] text-charcoal/45">
              Cash-flow annuel ÷ mise de fonds
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-white p-6 sm:p-8">
          <h3 className="font-display text-lg text-charcoal">
            Le détail du calcul
          </h3>
          <dl className="mt-4 divide-y divide-border/60">
            {[
              {
                t: "Revenus effectifs",
                d: "Revenus bruts moins la provision d'inoccupation",
                v: fmtCAD(r.revenusEffectifs),
              },
              {
                t: "Revenu net d'exploitation",
                d: "Revenus effectifs − dépenses d'exploitation",
                v: fmtCAD(r.noi),
              },
              {
                t: "Paiement hypothécaire mensuel",
                d: "Capital + intérêts, selon votre taux et amortissement",
                v: r.paiementMensuel !== null ? fmtCAD(r.paiementMensuel) : dash,
              },
              {
                t: "Cash-flow mensuel",
                d: "Cash-flow annuel ÷ 12",
                v: r.cashflowAnnuel !== null ? fmtCAD(r.cashflowAnnuel / 12) : dash,
              },
            ].map((row) => (
              <div
                key={row.t}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <div>
                  <dt className="text-sm font-medium text-charcoal">
                    {row.t}
                  </dt>
                  <dd className="mt-0.5 text-xs text-charcoal/45">{row.d}</dd>
                </div>
                <dd className="shrink-0 font-display text-lg text-charcoal">
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-white p-6 sm:p-8">
          <h3 className="font-display text-lg text-charcoal">
            Vos réponses
          </h3>
          <p className="mt-1 text-sm text-charcoal/55">
            Modifiez une réponse pour recalculer instantanément.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {QUESTIONS.map((q, i) => (
              <li key={q.id}>
                <button
                  type="button"
                  onClick={() => startQuestion(i)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-border/70 px-4 py-3 text-left transition-colors hover:border-forest"
                >
                  <span>
                    <span className="block text-xs text-charcoal/45">
                      {q.title}
                    </span>
                    <span className="block truncate text-sm font-medium text-charcoal">
                      {q.kind === "choice"
                        ? (q.options.find((o) => o.value === answers[q.id])
                            ?.label ?? "—")
                        : q.id === "taux" || q.id === "inoccupation"
                          ? `${answers[q.id] ?? "—"} %`
                          : answers[q.id]
                            ? `${fmtNum(parseNumber(answers[q.id]))} $`
                            : "—"}
                    </span>
                  </span>
                  <span aria-hidden className="text-sm text-champagne">
                    ✎
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-relaxed text-charcoal/45">
          Outil indicatif : les résultats dépendent entièrement des chiffres
          que vous avez saisis. Ceci n'est pas un conseil financier —
          validez toujours avec un courtier hypothécaire ou un comptable.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              setAnswers({});
              setStep(-1);
            }}
          >
            ↺ Recommencer
          </Button>
          <Button variant="secondary" onClick={() => setStep(totalQuestions)}>
            ← Revoir mes réponses
          </Button>
        </div>
      </div>
    );
  }

  /* ---------- Récapitulatif avant résultats ---------- */
  if (isSummary) {
    return (
      <QuestionShell
        step={step}
        total={totalQuestions}
        onBack={goBack}
        title="Vérifiez vos réponses"
        intro="Tout est bon ? Vous pourrez encore tout modifier sur l'écran des résultats."
      >
        <ul className="flex w-full flex-col gap-2">
          {QUESTIONS.map((q, i) => (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => startQuestion(i)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-white px-5 py-4 text-left transition-colors hover:border-forest"
              >
                <span className="min-w-0">
                  <span className="block text-xs text-charcoal/45">
                    {q.title}
                  </span>
                  <span className="block truncate text-[15px] font-medium text-charcoal">
                    {q.kind === "choice"
                      ? (q.options.find((o) => o.value === answers[q.id])
                          ?.label ?? "—")
                      : answers[q.id]
                        ? q.id === "taux"
                          ? `${answers[q.id]} %`
                          : `${fmtNum(parseNumber(answers[q.id]))} $`
                        : "—"}
                  </span>
                </span>
                <span className="shrink-0 text-sm font-medium text-forest">
                  Modifier
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button
            onClick={() => setStep(totalQuestions + 1)}
            className="w-full px-8 py-3.5 text-base"
          >
            Voir mes résultats →
          </Button>
        </div>
      </QuestionShell>
    );
  }

  /* ---------- Question courante ---------- */
  if (!question) return null;
  return (
    <QuestionShell
      step={step}
      total={totalQuestions}
      onBack={goBack}
      title={question.title}
      intro={question.intro}
    >
      {question.kind === "number" ? (
        <div className="w-full">
          {question.details.length > 0 && (
            <ul className="mb-6 flex flex-col gap-1.5 text-left">
              {question.details.map((d) => (
                <li
                  key={d}
                  className="flex gap-2 text-[13px] leading-relaxed text-charcoal/55"
                >
                  <span aria-hidden className="text-forest">
                    •
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          )}
          <div className="flex items-center justify-center gap-3">
            <div className="relative w-full max-w-xs">
              <input
                autoFocus
                inputMode="decimal"
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") goNext();
                }}
                placeholder={question.placeholder}
                aria-label={question.title}
                className="w-full rounded-2xl border-2 border-border bg-white px-5 py-4 text-center font-display text-3xl text-charcoal placeholder:text-charcoal/25 focus:border-forest focus:outline-none"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xl text-charcoal/35"
              >
                {question.unit}
              </span>
            </div>
          </div>
          {error && (
            <p role="alert" className="mt-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}
          <div className="mt-8">
            <Button onClick={goNext} className="w-full px-8 py-3.5 text-base">
              Continuer →
            </Button>
          </div>
          <p className="mt-3 text-xs text-charcoal/40">
            Astuce : appuyez sur Entrée pour continuer.
          </p>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-3">
          {question.options.map((opt) => {
            const selected = answers[question.id] === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => choose(opt.value)}
                aria-pressed={selected}
                className={`flex w-full items-center justify-between gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all ${
                  selected
                    ? "border-forest bg-forest/[0.04]"
                    : "border-border bg-white hover:border-forest/50"
                }`}
              >
                <span>
                  <span className="block text-[16px] font-semibold text-charcoal">
                    {opt.label}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-charcoal/55">
                    {opt.desc}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                    selected ? "border-forest bg-forest text-white" : "border-border"
                  }`}
                >
                  {selected ? "✓" : ""}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </QuestionShell>
  );
}

/* ---------- Coquille : une question centrée ---------- */
function QuestionShell({
  step,
  total,
  onBack,
  title,
  intro,
  children,
}: {
  step: number;
  total: number;
  onBack: () => void;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  const shownStep = Math.min(step + 1, total);
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col px-5 py-10 sm:py-14">
      {/* Progression */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-xs font-medium text-charcoal/50">
          <button
            type="button"
            onClick={onBack}
            className="rounded-full px-2 py-1 transition-colors hover:bg-ivory hover:text-charcoal"
          >
            ← Retour
          </button>
          <span>
            Question {shownStep} sur {total}
          </span>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-border/60"
          role="progressbar"
          aria-valuenow={shownStep}
          aria-valuemin={1}
          aria-valuemax={total}
        >
          <div
            className="h-full rounded-full bg-forest transition-all duration-300"
            style={{ width: `${(shownStep / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question centrée */}
      <div className="flex flex-1 flex-col items-center justify-start text-center">
        <h2 className="max-w-xl font-display text-3xl leading-tight text-charcoal sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-charcoal/60">
          {intro}
        </p>
        <div className="mt-8 flex w-full max-w-xl flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
