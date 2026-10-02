/* ============================================================
 * VEYLA — Estimation immobilière : API centralisée.
 *
 * Toute évaluation indicative sur le site (parcours vendeur,
 * parcours acheteur, fiches propriétés, page /estimation) passe
 * par ce module. Un seul moteur, une seule calibration, pour des
 * chiffres cohérents partout.
 *
 * --- Côté serveur (Server Components, Server Actions, API routes)
 *
 *   import { estimate, suggestAddresses } from "@/lib/estimation";
 *
 *   // Estimation vendeur : "combien vaut ma propriété ?"
 *   const r = estimate({ ville: "montreal", adresse: "2219 rue Duvernay" });
 *
 *   // Estimation acheteur : valeur indicative sur une fiche propriété
 *   const r2 = estimate({ ville: "laval", adresse: "9 av. Sauriol", suite: "201" });
 *
 *   if (r.found) {
 *     r.estimation; r.fourchetteBasse; r.fourchetteHaute; // $
 *     r.valeurAuRole; r.categorie; r.facteur;             // traçabilité
 *     r.avertissement;                                    // à afficher
 *   }
 *
 * --- Via HTTP (client, ou autre service)
 *
 *   POST /api/estimation            { ville, adresse, suite? }
 *   GET  /api/estimation/suggest?ville=…&q=…   → string[] (autocomplétion)
 *
 * Données : rôles d'évaluation foncière officiels (MAMH, Données Québec,
 * CC-BY 4.0). Estimations INDICATIVES — jamais des évaluations agréées.
 * ============================================================ */

export { estimate, suggestAddresses, suggererAutresVilles } from "./engine";
export type {
  CategorieBien,
  PorteePlex,
  EstimateInput,
  EstimateNotFound,
  EstimateResult,
  EstimateSuccess,
  IndexRecord,
} from "./engine";
export { VILLES, getVille, isVilleSlug } from "./villes";
export type { VilleEstimation, VilleSlug } from "./villes";
export { normalizeAddress, normalizeStreet, normalizeSuite } from "./normalize";
