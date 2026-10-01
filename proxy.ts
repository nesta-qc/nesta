import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { updateSession } from "@/lib/supabase/middleware";
import { getSupabaseAnonKey, getSupabaseUrl, hasSupabaseConfig } from "@/lib/env";
import { LANG_COOKIE } from "@/lib/i18n/constants";
import { GATE_COOKIE, isGateEnabled, verifyToken } from "@/lib/site-gate";

/*
 * Proxy racine (Next.js 16 : la convention `middleware.ts` est dépréciée
 * au profit de `proxy.ts` — voir la documentation fournie dans
 * node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md).
 *
 * Variable d'environnement SITE_MODE (même code, deux sites) :
 *   - "admin"  : site dédié au centre de contrôle. Seul /admin/* est
 *                servi (contrôle du rôle ADMIN avant tout rendu) ;
 *                /admin/login est la page de connexion du dashboard ;
 *                / redirige vers /admin ; tout le reste → 404.
 *   - "public" : site client. /admin/* n'existe pas (404) — le
 *                dashboard n'est accessible que via le site dédié.
 *   - non défini (dev local) : comportement historique — /admin
 *                protégé par le rôle, les non-admins vont vers "/".
 *
 * Défense en profondeur (3 barrières indépendantes) :
 *   a) ce proxy (blocage pré-rendu) ;
 *   b) requireAdmin() dans le layout du groupe (guarded) (vérification serveur) ;
 *   c) assertAdmin() dans chaque Server Action + policies RLS is_admin().
 */

interface AdminAccess {
  hasSession: boolean;
  isAdmin: boolean;
}

/**
 * Vérifie la session et le rôle ADMIN de l'appelant.
 * Lecture seule : le rafraîchissement des cookies reste géré
 * par updateSession(). La policy RLS "user_roles : lecture
 * (soi + admin)" autorise chacun à lire ses propres rôles,
 * donc aucune clé service n'est nécessaire ici.
 */
async function getAdminAccess(request: NextRequest): Promise<AdminAccess> {
  const supabase = createServerClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {
          /* Lecture seule dans ce contrôle : pas d'écriture ici. */
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { hasSession: false, isAdmin: false };

  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "ADMIN")
    .maybeSingle();

  return { hasSession: true, isAdmin: data !== null };
}

function redirectTo(request: NextRequest, pathname: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  return NextResponse.redirect(url);
}

/* ============================================================
 * Consultation réservée aux administrateurs (décision produit).
 * Après le sas d'accès, la navigation exige une session Supabase
 * avec le rôle ADMIN : sans compte connecté → /connexion (avec
 * retour ?next=… après login) ; compte sans rôle ADMIN → 403.
 *
 * Restent accessibles sans compte :
 *   - le sas d'accès lui-même (/acces),
 *   - le parcours d'authentification (/connexion, /inscription,
 *     /mot-de-passe-oublie, /reinitialiser-mot-de-passe, /auth/*),
 *   - /onboarding (gère déjà lui-même le cas « pas de session »).
 * Les routes /api/* gardent leurs propres contrôles (sas + vérifs
 * par route) et ne sont pas concernées par cette redirection.
 * ============================================================ */

const CHEMINS_SANS_COMPTE = [
  "/acces",
  "/connexion",
  "/inscription",
  "/mot-de-passe-oublie",
  "/reinitialiser-mot-de-passe",
  "/onboarding",
];

function cheminSansCompte(sansLangue: string): boolean {
  if (CHEMINS_SANS_COMPTE.includes(sansLangue)) return true;
  return (
    sansLangue.startsWith("/acces/") ||
    sansLangue.startsWith("/auth/") ||
    sansLangue.startsWith("/onboarding/")
  );
}

interface ResultatCompte {
  /** Réponse à servir. */
  reponse: NextResponse;
  /** false → servir telle quelle (redirection ou 403) ;
      true → réponse « next » avec session rafraîchie, poursuivre. */
  poursuivre: boolean;
}

