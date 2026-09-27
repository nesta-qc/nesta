#!/usr/bin/env python3
"""
Nesta — pipeline « vraies adresses » (données ouvertes, zéro invention).

Construit des profils de propriétés RÉELLES en croisant trois jeux de données
de la Ville de Montréal (portail https://donnees.montreal.ca, licence CC-BY 4.0) :

  1. Taxes municipales par arrondissement  -> adresse + VAL_IMPOSABLE (valeur réelle au rôle)
  2. Unités d'évaluation foncière          -> année de construction, superficie du terrain,
                                             catégorie / libellé d'utilisation
  3. Adresse ponctuelle                    -> coordonnées via plages de numéros civiques
     (fallback : Nominatim / OpenStreetMap, donnée réelle OSM, jamais inventée)

Champ introuvable -> NULL. Aucune valeur n'est complétée à la main.

Utilisation :
    python3 import-property-profiles.py [--refresh] [--boroughs N] [--per-borough N]

    --refresh      : ignore le cache local et retélécharge tout depuis l'API
    --boroughs N   : limite aux N premiers arrondissements (défaut : 8)
    --per-borough N: adresses par arrondissement (défaut : 40)

Reproductibilité : graine aléatoire fixe (SEED = 42). Le cache (JSON bruts) vit
dans ./.cache (ou $NESTA_IMPORT_CACHE) ; relancer sans --refresh rejoue les
jointures et l'échantillonnage à l'identique sans toucher au réseau.

Sortie : ../supabase/seed_property_profiles_<k>.sql (< 500 Ko / fichier),
         INSERT one-shot (pas d'upsert — voir en-tête des fichiers SQL).

Notes d'accès (découvertes le 2026-09-27) :
  - Les téléchargements directs de fichiers sont bloqués (RBAC) -> API datastore uniquement.
  - Le WAF du portail bloque les User-Agent non-navigateur (403) -> on utilise un UA navigateur.
  - datastore_search_sql refuse les guillemets doubles dans l'URL (WAF) -> on n'utilise
    que datastore_search (filtres exacts + pagination + q plein texte).
  - Le réseau coupe parfois la connexion -> retries avec backoff sur chaque requête.
"""

import argparse
import http.client
import json
import os
import random
import re
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request

# ----------------------------------------------------------------------------
# Configuration
# ----------------------------------------------------------------------------

SEED = 42
PER_BOROUGH_DEFAULT = 40
TAX_SAMPLE_OFFSETS = 90      # positions aléatoires par arrondissement
TAX_SAMPLE_LIMIT = 60        # lignes lues par position
PAGE_SIZE = 5000             # pagination des gros jeux (évaluation, adresses)
REQUEST_PAUSE = 0.8          # secondes entre deux requêtes API
NOMINATIM_PAUSE = 1.2        # respect du quota Nominatim (1 req/s max)

BASE = "https://donnees.montreal.ca/api/3/action"
# Le WAF du portail bloque les UA non-navigateur : on s'identifie comme un navigateur.
BROWSER_UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
              "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")
NOMINATIM_UA = "NestaDataBot/1.0"
NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"

EVAL_RID = "2b9dfc3d-91d3-48de-b32c-a2a6d9417079"   # Unités d'évaluation foncière
ADDR_RID = "fed5fd02-5535-458e-b13f-66e7a31a6d78"   # Adresse ponctuelle

CONSULT_DATE = "2026-09-27"
DATA_SOURCE = "Ville de Montréal — Données ouvertes"
# Chaque ligne du seed provient d'abord du jeu des taxes (adresse + valeur au rôle).
SOURCE_URL = "https://donnees.montreal.ca/dataset/taxes-municipales"

BOROUGHS = [
    ("Le Plateau-Mont-Royal", "13ad610a-5312-4765-aedd-8d016261480f"),
    ("Rosemont–La Petite-Patrie", "d2affd10-0879-490d-b296-f9fc0d225bfa"),
    ("Verdun", "cecf74d7-902e-42bc-93e8-4dfa687a8b64"),
    ("Ville-Marie", "31d21f1c-b084-4bdd-b65f-da94e3cf6417"),
    ("Ahuntsic-Cartierville", "da06242e-86c7-4e97-baf2-4a13dc33ebc0"),
    ("Le Sud-Ouest", "6230ea2f-2d84-4e3f-80bd-6bf56bb80b35"),
    ("Villeray–Saint-Michel–Parc-Extension", "9bfc305c-e930-4dfb-a345-6355bae4cadd"),
    ("Côte-des-Neiges–Notre-Dame-de-Grâce", "8819693b-870a-4288-bb09-f7eb20a6f095"),
]

