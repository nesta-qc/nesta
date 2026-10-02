"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Field, Input } from "@/components/ui";
import { AuthShell } from "./AuthShell";
import { signupSchema } from "@/lib/auth/schemas";
import { toFrenchAuthError } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/client";

/**
 * Formulaire d'inscription : signUp via le client navigateur.
 * Le lien de confirmation redirige vers /auth/callback.
 * Après inscription : message « Vérifie ta boîte courriel » (sauf si
 * la confirmation est désactivée sur le projet, auquel cas la session
 * est immédiate et on envoie vers /onboarding).
 */
export function SignupForm() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const parsed = signupSchema.safeParse({
      displayName: formData.get("displayName"),
      email: formData.get("email"),
      password: formData.get("password"),
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
      const { data, error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: { display_name: parsed.data.displayName },
        },
      });
      if (error) throw error;

      if (data.session) {
        /* Confirmation courriel désactivée sur le projet : session immédiate. */
        router.push("/onboarding");
        router.refresh();
        return;
      }
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
        subtitle="Un lien de confirmation vient de t'être envoyé. Clique dessus pour activer ton compte, puis complète ton profil d'arrivée."
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
      title="Créer un compte"
      subtitle="Rejoins Veyla en moins d'une minute."
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Field
          label="Nom affiché"
          htmlFor="signup-name"
          error={fieldErrors.displayName}
          hint="Le nom visible sur ton profil."
          required
        >
          <Input
            id="signup-name"
            name="displayName"
            type="text"
            autoComplete="name"
            placeholder="Marie Tremblay"
            disabled={pending}
          />
        </Field>
        <Field
          label="Courriel"
          htmlFor="signup-email"
          error={fieldErrors.email}
          required
        >
          <Input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="toi@exemple.com"
            disabled={pending}
          />
        </Field>
        <Field
          label="Mot de passe"
          htmlFor="signup-password"
          error={fieldErrors.password}
          hint="Au moins 8 caractères."
          required
        >
          <Input
            id="signup-password"
            name="password"
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
          {pending ? "Création en cours…" : "Créer mon compte"}
        </Button>

        <p className="text-center text-sm text-charcoal/60">
          Déjà un compte ?{" "}
          <Link
            href="/connexion"
            className="font-medium text-forest hover:underline"
          >
            Connecte-toi
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
