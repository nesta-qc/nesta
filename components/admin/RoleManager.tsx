"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setUserRole } from "@/actions/admin";
import { roleLabel } from "./format";

/* ============================================================
 * NESTA — gestion des rôles d'un utilisateur (admin).
 * Attribution / révocation avec confirmation pour les rôles
 * sensibles. Le retrait de son propre rôle ADMIN est refusé
 * côté serveur.
 * ============================================================ */

const ROLES = ["BUYER", "SELLER", "BROKER", "AGENCY", "DEVELOPER", "ADMIN"];

export function RoleManager({
  userId,
  roles,
}: {
  userId: string;
  roles: string[];
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function toggle(role: string, has: boolean) {
    const action = has ? "révoquer" : "attribuer";
    if (
      !window.confirm(
        `${has ? "Révoquer" : "Attribuer"} le rôle « ${roleLabel(role)} » ${has ? "à" : "pour"} cet utilisateur ?`,
      )
    ) {
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await setUserRole(userId, role, !has);
      if (!result.ok) {
        setError(result.message ?? "L'action a échoué.");
      } else {
        router.refresh();
      }
      void action;
    });
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {ROLES.map((role) => {
          const has = roles.includes(role);
          return (
            <button
              key={role}
              type="button"
              disabled={isPending}
              onClick={() => toggle(role, has)}
              title={has ? "Cliquer pour révoquer" : "Cliquer pour attribuer"}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                has
                  ? role === "ADMIN"
                    ? "border-forest bg-forest text-white"
                    : "border-forest/40 bg-forest/10 text-forest"
                  : "border-border bg-white text-charcoal/60 hover:border-forest hover:text-charcoal"
              }`}
            >
              <span aria-hidden>{has ? "●" : "○"}</span>
              {roleLabel(role)}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-charcoal/50">
        Cliquez sur un rôle pour l’attribuer ou le révoquer. Les changements
        sont journalisés.
      </p>
      {error ? (
        <p role="alert" className="mt-2 text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
