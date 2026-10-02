import { getSupabaseUrl } from "@/lib/env";

/* ============================================================
 * VEYLA — URL publiques des médias (bucket `property-media`,
 * public en lecture selon les policies du bucket).
 * ============================================================ */

const BUCKET = "property-media";

/**
 * Construit l'URL publique d'un objet du bucket `property-media`
 * à partir de son `storage_path` (ex. « <uuid>/1712345678-photo.jpg »).
 * URL déterministe, aucune clé requise (bucket public en lecture).
 */
export function propertyMediaPublicUrl(storagePath: string): string {
  const base = getSupabaseUrl().replace(/\/$/, "");
  const clean = storagePath.replace(/^\//, "");
  return `${base}/storage/v1/object/public/${BUCKET}/${clean}`;
}
