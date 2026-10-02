"use client";

import { useState } from "react";
import { CheckoutButton } from "./CheckoutButton";

/* ============================================================
 * CTA d'abonnement VEYLA Projets (promoteurs) : choix annuel /
 * mensuel + bouton Stripe Checkout. Pilote gratuit de 3 mois
 * (trial_period_days côté serveur) : la carte est collectée,
 * le premier prélèvement a lieu après l'essai.
 * ============================================================ */

const OPTIONS = [
  { value: "annuel", label: "4 800 $/an" },
  { value: "mensuel", label: "490 $/mois" },
] as const;

export function ProjetsSubscribe() {
  const [billing, setBilling] = useState<"annuel" | "mensuel">("annuel");

  return (
    <div className="mt-auto pt-8">
      <div
        role="radiogroup"
        aria-label="Facturation"
        className="flex gap-2"
      >
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={billing === opt.value}
            onClick={() => setBilling(opt.value)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              billing === opt.value
                ? "bg-champagne text-charcoal"
                : "bg-white/15 text-ivory hover:bg-white/25"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <CheckoutButton
        kind="projets"
        value={billing}
        label="Démarrer le pilote gratuit (3 mois)"
        notReadyLabel="Le paiement en ligne arrive très bientôt."
        variant="secondary"
        className="mt-4"
      />
      <p className="mt-2 text-xs text-ivory/60">
        Sans engagement : résiliable à tout moment, même pendant l&apos;essai.
      </p>
    </div>
  );
}
