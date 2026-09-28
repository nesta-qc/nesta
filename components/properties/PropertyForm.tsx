"use client";

import { useActionState, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  createProperty,
  setPropertyStatus,
  updateProperty,
} from "@/actions/properties";
import { initialPropertyActionState } from "@/lib/action-state";
import { Button, Card, Field, Input, Select, Textarea } from "@/components/ui";
import type { PropertyMediaRow, PropertyRow } from "@/lib/validation";
import { PhotoUploader } from "./PhotoUploader";
import { VirtualTourField } from "./VirtualTourField";
import {
  NestaCapture,
  type UploadedCapturePhoto,
} from "../capture/NestaCapture";

/* ============================================================
 * NESTA — formulaire d'annonce (création + modification).
 *
 * Mode "create" : après la création en brouillon, le formulaire
 * bascule vers l'étape photos + publication (l'upload nécessite
 * l'identifiant de l'annonce). Une création directe en "published"
 * redirige vers la page publique de l'annonce.
 *
 * Mode "edit" : formulaire pré-rempli + gestion des photos.
 * ============================================================ */

type Props =
  | { mode: "create" }
  | { mode: "edit"; property: PropertyRow; media: PropertyMediaRow[] };

const PROPERTY_TYPE_OPTIONS = [
  { value: "", label: "Sélectionner…" },
  { value: "house", label: "Maison" },
  { value: "condo", label: "Condo" },
  { value: "plex", label: "Plex" },
  { value: "land", label: "Terrain" },
  { value: "commercial", label: "Commercial" },
  { value: "other", label: "Autre" },
];

function fieldError(
  errors: Record<string, string[]> | undefined,
  name: string,
): string | undefined {
  return errors?.[name]?.[0];
}

