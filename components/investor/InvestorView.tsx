"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, EmptyState, FavoriteButton, Input, Modal, Select } from "@/components/ui";
import { GoogleMapEmbed } from "@/components/map/GoogleMapEmbed";
import type { InvestmentProperty, MarketComparable } from "@/actions/properties";
import { formatPrice } from "@/lib/format";

/* ============================================================
 * NESTA — espace investisseurs.
 * Deux sources de données réelles, toujours distinguées :
 *  - annonces publiées sur Nesta ;
 *  - comparables du marché (faits publics vérifiés, source et
 *    date indiquées — jamais présentés comme des annonces Nesta).
 * Aucune donnée municipale inventée (zonage, évaluation) :
 * la connexion est indiquée « en préparation ».
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

type InvestorItem =
  | { kind: "listing"; listing: InvestmentProperty }
  | { kind: "comparable"; comparable: MarketComparable };

interface LetterData {
  address: string;
  city: string;
  asking_price: number;
  property_type: string | null;
  living_area: number | null;
  lot_area: number | null;
  year_built: number | null;
  municipal_tax: number | null;
  school_tax: number | null;
}

function pricePerSqft(p: LetterData): number | null {
  if (!p.living_area || p.living_area <= 0) return null;
  return Math.round(p.asking_price / p.living_area);
}

function annualTaxes(p: LetterData): number | null {
  const m = p.municipal_tax ?? 0;
  const s = p.school_tax ?? 0;
  if (!m && !s) return null;
  return m + s;
}

/** Lettre d'intention générée à partir des données réelles de l'immeuble. */
function buildLetter(p: LetterData): string {
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

function letterDataOf(item: InvestorItem): LetterData {
  if (item.kind === "listing") {
    const l = item.listing;
    return {
      address: l.address,
      city: l.city,
      asking_price: l.asking_price,
      property_type: l.property_type,
      living_area: l.living_area,
      lot_area: l.lot_area,
      year_built: l.year_built,
      municipal_tax: l.municipal_tax,
      school_tax: l.school_tax,
    };
  }
  const c = item.comparable;
  return {
    address: c.address,
    city: c.city,
    asking_price: c.asking_price,
    property_type: c.property_type,
    living_area: c.living_area,
    lot_area: c.lot_area,
    year_built: c.year_built,
    municipal_tax: null,
    school_tax: null,
  };
}

function itemId(item: InvestorItem): string {
  return item.kind === "listing" ? item.listing.id : item.comparable.id;
}

function formatVerifiedDate(iso: string): string {
  const d = new Date(iso + (iso.includes("T") ? "" : "T00:00:00"));
  return d.toLocaleDateString("fr-CA", { day: "numeric", month: "short", year: "numeric" });
}

export function InvestorView({
  initial,
  comparables,
}: {
  initial: InvestmentProperty[];
  comparables: MarketComparable[];
}) {
  const [filters, setFilters] = useState<InvestorFilters>(initialFilters);
  const [applied, setApplied] = useState<InvestorFilters>(initialFilters);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [letterFor, setLetterFor] = useState<LetterData | null>(null);
  const [copied, setCopied] = useState(false);

  const items: InvestorItem[] = useMemo(
    () => [
      ...initial.map((listing): InvestorItem => ({ kind: "listing", listing })),
      ...comparables.map((comparable): InvestorItem => ({ kind: "comparable", comparable })),
    ],
    [initial, comparables],
  );

  const results = useMemo(() => {
    return items.filter((item) => {
      const d = letterDataOf(item);
      const cityHaystack =
        item.kind === "comparable" && item.comparable.borough
          ? `${d.city} ${item.comparable.borough}`
          : d.city;
      if (
        applied.city &&
        !cityHaystack.toLowerCase().includes(applied.city.toLowerCase())
      )
        return false;
      if (applied.propertyType && d.property_type !== applied.propertyType)
        return false;
      if (applied.maxPrice && d.asking_price > Number(applied.maxPrice))
        return false;
      if (applied.minYear && (d.year_built ?? 0) < Number(applied.minYear))
        return false;
      return true;
    });
  }, [items, applied]);

  const selected = results.find((it) => itemId(it) === selectedId) ?? null;
  const mapped = useMemo(
    () =>
      results
        .map((item) => {
          const d = letterDataOf(item);
          const lat = item.kind === "listing" ? item.listing.latitude : item.comparable.latitude;
          const lon = item.kind === "listing" ? item.listing.longitude : item.comparable.longitude;
          if (lat == null || lon == null) return null;
          return {
            id: itemId(item),
            latitude: lat,
            longitude: lon,
            asking_price: d.asking_price,
            address: d.address,
            city: d.city,
          };
        })
        .filter((m): m is NonNullable<typeof m> => m !== null),
    [results],
  );

  const focus = mapped.find((m) => m.id === selectedId) ?? mapped[0] ?? null;

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
    <div className="flex flex-col lg:h-[calc(100dvh-64px)]">
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
          Annonces publiées sur Nesta et comparables du marché vérifiés (source indiquée).
        </p>
      </div>

      {/* Carte + résultats. */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="relative min-h-[320px] flex-1 lg:min-h-0">
          <GoogleMapEmbed
            latitude={focus?.latitude ?? 45.5017}
            longitude={focus?.longitude ?? -73.5673}
          />
        </div>

        <div className="flex w-full flex-col border-t border-border bg-ivory lg:w-[420px] lg:border-l lg:border-t-0">
          <div className="flex-1 overflow-y-auto p-4">
            {results.length === 0 ? (
              <div className="py-10">
                <EmptyState
                  title="Aucun immeuble"
                  description="Aucune annonce ni comparable ne correspond à ces critères pour le moment."
                />
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {results.map((item) => {
                  const d = letterDataOf(item);
                  const id = itemId(item);
                  const ppsf = pricePerSqft(d);
                  const taxes = annualTaxes(d);
                  const active = id === selectedId;
                  const isComparable = item.kind === "comparable";
                  return (
                    <li key={`${item.kind}-${id}`}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(active ? null : id)}
                        aria-pressed={active}
                        className={`w-full rounded-[var(--radius-md)] border bg-white p-4 text-left transition-all duration-150 ${
                          active
                            ? "border-forest shadow-[var(--shadow-card)]"
                            : "border-border hover:border-forest/40"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-display text-lg text-forest">
                                {formatPrice(d.asking_price)}
                              </p>
                              {isComparable ? (
                                <span className="rounded-full bg-champagne/25 px-2 py-0.5 text-[11px] font-semibold text-charcoal/70">
                                  Comparable marché
                                </span>
                              ) : null}
                            </div>
                            <p className="mt-0.5 text-sm font-medium text-charcoal">
                              {d.address}
                            </p>
                            <p className="text-xs text-charcoal/50">{d.city}</p>
                          </div>
                          {!isComparable ? <FavoriteButton propertyId={id} /> : null}
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
                              {d.year_built ?? "—"}
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
            <SelectedPanel
              item={selected}
              onClose={() => setSelectedId(null)}
              onLetter={() => {
                setLetterFor(letterDataOf(selected));
                setCopied(false);
              }}
            />
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
              Modèle pré-rempli avec les données réelles de l&apos;immeuble.
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

function SelectedPanel({
  item,
  onClose,
  onLetter,
}: {
  item: InvestorItem;
  onClose: () => void;
  onLetter: () => void;
}) {
  const d = letterDataOf(item);
  const id = itemId(item);

  if (item.kind === "comparable") {
    const c = item.comparable;
    return (
      <div className="border-t border-border bg-white p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-display text-xl text-forest">
                {formatPrice(d.asking_price)}
              </p>
              <span className="rounded-full bg-champagne/25 px-2 py-0.5 text-[11px] font-semibold text-charcoal/70">
                Comparable marché
              </span>
            </div>
            <p className="mt-0.5 text-sm font-medium text-charcoal">
              {d.address}, {d.city}
              {c.borough ? ` — ${c.borough}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-charcoal/50 hover:text-charcoal"
            aria-label="Fermer le panneau"
          >
            ✕
          </button>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex justify-between border-b border-border/60 py-1.5">
            <dt className="text-charcoal/50">Superficie</dt>
            <dd className="font-medium">{d.living_area ? `${d.living_area} pi²` : "—"}</dd>
          </div>
          <div className="flex justify-between border-b border-border/60 py-1.5">
            <dt className="text-charcoal/50">Terrain</dt>
            <dd className="font-medium">{d.lot_area ? `${d.lot_area} pi²` : "—"}</dd>
          </div>
          <div className="flex justify-between border-b border-border/60 py-1.5">
            <dt className="text-charcoal/50">Chambres</dt>
            <dd className="font-medium">{c.bedrooms ?? "—"}</dd>
          </div>
          <div className="flex justify-between border-b border-border/60 py-1.5">
            <dt className="text-charcoal/50">Salles de bain</dt>
            <dd className="font-medium">{c.bathrooms ?? "—"}</dd>
          </div>
          {c.condo_fees_monthly != null ? (
            <div className="flex justify-between border-b border-border/60 py-1.5">
              <dt className="text-charcoal/50">Frais copro/mois</dt>
              <dd className="font-medium">{formatPrice(c.condo_fees_monthly)}</dd>
            </div>
          ) : null}
          {c.gross_revenue_annual != null ? (
            <div className="flex justify-between border-b border-border/60 py-1.5">
              <dt className="text-charcoal/50">Revenus/an</dt>
              <dd className="font-medium">{formatPrice(c.gross_revenue_annual)}</dd>
            </div>
          ) : null}
        </dl>
        {c.notes ? (
          <p className="mt-3 text-xs text-charcoal/60">{c.notes}</p>
        ) : null}
        <p className="mt-3 text-xs text-charcoal/45">
          Source : {c.source_name} · vérifié le {formatVerifiedDate(c.verified_at)} ·
          ce n&apos;est pas une annonce Nesta.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          {c.source_url ? (
            <a
              href={c.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="secondary" className="w-full">
                Voir sur {c.source_name} ↗
              </Button>
            </a>
          ) : null}
          <Button className="flex-1" onClick={onLetter}>
            Lettre d&apos;intention
          </Button>
        </div>
      </div>
    );
  }

  const l = item.listing;
  return (
    <div className="border-t border-border bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-xl text-forest">
            {formatPrice(d.asking_price)}
          </p>
          <p className="mt-0.5 text-sm font-medium text-charcoal">
            {d.address}, {d.city}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-charcoal/50 hover:text-charcoal"
          aria-label="Fermer le panneau"
        >
          ✕
        </button>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div className="flex justify-between border-b border-border/60 py-1.5">
          <dt className="text-charcoal/50">Superficie</dt>
          <dd className="font-medium">{d.living_area ? `${d.living_area} pi²` : "—"}</dd>
        </div>
        <div className="flex justify-between border-b border-border/60 py-1.5">
          <dt className="text-charcoal/50">Terrain</dt>
          <dd className="font-medium">{d.lot_area ? `${d.lot_area} pi²` : "—"}</dd>
        </div>
        <div className="flex justify-between border-b border-border/60 py-1.5">
          <dt className="text-charcoal/50">Chambres</dt>
          <dd className="font-medium">{l.bedrooms ?? "—"}</dd>
        </div>
        <div className="flex justify-between border-b border-border/60 py-1.5">
          <dt className="text-charcoal/50">Salles de bain</dt>
          <dd className="font-medium">{l.bathrooms ?? "—"}</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-charcoal/45">
        Source : annonces publiées sur Nesta
        {l.updated_at
          ? ` · Mis à jour le ${new Date(l.updated_at).toLocaleDateString("fr-CA")}`
          : ""}
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Link href={`/properties/${id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            Voir l&apos;annonce
          </Button>
        </Link>
        <Button className="flex-1" onClick={onLetter}>
          Lettre d&apos;intention
        </Button>
      </div>
    </div>
  );
}
