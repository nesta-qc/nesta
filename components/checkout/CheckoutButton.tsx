"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui";
import {
  createCheckoutSession,
  createProjetsSubscription,
} from "@/actions/checkout";

/* ============================================================
 * Bouton de paiement Stripe Checkout.
 *
 * - kind="plan"    : forfait vendeur (list | sell | signature)
 * - kind="projets" : abonnement VEYLA Projets (annuel | mensuel)
 *
 * Si Stripe n'est pas configuré côté serveur, le clic affiche
 * un message clair (« paiement bientôt disponible ») au lieu
 * de planter. Aucune clé n'est exposée au navigateur.
 * ============================================================ */

interface CheckoutButtonProps {
  kind: "plan" | "projets";
  value: string;
  label: string;
  notReadyLabel: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export function CheckoutButton({
  kind,
  value,
  label,
  notReadyLabel,
  variant = "primary",
  className = "",
}: CheckoutButtonProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setError(null);
    startTransition(async () => {
      const result =
        kind === "plan"
          ? await createCheckoutSession(value)
          : await createProjetsSubscription(value);
      if (result.ok && result.url) {
        window.location.href = result.url;
        return;
      }
      setError(
        result.message ??
          (result.error === "not_configured"
            ? notReadyLabel
            : "Une erreur est survenue. Réessayez dans un moment."),
      );
    });
  };

  return (
    <div className={className}>
      <Button
        variant={variant}
        className="w-full"
        onClick={handleClick}
        disabled={pending}
      >
        {pending ? "…" : label}
      </Button>
      {error ? (
        <p role="alert" className="mt-2 text-xs leading-relaxed text-charcoal/60">
          {error}
        </p>
      ) : null}
    </div>
  );
}
