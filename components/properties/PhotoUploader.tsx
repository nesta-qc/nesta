"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import {
  deletePropertyMedia,
  uploadPropertyMedia,
} from "@/actions/properties";
import { initialPropertyActionState } from "@/lib/action-state";
import { Button, Field, Input } from "@/components/ui";
import { propertyMediaPublicUrl } from "@/lib/media";
import type { PropertyMediaRow } from "@/lib/validation";

/* ============================================================
 * NESTA — téléversement et gestion des photos d'une annonce.
 *
 * Les photos ajoutées pendant la session sont suivies en local
 * (identifiant retourné par l'action) pour permettre leur
 * suppression immédiate, en plus des photos existantes.
 * ============================================================ */

interface AddedPhoto {
  id: string;
  storagePath: string;
}

interface Props {
  propertyId: string;
  media: PropertyMediaRow[];
}

export function PhotoUploader({ propertyId, media }: Props) {
  const [state, formAction, isPending] = useActionState(
    uploadPropertyMedia,
    initialPropertyActionState,
  );
  const [added, setAdded] = useState<AddedPhoto[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState(0);
  const [isDeleting, startDeleting] = useTransition();
  const lastHandledRef = useRef<string | null>(null);

  /* Ajoute la photo téléversée à la liste locale (une seule fois). */
  useEffect(() => {
    if (
      state.ok &&
      state.mediaId &&
      state.storagePath &&
      lastHandledRef.current !== state.mediaId
    ) {
      lastHandledRef.current = state.mediaId;
      setAdded((prev) => [
        ...prev,
        { id: state.mediaId as string, storagePath: state.storagePath as string },
      ]);
      setInputKey((k) => k + 1);
    }
  }, [state]);

  function handleDelete(mediaId: string, isLocal: boolean) {
    if (
      !window.confirm("Supprimer cette photo ? Cette action est définitive.")
    ) {
      return;
    }
    setDeleteError(null);
    setDeletingId(mediaId);
    startDeleting(async () => {
      const result = await deletePropertyMedia(mediaId);
      if (result.ok) {
        if (isLocal) {
          setAdded((prev) => prev.filter((p) => p.id !== mediaId));
        }
      } else {
        setDeleteError(result.message ?? "La suppression a échoué.");
      }
      setDeletingId(null);
    });
  }

  const existing = media.filter((m) => !added.some((a) => a.id === m.id));

  return (
    <div className="flex flex-col gap-5">
      <form action={formAction} encType="multipart/form-data">
        <input type="hidden" name="propertyId" value={propertyId} />
        <Field
          label="Ajouter une photo"
          htmlFor="photo"
          hint="Images uniquement, 10 Mo maximum par photo."
          error={!state.ok ? state.message : undefined}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              key={inputKey}
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              className="cursor-pointer"
            />
            <Button type="submit" variant="secondary" disabled={isPending}>
              {isPending ? "Téléversement…" : "Téléverser"}
            </Button>
          </div>
        </Field>
      </form>

      {state.ok && state.message ? (
        <p role="status" className="text-sm font-medium text-forest">
          {state.message}
        </p>
      ) : null}

      {deleteError ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {deleteError}
        </p>
      ) : null}

      {existing.length === 0 && added.length === 0 ? (
        <p className="text-sm text-charcoal/50">
          Aucune photo pour le moment. Les photos aident les acheteurs à se
          projeter : ajoutez-en plusieurs.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {existing.map((m) => (
            <PhotoItem
              key={m.id}
              url={propertyMediaPublicUrl(m.storage_path)}
              onDelete={() => handleDelete(m.id, false)}
              deleting={isDeleting && deletingId === m.id}
            />
          ))}
          {added.map((p) => (
            <PhotoItem
              key={p.id}
              url={propertyMediaPublicUrl(p.storagePath)}
              onDelete={() => handleDelete(p.id, true)}
              deleting={isDeleting && deletingId === p.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function PhotoItem({
  url,
  onDelete,
  deleting,
}: {
  url: string;
  onDelete: () => void;
  deleting: boolean;
}) {
  return (
    <li className="group relative overflow-hidden rounded-xl border border-border bg-cream">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt="Photo de la propriété"
        className="aspect-[4/3] w-full object-cover"
        loading="lazy"
      />
      <button
        type="button"
        onClick={onDelete}
        disabled={deleting}
        className="absolute right-2 top-2 rounded-full bg-charcoal/70 px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity hover:bg-charcoal focus:opacity-100 group-hover:opacity-100 disabled:opacity-50"
      >
        {deleting ? "…" : "Supprimer"}
      </button>
    </li>
  );
}
