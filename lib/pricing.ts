/* ============================================================
 * VEYLA — tarification vendeur.
 * Les prix restent configurables : modifier ici, jamais en dur
 * dans les pages. Aucune logique commerciale irréversible.
 * ============================================================ */

export interface SellerPlan {
  id: string;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export const SELLER_PLANS: SellerPlan[] = [
  {
    id: "list",
    name: "LIST",
    price: 299,
    tagline: "Publiez votre annonce vous-même.",
    features: [
      "Annonce complète avec photos",
      "Diffusion dans la recherche Veyla",
      "Statistiques de vues",
      "Gestion des favoris reçus",
    ],
    cta: "Choisir List",
  },
  {
    id: "sell",
    name: "SELL",
    price: 699,
    tagline: "Vendez accompagné, étape par étape.",
    features: [
      "Tout le forfait List",
      "Visite 3D incluse (produite par notre équipe)",
      "Guide de mise en vente",
      "Support prioritaire",
    ],
    cta: "Choisir Sell",
    highlighted: true,
  },
  {
    id: "signature",
    name: "SIGNATURE",
    price: 1299,
    tagline: "Le service complet, sans compromis.",
    features: [
      "Tout le forfait Sell",
      "Séance photo professionnelle",
      "Accompagnement dédié",
      "Mise en valeur premium",
    ],
    cta: "Choisir Signature",
  },
];

/** Formate un prix de forfait (ex. « 299 $ »). */
export function formatPlanPrice(price: number): string {
  return `${new Intl.NumberFormat("fr-CA").format(price)} $`;
}
