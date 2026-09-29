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
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { dictionaries, type Lang } from "@/lib/i18n/dictionaries";
import type {
  CategorieBien,
  EstimateResult,
  PorteePlex,
} from "@/lib/estimation/engine";

/** "1000 AV DU MONT-ROYAL E" → "1000 av. Du Mont-royal Est" / "1000 Du Mont-Royal Ave E". */
function prettyKey(key: string, lang: Lang): string {
  const [base, apt] = key.split("|APT ");
  const en = lang === "en";
  let pretty = base
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bR\b/, en ? "St" : "rue")
    .replace(/\bAv\b/, en ? "Ave" : "av.")
    .replace(/\bBoul\b/, en ? "Blvd" : "boul.")
    .replace(/\bCh\b/, en ? "Ch" : "ch.")
    .replace(/\bPl\b/, en ? "Pl" : "pl.");
  const orientations: Record<string, string> = en
    ? { E: "E", O: "W", N: "N", S: "S" }
    : {
        E: dictionaries.fr.estimation.orientationEst,
        O: dictionaries.fr.estimation.orientationOuest,
        N: dictionaries.fr.estimation.orientationNord,
        S: dictionaries.fr.estimation.orientationSud,
      };
  pretty = pretty.replace(
    / ([EONS])$/,
    (m, o: string) => ` ${orientations[o] ?? o}`,
  );
  if (!apt) return pretty;
  return en ? `${pretty}, apt. ${apt}` : `${pretty}, app. ${apt}`;
}

/** Remplace {ville} / {n} / {taux} dans un gabarit du dictionnaire. */
function fill(
  template: string,
  vars: Record<string, string | number>,
): string {
  return Object.entries(vars).reduce(
    (s, [k, v]) => s.replace(`{${k}}`, String(v)),
    template,
  );
}

/**
 * Formulaire d'estimation : ville, adresse (avec autocomplétion sur le
 * rôle d'évaluation foncière), n° de suite optionnel, puis résultat.
 */