/**
 * Réserve la consultation du site client aux administrateurs.
 * Retourne :
 *   - `null` pour les routes /api/* (contrôles existants conservés),
 *   - `{ reponse: redirect(/connexion), poursuivre: false }` sans session,
 *   - `{ reponse: 403, poursuivre: false }` si le compte n'est pas ADMIN,
 *   - `{ reponse: next(), poursuivre: true }` sinon (session rafraîchie).
 */
async function appliquerCompteRequis(
  request: NextRequest,
): Promise<ResultatCompte | null> {
  const { pathname } = request.nextUrl;
  const sansLangue =
    pathname === "/en" || pathname.startsWith("/en/")
      ? pathname.slice(3) || "/"
      : pathname;

  /* Les API gardent leurs propres contrôles. */
  if (sansLangue.startsWith("/api/")) return null;
  /* Parcours d'authentification + sas : accessibles sans compte. */
  if (cheminSansCompte(sansLangue)) return null;
  /* Sans configuration Supabase, impossible de vérifier : on laisse passer
     (la page de connexion affiche alors son état dégradé). */
  if (!hasSupabaseConfig()) return null;

  /* Rafraîchit la session (met aussi à jour les cookies de la requête). */
  const sessionRes = await updateSession(request);

  /* Seuls les comptes avec le rôle ADMIN peuvent consulter le site. */
  const access = await getAdminAccess(request).catch(
    (): AdminAccess => ({ hasSession: false, isAdmin: false }),
  );

  if (!access.hasSession) {
    /* Pas de compte → page de connexion, avec retour après login. */
    const url = request.nextUrl.clone();
    url.pathname = "/connexion";
    url.search = "";
    if (pathname !== "/") {
      url.searchParams.set("next", pathname + request.nextUrl.search);
    }
    const res = NextResponse.redirect(url);
    sessionRes.cookies.getAll().forEach((c) => {
      res.cookies.set(c.name, c.value, c);
    });
    return { reponse: res, poursuivre: false };
  }

  if (!access.isAdmin) {
    /* Compte connecté sans rôle ADMIN → accès refusé. */
    const res = new NextResponse("Accès refusé.", { status: 403 });
    sessionRes.cookies.getAll().forEach((c) => {
      res.cookies.set(c.name, c.value, c);
    });
    return { reponse: res, poursuivre: false };
  }

  return { reponse: sessionRes, poursuivre: true };
}

/**
 * Sas d'accès : retourne une réponse (redirection ou 403) quand le
 * visiteur n'a pas de session valide, `null` pour laisser passer.
 */