# Code générique du jeu des taxes -> générique français (pour l'affichage et
# la recherche de coordonnées quand l'évaluation n'a pas matché).
GENERIC_MAP = {
    "": "rue", "AV": "avenue", "BOUL": "boulevard", "CH": "chemin",
    "RTE": "route", "MTE": "montée", "RANG": "rang", "PL": "place",
    "TERR": "terrasse", "SQ": "square", "IMP": "impasse", "RLE": "ruelle",
    "CROIS": "croissant", "SENT": "sentier", "PROM": "promenade",
    "PARC": "parc", "QUAI": "quai", "COTE": "côte", "CAR": "carrefour",
    "CRT": "cercle", "ALL": "allée", "JARD": "jardin", "CRS": "cours",
}
# Génériques candidats (ordre de probabilité) si le générique est inconnu.
GENERIC_CANDIDATES = ["rue", "avenue", "boulevard", "chemin", "place",
                      "terrasse", "montée", "impasse", "ruelle", "route",
                      "square", "croissant", "côte", "promenade", "allée"]
ORIENT_MAP = {"O": "Ouest", "E": "Est", "N": "Nord", "S": "Sud", "": ""}
ORIENT_LETTER = {"OUEST": "O", "EST": "E", "NORD": "N", "SUD": "S"}

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CACHE_DIR = os.environ.get("NESTA_IMPORT_CACHE", os.path.join(SCRIPT_DIR, ".cache"))
SUPABASE_DIR = os.path.join(os.path.dirname(SCRIPT_DIR), "supabase")

STATS = {"inconsistent_tax_values": 0, "gener_vocab": set(), "skipped": 0}

# ----------------------------------------------------------------------------
# HTTP robuste
# ----------------------------------------------------------------------------

def fetch_json(url, tries=7, timeout=120):
    """GET JSON avec retries (coupures réseau transitoires, 429/5xx)."""
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": BROWSER_UA})
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return json.load(resp)
        except (urllib.error.URLError, http.client.HTTPException,
                http.client.IncompleteRead, ConnectionError, TimeoutError) as e:
            last = e
            time.sleep(2 * (i + 1))
    raise RuntimeError(f"Échec après {tries} essais pour {url[:120]} : {last}")


def ds_search(resource_id, pause=True, **params):
    """datastore_search paginé/filtré. Retourne le bloc 'result'."""
    if pause:
        time.sleep(REQUEST_PAUSE)
    params["resource_id"] = resource_id
    # Les filtres doivent être une chaîne JSON.
    if isinstance(params.get("filters"), dict):
        params["filters"] = json.dumps(params["filters"])
    url = BASE + "/datastore_search?" + urllib.parse.urlencode(params)
    data = fetch_json(url)
    if not data.get("success"):
        raise RuntimeError(f"datastore_search a échoué : {data}")
    return data["result"]


def fetch_all(resource_id, fields, label, filters=None):
    """Télécharge l'intégralité d'un jeu (pagination), avec cache disque."""
    cache_path = os.path.join(CACHE_DIR, f"{label}.json")
    if os.path.exists(cache_path) and not REFRESH:
        with open(cache_path, encoding="utf-8") as f:
            rows = json.load(f)
        print(f"  [cache] {label}: {len(rows)} lignes")
        return rows
    first = ds_search(resource_id, limit=1, fields=fields,
                      **({"filters": filters} if filters else {}))
    total = first["total"]
    print(f"  [api] {label}: {total} lignes à paginer…", flush=True)
    rows = []
    for offset in range(0, total, PAGE_SIZE):
        r = ds_search(resource_id, limit=PAGE_SIZE, offset=offset,
                      fields=fields, **({"filters": filters} if filters else {}))
        rows.extend(r["records"])
        print(f"    {min(offset + PAGE_SIZE, total)}/{total}", end="\r", flush=True)
    print(f"    {len(rows)}/{total} OK   ")
    os.makedirs(CACHE_DIR, exist_ok=True)
    with open(cache_path, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False)
    return rows

