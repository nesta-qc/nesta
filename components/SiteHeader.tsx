import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { signOutAction } from "@/actions/auth";

/* Navigation principale — volontairement courte.
   Les fonctionnalités secondaires se découvrent dans leur contexte. */
const navLinks = [
  { href: "/search", label: "Acheter" },
  { href: "/sell", label: "Vendre" },
  { href: "/investir", label: "Investir" },
  { href: "/projects", label: "Projets" },
  { href: "/services", label: "Services" },
  { href: "/tarifs", label: "Tarifs" },
];

/* Icônes sobres (SVG inline, aucun emoji). */
function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function UserIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/**
 * En-tête NESTA : sticky, très léger.
 * Desktop : NESTA | Passeport (mise en avant) Acheter Vendre Investir Projets Services — Favoris, Connexion/Profil.
 * Mobile : barre haute compacte + barre d'onglets basse (conçue pour mobile, pas compressée).
 */
export async function SiteHeader() {
  let connected = false;

  if (hasSupabaseConfig()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    connected = user !== null;
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-ivory/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center" aria-label="Nesta — accueil">
            <Image
              src="/nesta-wordmark-transparent.png"
              alt="Nesta"
              width={120}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Navigation principale"
          >
            <Link
              href="/passeport"
              className="rounded-full border border-forest/30 bg-white/50 px-4 py-1.5 text-[15px] font-semibold text-forest transition-colors duration-200 hover:border-forest hover:bg-white"
            >
              Passeport
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-charcoal/70 transition-colors duration-200 hover:text-forest"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/favoris"
              aria-label="Mes favoris"
              className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal/70 transition-colors duration-200 hover:bg-white hover:text-forest"
            >
              <HeartIcon />
            </Link>
            {connected ? (
              <Link
                href="/profil"
                aria-label="Mon profil"
                className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal/70 transition-colors duration-200 hover:bg-white hover:text-forest"
              >
                <UserIcon />
              </Link>
            ) : (
              <>
                <Link
                  href="/connexion"
                  className="hidden px-3 py-2 text-[15px] font-medium text-charcoal/70 transition-colors duration-200 hover:text-forest sm:inline"
                >
                  Connexion
                </Link>
                <Link
                  href="/inscription"
                  className="inline-flex items-center rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-forest-deep"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Barre d'onglets mobile : navigation native, pouce accessible. */}
      <nav
        aria-label="Navigation mobile"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur-md md:hidden"
      >
        <div className="grid grid-cols-6">
          {[
            { href: "/passeport", label: "Passeport" },
            { href: "/search", label: "Acheter" },
            { href: "/sell", label: "Vendre" },
            { href: "/investir", label: "Investir" },
            { href: "/favoris", label: "Favoris" },
            { href: connected ? "/profil" : "/connexion", label: "Profil" },
          ].map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="flex min-h-[60px] flex-col items-center justify-center gap-1 text-[11px] font-medium text-charcoal/60 transition-colors active:text-forest"
            >
              <span className="h-1 w-8 rounded-full bg-transparent" aria-hidden="true" />
              {link.label}
            </Link>
          ))}
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" aria-hidden="true" />
      </nav>
    </>
  );
}

/** Déconnexion (formulaire discret, utilisé dans /profil). */
export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="inline-flex items-center rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-charcoal transition-colors duration-200 hover:border-champagne"
      >
        Déconnexion
      </button>
    </form>
  );
}
