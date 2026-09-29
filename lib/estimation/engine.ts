/* ============================================================
 * NESTA — Estimation : moteur centralisé d'évaluation indicative.
 *
 * C'est LE point d'entrée unique pour toute évaluation immobilière
 * sur le site, côté vendeur comme côté acheteur :
 *
 *   import { estimate, suggestAddresses } from "@/lib/estimation";
 *
 *   const r = estimate({ ville: "montreal", adresse: "2219 rue Duvernay" });
 *   if (r.found) console.log(r.estimation, r.fourchetteBasse, r.fourchetteHaute);
 *
 * Méthode (identique au prototype validé par Merouane) :
 *   estimation  = valeur au rôle × facteur de marché (calibré APCIQ)
 *   fourchette  = ±12 % autour de la valeur centrale
 *   condo < 150 m² → facteur condo, sinon facteur maison
 *
 * Données : rôles d'évaluation foncière officiels (MAMH, Données Québec,
 * CC-BY 4.0), index compressés dans data/estimation/. Chaque index de
 * ville est chargé à la demande (gzip → mémoire) puis mis en cache
 * pour la durée de vie du processus serveur.
 *
 * Les valeurs produites sont INDICATIVES et ne constituent en aucun
 * cas une évaluation agréée (OEAQ).
 * ============================================================ */

import { gunzipSync } from "node:zlib";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  estTypeVoie,
  normalizeAddress,
  normalizeStreet,
  normalizeSuite,
  stripParticules,
  TYPES_VOIE_INSERTION,
  varianteOrdreType,
  variantesOrdinaux,
} from "./normalize";
import { getVille, VILLES, type VilleSlug } from "./villes";

/* ---------- Types ---------- */

/**
 * Fiche d'index : [b_idx, t_idx, supT, supB, annee, nblog, val, flags, civfin]
 *  b_idx : indice d'arrondissement (Montréal ; 0 ailleurs)
 *  t_idx : 0=terrain 1=maison 2=multi 3=plex 4=commercial
 *  supT  : superficie du terrain (m²)
 *  supB  : superficie du bâtiment (m²)
 *  val   : valeur de l'immeuble au rôle ($)
 *  flags : bit 1 = condo
 */
export type IndexRecord = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

const TYPES = ["terrain", "maison", "multi", "plex", "commercial"] as const;

export type CategorieBien =
  | "terrain"
  | "maison"
  | "condo"
  | "plex"
  | "multi"
  | "commercial";

/** Portée d'une estimation de plex : tout l'immeuble ou un seul logement. */
export type PorteePlex = "immeuble" | "logement";

export interface EstimateInput {
  ville: VilleSlug;
  /** Adresse en saisie libre, ex. "2219 rue Duvernay" */
  adresse: string;
  /** Numéro d'appartement/bureau, ex. "201" (optionnel) */
  suite?: string;
  /**
   * Type de bien connu (optionnel). Quand il est fourni, la sélection
   * des fiches et le facteur suivent exactement la méthodologie de
   * validation (type d'annonce connu) :
   * - "condo"  : fiches de < 150 m² → facteur condo, sinon repli
   *              « maison » (grands condos) ;
   * - "maison" : fiches maison non marquées condo → facteur maison.
   * Sans type, la règle aveugle documentée s'applique :
   * fiche « maison » de < 150 m² → facteur condo, sinon son type.
   */
  typeBien?: CategorieBien;
  /**
   * Portée pour un plex : "immeuble" (défaut, valeur de tout
   * l'immeuble) ou "logement" (valeur indicative d'un seul logement
   * = valeur de l'immeuble ÷ nombre de logements). Ignoré si la
   * catégorie calculée n'est pas "plex".
   */
  porteePlex?: PorteePlex;
  /**
   * Horizon de projection en années (1 à 10). Quand il est fourni,
   * le résultat inclut une projection indicative de la valeur à cet
   * horizon (scénario de poursuite de la tendance implicite de la
   * calibration). Sans horizon, seule la valeur actuelle est calculée.
   */
  projectionAnnees?: number;
}

