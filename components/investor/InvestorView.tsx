"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, EmptyState, FavoriteButton, Input, Modal, Select } from "@/components/ui";
import { SearchMapDynamic } from "@/components/map/SearchMapDynamic";
import type { InvestmentProperty } from "@/actions/properties";
import { propertyMediaPublicUrl } from "@/lib/media";
import { formatPrice } from "@/lib/format";

/* ============================================================
 * NESTA — espace investisseurs.
 * Uniquement des données réelles d'annonces publiées : prix,
 * taxes, superficies, année. Aucune donnée municipale inventée
 * (zonage, évaluation) : la connexion est indiquée « en préparation ».
 * ============================================================ */

interface InvestorFilters {
  city: string;
  propertyType: string;
  maxPrice: string;
  minYear: string;
}

const initialFilters: InvestorFilters = {
  city: "",
  propertyType: "",
  maxPrice: "",
  minYear: "",
};

function pricePerSqft(p: InvestmentProperty): number | null {
  if (!p.living_area || p.living_area <= 0) return null;
  return Math.round(p.asking_price / p.living_area);
}

function annualTaxes(p: InvestmentProperty): number | null {
  const m = p.municipal_tax ?? 0;
  const s = p.school_tax ?? 0;
  if (!m && !s) return null;
  return m + s;
}

/** Lettre d'intention générée à partir des données réelles de l'annonce. */
function buildLetter(p: InvestmentProperty): string {
  const lines = [
    "LETTRE D'INTENTION — PROJET D'ACQUISITION",
    "",
    `Immeuble visé : ${p.address}, ${p.city}`,
    `Prix demandé : ${formatPrice(p.asking_price)}`,
    p.property_type ? `Type : ${p.property_type}` : null,
    p.living_area ? `Superficie habitable : ${p.living_area} pi²` : null,
    p.lot_area ? `Terrain : ${p.lot_area} pi²` : null,
    p.year_built ? `Année de construction : ${p.year_built}` : null,
    annualTaxes(p) !== null ? `Taxes annuelles : ${formatPrice(annualTaxes(p)!)}` : null,
    "",
    "Madame, Monsieur,",
    "",
    "La présente exprime notre intérêt sérieux à acquérir l'immeuble décrit ci-dessus,",
    "sous réserve d'une vérification diligente (inspection, titres, zonage municipal",
    "et financement).",
    "",
    "Nous demeurons disponibles pour convenir des prochaines étapes.",
    "",
    "Cordialement,",
    "",
    "[Votre nom]",
    "[Vos coordonnées]",
  ];
  return lines.filter((l) => l !== null).join("\n");
}

