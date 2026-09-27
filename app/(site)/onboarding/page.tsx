import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { AuthUnavailable } from "@/components/auth/AuthUnavailable";
import { OnboardingForm } from "@/components/auth/OnboardingForm";

export const metadata: Metadata = {
  title: "Bienvenue",
  description: "Complète ton profil d'arrivée sur Nesta.",
};

/**
 * Page d'onboarding (protégée) : questionnaire d'arrivée sobre.
 * - Non connecté → /connexion.
 * - Déjà un rôle → / (l'onboarding est terminé).
 */
export default async function OnboardingPage() {
  if (!hasSupabaseConfig()) {
    return <AuthUnavailable />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const { data: roles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .limit(1);

  if (roles && roles.length > 0) {
    redirect("/");
  }

  return <OnboardingForm />;
}
