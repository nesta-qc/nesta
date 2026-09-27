"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { adminSetPropertyStatus } from "@/actions/properties";
import { Button } from "@/components/ui";

/* ============================================================
 * NESTA — actions d'administration sur une annonce : suspendre
 * ou réactiver (republier). Réservé au rôle ADMIN (vérifié
 * côté serveur dans l'action).
 * ============================================================ */

interface Props {
  id: string;
  status: string;
}

export function AdminActions({ id, status }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function run(nextStatus: "suspended" | "published") {
    if (
      nextStatus === "suspended" &&
      !window.confirm("Suspendre cette annonce ? Elle ne sera plus visible.")
    ) {
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await adminSetPropertyStatus(id, nextStatus);
      if (!result.ok) {
        setError(result.message ?? "L'action a échoué.");
      } else {
        router.refresh();
      }
    });
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {status === "suspended" ? (
          <Button
            type="button"
            size="sm"
            disabled={isPending}
            onClick={() => run("published")}
          >
            Réactiver
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={isPending}
            onClick={() => run("suspended")}
          >
            Suspendre
          </Button>
        )}
      </div>
      {error ? (
        <p role="alert" className="text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
