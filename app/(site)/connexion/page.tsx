import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { AuthUnavailable } from "@/components/auth/AuthUnavailable";
import { LoginForm } from "@/components/auth/LoginForm";

export async function generateMetadata(): Promise<Metadata> {
  return await pageMetadata({
    title: "Connexion",
    description: "Connecte-toi à ton compte Nesta.",
    path: "/connexion",
    noIndex: true,
  });
}


interface ConnexionPageProps {
  searchParams: Promise<{ erreur?: string }>;
}

/**
 * Page de connexion. Déjà connecté → accueil.
 * Sans configuration Supabase → état dégradé propre (aucun crash).
 */
export default async function ConnexionPage({
  searchParams,
}: ConnexionPageProps) {
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

  const params = await searchParams;
  return <LoginForm linkError={params.erreur === "lien-invalide"} />;
}