export interface EstimateSuccess {
  found: true;
  ville: VilleSlug;
  villeNom: string;
  /** Clé d'index effectivement appariée, ex. "2219 R DUVERNAY" */
  cleAppariee: string;
  adresseNormalisee: string;
  /** Type de bien demandé (le cas échéant) */
  typeBienDemande?: CategorieBien;
  categorie: CategorieBien;
  facteur: number;
  valeurAuRole: number;
  /** Valeur centrale estimée ($) */
  estimation: number;
  fourchetteBasse: number;
  fourchetteHaute: number;
  superficieTerrainM2: number;
  superficieBatimentM2: number;
  anneeConstruction: number;
  nbLogements: number;
  /** Nombre de fiches à cette adresse (sans n° de suite) */
  nbFichesAdresse: number;
  /** Portée retenue pour un plex ("logement" = un seul logement). */
  porteePlex?: PorteePlex;
  /** Référence de marché de la calibration, ex. "T2 2026". */
  referenceMarche: string;
  /**
   * Projection indicative à l'horizon demandé (scénario tendanciel).
   * La valeur centrale et la fourchette restent la VALEUR ACTUELLE.
   */
  projection?: {
    annees: number;
    /** Taux annuel implicite de la calibration (%). */
    tauxAnnuelPct: number;
    estimation: number;
    fourchetteBasse: number;
    fourchetteHaute: number;
  };
  /** Précision sur un repli de règle (ex. grand condo classé maison) */
  note?: string;
  arrondissement?: string;
  millesimeRole: string;
  dateReferenceMarche: string;
  avertissement: string;
}

export interface EstimateNotFound {
  found: false;
  reason: "adresse_invalide" | "adresse_introuvable" | "adresse_ambigue";
  cleNormalisee?: string;
  /**
   * Clés d'index candidates quand l'adresse est ambiguë
   * (ex. orientation Est/Ouest non précisée). L'appelant peut les
   * proposer à l'utilisateur pour lever l'ambiguïté.
   */
  options?: string[];
  /**
   * Autres villes couvertes où l'adresse a été trouvée (repli
   * inter-villes : l'utilisateur a peut-être sélectionné la mauvaise
   * ville). Renseigné par l'API, pas par estimate() directement.
   */
  villesSuggerees?: { slug: VilleSlug; nom: string }[];
}

export type EstimateResult = EstimateSuccess | EstimateNotFound;

/* ---------- Chargement des données ---------- */

const DATA_DIR = join(process.cwd(), "data", "estimation");

interface FactorsFile {
  version: string;
  /** Référence de marché de la calibration, ex. "T2 2026" (APCIQ). */
  reference_marche: string;
  fourchette_pct: number;
  seuil_condo_m2: number;
  /**
   * Plafond du taux annuel utilisé pour les projections (+3/+5 ans).
   * Le taux implicite de la calibration mesure le rattrapage entre la
   * date de référence du rôle (2022-2024 selon la ville) et le marché
   * T2 2026 — une période de forte croissance qu'il serait
   * irresponsable de prolonger telle quelle. La projection compose
   * donc avec min(taux implicite, plafond), un scénario tendanciel
   * amorti.
   */
  plafond_taux_projection: number;
  villes: Record<
    string,
    {
      nom: string;
      millesime_role: string;
      date_reference_marche_role: string;
      granularite_facteurs: "arrondissement" | "ville";
      facteurs?: Record<CategorieBien, number>;
      facteurs_par_arrondissement?: Record<string, Record<CategorieBien, number>>;
      boroughs_bidx?: string[];
    }
  >;
}

let factorsCache: FactorsFile | null = null;

function loadFactors(): FactorsFile {
  if (!factorsCache) {
    const raw = readFileSync(join(DATA_DIR, "factors.json"), "utf-8");
    factorsCache = JSON.parse(raw) as FactorsFile;
  }
  return factorsCache;
}

interface CityIndex {
  map: Record<string, IndexRecord[]>;
  sortedKeys: string[];
  /** Noms de rues normalisés triés ("R SAINT-DENIS"), pour la recherche sans numéro civique. */
  streets: string[];
  /** rue normalisée → indices dans sortedKeys (toutes les adresses de la rue). */
  streetKeys: Map<string, number[]>;
}

