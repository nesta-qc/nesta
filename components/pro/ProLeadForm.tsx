"use client";

import { useState } from "react";
import { submitProLead } from "@/actions/pro";

/* Formulaire NESTA Pro : un promoteur laisse ses coordonnées.
 * Stylé pour le bandeau vert forêt (fond sombre). */

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/40 outline-none transition-colors focus:border-champagne/60 focus:bg-white/15";

export function ProLeadForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    const result = await submitProLead(formData);
    setOk(result.ok);
    setMessage(result.message);
    setPending(false);
  }

  if (ok) {
    return (
      <p role="status" className="text-sm font-medium text-champagne">
        {message}
      </p>
    );
  }

  return (
    <form action={handleSubmit} className="mt-6 flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          required
          minLength={2}
          maxLength={120}
          placeholder="Votre nom"
          aria-label="Votre nom"
          autoComplete="name"
          className={inputClass}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Courriel pro"
          aria-label="Courriel professionnel"
          autoComplete="email"
          className={inputClass}
        />
      </div>
      <input
        name="company"
        maxLength={160}
        placeholder="Entreprise / promoteur (optionnel)"
        aria-label="Entreprise"
        autoComplete="organization"
        className={inputClass}
      />
      <textarea
        name="message"
        rows={3}
        maxLength={2000}
        placeholder="Votre projet en quelques mots (optionnel)"
        aria-label="Votre projet"
        className={`${inputClass} resize-y`}
      />
      <button
        type="submit"
        disabled={pending}
        className="mt-1 rounded-full bg-champagne px-6 py-3 text-sm font-semibold text-charcoal transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Envoi…" : "Proposer votre projet"}
      </button>
      {message && !ok ? (
        <p role="alert" className="text-sm font-medium text-red-300">
          {message}
        </p>
      ) : null}
      <p className="text-xs text-ivory/50">
        On s&apos;occupe de tout : il suffit de vos plans et de votre grille de
        prix.
      </p>
    </form>
  );
}
