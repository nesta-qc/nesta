/* ============================================================
 * VEYLA Capture — analyse technique déterministe d'une photo.
 *
 * Fonctionne sur un ImageData (canvas) réduit à ~320 px de large :
 * aucune donnée ne quitte l'appareil pour cette analyse.
 *
 * Seuils calibrés sur des photos immobilières nettes vs floues/
 * sombres (variance du Laplacien, luminance moyenne, écrêtage).
 * ============================================================ */

export type CheckId =
  | "nettete"
  | "luminosite"
  | "exposition"
  | "resolution"
  | "inclinaison"
  | "cadrage";

export interface PhotoCheck {
  id: CheckId;
  ok: boolean;
  label: string;
  advice: string | null;
}

export interface CaptureMeta {
  width: number;
  height: number;
  /** Inclinaison mesurée à la capture (degrés), null si indisponible. */
  tiltDeg: number | null;
  /** La pièce est-elle intérieure (paysage recommandé) ? */
  interiorRoom: boolean;
}

export interface TechnicalAnalysis {
  checks: PhotoCheck[];
  /** Score technique /100 avant composante esthétique. */
  technicalScore: number;
  blurVariance: number;
  luminance: number;
}

const ANALYSIS_WIDTH = 320;

/* Seuils (calibrés sur échantillon net vs flou/sombre). */
const BLUR_THRESHOLD = 60;
const DARK_THRESHOLD = 85;
const BRIGHT_THRESHOLD = 215;
const HIGHLIGHT_CLIP_PCT = 3;
const SHADOW_CLIP_PCT = 8;
const TILT_THRESHOLD_DEG = 8;
const MIN_RESOLUTION_OK = 800;
const MIN_RESOLUTION_MIN = 400;

function luminanceOf(data: Uint8ClampedArray): {
  gray: Float64Array;
  w: number;
  h: number;
} {
  const pixels = data.length / 4;
  const w = ANALYSIS_WIDTH;
  const h = Math.max(1, Math.round(pixels / w));
  const gray = new Float64Array(pixels);
  for (let i = 0; i < pixels; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    gray[i] = 0.299 * r + 0.587 * g + 0.114 * b;
  }
  return { gray, w, h };
}

/** Variance du Laplacien : basse = image floue. */
function laplacianVariance(gray: Float64Array, w: number, h: number): number {
  let sum = 0;
  let sumSq = 0;
  let n = 0;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const lap =
        gray[i - w] + gray[i - 1] - 4 * gray[i] + gray[i + 1] + gray[i + w];
      sum += lap;
      sumSq += lap * lap;
      n++;
    }
  }
  if (n === 0) return 0;
  const mean = sum / n;
  return sumSq / n - mean * mean;
}