export function EstimationForm() {
  const { t, lang } = useLanguage();
  const e = t.estimation;
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
  const [villesSuggerees, setVillesSuggerees] = useState<
    { slug: VilleSlug; nom: string }[]
  >([]);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const TYPE_OPTIONS: { value: "" | CategorieBien; label: string }[] = [
    { value: "", label: e.typeAuto },
    { value: "maison", label: e.typeMaison },
    { value: "condo", label: e.typeCondo },
    { value: "plex", label: e.typePlex },
    { value: "multi", label: e.typeMulti },
    { value: "terrain", label: e.typeTerrain },
    { value: "commercial", label: e.typeCommercial },
  ];

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
    const onClick = (e2: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e2.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setOptionsAmbigues(null);
    setVillesSuggerees([]);
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
        setError(e.erreurAmbigue);
      } else if (data.reason === "adresse_introuvable") {
        const suggerees = data.villesSuggerees ?? [];
        setVillesSuggerees(suggerees);
        setError(
          suggerees.length > 0
            ? fill(e.erreurIntrouvableVilles, {
                ville: VILLES.find((v) => v.slug === ville)?.nom ?? "",
              })
            : e.erreurIntrouvable,
        );
      } else {
        setError(e.erreurInvalide);
      }
    } catch {
      setError(e.erreurGenerique);
    } finally {
      setLoading(false);
    }
  }

  /** Lève une ambiguïté d'orientation en soumettant l'option choisie. */
  function choisirOptionAmbigue(option: string) {
    setAdresse(prettyKey(option, lang));
    setOptionsAmbigues(null);
    setError(null);
    // Laisse le champ se mettre à jour avant de soumettre.
    setTimeout(() => formRef.current?.requestSubmit(), 0);
  }

  /** Bascule vers la ville suggérée et relance l'estimation. */
  function choisirVilleSuggeree(slug: VilleSlug) {
    setVille(slug);
    setVillesSuggerees([]);
    setError(null);
    // Laisse la ville se mettre à jour avant de soumettre.
    setTimeout(() => formRef.current?.requestSubmit(), 0);
  }

  // Chaînes renvoyées par l'API en français : on les traduit ici.
  // (narrowing : avertissement/note n'existent que sur le cas "found")
  const foundResult = result && result.found ? result : null;
  const avertissementAffiche =
    foundResult?.avertissement === dictionaries.fr.estimation.avertissement
      ? e.avertissement
      : (foundResult?.avertissement ?? "");
  const noteAffichee =
    foundResult?.note === dictionaries.fr.estimation.noteCondoRepli
      ? e.noteCondoRepli
      : (foundResult?.note ?? "");

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6 sm:p-8">
        <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5">
          <Field label={e.champVille} htmlFor="estimation-ville" required>
            <Select
              id="estimation-ville"
              value={ville}
              onChange={(ev) => {
                setVille(ev.target.value as VilleSlug);
                setAdresse("");
                setSuggestions([]);
                setResult(null);
                setOptionsAmbigues(null);
                setVillesSuggerees([]);
                setError(null);
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
            label={e.champType}
            htmlFor="estimation-type"
            hint={e.champTypeIndice}
          >
            <Select
              id="estimation-type"
              value={typeBien}
              onChange={(ev) => {
                setTypeBien(ev.target.value as "" | CategorieBien);
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
            <Field label={e.portee} htmlFor="estimation-portee">
              <div
                id="estimation-portee"
                role="radiogroup"
                aria-label={e.portee}
                className="flex gap-2"
              >
                {(
                  [
                    { value: "immeuble", label: e.porteeImmeuble },
                    { value: "logement", label: e.porteeLogement },
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
            label={e.horizon}
            htmlFor="estimation-horizon"
            hint={e.horizonIndice}
          >
            <div
              id="estimation-horizon"
              role="radiogroup"
              aria-label={e.horizon}
              className="flex gap-2"
            >
              {[
                { value: 0, label: e.horizonActuel },
                { value: 3, label: e.horizon3 },
                { value: 5, label: e.horizon5 },
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
              label={e.champAdresse}
              htmlFor="estimation-adresse"
              hint={e.champAdresseIndice}
              required
            >
              <Input
                id="estimation-adresse"
                value={adresse}
                onChange={(ev) => {
                  const v = ev.target.value;
                  setAdresse(v);
                  if (v.trim().length < 3) setSuggestions([]);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder={e.champAdressePlaceholder}
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
                        setAdresse(prettyKey(s, lang));
                        setShowSuggestions(false);
                      }}
                    >
                      {prettyKey(s, lang)}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Field label={e.champSuite} htmlFor="estimation-suite">
            <Input
              id="estimation-suite"
              value={suite}
              onChange={(ev) => setSuite(ev.target.value)}
              placeholder={e.champSuitePlaceholder}
              autoComplete="off"
            />
          </Field>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          {optionsAmbigues && optionsAmbigues.length > 0 && (
            <div className="flex flex-wrap gap-2" role="group" aria-label={e.groupePrecisionAdresse}>
              {optionsAmbigues.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => choisirOptionAmbigue(o)}
                  className="rounded-full border border-forest/40 bg-white px-4 py-2 text-sm font-semibold text-forest transition-colors duration-200 hover:bg-forest hover:text-white"
                >
                  {prettyKey(o, lang)}
                </button>
              ))}
            </div>
          )}

          {villesSuggerees.length > 0 && (
            <div className="flex flex-wrap gap-2" role="group" aria-label={e.groupeAutreVille}>
              {villesSuggerees.map((v) => (
                <button
                  key={v.slug}
                  type="button"
                  onClick={() => choisirVilleSuggeree(v.slug)}
                  className="rounded-full border border-forest/40 bg-white px-4 py-2 text-sm font-semibold text-forest transition-colors duration-200 hover:bg-forest hover:text-white"
                >
                  {fill(e.estimerAilleurs, { ville: v.nom })}
                </button>
              ))}
            </div>
          )}

          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? e.boutonCalcul : e.boutonEstimer}
          </Button>
        </form>
      </Card>

      {result && result.found && (
        <Card className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{e.categorieLabels[result.categorie]}</Badge>
            <Badge>{result.villeNom}</Badge>
            {result.arrondissement && (
              <Badge>{result.arrondissement}</Badge>
            )}
            {result.porteePlex === "logement" && (
              <Badge>{fill(e.badgeLogement, { n: result.nbLogements })}</Badge>
            )}
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
            {e.valeurEstimee}
          </p>
          <p className="mt-2 font-display text-5xl text-forest">
            {formatPrice(result.estimation, lang)}
          </p>
          <p className="mt-2 text-sm text-charcoal/60">
            {e.fourchetteProbable}{" "}
            <span className="font-semibold text-charcoal">
              {formatPrice(result.fourchetteBasse, lang)} –{" "}
              {formatPrice(result.fourchetteHaute, lang)}
            </span>
          </p>
          <p className="mt-1 text-xs text-charcoal/40">
            {e.marcheReference} {result.referenceMarche}
          </p>

          {result.projection && (
            <div className="mt-6 rounded-2xl border border-border bg-cream/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
                {fill(e.projectionTitre, { n: result.projection.annees })}
              </p>
              <p className="mt-2 font-display text-3xl text-charcoal">
                {formatPrice(result.projection.estimation, lang)}
              </p>
              <p className="mt-1 text-sm text-charcoal/60">
                {e.projectionFourchette}{" "}
                <span className="font-semibold text-charcoal">
                  {formatPrice(result.projection.fourchetteBasse, lang)} –{" "}
                  {formatPrice(result.projection.fourchetteHaute, lang)}
                </span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/50">
                {fill(e.projectionNote, {
                  taux: result.projection.tauxAnnuelPct,
                })}
              </p>
            </div>
          )}

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-6 text-sm">
            <div>
              <dt className="text-charcoal/50">{e.detailValeurRole}</dt>
              <dd className="font-medium text-charcoal">
                {formatPrice(result.valeurAuRole, lang)}
              </dd>
            </div>
            <div>
              <dt className="text-charcoal/50">{e.detailRole}</dt>
              <dd className="font-medium text-charcoal">
                {result.millesimeRole}
              </dd>
            </div>
            {result.superficieTerrainM2 > 0 && (
              <div>
                <dt className="text-charcoal/50">{e.detailTerrain}</dt>
                <dd className="font-medium text-charcoal">
                  {result.superficieTerrainM2} m²
                </dd>
              </div>
            )}
            {result.superficieBatimentM2 > 0 && (
              <div>
                <dt className="text-charcoal/50">{e.detailBatiment}</dt>
                <dd className="font-medium text-charcoal">
                  {result.superficieBatimentM2} m²
                </dd>
              </div>
            )}
            {result.anneeConstruction > 0 && (
              <div>
                <dt className="text-charcoal/50">{e.detailAnnee}</dt>
                <dd className="font-medium text-charcoal">
                  {result.anneeConstruction}
                </dd>
              </div>
            )}
          </dl>

          {noteAffichee && (
            <p className="mt-4 text-sm text-charcoal/60">{noteAffichee}</p>
          )}
          {result.porteePlex === "logement" && (
            <p className="mt-4 text-sm text-charcoal/60">
              {fill(e.notePlexLogement, { n: result.nbLogements })}
            </p>
          )}

          <p className="mt-6 text-xs leading-relaxed text-charcoal/50">
            {avertissementAffiche}
          </p>
          <p className="mt-2 text-xs text-charcoal/40">{e.sources}</p>
        </Card>
      )}
    </div>
  );
}
