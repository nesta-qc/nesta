import type { Metadata } from "next";

/**
 * Constantes SEO partagées : URL canonique du site public.
 * Utilisée pour metadataBase, les canonicals et le JSON-LD.
 * (Ne pas confondre avec l'app admin, déployée séparément via SITE_MODE.)
 */
export const SITE_URL = "https://nesta-drab.vercel.app";

/** Image de partage par défaut : le logo existant (1254×1254). Une og-image 1200×630 dédiée est recommandée. */
export const DEFAULT_OG_IMAGE = "/nesta-icon.png";

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
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex,
  absoluteTitle,
}: PageSeoOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const images = [
    {
      url: DEFAULT_OG_IMAGE,
      width: 1254,
      height: 1254,
      alt: `Nesta — ${title}`,
    },
  ];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "fr_CA",
      siteName: "Nesta",
      title,
      description,
      url,
      images,
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    ...(noIndex ? { robots: { index: false, follow: true } as const } : {}),
  };
}
