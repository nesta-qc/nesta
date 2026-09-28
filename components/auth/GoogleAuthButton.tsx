"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toFrenchAuthError } from "@/lib/auth/errors";

/**
 * Bouton « Continuer avec Google » (Supabase OAuth).
 * Redirige vers /auth/callback?next=/ après consentement Google ;
 * le callback gère l'onboarding pour les comptes sans rôle.
 * Nécessite le fournisseur Google activé dans Supabase Auth.
 */
export function GoogleAuthButton({ mode }: { mode: "login" | "signup" }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setPending(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/`,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(toFrenchAuthError(err));
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="flex w-full items-center justify-center gap-3 rounded-full border border-charcoal/20 bg-white px-4 py-3 text-sm font-semibold text-charcoal transition hover:border-charcoal/40 hover:bg-ivory disabled:cursor-not-allowed disabled:opacity-60"
      >
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className="shrink-0"
        >
          <path
            fill="#4285F4"
            d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.1A12 12 0 0 0 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.29a12 12 0 0 0 0 10.76l3.98-3.1z"
          />
          <path
            fill="#EA4335"
            d="M12 4.76c1.76 0 3.34.61 4.58 1.8l3.44-3.44A11.98 11.98 0 0 0 12 0 12 12 0 0 0 1.29 6.62l3.98 3.1C6.22 6.87 8.87 4.76 12 4.76z"
          />
        </svg>
        {pending
          ? "Redirection vers Google…"
          : mode === "login"
            ? "Continuer avec Google"
            : "S'inscrire avec Google"}
      </button>
      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
