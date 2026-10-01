/* ============================================================
 * NESTA — sas d'accès au site (« site en ligne, personne ne
 * rentre sans code ») + double vérification TOTP.
 *
 * Fonctionnement :
 *   1. Le visiteur saisit le CODE D'ACCÈS du site
 *      (POST /api/gate/code) → cookie pré-authentification
 *      httpOnly de 10 minutes.
 *   2. Il saisit le code à 6 chiffres de son application
 *      d'authentification (Google Authenticator, 1Password…)
 *      (POST /api/gate/totp) → cookie de session httpOnly
 *      signé (HMAC-SHA256), valable 30 jours.
 *   3. proxy.ts vérifie le cookie de session avant tout rendu ;
 *      sans cookie valide → redirection vers /acces.
 *
 * Le sas est ACTIF uniquement si les trois variables
 * d'environnement sont définies (opt-in par environnement) :
 *   SITE_GATE_CODE            — code d'accès partagé
 *   SITE_GATE_TOTP_SECRET     — secret TOTP (base32)
 *   SITE_GATE_SESSION_SECRET  — secret de signature des cookies
 *
 * Le TOTP est implémenté en pur TypeScript (RFC 6238, SHA-1,
 * pas de 30 s, fenêtre ±1) : aucune dépendance, fonctionne
 * aussi dans le proxy (runtime Node.js).
 * ============================================================ */

import { createHmac, timingSafeEqual } from "node:crypto";

export const GATE_COOKIE = "nesta_gate";
export const GATE_PREAUTH_COOKIE = "nesta_gate_pre";

/* Durées de vie : pré-auth 10 min, session 30 jours. */
const PREAUTH_TTL_SEC = 10 * 60;
const SESSION_TTL_SEC = 30 * 24 * 3600;

/** Le sas est actif uniquement si tout est configuré. */
export function isGateEnabled(): boolean {
  return (
    Boolean(process.env.SITE_GATE_CODE) &&
    Boolean(process.env.SITE_GATE_TOTP_SECRET) &&
    Boolean(process.env.SITE_GATE_SESSION_SECRET)
  );
}

function getCode(): string {
  return process.env.SITE_GATE_CODE ?? "";
}

function getTotpSecret(): string {
  return process.env.SITE_GATE_TOTP_SECRET ?? "";
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

/* ---------- TOTP (RFC 6238) ---------- */

const BASE32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Decode(input: string): Buffer {
  const clean = input.replace(/[\s=]/g, "").toUpperCase();
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];
  for (const char of clean) {
    const index = BASE32.indexOf(char);
    if (index < 0) throw new Error("Secret TOTP invalide (base32).");
    value = (value << 5) | index;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((value >>> bits) & 0xff);
    }
  }
  return Buffer.from(bytes);
}

function hotp(secret: Buffer, counter: bigint): string {
  const msg = Buffer.alloc(8);
  msg.writeBigUInt64BE(counter);
  const hmac = createHmac("sha1", secret).update(msg).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const code =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);
  return String(code % 1_000_000).padStart(6, "0");
}

/**
 * Vérifie un code TOTP à 6 chiffres. Fenêtre ±1 pas de 30 s
 * (tolère une horloge légèrement décalée).
 */
export function verifyTotp(code: string): boolean {
  const secret = getTotpSecret();
  if (!secret || !/^\d{6}$/.test(code)) return false;
  let key: Buffer;
  try {
    key = base32Decode(secret);
  } catch {
    return false;
  }
  if (key.length === 0) return false;
  const step = Math.floor(Date.now() / 1000 / 30);
  for (const delta of [-1, 0, 1]) {
    const counter = step + delta;
    /* Garde-fou : un compteur négatif ferait planter l'encodage. */
    if (counter < 0) continue;
    if (safeEqual(hotp(key, BigInt(counter)), code)) return true;
  }
  return false;
}

/* ---------- Jetons de session signés (HMAC) ---------- */

function sign(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

/** Fabrique un jeton `v1.<exp>.<signature>` signé. */
export function makeToken(kind: "pre" | "session"): string {
  const exp =
    Math.floor(Date.now() / 1000) +
    (kind === "pre" ? PREAUTH_TTL_SEC : SESSION_TTL_SEC);
  const payload = `v1.${kind}.${exp}`;
  return `${payload}.${sign(payload)}`;
}

/** Vérifie un jeton signé et sa date d'expiration. */
export function verifyToken(
  token: string | undefined,
  kind: "pre" | "session",
): boolean {
  if (!token || !getSessionSecret()) return false;
  const parts = token.split(".");
  if (parts.length !== 4 || parts[0] !== "v1" || parts[1] !== kind) {
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

/** Durée de vie (secondes) du cookie de pré-authentification. */
export function preauthTtlSec(): number {
  return PREAUTH_TTL_SEC;
}
