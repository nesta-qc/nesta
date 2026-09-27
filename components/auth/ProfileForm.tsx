"use client";

import { useActionState } from "react";
import { Button, Field, Input } from "@/components/ui";
import {
  updateProfileAction,
  type ProfileState,
} from "@/actions/auth";

const initialState: ProfileState = { ok: false };

interface ProfileFormProps {
  initialDisplayName: string;
  initialPhone: string;
  initialAvatarUrl: string;
}

/**
 * Formulaire de mise à jour du profil (nom affiché, téléphone, avatar).
 * Valide côté client avec le navigateur, puis revalide côté serveur
 * via la Server Action (zod, jamais de confiance au client).
 */
export function ProfileForm({
  initialDisplayName,
  initialPhone,
  initialAvatarUrl,
}: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProfileAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field label="Nom affiché" htmlFor="profile-name" required>
        <Input
          id="profile-name"
          name="displayName"
          type="text"
          autoComplete="name"
          defaultValue={initialDisplayName}
          disabled={pending}
          required
          minLength={2}
          maxLength={100}
        />
      </Field>
      <Field
        label="Téléphone"
        htmlFor="profile-phone"
        hint="Optionnel."
      >
        <Input
          id="profile-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          defaultValue={initialPhone}
          disabled={pending}
          maxLength={30}
        />
      </Field>
      <Field
        label="Photo de profil (URL)"
        htmlFor="profile-avatar"
        hint="Optionnel — adresse https:// de ton image."
      >
        <Input
          id="profile-avatar"
          name="avatarUrl"
          type="url"
          defaultValue={initialAvatarUrl}
          disabled={pending}
          maxLength={2048}
          placeholder="https://…"
        />
      </Field>

      {state.error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p role="status" className="text-sm font-medium text-forest">
          Profil mis à jour.
        </p>
      ) : null}

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Enregistrement…" : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