export function analyzeTechnically(
  imageData: ImageData,
  meta: CaptureMeta,
): TechnicalAnalysis {
  const { gray, w, h } = luminanceOf(imageData.data);
  const n = gray.length;

  let lumSum = 0;
  let clipHi = 0;
  let clipLo = 0;
  for (let i = 0; i < n; i++) {
    const v = gray[i];
    lumSum += v;
    if (v > 250) clipHi++;
    if (v < 5) clipLo++;
  }
  const luminance = lumSum / n;
  const clipHiPct = (clipHi / n) * 100;
  const clipLoPct = (clipLo / n) * 100;
  const blurVariance = laplacianVariance(gray, w, h);

  const checks: PhotoCheck[] = [];
  let score = 100;

  /* --- Netteté --- */
  if (blurVariance < BLUR_THRESHOLD) {
    checks.push({
      id: "nettete",
      ok: false,
      label: "Image floue",
      advice: "Photo floue. Stabilisez le téléphone et reprenez-la.",
    });
    score -= 30;
  } else {
    checks.push({ id: "nettete", ok: true, label: "Image nette", advice: null });
  }

  /* --- Luminosité --- */
  if (luminance < DARK_THRESHOLD) {
    checks.push({
      id: "luminosite",
      ok: false,
      label: "Image trop sombre",
      advice:
        "Photo légèrement sombre. Ouvrez les stores ou allumez les lumières.",
    });
    score -= 18;
  } else if (luminance > BRIGHT_THRESHOLD) {
    checks.push({
      id: "luminosite",
      ok: false,
      label: "Image trop claire",
      advice:
        "Photo trop claire. Évitez de photographier face à une fenêtre en plein soleil.",
    });
    score -= 15;
  } else {
    checks.push({
      id: "luminosite",
      ok: true,
      label: "Bonne luminosité",
      advice: null,
    });
  }

  /* --- Exposition (zones brûlées / bouchées) --- */
  if (clipHiPct > HIGHLIGHT_CLIP_PCT) {
    checks.push({
      id: "exposition",
      ok: false,
      label: "Zones surexposées",
      advice:
        "Certaines zones sont trop blanches. Touchez la fenêtre la plus lumineuse pour ajuster l'exposition.",
    });
    score -= 8;
  } else if (clipLoPct > SHADOW_CLIP_PCT) {
    checks.push({
      id: "exposition",
      ok: false,
      label: "Zones trop sombres",
      advice:
        "Certaines zones sont complètement noires. Ajoutez de la lumière dans la pièce.",
    });
    score -= 6;
  } else {
    checks.push({
      id: "exposition",
      ok: true,
      label: "Exposition équilibrée",
      advice: null,
    });
  }

  /* --- Résolution --- */
  const minDim = Math.min(meta.width, meta.height);
  if (minDim < MIN_RESOLUTION_MIN) {
    checks.push({
      id: "resolution",
      ok: false,
      label: "Résolution insuffisante",
      advice:
        "La photo est trop petite pour une annonce. Vérifiez les réglages de votre caméra.",
    });
    score -= 18;
  } else if (minDim < MIN_RESOLUTION_OK) {
    checks.push({
      id: "resolution",
      ok: false,
      label: "Résolution faible",
      advice:
        "La résolution est un peu faible. Rapprochez-vous ou utilisez l'appareil photo arrière.",
    });
    score -= 8;
  } else {
    checks.push({
      id: "resolution",
      ok: true,
      label: "Bonne résolution",
      advice: null,
    });
  }

  /* --- Inclinaison (capteur du téléphone à la capture) --- */
  if (meta.tiltDeg !== null && Math.abs(meta.tiltDeg) > TILT_THRESHOLD_DEG) {
    checks.push({
      id: "inclinaison",
      ok: false,
      label: "Téléphone incliné",
      advice: "Le téléphone était incliné. Essayez de le garder droit.",
    });
    score -= 10;
  } else {
    checks.push({
      id: "inclinaison",
      ok: true,
      label: "Téléphone droit",
      advice: null,
    });
  }

  /* --- Cadrage (orientation vs pièce) --- */
  const isPortrait = meta.height > meta.width;
  if (isPortrait && meta.interiorRoom) {
    checks.push({
      id: "cadrage",
      ok: false,
      label: "Cadrage améliorable",
      advice:
        "Une photo en paysage montre mieux la pièce. Tournez votre téléphone à l'horizontale.",
    });
    score -= 5;
  } else {
    checks.push({
      id: "cadrage",
      ok: true,
      label: "Bon cadrage",
      advice: null,
    });
  }

  return {
    checks,
    technicalScore: Math.max(0, Math.min(100, Math.round(score))),
    blurVariance: Math.round(blurVariance * 10) / 10,
    luminance: Math.round(luminance * 10) / 10,
  };
}

/* ---------- Score VEYLA /100 ---------- */

export interface NestaScore {
  value: number;
  verdict: string;
  /** true si la composante esthétique a été incluse. */
  withAesthetic: boolean;
}

/**
 * Combine le score technique (poids 65) et, quand il est disponible,
 * le score esthétique 1–10 normalisé (poids 35).
 */
export function computeNestaScore(
  technicalScore: number,
  aestheticMean: number | null,
): NestaScore {
  let value: number;
  let withAesthetic = false;
  if (aestheticMean !== null && Number.isFinite(aestheticMean)) {
    const clamped = Math.max(1, Math.min(10, aestheticMean));
    const aesthetic100 = ((clamped - 1) / 9) * 100;
    value = Math.round(0.65 * technicalScore + 0.35 * aesthetic100);
    withAesthetic = true;
  } else {
    value = technicalScore;
  }
  value = Math.max(0, Math.min(100, value));

  let verdict: string;
  if (value >= 85) verdict = "Excellente photo";
  else if (value >= 70) verdict = "Bonne photo";
  else if (value >= 50) verdict = "Photo à améliorer";
  else verdict = "À reprendre";

  return { value, verdict, withAesthetic };
}

/** Réduit une image vers une largeur cible pour l'analyse rapide. */
export function drawForAnalysis(
  source: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
  sourceWidth: number,
  sourceHeight: number,
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement("canvas");
  const scale = ANALYSIS_WIDTH / sourceWidth;
  canvas.width = ANALYSIS_WIDTH;
  canvas.height = Math.max(1, Math.round(sourceHeight * scale));
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 2D indisponible.");
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  return { canvas, ctx };
}
