"use client";

import { useState } from "react";
import { Modal } from "@/components/ui";

/* ============================================================
 * NESTA — galerie éditoriale : mosaïque desktop, bandeau mobile,
 * visionneuse plein écran. Aucune donnée fictive : si aucune
 * photo, un emplacement sobre l'indique.
 * ============================================================ */

interface Props {
  photos: { url: string }[];
  address: string;
}

export function PropertyGallery({ photos, address }: Props) {
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (photos.length === 0) {
    return (
      <div className="flex aspect-[16/9] w-full items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-border bg-white">
        <p className="px-8 text-center text-sm text-charcoal/50">
          Aucune photo pour le moment.
        </p>
      </div>
    );
  }

  const current = photos[Math.min(selected, photos.length - 1)];

  return (
    <>
      {/* Desktop : mosaïque éditoriale. */}
      <div className="hidden gap-3 md:grid md:grid-cols-[2fr_1fr]">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="group relative block overflow-hidden rounded-[var(--radius-lg)] bg-sand"
          aria-label="Agrandir la photo principale"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.url}
            alt={`Photo de ${address}`}
            className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </button>
        <div className="grid grid-rows-2 gap-3">
          {photos.slice(1, 3).map((p, i) => (
            <button
              key={p.url}
              type="button"
              onClick={() => {
                setSelected(i + 1);
                setLightbox(true);
              }}
              className="group relative block overflow-hidden rounded-[var(--radius-lg)] bg-sand"
              aria-label={`Agrandir la photo ${i + 2}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.url}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </button>
          ))}
          {photos.length === 2 ? (
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="flex items-center justify-center rounded-[var(--radius-lg)] border border-border bg-white text-sm font-medium text-forest transition-colors hover:border-champagne"
            >
              Voir les {photos.length} photos
            </button>
          ) : null}
        </div>
      </div>

      {/* Mobile : bandeau défilant. */}
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto md:hidden" role="list" aria-label="Photos">
        {photos.map((p, i) => (
          <button
            key={p.url}
            type="button"
            role="listitem"
            onClick={() => {
              setSelected(i);
              setLightbox(true);
            }}
            className="relative w-[85%] shrink-0 snap-center overflow-hidden rounded-[var(--radius-lg)] bg-sand"
            aria-label={`Agrandir la photo ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.url}
              alt={i === 0 ? `Photo de ${address}` : ""}
              loading={i === 0 ? "eager" : "lazy"}
              className="aspect-[4/3] w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Miniatures (desktop). */}
      {photos.length > 1 ? (
        <div className="mt-3 hidden items-center gap-3 md:flex">
          <div className="flex gap-2 overflow-x-auto">
            {photos.map((p, i) => (
              <button
                key={p.url}
                type="button"
                onClick={() => setSelected(i)}
                aria-label={`Voir la photo ${i + 1}`}
                aria-pressed={i === selected}
                className={`h-16 w-24 shrink-0 overflow-hidden rounded-[var(--radius-sm)] border-2 transition-all duration-200 ${
                  i === selected ? "border-forest" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <span className="text-xs text-charcoal/50">
            {selected + 1} / {photos.length}
          </span>
        </div>
      ) : null}

      {/* Visionneuse. */}
      <Modal open={lightbox} onClose={() => setLightbox(false)} title={`Photos — ${address}`} wide>
        <div className="flex flex-col gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[Math.min(selected, photos.length - 1)].url}
            alt={`Photo ${selected + 1} de ${address}`}
            className="max-h-[60vh] w-full rounded-[var(--radius-md)] bg-ivory object-contain"
          />
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setSelected((s) => (s - 1 + photos.length) % photos.length)}
              className="rounded-full border border-border bg-white px-5 py-2 text-sm font-medium text-charcoal transition-colors hover:border-champagne"
            >
              ← Précédente
            </button>
            <span className="text-sm text-charcoal/55">
              {selected + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={() => setSelected((s) => (s + 1) % photos.length)}
              className="rounded-full border border-border bg-white px-5 py-2 text-sm font-medium text-charcoal transition-colors hover:border-champagne"
            >
              Suivante →
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
