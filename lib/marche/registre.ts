/* ============================================================
 * NESTA — Système Marché : registre des versions du modèle.
 *
 * Chaque calibration du moteur de prix est versionnée : mois de
 * référence du marché, métriques de validation (biais, couverture),
 * source des facteurs. Le moteur utilise toujours la version
 * active — traçabilité complète, comme un dossier de courtier.
 *
 * Données : data/marche/registre.json.
 * ============================================================ */

import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface VersionModele {
  version: string;
  dateActivation: string;
  /** Mois de référence du marché de la calibration ("2026-06"). */
  moisReferenceMarche: string;
  sourceFacteurs: string;
  biaisMedianPct: number;
  couvertureFourchette: string;
  notes: string;
}

interface RegistreFile {
  versionActive: string;
  derniereActualisationIndice: string;
  versions: VersionModele[];
}

const REGISTRE_PATH = join(process.cwd(), "data", "marche", "registre.json");

let registreCache: RegistreFile | null = null;

function chargerRegistre(): RegistreFile {
  if (!registreCache) {
    const raw = readFileSync(REGISTRE_PATH, "utf-8");
    registreCache = JSON.parse(raw) as RegistreFile;
  }
  return registreCache;
}

/** Version du modèle actuellement en production. */
export function versionActive(): VersionModele {
  const r = chargerRegistre();
  const v = r.versions.find((x) => x.version === r.versionActive);
  if (!v) throw new Error("Version active du modèle introuvable.");
  return v;
}

/** Dernier mois d'indice intégré (ex. "2026-09"). */
export function derniereActualisationIndice(): string {
  return chargerRegistre().derniereActualisationIndice;
}
