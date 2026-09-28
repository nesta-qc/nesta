"use client";

import { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Field,
  Input,
  Select,
} from "@/components/ui";
import { formatPrice } from "@/lib/format";
import { VILLES, type VilleSlug } from "@/lib/estimation/villes";
import type {
  CategorieBien,
  EstimateResult,
  PorteePlex,
} from "@/lib/estimation/engine";

const CATEGORIE_LABELS: Record<CategorieBien, string> = {
  terrain: "Terrain",
  maison: "Maison",
  condo: "Copropriété",
  plex: "Plex (2 à 4 logements)",
  multi: "Immeuble multi-logements",
  commercial: "Commercial",
};

const TYPE_OPTIONS: { value: "" | CategorieBien; label: string }[] = [
  { value: "", label: "Détection automatique" },
  { value: "maison", label: "Maison" },
  { value: "condo", label: "Copropriété (condo)" },
  { value: "plex", label: "Plex (2 à 4 logements)" },
  { value: "multi", label: "Immeuble multi-logements" },
  { value: "terrain", label: "Terrain" },
  { value: "commercial", label: "Commercial" },
];

/** "1000 AV DU MONT-ROYAL E" → "1000 av. Du Mont-royal Est". */
const ORIENTATION_LABELS: Record<string, string> = {
  E: "Est",
  O: "Ouest",
  N: "Nord",
  S: "Sud",
};

/** Affiche une clé normalisée "2219 R DUVERNAY" de façon lisible. */
function prettyKey(key: string): string {
  const [base, apt] = key.split("|APT ");
  let pretty = base
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bR\b/, "rue")
    .replace(/\bAv\b/, "av.")
    .replace(/\bBoul\b/, "boul.")
    .replace(/\bCh\b/, "ch.")
    .replace(/\bPl\b/, "pl.");
  pretty = pretty.replace(
    / ([EONS])$/,
    (m, o: string) => ` ${ORIENTATION_LABELS[o] ?? o}`,
  );
  return apt ? `${pretty}, app. ${apt}` : pretty;
}

/**
 * Formulaire d'estimation : ville, adresse (avec autocomplétion sur le
 * rôle d'évaluation foncière), n° de suite optionnel, puis résultat.
 */
