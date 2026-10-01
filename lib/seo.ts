import type { Metadata } from "next";
import { headers } from "next/headers";
import { isLang, type Lang } from "./i18n/dictionaries";
import { DEFAULT_LANG } from "./i18n/constants";

/**
 * Constantes SEO partagées : URL canonique du site public.
 * Utilisée pour metadataBase, les canonicals et le JSON-LD.
 * (Ne pas confondre avec l'app admin, déployée séparément via SITE_MODE.)
 */
export const SITE_URL = "https://nesta-drab.vercel.app";

/** Image de partage par défaut : 1200×630 aux couleurs de la marque. */
export const DEFAULT_OG_IMAGE = "/og-nesta.png";

interface PageSeoOptions {
  title: string;
  description: string;
  /** Chemin relatif de la page, ex. "/tarifs". */
  path: string;
  /** true pour les pages privées/formulaires/confirmations : pas d'indexation. */
  noIndex?: boolean;
  /** true pour forcer le titre tel quel, sans le template "%s | Nesta" (ex. accueil). */
  absoluteTitle?: boolean;
}

/**
 * Métadonnées complètes d'une page : titre, description, canonical,
 * Open Graph et Twitter cards. Le layout racine fournit metadataBase,
 * le template de titre, les valeurs OG par défaut et la balise de
 * vérification Google ; ce helper complète par page.
 *
 * Async : lit la langue de la requête (en-tête `x-nesta-lang` posé par
 * le middleware sur les URL /en/*) pour émettre un canonical
 * auto-référencé par langue + les hreflang fr-CA/en-CA. Sans ça, la
 * version anglaise (même URL, langue par cookie) reste invisible
 * pour Google.
 */
export async function pageMetadata({
  title,
  description,
  path,
  noIndex,
  absoluteTitle,
}: PageSeoOptions): Promise<Metadata> {
  let lang: Lang = DEFAULT_LANG;
  try {
    const h = (await headers()).get("x-nesta-lang");
    if (isLang(h)) lang = h;
  } catch {
    /* hors contexte de requête : français par défaut */
  }
  const enPath = path === "/" ? "/en" : `/en${path}`;
  const frUrl = `${SITE_URL}${path}`;
  const enUrl = `${SITE_URL}${enPath}`;
  const canonical = lang === "en" ? enUrl : frUrl;
  const images = [
    {
      url: DEFAULT_OG_IMAGE,
      width: 1200,
      height: 630,
      alt: `Nesta — ${title}`,
    },
  ];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: {
        "fr-CA": frUrl,
        "en-CA": enUrl,
        "x-default": frUrl,
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "en" ? "en_CA" : "fr_CA",
      alternateLocale: lang === "en" ? ["fr_CA"] : ["en_CA"],
      siteName: "Nesta",
      title,
      description,
      url: canonical,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    ...(noIndex ? { robots: { index: false, follow: true } as const } : {}),
  };
}
