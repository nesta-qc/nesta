"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui";
import { ROOMS, roomById } from "@/lib/capture/rooms";
import {
  analyzeTechnically,
  computeNestaScore,
  drawForAnalysis,
  type NestaScore,
  type TechnicalAnalysis,
} from "@/lib/capture/scoring";
import {
  estimateAestheticMean,
  preloadAestheticModel,
} from "@/lib/capture/nima";
import { captureFileName, compressForUpload } from "@/lib/capture/compress";
import { deletePropertyMedia, uploadPropertyMedia } from "@/actions/properties";
import { initialPropertyActionState } from "@/lib/action-state";
import { CameraStep, type CaptureResult } from "./CameraStep";
import { ReviewStep } from "./ReviewStep";
import { GalleryStep } from "./GalleryStep";

/* ============================================================
 * VEYLA Capture — parcours guidé de prise de photos immobilières.
 *
 * Étapes : pièces → caméra → révision (score) → galerie → ajout
 * à l'annonce via l'action uploadPropertyMedia existante
 * (même bucket Supabase, même validation, même table).
 * ============================================================ */

export interface KeptPhoto {
  localId: string;
  room: string;
  roomLabel: string;
  blob: Blob;
  url: string;
  width: number;
  height: number;
  score: NestaScore;
  analysis: TechnicalAnalysis;
}

export interface UploadedCapturePhoto {
  id: string;
  storagePath: string;
}

interface Props {
  propertyId: string;
  onClose: () => void;
  onUploaded: (photos: UploadedCapturePhoto[]) => void;
}

type Step = "rooms" | "camera" | "review" | "gallery";

interface PendingPhoto {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  tiltDeg: number | null;
  room: string;
  roomLabel: string;
  interiorRoom: boolean;
}

let localIdCounter = 0;

