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
 * Variantes ordinales ("5E"/"5EME"/"5IEME" → "5 IEME", "1ER"/"1RE" →
 * "1 ER" et "1 IEME") : les utilisateurs écrivent "5e", "5ème", "5eme",
 * "1er"… alors que les rôles n'ordonnent pas pareil partout
 * ("5 IEME BOUL" à Terrasse-Vaudreuil, "47E AV" à Montréal).
 *
 * Utilisée UNIQUEMENT comme repli au moment de la recherche : la
 * normalisation (et donc les clés d'index) est inchangée, les scripts
 * de construction des index n'ont pas besoin d'être modifiés.
 */
export function variantesOrdinaux(cleNormalisee: string): string[] {
  const out: string[] = [];
  // "280 5E BOUL" / "280 5EME BOUL" → "280 5 IEME BOUL".
  // Un chiffre suivi de E/EME/IEME est sans ambiguïté un ordinal.
  const ieme = cleNormalisee.replace(/\b(\d+)(E|EME|IEME)\b/g, "$1 IEME");
  if (ieme !== cleNormalisee) out.push(ieme);
  // "1ER" / "1ERE" / "1RE" → "1 ER" (autres villes) et "1 IEME"
  // (Terrasse-Vaudreuil écrit "1 IEME").
  const er = cleNormalisee.replace(/\b(\d+)(ER|ERE|RE)\b/g, "$1 ER");
  if (er !== cleNormalisee) {
    out.push(er);
    const erIeme = er.replace(/\b(\d+) ER\b/g, "$1 IEME");
    if (!out.includes(erIeme)) out.push(erIeme);
  }
  return out;
}

/**
 * Variante avec le type de voie déplacé à l'autre bout
 * ("7620 47E AV" → "7620 AV 47E", et inversement).
 *
 * Les rôles fonciers n'ordonnent pas le type de voie de la même façon
 * partout : Montréal écrit "47e Avenue" ("47E AV"), Laval écrit
 * "Avenue 47e" ("AV 47E"). La normalisation est déterministe par
 * ville, donc la clé exacte dépend de la convention source.
 *
 * Utilisée UNIQUEMENT comme repli au moment de la recherche : la
 * normalisation (et donc les clés d'index) est inchangée, les scripts
 * de construction des index n'ont pas besoin d'être modifiés.
 * On ne déplace jamais une orientation finale (E/O/N/S) : le repli
 * sur les orientations cardinales s'en charge séparément.
 */
const ABREV_TYPES = new Set(Object.values(TYPE_TABLE));
const ORIENTATIONS = new Set(["E", "O", "N", "S"]);

/** Vrai si le token est une abréviation de type de voie ("AV", "R", …). */
export function estTypeVoie(token: string): boolean {
  return ABREV_TYPES.has(token);
}

/**
 * Abréviations de types de voie, pour le repli « type omis »
 * ("2219 Duvernay" → "2219 R DUVERNAY"). Ordre = probabilité.
 */
export const TYPES_VOIE_INSERTION: string[] = [
  ...new Set(Object.values(TYPE_TABLE)),
];

export function varianteOrdreType(cleNormalisee: string): string | null {
  const parts = cleNormalisee.split(" ");
  if (parts.length < 3) return null; // civique + au moins 2 mots de rue
  const [civique, ...rue] = parts;
  const premier = rue[0];
  const dernier = rue[rue.length - 1];
  if (ORIENTATIONS.has(dernier)) return null;
  const premierEstType = ABREV_TYPES.has(premier);
  const dernierEstType = ABREV_TYPES.has(dernier);
  if (dernierEstType && !premierEstType) {
    return [civique, dernier, ...rue.slice(0, -1)].join(" ");
  }
  if (premierEstType && !dernierEstType) {
    return [civique, ...rue.slice(1), premier].join(" ");
  }
  return null;
}

/**
 * Variante sans particules ("285 BOUL DE LA CITE" → "285 BOUL CITE"),
 * utilisée en second essai quand la recherche exacte ne trouve rien.
 */
export function stripParticules(normalizedKey: string): string {
  return normalizedKey.replace(PARTICULES, "").replace(/\s+/g, " ").trim();
}
