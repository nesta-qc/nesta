import { z } from "zod";

/* ============================================================
 * NESTA — schémas de validation (zod).
 *
 * Toute écriture (Server Actions) est validée ici avant
 * d'atteindre Supabase. Les formulaires HTML transmettent des
 * chaînes : les champs numériques optionnels acceptent la
 * chaîne vide (convertie en `undefined`), les champs requis
 * sont validés strictement.
 * ============================================================ */

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Enveloppe un schéma numérique : la chaîne vide / null /
 * undefined devient `undefined` (champ optionnel), sinon la
 * valeur est coercée puis validée par le schéma fourni.
 */
function optionalNumber<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : v),
    schema.optional(),
  );
}

/**
 * Enveloppe un schéma texte optionnel : la chaîne vide devient
 * `undefined` au lieu d'échouer la validation.
 */
function optionalText<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : v),
    schema.optional(),
  );
}

/* ---------- Types énumérés (miroir des CHECK SQL) ---------- */

export const listingTypeSchema = z.enum(["sale", "rent"], {
  error: "Choisissez « À vendre » ou « À louer ».",
});

export const propertyTypeSchema = z.enum(
  ["house", "condo", "plex", "land", "commercial", "other"],
  { error: "Type de propriété invalide." },
);

export const propertyStatusSchema = z.enum(
  ["draft", "published", "suspended", "sold", "rented", "withdrawn"],
  { error: "Statut invalide." },
);

/** Statuts qu'un vendeur peut appliquer lui-même à ses annonces. */
export const sellerStatusSchema = z.enum(["draft", "published", "withdrawn"], {
  error: "Statut invalide.",
});

/** Statuts qu'un administrateur peut appliquer à toute annonce. */
export const adminStatusSchema = z.enum(
  ["draft", "published", "suspended", "withdrawn"],
  { error: "Statut invalide." },
);

export const propertyIdSchema = z.string().uuid({
  error: "Identifiant d'annonce invalide.",
});

export const profileIdSchema = z.string().uuid({
  error: "Identifiant de profil invalide.",
});

/* ---------- Annonce (création / modification) ---------- */

export const propertySchema = z.object({
  address: z
    .string()
    .trim()
    .min(1, { error: "L'adresse est requise." })
    .max(200, { error: "L'adresse est trop longue (200 caractères maximum)." }),

  city: z
    .string()
    .trim()
    .min(1, { error: "La ville est requise." })
    .max(100, { error: "La ville est trop longue (100 caractères maximum)." }),

  postal_code: z.preprocess(
    (v) =>
      v === "" || v === null || v === undefined
        ? undefined
        : String(v).trim().toUpperCase(),
    z
      .string()
      .max(10, { error: "Le code postal est trop long." })
      .optional(),
  ),

  listing_type: listingTypeSchema,

  property_type: optionalText(propertyTypeSchema),

  asking_price: z.coerce
    .number({ error: "Entrez un prix valide." })
    .positive({ error: "Le prix doit être supérieur à 0." }),

  bedrooms: optionalNumber(
    z.coerce
      .number({ error: "Entrez un nombre de chambres valide." })
      .int({ error: "Le nombre de chambres doit être un nombre entier." })
      .min(0, { error: "Le nombre de chambres ne peut pas être négatif." })
      .max(100, { error: "Le nombre de chambres semble excessif." }),
  ),

  bathrooms: optionalNumber(
    z.coerce
      .number({ error: "Entrez un nombre de salles de bain valide." })
      .min(0, { error: "Le nombre de salles de bain ne peut pas être négatif." })
      .max(99, { error: "Le nombre de salles de bain semble excessif." }),
  ),

  living_area: optionalNumber(
    z.coerce
      .number({ error: "Entrez une superficie habitable valide." })
      .min(0, { error: "La superficie ne peut pas être négative." }),
  ),

  lot_area: optionalNumber(
    z.coerce
      .number({ error: "Entrez une superficie de terrain valide." })
      .min(0, { error: "La superficie ne peut pas être négative." }),
  ),

  year_built: optionalNumber(
    z.coerce
      .number({ error: "Entrez une année de construction valide." })
      .int({ error: "L'année de construction doit être un nombre entier." })
      .min(1500, { error: "L'année de construction semble trop ancienne." })
      .max(CURRENT_YEAR + 1, {
        error: "L'année de construction ne peut pas être dans le futur.",
      }),
  ),

  latitude: optionalNumber(
    z.coerce
      .number({ error: "Entrez une latitude valide." })
      .min(-90, { error: "La latitude doit être entre -90 et 90." })
      .max(90, { error: "La latitude doit être entre -90 et 90." }),
  ),

  longitude: optionalNumber(
    z.coerce
      .number({ error: "Entrez une longitude valide." })
      .min(-180, { error: "La longitude doit être entre -180 et 180." })
      .max(180, { error: "La longitude doit être entre -180 et 180." }),
  ),

  municipal_tax: optionalNumber(
    z.coerce
      .number({ error: "Entrez un montant de taxes municipales valide." })
      .min(0, { error: "Les taxes ne peuvent pas être négatives." }),
  ),

  school_tax: optionalNumber(
    z.coerce
      .number({ error: "Entrez un montant de taxes scolaires valide." })
      .min(0, { error: "Les taxes ne peuvent pas être négatives." }),
  ),

  description: optionalText(
    z
      .string()
      .max(5000, { error: "La description est trop longue (5000 caractères maximum)." }),
  ),

  virtual_tour_provider: z.preprocess(
    (v) =>
      v === "" || v === null || v === undefined ? "none" : String(v).trim(),
    z
      .enum(["none", "matterport", "external"], {
        error: "Choix de visite virtuelle invalide.",
      })
      .default("none"),
  ),

  virtual_tour_url: z.preprocess(
    (v) =>
      v === "" || v === null || v === undefined
        ? undefined
        : String(v).trim(),
    z
      .string()
      .url({ error: "L'URL de la visite virtuelle est invalide (ex. https://…)." })
      .max(500, { error: "L'URL est trop longue." })
      .optional(),
  ),
});

export type PropertyInput = z.infer<typeof propertySchema>;
export type ListingType = z.infer<typeof listingTypeSchema>;
export type PropertyType = z.infer<typeof propertyTypeSchema>;
export type PropertyStatus = z.infer<typeof propertyStatusSchema>;
export type SellerStatus = z.infer<typeof sellerStatusSchema>;

/* ---------- Lignes de base de données (typages explicites) ---------- */

export interface PropertyRow {
  id: string;
  owner_id: string;
  listing_type: string;
  status: string;
  address: string;
  city: string;
  province: string;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  asking_price: number | null;
  property_type: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  living_area: number | null;
  lot_area: number | null;
  year_built: number | null;
  municipal_tax: number | null;
  school_tax: number | null;
  description: string | null;
  virtual_tour_provider: string | null;
  virtual_tour_url: string | null;
  virtual_tour_id: string | null;
  virtual_tour_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface PropertyMediaRow {
  id: string;
  property_id: string;
  kind: string;
  storage_path: string;
  caption: string | null;
  position: number;
  created_at: string;
}

export interface ProfileRow {
  id: string;
  display_name: string | null;
}

/** Nombre de résultats par page de recherche. */
export const SEARCH_PAGE_SIZE = 20;