export function InvestorView({
  initial,
}: {
  initial: InvestmentProperty[];
}) {
  const [filters, setFilters] = useState<InvestorFilters>(initialFilters);
  const [applied, setApplied] = useState<InvestorFilters>(initialFilters);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [letterFor, setLetterFor] = useState<InvestmentProperty | null>(null);
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    return initial.filter((p) => {
      if (
        applied.city &&
        !p.city.toLowerCase().includes(applied.city.toLowerCase())
      )
        return false;
      if (applied.propertyType && p.property_type !== applied.propertyType)
        return false;
      if (applied.maxPrice && p.asking_price > Number(applied.maxPrice))
        return false;
      if (applied.minYear && (p.year_built ?? 0) < Number(applied.minYear))
        return false;
      return true;
    });
  }, [initial, applied]);

  const selected = results.find((p) => p.id === selectedId) ?? null;
  const mapped = useMemo(
    () =>
      results
        .filter((p) => p.latitude != null && p.longitude != null)
        .map((p) => ({
          id: p.id,
          latitude: p.latitude as number,
          longitude: p.longitude as number,
          asking_price: p.asking_price,
          address: p.address,
          city: p.city,
        })),
    [results],
  );

  function update<K extends keyof InvestorFilters>(key: K, value: string) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  function copyLetter(text: string) {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex h-[calc(100dvh-64px)] flex-col">
      {/* Barre de filtres pro. */}
      <div className="border-b border-border bg-white">
        <form
          className="mx-auto grid w-full max-w-7xl gap-3 px-5 py-4 sm:px-8 lg:grid-cols-[1fr_160px_160px_140px_auto]"
          onSubmit={(e) => {
            e.preventDefault();
            setApplied(filters);
          }}
        >
          <Input
            placeholder="Ville"
            aria-label="Ville"
            value={filters.city}
            onChange={(e) => update("city", e.target.value)}
          />
          <Select
            aria-label="Type de bâtiment"
            value={filters.propertyType}
            onChange={(e) => update("propertyType", e.target.value)}
          >
            <option value="">Tous types</option>
            <option value="house">Maison</option>
            <option value="condo">Condo</option>
            <option value="plex">Plex</option>
            <option value="land">Terrain</option>
            <option value="commercial">Commercial</option>
          </Select>
          <Input
            inputMode="numeric"
            placeholder="Prix max ($)"
            aria-label="Prix maximum"
            value={filters.maxPrice}
            onChange={(e) => update("maxPrice", e.target.value.replace(/\D/g, ""))}
          />
          <Input
            inputMode="numeric"
            placeholder="Année min."
            aria-label="Année de construction minimale"
            value={filters.minYear}
            onChange={(e) => update("minYear", e.target.value.replace(/\D/g, "").slice(0, 4))}
          />
          <Button type="submit">Analyser</Button>
        </form>
        <p className="mx-auto w-full max-w-7xl px-5 pb-3 text-xs text-charcoal/45 sm:px-8">
          Données municipales (zonage, évaluation, usage) : connexion en préparation.
          Seules les données des annonces publiées sont affichées.
        </p>
      </div>

      {/* Carte + résultats. */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="relative min-h-[320px] flex-1 lg:min-h-0">
          <SearchMapDynamic
            properties={mapped}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        <div className="flex w-full flex-col border-t border-border bg-ivory lg:w-[420px] lg:border-l lg:border-t-0">
          <div className="flex-1 overflow-y-auto p-4">
            {results.length === 0 ? (
              <div className="py-10">
                <EmptyState
                  title="Aucun immeuble"
                  description="Aucune annonce publiée ne correspond à ces critères pour le moment."
                />
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {results.map((p) => {
                  const ppsf = pricePerSqft(p);
                  const taxes = annualTaxes(p);
                  const active = p.id === selectedId;
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(active ? null : p.id)}
                        aria-pressed={active}
                        className={`w-full rounded-[var(--radius-md)] border bg-white p-4 text-left transition-all duration-150 ${
                          active
                            ? "border-forest shadow-[var(--shadow-card)]"
                            : "border-border hover:border-forest/40"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-display text-lg text-forest">
                              {formatPrice(p.asking_price)}
                            </p>
                            <p className="mt-0.5 text-sm font-medium text-charcoal">
                              {p.address}
                            </p>
                            <p className="text-xs text-charcoal/50">{p.city}</p>
                          </div>
                          <FavoriteButton propertyId={p.id} />
                        </div>
                        <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <dt className="text-charcoal/45">$/pi²</dt>
                            <dd className="mt-0.5 font-semibold text-charcoal">
                              {ppsf !== null ? `${ppsf} $` : "—"}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-charcoal/45">Taxes/an</dt>
                            <dd className="mt-0.5 font-semibold text-charcoal">
                              {taxes !== null ? formatPrice(taxes) : "—"}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-charcoal/45">Année</dt>
                            <dd className="mt-0.5 font-semibold text-charcoal">
                              {p.year_built ?? "—"}
                            </dd>
                          </div>
                        </dl>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Panneau de sélection. */}
          {selected ? (
            <div className="border-t border-border bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-xl text-forest">
                    {formatPrice(selected.asking_price)}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-charcoal">
                    {selected.address}, {selected.city}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="text-sm text-charcoal/50 hover:text-charcoal"
                  aria-label="Fermer le panneau"
                >
                  ✕
                </button>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="flex justify-between border-b border-border/60 py-1.5">
                  <dt className="text-charcoal/50">Superficie</dt>
                  <dd className="font-medium">{selected.living_area ? `${selected.living_area} pi²` : "—"}</dd>
                </div>
                <div className="flex justify-between border-b border-border/60 py-1.5">
                  <dt className="text-charcoal/50">Terrain</dt>
                  <dd className="font-medium">{selected.lot_area ? `${selected.lot_area} pi²` : "—"}</dd>
                </div>
                <div className="flex justify-between border-b border-border/60 py-1.5">
                  <dt className="text-charcoal/50">Chambres</dt>
                  <dd className="font-medium">{selected.bedrooms ?? "—"}</dd>
                </div>
                <div className="flex justify-between border-b border-border/60 py-1.5">
                  <dt className="text-charcoal/50">Salles de bain</dt>
                  <dd className="font-medium">{selected.bathrooms ?? "—"}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-charcoal/45">
                Source : annonces publiées sur Nesta
                {selected.updated_at
                  ? ` · Mis à jour le ${new Date(selected.updated_at).toLocaleDateString("fr-CA")}`
                  : ""}
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Link href={`/properties/${selected.id}`} className="flex-1">
                  <Button variant="secondary" className="w-full">
                    Voir l&apos;annonce
                  </Button>
                </Link>
                <Button
                  className="flex-1"
                  onClick={() => {
                    setLetterFor(selected);
                    setCopied(false);
                  }}
                >
                  Lettre d&apos;intention
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Lettre d'intention. */}
      <Modal
        open={letterFor !== null}
        onClose={() => setLetterFor(null)}
        title="Lettre d'intention"
      >
        {letterFor ? (
          <div>
            <p className="text-sm text-charcoal/60">
              Modèle pré-rempli avec les données réelles de l&apos;annonce.
              Relisez et adaptez avant envoi.
            </p>
            <pre className="mt-4 max-h-[40vh] overflow-y-auto whitespace-pre-wrap rounded-[var(--radius-md)] bg-ivory p-4 text-sm leading-relaxed text-charcoal">
              {buildLetter(letterFor)}
            </pre>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setLetterFor(null)}>
                Fermer
              </Button>
              <Button onClick={() => copyLetter(buildLetter(letterFor))}>
                {copied ? "Copié !" : "Copier le texte"}
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
