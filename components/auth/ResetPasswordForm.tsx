"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, Input } from "@/components/ui";
import { AuthShell } from "./AuthShell";
import { resetPasswordSchema } from "@/lib/auth/schemas";
import { toFrenchAuthError } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/client";

/**
 * Formulaire de nouveau mot de passe, affiché après l'échange du code
 * de réinitialisation dans /auth/callback (la session est alors posée).
 * Met à jour le mot de passe via updateUser.
 */
export function ResetPasswordForm() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const parsed = resetPasswordSchema.safeParse({
      password: formData.get("password"),
      confirm: formData.get("confirm"),
    });

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errors[String(issue.path[0] ?? "form")] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    setPending(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: parsed.data.password,
      });
      if (error) throw error;
      router.push("/");
      router.refresh();
    } catch (err) {
      setFormError(toFrenchAuthError(err));
      setPending(false);
    }
  }

  return (
    <AuthShell
      title="Nouveau mot de passe"
      subtitle="Choisis un mot de passe d'au moins 8 caractères."
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Field
          label="Nouveau mot de passe"
          htmlFor="reset-password"
          error={fieldErrors.password}
          required
        >
          <Input
            id="reset-password"
            name="password"
            type="password"
            autoComplete="new-password"
            disabled={pending}
          />
        </Field>
        <Field
          label="Confirmer le mot de passe"
          htmlFor="reset-confirm"
          error={fieldErrors.confirm}
          required
        >
          <Input
            id="reset-confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            disabled={pending}
          />
        </Field>

        {formError ? (
          <p role="alert" className="text-sm font-medium text-red-700">
            {formError}
          </p>
        ) : null}

        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Mise à jour…" : "Mettre à jour le mot de passe"}
        </Button>
      </form>
    </AuthShell>
  );
}
