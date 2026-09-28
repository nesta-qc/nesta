import { NextResponse } from "next/server";
import {
  estimate,
  isVilleSlug,
  suggererAutresVilles,
  type CategorieBien,
  type PorteePlex,
} from "@/lib/estimation";

/* ============================================================
 * NESTA — API d'estimation indicative (moteur centralisé).
 *
 * POST /api/estimation
 *   Body JSON : { ville: "montreal" | "quebec" | "laval" | "gatineau"
 *                       | "longueuil" | "brossard" | "levis",
 *                 adresse: "2219 rue Duvernay",
 *                 suite?: "201",
 *                 typeBien?: "maison" | "condo" | "plex" | "multi"
 *                           | "terrain" | "commercial",
 *                 porteePlex?: "immeuble" | "logement",
 *                 projectionAnnees?: 3 }
 *   → EstimateResult (found: true) ou { found: false, reason }.
 *     reason peut être "adresse_ambigue" avec options[] quand
 *     l'orientation (E/O/N/S) doit être précisée, ou
 *     "adresse_introuvable" avec villesSuggerees[] quand l'adresse
 *     existe dans une autre ville couverte (mauvaise ville
 *     sélectionnée).
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
      porteePlex?: unknown;
      projectionAnnees?: unknown;
    } | null;

    const ville = body?.ville;
    const adresse = body?.adresse;
    const suite = body?.suite;
    const typeBien = body?.typeBien;
    const porteePlex = body?.porteePlex;
    const projectionAnnees = body?.projectionAnnees;

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

    const PORTEES_PLEX: PorteePlex[] = ["immeuble", "logement"];
    const horizon =
      typeof projectionAnnees === "number" &&
      Number.isFinite(projectionAnnees)
        ? Math.round(projectionAnnees)
        : 0;

    const result = estimate({
      ville,
      adresse,
      suite: typeof suite === "string" && suite.trim() ? suite : undefined,
      typeBien:
        typeof typeBien === "string" &&
        (TYPES_BIEN as string[]).includes(typeBien)
          ? (typeBien as CategorieBien)
          : undefined,
      porteePlex:
        typeof porteePlex === "string" &&
        (PORTEES_PLEX as string[]).includes(porteePlex)
          ? (porteePlex as PorteePlex)
          : undefined,
      projectionAnnees: horizon >= 1 && horizon <= 10 ? horizon : undefined,
    });
    if (!result.found && result.reason === "adresse_introuvable") {
      // L'adresse existe peut-être dans une autre ville couverte
      // (ex. adresse de Laval cherchée avec « Montréal » sélectionné).
      const villesSuggerees = suggererAutresVilles({
        ville,
        adresse,
        suite: typeof suite === "string" && suite.trim() ? suite : undefined,
      });
      if (villesSuggerees.length > 0) {
        return NextResponse.json({ ...result, villesSuggerees });
      }
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/estimation :", error);
    return NextResponse.json(
      { found: false, reason: "erreur_interne" },
      { status: 500 },
    );
  }
}
