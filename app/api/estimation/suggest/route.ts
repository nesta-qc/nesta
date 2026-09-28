import { NextResponse } from "next/server";
import { isVilleSlug, suggestAddresses } from "@/lib/estimation";

/* ============================================================
 * NESTA — API d'autocomplétion d'adresses pour l'estimation.
 *
 * GET /api/estimation/suggest?ville=montreal&q=2219+rue+duv
 *   → ["2219 R DUVERNAY", …] (max 8, clés normalisées du rôle)
 *
 * Source : index d'adresses du rôle d'évaluation foncière
 * (MAMH, Données Québec). Renvoie [] quand q est trop court.
 * ============================================================ */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const params = new URL(request.url).searchParams;
    const ville = params.get("ville") ?? "";
    const q = params.get("q") ?? "";
    if (!isVilleSlug(ville)) return NextResponse.json([]);
    return NextResponse.json(suggestAddresses(ville, q, 8));
  } catch (error) {
    console.error("GET /api/estimation/suggest :", error);
    return NextResponse.json([]);
  }
}