const indexCache = new Map<VilleSlug, CityIndex>();

function loadIndex(ville: VilleSlug): CityIndex {
  const cached = indexCache.get(ville);
  if (cached) return cached;
  const gz = readFileSync(join(DATA_DIR, `index-${ville}.json.gz`));
  const map = JSON.parse(gunzipSync(gz).toString("utf-8")) as Record<
    string,
    IndexRecord[]
  >;
  const sortedKeys = Object.keys(map).sort();
  // Index des rues : nom normalisé → adresses. Dérivé des clés, sans
  // toucher aux fichiers d'index. Sert la recherche par nom de rue
  // ("saint-denis") quand l'utilisateur tape sans numéro civique.
  const streetKeys = new Map<string, number[]>();
  for (let i = 0; i < sortedKeys.length; i++) {
    const key = sortedKeys[i];
    const base = key.includes("|") ? key.slice(0, key.indexOf("|")) : key;
    const sp = base.indexOf(" ");
    if (sp < 0) continue;
    const street = base.slice(sp + 1);
    const arr = streetKeys.get(street);
    if (arr) arr.push(i);
    else streetKeys.set(street, [i]);
  }
  const idx: CityIndex = {
    map,
    sortedKeys,
    streets: [...streetKeys.keys()].sort(),
    streetKeys,
  };
  indexCache.set(ville, idx);
  return idx;
}

/* ---------- Moteur ---------- */

const AVERTISSEMENT =
  "Estimation indicative calculée à partir du rôle d'évaluation foncière et des prix de vente médians du marché. Elle ne constitue pas une évaluation agréée et ne remplace pas l'avis d'un évaluateur agréé.";

function getFacteur(
  factors: FactorsFile,
  ville: VilleSlug,
  bIdx: number,
  categorie: CategorieBien,
): number {
  const v = factors.villes[ville];
  if (!v) throw new Error(`Facteurs manquants pour la ville : ${ville}`);
  if (v.granularite_facteurs === "arrondissement") {
    const borough = v.boroughs_bidx?.[bIdx];
    const f = borough
      ? v.facteurs_par_arrondissement?.[borough]?.[categorie]
      : undefined;
    if (typeof f !== "number")
      throw new Error(`Facteur manquant : ${borough ?? "?"} / ${categorie}`);
    return f;
  }
  const f = v.facteurs?.[categorie];
  if (typeof f !== "number")
    throw new Error(`Facteur manquant : ${ville} / ${categorie}`);
  return f;
}

/**
 * Apparie une adresse à une fiche du rôle d'évaluation, puis calcule
 * l'estimation. Ne lance jamais d'exception pour un cas métier
 * (adresse invalide / introuvable → { found: false }).
 */
