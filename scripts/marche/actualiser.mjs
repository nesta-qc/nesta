#!/usr/bin/env node
/* ============================================================
 * NESTA — Système Marché : actualisation mensuelle de l'indice.
 *
 * Ajoute un mois à data/marche/indice.json en chaînant la médiane
 * mensuelle APCIQ (prix médian unifamilial, province de Québec) :
 *   indice(m) = indice(m-1) × médiane(m) / médiane(m-1)
 *
 * Usage :
 *   node scripts/marche/actualiser.mjs --mois 2026-10 --mediane 518000 \
 *     [--source "APCIQ, stats mensuelles oct. 2026"]
 *
 * Le pipeline mensuel (cron) récupère la médiane dans le PDF de
 * l'APCIQ puis appelle ce script. Après exécution : lancer la
 * validation (tests à l'aveugle) avant tout push en production.
 * ============================================================ */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const INDICE_PATH = join(ROOT, "data", "marche", "indice.json");
const REGISTRE_PATH = join(ROOT, "data", "marche", "registre.json");

function usage() {
  console.error(
    "Usage : node scripts/marche/actualiser.mjs --mois AAAA-MM --mediane <médiane $> [--source <texte>]",
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const get = (k) => {
  const i = args.indexOf(k);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : null;
};
const mois = get("--mois");
const mediane = Number(get("--mediane"));
const source = get("--source") ?? `APCIQ, stats mensuelles ${mois}`;

if (!mois || !/^\d{4}-(0[1-9]|1[0-2])$/.test(mois)) usage();
if (!Number.isFinite(mediane) || mediane <= 0) usage();

const indice = JSON.parse(readFileSync(INDICE_PATH, "utf-8"));
if (indice.mensuel[mois]?.mediane != null) {
  console.error(`Le mois ${mois} est déjà renseigné, rien à faire.`);
  process.exit(2);
}

// Mois précédent avec une médiane connue (chaînage).
const moisTries = Object.keys(indice.mensuel).sort();
let prev = null;
for (const m of moisTries) {
  if (m < mois && indice.mensuel[m].mediane != null) prev = m;
}
if (!prev) {
  console.error(`Aucun mois précédent avec médiane connue avant ${mois}.`);
  process.exit(3);
}
const p = indice.mensuel[prev];
const nouvelIndice = Math.round(((p.indice * mediane) / p.mediane) * 100) / 100;

indice.mensuel[mois] = { indice: nouvelIndice, mediane, source };
const cles = Object.keys(indice.mensuel).sort();
const trie = {};
for (const k of cles) trie[k] = indice.mensuel[k];
indice.mensuel = trie;
writeFileSync(INDICE_PATH, JSON.stringify(indice, null, 2) + "\n", "utf-8");

// Registre : on note le dernier mois intégré.
const registre = JSON.parse(readFileSync(REGISTRE_PATH, "utf-8"));
registre.derniereActualisationIndice = mois;
writeFileSync(REGISTRE_PATH, JSON.stringify(registre) + "\n", "utf-8");

// Tendance 12 mois glissants (si disponible).
let tendance = null;
{
  const [a, mm] = mois.split("-").map(Number);
  const ilYAUnAn = `${a - 1}-${String(mm).padStart(2, "0")}`;
  const ref = indice.mensuel[ilYAUnAn];
  if (ref?.indice) tendance = ((nouvelIndice / ref.indice - 1) * 100).toFixed(1);
}

console.log(`Indice actualisé : ${mois}`);
console.log(`  médiane : ${mediane.toLocaleString("fr-CA")} $ (précédent : ${prev})`);
console.log(`  indice  : ${p.indice} → ${nouvelIndice}`);
console.log(`  12 mois : ${tendance === null ? "n/d" : (tendance >= 0 ? "+" : "") + String(tendance).replace(".", ",") + " %"}`);
console.log("Prochaine étape : valider (tests à l'aveugle) avant push en production.");
