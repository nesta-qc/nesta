"use client";

import { useMemo, useState } from "react";
import { Card, Field, Input } from "@/components/ui";
import { VirtualTour } from "@/components/virtual-tours/VirtualTour";
import {
  resolveVirtualTourUrl,
  VIRTUAL_TOUR_FORM_CHOICES,
  type VirtualTourFormChoice,
} from "@/lib/virtual-tours";

/* ============================================================
 * VEYLA — section « Visite virtuelle » du formulaire vendeur.
 *
 * Choix : aucune / Matterport / autre lien. L'URL est validée
 * côté client pour un retour immédiat, mais la validation
 * AUTORITAIRE a lieu côté serveur (Server Action).
 * Le vendeur ne colle jamais de HTML/iframe : uniquement une URL.
 * ============================================================ */

interface Props {
  defaultProvider: string | null;
  defaultUrl: string | null;
  /** Identifiant de l'annonce (mode édition) — pour l'aperçu. */
  propertyId?: string;
  error?: string;
}

export function VirtualTourField({
  defaultProvider,
  defaultUrl,
  propertyId,
  error,
}: Props) {
  const initialChoice: VirtualTourFormChoice =
    defaultProvider === "matterport" || defaultProvider === "external"
      ? defaultProvider
      : "none";

  const [choice, setChoice] = useState<VirtualTourFormChoice>(initialChoice);
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [showPreview, setShowPreview] = useState(false);

  const resolved = useMemo(
    () => (url.trim() ? resolveVirtualTourUrl(url) : null),
    [url],
  );

  const choiceMismatch =
    choice === "matterport" &&
    url.trim() !== "" &&
    resolved !== null &&
    resolved.provider !== "matterport";

  const canPreview =
    choice !== "none" && resolved !== null && !choiceMismatch;

  return (
    <Card className="p-6 sm:p-8">
      <h2 className="font-display text-xl text-charcoal">Visite virtuelle</h2>
      <p className="mt-1 text-sm text-charcoal/60">
        Ajoutez une visite 3D à votre annonce. Seule une URL est demandée —
        jamais de code à copier.
      </p>

      <div className="mt-5 flex flex-col gap-5">
        <fieldset>
          <legend className="text-sm font-medium text-charcoal">
            Fournisseur
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {VIRTUAL_TOUR_FORM_CHOICES.map((c) => {
              const selected = choice === c.value;
              return (
                <label
                  key={c.value}
                  className={`cursor-pointer rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors ${
                    selected
                      ? "border-forest bg-forest/5 text-charcoal"
                      : "border-border bg-white text-charcoal/70 hover:border-charcoal/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="virtual_tour_provider"
                    value={c.value}
                    checked={selected}
                    onChange={() =>
                      setChoice(c.value as VirtualTourFormChoice)
                    }
                    className="sr-only"
                  />
                  {c.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        {choice !== "none" ? (
          <Field
            label={
              choice === "matterport"
                ? "URL de la visite Matterport"
                : "Lien de la visite virtuelle"
            }
            htmlFor="virtual_tour_url"
            hint={
              choice === "matterport"
                ? "Lien de partage Matterport, ex. https://my.matterport.com/show/?m=…"
                : "Lien https complet vers votre visite virtuelle."
            }
            error={error}
          >
            <Input
              id="virtual_tour_url"
              name="virtual_tour_url"
              type="url"
              inputMode="url"
              placeholder="https://…"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-invalid={error ? true : undefined}
            />
          </Field>
        ) : (
          /* Champ masqué : garantit "none" à la soumission. */
          <input type="hidden" name="virtual_tour_provider" value="none" />
        )}

        {choice !== "none" && url.trim() !== "" ? (
          <div
            role="status"
            className={`rounded-xl border px-4 py-3 text-sm ${
              choiceMismatch || resolved === null
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-forest/30 bg-forest/5 text-forest"
            }`}
          >
            {choiceMismatch || resolved === null ? (
              <>
                Cette URL ne semble pas valide
                {choice === "matterport"
                  ? " pour Matterport"
                  : ""}
                . Vérifiez le lien avant d'enregistrer.
              </>
            ) : resolved.provider === "matterport" ? (
              <>Visite Matterport détectée — identifiant : {resolved.tourId}.</>
            ) : resolved.embedUrl ? (
              <>Lien valide — la visite sera intégrée à l'annonce.</>
            ) : (
              <>
                Lien valide — la visite s'ouvrira dans un nouvel onglet
                (fournisseur externe).
              </>
            )}
          </div>
        ) : null}

        {canPreview ? (
          <div>
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              aria-expanded={showPreview}
              className="text-sm font-medium text-forest underline-offset-4 hover:underline"
            >
              {showPreview ? "Masquer l'aperçu" : "Prévisualiser la visite"}
            </button>
            {showPreview && resolved ? (
              <div className="mt-3">
                <VirtualTour
                  provider={resolved.provider}
                  tourId={resolved.tourId}
                  url={resolved.url}
                  embedUrl={resolved.embedUrl}
                  propertyId={propertyId ?? "00000000-0000-0000-0000-000000000000"}
                  title="Aperçu de la visite virtuelle"
                  track={false}
                />
                <p className="mt-2 text-xs text-charcoal/40">
                  Aperçu — les statistiques ne sont pas comptées ici.
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
