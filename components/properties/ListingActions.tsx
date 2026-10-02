"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteProperty, setPropertyStatus } from "@/actions/properties";
import { Button } from "@/components/ui";

/* ============================================================
 * VEYLA — actions sur une annonce (vendeur) : publier, retirer,
 * supprimer (avec confirmation). Utilisé sur /sell/annonces et
 * sur la page de modification.
 * ============================================================ */

interface Props {
  id: string;
  status: string;
}

export function ListingActions({ id, status }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function run(action: () => Promise<{ ok: boolean; message?: string }>) {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (!result.ok) {
        setError(result.message ?? "L'action a échoué.");
      } else {
        router.refresh();
      }
    });
  }

  function handleDelete() {
    if (
      !window.confirm(
        "Supprimer définitivement cette annonce et ses photos ? Cette action est irréversible.",
      )
    ) {
      return;
    }
    run(() => deleteProperty(id));
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {status !== "published" ? (
          <Button
            type="button"
            size="sm"
            disabled={isPending}
            onClick={() => run(() => setPropertyStatus(id, "published"))}
          >
            Publier
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={isPending}
            onClick={() => run(() => setPropertyStatus(id, "withdrawn"))}
          >
            Retirer
          </Button>
        )}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          disabled={isPending}
          onClick={handleDelete}
          className="text-red-700 hover:bg-red-50"
        >
          Supprimer
        </Button>
      </div>
      {error ? (
        <p role="alert" className="text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
