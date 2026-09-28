"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui";

/* ============================================================
 * NESTA Capture — viseur caméra plein écran.
 *
 * - Caméra arrière via getUserMedia (jamais de flux vers serveur)
 * - Grille des tiers, indicateur de niveau, rappel paysage
 * - Le flux est coupé dès que le composant est démonté
 * ============================================================ */

export interface CaptureResult {
  blob: Blob;
  width: number;
  height: number;
  tiltDeg: number | null;
}

interface Props {
  roomLabel: string;
  interiorRoom: boolean;
  /** Résultat de la demande de permission iOS, faite au clic précédent. */
  orientationPermission: "granted" | "denied" | "unsupported";
  onCapture: (result: CaptureResult) => void;
  onBack: () => void;
  onRetryCamera: () => void;
}

type CameraError = "permission" | "unavailable" | "incompatible" | null;

function computeTiltDeg(e: DeviceOrientationEvent): number | null {
  if (e.beta == null || e.gamma == null) return null;
  const angle =
    typeof window !== "undefined" && window.screen?.orientation
      ? window.screen.orientation.angle
      : 0;
  if (Math.abs(angle) === 90) {
    const ref = e.beta >= 0 ? 90 : -90;
    return e.beta - ref;
  }
  return e.gamma;
}

export function CameraStep({ roomLabel, interiorRoom, orientationPermission, onCapture, onBack, onRetryCamera }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const tiltRef = useRef<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<CameraError>(null);
  const [ready, setReady] = useState(false);
  const [tilt, setTilt] = useState<number | null>(null);
  const [isPortrait, setIsPortrait] = useState(true);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  /* Démarrage caméra + niveau. */
  useEffect(() => {
    let cancelled = false;

    async function start() {
      if (
        typeof navigator === "undefined" ||
        !navigator.mediaDevices?.getUserMedia
      ) {
        setError("incompatible");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          await video.play().catch(() => {});
          setReady(true);
        }
      } catch (err) {
        if (cancelled) return;
        const name = err instanceof Error ? err.name : "";
        if (name === "NotAllowedError" || name === "SecurityError") {
          setError("permission");
        } else {
          setError("unavailable");
        }
      }
    }

    const onResize = () =>
      setIsPortrait(window.innerHeight >= window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener("change", onResize);
    }

    start();
    return () => {
      cancelled = true;
      stopStream();
      window.removeEventListener("resize", onResize);
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener("change", onResize);
      }
    };
  }, [stopStream]);

  /* Niveau à bulle : la permission iOS a été demandée au clic qui a ouvert
     la caméra (geste utilisateur requis par Safari). On écoute les
     événements dès que c'est autorisé ; « denied » = niveau désactivé,
     l'analyse d'inclinaison est alors ignorée. */
  useEffect(() => {
    if (orientationPermission === "denied") return;
    const onOrientation = (e: DeviceOrientationEvent) => {
      const t = computeTiltDeg(e);
      tiltRef.current = t;
      setTilt(t);
    };
    window.addEventListener("deviceorientation", onOrientation);
    return () => window.removeEventListener("deviceorientation", onOrientation);
  }, [orientationPermission]);

  function handleCapture() {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        onCapture({
          blob,
          width: canvas.width,
          height: canvas.height,
          tiltDeg: tiltRef.current,
        });
      },
      "image/jpeg",
      0.92,
    );
  }

  /* Repli : sélection manuelle d'un fichier (galerie / caméra native). */
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    createImageBitmap(file)
      .then((bmp) => {
        onCapture({
          blob: file,
          width: bmp.width,
          height: bmp.height,
          tiltDeg: null,
        });
        bmp.close();
      })
      .catch(() => {
        onCapture({ blob: file, width: 0, height: 0, tiltDeg: null });
      });
  }

  const showLandscapeHint = ready && isPortrait && interiorRoom;
  const levelOk = tilt === null || Math.abs(tilt) <= 8;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-charcoal text-white">
      {/* Barre haute */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-white/20"
        >
          Retour
        </button>
        <p className="text-sm font-medium text-white/90">{roomLabel}</p>
        <div className="w-[76px]" aria-hidden="true" />
      </div>

      {/* Viseur */}
      <div className="relative flex-1 overflow-hidden bg-black">
        {error === null ? (
          <>
            <video
              ref={videoRef}
              playsInline
              muted
              autoPlay
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Grille des tiers */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute left-1/3 top-0 h-full w-px bg-white/30" />
              <div className="absolute left-2/3 top-0 h-full w-px bg-white/30" />
              <div className="absolute left-0 top-1/3 h-px w-full bg-white/30" />
              <div className="absolute left-0 top-2/3 h-px w-full bg-white/30" />
            </div>
            {/* Rappel paysage */}
            {showLandscapeHint ? (
              <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-charcoal/70 px-4 py-2 text-xs font-medium text-white backdrop-blur">
                Tournez votre téléphone en paysage
              </div>
            ) : null}
            {/* Niveau */}
            {tilt !== null ? (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur ${
                    levelOk ? "bg-forest/80" : "bg-champagne/90 text-charcoal"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-2 w-2 rounded-full bg-current"
                  />
                  {levelOk ? "Téléphone droit" : "Redressez le téléphone"}
                </div>
              </div>
            ) : null}
            {!ready ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-white/70">Ouverture de la caméra…</p>
              </div>
            ) : null}
          </>
        ) : (
          <CameraErrorPanel
            error={error}
            onRetry={() => {
              setError(null);
              setReady(false);
              onRetryCamera();
            }}
            onPickFile={() => fileRef.current?.click()}
          />
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Barre basse */}
      <div className="flex items-center justify-center gap-6 px-6 py-6">
        {error === null ? (
          <button
            type="button"
            onClick={handleCapture}
            disabled={!ready}
            aria-label="Prendre la photo"
            className="h-[72px] w-[72px] rounded-full border-4 border-white bg-white/20 transition-transform active:scale-95 disabled:opacity-40"
          >
            <span className="mx-auto block h-12 w-12 rounded-full bg-white" />
          </button>
        ) : (
          <Button
            type="button"
            variant="secondary"
            onClick={() => fileRef.current?.click()}
          >
            Choisir une photo
          </Button>
        )}
      </div>
    </div>
  );
}

function CameraErrorPanel({
  error,
  onRetry,
  onPickFile,
}: {
  error: Exclude<CameraError, null>;
  onRetry: () => void;
  onPickFile: () => void;
}) {
  const messages = {
    permission: {
      title: "Caméra non autorisée",
      text: "Autorisez l'accès à la caméra dans les réglages de votre navigateur pour prendre des photos, ou choisissez une photo existante.",
    },
    unavailable: {
      title: "Caméra indisponible",
      text: "Impossible d'accéder à la caméra pour le moment. Vous pouvez choisir une photo existante.",
    },
    incompatible: {
      title: "Navigateur incompatible",
      text: "Votre navigateur ne permet pas l'accès à la caméra. Choisissez une photo existante.",
    },
  }[error];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
      <h3 className="font-display text-xl">{messages.title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-white/70">
        {messages.text}
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onPickFile}
          className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-charcoal"
        >
          Choisir une photo
        </button>
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-medium text-white"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
