/* ============================================================
 * NESTA — sas d'accès au site (« site en ligne, personne ne
 * rentre sans code »).
 *
 * Fonctionnement (simple, pour 2 personnes) :
 *   1. Le visiteur saisit le CODE D'ACCÈS du site
 *      (POST /api/gate/code) → cookie de session httpOnly
 *      signé (HMAC-SHA256), valable 30 jours.
 *   2. proxy.ts vérifie le cookie de session avant tout rendu ;
 *      sans cookie valide → redirection vers /acces.
 *
 * Le sas est ACTIF uniquement si les deux variables
 * d'environnement sont définies (opt-in par environnement) :
 *   SITE_GATE_CODE            — code d'accès partagé
 *   SITE_GATE_SESSION_SECRET  — secret de signature des cookies
 * ============================================================ */

import { createHmac, timingSafeEqual } from "node:crypto";

export const GATE_COOKIE = "nesta_gate";

/* Durée de vie : session 30 jours. */
const SESSION_TTL_SEC = 30 * 24 * 3600;

/** Le sas est actif uniquement si tout est configuré. */
export function isGateEnabled(): boolean {
  return (
    Boolean(process.env.SITE_GATE_CODE) &&
    Boolean(process.env.SITE_GATE_SESSION_SECRET)
  );
}

function getCode(): string {
  return process.env.SITE_GATE_CODE ?? "";
}

function getSessionSecret(): string {
  return process.env.SITE_GATE_SESSION_SECRET ?? "";
}

/* ---------- Comparaison en temps constant ---------- */

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/** Vérifie le code d'accès partagé (temps constant). */
export function verifyAccessCode(code: string): boolean {
  const expected = getCode();
  if (!expected || !code) return false;
  return safeEqual(code.trim(), expected);
}

/* ---------- Jeton de session signé (HMAC) ---------- */

function sign(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

/** Fabrique un jeton de session `v1.session.<exp>.<signature>` signé. */
export function makeToken(): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SEC;
  const payload = `v1.session.${exp}`;
  return `${payload}.${sign(payload)}`;
}

/** Vérifie un jeton de session signé et sa date d'expiration. */
export function verifyToken(token: string | undefined): boolean {
  if (!token || !getSessionSecret()) return false;
  const parts = token.split(".");
  if (
    parts.length !== 4 ||
    parts[0] !== "v1" ||
    parts[1] !== "session"
  ) {
    return false;
  }
  const exp = Number(parts[2]);
  if (!Number.isFinite(exp) || exp * 1000 < Date.now()) return false;
  const payload = `${parts[0]}.${parts[1]}.${parts[2]}`;
  return safeEqual(parts[3], sign(payload));
}

/** Durée de vie (secondes) du cookie de session — pour maxAge. */
export function sessionTtlSec(): number {
  return SESSION_TTL_SEC;
}
