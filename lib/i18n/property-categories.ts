/**
 * Traduction FR → EN des catégories de propriété affichées sur
 * /statistiques (et /en/statistiques). Les valeurs sources restent
 * en français dans la base (données MAMH / Ville de Montréal) ;
 * ce mapping sert uniquement à l'affichage. Valeur inconnue =
 * on garde le libellé français d'origine (jamais inventé).
 */
export const PROPERTY_CATEGORY_EN: Record<string, string> = {
  /* Familles MAMH (parse_mamh_*.py — CATEGORY_BY_FAMILY). */
  Logement: "Housing",
  "Immeuble commercial": "Commercial building",
  "Immeuble à bureaux": "Office building",
  Industrie: "Industrial",
  Institutionnel: "Institutional",
  Agricole: "Agricultural",
  "Terrain vacant": "Vacant land",
  /* Repli SQL market_stats() (migration 000014). */
  "Non précisé": "Not specified",
};

/** Libellé de catégorie localisé : anglais si connu, sinon le français d'origine. */
export function localizeCategory(category: string, lang: "fr" | "en"): string {
  if (lang !== "en") return category;
  return PROPERTY_CATEGORY_EN[category] ?? category;
}
