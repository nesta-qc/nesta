import Stripe from "stripe";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

/* ============================================================
 * NESTA — webhook Stripe : POST /api/stripe/webhook
 *
 * Vérifie la signature avec STRIPE_WEBHOOK_SECRET (corps brut).
 * Si le secret manque : 503 propre, jamais d'exception.
 *
 * Événements traités (pour l'instant : log structuré uniquement) :
 * - checkout.session.completed        → paiement forfait vendeur OK
 * - customer.subscription.created     → abonnement Projets démarré (essai)
 * - customer.subscription.updated     → changement d'abonnement
 * - customer.subscription.deleted     → résiliation
 * - invoice.payment_failed            → échec de prélèvement
 *
 * TODO (branchement métier, quand Gabriel active Stripe) :
 * - créer/mettre à jour une ligne `orders` (forfaits vendeur)
 *   avec session.id, plan, montant, email client ;
 * - créer un `pro_leads` / marquer le projet comme « Pro actif »
 *   sur customer.subscription.created ;
 * - envoyer l'email de bienvenue / prochaines étapes.
 * ============================================================ */

export const runtime = "nodejs";

interface WebhookLog {
  event: string;
  sessionId?: string;
  customerEmail?: string | null;
  metadata?: Stripe.Metadata | null;
  amountTotal?: number | null;
  subscriptionId?: string | null;
  trialEnd?: number | null;
}

function logEvent(log: WebhookLog): void {
  console.log("[stripe:webhook]", JSON.stringify(log));
}

export async function POST(req: Request): Promise<Response> {
  if (!isStripeConfigured()) {
    return Response.json(
      { error: "Stripe n'est pas configuré." },
      { status: 503 },
    );
  }
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return Response.json(
      { error: "Secret de webhook manquant." },
      { status: 503 },
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return Response.json(
      { error: "Stripe n'est pas configuré." },
      { status: 503 },
    );
  }

  let event: Stripe.Event;
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return Response.json({ error: "Signature manquante." }, { status: 400 });
    }
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (e) {
    console.error("[stripe:webhook] signature invalide", e);
    return Response.json({ error: "Signature invalide." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        logEvent({
          event: event.type,
          sessionId: s.id,
          customerEmail: s.customer_details?.email ?? null,
          metadata: s.metadata,
          amountTotal: s.amount_total,
          subscriptionId:
            typeof s.subscription === "string" ? s.subscription : null,
        });
        // TODO: créer la commande (forfait vendeur) + email de confirmation.
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        logEvent({
          event: event.type,
          subscriptionId: sub.id,
          customerEmail: null,
          metadata: sub.metadata,
          trialEnd: sub.trial_end,
        });
        // TODO: marquer le projet « Pro actif » (essai ou payant).
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        logEvent({ event: event.type, subscriptionId: sub.id });
        // TODO: marquer le projet « Pro résilié ».
        break;
      }
      case "invoice.payment_failed": {
        const inv = event.data.object as Stripe.Invoice;
        // ID d'abonnement : selon la version d'API, via `parent`.
        const parent = inv.parent as
          | { subscription_details?: { subscription?: string | null } }
          | null
          | undefined;
        logEvent({
          event: event.type,
          subscriptionId:
            parent?.subscription_details?.subscription ?? null,
          customerEmail: inv.customer_email ?? null,
        });
        // TODO: alerter l'équipe + relance client.
        break;
      }
      default:
        logEvent({ event: event.type });
    }
  } catch (e) {
    console.error("[stripe:webhook] erreur de traitement", e);
    return Response.json({ error: "Erreur de traitement." }, { status: 500 });
  }

  return Response.json({ received: true });
}
