import { headers } from "next/headers";

/* ============================================================
 * NESTA — limitation de débit (rate limiting) par IP.
 *
 * Fenêtre glissante en mémoire : protège les routes API publiques
 * contre le pilonnage (bots, spammeurs, abus du moteur
 * d'estimation). Sur serverless (Vercel), le compteur est tenu
 * par instance : cela freine les abus simples, pas une attaque
 * distribuée — pour cela, il faudra Cloudflare ou équivalent.
 * ============================================================ */

const buckets = new Map<string, number[]>();

/* Évite toute fuite mémoire si le process vit longtemps. */
function evincerSiNecessaire(): void {
  if (buckets.size > 20000) {
    const cles = [...buckets.keys()];
    for (const k of cles.slice(0, 10000)) buckets.delete(k);
  }
}

/**
 * Indique si `key` (ex. IP) a dépassé `limit` requêtes sur les
 * `windowMs` dernières millisecondes (fenêtre glissante).
 */
export function estLimite(
  key: string,
  limit: number,
  windowMs: number,
): { limite: boolean; reessayerDansSec: number } {
  const maintenant = Date.now();
  const debutFenetre = maintenant - windowMs;
  let coups = buckets.get(key) ?? [];
  coups = coups.filter((t) => t > debutFenetre);

  if (coups.length >= limit) {
    const reessayerDansSec = Math.max(
      1,
      Math.ceil((coups[0] + windowMs - maintenant) / 1000),
    );
    buckets.set(key, coups);
    return { limite: true, reessayerDansSec };
  }

  coups.push(maintenant);
  buckets.set(key, coups);
  evincerSiNecessaire();
  return { limite: false, reessayerDansSec: 0 };
}

/** IP cliente réelle derrière Vercel / proxies. */
export function ipCliente(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "inconnue";
}

/**
 * IP cliente dans une Server Action (pas d'objet Request disponible).
 * À utiliser avec `next/headers` — ne fonctionne que côté serveur.
 */
export async function ipAction(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip")?.trim() || "inconnue";
}
