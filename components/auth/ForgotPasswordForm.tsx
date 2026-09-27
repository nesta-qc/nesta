"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { Button, Field, Input } from "@/components/ui";
import { AuthShell } from "./AuthShell";
import { forgotPasswordSchema } from "@/lib/auth/schemas";
import { toFrenchAuthError } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/client";

/**
 * Formulaire « mot de passe oublié » : envoie le lien de réinitialisation
 * (resetPasswordForEmail) qui redirige vers /auth/callback.
 */
export function ForgotPasswordForm() {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const parsed = forgotPasswordSchema.safeParse({
      email: formData.get("email"),
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
      const { error } = await supabase.auth.resetPasswordForEmail(
        parsed.data.email,
        { redirectTo: `${window.location.origin}/auth/callback` },
      );
      if (error) throw error;
      setEmailSent(true);
    } catch (err) {
      setFormError(toFrenchAuthError(err));
    } finally {
      setPending(false);
    }
  }

  if (emailSent) {
    return (
      <AuthShell
        title="Vérifie ta boîte courriel"
        subtitle="Si un compte existe avec ce courriel, un lien de réinitialisation vient d'être envoyé. Il expire après un certain temps."
      >
        <Link href="/connexion">
          <Button variant="secondary" className="w-full">
            Retour à la connexion
          </Button>
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Mot de passe oublié"
      subtitle="Entre ton courriel : nous t'enverrons un lien pour choisir un nouveau mot de passe."
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Field
          label="Courriel"
          htmlFor="forgot-email"
          error={fieldErrors.email}
          required
        >
          <Input
            id="forgot-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="toi@exemple.com"
            disabled={pending}
          />
        </Field>

        {formError ? (
          <p role="alert" className="text-sm font-medium text-red-700">
            {formError}
          </p>
        ) : null}

        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Envoi en cours…" : "Envoyer le lien"}
        </Button>

        <p className="text-center text-sm text-charcoal/60">
          <Link
            href="/connexion"
            className="font-medium text-forest hover:underline"
          >
            Retour à la connexion
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
