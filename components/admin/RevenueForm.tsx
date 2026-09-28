"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button, Field, Input } from "@/components/ui";
import {
  recordRevenueEvent,
  type RevenueFormState,
} from "@/actions/revenue";
import { REVENUE_CATEGORIES } from "@/lib/revenue";

const initialState: RevenueFormState = { ok: false };

/** Formulaire d'enregistrement d'un encaissement réel (admin). */
export function RevenueForm() {
  const [state, formAction, pending] = useActionState(
    recordRevenueEvent,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const lastOkRef = useRef(false);

  /* Réinitialise le formulaire après chaque enregistrement réussi. */
  useEffect(() => {
    if (pending) {
      lastOkRef.current = false;
    } else if (state.ok && !lastOkRef.current) {
      lastOkRef.current = true;
      formRef.current?.reset();
    }
  }, [state, pending]);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Catégorie" htmlFor="rev-category" required>
          <select
            id="rev-category"
            name="category"
            disabled={pending}
            className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-charcoal focus:border-forest focus:outline-none"
          >
            {REVENUE_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label} — {c.detail}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Montant (en $)" htmlFor="rev-amount" required>
          <Input
            id="rev-amount"
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="299,00"
            disabled={pending}
          />
        </Field>
      </div>

      <Field label="Libellé" htmlFor="rev-label" required>
        <Input
          id="rev-label"
          name="label"
          type="text"
          maxLength={160}
          placeholder="Ex. : Forfait SELL — 123 rue Papineau"
          disabled={pending}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Date d'encaissement" htmlFor="rev-date" required>
          <Input
            id="rev-date"
            name="occurredOn"
            type="date"
            defaultValue={today}
            disabled={pending}
          />
        </Field>
        <Field label="Note interne (optionnel)" htmlFor="rev-notes">
          <Input
            id="rev-notes"
            name="notes"
            type="text"
            maxLength={500}
            placeholder="Référence, contexte…"
            disabled={pending}
          />
        </Field>
      </div>

      {state.error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p role="status" className="text-sm font-medium text-forest">
          Encaissement enregistré.
        </p>
      ) : null}

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Enregistrement…" : "Enregistrer l'encaissement"}
        </Button>
      </div>
    </form>
  );
}
