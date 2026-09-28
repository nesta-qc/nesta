"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setServiceRequestStatus } from "@/actions/admin";
import type { ServiceRequestListItem } from "@/actions/admin";
import {
  displayNameOr,
  serviceRequestName,
  timeAgo,
} from "@/components/admin/format";

/*
 * Pipeline kanban des demandes de devis (admin uniquement).
 * Glisser-déposer d'une carte vers une colonne = changement de statut
 * immédiat (optimiste, avec retour en arrière en cas d'échec).
 */

interface PipelineColumn {
  status: string;
  title: string;
  hint: string;
}

const COLUMNS: PipelineColumn[] = [
  { status: "pending", title: "Devis reçus", hint: "Nouvelle demande à qualifier" },
  { status: "in_review", title: "Intéressés", hint: "Contact établi, besoin confirmé" },
  { status: "quoted", title: "Négo", hint: "Devis envoyé, en négociation" },
  { status: "in_progress", title: "En cours", hint: "Mandat accepté, en production" },
  { status: "delivered", title: "Livré", hint: "Terminé et livré" },
  { status: "cancelled", title: "Annulé", hint: "Abandonné ou perdu" },
];

function PipelineCard({
  item,
  onDragStart,
}: {
  item: ServiceRequestListItem;
  onDragStart: (id: string) => void;
}) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", item.id);
        e.dataTransfer.effectAllowed = "move";
        onDragStart(item.id);
      }}
      className="cursor-grab rounded-xl border border-border bg-white p-3.5 shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing"
    >
      <p className="text-sm font-semibold text-charcoal">
        {serviceRequestName(item.service_id, item.project_name)}
      </p>
      <p className="mt-1 truncate text-xs text-charcoal/60">
        {displayNameOr(item.contact_name)}
        {item.contact_email ? ` · ${item.contact_email}` : ""}
      </p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[11px] text-charcoal/50">{timeAgo(item.created_at)}</span>
        <Link
          href={`/admin/requests/${item.id}`}
          onClick={(e) => e.stopPropagation()}
          onDragStart={(e) => e.preventDefault()}
          className="text-[11px] font-medium text-forest hover:underline"
        >
          Détail
        </Link>
      </div>
    </div>
  );
}

export function PipelineBoard({
  initialItems,
}: {
  initialItems: ServiceRequestListItem[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDrop(targetStatus: string, cardId: string) {
    setDragOver(null);
    setDraggingId(null);
    const card = items.find((i) => i.id === cardId);
    if (!card || card.status === targetStatus) return;

    const previousStatus = card.status;
    setItems((prev) =>
      prev.map((i) => (i.id === cardId ? { ...i, status: targetStatus } : i)),
    );
    setError(null);

    const result = await setServiceRequestStatus(cardId, targetStatus);
    if (!result.ok) {
      /* Retour en arrière : la carte reprend sa colonne d'origine. */
      setItems((prev) =>
        prev.map((i) =>
          i.id === cardId ? { ...i, status: previousStatus } : i,
        ),
      );
      setError(result.message ?? "Le déplacement a échoué.");
      return;
    }
    router.refresh();
  }

  return (
    <div>
      {error ? (
        <p
          role="alert"
          className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      ) : null}

      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const cards = items.filter((i) => i.status === col.status);
          const isOver = dragOver === col.status;
          const isTerminal = col.status === "delivered" || col.status === "cancelled";
          return (
            <section
              key={col.status}
              aria-label={col.title}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                setDragOver(col.status);
              }}
              onDragLeave={() => setDragOver((v) => (v === col.status ? null : v))}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(col.status, e.dataTransfer.getData("text/plain"));
              }}
              className={`w-72 shrink-0 rounded-2xl border p-3 transition-colors ${
                isOver
                  ? "border-forest bg-forest/5"
                  : "border-border bg-sand/60"
              }`}
            >
              <header className="px-1 pb-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-base text-charcoal">
                    {col.title}
                  </h2>
                  <span
                    className={`inline-flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                      isTerminal
                        ? "bg-charcoal/10 text-charcoal/60"
                        : "bg-champagne/25 text-charcoal"
                    }`}
                  >
                    {cards.length}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-charcoal/50">{col.hint}</p>
              </header>

              <div className="flex max-h-[65vh] flex-col gap-2.5 overflow-y-auto pr-0.5">
                {cards.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-charcoal/20 px-3 py-6 text-center text-xs text-charcoal/40">
                    Glisse une demande ici
                  </p>
                ) : (
                  cards.map((item) => (
                    <div
                      key={item.id}
                      className={draggingId === item.id ? "opacity-40" : ""}
                    >
                      <PipelineCard item={item} onDragStart={setDraggingId} />
                    </div>
                  ))
                )}
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-2 text-xs text-charcoal/50">
        Astuce : glisse une carte d'une colonne à l'autre pour changer son
        statut. Le détail complet reste accessible via « Détail ».
      </p>
    </div>
  );
}
