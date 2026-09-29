import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { AuthUnavailable } from "@/components/auth/AuthUnavailable";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = pageMetadata({
  title: "Mot de passe oublié",
  description: "Reçois un lien pour réinitialiser ton mot de passe Nesta.",
  path: "/mot-de-passe-oublie",
  noIndex: true,
});

/**
 * Page « mot de passe oublié ». Déjà connecté → accueil.
 * Sans configuration Supabase → état dégradé propre (aucun crash).
 */
export default async function MotDePasseOubliePage() {
  if (!hasSupabaseConfig()) {
    return <AuthUnavailable />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return <ForgotPasswordForm />;
}
