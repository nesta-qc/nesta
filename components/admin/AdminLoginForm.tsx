"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/auth/schemas";
import { toFrenchAuthError } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/client";

/* ============================================================
 * NESTA Admin — formulaire de connexion du site d'administration
 * dédié. Après signInWithPassword, le rôle ADMIN est vérifié :
 * un compte sans ce rôle est aussitôt déconnecté et refusé.
 * Composant autonome : aucune dépendance au design system du
 * site client.
 * ============================================================ */

const inputClass =
  "w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-charcoal/35 outline-none transition-colors focus:border-forest disabled:opacity-50";

const labelClass =
  "mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal/55";

export function AdminLoginForm() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
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
      if (!data.user) throw new Error("Connexion impossible.");

      /* Le dashboard est réservé aux ADMIN : vérification immédiate. */
      const { data: adminRole } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "ADMIN")
        .maybeSingle();

      if (!adminRole) {
        await supabase.auth.signOut();
        setFormError("Ce compte n'a pas accès au centre de contrôle.");
        setPending(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setFormError(toFrenchAuthError(err));
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="admin-login-email" className={labelClass}>
          Courriel
        </label>
        <input
          id="admin-login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="toi@exemple.com"
          disabled={pending}
          className={inputClass}
        />
        {fieldErrors.email ? (
          <p role="alert" className="mt-1 text-xs font-medium text-red-700">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="admin-login-password" className={labelClass}>
          Mot de passe
        </label>
        <input
          id="admin-login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          disabled={pending}
          className={inputClass}
        />
        {fieldErrors.password ? (
          <p role="alert" className="mt-1 text-xs font-medium text-red-700">
            {fieldErrors.password}
          </p>
        ) : null}
      </div>

      {formError ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-forest px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Connexion en cours…" : "Accéder au centre de contrôle"}
      </button>
    </form>
  );
}
