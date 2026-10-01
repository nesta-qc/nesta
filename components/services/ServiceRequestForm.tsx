"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, Input, Select, Textarea } from "@/components/ui";
import {
  createAnonymousServiceRequest,
  createServiceRequest,
} from "@/actions/service-requests";
import { NESTA_SERVICES } from "@/lib/services";

/* ============================================================
 * NESTA — formulaire de demande de devis :
 * service → infos projet → fichiers (PDF/plans) → envoi.
 *
 * Mode anonyme (sans compte) : champs nom / courriel / téléphone,
 * aucun fichier joint (le stockage reste réservé aux comptes),
 * la réponse parvient par courriel. Le parcours connecté est
 * inchangé.
 * ============================================================ */

export function ServiceRequestForm({
  preselected,
  anonymous = false,
}: {
  preselected: string;
  anonymous?: boolean;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [serviceId, setServiceId] = useState(preselected);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setPending(true);
    /* Option ingénieur : signalée en tête de description (visible côté admin). */
    if (
      String(formData.get("service_id") ?? "") === "dessin-revit" &&
      formData.get("addon_ingenieur") === "oui"
    ) {
      const desc = String(formData.get("description") ?? "");
      formData.set(
        "description",
        `[Option demandée : vérification par ingénieur en structure] ${desc}`,
      );
    }
    if (anonymous) {
      const result = await createAnonymousServiceRequest(formData);
      if (result.ok) {
        router.push("/services/demande/confirmation");
      } else {
        setError(result.message);
        setPending(false);
      }
      return;
    }
    try {
      await createServiceRequest(formData);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
      setPending(false);
    }
  }

  return (
    <form action={handleSubmit} className="mt-8 flex flex-col gap-5">
      {/* Anti-robots : champ invisible — les humains ne le remplissent jamais. */}
      <input
        type="text"
        name="site_web"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
      />
      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <Field label="Service demandé" htmlFor="service_id">
        <Select
          id="service_id"
          name="service_id"
          defaultValue={preselected}
          onChange={(e) => setServiceId(e.target.value)}
          required
        >
          {NESTA_SERVICES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </Select>
      </Field>

      {serviceId === "dessin-revit" ? (
        <label className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-md)] border border-border bg-white p-4 text-sm">
          <input
            type="checkbox"
            name="addon_ingenieur"
            value="oui"
            className="mt-0.5 h-4 w-4"
          />
          <span>
            <span className="font-semibold text-charcoal">
              Ajouter la vérification par un ingénieur en structure
            </span>
            <span className="block text-charcoal/55">
              Tarif sur devis, en supplément du dessin à 35 $/h.
            </span>
          </span>
        </label>
      ) : null}

      <Field label="Nom du projet" htmlFor="project_name">
        <Input
          id="project_name"
          name="project_name"
          required
          minLength={3}
          maxLength={120}
          placeholder="Ex. : Rénovation cuisine — Rosemont"
        />
      </Field>

      <Field
        label="Décrivez votre besoin"
        htmlFor="description"
        hint="Contexte, superficies approximatives, échéancier souhaité…"
      >
        <Textarea
          id="description"
          name="description"
          required
          minLength={20}
          rows={5}
          placeholder="Décrivez votre projet en quelques phrases…"
        />
      </Field>

      {anonymous ? (
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
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Courriel" htmlFor="contact_email">
            <Input
              id="contact_email"
              name="contact_email"
              type="email"
              placeholder="vous@exemple.com"
            />
          </Field>
          <Field label="Téléphone" htmlFor="contact_phone">
            <Input
              id="contact_phone"
              name="contact_phone"
              type="tel"
              placeholder="(514) 555-0000"
            />
          </Field>
        </div>
      )}

      {anonymous ? (
        <Field label="Téléphone (optionnel)" htmlFor="contact_phone">
          <Input
            id="contact_phone"
            name="contact_phone"
            type="tel"
            autoComplete="tel"
            placeholder="(514) 555-0000"
          />
        </Field>
      ) : null}

      {anonymous ? (
        <p className="text-xs text-charcoal/50">
          Sans compte, la pièce jointe de fichiers n&apos;est pas disponible
          et le devis vous parvient par courriel. Pour joindre des plans et
          suivre votre demande en ligne, créez un compte Nesta.
        </p>
      ) : (
        <Field
          label="Fichiers joints (optionnel)"
          htmlFor="files"
          hint="Plans, PDF, photos — 25 Mo maximum par fichier."
        >
          <Input
            id="files"
            name="files"
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.webp,.heic"
            className="cursor-pointer"
          />
        </Field>
      )}

      <div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Envoi en cours…" : "Envoyer la demande de devis"}
        </Button>
        <p className="mt-3 text-xs text-charcoal/45">
          Sans engagement : vous recevez un devis avant toute facturation.
        </p>
      </div>
    </form>
  );
}
