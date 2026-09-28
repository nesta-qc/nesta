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
import type { CategorieBien, EstimateResult } from "@/lib/estimation/engine";

const CATEGORIE_LABELS: Record<CategorieBien, string> = {
  terrain: "Terrain",
  maison: "Maison",
  condo: "Copropriété",
  plex: "Plex (2 à 4 logements)",
  multi: "Immeuble multi-logements",
  commercial: "Commercial",
};

/** Affiche une clé normalisée "2219 R DUVERNAY" de façon lisible. */
function prettyKey(key: string): string {
  const [base, apt] = key.split("|APT ");
  const pretty = base
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bR\b/, "rue")
    .replace(/\bAv\b/, "av.")
    .replace(/\bBoul\b/, "boul.")
    .replace(/\bCh\b/, "ch.")
    .replace(/\bPl\b/, "pl.");
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

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
    try {
      const res = await fetch("/api/estimation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ville, adresse, suite: suite || undefined }),
      });
      const data = (await res.json()) as EstimateResult;
      if (data.found) {
        setResult(data);
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

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6 sm:p-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <Field label="Ville" htmlFor="estimation-ville" required>
            <Select
              id="estimation-ville"
              value={ville}
              onChange={(e) => {
                setVille(e.target.value as VilleSlug);
                setAdresse("");
                setSuggestions([]);
                setResult(null);
              }}
            >
              {VILLES.map((v) => (
                <option key={v.slug} value={v.slug}>
                  {v.nom}
                </option>
              ))}
            </Select>
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
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
            Valeur marchande estimée
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
