"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Drawer, FilterPill, Button, Input, Select } from "@/components/ui";

export interface FilterValues {
  ville: string;
  transaction: string; // "" | "sale" | "rent"
  prix_min: string;
  prix_max: string;
  type: string;
  chambres: string;
  sdb: string;
  superficie: string;
  visite_3d: boolean;
}

interface SearchFiltersProps {
  initial: FilterValues;
}

const TYPE_OPTIONS = [
  { value: "", label: "Tous les types" },
  { value: "house", label: "Maison" },
  { value: "condo", label: "Condo" },
  { value: "plex", label: "Plex" },
  { value: "land", label: "Terrain" },
  { value: "commercial", label: "Commercial" },
];

const COUNT_OPTIONS = [
  { value: "", label: "Peu importe" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

/** Champs cachés : préserve les filtres courants dans le formulaire GET. */
function HiddenFields({ values, except = [] }: { values: FilterValues; except?: string[] }) {
  const entries: [string, string][] = [
    ["ville", values.ville],
    ["transaction", values.transaction],
    ["prix_min", values.prix_min],
    ["prix_max", values.prix_max],
    ["type", values.type],
    ["chambres", values.chambres],
    ["sdb", values.sdb],
    ["superficie", values.superficie],
  ];
  return (
    <>
      {entries
        .filter(([k, v]) => v && !except.includes(k))
        .map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}
      {values.visite_3d && !except.includes("visite_3d") ? (
        <input type="hidden" name="visite_3d" value="1" />
      ) : null}
    </>
  );
}

function OptionRow({
  name,
  options,
  current,
}: {
  name: string;
  options: { value: string; label: string }[];
  current: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex min-h-[48px] cursor-pointer items-center justify-between rounded-[var(--radius-md)] px-4 py-3 transition-colors hover:bg-ivory"
        >
          <span className="text-[15px] text-charcoal">{opt.label}</span>
          <input
            type="radio"
            name={name}
            value={opt.value}
            defaultChecked={current === opt.value}
            className="h-5 w-5 accent-[#1d3a5f]"
          />
        </label>
      ))}
    </div>
  );
}

/**
 * Barre de filtres horizontale : recherche texte + pastilles.
 * Chaque pastille ouvre un tiroir ; tout est soumis en GET vers /search.
 */
