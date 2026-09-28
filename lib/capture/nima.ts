/* ============================================================
 * NESTA Capture — composante esthétique du score photo.
 *
 * Le modèle utilisé est dérivé du projet « NIMA: Neural Image
 * Assessment » par titu1994 (https://github.com/titu1994/
 * neural-image-assessment), distribué sous licence MIT :
 *
 *   MIT License — Copyright (c) 2018 titu1994
 *
 * Converti en TensorFlow.js (inférence 100 % côté client, aucune
 * image envoyée au serveur). Le modèle n'est chargé qu'à la
 * première analyse, puis mis en cache en mémoire.
 *
 * Le score retourné (moyenne 1–10) n'est qu'UNE composante du
 * score NESTA ; il n'est jamais présenté tel quel à l'utilisateur.
 * ============================================================ */

const MODEL_URL = "/models/nima-mobilenet/model.json";
const INPUT_SIZE = 224;

let modelPromise: Promise<GraphModelLike> | null = null;

interface TensorLike {
  data: () => Promise<Float32Array>;
}

interface GraphModelLike {
  execute: (inputs: Record<string, unknown>) => TensorLike;
}

async function loadModel(): Promise<GraphModelLike> {
  if (!modelPromise) {
    modelPromise = (async () => {
      const tf = await import("@tensorflow/tfjs");
      const loaded = await tf.loadGraphModel(MODEL_URL);
      return loaded as unknown as GraphModelLike;
    })().catch((err) => {
      modelPromise = null;
      throw err;
    });
  }
  return modelPromise;
}

/**
 * Estime la qualité esthétique d'une image (moyenne 1–10).
 * Retourne null si le modèle est indisponible (panne gracieuse :
 * le score NESTA repose alors uniquement sur l'analyse technique).
 */
export async function estimateAestheticMean(
  source: HTMLImageElement | HTMLCanvasElement,
): Promise<number | null> {
  try {
    const tf = await import("@tensorflow/tfjs");
    const model = await loadModel();

    const pixels = tf.browser.fromPixels(source);
    const resized = tf.image.resizeBilinear(pixels, [INPUT_SIZE, INPUT_SIZE]);
    const normalized = resized.toFloat().div(127.5).sub(1).expandDims(0);
    pixels.dispose();
    resized.dispose();
    const output = model.execute({ keras_tensor: normalized }) as unknown as {
      data: () => Promise<Float32Array>;
      dispose: () => void;
    };
    normalized.dispose();

    const probs = await output.data();
    output.dispose();

    if (!probs || probs.length !== 10) return null;
    let mean = 0;
    for (let i = 0; i < 10; i++) mean += probs[i] * (i + 1);
    return Number.isFinite(mean) ? mean : null;
  } catch {
    return null;
  }
}

/** Précharge le modèle en arrière-plan (optionnel, non bloquant). */
export function preloadAestheticModel(): void {
  loadModel().catch(() => {
    /* Panne silencieuse : le scoring technique reste disponible. */
  });
}