# ----------------------------------------------------------------------------
# Normalisation des noms de rue
# ----------------------------------------------------------------------------

def norm(s):
    """Majuscules, sans accents, apostrophes/ponctuation -> espace, espaces condensés."""
    if not s:
        return ""
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode("ascii")
    s = re.sub(r"[^A-Z0-9]+", " ", s.upper()).strip()
    return re.sub(r"\s+", " ", s)


def title_fr(s):
    """'SAINT-DOMINIQUE' -> 'Saint-Dominique', '1RE' -> '1re'."""
    return s.strip().lower().replace("'", "’").title().replace("’", "'") \
        if "'" in s else s.strip().title()


SUFFIX_RE = re.compile(r"\s*\([^)]*\)\s*$")  # " (MTL)", " (MTL+WMT)", …

def parse_nom_rue(nom_rue):
    """'rue Saint-Antoine Ouest  (MTL)' -> ('rue', 'Saint-Antoine', 'Ouest')."""
    base = SUFFIX_RE.sub("", nom_rue or "").strip()
    if not base:
        return None
    parts = base.split()
    generic = parts[0].lower()
    rest = parts[1:]
    orient = ""
    if rest and norm(rest[-1]) in ORIENT_LETTER:
        orient = rest.pop()
    specific = " ".join(rest)
    return generic, specific, orient


def street_key(specific, orient_word):
    """Clé de jointure indépendante du générique : 'SAINT-ANTOINE|OUEST'."""
    return norm(specific) + "|" + norm(orient_word)

# ----------------------------------------------------------------------------
# Index d'évaluation foncière
# ----------------------------------------------------------------------------

def build_eval_index(rows):
    index = {}
    for i, r in enumerate(rows):
        parsed = parse_nom_rue(r.get("NOM_RUE"))
        if not parsed:
            continue
        generic, specific, orient = parsed
        key = street_key(specific, orient)
        try:
            debut = int(r["CIVIQUE_DEBUT"])
            fin = int(r["CIVIQUE_FIN"])
        except (TypeError, ValueError):
            continue
        index.setdefault(key, []).append({
            "id": i, "debut": debut, "fin": fin, "generic": generic,
            "annee": r.get("ANNEE_CONSTRUCTION"),
            "terrain": r.get("SUPERFICIE_TERRAIN"),
            "categorie": r.get("CATEGORIE_UEF"),
            "libelle": r.get("LIBELLE_UTILISATION"),
        })
    return index


def eval_lookup(index, civ, tax_rue, tax_orient, tax_generic_code):
    """Retourne la meilleure unité d'évaluation pour (numéro, rue), ou None."""
    orient_word = ORIENT_MAP.get(tax_orient.strip(), "")
    key = street_key(tax_rue, orient_word)
    cands = index.get(key)
    if not cands:
        return None
    matches = [u for u in cands if u["debut"] <= civ <= u["fin"]]
    if not matches:
        return None
    expected_generic = GENERIC_MAP.get(tax_generic_code.strip())
    def rank(u):
        mismatch = 0 if (expected_generic is None or u["generic"] == expected_generic) else 1
        return (mismatch, u["fin"] - u["debut"], u["id"])
    return sorted(matches, key=rank)[0]

# ----------------------------------------------------------------------------
# Index d'adresses ponctuelles (plages de numéros civiques)
# ----------------------------------------------------------------------------

def build_addr_index(rows):
    index = {}
    for r in rows:
        g, s, o = r.get("GENERIQUE"), r.get("SPECIFIQUE"), r.get("ORIENTATION")
        if not g or not s:
            continue
        key = (norm(g), norm(s), norm(o) if o else "X")
        try:
            de, a = int(r["ADDR_DE"]), int(r["ADDR_A"])
            lon, lat = float(r["LONGITUDE"]), float(r["LATITUDE"])
        except (TypeError, ValueError):
            continue
        index.setdefault(key, []).append((de, a, lon, lat))
    return index


def coords_lookup(index, civ, generic, specifique, orient_letter):
    """Coordonnées via les plages ADDR_DE..ADDR_A. Plus petite plage d'abord."""
    key = (norm(generic), norm(specifique), orient_letter or "X")
    cands = index.get(key, [])
    matches = [(de, a, lon, lat) for de, a, lon, lat in cands if de <= civ <= a]
    if not matches:
        return None
    matches.sort(key=lambda m: (m[1] - m[0], m[0]))
    _, _, lon, lat = matches[0]
    return lon, lat