export function EstimationForm() {
  const [ville, setVille] = useState<VilleSlug>("montreal");
  const [adresse, setAdresse] = useState("");
  const [suite, setSuite] = useState("");
  const [typeBien, setTypeBien] = useState<"" | CategorieBien>("");
  const [porteePlex, setPorteePlex] = useState<PorteePlex>("immeuble");
  const [horizon, setHorizon] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [optionsAmbigues, setOptionsAmbigues] = useState<string[] | null>(null);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Autocomplétion (débouncée) sur l'index du rôle d'évaluation.
  useEffect(() => {
    if (adresse.trim().length < 3) return;
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/estimation/suggest?ville=${ville}&q=${encodeURIComponent(adresse)}`,
        );
        const data = (await res.json()) as string[];
        setSuggestions(Array.isArray(data) ? data : []);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      }
    }, 250);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [adresse, ville]);

  // Fermer les suggestions au clic hors du champ.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setOptionsAmbigues(null);
    try {
      const res = await fetch("/api/estimation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ville,
          adresse,
          suite: suite || undefined,
          typeBien: typeBien || undefined,
          porteePlex: typeBien === "plex" ? porteePlex : undefined,
          projectionAnnees: horizon > 0 ? horizon : undefined,
        }),
      });
      const data = (await res.json()) as EstimateResult;
      if (data.found) {
        setResult(data);
      } else if (data.reason === "adresse_ambigue") {
        setOptionsAmbigues(data.options ?? []);
        setError(
          "Plusieurs adresses correspondent (orientation Est/Ouest/Nord/Sud). Précisez :",
        );
      } else if (data.reason === "adresse_introuvable") {
        setError(
          "Adresse introuvable au rôle d'évaluation. Vérifiez l'orthographe ou essayez une adresse voisine.",
        );
      } else {
        setError("Veuillez saisir une adresse valide (numéro civique + rue).");
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  /** Lève une ambiguïté d'orientation en soumettant l'option choisie. */
  function choisirOptionAmbigue(option: string) {
    setAdresse(prettyKey(option));
    setOptionsAmbigues(null);
    setError(null);
    // Laisse le champ se mettre à jour avant de soumettre.
    setTimeout(() => formRef.current?.requestSubmit(), 0);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6 sm:p-8">
        <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5">
          <Field label="Ville" htmlFor="estimation-ville" required>
            <Select
              id="estimation-ville"
              value={ville}
              onChange={(e) => {
                setVille(e.target.value as VilleSlug);
                setAdresse("");
                setSuggestions([]);
                setResult(null);
                setOptionsAmbigues(null);
              }}
            >
              {VILLES.map((v) => (
                <option key={v.slug} value={v.slug}>
                  {v.nom}
                </option>
              ))}
            </Select>
          </Field>

          <Field
            label="Type de bien"
            htmlFor="estimation-type"
            hint="Laissez la détection automatique en cas de doute"
          >
            <Select
              id="estimation-type"
              value={typeBien}
              onChange={(e) => {
                setTypeBien(e.target.value as "" | CategorieBien);
                setResult(null);
              }}
            >
              {TYPE_OPTIONS.map((o) => (
                <option key={o.label} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>

          {typeBien === "plex" && (
            <Field label="Portée de l'estimation" htmlFor="estimation-portee">
              <div
                id="estimation-portee"
                role="radiogroup"
                aria-label="Portée de l'estimation"
                className="flex gap-2"
              >
                {(
                  [
                    { value: "immeuble", label: "Immeuble complet" },
                    { value: "logement", label: "Un seul logement" },
                  ] as { value: PorteePlex; label: string }[]
                ).map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    role="radio"
                    aria-checked={porteePlex === o.value}
                    onClick={() => {
                      setPorteePlex(o.value);
                      setResult(null);
                    }}
                    className={`flex-1 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                      porteePlex === o.value
                        ? "border-forest bg-forest text-white"
                        : "border-border bg-white text-charcoal hover:border-forest/50"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </Field>
          )}

          <Field
            label="Horizon"
            htmlFor="estimation-horizon"
            hint="La valeur affichée reste la valeur actuelle"
          >
            <div
              id="estimation-horizon"
              role="radiogroup"
              aria-label="Horizon de projection"
              className="flex gap-2"
            >
              {[
                { value: 0, label: "Valeur actuelle" },
                { value: 3, label: "+ 3 ans" },
                { value: 5, label: "+ 5 ans" },
              ].map((o) => (
                <button
                  key={o.value}
                  type="button"
                  role="radio"
                  aria-checked={horizon === o.value}
                  onClick={() => {
                    setHorizon(o.value);
                    setResult(null);
                  }}
                  className={`flex-1 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                    horizon === o.value
                      ? "border-forest bg-forest text-white"
                      : "border-border bg-white text-charcoal hover:border-forest/50"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </Field>

          <div ref={boxRef} className="relative">
            <Field
              label="Adresse de la propriété"
              htmlFor="estimation-adresse"
              hint="Numéro civique et rue, ex. 2219 rue Duvernay"
              required
            >
              <Input
                id="estimation-adresse"
                value={adresse}
                onChange={(e) => {
                  const v = e.target.value;
                  setAdresse(v);
                  if (v.trim().length < 3) setSuggestions([]);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Ex. 2219 rue Duvernay"
                autoComplete="off"
              />
            </Field>
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-border bg-white shadow-lg">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      className="w-full px-4 py-2.5 text-left text-sm text-charcoal hover:bg-cream"
                      onClick={() => {
                        setAdresse(prettyKey(s));
                        setShowSuggestions(false);
                      }}
                    >
                      {prettyKey(s)}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Field
            label="N° d'appartement ou de bureau (optionnel)"
            htmlFor="estimation-suite"
          >
            <Input
              id="estimation-suite"
              value={suite}
              onChange={(e) => setSuite(e.target.value)}
              placeholder="Ex. 201"
              autoComplete="off"
            />
          </Field>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          {optionsAmbigues && optionsAmbigues.length > 0 && (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Préciser l'adresse">
              {optionsAmbigues.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => choisirOptionAmbigue(o)}
                  className="rounded-full border border-forest/40 bg-white px-4 py-2 text-sm font-semibold text-forest transition-colors duration-200 hover:bg-forest hover:text-white"
                >
                  {prettyKey(o)}
                </button>
              ))}
            </div>
          )}

          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? "Calcul en cours…" : "Estimer ma propriété"}
          </Button>
        </form>
      </Card>

      {result && result.found && (
        <Card className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{CATEGORIE_LABELS[result.categorie]}</Badge>
            <Badge>{result.villeNom}</Badge>
            {result.arrondissement && (
              <Badge>{result.arrondissement}</Badge>
            )}
            {result.porteePlex === "logement" && (
              <Badge>
                1 logement{result.nbLogements > 1 ? ` (sur ${result.nbLogements})` : ""}
              </Badge>
            )}
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
            Valeur actuelle estimée
          </p>
          <p className="mt-2 font-display text-5xl text-forest">
            {formatPrice(result.estimation)}
          </p>
          <p className="mt-2 text-sm text-charcoal/60">
            Fourchette probable :{" "}
            <span className="font-semibold text-charcoal">
              {formatPrice(result.fourchetteBasse)} –{" "}
              {formatPrice(result.fourchetteHaute)}
            </span>
          </p>
          <p className="mt-1 text-xs text-charcoal/40">
            Marché de référence : {result.referenceMarche}
          </p>

          {result.projection && (
            <div className="mt-6 rounded-2xl border border-border bg-cream/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
                Projection indicative — dans {result.projection.annees} ans
              </p>
              <p className="mt-2 font-display text-3xl text-charcoal">
                {formatPrice(result.projection.estimation)}
              </p>
              <p className="mt-1 text-sm text-charcoal/60">
                Fourchette :{" "}
                <span className="font-semibold text-charcoal">
                  {formatPrice(result.projection.fourchetteBasse)} –{" "}
                  {formatPrice(result.projection.fourchetteHaute)}
                </span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/50">
                Scénario de poursuite de la tendance observée
                (≈ {result.projection.tauxAnnuelPct} %/an). Hypothèse
                indicative, pas une prévision garantie.
              </p>
            </div>
          )}

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-6 text-sm">
            <div>
              <dt className="text-charcoal/50">Valeur au rôle</dt>
              <dd className="font-medium text-charcoal">
                {formatPrice(result.valeurAuRole)}
              </dd>
            </div>
            <div>
              <dt className="text-charcoal/50">Rôle d&apos;évaluation</dt>
              <dd className="font-medium text-charcoal">
                {result.millesimeRole}
              </dd>
            </div>
            {result.superficieBatimentM2 > 0 && (
              <div>
                <dt className="text-charcoal/50">Superficie du bâtiment</dt>
                <dd className="font-medium text-charcoal">
                  {result.superficieBatimentM2} m²
                </dd>
              </div>
            )}
            {result.anneeConstruction > 0 && (
              <div>
                <dt className="text-charcoal/50">Année de construction</dt>
                <dd className="font-medium text-charcoal">
                  {result.anneeConstruction}
                </dd>
              </div>
            )}
          </dl>

          {result.note && (
            <p className="mt-4 text-sm text-charcoal/60">{result.note}</p>
          )}
          {result.porteePlex === "logement" && (
            <p className="mt-4 text-sm text-charcoal/60">
              Estimation pour un seul logement : valeur de l&apos;immeuble
              divisée par le nombre de logements ({result.nbLogements}).
            </p>
          )}

          <p className="mt-6 text-xs leading-relaxed text-charcoal/50">
            {result.avertissement}
          </p>
          <p className="mt-2 text-xs text-charcoal/40">
            Sources : MAMH — Rôle d&apos;évaluation foncière du Québec (Données
            Québec, CC-BY 4.0), prix de vente médians APCIQ.
          </p>
        </Card>
      )}
    </div>
  );
}
