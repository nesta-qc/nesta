"use server";

import {
  getStripe,
  getBaseUrl,
  isStripeConfigured,
  SELLER_CHECKOUT_PRICES,
  PROJETS_PRICES,
  PROJETS_TRIAL_DAYS,
  STRIPE_CURRENCY,
  type SellerPlanId,
  type ProjetsBilling,
} from "@/lib/stripe";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";

/* ============================================================
 * NESTA — Server Actions : création de sessions Stripe Checkout.
 *
 * - Forfaits vendeur (LIST / SELL / SIGNATURE) : paiement unique.
 * - NESTA Projets (annuel / mensuel) : abonnement avec 90 jours
 *   d'essai gratuit (pilote). La carte est collectée au départ,
 *   le premier prélèvement a lieu après l'essai ; résiliable
 *   pendant l'essai sans frais.
 *
 * Si Stripe n'est pas configuré : retour propre `{ ok: false }`,
 * jamais de crash. Montants HT (taxes en sus, comme affiché
 * sur /tarifs) — activer Stripe Tax plus tard si besoin :
 * `automatic_tax: { enabled: true }` sur la session.
 * ============================================================ */

export interface CheckoutResult {
  ok: boolean;
  /** URL Stripe Checkout vers laquelle rediriger le client. */
  url?: string;
  /** Code d'erreur lisible par le composant appelant. */
  error?: "not_configured" | "invalid_plan" | "stripe_error";
  /** Message localisé à afficher à l'utilisateur en cas d'échec. */
  message?: string;
}

async function notConfigured(): Promise<CheckoutResult> {
  let message = dictionaries.fr.checkout.notReady;
  try {
    message = dictionaries[await getLang()].checkout.notReady;
  } catch {
    /* repli français */
  }
  return { ok: false, error: "not_configured", message };
}

function toCheckoutResult(e: unknown): CheckoutResult {
  console.error("[stripe] échec de création de session Checkout", e);
  return { ok: false, error: "stripe_error" };
}

/**
 * Crée une session Checkout pour un forfait vendeur (paiement unique).
 * `plan` doit être "list" | "sell" | "signature".
 */
export async function createCheckoutSession(
  plan: string,
): Promise<CheckoutResult> {
  const stripe = getStripe();
  if (!stripe || !isStripeConfigured()) return await notConfigured();

  const planId = plan as SellerPlanId;
  const price = SELLER_CHECKOUT_PRICES[planId];
  if (!price) return { ok: false, error: "invalid_plan" };

  try {
    const baseUrl = await getBaseUrl();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: STRIPE_CURRENCY,
      line_items: [
        {
          price_data: {
            currency: STRIPE_CURRENCY,
            unit_amount: price.amount,
            product_data: { name: price.name },
          },
          quantity: 1,
        },
      ],
      metadata: { kind: "seller_plan", plan: planId },
      success_url: `${baseUrl}/tarifs/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/tarifs/annule`,
      locale: "fr",
    });
    if (!session.url) return toCheckoutResult(new Error("URL de session manquante"));
    return { ok: true, url: session.url };
  } catch (e) {
    return toCheckoutResult(e);
  }
}

/**
 * Crée une session Checkout pour NESTA Projets (abonnement).
 * `billing` : "annuel" (4 800 $/an) ou "mensuel" (490 $/mois),
 * avec 90 jours d'essai gratuit.
 */
export async function createProjetsSubscription(
  billing: string,
): Promise<CheckoutResult> {
  const stripe = getStripe();
  if (!stripe || !isStripeConfigured()) return await notConfigured();

  const key = billing as ProjetsBilling;
  const price = PROJETS_PRICES[key];
  if (!price) return { ok: false, error: "invalid_plan" };

  try {
    const baseUrl = await getBaseUrl();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      currency: STRIPE_CURRENCY,
      line_items: [
        {
          price_data: {
            currency: STRIPE_CURRENCY,
            unit_amount: price.amount,
            recurring: { interval: price.interval },
            product_data: { name: price.name },
          },
          quantity: 1,
        },
      ],
      subscription_data: { trial_period_days: PROJETS_TRIAL_DAYS },
      metadata: { kind: "projets_subscription", billing: key },
      success_url: `${baseUrl}/tarifs/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/tarifs/annule`,
      locale: "fr",
    });
    if (!session.url) return toCheckoutResult(new Error("URL de session manquante"));
    return { ok: true, url: session.url };
  } catch (e) {
    return toCheckoutResult(e);
  }
}
