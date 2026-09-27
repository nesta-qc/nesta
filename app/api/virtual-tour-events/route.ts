import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { propertyIdSchema } from "@/lib/validation";

/* ============================================================
 * NESTA — API : événements de visite 3D (analytics).
 *
 * POST /api/virtual-tour-events
 * Body : { propertyId: string, eventType: "opened" | "fullscreen" }
 *
 * Insertion ouverte (visiteurs anonymes inclus) encadrée par RLS :
 * la propriété doit exister, aucune donnée personnelle stockée.
 * Best-effort : ne renvoie jamais d'erreur exploitable.
 * ============================================================ */

export async function POST(req: Request) {
  try {
    if (!hasSupabaseConfig()) {
      return NextResponse.json({ ok: false }, { status: 503 });
    }

    const body: unknown = await req.json().catch(() => null);
    const payload =
      body !== null && typeof body === "object"
        ? (body as Record<string, unknown>)
        : {};

    const idParsed = propertyIdSchema.safeParse(payload.propertyId);
    const eventType =
      payload.eventType === "opened" || payload.eventType === "fullscreen"
        ? payload.eventType
        : null;

    if (!idParsed.success || !eventType) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const supabase = await createClient();
    await supabase.from("virtual_tour_events").insert({
      property_id: idParsed.data,
      event_type: eventType,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
