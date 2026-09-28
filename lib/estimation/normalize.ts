/* ============================================================
 * NESTA — Estimation : normalisation d'adresses.
 *
 * Port TypeScript strict de normalize_adresse.js, lui-même tenu
 * strictement identique au script Python de construction des index
 * (build_index_adresses.py / build_index_qc_villes.py).
 *
 * Toute modification ici DOIT être répercutée dans les scripts de
 * construction des index, sinon les clés ne correspondront plus.
 *
 * Clés d'index : "<civique> <rue normalisée>", ex. "1550 R ST-ANTOINE O"
 * Avec suite   : "<clé>|APT <suite>", ex. "1550 R ST-ANTOINE O|APT 201"
 * ============================================================ */

const TYPE_TABLE: Record<string, string> = {
  AVENUE: "AV",
  BOULEVARD: "BOUL",
  CHEMIN: "CH",
  PLACE: "PL",
  RUE: "R",
  CROISSANT: "CROIS",
  CRESCENT: "CROIS",
  TERRASSE: "TERR",
  ALLEE: "ALL",
  CARRE: "CAR",
  IMPASSE: "IMP",
  MONTEE: "MTE",
  PROMENADE: "PROM",
  AUTOROUTE: "AUT",
  COTE: "CTE",
  RUELLE: "RLE",
  PASSAGE: "PASS",
  CERCLE: "CERC",
  COURS: "COURS",
  PARC: "PARC",
  VOIE: "VOIE",
  CIRCUIT: "CIR",
  ROAD: "RD",
  STREET: "ST",
  DRIVE: "DR",
  LANE: "LN",
  CIRCLE: "CERC",
  AV: "AV",
  BOUL: "BOUL",
  CH: "CH",
  PL: "PL",
  R: "R",
  CROIS: "CROIS",
  TERR: "TERR",
  ALL: "ALL",
  CAR: "CAR",
  IMP: "IMP",
  MTE: "MTE",
  PROM: "PROM",
  AUT: "AUT",
  CTE: "CTE",
  RLE: "RLE",
  PASS: "PASS",
  CERC: "CERC",
  RD: "RD",
  ST: "ST",
  DR: "DR",
  LN: "LN",
  CIR: "CIR",
};

const ORIENT: Record<string, string> = {
  OUEST: "O",
  EST: "E",
  NORD: "N",
  SUD: "S",
  O: "O",
  E: "E",
  N: "N",
  S: "S",
};

/** Particules retirées en second essai quand la recherche exacte échoue. */
const PARTICULES = /\b(DE|LA|LE|DES|DU|L')\b/g;

function stripAccents(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** "boulevard de la Cité" → "BOUL CITE" */
export function normalizeStreet(rue: string): string {
  let s = String(rue).replace(/’/g, "'");
  s = s.replace(/\s*\([^)]*\)\s*$/, ""); // suffixe "(MTL)", "(PAT)", ...
  s = stripAccents(s.toUpperCase());
  s = s.replace(/\./g, "");
  s = s.replace(/\s*'\s*/g, "'"); // "l' Acadie" -> "l'Acadie"
  s = s.replace(/\s+/g, " ").trim();
  if (!s) return "";
  const toks = s.split(" ").map((t) => {
    if (t === "SAINT") return "ST";
    if (t === "SAINTE") return "STE";
    if (t.startsWith("SAINT-")) return "ST-" + t.slice(6);
    if (t.startsWith("SAINTE-")) return "STE-" + t.slice(7);
    return t;
  });
  if (toks[0] in TYPE_TABLE) toks[0] = TYPE_TABLE[toks[0]];
  else if (toks[toks.length - 1] in TYPE_TABLE)
    toks[toks.length - 1] = TYPE_TABLE[toks[toks.length - 1]];
  const last = toks.length - 1;
  if (toks[last] in ORIENT) toks[last] = ORIENT[toks[last]];
  return toks.join(" ");
}

/** "285 boulevard de la Cité" → "285 BOUL CITE" */
export function normalizeAddress(full: string): string {
  const s = String(full);
  // Lettre attachée au civique : "10000A av Charton" → "10000A AV CHARTON"
  let m = s.match(/^\s*(\d+)([A-Za-z])\s+([\s\S]*)$/);
  if (m) return `${m[1]}${m[2].toUpperCase()} ${normalizeStreet(m[3])}`.trim();
  // Lettre espacée : suffixe de civique ("10000 A av Charton") sauf si
  // c'est une abréviation de type de rue ("437 r rac" → "437 R RAC").
  m = s.match(/^\s*(\d+)\s+([A-Za-z])\s+([\s\S]*)$/);
  if (m) {
    const letter = m[2].toUpperCase();
    if (letter in TYPE_TABLE) {
      return `${m[1]} ${normalizeStreet(`${m[2]} ${m[3]}`)}`.trim();
    }
    return `${m[1]}${letter} ${normalizeStreet(m[3])}`.trim();
  }
  m = s.match(/^\s*(\d+)\s+([\s\S]*)$/);
  if (!m) return "";
  return `${m[1]} ${normalizeStreet(m[2])}`.trim();
}

export function normalizeSuite(s: string): string {
  return stripAccents(String(s).trim().toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Variante sans particules ("285 BOUL DE LA CITE" → "285 BOUL CITE"),
 * utilisée en second essai quand la recherche exacte ne trouve rien.
 */
export function stripParticules(normalizedKey: string): string {
  return normalizedKey.replace(PARTICULES, "").replace(/\s+/g, " ").trim();
}
