import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/*
 * Proxy racine (Next.js 16 : la convention `middleware.ts` est dépréciée
 * au profit de `proxy.ts` — voir la documentation fournie dans
 * node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md).
 *
 * Rafraîchit la session Supabase avant chaque rendu de page.
 * La logique de session vit dans lib/supabase/middleware.ts (updateSession).
 */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Toutes les routes sauf :
     * - _next/static et _next/image (fichiers internes Next.js)
     * - favicon.ico et les fichiers statiques de public/ (images, robots.txt…)
     * Note : le proxy s'exécute quand même sur les routes de données
     * (_next/data) — comportement intentionnel de Next.js pour la sécurité.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt)$).*)",
  ],
};
