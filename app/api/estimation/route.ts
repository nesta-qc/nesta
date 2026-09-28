import { NextResponse } from "next/server";
import { estimate, isVilleSlug, type CategorieBien } from "@/lib/estimation";

/* ============================================================
 * NESTA — API d'estimation indicative (moteur centralisé).
 *
 * POST /api/estimation
 *   Body JSON : { ville: "montreal" | "quebec" | "laval" | "gatineau"
 *                       | "longueuil" | "brossard" | "levis",
 *                 adresse: "2219 rue Duvernay",
 *                 suite?: "201",
 *                 typeBien?: "maison" | "condo" | "plex" | "multi"
 *                           | "terrain" | "commercial" }
 *   → EstimateResult (found: true) ou { found: false, reason }.
 *
 * Utilisée par la page /estimation et par tout parcours vendeur /
 * acheteur ayant besoin d'une évaluation indicative.
 * Valeurs INDICATIVES — jamais une évaluation agréée.
 * ============================================================ */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as {
      ville?: unknown;
      adresse?: unknown;
      suite?: unknown;
      typeBien?: unknown;
    } | null;

    const ville = body?.ville;
    const adresse = body?.adresse;
    const suite = body?.suite;
    const typeBien = body?.typeBien;

    if (typeof ville !== "string" || !isVilleSlug(ville)) {
      return NextResponse.json(
        { found: false, reason: "ville_invalide" },
        { status: 400 },
      );
    }
    if (typeof adresse !== "string" || !adresse.trim()) {
      return NextResponse.json(
        { found: false, reason: "adresse_invalide" },
        { status: 400 },
      );
    }
    const TYPES_BIEN: CategorieBien[] = [
      "terrain",
      "maison",
      "condo",
      "plex",
      "multi",
      "commercial",
    ];

    const result = estimate({
      ville,
      adresse,
      suite: typeof suite === "string" && suite.trim() ? suite : undefined,
      typeBien:
        typeof typeBien === "string" &&
        (TYPES_BIEN as string[]).includes(typeBien)
          ? (typeBien as CategorieBien)
          : undefined,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/estimation :", error);
    return NextResponse.json(
      { found: false, reason: "erreur_interne" },
      { status: 500 },
    );
  }
}
