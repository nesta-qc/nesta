"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/** Bouton de déconnexion du centre de contrôle (retour vers /admin/login). */
export function AdminSignOutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function signOut() {
    if (pending) return;
    setPending(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={pending}
      className={
        compact
          ? "text-xs font-medium text-charcoal/60 underline-offset-4 hover:underline disabled:opacity-50"
          : "text-xs font-medium text-charcoal/60 underline-offset-4 hover:text-charcoal hover:underline disabled:opacity-50"
      }
    >
      {pending ? "Déconnexion…" : "Déconnexion"}
    </button>
  );
}
