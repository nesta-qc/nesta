"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackVirtualTourEvent } from "@/lib/virtual-tours";
import type { VirtualTourDbProvider } from "@/lib/virtual-tours";

/* ============================================================
 * NESTA — <VirtualTour /> : lecteur de visite virtuelle.
 *
 * Point d'entrée unique : reçoit le provider + l'identifiant/URL
 * validés CÔTÉ SERVEUR et choisit le lecteur adapté.
 *
 *   <VirtualTour />
 *    ├── <MatterportTour />       (lecteur Matterport intégré)
 *    └── <ExternalVirtualTour />  (tiers autorisé ou lien sortant)
 *
 * Sécurité : l'URL de l'iframe est reconstruite à partir de
 * l'identifiant validé — jamais de HTML fourni par l'utilisateur,
 * jamais de dangerouslySetInnerHTML.
 *
 * Pour ajouter un fournisseur : créer son composant ici et le
 * brancher dans le sélecteur ci-dessous.
 * ============================================================ */

export interface VirtualTourProps {
  provider: VirtualTourDbProvider;
  /** Identifiant extrait (Matterport), sinon null. */
  tourId: string | null;
  /** URL canonique validée côté serveur. */
  url: string;
  /** URL sûre pour l'iframe (null = lien sortant uniquement). */
  embedUrl: string | null;
  /** Identifiant de l'annonce (analytics). */
  propertyId: string;
  /** Libellé du bien, pour l'accessibilité. */
  title: string;
  /**
   * Suivi analytics activé (défaut : true). Mettre à false pour les
   * aperçus dans le formulaire vendeur (pas de fausses statistiques).
   */
  track?: boolean;
}

export function VirtualTour(props: VirtualTourProps) {
  if (props.provider === "matterport" && props.tourId && props.embedUrl) {
    return <MatterportTour {...props} />;
  }
  return <ExternalVirtualTour {...props} />;
}

/* ---------- Habillage commun : lazy-load + plein écran ---------- */

function useFullscreen() {
  const ref = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () =>
      setIsFullscreen(document.fullscreenElement === ref.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggle = useCallback(async () => {
    try {
      if (document.fullscreenElement === ref.current) {
        await document.exitFullscreen();
      } else if (ref.current) {
        await ref.current.requestFullscreen();
        return true;
      }
    } catch {
      /* Plein écran indisponible : on reste en mode intégré. */
    }
    return false;
  }, []);

  return { ref, isFullscreen, toggle };
}

function PlayOverlay({
  onPlay,
  title,
}: {
  onPlay: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Lancer la visite 3D interactive — ${title}`}
      className="group absolute inset-0 flex w-full flex-col items-center justify-center gap-4 bg-charcoal text-cream transition-colors hover:bg-charcoal/95"
    >
      <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-forest transition-transform group-hover:scale-105">
        <span
          aria-hidden="true"
          className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-cream"
        />
      </span>
      <span className="text-center">
        <span className="block font-display text-xl">Visite 3D interactive</span>
        <span className="mt-1 block text-sm text-cream/60">
          Cliquez pour charger la visite
        </span>
      </span>
    </button>
  );
}

function FullscreenButton({
  isFullscreen,
  onToggle,
}: {
  isFullscreen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
      aria-pressed={isFullscreen}
      className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 text-cream backdrop-blur-sm transition-colors hover:bg-forest"
    >
      {isFullscreen ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

/* ---------- Matterport ---------- */

function MatterportTour({
  tourId,
  propertyId,
  title,
  track = true,
}: VirtualTourProps) {
  const [loaded, setLoaded] = useState(false);
  const { ref, isFullscreen, toggle } = useFullscreen();
  /* L'URL est reconstruite à partir de l'identifiant validé. */
  const src = `https://my.matterport.com/show/?m=${encodeURIComponent(tourId ?? "")}`;

  const emit = (eventType: "opened" | "fullscreen") => {
    if (track) trackVirtualTourEvent(propertyId, eventType);
  };

  const handlePlay = () => {
    setLoaded(true);
    emit("opened");
  };

  const handleFullscreen = async () => {
    const entered = await toggle();
    if (entered) emit("fullscreen");
  };

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden rounded-2xl border border-border bg-charcoal ${
        isFullscreen ? "" : "aspect-[16/9]"
      }`}
    >
      {!loaded ? (
        <PlayOverlay onPlay={handlePlay} title={title} />
      ) : (
        <>
          <iframe
            title={`Visite 3D interactive — ${title}`}
            src={src}
            className="absolute inset-0 h-full w-full border-0"
            allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope; magnetometer"
            allowFullScreen
            loading="lazy"
          />
          <FullscreenButton isFullscreen={isFullscreen} onToggle={handleFullscreen} />
        </>
      )}
    </div>
  );
}

/* ---------- Fournisseur externe ---------- */

function ExternalVirtualTour({
  url,
  embedUrl,
  propertyId,
  title,
  track = true,
}: VirtualTourProps) {
  const [loaded, setLoaded] = useState(false);
  const { ref, isFullscreen, toggle } = useFullscreen();

  /* Hôte non listé : simple lien sortant, jamais d'iframe. */
  if (!embedUrl) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-white px-8 py-14 text-center">
        <span className="font-display text-xl text-charcoal">
          Visite 3D interactive
        </span>
        <p className="max-w-md text-sm text-charcoal/60">
          Cette visite est hébergée par un fournisseur externe. Elle
          s'ouvrira dans un nouvel onglet.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (track) trackVirtualTourEvent(propertyId, "opened");
          }}
          className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-forest/90"
        >
          Ouvrir la visite virtuelle
        </a>
      </div>
    );
  }

  const emit = (eventType: "opened" | "fullscreen") => {
    if (track) trackVirtualTourEvent(propertyId, eventType);
  };

  const handlePlay = () => {
    setLoaded(true);
    emit("opened");
  };

  const handleFullscreen = async () => {
    const entered = await toggle();
    if (entered) emit("fullscreen");
  };

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden rounded-2xl border border-border bg-charcoal ${
        isFullscreen ? "" : "aspect-[16/9]"
      }`}
    >
      {!loaded ? (
        <PlayOverlay onPlay={handlePlay} title={title} />
      ) : (
        <>
          <iframe
            title={`Visite 3D interactive — ${title}`}
            src={embedUrl}
            className="absolute inset-0 h-full w-full border-0"
            /* Bac à sable strict : pas de navigation, pas de popups. */
            sandbox="allow-scripts allow-same-origin"
            allow="fullscreen"
            allowFullScreen
            loading="lazy"
          />
          <FullscreenButton isFullscreen={isFullscreen} onToggle={handleFullscreen} />
        </>
      )}
    </div>
  );
}
