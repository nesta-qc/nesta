"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button, Card, Container } from "@/components/ui";
import {
  completeOnboarding,
  type OnboardingState,
} from "@/actions/onboarding";
import {
  INTENTIONS,
  INTENTION_LABELS,
  SELF_ASSIGNABLE_ROLES,
  ROLE_LABELS,
} from "@/lib/auth/schemas";

const initialState: OnboardingState = { ok: false };

/**
 * Questionnaire d'arrivée : intention principale + rôles self-service.
 * Après validation : redirection vers / (ou écran d'attente pour les
 * intentions professionnelles, validées par un administrateur).
 */
export function OnboardingForm() {
  const [state, formAction, pending] = useActionState(
    completeOnboarding,
    initialState,
  );

  if (state.ok && state.proPending) {
    return (
      <Container className="flex flex-1 items-center justify-center py-16 sm:py-24">
        <Card className="w-full max-w-md p-8 text-center">
          <h1 className="font-display text-2xl text-charcoal">
            Demande bien reçue
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
            Ton accès professionnel sera validé par un administrateur. Nous te
            préviendrons dès que ton rôle sera activé.
          </p>
          <Link href="/" className="mt-6 inline-block">
            <Button>Retour à l'accueil</Button>
          </Link>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="flex flex-1 items-center justify-center py-16 sm:py-24">
      <Card className="w-full max-w-lg p-8">
        <h1 className="font-display text-2xl text-charcoal">
          Bienvenue sur Nesta
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
          Dis-nous ce qui t'amène : nous adapterons ton espace en conséquence.
        </p>

        <form action={formAction} className="mt-6 flex flex-col gap-6">
          <fieldset>
            <legend className="text-sm font-medium text-charcoal">
              Je suis ici pour… <span className="text-gold">*</span>
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {INTENTIONS.map((intention) => (
                <label
                  key={intention}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-charcoal transition-colors has-checked:border-forest has-checked:bg-cream"
                >
                  <input
                    type="radio"
                    name="intention"
                    value={intention}
                    required
                    disabled={pending}
                    className="h-4 w-4 accent-forest"
                  />
                  {INTENTION_LABELS[intention]}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-medium text-charcoal">
              Mes rôles sur Nesta
            </legend>
            <p className="mt-1 text-xs text-charcoal/50">
              Tu peux cocher les deux. Les rôles professionnels sont activés
              par un administrateur.
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {SELF_ASSIGNABLE_ROLES.map((role) => (
                <label
                  key={role}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-charcoal transition-colors has-checked:border-forest has-checked:bg-cream"
                >
                  <input
                    type="checkbox"
                    name="roles"
                    value={role}
                    disabled={pending}
                    className="h-4 w-4 accent-forest"
                  />
                  {ROLE_LABELS[role]}
                </label>
              ))}
            </div>
          </fieldset>

          {state.error ? (
            <p role="alert" className="text-sm font-medium text-red-700">
              {state.error}
            </p>
          ) : null}

          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Enregistrement…" : "Commencer"}
          </Button>
        </form>
      </Card>
    </Container>
  );
}
