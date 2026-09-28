"use client";

import { useActionState } from "react";
import { Button, Field, Input } from "@/components/ui";
import { updatePasswordAction } from "@/actions/auth";
import type { ProfileState } from "@/actions/auth";

const initialState: ProfileState = { ok: false };

/**
 * Changement de mot de passe depuis l'espace compte.
 * Le mot de passe actuel n'est pas redemandé : la session active
 * suffit (Supabase Auth met à jour le mot de passe de l'utilisateur
 * connecté). Le nouveau mot de passe doit être confirmé.
 */
export function PasswordChangeForm() {
  const [state, formAction, pending] = useActionState(
    updatePasswordAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field
        label="Nouveau mot de passe"
        htmlFor="profil-new-password"
        hint="8 caractères minimum."
        required
      >
        <Input
          id="profil-new-password"
          name="password"
          type="password"
          autoComplete="new-password"
          disabled={pending}
        />
      </Field>
      <Field
        label="Confirmer le nouveau mot de passe"
        htmlFor="profil-confirm-password"
        required
      >
        <Input
          id="profil-confirm-password"
          name="confirm"
          type="password"
          autoComplete="new-password"
          disabled={pending}
        />
      </Field>

      {state.error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p role="status" className="text-sm font-medium text-forest">
          Ton mot de passe a été mis à jour.
        </p>
      ) : null}

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Mise à jour…" : "Changer mon mot de passe"}
        </Button>
      </div>
    </form>
  );
}