export function estimate(input: EstimateInput): EstimateResult {
  const factors = loadFactors();
  const ville = getVille(input.ville);
  const { map } = loadIndex(input.ville);

  const baseKey = normalizeAddress(input.adresse);
  if (!baseKey) return { found: false, reason: "adresse_invalide" };

  // Bases de recherche : clé exacte, variante sans particules
  // ("285 BOUL DE LA CITE" → "285 BOUL CITE"), variantes ordinales
  // ("280 5EME BOUL" → "280 5 IEME BOUL" : "5e"/"5ème"/"5eme" tapés
  // par l'utilisateur, "5 IEME" au rôle), variante sans orientation
  // finale ("1000 AV DU MONT-ROYAL E" → sans le " E"), variante
  // d'ordre du type de voie ("7620 47E AV" → "7620 AV 47E" : les
  // rôles n'ordonnent pas le type de voie pareil partout).
  const bases: string[] = [baseKey];
  const stripped = stripParticules(baseKey);
  if (stripped && stripped !== baseKey) bases.push(stripped);
  for (const b of [...bases]) {
    for (const v of variantesOrdinaux(b)) {
      if (!bases.includes(v)) bases.push(v);
    }
  }
  for (const b of [...bases]) {
    const sansOrient = b.replace(/ ([EONS])$/, "");
    if (sansOrient !== b && !bases.includes(sansOrient)) bases.push(sansOrient);
  }
  for (const b of [...bases]) {
    const variante = varianteOrdreType(b);
    if (variante && !bases.includes(variante)) bases.push(variante);
  }

  const suiteN =
    input.suite && normalizeSuite(input.suite)
      ? normalizeSuite(input.suite)
      : null;

  // 1) Recherche directe (avec suite d'abord, puis sans).
  // 2) Repli sur les orientations cardinales : beaucoup d'avenues et
  //    de boulevards portent un suffixe E/O/N/S que l'utilisateur omet
  //    ("1000 avenue du Mont-Royal" → "1000 AV DU MONT-ROYAL E").
  //    Si plusieurs orientations correspondent, l'adresse est ambiguë
  //    et les options sont renvoyées pour lever l'ambiguïté côté UI.
  const ORIENTATIONS = ["E", "O", "N", "S"];
  let cleAppariee: string | null = null;
  let fiches: IndexRecord[] | undefined;
  const vus = new Set<string>();
  const testCle = (cle: string): boolean => {
    if (vus.has(cle)) return false;
    vus.add(cle);
    const hit = map[cle];
    if (hit && hit.length > 0) {
      cleAppariee = cle;
      fiches = hit;
      return true;
    }
    return false;
  };

  for (const b of bases) {
    if (suiteN && testCle(`${b}|APT ${suiteN}`)) break;
    if (testCle(b)) break;
  }
  let optionsAmbigues: string[] | undefined;
  if (!cleAppariee) {
    const hitsOrient: string[] = [];
    for (const b of bases) {
      for (const o of ORIENTATIONS) {
        const cle = suiteN ? `${b} ${o}|APT ${suiteN}` : `${b} ${o}`;
        if (vus.has(cle)) continue;
        vus.add(cle);
        const hit = map[cle];
        if (hit && hit.length > 0 && !hitsOrient.includes(cle)) {
          hitsOrient.push(cle);
        }
      }
    }
    if (hitsOrient.length === 1) {
      cleAppariee = hitsOrient[0];
      fiches = map[hitsOrient[0]];
    } else if (hitsOrient.length > 1) {
      optionsAmbigues = hitsOrient;
    }
  }
  // Dernier recours : le type de voie a été omis ("2219 Duvernay",
  // "7620 47e"). On l'insère (AV, R, BOUL, …). Si plusieurs types
  // correspondent, l'adresse est ambiguë et les options sont
  // proposées plutôt que de choisir au hasard.
  if (!cleAppariee && !optionsAmbigues) {
    const hitsInsertion: string[] = [];
    for (const b of bases) {
      const parts = b.split(" ");
      if (parts.length < 2 || estTypeVoie(parts[1])) continue;
      const [civique, ...rue] = parts;
      for (const t of TYPES_VOIE_INSERTION) {
        // Type inséré après le civique ("2219 R DUVERNAY"), puis avec
        // l'ordre inversé ("280 5 IEME BOUL") : les rôles n'ordonnent
        // pas le type de voie pareil partout.
        const baseSansSuite = `${civique} ${t} ${rue.join(" ")}`;
        const inverse = varianteOrdreType(baseSansSuite);
        const candidats =
          inverse && inverse !== baseSansSuite
            ? [baseSansSuite, inverse]
            : [baseSansSuite];
        for (const cb of candidats) {
          const cle = suiteN ? `${cb}|APT ${suiteN}` : cb;
          if (vus.has(cle)) continue;
          vus.add(cle);
          const hit = map[cle];
          if (hit && hit.length > 0 && !hitsInsertion.includes(cle)) {
            hitsInsertion.push(cle);
          }
        }
      }
    }
    if (hitsInsertion.length === 1) {
      cleAppariee = hitsInsertion[0];
      fiches = map[hitsInsertion[0]];
    } else if (hitsInsertion.length > 1) {
      optionsAmbigues = hitsInsertion;
    }
  }
  if (optionsAmbigues) {
    return {
      found: false,
      reason: "adresse_ambigue",
      cleNormalisee: baseKey,
      options: optionsAmbigues,
    };
  }
  if (!cleAppariee || !fiches) {
    return {
      found: false,
      reason: "adresse_introuvable",
      cleNormalisee: baseKey,
    };
  }

  // Plusieurs fiches à la même adresse : on constitue le sous-ensemble
  // pertinent (méthodologie de validation), puis on retient la valeur
  // médiane haute — déterministe et robuste aux extrêmes.
  const seuil = factors.seuil_condo_m2;
  let pool = fiches;
  let note: string | undefined;
  const typeBien = input.typeBien;

  if (typeBien === "condo") {
    const petits = fiches.filter((r) => r[3] > 0 && r[3] < seuil);
    if (petits.length > 0) {
      pool = petits;
    } else {
      const maisons = fiches.filter((r) => TYPES[r[1]] === "maison");
      pool = maisons.length > 0 ? maisons : fiches;
      note = "Aucune unité de moins de 150 m² : classé « maison ».";
    }
  } else if (typeBien) {
    const filtres =
      typeBien === "maison"
        ? fiches.filter((r) => TYPES[r[1]] === "maison" && !(r[7] & 1))
        : fiches.filter((r) => TYPES[r[1]] === typeBien);
    if (filtres.length > 0) {
      pool = filtres;
    } else {
      const maisons = fiches.filter((r) => TYPES[r[1]] === "maison");
      pool = maisons.length > 0 ? maisons : fiches;
    }
  }

  const valsTriees = pool
    .map((r) => r[6])
    .filter((v) => v > 0)
    .sort((a, b) => a - b);
  const valRef =
    valsTriees.length > 0
      ? valsTriees[Math.floor(valsTriees.length / 2)]
      : pool[0]?.[6] ?? 0;
  const rec = pool.find((r) => r[6] === valRef) ?? pool[0];
  const [bIdx, tIdx, supT, supB, annee, nblog] = rec;
  const val = valRef;

  // Catégorie → facteur. Règle aveugle documentée : une fiche « maison »
  // de moins de 150 m² est traitée comme un condo (petites copropriétés
  // non marquées au rôle) ; au-delà, c'est le type du rôle qui compte.
  // Le drapeau condo du rôle ne sert qu'à la calibration, pas au calcul.
  let categorie: CategorieBien;
  if (typeBien === "condo" && !note) {
    categorie = "condo";
  } else if (typeBien && typeBien !== "condo") {
    categorie = typeBien;
  } else if (typeBien === "condo" /* repli */) {
    categorie = "maison";
  } else {
    categorie =
      TYPES[tIdx] === "maison" && supB > 0 && supB < seuil
        ? "condo"
        : (TYPES[tIdx] ?? "maison");
  }

  const facteur = getFacteur(factors, input.ville, bIdx, categorie);
  const pct = factors.fourchette_pct / 100;

  // Portée plex : "logement" = valeur indicative d'un seul logement
  // (valeur de l'immeuble ÷ nombre de logements). Sinon, l'immeuble
  // complet est estimé (comportement par défaut).
  let porteePlex: PorteePlex | undefined;
  let valCalculee = val;
  if (categorie === "plex" && input.porteePlex === "logement" && nblog > 1) {
    porteePlex = "logement";
    valCalculee = val / nblog;
  }

  const estimationBase = Math.round(valCalculee * facteur);
  // Note : aucun ajustement lié à la superficie du terrain n'est
  // appliqué — la valeur au rôle d'évaluation l'intègre déjà
  // (un petit terrain est déjà évalué moins cher qu'un grand).
  // La superficie reste affichée à titre informatif.
  const estimation = estimationBase;

  // Projection indicative à l'horizon demandé (optionnelle).
  // Scénario tendanciel amorti : le taux implicite de la calibration
  // mesure un rattrapage (rôle 2022-2024 → marché T2 2026), pas une
  // tendance soutenable. On le plafonne (plafond_taux_projection)
  // avant de le composer sur l'horizon. La valeur centrale reste la
  // VALEUR ACTUELLE ; la projection est un complément clairement
  // identifié, jamais un substitut.
  let projection: EstimateSuccess["projection"];
  const horizon =
    typeof input.projectionAnnees === "number" &&
    Number.isFinite(input.projectionAnnees)
      ? Math.round(input.projectionAnnees)
      : 0;
  if (horizon >= 1 && horizon <= 10) {
    const MS_PAR_AN = 365.25 * 24 * 3600 * 1000;
    const refMarche = new Date(`${ville.dateReferenceMarche}T00:00:00`);
    const anneesEcoulees = Math.max(
      0.5,
      (Date.now() - refMarche.getTime()) / MS_PAR_AN,
    );
    const tauxImplicite = Math.pow(facteur, 1 / anneesEcoulees) - 1;
    const taux = Math.min(tauxImplicite, factors.plafond_taux_projection);
    const mult = Math.pow(1 + taux, horizon);
    const estProj = Math.round(estimation * mult);
    projection = {
      annees: horizon,
      tauxAnnuelPct: Math.round(taux * 1000) / 10,
      estimation: estProj,
      fourchetteBasse: Math.round(estProj * (1 - pct)),
      fourchetteHaute: Math.round(estProj * (1 + pct)),
    };
  }

  return {
    found: true,
    ville: input.ville,
    villeNom: ville.nom,
    cleAppariee,
    adresseNormalisee: baseKey,
    ...(typeBien ? { typeBienDemande: typeBien } : {}),
    categorie,
    ...(porteePlex ? { porteePlex } : {}),
    facteur,
    valeurAuRole: Math.round(valCalculee),
    estimation,
    fourchetteBasse: Math.round(estimation * (1 - pct)),
    fourchetteHaute: Math.round(estimation * (1 + pct)),
    ...(projection ? { projection } : {}),
    superficieTerrainM2: supT,
    superficieBatimentM2: supB,
    anneeConstruction: annee,
    nbLogements: nblog,
    nbFichesAdresse: fiches.length,
    ...(note ? { note } : {}),
    ...(input.ville === "montreal"
      ? {
          arrondissement:
            factors.villes.montreal.boroughs_bidx?.[bIdx] ?? undefined,
        }
      : {}),
    millesimeRole: ville.millesimeRole,
    dateReferenceMarche: ville.dateReferenceMarche,
    referenceMarche: factors.reference_marche,
    avertissement: AVERTISSEMENT,
  };
}

