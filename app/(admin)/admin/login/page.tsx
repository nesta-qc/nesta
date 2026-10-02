import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Connexion — VEYLA Admin",
  description: "Accès réservé au centre de contrôle VEYLA.",
  robots: { index: false, follow: false },
};

/* ============================================================
 * VEYLA Admin — porte d'entrée du site d'administration dédié.
 * Hors du groupe (guarded) : aucun rôle requis pour voir cette
 * page. Un admin déjà connecté est renvoyé vers /admin ; un
 * compte connecté sans rôle ADMIN voit un refus explicite.
 * ============================================================ */

function BrandMark() {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest font-display text-xl text-white"
      >
        N
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg text-charcoal">VEYLA</span>
        <span className="block text-[11px] font-semibold uppercase tracking-widest text-champagne">
          Admin
        </span>
      </span>
    </div>
  );
}

export default async function AdminLoginPage() {
  if (!hasSupabaseConfig()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
        <p className="text-sm text-charcoal/60">
          Service d’authentification indisponible pour le moment.
        </p>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: adminRole } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "ADMIN")
      .maybeSingle();
    if (adminRole) {
      redirect("/admin");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-ivory text-charcoal">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex justify-center">
            <BrandMark />
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h1 className="font-display text-2xl text-charcoal">
              Centre de contrôle
            </h1>
            <p className="mt-1 text-sm text-charcoal/60">
              Accès réservé aux administrateurs VEYLA.
            </p>
            <div className="mt-6">
              {user ? (
                <div className="flex flex-col gap-3">
                  <p
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  >
                    Ce compte ({user.email}) n’a pas le rôle administrateur.
                  </p>
                  <Link
                    href="/"
                    className="text-center text-sm font-medium text-forest underline-offset-4 hover:underline"
                  >
                    Retour à l’accueil
                  </Link>
                </div>
              ) : (
                <AdminLoginForm />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
