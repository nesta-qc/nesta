import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { AuthUnavailable } from "@/components/auth/AuthUnavailable";
import { AuthShell } from "@/components/auth/AuthShell";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Button } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Nouveau mot de passe",
  description: "Choisis un nouveau mot de passe pour ton compte Nesta.",
  path: "/reinitialiser-mot-de-passe",
  noIndex: true,
});

/**
 * Page de réinitialisation du mot de passe, atteinte après l'échange du
 * code dans /auth/callback (la session est alors posée).
 * Sans session valide → message sobre + lien pour redemander un lien.
 */
export default async function ReinitialiserMotDePassePage() {
  if (!hasSupabaseConfig()) {
    return <AuthUnavailable />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <AuthShell
        title="Lien invalide ou expiré"
        subtitle="Ce lien de réinitialisation n'est plus valide. Demande un nouveau lien pour choisir un nouveau mot de passe."
      >
        <Link href="/mot-de-passe-oublie">
          <Button className="w-full">Demander un nouveau lien</Button>
        </Link>
      </AuthShell>
    );
  }

  return <ResetPasswordForm />;
}
