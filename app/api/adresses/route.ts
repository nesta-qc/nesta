import { NextResponse } from "next/server";
import { searchPropertyProfiles } from "@/actions/property-profiles";

/* ============================================================
 * NESTA — API : autocomplétion d'adresses réelles.
 *
 * GET /api/adresses?q=…
 * → [{ id, address, borough }] (max 8, triés par adresse)
 *
 * Source : table property_profiles (données ouvertes — jamais des
 * annonces à vendre). Renvoie toujours un tableau : [] quand q est
 * absent / trop court / trop long, quand Supabase n'est pas
 * configuré ou quand la table n'existe pas encore. Jamais d'erreur
 * exploitable — le champ reste utilisable en saisie libre.
 * ============================================================ */

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const q = new URL(request.url).searchParams.get("q") ?? "";
    const suggestions = await searchPropertyProfiles(q, 8);
    return NextResponse.json(suggestions);
  } catch {
    return NextResponse.json([]);
  }
}