/**
 * Cherche une adresse introuvable dans les autres villes couvertes.
 *
 * Repli côté API quand la ville sélectionnée ne contient pas l'adresse
 * (ex. une adresse de Laval cherchée avec « Montréal » sélectionné).
 * Ne sert qu'à suggérer la bonne ville — l'estimation elle-même reste
 * calculée ville par ville. Une adresse ambiguë (orientation E/O/N/S
 * à préciser) compte comme trouvée : l'adresse existe bien dans
 * cette ville.
 */
export function suggererAutresVilles(
  input: Pick<EstimateInput, "ville" | "adresse" | "suite">,
): { slug: VilleSlug; nom: string }[] {
  const out: { slug: VilleSlug; nom: string }[] = [];
  for (const v of VILLES) {
    if (v.slug === input.ville) continue;
    let r: EstimateResult;
    try {
      r = estimate({
        ville: v.slug as VilleSlug,
        adresse: input.adresse,
        suite: input.suite,
      });
    } catch {
      continue; // index indisponible : ville ignorée
    }
    if (r.found) {
      out.push({ slug: v.slug as VilleSlug, nom: v.nom });
    } else if (r.reason === "adresse_ambigue") {
      out.push({ slug: v.slug as VilleSlug, nom: v.nom });
    }
  }
  return out;
}

