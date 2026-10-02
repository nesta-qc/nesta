import "server-only";

import Stripe from "stripe";
import { headers } from "next/headers";
import { SITE_URL } from "./seo";

/* ============================================================
 * VEYLA — client Stripe (serveur uniquement).
 *
 * INACTIF par défaut : tant que `STRIPE_SECRET_KEY` n'est pas
 * définie, `isStripeConfigured()` retourne false et tout le
 * parcours de paiement se dégrade proprement (aucun crash,
 * aucun appel réseau vers Stripe).
 * ============================================================ */

/** True si la clé secrète Stripe est configurée. */
export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

let cached: Stripe | null = null;

/**
 * Retourne le client Stripe initialisé, ou null si non configuré.
 * Initialisation paresseuse : aucun appel réseau, aucun crash au build.
 */
export function getStripe(): Stripe | null {
  if (!isStripeConfigured()) return null;
  if (!cached) {
    cached = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      // Version d'API épinglée : les webhooks doivent utiliser la même.
      apiVersion: "2025-08-27.basil",
      typescript: true,
    });
  }
  return cached;
}

/**
 * URL de base pour les redirections de Checkout.
 * Préfère l'origine de la requête (fonctionne en preview),
 * repli sur SITE_URL (production).
 */
export async function getBaseUrl(): Promise<string> {
  try {
    const origin = (await headers()).get("origin");
    if (origin) return origin.replace(/\/$/, "");
  } catch {
    /* hors contexte de requête : repli production */
  }
  return SITE_URL;
}

/* ---------- Catalogue (montants en cents CAD, HT) ---------- */

export const STRIPE_CURRENCY = "cad";

export const SELLER_CHECKOUT_PRICES = {
  list: { amount: 29900, name: "Veyla — Forfait vendeur LIST" },
  sell: { amount: 69900, name: "Veyla — Forfait vendeur SELL" },
  signature: { amount: 129900, name: "Veyla — Forfait vendeur SIGNATURE" },
} as const;

export type SellerPlanId = keyof typeof SELLER_CHECKOUT_PRICES;

export const PROJETS_PRICES = {
  annuel: { amount: 480000, interval: "year" as const, name: "Veyla Projets — annuel" },
  mensuel: { amount: 49000, interval: "month" as const, name: "Veyla Projets — mensuel" },
} as const;

export type ProjetsBilling = keyof typeof PROJETS_PRICES;

/** 3 mois d'essai gratuit pour le pilote VEYLA Projets. */
export const PROJETS_TRIAL_DAYS = 90;
