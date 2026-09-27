import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/env";

/**
 * Rafraîchit la session Supabase avant le rendu de la route.
 * Appelée par le proxy racine (proxy.ts) à chaque navigation.
 *
 * IMPORTANT : ne placez aucune logique entre la création du client et
 * `getClaims()` — un rafraîchissement de jeton terminé après l'envoi de la
 * réponse ne pourrait plus écrire ses cookies et serait perdu.
 *
 * Retourne la réponse (avec les cookies de session mis à jour si besoin).
 */
export async function updateSession(
  request: NextRequest,
): Promise<NextResponse> {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
        /* En-têtes anti-cache exigés par @supabase/ssr lors d'une écriture
           de cookies d'authentification (évite de servir une session à un
           autre utilisateur via un CDN). */
        Object.entries(headers).forEach(([key, value]) =>
          supabaseResponse.headers.set(key, value),
        );
      },
    },
  });

  /* Déclenche le rafraîchissement de la session si le jeton est expiré. */
  await supabase.auth.getClaims();

  return supabaseResponse;
}
