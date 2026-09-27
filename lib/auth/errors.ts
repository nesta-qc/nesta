/*
 * Traduction des erreurs Supabase Auth en messages français sobres.
 * Utilisé par les formulaires client (connexion, inscription, mot de passe).
 */

/**
 * Convertit une erreur (souvent AuthError de Supabase, en anglais)
 * en message affichable en français. Ne journalise rien.
 */
export function toFrenchAuthError(error: unknown): string {
  const raw =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "";
  const message = raw.toLowerCase();

  if (message.includes("invalid login credentials")) {
    return "Courriel ou mot de passe incorrect.";
  }
  if (message.includes("email not confirmed")) {
    return "Vérifie ta boîte courriel : tu dois confirmer ton compte avant de te connecter.";
  }
  if (
    message.includes("user already registered") ||
    message.includes("already been registered") ||
    message.includes("already exists")
  ) {
    return "Un compte existe déjà avec ce courriel. Connecte-toi ou réinitialise ton mot de passe.";
  }
  if (message.includes("password should be at least")) {
    return "Le mot de passe doit contenir au moins 8 caractères.";
  }
  if (
    message.includes("rate limit") ||
    message.includes("too many requests") ||
    message.includes("email rate limit exceeded")
  ) {
    return "Trop de tentatives — réessaie dans quelques minutes.";
  }
  if (message.includes("signup is disabled")) {
    return "Les inscriptions sont temporairement désactivées.";
  }
  if (
    message.includes("expired") ||
    message.includes("invalid") ||
    message.includes("token")
  ) {
    return "Le lien est invalide ou a expiré. Demande un nouveau lien.";
  }
  if (message.includes("network") || message.includes("fetch")) {
    return "Impossible de joindre le serveur. Vérifie ta connexion.";
  }
  if (message.includes("weak password")) {
    return "Ce mot de passe est trop faible. Choisis-en un plus long.";
  }

  return "Une erreur est survenue. Réessaie dans un moment.";
}
