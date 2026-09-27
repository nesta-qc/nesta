import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { AuthUnavailable } from "@/components/auth/AuthUnavailable";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Inscription",
  description: "Crée ton compte Nesta gratuitement.",
};

/**
 * Page d'inscription. Déjà connecté → accueil.
 * Sans configuration Supabase → état dégradé propre (aucun crash).
 */
export default async function InscriptionPage() {
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

  return <SignupForm />;
}
