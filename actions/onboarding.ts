"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import {
  onboardingSchema,
  type Intention,
  type SelfAssignableRole,
} from "@/lib/auth/schemas";

/*
 * Action serveur de l'onboarding VEYLA.
 * Revalide l'intention et les rôles avec zod, puis insère les rôles
 * self-service (BUYER / SELLER) via la politique RLS dédiée.
 * Les rôles professionnels (courtier, agence, promoteur) ne sont
 * jamais insérés ici : un administrateur les attribue.
 */

export interface OnboardingState {
  ok: boolean;
  error?: string;
  /** Intention professionnelle : accès à valider par un administrateur. */
  proPending?: boolean;
}

/** Rôle self-service déduit de l'intention (null = rôle professionnel). */
const INTENTION_TO_ROLE: Record<Intention, SelfAssignableRole | null> = {
  acheter: "BUYER",
  vendre: "SELLER",
  investir: "BUYER",
  courtier: null,
  promoteur: null,
};

const isProIntention = (intention: Intention): boolean =>
  intention === "courtier" || intention === "promoteur";

export async function completeOnboarding(
  _prevState: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  if (!hasSupabaseConfig()) {
    return {
      ok: false,
      error: "Configuration Supabase manquante — voir SETUP.md.",
    };
  }

  const parsed = onboardingSchema.safeParse({
    intention: formData.get("intention"),
    roles: formData.getAll("roles"),
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

  /* Rôles à attribuer : intention + cases cochées (dédupliqués). */
  const toAdd = new Set<SelfAssignableRole>();
  const fromIntention = INTENTION_TO_ROLE[parsed.data.intention];
  if (fromIntention) {
    toAdd.add(fromIntention);
  }
  for (const role of parsed.data.roles) {
    toAdd.add(role);
  }

  if (toAdd.size > 0) {
    const rows = [...toAdd].map((role) => ({ user_id: user.id, role }));
    const { error } = await supabase
      .from("user_roles")
      .upsert(rows, { onConflict: "user_id,role" });

    if (error) {
      return {
        ok: false,
        error: "Impossible d'enregistrer tes rôles. Réessaie dans un moment.",
      };
    }
  }

  revalidatePath("/");

  /* Intention professionnelle : l'accès sera validé par un administrateur. */
  if (isProIntention(parsed.data.intention)) {
    return { ok: true, proPending: true };
  }

  redirect("/");
}
