/*
 * Catégories de revenus NESTA — partagé entre serveur et client.
 * (Ne pas mettre "use server" ici : importé par des composants client.)
 */

export const REVENUE_CATEGORIES = [
  { id: "list", label: "LIST", detail: "Forfait vendeur 299 $" },
  { id: "sell", label: "SELL", detail: "Forfait vendeur 699 $" },
  { id: "signature", label: "SIGNATURE", detail: "Forfait vendeur 1 299 $" },
  { id: "service", label: "Service", detail: "Prestation facturée (sur devis)" },
  { id: "autre", label: "Autre", detail: "Autre encaissement" },
] as const;

export type RevenueCategory = (typeof REVENUE_CATEGORIES)[number]["id"];

export function revenueCategoryLabel(category: string): string {
  return REVENUE_CATEGORIES.find((c) => c.id === category)?.label ?? category;
}
