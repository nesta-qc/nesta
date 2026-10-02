import { z } from "zod";

/*
 * Schémas de validation zod partagés entre le client et le serveur
 * pour tous les formulaires d'authentification VEYLA.
 *
 * Les Server Actions ne font JAMAIS confiance au client : elles
 * revalident systématiquement avec ces mêmes schémas.
 *
 * Les valeurs FormData (null, File…) sont normalisées en chaînes
 * pour que les messages d'erreur restent en français.
 */

/** Normalise une valeur FormData en chaîne ("" si absente ou non textuelle). */
const toText = (v: unknown): string => (typeof v === "string" ? v : "");

/** Courriel : requis, format valide, longueur raisonnable. */
export const emailSchema = z.preprocess(
  toText,
  z
    .string()
    .trim()
    .min(1, "Le courriel est requis.")
    .email("Adresse courriel invalide.")
    .max(254, "Adresse courriel trop longue."),
);

/** Mot de passe à la connexion : simplement requis. */
const loginPasswordSchema = z.preprocess(
  toText,
  z.string().min(1, "Le mot de passe est requis."),
);

/** Mot de passe à la création / réinitialisation : 8 caractères minimum. */
const newPasswordSchema = z.preprocess(
  toText,
  z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
    .max(128, "Le mot de passe est trop long (128 caractères max)."),
);

/** Nom affiché : 2 à 100 caractères. */
const displayNameSchema = z.preprocess(
  toText,
  z
    .string()
    .trim()
    .min(2, "Le nom affiché doit contenir au moins 2 caractères.")
    .max(100, "Le nom affiché est trop long (100 caractères max)."),
);

/** Connexion : courriel + mot de passe. */
export const loginSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;

/** Inscription : nom affiché + courriel + mot de passe. */
export const signupSchema = z.object({
  displayName: displayNameSchema,
  email: emailSchema,
  password: newPasswordSchema,
});

export type SignupInput = z.infer<typeof signupSchema>;

/** Mot de passe oublié : courriel uniquement. */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

/** Nouveau mot de passe : saisie + confirmation identique. */
export const resetPasswordSchema = z
  .object({
    password: newPasswordSchema,
    confirm: z.preprocess(
      toText,
      z.string().min(1, "La confirmation du mot de passe est requise."),
    ),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Les deux mots de passe ne correspondent pas.",
    path: ["confirm"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

/** Mise à jour du profil : nom affiché + téléphone et avatar optionnels. */
export const updateProfileSchema = z.object({
  displayName: displayNameSchema,
  phone: z.preprocess(
    toText,
    z
      .string()
      .trim()
      .max(30, "Le numéro de téléphone est trop long (30 caractères max)."),
  ),
  avatarUrl: z.preprocess(
    toText,
    z
      .string()
      .trim()
      .max(2048, "L'URL est trop longue.")
      .refine((v) => v === "" || /^https?:\/\/.+/i.test(v), {
        message: "L'URL de l'avatar doit commencer par http:// ou https://.",
      }),
  ),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

/* ---------- Onboarding ---------- */

/** Intentions proposées dans le questionnaire d'arrivée. */
export const INTENTIONS = [
  "acheter",
  "vendre",
  "investir",
  "courtier",
  "promoteur",
] as const;

export type Intention = (typeof INTENTIONS)[number];

/** Libellés français des intentions. */
export const INTENTION_LABELS: Record<Intention, string> = {
  acheter: "Acheter",
  vendre: "Vendre",
  investir: "Investir",
  courtier: "Courtier",
  promoteur: "Promoteur",
};

/**
 * Rôles auto-attribuables en self-service (politique RLS
 * « user_roles : auto-attribution BUYER/SELLER »).
 */
export const SELF_ASSIGNABLE_ROLES = ["BUYER", "SELLER"] as const;

export type SelfAssignableRole = (typeof SELF_ASSIGNABLE_ROLES)[number];

/** Libellés français des rôles. */
export const ROLE_LABELS: Record<string, string> = {
  BUYER: "Acheteur",
  SELLER: "Vendeur",
  BROKER: "Courtier",
  AGENCY: "Agence",
  DEVELOPER: "Promoteur",
  ADMIN: "Administrateur",
};

/**
 * Onboarding : intention principale + rôles self-service cochés.
 * Les rôles professionnels (courtier, agence, promoteur) ne sont
 * jamais insérés ici : un administrateur les attribue.
 */
export const onboardingSchema = z.object({
  intention: z.preprocess(toText, z.enum(INTENTIONS, { error: "Choisis ton intention principale." })),
  roles: z.preprocess(
    (v: unknown) =>
      Array.isArray(v)
        ? v.filter((x): x is string => typeof x === "string")
        : [],
    z.array(z.enum(SELF_ASSIGNABLE_ROLES, { error: "Rôle invalide." })),
  ),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
