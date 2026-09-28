"use client";

import { useState } from "react";
import { submitProWaitlist } from "@/actions/pro-waitlist";
import { WAITLIST_PROFESSIONS } from "@/lib/pro-waitlist";

/* Formulaire liste d'attente pros : courriel + profession. */

export function ProWaitlistForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    const result = await submitProWaitlist(formData);
    setOk(result.ok);
    setMessage(result.message);
    setPending(false);
  }

  if (ok) {
    return (
      <p role="status" className="text-sm font-medium text-forest">
        {message}
      </p>
    );
  }

  return (
    <form action={handleSubmit} className="mt-6 flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
        <input
          name="email"
          type="email"
          required
          placeholder="Votre courriel pro"
          aria-label="Courriel professionnel"
          autoComplete="email"
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 outline-none transition-colors focus:border-forest"
        />
        <select
          name="profession"
          required
          defaultValue=""
          aria-label="Votre profession"
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-forest"
        >
          <option value="" disabled>
            Profession
          </option>
          {WAITLIST_PROFESSIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Inscription…" : "Me prévenir à l'ouverture"}
      </button>
      {message && !ok ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {message}
        </p>
      ) : null}
    </form>
  );
}
