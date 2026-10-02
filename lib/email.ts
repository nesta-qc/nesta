import "server-only";

/* ============================================================
 * VEYLA — courriels transactionnels (Resend, offre gratuite).
 *
 * - Gratuit : Resend offre 3 000 courriels/mois sans carte.
 * - Tant que `EMAIL_FROM` n'est pas défini (domaine groupenesta.ca
 *   à acheter puis vérifier dans Resend), l'expéditeur est
 *   `onboarding@resend.dev` (adresse de test Resend).
 * - Si `RESEND_API_KEY` manque : no-op propre, jamais de crash.
 * ============================================================ */

export type EmailLang = "fr" | "en";
export type WelcomeKind = "seller_plan" | "projets_subscription";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function fromAddress(): string {
  return (
    process.env.EMAIL_FROM || "Veyla <onboarding@resend.dev>"
  );
}

const PLAN_LABELS: Record<EmailLang, Record<string, string>> = {
  fr: {
    list: "Forfait vendeur LIST (299 $)",
    sell: "Forfait vendeur SELL (699 $)",
    signature: "Forfait vendeur SIGNATURE (1 299 $)",
    annuel: "VEYLA Projets — annuel (4 800 $/an)",
    mensuel: "VEYLA Projets — mensuel (490 $/mois)",
  },
  en: {
    list: "LIST seller plan ($299)",
    sell: "SELL seller plan ($699)",
    signature: "SIGNATURE seller plan ($1,299)",
    annuel: "VEYLA Projets — yearly ($4,800/yr)",
    mensuel: "VEYLA Projets — monthly ($490/mo)",
  },
};

interface WelcomeContent {
  subject: string;
  html: string;
  text: string;
}

export function buildWelcomeEmail(
  kind: WelcomeKind,
  plan: string,
  lang: EmailLang,
): WelcomeContent {
  const planLabel =
    PLAN_LABELS[lang][plan] ?? PLAN_LABELS[lang][plan.toLowerCase()] ?? plan;

  if (lang === "en") {
    const subject =
      kind === "seller_plan"
        ? `Your Veyla order is confirmed — ${planLabel}`
        : `Welcome to VEYLA Projets — your 90-day pilot has started`;
    const nextSteps =
      kind === "seller_plan"
        ? `<li>Prepare your property photos — sharp, bright, decluttered.</li>
           <li>Create your listing from your account: <a href="https://nesta-drab.vercel.app/sell/nouveau">sell/nouveau</a>.</li>
           <li>Our team activates your plan within 1 business day and reviews your listing.</li>`
        : `<li>Your 90-day free pilot has started — no charge until it ends.</li>
           <li>Reply to this email with your project name, city and a contact person: we create your dedicated project page.</li>
           <li>You can cancel anytime, even during the trial, at no cost.</li>`;
    const html = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
      <h1 style="font-size:22px">Thank you — ${planLabel}</h1>
      <p>Your payment went through. Here is what happens next:</p>
      <ol>${nextSteps}</ol>
      <p style="color:#666;font-size:13px">Questions? Just reply to this email.<br/>— The Veyla team</p>
    </div>`;
    const text = `Thank you — ${planLabel}\n\nYour payment went through.\n\n${
      kind === "seller_plan"
        ? "1. Prepare your property photos.\n2. Create your listing: https://nesta-drab.vercel.app/sell/nouveau\n3. Our team activates your plan within 1 business day."
        : "1. Your 90-day free pilot has started.\n2. Reply with your project name, city and contact: we create your project page.\n3. Cancel anytime, even during the trial."
    }\n\n— The Veyla team`;
    return { subject, html, text };
  }

  const subject =
    kind === "seller_plan"
      ? `Votre commande Veyla est confirmée — ${planLabel}`
      : `Bienvenue sur VEYLA Projets — votre pilote gratuit de 90 jours a commencé`;
  const nextSteps =
    kind === "seller_plan"
      ? `<li>Préparez vos photos : nettes, lumineuses, pièces dégagées.</li>
         <li>Créez votre annonce depuis votre compte : <a href="https://nesta-drab.vercel.app/sell/nouveau">sell/nouveau</a>.</li>
         <li>Notre équipe active votre forfait sous 24 h ouvrables et relit votre annonce.</li>`
      : `<li>Votre pilote gratuit de 90 jours a commencé — aucun prélèvement avant la fin.</li>
         <li>Répondez à ce courriel avec le nom du projet, la ville et un contact : nous créons votre page projet dédiée.</li>
         <li>Résiliable à tout moment, même pendant l'essai, sans frais.</li>`;
  const html = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
    <h1 style="font-size:22px">Merci — ${planLabel}</h1>
    <p>Votre paiement a bien été reçu. Voici la suite :</p>
    <ol>${nextSteps}</ol>
    <p style="color:#666;font-size:13px">Une question ? Répondez simplement à ce courriel.<br/>— L'équipe Veyla</p>
  </div>`;
  const text = `Merci — ${planLabel}\n\nVotre paiement a bien été reçu.\n\n${
    kind === "seller_plan"
      ? "1. Préparez vos photos.\n2. Créez votre annonce : https://nesta-drab.vercel.app/sell/nouveau\n3. Notre équipe active votre forfait sous 24 h ouvrables."
      : "1. Votre pilote gratuit de 90 jours a commencé.\n2. Répondez avec le nom du projet, la ville et un contact : nous créons votre page projet.\n3. Résiliable à tout moment, même pendant l'essai."
  }\n\n— L'équipe Veyla`;
  return { subject, html, text };
}

/**
 * Envoie le courriel de bienvenue. Retourne true si envoyé.
 * No-op (false) si Resend n'est pas configuré ou si l'envoi échoue —
 * le webhook ne doit jamais planter à cause de l'email.
 */
export async function sendWelcomeEmail(args: {
  to: string;
  kind: WelcomeKind;
  plan: string;
  lang?: EmailLang;
}): Promise<boolean> {
  const { to, kind, plan, lang = "fr" } = args;
  if (!isEmailConfigured()) {
    console.log("[email] Resend non configuré — courriel ignoré", { to, kind });
    return false;
  }
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY as string);
    const content = buildWelcomeEmail(kind, plan, lang);
    const { error } = await resend.emails.send({
      from: fromAddress(),
      to,
      subject: content.subject,
      html: content.html,
      text: content.text,
    });
    if (error) {
      console.error("[email] échec d'envoi Resend", error);
      return false;
    }
    console.log("[email] bienvenue envoyé", { to, kind, plan });
    return true;
  } catch (e) {
    console.error("[email] exception d'envoi", e);
    return false;
  }
}
