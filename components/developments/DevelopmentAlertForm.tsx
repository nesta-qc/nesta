"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { subscribeDevelopmentAlert } from "@/actions/developments";

/* Formulaire d'alerte : être avisé des nouveaux projets (réel). */

export function DevelopmentAlertForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    const result = await subscribeDevelopmentAlert(formData);
    setOk(result.ok);
    setMessage(result.message);
    setPending(false);
  }

  return (
    <form action={handleSubmit} className="mt-6 flex max-w-md flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          name="email"
          type="email"
          required
          placeholder="votre@courriel.com"
          aria-label="Votre courriel"
          className="flex-1"
        />
        <Button type="submit" disabled={pending}>
          {pending ? "…" : "M'aviser"}
        </Button>
      </div>
      {message ? (
        <p
          role="status"
          className={`text-sm font-medium ${ok ? "text-forest" : "text-red-700"}`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
