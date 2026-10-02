"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  setServiceRequestStatus,
  setServiceRequestNote,
} from "@/actions/admin";
import { SERVICE_REQUEST_STATUSES, serviceStatusLabel } from "@/lib/services";

/* ============================================================
 * VEYLA — gestion d'une demande de service (admin) :
 * changement de statut + note interne.
 * ============================================================ */

export function RequestStatusChanger({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function onChange(next: string) {
    if (next === status) return;
    setError(null);
    startTransition(async () => {
      const result = await setServiceRequestStatus(id, next);
      if (!result.ok) {
        setError(result.message ?? "Le statut n'a pas pu être mis à jour.");
      } else {
        router.refresh();
      }
    });
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={`sr-status-${id}`}
        className="text-xs font-medium uppercase tracking-wider text-charcoal/50"
      >
        Statut
      </label>
      <select
        id={`sr-status-${id}`}
        value={status}
        disabled={isPending}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-xs rounded-xl border border-border bg-white px-3 py-2 text-sm text-charcoal disabled:opacity-50"
      >
        {SERVICE_REQUEST_STATUSES.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
      {error ? (
        <p role="alert" className="text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function RequestNoteEditor({
  id,
  initialNote,
}: {
  id: string;
  initialNote: string | null;
}) {
  const [note, setNote] = useState(initialNote ?? "");
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const dirty = note !== (initialNote ?? "");

  function save() {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const result = await setServiceRequestNote(id, note);
      if (!result.ok) {
        setError(result.message ?? "La note n'a pas pu être enregistrée.");
      } else {
        setSaved(true);
        router.refresh();
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={`sr-note-${id}`}
        className="text-xs font-medium uppercase tracking-wider text-charcoal/50"
      >
        Note interne (visible par les admins uniquement)
      </label>
      <textarea
        id={`sr-note-${id}`}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        maxLength={2000}
        placeholder="Ex. Rappelé le 28 sept. — devis à envoyer cette semaine."
        className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-charcoal placeholder:text-charcoal/35"
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={isPending || !dirty}
          onClick={save}
          className="inline-flex items-center justify-center rounded-full bg-forest px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Enregistrement…" : "Enregistrer la note"}
        </button>
        {saved && !dirty ? (
          <span className="text-xs font-medium text-forest">Enregistrée.</span>
        ) : null}
        {error ? (
          <span role="alert" className="text-xs font-medium text-red-700">
            {error}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function RequestStatusBadge({ status }: { status: string }) {
  const tone =
    status === "pending"
      ? "bg-champagne/25 text-charcoal"
      : status === "cancelled"
        ? "bg-charcoal/10 text-charcoal/60"
        : status === "delivered"
          ? "bg-forest/10 text-forest"
          : "bg-sand text-charcoal";
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tone}`}
    >
      {serviceStatusLabel(status)}
    </span>
  );
}
