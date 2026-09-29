/* ============================================================
 * NESTA — Estimation : référentiel des villes couvertes.
 *
 * Données : MAMH — Rôle d'évaluation foncière du Québec
 * (Données Québec, licence CC-BY 4.0). Vérification mensuelle
 * par le pipeline de données ; voir data/estimation/manifest.json.
 * ============================================================ */

export interface VilleEstimation {
  slug: string;
  nom: string;
  millesimeRole: string;
  dateReferenceMarche: string;
}

export const VILLES: VilleEstimation[] = [
  {
    slug: "montreal",
    nom: "Montréal",
    millesimeRole: "2026-2027-2028",
    dateReferenceMarche: "2024-07-01",
  },
  {
    slug: "quebec",
    nom: "Québec",
    millesimeRole: "2025",
    dateReferenceMarche: "2023-07-01",
  },
  {
    slug: "laval",
    nom: "Laval",
    millesimeRole: "2025",
    dateReferenceMarche: "2023-07-01",
  },
  {
    slug: "gatineau",
    nom: "Gatineau",
    millesimeRole: "2024",
    dateReferenceMarche: "2022-07-01",
  },
  {
    slug: "longueuil",
    nom: "Longueuil",
    millesimeRole: "2025",
    dateReferenceMarche: "2023-07-01",
  },
  {
    slug: "brossard",
    nom: "Brossard",
    millesimeRole: "2025",
    dateReferenceMarche: "2023-07-01",
  },
  {
    slug: "terrasse-vaudreuil",
    nom: "Terrasse-Vaudreuil",
    millesimeRole: "2025",
    dateReferenceMarche: "2023-07-01",
  },
  {
    slug: "levis",
    nom: "Lévis",
    millesimeRole: "2026",
    dateReferenceMarche: "2024-07-01",
  },
];

export type VilleSlug = (typeof VILLES)[number]["slug"];

export function isVilleSlug(slug: string): slug is VilleSlug {
  return VILLES.some((v) => v.slug === slug);
}

export function getVille(slug: VilleSlug): VilleEstimation {
  const v = VILLES.find((x) => x.slug === slug);
  if (!v) throw new Error(`Ville inconnue : ${slug}`);
  return v;
}
