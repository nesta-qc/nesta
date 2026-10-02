"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Field, Input } from "@/components/ui";
import { AuthShell } from "./AuthShell";
import { loginSchema } from "@/lib/auth/schemas";
import { toFrenchAuthError } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/client";

/**
 * Valide une destination post-connexion (chemin interne uniquement,
 * anti redirection ouverte).
 */
function sanitizeNext(value: string | null): string | null {
  if (value && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return null;
}

/**
 * Formulaire de connexion : signInWithPassword via le client navigateur.
 * Après succès, redirection vers /onboarding si l'utilisateur n'a
 * encore aucun rôle, vers ?next=… (si fourni) ou / sinon.
 */
export function LoginForm({ linkError = false }: { linkError?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = sanitizeNext(searchParams.get("next"));
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(
    linkError ? "Le lien est invalide ou a expiré. Connecte-toi pour continuer." : null,
  );
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const parsed = loginSchema.safeParse({
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
      const { data, error } = await supabase.auth.signInWithPassword(
        parsed.data,
      );
      if (error) throw error;

      /* L'onboarding est obligatoire pour un compte sans rôle. */
      let target = next ?? "/";
      if (data.user) {
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .limit(1);
        if (!roles || roles.length === 0) {
          target = "/onboarding";
        }
      }
      router.push(target);
      router.refresh();
    } catch (err) {
      setFormError(toFrenchAuthError(err));
      setPending(false);
    }
  }

  return (
    <AuthShell
      title="Connexion"
      subtitle="Ravi de te revoir sur Veyla."
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Field
          label="Courriel"
          htmlFor="login-email"
          error={fieldErrors.email}
          required
        >
          <Input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="toi@exemple.com"
            disabled={pending}
          />
        </Field>
        <Field
          label="Mot de passe"
          htmlFor="login-password"
          error={fieldErrors.password}
          required
        >
          <Input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            disabled={pending}
          />
        </Field>

        {formError ? (
          <p role="alert" className="text-sm font-medium text-red-700">
            {formError}
          </p>
        ) : null}

        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Connexion en cours…" : "Se connecter"}
        </Button>

        <div className="flex items-center justify-between text-sm">
          <Link
            href="/mot-de-passe-oublie"
            className="font-medium text-forest hover:underline"
          >
            Mot de passe oublié ?
          </Link>
          <Link
            href="/inscription"
            className="font-medium text-forest hover:underline"
          >
            Créer un compte
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
