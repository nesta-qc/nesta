/* ============================================================
 * VEYLA — Système Marché : indice mensuel des prix résidentiels.
 *
 * L'indice suit le prix médian unifamilial (province de Québec,
 * FCIQ puis APCIQ, prix vendus Centris) :
 *  - points annuels (décembre) 2010–2024, chaînés à partir des
 *    variations annuelles vérifiées ;
 *  - points mensuels depuis janvier 2025, chaînés sur les médianes
 *    mensuelles publiées.
 *
 * Données : data/marche/indice.json, actualisé chaque mois par le
 * pipeline (scripts/marche/actualiser.mjs + cron mensuel).
 * Base 100 = décembre 2009.
 *
 * L'indice sert à dater les prix : un prix « marché T2 2026 » est
 * ramené au mois courant par ratio d'indices, comme le ferait un
 * courtier avec l'évolution du marché.
 * ============================================================ */

import { readFileSync } from "node:fs";
import { join } from "node:path";

interface PointMensuel {
  indice: number | null;
  mediane: number | null;
  source?: string;
  note?: string;
}

interface IndiceFile {
  nom: string;
  methode: string;
  base: string;
  ancre_dec_2024: number;
  annuel: Record<string, number>;
  mensuel: Record<string, PointMensuel>;
}

const INDICE_PATH = join(process.cwd(), "data", "marche", "indice.json");

let serieCache: { mois: string; indice: number }[] | null = null;

/**
 * Construit la série chronologique complète (mois → indice) :
 * points annuels (décembre, 2010–2024) + points mensuels renseignés.
 * Les mois sans donnée sont interpolés linéairement à la lecture.
 */
function chargerSerie(): { mois: string; indice: number }[] {
  if (serieCache) return serieCache;
  const raw = readFileSync(INDICE_PATH, "utf-8");
  const f = JSON.parse(raw) as IndiceFile;
  const pts: { mois: string; indice: number }[] = [];

  // Chaînage annuel : base 100 en décembre 2009.
  let idx = 100;
  const annees = Object.keys(f.annuel)
    .map(Number)
    .sort((a, b) => a - b);
  for (const a of annees) {
    if (a > 2024) break; // le mensuel prend le relais après 2024
    idx *= 1 + (f.annuel[String(a)] ?? 0);
    pts.push({ mois: `${a}-12`, indice: Math.round(idx * 100) / 100 });
  }

  // Points mensuels (on ignore les mois sans donnée).
  const moisTries = Object.keys(f.mensuel).sort();
  for (const m of moisTries) {
    const p = f.mensuel[m];
    if (typeof p.indice === "number" && p.indice > 0) {
      const dernier = pts[pts.length - 1];
      if (!dernier || m > dernier.mois) pts.push({ mois: m, indice: p.indice });
      else if (m === dernier.mois) dernier.indice = p.indice;
    }
  }
  serieCache = pts;
  return pts;
}

/** Plus grand mois ≤ mois cible dans la série. */
function borne(mois: string): { mois: string; indice: number } | null {
  const serie = chargerSerie();
  let out: { mois: string; indice: number } | null = null;
  for (const p of serie) {
    if (p.mois <= mois) out = p;
    else break;
  }
  return out;
}

/**
 * Indice au mois demandé ("AAAA-MM"). Entre deux points connus,
 * interpolation linéaire (le marché ne fait pas de sauts) ; avant
 * 2010 ou après le dernier point connu, la borne la plus proche est
 * reprise sans extrapolation inventée.
 */
export function indiceAuMois(mois: string): number {
  const serie = chargerSerie();
  if (serie.length === 0) throw new Error("Indice du marché vide.");
  const exact = serie.find((p) => p.mois === mois);
  if (exact) return exact.indice;
  const avant = borne(mois);
  const apres = serie.find((p) => p.mois > mois) ?? null;
  if (!avant) return serie[0].indice;
  if (!apres) return avant.indice;
  // Interpolation linéaire entre les deux bornes.
  const mAvant = moisVersNombre(avant.mois);
  const mApres = moisVersNombre(apres.mois);
  const mCible = moisVersNombre(mois);
  const t = (mCible - mAvant) / Math.max(1, mApres - mAvant);
  return avant.indice + t * (apres.indice - avant.indice);
}

function moisVersNombre(mois: string): number {
  const [a, m] = mois.split("-").map(Number);
  return a * 12 + m;
}

/**
 * Ratio d'évolution du marché entre deux mois :
 * prix(moisVers) = prix(moisDe) × ratioMarche(moisDe, moisVers).
 */
export function ratioMarche(moisDe: string, moisVers: string): number {
  const de = indiceAuMois(moisDe);
  const vers = indiceAuMois(moisVers);
  if (de <= 0) throw new Error(`Indice invalide pour ${moisDe}.`);
  return vers / de;
}

/** Dernier mois pour lequel l'indice est connu (= mois du prix affiché). */
export function moisLePlusRecent(): string {
  const serie = chargerSerie();
  if (serie.length === 0) throw new Error("Indice du marché vide.");
  return serie[serie.length - 1].mois;
}

/**
 * Tendance du marché sur les 12 derniers mois connus (%, ex. +6,2).
 * null si l'historique est insuffisant.
 */
export function tendance12Mois(): number | null {
  const recent = moisLePlusRecent();
  const [a, m] = recent.split("-").map(Number);
  const ilYAUnAn = `${a - 1}-${String(m).padStart(2, "0")}`;
  try {
    const r = ratioMarche(ilYAUnAn, recent);
    return Math.round((r - 1) * 1000) / 10;
  } catch {
    return null;
  }
}

/** Libellé lisible d'un mois ("2026-10" → "oct. 2026"). */
export function libelleMois(mois: string): string {
  const NOMS = [
    "janv.", "févr.", "mars", "avr.", "mai", "juin",
    "juil.", "août", "sept.", "oct.", "nov.", "déc.",
  ];
  const [a, m] = mois.split("-").map(Number);
  if (!a || !m || m < 1 || m > 12) return mois;
  return `${NOMS[m - 1]} ${a}`;
}
