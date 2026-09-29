/* ============================================================
 * NESTA — formatage et libellés d'affichage (français).
 * Aucune donnée fictive : que du formatage de valeurs réelles.
 * ============================================================ */

const dateFormatter = new Intl.DateTimeFormat("fr-CA", {
  dateStyle: "medium",
});

const priceFormatters = {
  fr: new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }),
  en: new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }),
} as const;

/** Formate un prix en dollars canadiens (ex. « 549 000 $ » / « $549,000 »). */
export function formatPrice(
  value: number | null | undefined,
  lang: "fr" | "en" = "fr",
): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return priceFormatters[lang].format(value);
}

/** Formate un prix court pour les marqueurs de carte (ex. « 549k », « 1,2M »). */
export function formatPriceShort(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `${new Intl.NumberFormat("fr-CA", { maximumFractionDigits: 1 }).format(m)}M`;
  }
  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}k`;
  }
  return String(Math.round(value));
}

/** Formate une date ISO en français (ex. « 27 sept. 2026 »). */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return dateFormatter.format(d);
}

/** Formate un nombre simple (superficie, chambres…). */
export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("fr-CA", { maximumFractionDigits: 1 }).format(
    value,
  );
}

export const LISTING_TYPE_LABELS: Record<string, string> = {
  sale: "À vendre",
  rent: "À louer",
};

export const PROPERTY_TYPE_LABELS: Record<string, string> = {
  house: "Maison",
  condo: "Condo",
  plex: "Plex",
  land: "Terrain",
  commercial: "Commercial",
  other: "Autre",
};

export const STATUS_LABELS: Record<string, string> = {
  draft: "Brouillon",
  published: "Publiée",
  suspended: "Suspendue",
  sold: "Vendue",
  rented: "Louée",
  withdrawn: "Retirée",
};

/** Variante visuelle du Badge selon le statut de l'annonce. */
export function statusBadgeVariant(
  status: string,
): "gold" | "forest" | "muted" {
  if (status === "published") return "forest";
  if (status === "suspended") return "gold";
  return "muted";
}

export function listingTypeLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return LISTING_TYPE_LABELS[value] ?? value;
}

export function propertyTypeLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return PROPERTY_TYPE_LABELS[value] ?? value;
}

export function statusLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return STATUS_LABELS[value] ?? value;
}