export function NestaCapture({ propertyId, onClose, onUploaded }: Props) {
  const [step, setStep] = useState<Step>("rooms");
  const [selectedRoom, setSelectedRoom] = useState("salon");
  const [kept, setKept] = useState<KeptPhoto[]>([]);
  const [pending, setPending] = useState<PendingPhoto | null>(null);
  const [analysis, setAnalysis] = useState<TechnicalAnalysis | null>(null);
  const [score, setScore] = useState<NestaScore | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(false);
  const [cameraKey, setCameraKey] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [orientationPermission, setOrientationPermission] = useState<
    "granted" | "denied" | "unsupported"
  >("unsupported");

  /* iOS 13+ exige que DeviceOrientationEvent.requestPermission() soit
     appelé depuis un geste utilisateur : on le fait au clic qui ouvre
     la caméra, jamais dans un useEffect. */
  function requestOrientationPermission(): void {
    try {
      const DOE = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      };
      if (typeof DOE.requestPermission !== "function") {
        setOrientationPermission("unsupported");
        return;
      }
      DOE.requestPermission()
        .then((res) =>
          setOrientationPermission(res === "granted" ? "granted" : "denied"),
        )
        .catch(() => setOrientationPermission("denied"));
    } catch {
      setOrientationPermission("denied");
    }
  }
  const keptRef = useRef<KeptPhoto[]>([]);
  useEffect(() => {
    keptRef.current = kept;
  }, [kept]);

  /* Précharge le modèle esthétique en arrière-plan, sans bloquer. */
  useEffect(() => {
    preloadAestheticModel();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* Libère les URL d'objets à la fermeture. */
  useEffect(() => {
    return () => {
      keptRef.current.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, []);

  const counts = kept.reduce<Record<string, number>>((acc, p) => {
    acc[p.room] = (acc[p.room] ?? 0) + 1;
    return acc;
  }, {});

  function handleClose() {
    if (
      kept.length > 0 &&
      !window.confirm(
        "Quitter VEYLA Capture ? Les photos conservées mais non ajoutées à l'annonce seront perdues.",
      )
    ) {
      return;
    }
    if (pending) URL.revokeObjectURL(pending.url);
    onClose();
  }

  /* --- Capture → analyse --- */
  const runAnalysis = useCallback(async (pendingPhoto: PendingPhoto) => {
    setAnalyzing(true);
    setAnalysisError(false);
    setAnalysis(null);
    setScore(null);
    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("image"));
        img.src = pendingPhoto.url;
      });
      const { canvas, ctx } = drawForAnalysis(
        img,
        img.naturalWidth,
        img.naturalHeight,
      );
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const tech = analyzeTechnically(imageData, {
        width: pendingPhoto.width || img.naturalWidth,
        height: pendingPhoto.height || img.naturalHeight,
        tiltDeg: pendingPhoto.tiltDeg,
        interiorRoom: pendingPhoto.interiorRoom,
      });
      /* L'esthétique ne bloque jamais : échec = score technique seul. */
      const aesthetic = await estimateAestheticMean(canvas).catch(() => null);
      setAnalysis(tech);
      setScore(computeNestaScore(tech.technicalScore, aesthetic));
    } catch {
      setAnalysisError(true);
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const handleCapture = useCallback(
    (result: CaptureResult) => {
      const room = roomById(selectedRoom);
      const url = URL.createObjectURL(result.blob);
      const pendingPhoto: PendingPhoto = {
        blob: result.blob,
        url,
        width: result.width,
        height: result.height,
        tiltDeg: result.tiltDeg,
        room: room.id,
        roomLabel: room.label,
        interiorRoom: room.interior,
      };
      setPending(pendingPhoto);
      setStep("review");
      void runAnalysis(pendingPhoto);
    },
    [selectedRoom, runAnalysis],
  );

  function handleKeep() {
    if (!pending || !analysis || !score) return;
    const photo: KeptPhoto = {
      localId: `capture-${++localIdCounter}-${Date.now()}`,
      room: pending.room,
      roomLabel: pending.roomLabel,
      blob: pending.blob,
      url: pending.url,
      width: pending.width,
      height: pending.height,
      score,
      analysis,
    };
    setKept((prev) => [...prev, photo]);
    setPending(null);
    setStep("gallery");
  }

  function handleRetake() {
    if (pending) URL.revokeObjectURL(pending.url);
    setPending(null);
    setStep("camera");
    setCameraKey((k) => k + 1);
  }

  function handleDelete(localId: string) {
    /* Si la photo avait déjà été téléversée lors d'un envoi partiel,
       on la supprime aussi côté serveur pour ne laisser aucun orphelin. */
    const uploaded = uploadedRef.current.get(localId);
    if (uploaded) {
      uploadedRef.current.delete(localId);
      void deletePropertyMedia(uploaded.id).catch(() => undefined);
    }
    setKept((prev) => {
      const target = prev.find((p) => p.localId === localId);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.localId !== localId);
    });
  }

  function handleMove(localId: string, direction: -1 | 1) {
    setKept((prev) => {
      const idx = prev.findIndex((p) => p.localId === localId);
      const next = idx + direction;
      if (idx < 0 || next < 0 || next >= prev.length) return prev;
      const copy = [...prev];
      [copy[idx], copy[next]] = [copy[next], copy[idx]];
      return copy;
    });
  }

  /* Photos déjà téléversées dans la session courante (clé = localId) :
     une reprise après échec ne ré-envoie jamais celles-ci (pas de doublons),
     même si l'ordre a changé entre-temps. */
  const uploadedRef = useRef(
    new Map<string, UploadedCapturePhoto>(),
  );

  /* --- Téléversement vers l'annonce (action existante) --- */
  async function handleUpload() {
    if (kept.length === 0 || uploading) return;
    setUploading(true);
    setUploadError(null);
    try {
      for (let i = 0; i < kept.length; i++) {
        const p = kept[i];
        if (uploadedRef.current.has(p.localId)) continue;
        setUploadProgress(
          `Téléversement ${uploadedRef.current.size + 1} sur ${kept.length}…`,
        );
        const compressed = await compressForUpload(p.blob);
        const file = new File([compressed], captureFileName(p.roomLabel), {
          type: "image/jpeg",
        });
        const formData = new FormData();
        formData.set("propertyId", propertyId);
        formData.set("photo", file);
        const result = await uploadPropertyMedia(
          initialPropertyActionState,
          formData,
        );
        if (!result.ok || !result.mediaId || !result.storagePath) {
          throw new Error(
            result.message ?? "Le téléversement a échoué. Réessayez.",
          );
        }
        uploadedRef.current.set(p.localId, {
          id: result.mediaId as string,
          storagePath: result.storagePath as string,
        });
        URL.revokeObjectURL(p.url);
      }
      const done = [...uploadedRef.current.values()];
      uploadedRef.current.clear();
      setKept([]);
      setUploadProgress(null);
      onUploaded(done);
      onClose();
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Le téléversement a échoué.",
      );
    } finally {
      setUploading(false);
    }
  }

  if (step === "camera") {
    const room = roomById(selectedRoom);
    return (
      <CameraStep
        key={cameraKey}
        roomLabel={room.label}
        interiorRoom={room.interior}
        orientationPermission={orientationPermission}
        onCapture={handleCapture}
        onBack={() => setStep("rooms")}
        onRetryCamera={() => setCameraKey((k) => k + 1)}
      />
    );
  }

  if (step === "review" && pending) {
    return (
      <ReviewStep
        imageUrl={pending.url}
        roomLabel={pending.roomLabel}
        score={score ?? { value: 0, verdict: "Analyse…", withAesthetic: false }}
        checks={analysis?.checks ?? []}
        analyzing={analyzing}
        analysisError={analysisError}
        onRetryAnalysis={() => void runAnalysis(pending)}
        onKeep={handleKeep}
        onRetake={handleRetake}
      />
    );
  }

  if (step === "gallery") {
    return (
      <GalleryStep
        photos={kept}
        uploading={uploading}
        uploadProgress={uploadProgress}
        uploadError={uploadError}
        onDelete={handleDelete}
        onMove={handleMove}
        onMore={() => setStep("rooms")}
        onUpload={handleUpload}
        onClose={handleClose}
      />
    );
  }

  /* --- Étape pièces : checklist --- */
  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-ivory">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Fermer"
          className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-charcoal/60 hover:bg-sand"
        >
          <span aria-hidden="true">×</span>
        </button>
        <p className="font-display text-lg text-charcoal">VEYLA Capture</p>
        <button
          type="button"
          onClick={() => setStep("gallery")}
          disabled={kept.length === 0}
          className="rounded-full px-3 py-2 text-sm font-medium text-forest disabled:opacity-40"
        >
          Photos ({kept.length})
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <h2 className="font-display text-2xl text-charcoal">
          Quelle pièce photographiez-vous ?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
          VEYLA vous guide pour des photos nettes, droites et bien éclairées.
          Choisissez une pièce, puis prenez la photo.
        </p>

        <ul className="mt-5 flex flex-col gap-2">
          {ROOMS.map((room) => {
            const done = counts[room.id] ?? 0;
            const complete = done >= room.quota;
            const selected = selectedRoom === room.id;
            return (
              <li key={room.id}>
                <button
                  type="button"
                  onClick={() => setSelectedRoom(room.id)}
                  aria-pressed={selected}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-colors ${
                    selected
                      ? "border-forest bg-forest/[0.06]"
                      : "border-border bg-white hover:border-border-strong"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        complete
                          ? "bg-forest text-white"
                          : "bg-sand text-charcoal/60"
                      }`}
                    >
                      {complete ? "✓" : done > 0 ? done : ""}
                    </span>
                    <span className="text-[15px] font-medium text-charcoal">
                      {room.label}
                    </span>
                  </span>
                  <span className="text-sm tabular-nums text-charcoal/50">
                    {Math.min(done, room.quota)}/{room.quota}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-border bg-ivory px-4 py-4">
        <Button
          type="button"
          size="lg"
          onClick={() => {
            requestOrientationPermission();
            setStep("camera");
          }}
          className="w-full"
        >
          Prendre la photo
        </Button>
      </div>
    </div>
  );
}
