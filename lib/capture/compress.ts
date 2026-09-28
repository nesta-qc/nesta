/* ============================================================
 * NESTA Capture — compression avant téléversement.
 * Réduit au max 1920 px sur le grand côté, JPEG qualité 0.85 :
 * invisible à l'œil nu sur une annonce, ~5× plus léger.
 * ============================================================ */

const MAX_DIMENSION = 1920;
const JPEG_QUALITY = 0.85;

export async function compressForUpload(blob: Blob): Promise<Blob> {
  const bitmap = await createImageBitmap(blob);
  const { width, height } = bitmap;

  const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height));
  if (scale >= 1 && blob.type === "image/jpeg") {
    bitmap.close();
    return blob;
  }

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return blob;
  }
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const out = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
  );
  return out ?? blob;
}

/** Nom de fichier explicite pour le stockage. */
export function captureFileName(roomLabel: string): string {
  const slug = roomLabel
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `capture-${slug}-${Date.now()}.jpg`;
}
