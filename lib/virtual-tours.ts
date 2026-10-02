/* ============================================================
 * VEYLA — Visites virtuelles : résolution et validation d'URL.
 *
 * Module pur (aucun import serveur) : utilisable dans les Server
 * Actions (validation autoritaire) ET côté client (prévisualisation
 * et messages d'erreur immédiats).
 *
 * Sécurité :
 *  - seules les URL https sont acceptées ;
 *  - Matterport : hôtes my.matterport.com / matterport.com,
 *    chemin /show et paramètre `m` strictement validé ;
 *  - autre fournisseur : intégration iframe UNIQUEMENT si l'hôte
 *    figure dans la liste d'autorisation, sinon simple lien sortant ;
 *  - l'URL d'intégration est toujours RECONSTRUITE à partir de
 *    l'identifiant validé — jamais reprise telle quelle depuis
 *    l'entrée utilisateur (pas d'injection d'iframe arbitraire,
 *    pas de dangerouslySetInnerHTML côté rendu).
 *
 * Pour ajouter un fournisseur : ajouter son hôte + sa logique
 * d'extraction d'identifiant ci-dessous, puis élargir le CHECK
 * `properties_virtual_tour_provider_check` en base.
 * ============================================================ */

/** Fournisseurs stockés en base (colonne virtual_tour_provider). */
export const VIRTUAL_TOUR_DB_PROVIDERS = ["matterport", "external"] as const;
export type VirtualTourDbProvider = (typeof VIRTUAL_TOUR_DB_PROVIDERS)[number];

/** Choix proposés dans le formulaire vendeur. */
export const VIRTUAL_TOUR_FORM_CHOICES = [
  { value: "none", label: "Aucune visite virtuelle" },
  { value: "matterport", label: "Matterport" },
  { value: "external", label: "Autre lien de visite virtuelle" },
] as const;
export type VirtualTourFormChoice =
  (typeof VIRTUAL_TOUR_FORM_CHOICES)[number]["value"];

/** Hôtes Matterport autorisés pour l'intégration. */
const MATTERPORT_HOSTS = ["my.matterport.com", "matterport.com"];

/**
 * Hôtes tiers autorisés pour une intégration iframe.
 * Tout autre hôte https est accepté comme simple lien sortant
 * (pas d'iframe) — le vendeur reste libre de son fournisseur.
 */
const EXTERNAL_EMBED_ALLOWLIST = [
  "kuula.co",
  "www.kuula.co",
  "cloudpano.com",
  "app.cloudpano.com",
  "panoee.com",
  "www.panoee.com",
];

/** Format d'un identifiant de modèle Matterport (?m=…). */
const MATTERPORT_ID_RE = /^[A-Za-z0-9_-]{6,32}$/;

export interface ResolvedVirtualTour {
  /** Valeur stockée dans virtual_tour_provider. */
  provider: VirtualTourDbProvider;
  /** URL canonique stockée dans virtual_tour_url. */
  url: string;
  /** Identifiant extrait (Matterport), sinon null. */
  tourId: string | null;
  /**
   * URL sûre pour l'iframe. null = afficher un lien sortant
   * au lieu d'intégrer (fournisseur non listé).
   */
  embedUrl: string | null;
}

/**
 * Résout une URL brute en visite virtuelle validée.
 * Retourne null si l'URL est invalide ou non supportée.
 */
export function resolveVirtualTourUrl(rawUrl: string): ResolvedVirtualTour | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:") return null;
  const host = parsed.hostname.toLowerCase();

  /* ----- Matterport ----- */
  if (
    MATTERPORT_HOSTS.includes(host) &&
    parsed.pathname.toLowerCase().startsWith("/show")
  ) {
    const modelId = parsed.searchParams.get("m") ?? "";
    if (!MATTERPORT_ID_RE.test(modelId)) return null;
    const canonical = `https://my.matterport.com/show/?m=${modelId}`;
    return {
      provider: "matterport",
      url: canonical,
      tourId: modelId,
      embedUrl: canonical,
    };
  }

  /* ----- Autre fournisseur : iframe seulement si l'hôte est autorisé. ----- */
  if (EXTERNAL_EMBED_ALLOWLIST.includes(host)) {
    return {
      provider: "external",
      url: parsed.toString(),
      tourId: null,
      embedUrl: parsed.toString(),
    };
  }

  /* ----- Hôte https quelconque : lien sortant uniquement. ----- */
  return {
    provider: "external",
    url: parsed.toString(),
    tourId: null,
    embedUrl: null,
  };
}

export interface VirtualTourSaveResult {
  provider: VirtualTourDbProvider | null;
  url: string | null;
  tourId: string | null;
  enabled: boolean;
}

/**
 * Validation autoritaire pour l'enregistrement (Server Actions).
 * `choice` = "none" | "matterport" | "external" (formulaire),
 * `rawUrl` = URL saisie par le vendeur.
 */
export function resolveVirtualTourForSave(
  choice: string,
  rawUrl: string,
): { ok: true; tour: VirtualTourSaveResult } | { ok: false; error: string } {
  const normalizedChoice: VirtualTourFormChoice =
    choice === "matterport" || choice === "external" ? choice : "none";

  if (normalizedChoice === "none" || !rawUrl.trim()) {
    return {
      ok: true,
      tour: { provider: null, url: null, tourId: null, enabled: false },
    };
  }

  const resolved = resolveVirtualTourUrl(rawUrl);
  if (!resolved) {
    return {
      ok: false,
      error:
        "L'URL de la visite virtuelle est invalide. Utilisez une URL https complète (ex. https://my.matterport.com/show/?m=…).",
    };
  }

  if (normalizedChoice === "matterport" && resolved.provider !== "matterport") {
    return {
      ok: false,
      error:
        "Cette URL ne semble pas être une visite Matterport. Vérifiez le lien ou choisissez « Autre lien de visite virtuelle ».",
    };
  }

  return {
    ok: true,
    tour: {
      provider: resolved.provider,
      url: resolved.url,
      tourId: resolved.tourId,
      enabled: true,
    },
  };
}

/** Vrai si l'annonce a une visite 3D affichable (ligne DB). */
export function hasDisplayableTour(input: {
  virtual_tour_enabled: boolean | null;
  virtual_tour_url: string | null;
}): boolean {
  return input.virtual_tour_enabled === true && !!input.virtual_tour_url;
}

/**
 * Envoie un événement analytics (ouvertures / plein écran).
 * Fire-and-forget : n'interrompt jamais l'expérience.
 */
export function trackVirtualTourEvent(
  propertyId: string,
  eventType: "opened" | "fullscreen",
): void {
  try {
    const body = JSON.stringify({ propertyId, eventType });
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function"
    ) {
      navigator.sendBeacon(
        "/api/virtual-tour-events",
        new Blob([body], { type: "application/json" }),
      );
    } else {
      void fetch("/api/virtual-tour-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    }
  } catch {
    /* Analytics best-effort : jamais bloquant. */
  }
}
