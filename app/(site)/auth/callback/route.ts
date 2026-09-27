import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";

/*
 * /auth/callback — échange du code Supabase contre une session.
 * Utilisée pour :
 *  - la vérification du courriel à l'inscription (→ /onboarding ou /),
 *  - la réinitialisation du mot de passe (type=recovery → /reinitialiser-mot-de-passe).
 *
 * Le paramètre « next » optionnel est strictement validé (chemin interne
 * uniquement) pour éviter les redirections ouvertes.
 */

function sanitizeNext(value: string | null): string {
  if (value && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/";
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const next = sanitizeNext(searchParams.get("next"));

  if (!hasSupabaseConfig() || !code) {
    return NextResponse.redirect(`${origin}/connexion?erreur=lien-invalide`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/connexion?erreur=lien-invalide`);
  }

  /* Réinitialisation de mot de passe : la session est posée, l'utilisateur
     choisit maintenant son nouveau mot de passe. */
  if (type === "recovery") {
    return NextResponse.redirect(`${origin}/reinitialiser-mot-de-passe`);
  }

  /* Nouvel inscrit sans rôle → onboarding, sinon destination demandée. */
  const { data: roles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", data.user.id)
    .limit(1);

  const target = !roles || roles.length === 0 ? "/onboarding" : next;
  return NextResponse.redirect(`${origin}${target}`);
}