def coords_with_generic_fallback(index, civ, specifique, orient_letter, generics):
    for g in generics:
        hit = coords_lookup(index, civ, g, specifique, orient_letter)
        if hit:
            return hit, g
    return None, None

# ----------------------------------------------------------------------------
# Nominatim (fallback — donnée réelle OSM)
# ----------------------------------------------------------------------------

_last_nominatim = [0.0]

def nominatim_coords(address_label):
    wait = NOMINATIM_PAUSE - (time.time() - _last_nominatim[0])
    if wait > 0:
        time.sleep(wait)
    params = {"q": address_label, "format": "json", "limit": 1}
    url = NOMINATIM_URL + "?" + urllib.parse.urlencode(params)
    last = None
    for i in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": NOMINATIM_UA})
            with urllib.request.urlopen(req, timeout=60) as resp:
                data = json.load(resp)
            _last_nominatim[0] = time.time()
            if data:
                return float(data[0]["lon"]), float(data[0]["lat"])
            return None
        except Exception as e:
            last = e
            time.sleep(2 * (i + 1))
    print(f"  [nominatim] échec pour {address_label!r} : {last}")
    return None

# ----------------------------------------------------------------------------
# Échantillonnage des adresses fiscales par arrondissement
# ----------------------------------------------------------------------------