export function SearchFilters({ initial }: SearchFiltersProps) {
  const [drawer, setDrawer] = useState<null | "prix" | "type" | "chambres" | "sdb" | "superficie" | "all">(null);
  const close = () => setDrawer(null);

  const activeCount =
    (initial.prix_min || initial.prix_max ? 1 : 0) +
    (initial.type ? 1 : 0) +
    (initial.chambres ? 1 : 0) +
    (initial.sdb ? 1 : 0) +
    (initial.superficie ? 1 : 0) +
    (initial.visite_3d ? 1 : 0);

  const transactionHref = (v: string) => {
    const q = new URLSearchParams();
    if (initial.ville) q.set("ville", initial.ville);
    if (v) q.set("transaction", v);
    if (initial.prix_min) q.set("prix_min", initial.prix_min);
    if (initial.prix_max) q.set("prix_max", initial.prix_max);
    if (initial.type) q.set("type", initial.type);
    if (initial.chambres) q.set("chambres", initial.chambres);
    if (initial.sdb) q.set("sdb", initial.sdb);
    if (initial.superficie) q.set("superficie", initial.superficie);
    if (initial.visite_3d) q.set("visite_3d", "1");
    const qs = q.toString();
    return qs ? `/search?${qs}` : "/search";
  };

  const prixLabel =    initial.prix_min || initial.prix_max
      ? `${initial.prix_min ? `${initial.prix_min}$` : ""}${initial.prix_min && initial.prix_max ? " – " : ""}${initial.prix_max ? `${initial.prix_max}$` : ""}`
      : "Prix";
  const typeLabel =
    TYPE_OPTIONS.find((o) => o.value === initial.type)?.label ?? "Type";
  const chambresLabel = initial.chambres ? `${initial.chambres}+ ch.` : "Chambres";
  const sdbLabel = initial.sdb ? `${initial.sdb}+ sdb` : "SDB";
  const superficieLabel = initial.superficie ? `${initial.superficie}+ pi²` : "Superficie";

  let drawerContent: ReactNode = null;
  let drawerTitle = "";
  if (drawer === "prix") {
    drawerTitle = "Prix";
    drawerContent = (
      <form method="get" action="/search" className="flex flex-col gap-4">
        <HiddenFields values={initial} except={["prix_min", "prix_max"]} />
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal/70">
            Prix min ($)
            <Input name="prix_min" type="number" min="0" placeholder="300 000" defaultValue={initial.prix_min} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal/70">
            Prix max ($)
            <Input name="prix_max" type="number" min="0" placeholder="800 000" defaultValue={initial.prix_max} />
          </label>
        </div>
        <Button type="submit" onClick={close}>Appliquer</Button>
      </form>
    );
  } else if (drawer === "type") {
    drawerTitle = "Type de propriété";
    drawerContent = (
      <form method="get" action="/search">
        <HiddenFields values={initial} except={["type"]} />
        <OptionRow name="type" options={TYPE_OPTIONS} current={initial.type} />
        <div className="mt-4"><Button type="submit" className="w-full" onClick={close}>Appliquer</Button></div>
      </form>
    );
  } else if (drawer === "chambres") {
    drawerTitle = "Chambres";
    drawerContent = (
      <form method="get" action="/search">
        <HiddenFields values={initial} except={["chambres"]} />
        <OptionRow name="chambres" options={COUNT_OPTIONS} current={initial.chambres} />
        <div className="mt-4"><Button type="submit" className="w-full" onClick={close}>Appliquer</Button></div>
      </form>
    );
  } else if (drawer === "sdb") {
    drawerTitle = "Salles de bain";
    drawerContent = (
      <form method="get" action="/search">
        <HiddenFields values={initial} except={["sdb"]} />
        <OptionRow name="sdb" options={COUNT_OPTIONS} current={initial.sdb} />
        <div className="mt-4"><Button type="submit" className="w-full" onClick={close}>Appliquer</Button></div>
      </form>
    );
  } else if (drawer === "superficie") {
    drawerTitle = "Superficie habitable";
    drawerContent = (
      <form method="get" action="/search" className="flex flex-col gap-4">
        <HiddenFields values={initial} except={["superficie"]} />
        <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal/70">
          Superficie min (pi²)
          <Input name="superficie" type="number" min="0" placeholder="1000" defaultValue={initial.superficie} />
        </label>
        <Button type="submit" onClick={close}>Appliquer</Button>
      </form>
    );
  } else if (drawer === "all") {
    drawerTitle = "Tous les filtres";
    drawerContent = (
      <form method="get" action="/search" className="flex flex-col gap-5">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal/70">
          Ville
          <Input name="ville" placeholder="Montréal" defaultValue={initial.ville} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal/70">
            Prix min ($)
            <Input name="prix_min" type="number" min="0" defaultValue={initial.prix_min} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal/70">
            Prix max ($)
            <Input name="prix_max" type="number" min="0" defaultValue={initial.prix_max} />
          </label>
        </div>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal/70">
          Type de propriété
          <Select name="type" defaultValue={initial.type}>
            {TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </Select>
        </label>
        <div className="grid grid-cols-3 gap-3">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal/70">
            Chambres
            <Select name="chambres" defaultValue={initial.chambres}>
              {COUNT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal/70">
            SDB
            <Select name="sdb" defaultValue={initial.sdb}>
              {COUNT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-charcoal/70">
            Pi² min
            <Input name="superficie" type="number" min="0" defaultValue={initial.superficie} />
          </label>
        </div>
        <label className="flex cursor-pointer items-center gap-3 text-[15px] font-medium text-charcoal">
          <input
            type="checkbox"
            name="visite_3d"
            value="1"
            defaultChecked={initial.visite_3d}
            className="h-5 w-5 rounded accent-[#1d3a5f]"
          />
          Visite 3D uniquement
        </label>
        <div className="flex gap-3">
          <Button type="submit" className="flex-1" onClick={close}>Appliquer</Button>
          <Link href="/search" className="inline-flex flex-1 items-center justify-center rounded-full border border-border bg-white px-6 py-2.5 text-sm font-medium text-charcoal">
            Effacer
          </Link>
        </div>
      </form>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <form method="get" action="/search" className="flex gap-2">
          <HiddenFields values={initial} except={["ville"]} />
          <Input
            name="ville"
            placeholder="Ville"
            defaultValue={initial.ville}
            aria-label="Ville"
            className="h-12 rounded-full px-5 text-[15px]"
          />
          <Button type="submit" className="h-12 shrink-0 px-6">Rechercher</Button>
        </form>
        <div className="flex items-center gap-2 overflow-x-auto pb-1" role="group" aria-label="Filtres">
          <div className="inline-flex shrink-0 rounded-full border border-border bg-white p-1" role="group" aria-label="Transaction">
            {[
              { v: "sale", label: "Acheter" },
              { v: "rent", label: "Louer" },
            ].map((o) => (
              <Link
                key={o.v}
                href={transactionHref(o.v)}
                aria-pressed={(initial.transaction || "") === o.v}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  (initial.transaction || "") === o.v
                    ? "bg-forest text-white"
                    : "text-charcoal/60 hover:text-charcoal"
                }`}
              >
                {o.label}
              </Link>
            ))}
          </div>
          <FilterPill active={!!(initial.prix_min || initial.prix_max)} onClick={() => setDrawer("prix")}>{prixLabel}</FilterPill>
          <FilterPill active={!!initial.type} onClick={() => setDrawer("type")}>{typeLabel}</FilterPill>
          <FilterPill active={!!initial.chambres} onClick={() => setDrawer("chambres")}>{chambresLabel}</FilterPill>
          <FilterPill active={!!initial.sdb} onClick={() => setDrawer("sdb")}>{sdbLabel}</FilterPill>
          <FilterPill active={!!initial.superficie} onClick={() => setDrawer("superficie")}>{superficieLabel}</FilterPill>
          <FilterPill active={initial.visite_3d} onClick={() => setDrawer("all")}>
            {initial.visite_3d ? "Visite 3D ✓" : "+ Filtres"}
            {activeCount > 0 && !initial.visite_3d ? ` (${activeCount})` : ""}
          </FilterPill>
        </div>
      </div>

      <Drawer
        open={drawer !== null}
        onClose={close}
        title={drawerTitle}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
