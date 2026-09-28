import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { ROLE_LABELS } from "@/lib/auth/schemas";
import { AuthUnavailable } from "@/components/auth/AuthUnavailable";
import { ProfileForm } from "@/components/auth/ProfileForm";
import { PasswordChangeForm } from "@/components/auth/PasswordChangeForm";
import { Badge, Card, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Mon profil",
  description: "Consulte et mets à jour ton profil Nesta.",
};

/**
 * Page de profil (protégée) : nom affiché, courriel (lecture seule),
 * téléphone, avatar, rôles ; formulaire de mise à jour via Server Action.
 * La RLS garantit l'accès au seul profil de l'utilisateur connecté.
 */
export default async function ProfilPage() {
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

  const [{ data: profile }, { data: roles }] = await Promise.all([
    supabase
      .from("profiles")
      .select("display_name, avatar_url, phone")
      .eq("id", user.id)
      .single(),
    supabase.from("user_roles").select("role").eq("user_id", user.id),
  ]);

  const displayName = profile?.display_name ?? user.email ?? "";
  const phone = profile?.phone ?? "";
  const avatarUrl = profile?.avatar_url ?? "";
  const roleList: string[] = (roles ?? []).map((r) => r.role);

  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Mon profil</h1>
          <p className="mt-2 text-sm text-charcoal/60">
            Tes informations personnelles sur Nesta.
          </p>
        </div>

        {/* Aperçu du profil. */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Photo de profil"
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover"
                unoptimized
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-forest font-display text-2xl text-white"
              >
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-display text-xl text-charcoal">{displayName}</p>
              <p className="text-sm text-charcoal/60">{user.email}</p>
            </div>
          </div>

          {roleList.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {roleList.map((role) => (
                <Badge key={role} variant="forest">
                  {ROLE_LABELS[role] ?? role}
                </Badge>
              ))}
            </div>
          ) : null}
        </Card>

        {/* Détails + mise à jour. */}
        <Card className="p-6">
          <h2 className="font-display text-xl text-charcoal">
            Informations personnelles
          </h2>
          <p className="mt-1 text-sm text-charcoal/60">
            Ton courriel est lié à ton compte et ne peut pas être modifié ici.
          </p>
          <div className="mt-6">
            <ProfileForm
              initialDisplayName={displayName}
              initialPhone={phone}
              initialAvatarUrl={avatarUrl}
            />
          </div>
        </Card>

        {/* Changement de mot de passe. */}
        <Card className="p-6">
          <h2 className="font-display text-xl text-charcoal">Mot de passe</h2>
          <p className="mt-1 text-sm text-charcoal/60">
            Choisis un nouveau mot de passe pour ton compte. Si tu t'es inscrit
            avec Google, définir un mot de passe te permettra aussi de te
            connecter avec ton courriel.
          </p>
          <div className="mt-6">
            <PasswordChangeForm />
          </div>
        </Card>
      </div>
    </Container>
  );
}