/**
 * Suggestions d'autocomplétion pour un champ d'adresse.
 *
 * - Frappe avec numéro civique ("550 rue saint-denis") : recherche
 *   par préfixe sur les clés normalisées, via dichotomie.
 * - Frappe sans numéro ("saint-denis", "rue saint-denis 550") :
 *   recherche par nom de rue sur l'index des rues, pour toutes les villes.
 */
export function suggestAddresses(
  ville: VilleSlug,
  query: string,
  limit = 8,
): string[] {
  const firstPrefix = normalizeAddress(query);
  if (!firstPrefix) {
    return suggestStreetQuery(ville, query, limit);
  }
  if (firstPrefix.length < 2) return [];
  // Tolérances cumulées sur le préfixe :
  // - ordinaux ("280 5EME" → "280 5 IEME" : "5e"/"5ème"/"5eme" tapés,
  //   "5 IEME" au rôle) ;
  // - ordre du type de voie ("47e Avenue" à Montréal, "Avenue 47e"
  //   à Laval) : on essaie les deux ordres pour l'autocomplétion aussi.
  const prefixes = [firstPrefix];
  const vus = new Set(prefixes);
  const addPrefix = (p: string | null) => {
    if (p && !vus.has(p)) {
      vus.add(p);
      prefixes.push(p);
    }
  };
  for (const v of variantesOrdinaux(firstPrefix)) addPrefix(v);
  for (const p of [...prefixes]) addPrefix(varianteOrdreType(p));
  const { sortedKeys } = loadIndex(ville);
  for (const prefix of prefixes) {
    const out = searchPrefix(sortedKeys, prefix);
    if (out.length > 0) return rankSuggestions(prefix, out).slice(0, limit);
  }
  // Dernier recours : le type de voie a été omis dans la frappe
  // ("7620 47e", "2219 Duvernay", "280 5e"). On essaie chaque type de
  // voie, dans les deux ordres, et on fusionne les suggestions.
  const merged: string[] = [];
  const seen = new Set<string>();
  for (const pre of prefixes) {
    const parts = pre.split(" ");
    if (parts.length < 2 || estTypeVoie(parts[1])) continue;
    const [civique, ...rue] = parts;
    for (const t of TYPES_VOIE_INSERTION) {
      const basePrefix = `${civique} ${t} ${rue.join(" ")}`;
      const inverse = varianteOrdreType(basePrefix);
      const tries =
        inverse && inverse !== basePrefix ? [basePrefix, inverse] : [basePrefix];
      for (const prefix of tries) {
        const out = rankSuggestions(prefix, searchPrefix(sortedKeys, prefix));
        for (const k of out) {
          if (seen.has(k)) continue;
          seen.add(k);
          merged.push(k);
          if (merged.length >= 60) break;
        }
        if (merged.length >= 60) break;
      }
      if (merged.length >= 60) break;
    }
    if (merged.length >= 60) break;
  }
  if (merged.length > 0) return merged.slice(0, limit);
  // Dernier repli : la frappe est peut-être un nom de rue dont le
  // début ressemble à un numéro civique ("5e avenue" → normalizeAddress
  // lit "5" + lettre "E" comme civique). On la relit comme une rue.
  return suggestStreetQuery(ville, query, limit);
}

