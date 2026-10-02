import Stripe from "stripe";
import { getStripe, isStripeConfigured, type SellerPlanId } from "@/lib/stripe";
import { getServiceClient } from "@/lib/supabase/service";
import { sendWelcomeEmail, type WelcomeKind } from "@/lib/email";
import { getLang } from "@/lib/i18n/lang";

/* ============================================================
 * VEYLA — webhook Stripe : POST /api/stripe/webhook
 *
 * Vérifie la signature avec STRIPE_WEBHOOK_SECRET (corps brut).
 * Si le secret manque : 503 propre, jamais d'exception.
 *
 * Événements traités :
 * - checkout.session.completed → commande forfait vendeur (table
 *   `orders`, idempotent sur session.id) + courriel de bienvenue.
 * - customer.subscription.created → abonnement VEYLA Projets
 *   (table `project_subscriptions`, essai 90 j) + courriel de bienvenue.
 * - customer.subscription.updated → statut synchronisé.
 * - customer.subscription.deleted → statut « canceled ».
 * - invoice.payment_failed → statut « past_due » (relance manuelle).
 *
 * Écritures DB via le client service_role ; si la clé est absente,
 * on logue et on répond 200 (l'événement reste rejouable depuis
 * le dashboard Stripe).
 * ============================================================ */

export const runtime = "nodejs";

function logEvent(event: string, details: Record<string, unknown>) {
  console.log("[stripe:webhook]", event, JSON.stringify(details));
}

async function detectLang(): Promise<"fr" | "en"> {
  try {
    return (await getLang()) === "en" ? "en" : "fr";
  } catch {
    return "fr";
  }
}

async function recordSellerOrder(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const db = getServiceClient();
  if (!db) {
    logEvent("orders:pas-de-client-service", { sessionId: session.id });
    return;
  }
  const plan = (session.metadata?.plan ?? "unknown") as string;
  const email = session.customer_details?.email ?? null;

  const { error } = await db.from("orders").upsert(
    {
      stripe_session_id: session.id,
      kind: "seller_plan",
      plan,
      amount_cents: session.amount_total ?? 0,
      currency: session.currency ?? "cad",
      customer_email: email,
      status: "paid",
      metadata: {
        stripe_customer_id:
          typeof session.customer === "string" ? session.customer : null,
      },
    },
    { onConflict: "stripe_session_id" },
  );
  if (error) {
    console.error("[stripe:webhook] upsert orders échoué", error);
    return;
  }
  logEvent("orders:enregistree", { sessionId: session.id, plan });

  if (email) {
    const kind: WelcomeKind = "seller_plan";
    await sendWelcomeEmail({
      to: email,
      kind,
      plan: plan as SellerPlanId,
      lang: await detectLang(),
    });
  }
}

function mapSubscriptionStatus(
  sub: Stripe.Subscription,
): "trialing" | "active" | "past_due" | "canceled" {
  if (sub.status === "trialing") return "trialing";
  if (sub.status === "active") return "active";
  if (sub.status === "past_due" || sub.status === "unpaid") return "past_due";
  return "canceled";
}

async function upsertProjetsSubscription(
  sub: Stripe.Subscription,
  isNew: boolean,
): Promise<void> {
  const db = getServiceClient();
  if (!db) {
    logEvent("project_subscriptions:pas-de-client-service", {
      subscriptionId: sub.id,
    });
    return;
  }
  const billing = (sub.metadata?.billing ?? "annuel") as "annuel" | "mensuel";
  const customerId =
    typeof sub.customer === "string" ? sub.customer : null;

  // Email client : via l'API Stripe si disponible.
  let email: string | null = (sub.metadata?.customer_email as string) ?? null;
  if (!email && customerId) {
    try {
      const stripe = getStripe();
      if (stripe) {
        const customer = await stripe.customers.retrieve(customerId);
        if (!customer.deleted) email = customer.email ?? null;
      }
    } catch {
      /* email optionnel : on continue sans */
    }
  }

  const { error } = await db.from("project_subscriptions").upsert(
    {
      stripe_subscription_id: sub.id,
      stripe_customer_id: customerId,
      customer_email: email,
      billing,
      status: mapSubscriptionStatus(sub),
      trial_end: sub.trial_end
        ? new Date(sub.trial_end * 1000).toISOString()
        : null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" },
  );
  if (error) {
    console.error("[stripe:webhook] upsert project_subscriptions échoué", error);
    return;
  }
  logEvent("project_subscriptions:synchronise", {
    subscriptionId: sub.id,
    status: sub.status,
  });

  if (isNew && email) {
    await sendWelcomeEmail({
      to: email,
      kind: "projets_subscription",
      plan: billing,
      lang: await detectLang(),
    });
  }
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
        const kind = s.metadata?.kind;
        logEvent(event.type, {
          sessionId: s.id,
          kind,
          email: s.customer_details?.email ?? null,
          amountTotal: s.amount_total,
        });
        if (kind === "seller_plan") {
          await recordSellerOrder(s);
        } else if (kind === "projets_subscription" && s.subscription) {
          // L'abonnement sera aussi notifié via subscription.created ;
          // on le synchronise ici par sécurité (idempotent).
          const sub = await stripe.subscriptions.retrieve(
            typeof s.subscription === "string"
              ? s.subscription
              : s.subscription.id,
          );
          await upsertProjetsSubscription(sub, false);
        }
        break;
      }
      case "customer.subscription.created": {
        const sub = event.data.object as Stripe.Subscription;
        await upsertProjetsSubscription(sub, true);
        break;
      }
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        await upsertProjetsSubscription(sub, false);
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await upsertProjetsSubscription(sub, false);
        break;
      }
      case "invoice.payment_failed": {
        const inv = event.data.object as Stripe.Invoice;
        const parent = inv.parent as
          | { subscription_details?: { subscription?: string | null } }
          | null
          | undefined;
        const subscriptionId =
          parent?.subscription_details?.subscription ?? null;
        logEvent(event.type, {
          subscriptionId,
          customerEmail: inv.customer_email ?? null,
        });
        if (subscriptionId && typeof subscriptionId === "string") {
          const db = getServiceClient();
          if (db) {
            await db
              .from("project_subscriptions")
              .update({
                status: "past_due",
                updated_at: new Date().toISOString(),
              })
              .eq("stripe_subscription_id", subscriptionId);
          }
        }
        break;
      }
      default:
        logEvent(event.type, {});
    }
  } catch (e) {
    console.error("[stripe:webhook] erreur de traitement", e);
    return Response.json({ error: "Erreur de traitement." }, { status: 500 });
  }

  return Response.json({ received: true });
}