export function PropertyForm(props: Props) {
  const isEdit = props.mode === "edit";
  const property = isEdit ? props.property : null;
  const editMedia = isEdit ? props.media : [];

  const [state, formAction, isPending] = useActionState(
    isEdit ? updateProperty : createProperty,
    initialPropertyActionState,
  );
  const [isPublishing, startPublishing] = useTransition();
  const [publishError, setPublishError] = useState<string | null>(null);
  const [captureOpen, setCaptureOpen] = useState(false);
  const [captureMedia, setCaptureMedia] = useState<PropertyMediaRow[]>([]);
  const router = useRouter();

  /* Étape 2 (création) : l'annonce existe en brouillon, on ajoute
     les photos puis on publie. */
  const createdId =
    !isEdit && state.ok && state.propertyId ? state.propertyId : null;

  function handlePublish(id: string) {
    setPublishError(null);
    startPublishing(async () => {
      const result = await setPropertyStatus(id, "published");
      if (result.ok) {
        router.push(`/properties/${id}`);
      } else {
        setPublishError(result.message ?? "La publication a échoué.");
      }
    });
  }

  function handleCaptureUploaded(photos: UploadedCapturePhoto[]) {
    setCaptureMedia((prev) => [
      ...prev,
      ...photos.map((p, i) => ({
        id: p.id,
        property_id: createdId ?? "",
        kind: "photo",
        storage_path: p.storagePath,
        caption: null,
        position: prev.length + i,
        created_at: new Date().toISOString(),
      })),
    ]);
  }

  if (createdId) {
    return (
      <div className="flex flex-col gap-8">
        <Card className="p-6 sm:p-8">
          <h2 className="font-display text-2xl text-charcoal">
            Annonce créée en brouillon
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
            Ajoutez des photos pour mettre votre bien en valeur, puis
            publiez-le quand vous êtes prêt. Votre annonce ne sera visible
            dans la recherche qu’une fois publiée.
          </p>
          <div className="mt-6 flex flex-col gap-6">
            <div>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => setCaptureOpen(true)}
              >
                Prendre mes photos avec NESTA
              </Button>
              <p className="mt-2 text-sm text-charcoal/55">
                Photos guidées depuis votre téléphone : netteté, luminosité
                et cadrage vérifiés automatiquement.
              </p>
            </div>
            <PhotoUploader
              propertyId={createdId}
              media={captureMedia}
              onDeleteMedia={(id) =>
                setCaptureMedia((prev) => prev.filter((m) => m.id !== id))
              }
            />
          </div>
        </Card>

        {publishError ? (
          <p role="alert" className="text-sm font-medium text-red-700">
            {publishError}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            size="lg"
            disabled={isPublishing}
            onClick={() => handlePublish(createdId)}
          >
            {isPublishing ? "Publication…" : "Publier l'annonce"}
          </Button>
          <Link href="/sell/annonces">
            <Button type="button" variant="secondary" size="lg">
              Voir mes annonces
            </Button>
          </Link>
        </div>

        {captureOpen ? (
          <NestaCapture
            propertyId={createdId}
            onClose={() => setCaptureOpen(false)}
            onUploaded={handleCaptureUploaded}
          />
        ) : null}
      </div>
    );
  }

  const errors = state.errors;

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {isEdit && property ? (
        <input type="hidden" name="id" value={property.id} />
      ) : null}

      {!state.ok && state.message ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {state.message}
        </p>
      ) : null}
      {isEdit && state.ok && state.message ? (
        <p
          role="status"
          className="rounded-xl border border-forest/20 bg-forest/5 px-4 py-3 text-sm font-medium text-forest"
        >
          {state.message}
        </p>
      ) : null}

      {/* ---------- Adresse ---------- */}
      <Card className="p-6 sm:p-8">
        <h2 className="font-display text-xl text-charcoal">Adresse</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field
            label="Adresse"
            htmlFor="address"
            required
            error={fieldError(errors, "address")}
          >
            <Input
              id="address"
              name="address"
              placeholder="1234, rue Principale"
              defaultValue={property?.address ?? ""}
              required
            />
          </Field>
          <Field
            label="Ville"
            htmlFor="city"
            required
            error={fieldError(errors, "city")}
          >
            <Input
              id="city"
              name="city"
              placeholder="Montréal"
              defaultValue={property?.city ?? ""}
              required
            />
          </Field>
          <Field
            label="Code postal"
            htmlFor="postal_code"
            error={fieldError(errors, "postal_code")}
          >
            <Input
              id="postal_code"
              name="postal_code"
              placeholder="H2X 1Y4"
              defaultValue={property?.postal_code ?? ""}
            />
          </Field>
          <div className="grid grid-cols-2 gap-5">
            <Field
              label="Latitude"
              htmlFor="latitude"
              hint="Optionnel — affiche la carte"
              error={fieldError(errors, "latitude")}
            >
              <Input
                id="latitude"
                name="latitude"
                type="number"
                step="any"
                min="-90"
                max="90"
                placeholder="45,50"
                defaultValue={property?.latitude ?? ""}
              />
            </Field>
            <Field
              label="Longitude"
              htmlFor="longitude"
              error={fieldError(errors, "longitude")}
            >
              <Input
                id="longitude"
                name="longitude"
                type="number"
                step="any"
                min="-180"
                max="180"
                placeholder="-73,57"
                defaultValue={property?.longitude ?? ""}
              />
            </Field>
          </div>
        </div>
      </Card>

      {/* ---------- Détails ---------- */}
      <Card className="p-6 sm:p-8">
        <h2 className="font-display text-xl text-charcoal">Détails</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field
            label="Type d'annonce"
            htmlFor="listing_type"
            required
            error={fieldError(errors, "listing_type")}
          >
            <Select
              id="listing_type"
              name="listing_type"
              defaultValue={property?.listing_type ?? "sale"}
              required
            >
              <option value="sale">À vendre</option>
              <option value="rent">À louer</option>
            </Select>
          </Field>
          <Field
            label="Type de propriété"
            htmlFor="property_type"
            error={fieldError(errors, "property_type")}
          >
            <Select
              id="property_type"
              name="property_type"
              defaultValue={property?.property_type ?? ""}
            >
              {PROPERTY_TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field
            label="Chambres"
            htmlFor="bedrooms"
            error={fieldError(errors, "bedrooms")}
          >
            <Input
              id="bedrooms"
              name="bedrooms"
              type="number"
              step="1"
              min="0"
              placeholder="3"
              defaultValue={property?.bedrooms ?? ""}
            />
          </Field>
          <Field
            label="Salles de bain"
            htmlFor="bathrooms"
            error={fieldError(errors, "bathrooms")}
          >
            <Input
              id="bathrooms"
              name="bathrooms"
              type="number"
              step="0.5"
              min="0"
              placeholder="1,5"
              defaultValue={property?.bathrooms ?? ""}
            />
          </Field>
          <Field
            label="Superficie habitable (pi²)"
            htmlFor="living_area"
            error={fieldError(errors, "living_area")}
          >
            <Input
              id="living_area"
              name="living_area"
              type="number"
              step="any"
              min="0"
              placeholder="1200"
              defaultValue={property?.living_area ?? ""}
            />
          </Field>
          <Field
            label="Superficie du terrain (pi²)"
            htmlFor="lot_area"
            error={fieldError(errors, "lot_area")}
          >
            <Input
              id="lot_area"
              name="lot_area"
              type="number"
              step="any"
              min="0"
              placeholder="4000"
              defaultValue={property?.lot_area ?? ""}
            />
          </Field>
          <Field
            label="Année de construction"
            htmlFor="year_built"
            error={fieldError(errors, "year_built")}
          >
            <Input
              id="year_built"
              name="year_built"
              type="number"
              step="1"
              min="1500"
              placeholder="1985"
              defaultValue={property?.year_built ?? ""}
            />
          </Field>
        </div>
      </Card>

      {/* ---------- Prix ---------- */}
      <Card className="p-6 sm:p-8">
        <h2 className="font-display text-xl text-charcoal">Prix et taxes</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field
            label="Prix demandé ($)"
            htmlFor="asking_price"
            required
            error={fieldError(errors, "asking_price")}
          >
            <Input
              id="asking_price"
              name="asking_price"
              type="number"
              step="any"
              min="0"
              placeholder="549000"
              defaultValue={property?.asking_price ?? ""}
              required
            />
          </Field>
          <div className="hidden sm:block" aria-hidden="true" />
          <Field
            label="Taxes municipales ($/an)"
            htmlFor="municipal_tax"
            error={fieldError(errors, "municipal_tax")}
          >
            <Input
              id="municipal_tax"
              name="municipal_tax"
              type="number"
              step="any"
              min="0"
              placeholder="3200"
              defaultValue={property?.municipal_tax ?? ""}
            />
          </Field>
          <Field
            label="Taxes scolaires ($/an)"
            htmlFor="school_tax"
            error={fieldError(errors, "school_tax")}
          >
            <Input
              id="school_tax"
              name="school_tax"
              type="number"
              step="any"
              min="0"
              placeholder="450"
              defaultValue={property?.school_tax ?? ""}
            />
          </Field>
        </div>
      </Card>

      {/* ---------- Description ---------- */}
      <Card className="p-6 sm:p-8">
        <h2 className="font-display text-xl text-charcoal">Description</h2>
        <div className="mt-5 flex flex-col gap-5">
          <Field
            label="Description"
            htmlFor="description"
            hint="Présentez les points forts du bien (5000 caractères maximum)."
            error={fieldError(errors, "description")}
          >
            <Textarea
              id="description"
              name="description"
              rows={6}
              placeholder="Belle propriété lumineuse à deux pas du parc…"
              defaultValue={property?.description ?? ""}
            />
          </Field>
        </div>
      </Card>

      {/* ---------- Visite virtuelle ---------- */}
      <VirtualTourField
        defaultProvider={property?.virtual_tour_provider ?? null}
        defaultUrl={property?.virtual_tour_url ?? null}
        propertyId={property?.id}
        error={fieldError(errors, "virtual_tour_url")}
      />

      {/* ---------- Photos (édition) ---------- */}
      {isEdit && property ? (
        <Card className="p-6 sm:p-8">
          <h2 className="font-display text-xl text-charcoal">Photos</h2>
          <div className="mt-5">
            <PhotoUploader propertyId={property.id} media={editMedia} />
          </div>
        </Card>
      ) : null}

      {/* ---------- Publication ---------- */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {isEdit ? (
          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? "Enregistrement…" : "Enregistrer les modifications"}
          </Button>
        ) : (
          <>
            <Button
              type="submit"
              name="intent"
              value="published"
              size="lg"
              disabled={isPending}
            >
              {isPending ? "Publication…" : "Publier l'annonce"}
            </Button>
            <Button
              type="submit"
              name="intent"
              value="draft"
              variant="secondary"
              size="lg"
              disabled={isPending}
            >
              {isPending ? "Enregistrement…" : "Enregistrer en brouillon"}
            </Button>
          </>
        )}
        <Link
          href={isEdit ? "/sell/annonces" : "/sell"}
          className="text-sm font-medium text-charcoal/60 underline-offset-4 hover:text-forest hover:underline"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}