/**
 * Interprète la frappe comme un nom de rue (sans numéro civique en
 * tête). Les chiffres finaux éventuels filtrent les numéros
 * ("saint-denis 550" → adresses en 550… de la rue Saint-Denis).
 */
function suggestStreetQuery(
  ville: VilleSlug,
  query: string,
  limit: number,
): string[] {
  const m = query.match(/^(.*?)\s*(\d+)\s*$/);
  const streetPart = (m ? m[1] : query).trim();
  const civicDigits = m ? m[2] : null;
  const streetNorm = normalizeStreet(streetPart);
  if (!streetNorm || streetNorm.length < 2) return [];
  return suggestByStreet(ville, streetNorm, civicDigits, limit);
}

/** "BOUL 5 IEME" ↔ "5 IEME BOUL" (nom de rue seul, sans civique). */
function swapStreetTypeOrder(street: string): string | null {
  const parts = street.split(" ");
  if (parts.length < 2) return null;
  const premier = parts[0];
  const dernier = parts[parts.length - 1];
  if (dernier === "E" || dernier === "O" || dernier === "N" || dernier === "S")
    return null;
  if (estTypeVoie(premier) && !estTypeVoie(dernier)) {
    return [...parts.slice(1), premier].join(" ");
  }
  if (estTypeVoie(dernier) && !estTypeVoie(premier)) {
    return [dernier, ...parts.slice(0, -1)].join(" ");
  }
  return null;
}

