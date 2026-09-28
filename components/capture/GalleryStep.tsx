"use client";

import { Button } from "@/components/ui";
import type { KeptPhoto } from "./NestaCapture";

/* ============================================================
 * NESTA Capture — galerie des photos conservées.
 * Ordre = ordre de téléversement (la 1re = photo principale).
 * ============================================================ */

interface Props {
  photos: KeptPhoto[];
  uploading: boolean;
  uploadProgress: string | null;
  uploadError: string | null;
  onDelete: (localId: string) => void;
  onMove: (localId: string, direction: -1 | 1) => void;
  onMore: () => void;
  onUpload: () => void;
  onClose: () => void;
}

export function GalleryStep({
  photos,
  uploading,
  uploadProgress,
  uploadError,
  onDelete,
  onMove,
  onMore,
  onUpload,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-ivory">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-charcoal/60 hover:bg-sand"
        >
          <span aria-hidden="true">×</span>
        </button>
        <p className="font-display text-lg text-charcoal">NESTA Capture</p>
        <div className="w-9" aria-hidden="true" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {photos.length === 0 ? (
          <p className="py-12 text-center text-sm text-charcoal/55">
            Aucune photo conservée pour le moment.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-3">
            {photos.map((p, index) => (
              <li
                key={p.localId}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.url}
                    alt={`Photo ${p.roomLabel}`}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                  {index === 0 ? (
                    <span className="absolute left-2 top-2 rounded-full bg-forest px-2.5 py-1 text-[11px] font-medium text-white">
                      Photo principale
                    </span>
                  ) : null}
                  <span className="absolute bottom-2 right-2 rounded-full bg-charcoal/70 px-2.5 py-1 text-[11px] font-medium text-white">
                    {p.score.value}/100
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <p className="truncate text-xs font-medium text-charcoal">
                    {p.roomLabel}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onMove(p.localId, -1)}
                      disabled={index === 0 || uploading}
                      aria-label="Déplacer vers la gauche"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal/70 hover:bg-sand disabled:opacity-30"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => onMove(p.localId, 1)}
                      disabled={index === photos.length - 1 || uploading}
                      aria-label="Déplacer vers la droite"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal/70 hover:bg-sand disabled:opacity-30"
                    >
                      →
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Supprimer cette photo ? Elle ne sera pas téléversée.",
                          )
                        ) {
                          onDelete(p.localId);
                        }
                      }}
                      disabled={uploading}
                      aria-label="Supprimer la photo"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal/70 hover:bg-sand disabled:opacity-30"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {uploadError ? (
          <p role="alert" className="mt-4 text-sm font-medium text-red-700">
            {uploadError}
          </p>
        ) : null}
        {uploadProgress ? (
          <p role="status" className="mt-4 text-center text-sm text-charcoal/60">
            {uploadProgress}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 border-t border-border bg-ivory px-4 py-4">
        <Button
          type="button"
          size="lg"
          disabled={photos.length === 0 || uploading}
          onClick={onUpload}
          className="w-full"
        >
          {uploading
            ? "Téléversement…"
            : `Ajouter ${photos.length} photo${photos.length > 1 ? "s" : ""} à l'annonce`}
        </Button>
        <Button
          type="button"
          variant="ghost"
          disabled={uploading}
          onClick={onMore}
          className="w-full"
        >
          Prendre d&apos;autres photos
        </Button>
      </div>
    </div>
  );
}
