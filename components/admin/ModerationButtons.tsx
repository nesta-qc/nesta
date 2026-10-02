"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { moderateProperty, type PropertyDecision } from "@/actions/admin";

/* ============================================================
 * VEYLA — boutons de modération d'une annonce (admin).
 * Les actions destructrices (suspendre, archiver) demandent
 * une confirmation. Toute décision est journalisée côté serveur.
 * ============================================================ */

interface ActionDef {
  decision: PropertyDecision;
  label: string;
  confirm?: string;
  primary?: boolean;
  danger?: boolean;
}

function actionsFor(status: string): ActionDef[] {
  switch (status) {
    case "draft":
      return [
        { decision: "approve", label: "Approuver", primary: true },
        {
          decision: "suspend",
          label: "Suspendre",
          confirm: "Suspendre cette annonce ? Elle ne sera plus visible.",
          danger: true,
        },
      ];
    case "published":
      return [
        {
          decision: "suspend",
          label: "Suspendre",
          confirm: "Suspendre cette annonce ? Elle ne sera plus visible.",
          danger: true,
        },
        {
          decision: "archive",
          label: "Archiver",
          confirm: "Archiver cette annonce ? Elle sera retirée définitivement.",
          danger: true,
        },
      ];
    case "suspended":
      return [
        { decision: "approve", label: "Réactiver", primary: true },
        {
          decision: "archive",
          label: "Archiver",
          confirm: "Archiver cette annonce ? Elle sera retirée définitivement.",
          danger: true,
        },
      ];
    case "withdrawn":
      return [{ decision: "redraft", label: "Remettre en brouillon" }];
    default:
      return []; // sold / rented : états terminaux, aucune action
  }
}

export function ModerationButtons({
  id,
  status,
  size = "md",
}: {
  id: string;
  status: string;
  size?: "sm" | "md";
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const actions = actionsFor(status);

  if (actions.length === 0) {
    return <span className="text-xs text-charcoal/45">—</span>;
  }

  function run(def: ActionDef) {
    if (def.confirm && !window.confirm(def.confirm)) return;
    setError(null);
    startTransition(async () => {
      const result = await moderateProperty(id, def.decision);
      if (!result.ok) {
        setError(result.message ?? "L'action a échoué.");
      } else {
        router.refresh();
      }
    });
  }

  const cls = (def: ActionDef) =>
    `inline-flex items-center justify-center rounded-full font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
      size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
    } ${
      def.primary
        ? "bg-forest text-white hover:bg-forest-deep"
        : def.danger
          ? "border border-red-300 bg-white text-red-700 hover:bg-red-50"
          : "border border-border bg-white text-charcoal hover:border-forest"
    }`;

  return (
    <div className="flex flex-col items-start gap-1.5">
      <div className="flex flex-wrap items-center gap-2">
        {actions.map((def) => (
          <button
            key={def.decision}
            type="button"
            disabled={isPending}
            onClick={() => run(def)}
            className={cls(def)}
          >
            {def.label}
          </button>
        ))}
      </div>
      {error ? (
        <p role="alert" className="text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