/**
 * Suggestions par nom de rue, quand la frappe ne commence pas par un
 * numéro civique ("saint-denis", "rue saint-denis", "saint-denis 550").
 *
 * streetNorm : nom de rue normalisé (normalizeStreet) ; civicDigits :
 * chiffres finaux éventuels pour filtrer les numéros ("550").
 * Dérivé des index d'adresses existants : fonctionne pour les 8 villes
 * sans reconstruire les index.
 */
function suggestByStreet(
  ville: VilleSlug,
  streetNorm: string,
  civicDigits: string | null,
  limit: number,
): string[] {
  const { streets, streetKeys, sortedKeys } = loadIndex(ville);
  // Tolérances : ordinaux ("5E BOUL" → "5 IEME BOUL") et ordre du
  // type de voie ("BOUL 5 IEME" ↔ "5 IEME BOUL").
  const streetPrefixes = [streetNorm];
  for (const v of variantesOrdinaux(streetNorm)) {
    if (!streetPrefixes.includes(v)) streetPrefixes.push(v);
  }
  // Sans type de voie en tête ("saint-denis") : on essaie chaque type
  // ("R ST-DENIS", "AV ST-DENIS", …) car les rues de l'index
  // commencent toujours par leur type.
  for (const p of [...streetPrefixes]) {
    if (!estTypeVoie(p.split(" ")[0])) {
      for (const t of TYPES_VOIE_INSERTION) {
        const tp = `${t} ${p}`;
        if (!streetPrefixes.includes(tp)) streetPrefixes.push(tp);
      }
    }
  }
  for (const p of [...streetPrefixes]) {
    const swapped = swapStreetTypeOrder(p);
    if (swapped && !streetPrefixes.includes(swapped))
      streetPrefixes.push(swapped);
  }
  const out: string[] = [];
  const seenStreets = new Set<string>();
  for (const prefix of streetPrefixes) {
    let lo = 0;
    let hi = streets.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (streets[mid] < prefix) lo = mid + 1;
      else hi = mid;
    }
    for (let i = lo; i < streets.length && out.length < 60; i++) {
      const st = streets[i];
      if (!st.startsWith(prefix)) break;
      if (seenStreets.has(st)) continue;
      seenStreets.add(st);
      const indices = streetKeys.get(st);
      if (!indices) continue;
      let pris = 0;
      for (const ki of indices) {
        const key = sortedKeys[ki];
        if (civicDigits) {
          const base = key.includes("|") ? key.slice(0, key.indexOf("|")) : key;
          const num = base.slice(0, base.indexOf(" "));
          if (!num.startsWith(civicDigits)) continue;
        }
        out.push(key);
        if (++pris >= 2 || out.length >= 60) break;
      }
    }
  }
  return out.slice(0, limit);
}

/** Recherche par préfixe sur les clés triées (dichotomie). */
function searchPrefix(sortedKeys: string[], prefix: string): string[] {
  let lo = 0;
  let hi = sortedKeys.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (sortedKeys[mid] < prefix) lo = mid + 1;
    else hi = mid;
  }
  const out: string[] = [];
  for (let i = lo; i < sortedKeys.length && out.length < 60; i++) {
    const k = sortedKeys[i];
    if (!k.startsWith(prefix)) break;
    out.push(k);
  }
  return out;
}

/**
 * Quand le dernier mot tapé est alphabétique ("9 av", "285 boul"),
 * on fait remonter les rues nommées devant les voies numérotées
 * ("9 AV SAURIOL" avant "9 AV 1RE") : l'utilisateur qui cherche une
 * voie numérotée tape un chiffre, qui garde l'ordre naturel.
 */
function rankSuggestions(prefix: string, out: string[]): string[] {
  const dernierMot = prefix.split(" ").pop() ?? "";
  if (/^[A-Z]{2,}$/.test(dernierMot)) {
    const commenceParChiffre = (k: string): number => {
      const c = k.slice(prefix.length).trim().charAt(0);
      return c >= "0" && c <= "9" ? 1 : 0;
    };
    out.sort((a, b) => commenceParChiffre(a) - commenceParChiffre(b));
  }
  return out;
}
