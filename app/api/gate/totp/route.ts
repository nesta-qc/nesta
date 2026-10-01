import { NextResponse, type NextRequest } from "next/server";
import {
  GATE_COOKIE,
  GATE_PREAUTH_COOKIE,
  isGateEnabled,
  makeToken,
  sessionTtlSec,
  verifyToken,
  verifyTotp,
} from "@/lib/site-gate";
import { estLimite, ipCliente } from "@/lib/rate-limit";

/* ============================================================
 * NESTA — sas d'accès, étape 2/2 : double vérification TOTP.
 *
 * POST /api/gate/totp  { totp: string }  (6 chiffres)
 * Exige le cookie de pré-authentification (étape 1 réussie).
 * → 200 { ok: true } + cookie de session signé (30 jours).
 *
 * Limite : 10 tentatives / 10 min / IP (anti force brute).
 * ============================================================ */

export const dynamic = "force-dynamic";

const COOKIE_ATTRS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
};

export async function POST(request: NextRequest) {
  if (!isGateEnabled()) {
    return NextResponse.json({ error: "Sas inactif." }, { status: 404 });
  }

  const pre = request.cookies.get(GATE_PREAUTH_COOKIE)?.value;
  if (!verifyToken(pre, "pre")) {
    return NextResponse.json(
      { error: "Étape 1 requise : saisissez d'abord le code d'accès." },
      { status: 403 },
    );
  }

  const ip = ipCliente(request);
  const quota = estLimite(`gate-totp:${ip}`, 10, 10 * 60_000);
  if (quota.limite) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez plus tard." },
      {
        status: 429,
        headers: { "Retry-After": String(quota.reessayerDansSec) },
      },
    );
  }

  let totp: unknown;
  try {
    totp = (await request.json()).totp;
  } catch {
    totp = undefined;
  }

  if (typeof totp !== "string" || !verifyTotp(totp)) {
    return NextResponse.json(
      { error: "Code de vérification incorrect." },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(GATE_COOKIE, makeToken("session"), {
    ...COOKIE_ATTRS,
    maxAge: sessionTtlSec(),
  });
  /* La pré-authentification a servi : on la révoque. */
  res.cookies.set(GATE_PREAUTH_COOKIE, "", { ...COOKIE_ATTRS, maxAge: 0 });
  return res;
}
