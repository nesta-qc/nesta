"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { updateProfileSchema } from "@/lib/auth/schemas";

/*
 * Actions serveur d'authentification NESTA.
 * Chaque action revalide ses entrées avec zod : le client n'est jamais
 * considéré comme fiable.
 */

export interface ProfileState {
  ok: boolean;
  error?: string;
}

/**
 * Déconnexion : révoque la session Supabase puis redirige vers l'accueil.
 * Utilisée via un <form> dans l'en-tête (aucun JavaScript requis).
 */
export async function signOutAction(): Promise<void> {
  if (!hasSupabaseConfig()) {
    redirect("/");
  }
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

/**
 * Mise à jour du profil (display_name, phone, avatar_url).
 * La RLS (« profiles : mise à jour (soi) ») garantit qu'un utilisateur
 * ne peut modifier que son propre profil.
 */
export async function updateProfileAction(
  _prevState: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  if (!hasSupabaseConfig()) {
    return {
      ok: false,
      error: "Configuration Supabase manquante — voir SETUP.md.",
    };
  }

  const parsed = updateProfileSchema.safeParse({
    displayName: formData.get("displayName"),
    phone: formData.get("phone"),
    avatarUrl: formData.get("avatarUrl"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      error:
        parsed.error.issues[0]?.message ?? "Les données fournies sont invalides.",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const emptyToNull = (value: string): string | null =>
    value.trim() === "" ? null : value.trim();

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: parsed.data.displayName,
      phone: emptyToNull(parsed.data.phone),
      avatar_url: emptyToNull(parsed.data.avatarUrl),
    })
    .eq("id", user.id);

  if (error) {
    return {
      ok: false,
      error: "La mise à jour a échoué. Réessaie dans un moment.",
    };
  }

  revalidatePath("/profil");
  return { ok: true };
}