function appliquerSasAcces(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;
  /* /en/* → on raisonne sur le chemin sans préfixe de langue. */
  const sansLangue =
    pathname === "/en" || pathname.startsWith("/en/")
      ? pathname.slice(3) || "/"
      : pathname;

  /* Toujours accessibles sans session : le sas lui-même, ses API,
   * et les webhooks Stripe (appels serveur-à-serveur signés). */
  if (
    sansLangue === "/acces" ||
    sansLangue.startsWith("/acces/") ||
    sansLangue.startsWith("/api/gate/") ||
    sansLangue.startsWith("/api/stripe/webhook") ||
    sansLangue.startsWith("/api/webhook")
  ) {
    return null;
  }

  const session = request.cookies.get(GATE_COOKIE)?.value;
  if (verifyToken(session)) return null;

  /* API : 403 JSON plutôt qu'une redirection HTML. */
  if (sansLangue.startsWith("/api/")) {
    return NextResponse.json({ error: "Accès restreint." }, { status: 403 });
  }

  /* Pages : redirection vers le sas, avec retour après validation. */
  const url = request.nextUrl.clone();
  url.pathname = "/acces";
  url.search = "";
  if (pathname !== "/") {
    url.searchParams.set("next", pathname + request.nextUrl.search);
  }
  return NextResponse.redirect(url);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* ============ Sas d'accès au site (code d'accès partagé) ============
   * Actif uniquement quand les variables SITE_GATE_* sont définies
   * (opt-in par environnement). Le site d'administration garde sa
   * propre connexion et n'est pas concerné.
   * Sans cookie de session valide → /acces (pages) ou 403 (API).
   * Toujours publics : /acces, /api/gate/*, les webhooks Stripe et
   * les fichiers statiques/sitemap (exclus par le matcher). */
  if (isGateEnabled() && process.env.SITE_MODE !== "admin") {
    const gateRes = appliquerSasAcces(request);
    if (gateRes) return gateRes;
  }

  const siteMode = process.env.SITE_MODE;

  /* ============ Version anglaise découvrable (/en/*) ============
   * Sans préfixe d'URL, l'anglais n'existait que via cookie — invisible
   * pour Google. /en/* est réécrit vers la page correspondante, avec
   * l'en-tête `x-nesta-lang: en` qui force l'anglais pour la requête
   * (prioritaire dans getLang(), lu par pageMetadata() pour les
   * hreflang fr-CA/en-CA + canonical auto-référencé par langue).
   * Le rafraîchissement de session Supabase est préservé : on le fait
   * d'abord, puis on recopie ses cookies/en-têtes sur la réécriture.
   * Inactif sur le site d'administration (français uniquement). */
  const isEnglishPath = pathname === "/en" || pathname.startsWith("/en/");
  const englishRest = pathname === "/en" ? "/" : pathname.slice("/en".length);
  const englishIsAdminPath =
    englishRest === "/admin" || englishRest.startsWith("/admin/");
  if (siteMode !== "admin" && isEnglishPath && !englishIsAdminPath) {
    request.headers.set("x-nesta-lang", "en");
    const controle = await appliquerCompteRequis(request);
    /* Redirection /connexion ou 403 (réservé aux admins) : servir tel quel. */
    if (controle && !controle.poursuivre) return controle.reponse;
    const sessionRes = controle ? controle.reponse : await updateSession(request);
    const url = request.nextUrl.clone();
    url.pathname = englishRest;
    const res = NextResponse.rewrite(url, {
      request: { headers: request.headers },
    });
    sessionRes.headers.forEach((value, key) => {
      res.headers.set(key, value);
    });
    sessionRes.cookies.getAll().forEach((c) => {
      res.cookies.set(c.name, c.value, c);
    });
    if (request.cookies.get(LANG_COOKIE)?.value !== "en") {
      res.cookies.set(LANG_COOKIE, "en", {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
    }
    return res;
  }

  const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminLogin =
    pathname === "/admin/login" || pathname.startsWith("/admin/login/");

  /* ============ Site dédié au centre de contrôle ============ */
  if (siteMode === "admin") {
    /* Page de connexion du dashboard : pas de contrôle de rôle. */
    if (isAdminLogin) {
      return updateSession(request);
    }
    if (isAdminPath) {
      const access = await getAdminAccess(request).catch(
        (): AdminAccess => ({ hasSession: false, isAdmin: false }),
      );
      if (!access.isAdmin) {
        /* Pas de session → page de connexion ; session sans rôle → 403
           (pas de redirection vers "/" pour éviter une boucle). */
        if (!access.hasSession) {
          return redirectTo(request, "/admin/login");
        }
        return new NextResponse("Accès refusé.", { status: 403 });
      }
      return updateSession(request);
    }
    if (pathname === "/") {
      return redirectTo(request, "/admin");
    }
    /* Tout le reste n'existe pas sur le site d'administration. */
    return new NextResponse("Not Found.", { status: 404 });
  }

  /* ============ Site client : /admin n'existe pas ============ */
  if (siteMode === "public") {
    if (isAdminPath) {
      return new NextResponse("Not Found.", { status: 404 });
    }
    /* Consultation réservée aux admins (redirection /connexion ou 403). */
    const controle = await appliquerCompteRequis(request);
    return controle ? controle.reponse : updateSession(request);
  }

  /* ============ Dev local : comportement historique ============ */
  if (isAdminPath && !isAdminLogin) {
    const access = await getAdminAccess(request).catch(
      (): AdminAccess => ({ hasSession: false, isAdmin: false }),
    );
    if (!access.isAdmin) {
      return redirectTo(request, "/");
    }
  }

  /* Consultation réservée aux admins, comme en production. */
  const controle = await appliquerCompteRequis(request);
  return controle ? controle.reponse : updateSession(request);
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
