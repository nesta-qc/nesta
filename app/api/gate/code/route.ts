import { NextResponse, type NextRequest } from "next/server";
import {
  GATE_PREAUTH_COOKIE,
  isGateEnabled,
  makeToken,
  preauthTtlSec,
  verifyAccessCode,
} from "@/lib/site-gate";
import { estLimite, ipCliente } from "@/lib/rate-limit";

/* ============================================================
 * NESTA — sas d'accès, étape 1/2 : vérification du code d'accès.
 *
 * POST /api/gate/code  { code: string }
 * → 200 { ok: true } + cookie de pré-authentification (10 min)
 * → 401 si le code est faux.
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

  const ip = ipCliente(request);
  const quota = estLimite(`gate-code:${ip}`, 10, 10 * 60_000);
  if (quota.limite) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez plus tard." },
      {
        status: 429,
        headers: { "Retry-After": String(quota.reessayerDansSec) },
      },
    );
  }

  let code: unknown;
  try {
    code = (await request.json()).code;
  } catch {
    code = undefined;
  }

  if (typeof code !== "string" || !verifyAccessCode(code)) {
    return NextResponse.json({ error: "Code incorrect." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(GATE_PREAUTH_COOKIE, makeToken("pre"), {
    ...COOKIE_ATTRS,
    maxAge: preauthTtlSec(),
  });
  return res;
}
