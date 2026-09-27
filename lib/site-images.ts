/**
 * Collection photographique curatée de NESTA.
 *
 * Principe : aucune requête externe au runtime. Les images sont des fichiers
 * locaux (public/images), sélectionnés une fois, optimisés une fois.
 * Qualité constante, performance prévisible, aucun changement imprévisible.
 *
 * Source : Unsplash (licence libre, usage commercial autorisé).
 */

export interface SiteImage {
  src: string;
  alt: string;
  /** Légende discrète optionnelle (crédit / contexte). */
  caption?: string;
}

/** Hero : rotation cinématique, 7 photographies immobilières premium. */
export const HERO_IMAGES: SiteImage[] = [
  {
    src: "/images/hero/maison-contemporaine.jpg",
    alt: "Maison contemporaine au crépuscule",
  },
  {
    src: "/images/hero/condo-fenetres.jpg",
    alt: "Salon lumineux d'un condo moderne avec grandes fenêtres",
  },
  {
    src: "/images/hero/architecture-urbaine.jpg",
    alt: "Façade d'un immeuble urbain contemporain",
  },
  {
    src: "/images/hero/interieur-premium.jpg",
    alt: "Intérieur architectural haut de gamme",
  },
  {
    src: "/images/hero/bord-de-leau.jpg",
    alt: "Propriété au bord de l'eau entourée de nature",
  },
  {
    src: "/images/hero/multilogement.jpg",
    alt: "Immeuble multilogement urbain",
  },
  {
    src: "/images/hero/projet-contemporain.jpg",
    alt: "Projet immobilier contemporain en béton clair",
  },
];

/** Durée d'affichage de chaque image du hero (ms). */
export const HERO_ROTATION_MS = 8000;

/** Sections éditoriales de la page d'accueil. */
export const EDITORIAL_IMAGES = {
  acheter: {
    src: "/images/editorial/acheter.jpg",
    alt: "Maison moderne avec terrain",
  } satisfies SiteImage,
  vendre: {
    src: "/images/editorial/vendre.jpg",
    alt: "Salon chaleureux d'une propriété à vendre",
  } satisfies SiteImage,
  investir: {
    src: "/images/editorial/immeuble.jpg",
    alt: "Façade d'un immeuble à logements",
  } satisfies SiteImage,
  sellSection: {
    src: "/images/editorial/maison-vendre.jpg",
    alt: "Maison familiale contemporaine",
  } satisfies SiteImage,
  estimate: {
    src: "/images/editorial/plans.jpg",
    alt: "Plans d'architecture sur table à dessin",
  } satisfies SiteImage,
  finalCta: {
    src: "/images/editorial/nuit.jpg",
    alt: "Maison contemporaine illuminée la nuit",
  } satisfies SiteImage,
};
