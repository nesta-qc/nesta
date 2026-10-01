import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/env";
import { signOutAction } from "@/actions/auth";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MobileMenu } from "@/components/MobileMenu";
import { HeaderShell } from "@/components/HeaderShell";

/* Navigation principale — volontairement courte.
   Les fonctionnalités secondaires se découvrent dans leur contexte. */
function getNavLinks(t: (typeof dictionaries)["fr"]["nav"]) {
  return [
    { href: "/search", label: t.acheter },
    { href: "/sell", label: t.vendre },
    { href: "/investir", label: t.investir },
    { href: "/statistiques", label: t.statistiques },
    { href: "/projects", label: t.projets },
    { href: "/services", label: t.services },
    { href: "/tarifs", label: t.tarifs },
  ];
}

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
 * En-tête NESTA : sticky, se compacte au scroll.
 * Logo simplifié (tuile + NESTA, sans slogan illisible).
 * Desktop : un seul CTA primaire = Passeport (Connexion/Inscription en liens discrets).
 * Mobile : bouton Inscription compact toujours visible + menu hamburger.
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

  const t = dictionaries[await getLang()].nav;
  const navLinks = getNavLinks(t);

  return (
    <HeaderShell>
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2.5"
        aria-label={t.accueilAria}
      >
        <Image
          src="/logo-groupe-nesta.png"
          alt="Groupe Nesta"
          width={800}
          height={311}
          priority
          className="h-10 w-auto sm:h-11"
        />
      </Link>
      <nav
        className="hidden items-center gap-8 md:flex"
        aria-label={t.navPrincipaleAria}
      >
        <Link
          href="/passeport"
          className="rounded-full border border-forest/30 bg-white/50 px-4 py-1.5 text-[15px] font-semibold text-forest transition-colors duration-200 hover:border-forest hover:bg-white"
        >
          {t.passeport}
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
        <LanguageToggle />
        <Link
          href="/favoris"
          aria-label={t.favorisAria}
          className="hidden h-10 w-10 items-center justify-center rounded-full text-charcoal/70 transition-colors duration-200 hover:bg-white hover:text-forest md:flex"
        >
          <HeartIcon />
        </Link>
        {connected ? (
          <Link
            href="/profil"
            aria-label={t.profilAria}
            className="hidden h-10 w-10 items-center justify-center rounded-full text-charcoal/70 transition-colors duration-200 hover:bg-white hover:text-forest md:flex"
          >
            <UserIcon />
          </Link>
        ) : (
          <>
            <Link
              href="/connexion"
              className="hidden text-[15px] font-medium text-charcoal/70 transition-colors duration-200 hover:text-forest md:inline"
            >
              {t.connexion}
            </Link>
            {/* Desktop : lien discret — le CTA primaire est Passeport. */}
            <Link
              href="/inscription"
              className="hidden text-[15px] font-medium text-charcoal/70 transition-colors duration-200 hover:text-forest md:inline"
            >
              {t.inscription}
            </Link>
            {/* Mobile : bouton compact, toujours visible. */}
            <Link
              href="/inscription"
              className="inline-flex items-center rounded-full bg-forest px-4 py-2 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-forest-deep md:hidden"
            >
              {t.inscription}
            </Link>
          </>
        )}
        {/* Mobile : tout passe par le menu hamburger. */}
        <MobileMenu t={t} connected={connected} />
      </div>
    </HeaderShell>
  );
}

/** Déconnexion (formulaire discret, utilisé dans /profil). */
export async function SignOutButton() {
  const t = dictionaries[await getLang()].nav;
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="inline-flex items-center rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-charcoal transition-colors duration-200 hover:border-champagne"
      >
        {t.deconnexion}
      </button>
    </form>
  );
}
