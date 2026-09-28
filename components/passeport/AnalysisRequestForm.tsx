"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Field, Input, Textarea } from "@/components/ui";
import { AddressAutocomplete } from "@/components/passeport/AddressAutocomplete";
import { createAnalysisRequest } from "@/actions/service-requests";

/* ============================================================
 * NESTA — Passeport : formulaire « Demander l'analyse de cette
 * propriété », SANS création de compte. En cas d'échec d'insert
 * (migration 000012 pas encore appliquée, réseau…), un message
 * d'erreur honnête s'affiche — jamais de fausse confirmation.
 * ============================================================ */

const OBJECTIVES = [
  { value: "acheter", label: "Acheter" },
  { value: "renover", label: "Rénover" },
  { value: "investir", label: "Investir" },
] as const;

export function AnalysisRequestForm({ initialAddress }: { initialAddress: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setPending(true);
    const result = await createAnalysisRequest(formData);
    if (result.ok) {
      router.push("/passeport/analyse/confirmation");
    } else {
      setError(result.message);
      setPending(false);
    }
  }

  return (
    <form action={handleSubmit} className="mt-8 flex flex-col gap-5">
      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <Field
        label="Adresse de la propriété"
        htmlFor="adresse"
        hint="Vous pouvez modifier l'adresse saisie précédemment. Les suggestions proviennent des données ouvertes de la Ville de Montréal."
      >
        <AddressAutocomplete
          id="adresse"
          name="adresse"
          required
          minLength={5}
          maxLength={200}
          defaultValue={initialAddress}
          placeholder="Ex. : 1234 rue Sainte-Catherine, Montréal"
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 transition-colors focus:border-forest focus:outline-none"
        />
      </Field>

      <fieldset>
        <legend className="text-sm font-medium text-charcoal">
          Votre objectif <span className="text-gold"> *</span>
        </legend>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          {OBJECTIVES.map((o) => (
            <label
              key={o.value}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-charcoal transition-colors has-checked:border-forest has-checked:bg-forest/[0.06]"
            >
              <input
                type="radio"
                name="objectif"
                value={o.value}
                defaultChecked={o.value === "acheter"}
                required
                className="h-4 w-4 accent-[#163d32]"
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Votre nom" htmlFor="contact_name" required>
          <Input
            id="contact_name"
            name="contact_name"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            placeholder="Votre nom"
          />
        </Field>
        <Field label="Courriel" htmlFor="contact_email" required>
          <Input
            id="contact_email"
            name="contact_email"
            type="email"
            required
            autoComplete="email"
            placeholder="vous@exemple.com"
          />
        </Field>
      </div>

      <Field label="Téléphone (optionnel)" htmlFor="contact_phone">
        <Input
          id="contact_phone"
          name="contact_phone"
          type="tel"
          autoComplete="tel"
          placeholder="(514) 555-0000"
        />
      </Field>

      <Field
        label="Message (optionnel)"
        htmlFor="message"
        hint="Contexte utile : budget, échéancier, ce qui vous intéresse dans cette propriété…"
      >
        <Textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Dites-nous en plus sur votre projet…"
        />
      </Field>

      <div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Envoi en cours…" : "Demander l'analyse"}
        </Button>
        <p className="mt-3 text-xs text-charcoal/45">
          Sans compte et sans engagement : la réponse vous parvient par
          courriel. Le suivi en ligne est réservé aux comptes Nesta.
        </p>
        <p className="mt-2 text-xs text-charcoal/45">
          En envoyant ce formulaire, vous consentez à ce que Nesta utilise
          votre courriel uniquement pour vous transmettre l&apos;analyse
          demandée. Voir notre{" "}
          <Link
            href="/confidentialite"
            className="underline underline-offset-2 hover:text-forest"
          >
            politique de confidentialité
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