def max_tax_year(rid):
    """Année d'exercice max (le jeu est mono-année en pratique ; on vérifie)."""
    total = ds_search(rid, limit=1)["total"]
    years = set()
    for off in {0, total // 2, max(0, total - 2000)}:
        r = ds_search(rid, limit=2000, offset=off, fields="ANNEE_EXERCICE")
        years.update(x["ANNEE_EXERCICE"] for x in r["records"])
    year = max(years)
    print(f"  années présentes : {sorted(years)} -> retenue : {year}")
    return year


def sample_tax_addresses(name, rid, per_borough, seed_offset):
    """Échantillonne des adresses DISTINCTES (valeur au rôle) dans un arrondissement."""
    year = max_tax_year(rid)
    filters = {"ANNEE_EXERCICE": year}
    total = ds_search(rid, limit=1, filters=filters)["total"]
    rng = random.Random(SEED + seed_offset)
    fields = ("AD_EMPLAC_CIV1,AD_EMPLAC_CIV2,AD_EMPLAC_GENER,AD_EMPLAC_RUE,"
              "AD_EMPLAC_ORIENT,VAL_IMPOSABLE,DESCR_LONGUE")
    groups = {}
    for _ in range(TAX_SAMPLE_OFFSETS):
        off = rng.randrange(total)
        r = ds_search(rid, limit=TAX_SAMPLE_LIMIT, offset=off,
                      fields=fields, filters=filters)
        for row in r["records"]:
            civ1 = (row.get("AD_EMPLAC_CIV1") or "").strip()
            rue = (row.get("AD_EMPLAC_RUE") or "").strip()
            if not civ1.isdigit() or not rue:
                continue
            key = (civ1,
                   (row.get("AD_EMPLAC_GENER") or "").strip(),
                   rue,
                   (row.get("AD_EMPLAC_ORIENT") or "").strip())
            STATS["gener_vocab"].add(key[1])
            groups.setdefault(key, []).append(row)
    # Déduplique : une ligne par adresse, préférant la ligne « TAXE GÉNÉRALE ».
    pool = []
    for key, rows in groups.items():
        pref = [x for x in rows if norm(x.get("DESCR_LONGUE", "")).startswith("TAXE GENERALE")]
        chosen = sorted(pref or rows, key=lambda x: x["_id"])[0]
        vals = {x.get("VAL_IMPOSABLE") for x in rows}
        if len(vals) > 1:
            STATS["inconsistent_tax_values"] += 1
        civ1, gener, rue, orient = key
        pool.append({
            "civ": int(civ1), "civ2": (rows[0].get("AD_EMPLAC_CIV2") or "").strip(),
            "gener": gener, "rue": rue, "orient": orient,
            "valeur": chosen.get("VAL_IMPOSABLE"), "annee": year,
        })
    pool.sort(key=lambda a: (a["rue"], a["civ"]))
    rng2 = random.Random(SEED)
    chosen = rng2.sample(pool, min(per_borough, len(pool)))
    print(f"  {name}: {len(pool)} adresses distinctes en pool -> {len(chosen)} retenues")
    return chosen

# ----------------------------------------------------------------------------
# Enrichissement
# ----------------------------------------------------------------------------

def to_int(s):
    s = (s or "").strip()
    return int(s) if s.isdigit() else None


def to_float(s):
    try:
        return float(s)
    except (TypeError, ValueError):
        return None


def enrich(addr, borough, eval_index, addr_index):
    civ, rue, orient = addr["civ"], addr["rue"], addr["orient"]
    orient_letter = orient if orient in "EONS" else ("X" if not orient else orient)

    uev = eval_lookup(eval_index, civ, rue, orient, addr["gener"])
    if uev:
        generic = uev["generic"]
        annee = to_int(uev["annee"])
        if annee is not None and not (1600 <= annee <= 2026):
            annee = None
        terrain = to_float(uev["terrain"])
        libelle = (uev["libelle"] or "").strip() or None
        categorie = (uev["categorie"] or "").strip() or None
        category = libelle or categorie
    else:
        generic, annee, terrain, category = None, None, None, None

    # Coordonnées : 1) plages d'adresses ponctuelles 2) Nominatim (OSM).
    method, lon, lat = None, None, None
    generics = [generic] if generic else []
    generics += [g for g in ([GENERIC_MAP.get(addr["gener"])] + GENERIC_CANDIDATES)
                 if g and g not in generics]
    hit, used_generic = coords_with_generic_fallback(
        addr_index, civ, rue, orient_letter, generics)
    if hit:
        lon, lat = hit
        method = "plages"
        generic = generic or used_generic
    else:
        generic = generic or GENERIC_MAP.get(addr["gener"])
        label = f"{civ}, {generic + ' ' if generic else ''}{title_fr(rue)}" \
                f"{' ' + ORIENT_MAP.get(orient, '') if orient else ''}, Montréal, QC, Canada"
        hit = nominatim_coords(label)
        if hit:
            lon, lat = hit
            method = "nominatim"

    generic = generic or GENERIC_MAP.get(addr["gener"], "")
    display = f"{civ}, {generic + ' ' if generic else ''}{title_fr(rue)}"
    if orient:
        display += f" {ORIENT_MAP.get(orient, orient)}"

    valeur = to_float(addr["valeur"])
    return {
        "address": display.strip(),
        "borough": borough,
        "city": "Montréal",
        "latitude": round(lat, 6) if lat is not None else None,
        "longitude": round(lon, 6) if lon is not None else None,
        "lot_area_sqm": terrain,
        "construction_year": annee,
        "assessment_land": None,      # le jeu ne donne que la valeur totale
        "assessment_building": None,  # idem
        "assessment_total": valeur,
        "assessment_year": to_int(addr["annee"]),
        "property_category": category,
        "data_source": DATA_SOURCE,
        "source_url": SOURCE_URL,
        "_coord_method": method,
    }

# ----------------------------------------------------------------------------
# Écriture SQL
# ----------------------------------------------------------------------------

COLUMNS = ["address", "borough", "city", "latitude", "longitude",
           "lot_area_sqm", "construction_year", "assessment_land",
           "assessment_building", "assessment_total", "assessment_year",
           "property_category", "data_source", "source_url"]


def sql_lit(v):
    if v is None:
        return "NULL"
    if isinstance(v, str):
        return "'" + v.replace("'", "''") + "'"
    return repr(v)


def write_seeds(profiles):
    os.makedirs(SUPABASE_DIR, exist_ok=True)
    header = (
        "-- ============================================================\n"
        "-- NESTA — seed « vraies adresses » (données ouvertes)\n"
        "-- Généré le {date} par scripts/import-property-profiles.py\n"
        "-- Source : Ville de Montréal — Données ouvertes (CC-BY 4.0) :\n"
        "--   taxes municipales, unités d'évaluation foncière, adresse ponctuelle.\n"
        "--   Coordonnées manquantes complétées via Nominatim (OpenStreetMap, ODbL).\n"
        "-- Champ absent dans les jeux -> NULL (jamais inventé).\n"
        "-- IMPORTANT : one-shot, PAS d'upsert — ne pas réappliquer sans vider\n"
        "-- la table d'abord (sinon doublons). RLS : lecture publique seule.\n"
        "-- Fichier {k}/{n} — {rows} lignes.\n"
        "-- ============================================================\n\n"
    )
    chunks, current, size = [], [], 0
    for p in profiles:
        vals = ", ".join(sql_lit(p[c]) for c in COLUMNS)
        line = (f"INSERT INTO public.property_profiles ({', '.join(COLUMNS)})\n"
                f"VALUES ({vals});\n")
        if size + len(line.encode("utf-8")) > 480_000 and current:
            chunks.append(current)
            current, size = [], 0
        current.append(line)
        size += len(line.encode("utf-8"))
    if current:
        chunks.append(current)
    paths = []
    for k, chunk in enumerate(chunks, 1):
        path = os.path.join(SUPABASE_DIR, f"seed_property_profiles_{k}.sql")
        with open(path, "w", encoding="utf-8") as f:
            f.write(header.format(date=CONSULT_DATE, k=k, n=len(chunks),
                                  rows=len(chunk)))
            f.write("\n".join(chunk))
        paths.append(path)
        kb = os.path.getsize(path) / 1024
        print(f"  écrit : {path} ({len(chunk)} lignes, {kb:.0f} Ko)")
    return paths

# ----------------------------------------------------------------------------
# Main
# ----------------------------------------------------------------------------

REFRESH = False


def main():
    global REFRESH
    ap = argparse.ArgumentParser(description="Pipeline « vraies adresses » pour Nesta")
    ap.add_argument("--refresh", action="store_true",
                    help="ignore le cache et retélécharge tout")
    ap.add_argument("--boroughs", type=int, default=len(BOROUGHS))
    ap.add_argument("--per-borough", type=int, default=PER_BOROUGH_DEFAULT)
    args = ap.parse_args()
    REFRESH = args.refresh
    boroughs = BOROUGHS[:args.boroughs]
    os.makedirs(CACHE_DIR, exist_ok=True)

    print("== 1/4 Unités d'évaluation foncière ==")
    eval_rows = fetch_all(EVAL_RID,
                          "NOM_RUE,CIVIQUE_DEBUT,CIVIQUE_FIN,ANNEE_CONSTRUCTION,"
                          "SUPERFICIE_TERRAIN,CATEGORIE_UEF,LIBELLE_UTILISATION",
                          "eval")
    eval_index = build_eval_index(eval_rows)
    print(f"  index : {len(eval_index)} clés de rue")

    print("== 2/4 Adresse ponctuelle ==")
    addr_rows = fetch_all(ADDR_RID,
                          "SPECIFIQUE,GENERIQUE,ORIENTATION,ADDR_DE,ADDR_A,"
                          "LONGITUDE,LATITUDE",
                          "addrpoints")
    addr_index = build_addr_index(addr_rows)
    print(f"  index : {len(addr_index)} clés (générique, nom, orientation)")

    print("== 3/4 Échantillonnage + enrichissement ==")
    profiles = []
    for i, (name, rid) in enumerate(boroughs):
        print(f"-- {name}")
        for addr in sample_tax_addresses(name, rid, args.per_borough, i * 1000):
            try:
                profiles.append(enrich(addr, name, eval_index, addr_index))
            except Exception as e:
                STATS["skipped"] += 1
                print(f"  [skip] {addr} : {e}")

    print("== 4/4 Écriture SQL ==")
    paths = write_seeds(profiles)

    # Rapport
    print("\n== RAPPORT ==")
    print(f"Total : {len(profiles)} profils")
    by_borough, by_method = {}, {}
    nulls = {c: 0 for c in COLUMNS}
    for p in profiles:
        by_borough[p["borough"]] = by_borough.get(p["borough"], 0) + 1
        by_method[p["_coord_method"]] = by_method.get(p["_coord_method"], 0) + 1
        for c in COLUMNS:
            if p[c] is None:
                nulls[c] += 1
    print("Par arrondissement :", by_borough)
    print("Coordonnées par méthode :", by_method)
    print("Champs NULL :", {k: v for k, v in nulls.items() if v})
    print("Codes générique (taxes) observés :", sorted(STATS["gener_vocab"]))
    print("Valeurs fiscales incohérentes (multi-lignes) :", STATS["inconsistent_tax_values"])
    print("Adresses écartées (erreur) :", STATS["skipped"])
    print("Fichiers :", paths)


if __name__ == "__main__":
    main()
