/* ============================================================
 * VEYLA — état de retour standard des Server Actions.
 * (Séparé des actions : un module 'use server' ne peut
 * exporter que des fonctions async.)
 * ============================================================ */

export interface PropertyActionState {
  ok: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  propertyId?: string;
  /** Renseignés par uploadPropertyMedia en cas de succès. */
  mediaId?: string;
  storagePath?: string;
}

export const initialPropertyActionState: PropertyActionState = { ok: false };
