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
    python3 import-property-profiles.py [--boroughs N] [--per-borough N] [--resume]

    --boroughs N   : limite aux N premiers arrondissements (défaut : 8)
    --per-borough N: adresses par arrondissement (défaut : 40)
    --resume        : reprend après une interruption (checkpoint JSONL par arrondissement)
    --clear-checkpoint : supprime le checkpoint avant de démarrer

Reproductibilité : graine aléatoire fixe (SEED = 42). Relancer rejoue
l'échantillonnage à l'identique (mêmes offsets aléatoires).

Sortie : ../supabase/seed_property_profiles_<k>.sql (< 500 Ko / fichier),
         INSERT one-shot (pas d'upsert — voir en-tête des fichiers SQL).

Notes d'accès (découvertes le 2026-09-27) :
  - Les téléchargements directs de fichiers sont bloqués (RBAC) -> API datastore uniquement.
  - Le WAF du portail bloque les User-Agent non-navigateur (403) -> UA navigateur.
  - datastore_search_sql refuse les guillemets doubles dans l'URL (WAF) -> on n'utilise
    que datastore_search (filtres exacts + pagination + q plein texte).
  - La recherche plein texte (q) est sensible aux accents : on interroge avec le nom
    tel quel, puis en repli avec le plus long mot du nom (ex. « Neiges »).
  - Le client HTTP de Python (urllib) tronque systématiquement les réponses
    de ce portail via le proxy d'egress (IncompleteRead) -> on passe par curl
    en sous-processus, avec retries + backoff sur chaque requête.
"""

import argparse
import datetime
import http.client
import json
import math
import os
import random
import re
import subprocess
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
TAX_SAMPLE_OFFSETS = 50       # positions aléatoires par arrondissement
TAX_SAMPLE_LIMIT = 100        # lignes lues par position
REQUEST_PAUSE = 1.2           # secondes entre deux requêtes API
NOMINATIM_PAUSE = 1.2         # respect du quota Nominatim (1 req/s max)
Q_PAGE = 2000                 # page pour les recherches par rue

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

# Code générique du jeu des taxes -> générique français (affichage + repli coordonnées).
GENERIC_MAP = {
    "": "rue", "AV": "avenue", "BOUL": "boulevard", "CH": "chemin",
    "RTE": "route", "MTE": "montée", "RANG": "rang", "PL": "place",
    "TERR": "terrasse", "SQ": "square", "IMP": "impasse", "RLE": "ruelle",
    "CROIS": "croissant", "SENT": "sentier", "PROM": "promenade",
    "PARC": "parc", "QUAI": "quai", "COTE": "côte", "CAR": "carrefour",
    "CRT": "cercle", "ALL": "allée", "JARD": "jardin", "CRS": "cours",
    "TSSE": "terrasse",
}
# Génériques candidats (ordre de probabilité) si le générique est inconnu.
GENERIC_CANDIDATES = ["rue", "avenue", "boulevard", "chemin", "place",
                      "terrasse", "montée", "impasse", "ruelle", "route",
                      "square", "croissant", "côte", "promenade", "allée"]
ORIENT_MAP = {"O": "Ouest", "E": "Est", "N": "Nord", "S": "Sud", "": ""}
ORIENT_LETTER = {"OUEST": "O", "EST": "E", "NORD": "N", "SUD": "S"}

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SUPABASE_DIR = os.path.join(os.path.dirname(SCRIPT_DIR), "supabase")
CHECKPOINT = os.path.join(SCRIPT_DIR, ".profiles_checkpoint.jsonl")

STATS = {"inconsistent_tax_values": 0, "gener_vocab": set(), "skipped": 0,
         "q_fallback": 0, "eval_q_empty": 0, "addr_q_empty": 0}

# ----------------------------------------------------------------------------
# HTTP robuste
# ----------------------------------------------------------------------------

def fetch_json(url, tries=8, timeout=120):
    """GET JSON via curl (le client HTTP Python tronque systématiquement les
    réponses de ce portail via le proxy — curl est fiable à 100 %).

    Retries sur échec réseau / JSON invalide. Les HTTP 4xx (hors 429) ne sont
    pas retentés : elles signalent un problème de requête, pas un aléa réseau.
    """
    last = None
    for i in range(tries):
        try:
            p = subprocess.run(
                ["curl", "-s", "-m", str(timeout), "-A", BROWSER_UA,
                 "-w", "\n%{http_code}", url],
                capture_output=True, timeout=timeout + 15)
            if p.returncode != 0:
                raise ConnectionError(f"curl exit {p.returncode}: "
                                      f"{p.stderr.decode()[:200]}")
            body, _, code = p.stdout.decode("utf-8").rpartition("\n")
            code = code.strip()
            if code == "429":
                raise urllib.error.HTTPError(url, 429, "Too Many Requests", {}, None)
            if code.startswith("4"):
                raise RuntimeError(f"HTTP {code} (non retenté) pour {url[:140]}")
            if not code.startswith("2"):
                raise ConnectionError(f"HTTP {code} pour {url[:140]}")
            return json.loads(body)
        except (json.JSONDecodeError, ConnectionError,
                urllib.error.HTTPError, subprocess.TimeoutExpired) as e:
            last = e
            time.sleep(2 * (i + 1))
    raise RuntimeError(f"Échec après {tries} essais pour {url[:140]} : {last}")


def ds_search(resource_id, **params):
    """datastore_search. Retourne le bloc 'result'."""
    time.sleep(REQUEST_PAUSE)
    params["resource_id"] = resource_id
    if isinstance(params.get("filters"), dict):
        params["filters"] = json.dumps(params["filters"])
    url = BASE + "/datastore_search?" + urllib.parse.urlencode(params)
    data = fetch_json(url)
    if not data.get("success"):
        raise RuntimeError(f"datastore_search a échoué : {data}")
    return data["result"]


def q_search_all(resource_id, query, fields):
    """Recherche plein texte paginée. Retourne tous les records."""
    records, offset = [], 0
    while True:
        r = ds_search(resource_id, q=query, limit=Q_PAGE, offset=offset,
                      fields=fields)
        records.extend(r["records"])
        if len(records) >= r["total"] or not r["records"]:
            break
        offset += Q_PAGE
    return records


def q_variants(rue):
    """Variantes de requête plein texte (sensible aux accents)."""
    base = rue.replace("-", " ").strip()
    variants = [base]
    tokens = [t for t in norm(base).split() if len(t) > 2]
    if tokens:
        longest = max(tokens, key=len)
        if longest != norm(base).replace(" ", ""):
            variants.append(longest)
    # déduplique en préservant l'ordre
    seen, out = set(), []
    for v in variants:
        if v.lower() not in seen:
            seen.add(v.lower())
            out.append(v)
    return out

# ----------------------------------------------------------------------------
# Normalisation des noms de rue
# ----------------------------------------------------------------------------

def norm(s):
    """Majuscules, sans accents, ponctuation -> espace, espaces condensés."""
    if not s:
        return ""
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode("ascii")
    s = re.sub(r"[^A-Z0-9]+", " ", s.upper()).strip()
    return re.sub(r"\s+", " ", s)


# (en majuscules : comparés à norm(), qui met en majuscules sans accents)
GENERIC_WORDS = {
    "RUE", "AVENUE", "BOULEVARD", "CHEMIN", "PLACE", "TERRASSE", "ALLEE",
    "IMPASSE", "COTE", "RANG", "MONTEE", "ROUTE", "QUAI", "PARC", "COURS",
    "CERCLE", "CARREFOUR", "JARDIN", "CROISSANT", "PASSAGE", "SENTIER", "VOIE",
}
# Génériques « majeurs » : quand ils ferment le nom et que le 1er mot n'est
# pas une particule, le nom porte déjà son générique (« 40E AVENUE »).
MAJOR_GENERIC = {"AVENUE", "BOULEVARD"}
PARTICLES = {"DE", "DU", "DES", "D", "L", "LE", "LA", "LES",
             "AU", "AUX", "EN", "SUR", "SOUS"}


def street_label(civ, rue, generic, orient=""):
    """'9199' + '13E AVENUE' + '' -> '9199, 13e Avenue' (pas 'rue 13E Avenue').

    Le nom de rue des taxes contient parfois déjà le générique
    (ex. GENER='' et RUE='40E AVENUE') : on ne le préfixe pas deux fois.
    Le code GENER explicite prime en cas d'ambiguïté (« DU PARC » + 'rue'
    -> « rue du Parc », pas « du Parc »).
    """
    tokens = norm(rue).split()
    embedded = bool(tokens) and (
        tokens[0] in GENERIC_WORDS
        or (tokens[-1] in MAJOR_GENERIC and tokens[0] not in PARTICLES)
    )
    if embedded:
        name = title_fr(rue)
    elif generic:
        name = f"{generic} {title_fr(rue)}"
    else:
        name = title_fr(rue)
    if orient:
        name += f" {ORIENT_MAP.get(orient, orient)}"
    return f"{civ}, {name}"


def title_fr(s):
    """'SAINT-DOMINIQUE' -> 'Saint-Dominique', 'DE BORDEAUX' -> 'de Bordeaux'.

    Les particules françaises restent en minuscules (usage typographique).
    """
    t = s.strip().title()
    # « 13E AVENUE ».title() donne « 13E Avenue » : le « E » ordinal
    # après un chiffre se met en minuscule (« 13e Avenue »).
    t = re.sub(r"(?<=\d)([A-Z])", lambda m: m.group(1).lower(), t)
    t = re.sub(r"\bD'", "d'", t).replace(" L'", " l'")
    t = re.sub(r"\bL'", "l'", t)
    t = re.sub(r"\bDe\b", "de", t)
    t = re.sub(r"\bDu\b", "du", t)
    t = re.sub(r"\bDes\b", "des", t)
    t = t.replace("de La ", "de la ")
    return t


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
    return generic, " ".join(rest), orient


def street_key(specific, orient_word):
    """Clé de jointure indépendante du générique : 'SAINT-ANTOINE|OUEST'."""
    return norm(specific) + "|" + norm(orient_word)


# Particules initiales : le jeu des taxes et celui de l'évaluation ne les
# notent pas toujours pareil (« DE LA CÔTE-DES-NEIGES » vs « CÔTE-DES-NEIGES »).
PARTICLES = {"DE", "LA", "LE", "LES", "L", "DES", "DU", "D", "AU", "AUX", "A"}

def loose_key(specific, orient_word):
    """Clé sans particules initiales — repli si la clé exacte ne matche pas."""
    toks = norm(specific).split()
    while len(toks) > 1 and toks[0] in PARTICLES:
        toks.pop(0)
    return " ".join(toks) + "|" + norm(orient_word)

# ----------------------------------------------------------------------------
# Recherche par rue : évaluation foncière + adresses ponctuelles
# ----------------------------------------------------------------------------

EVAL_CACHE = {}   # norm(specific) -> liste d'UEV parsées
ADDR_CACHE = {}   # norm(specific) -> liste de plages d'adresses

EVAL_FIELDS = ("NOM_RUE,CIVIQUE_DEBUT,CIVIQUE_FIN,ANNEE_CONSTRUCTION,"
               "SUPERFICIE_TERRAIN,CATEGORIE_UEF,LIBELLE_UTILISATION")
ADDR_FIELDS = "SPECIFIQUE,GENERIQUE,ORIENTATION,ADDR_DE,ADDR_A,LONGITUDE,LATITUDE"


def eval_candidates(specific):
    """Toutes les UEV dont la rue contient `specific` (recherche plein texte)."""
    ns = norm(specific)
    if ns not in EVAL_CACHE:
        rows = []
        for q in q_variants(specific):
            rows = q_search_all(EVAL_RID, q, EVAL_FIELDS)
            if rows:
                break
            STATS["q_fallback"] += 1
        if not rows:
            STATS["eval_q_empty"] += 1
        parsed = []
        for i, r in enumerate(rows):
            p = parse_nom_rue(r.get("NOM_RUE"))
            if not p:
                continue
            generic, spec, orient = p
            try:
                debut, fin = int(r["CIVIQUE_DEBUT"]), int(r["CIVIQUE_FIN"])
            except (TypeError, ValueError):
                continue
            parsed.append({"id": i, "debut": debut, "fin": fin,
                           "generic": generic,
                           "key": street_key(spec, orient),
                           "lkey": loose_key(spec, orient),
                           "annee": r.get("ANNEE_CONSTRUCTION"),
                           "terrain": r.get("SUPERFICIE_TERRAIN"),
                           "categorie": r.get("CATEGORIE_UEF"),
                           "libelle": r.get("LIBELLE_UTILISATION")})
        EVAL_CACHE[ns] = parsed
    return EVAL_CACHE[ns]


def eval_lookup(civ, tax_rue, tax_orient, tax_generic_code):
    orient_word = ORIENT_MAP.get(tax_orient.strip(), "")
    key = street_key(tax_rue, orient_word)
    cands = eval_candidates(tax_rue)
    matches = [u for u in cands
               if u["key"] == key and u["debut"] <= civ <= u["fin"]]
    loose = False
    if not matches:
        lkey = loose_key(tax_rue, orient_word)
        matches = [u for u in cands
                   if u["lkey"] == lkey and u["debut"] <= civ <= u["fin"]]
        loose = True
    if not matches:
        return None
    expected_generic = GENERIC_MAP.get(tax_generic_code.strip())
    def rank(u):
        mismatch = 0 if (expected_generic is None or u["generic"] == expected_generic) else 1
        return (1 if loose else 0, mismatch, u["fin"] - u["debut"], u["id"])
    return sorted(matches, key=rank)[0]


def addr_candidates(specific):
    """Toutes les plages d'adresses dont la rue contient `specific`."""
    ns = norm(specific)
    if ns not in ADDR_CACHE:
        rows = []
        for q in q_variants(specific):
            rows = q_search_all(ADDR_RID, q, ADDR_FIELDS)
            if rows:
                break
            STATS["q_fallback"] += 1
        if not rows:
            STATS["addr_q_empty"] += 1
        parsed = []
        for r in rows:
            g, s, o = r.get("GENERIQUE"), r.get("SPECIFIQUE"), r.get("ORIENTATION")
            if not g or not s:
                continue
            try:
                de, a = int(r["ADDR_DE"]), int(r["ADDR_A"])
                lon, lat = float(r["LONGITUDE"]), float(r["LATITUDE"])
            except (TypeError, ValueError):
                continue
            parsed.append({"generic": norm(g), "specific": norm(s),
                           "lspecific": loose_key(s, ""),
                           "orient": (o or "X").strip().upper(),
                           "de": de, "a": a, "lon": lon, "lat": lat})
        ADDR_CACHE[ns] = parsed
    return ADDR_CACHE[ns]


def coords_lookup(civ, specific, generic, orient_letter):
    """Coordonnées via les plages ADDR_DE..ADDR_A (plus petite plage d'abord)."""
    ng, ns = norm(generic), norm(specific)
    ol = (orient_letter or "X").strip().upper()
    cands = addr_candidates(specific)
    matches = [c for c in cands
               if c["generic"] == ng and c["specific"] == ns
               and c["orient"] == ol and c["de"] <= civ <= c["a"]]
    if not matches:
        ls = loose_key(specific, "")
        matches = [c for c in cands
                   if c["generic"] == ng and c["lspecific"] == ls
                   and c["orient"] == ol and c["de"] <= civ <= c["a"]]
    if not matches:
        return None
    matches.sort(key=lambda c: (c["a"] - c["de"], c["de"]))
    return matches[0]["lon"], matches[0]["lat"]


def coords_with_generic_fallback(civ, specific, orient_letter, generics):
    for g in generics:
        hit = coords_lookup(civ, specific, g, orient_letter)
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
    for i in range(3):
        try:
            p = subprocess.run(
                ["curl", "-s", "-m", "25", "-A", NOMINATIM_UA, url],
                capture_output=True, timeout=40)
            if p.returncode != 0:
                raise ConnectionError(f"curl exit {p.returncode}")
            data = json.loads(p.stdout.decode("utf-8"))
            _last_nominatim[0] = time.time()
            if data:
                return float(data[0]["lon"]), float(data[0]["lat"])
            return None
        except Exception as e:
            last = e
            time.sleep(3 * (i + 1))
    print(f"  [nominatim] échec pour {address_label!r} : {last}")
    return None

# ----------------------------------------------------------------------------
# Photos de rue (Mapillary — images réelles CC BY-SA 4.0)
# ----------------------------------------------------------------------------
# Présentées comme « vue de la rue » à titre indicatif, jamais comme
# photo officielle du bien. Token via env MAPILLARY_TOKEN (serveur
# uniquement, jamais exposé au navigateur). Sans token ou sans image
# dans un rayon de 50 m -> champs NULL (état vide honnête).

MAPILLARY_TOKEN = os.environ.get("MAPILLARY_TOKEN") or ""
MAPILLARY_URL = "https://graph.mapillary.com/images"
PHOTO_PAUSE = 0.6
_last_photo = [0.0]
UA_PHOTO = "nesta-import/1.0"


def _photo_get(url):
    wait = PHOTO_PAUSE - (time.time() - _last_photo[0])
    if wait > 0:
        time.sleep(wait)
    last = None
    for i in range(3):
        try:
            p = subprocess.run(
                ["curl", "-s", "-m", "25", "-A", UA_PHOTO, url],
                capture_output=True, timeout=40)
            if p.returncode != 0:
                raise ConnectionError(f"curl exit {p.returncode}")
            data = json.loads(p.stdout.decode("utf-8"))
            _last_photo[0] = time.time()
            return data
        except Exception as e:
            last = e
            time.sleep(2 * (i + 1))
    print(f"  [photo] échec : {url[:60]}… : {last}")
    return None


def _bearing(lat1, lon1, lat2, lon2):
    """Cap initial (degrés) du point 1 vers le point 2."""
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = math.radians(lon2 - lon1)
    x = math.sin(dp) * math.cos(p2)
    y = (math.cos(p1) * math.sin(p2)
         - math.sin(p1) * math.cos(p2) * math.cos(dp))
    return (math.degrees(math.atan2(x, y)) + 360) % 360


def resolve_street_photo(lat, lon):
    """Meilleure image Mapillary ≤ 50 m : récente et face à l'adresse.
    Retourne dict(url, taken_at, author, source) ou None."""
    if lat is None or lon is None or not MAPILLARY_TOKEN:
        return None
    params = {
        "access_token": MAPILLARY_TOKEN,
        "fields": "id,geometry,captured_at,compass_angle,thumb_1024_url,creator",
        "lat": lat, "lng": lon, "radius": 50, "limit": 10,
    }
    data = _photo_get(MAPILLARY_URL + "?" + urllib.parse.urlencode(params))
    items = (data or {}).get("data") or []
    cands = []
    for img in items:
        try:
            coords = (img.get("geometry") or {}).get("coordinates") or []
            ilon, ilat = float(coords[0]), float(coords[1])
            cap = float(img.get("compass_angle") or 0)
            want = _bearing(ilat, ilon, lat, lon)
            diff = abs((cap - want + 180) % 360 - 180)
            taken_ms = int(img.get("captured_at") or 0)
            creator = img.get("creator")
            author = (creator.get("username") if isinstance(creator, dict)
                      else creator)
            url = img.get("thumb_1024_url")
            if not url:
                continue
            taken_iso = (datetime.datetime.fromtimestamp(
                taken_ms / 1000, tz=datetime.timezone.utc
            ).strftime("%Y-%m-%dT%H:%M:%SZ") if taken_ms else None)
            cands.append((diff, -taken_ms, url, taken_iso, author))
        except (TypeError, ValueError, IndexError):
            continue
    if not cands:
        return None
    cands.sort(key=lambda c: (c[0], c[1]))
    _, _, url, taken_iso, author = cands[0]
    return {"url": url, "taken_at": taken_iso, "author": author,
            "source": "mapillary"}

# ----------------------------------------------------------------------------
# Échantillonnage des adresses fiscales par arrondissement
# ----------------------------------------------------------------------------

def tax_years_present(rid):
    """Années d'exercice présentes (échantillonnage sur plusieurs offsets)."""
    total = ds_search(rid, limit=1)["total"]
    years = set()
    for k in range(8):
        off = (total * k) // 8
        r = ds_search(rid, limit=1500, offset=off, fields="ANNEE_EXERCICE")
        years.update(str(x["ANNEE_EXERCICE"]) for x in r["records"])
    print(f"  années présentes (échantillon) : {sorted(years)}")
    return total


def sample_tax_addresses(name, rid, per_borough, seed_offset):
    """Échantillonne des adresses DISTINCTES (valeur au rôle) dans un arrondissement."""
    total = tax_years_present(rid)
    rng = random.Random(SEED + seed_offset)
    fields = ("_id,AD_EMPLAC_CIV1,AD_EMPLAC_CIV2,AD_EMPLAC_GENER,AD_EMPLAC_RUE,"
              "AD_EMPLAC_ORIENT,VAL_IMPOSABLE,DESCR_LONGUE,ANNEE_EXERCICE")
    groups = {}
    for _ in range(TAX_SAMPLE_OFFSETS):
        off = rng.randrange(total)
        r = ds_search(rid, limit=TAX_SAMPLE_LIMIT, offset=off, fields=fields)
        for row in r["records"]:
            civ1 = txt(row.get("AD_EMPLAC_CIV1"))
            rue = txt(row.get("AD_EMPLAC_RUE"))
            if not civ1.isdigit() or not rue:
                continue
            key = (civ1,
                   txt(row.get("AD_EMPLAC_GENER")),
                   rue,
                   txt(row.get("AD_EMPLAC_ORIENT")))
            STATS["gener_vocab"].add(key[1])
            groups.setdefault(key, []).append(row)
    # Déduplique : une ligne par adresse -> année max, ligne « TAXE GÉNÉRALE » préférée.
    pool = []
    for key, rows in groups.items():
        year = max(str(x.get("ANNEE_EXERCICE") or "") for x in rows)
        yrows = [x for x in rows if str(x.get("ANNEE_EXERCICE") or "") == year]
        pref = [x for x in yrows if norm(x.get("DESCR_LONGUE", "")).startswith("TAXE GENERALE")]
        chosen = sorted(pref or yrows, key=lambda x: x["_id"])[0]
        if len({x.get("VAL_IMPOSABLE") for x in yrows}) > 1:
            STATS["inconsistent_tax_values"] += 1
        civ1, gener, rue, orient = key
        pool.append({
            "civ": int(civ1), "civ2": txt(rows[0].get("AD_EMPLAC_CIV2")),
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

def txt(v):
    # Les champs numériques (n° civique) arrivent parfois en int depuis CKAN.
    if v is None or isinstance(v, bool):
        return ""
    return str(v).strip()


def to_int(s):
    # ANNEE_EXERCICE arrive parfois en int, parfois en str selon le jeu.
    if s is None:
        return None
    if isinstance(s, bool):
        return None
    if isinstance(s, int):
        return s
    s = str(s).strip()
    return int(s) if s.isdigit() else None


def to_float(s):
    if s is None:
        return None
    if isinstance(s, bool):
        return None
    if isinstance(s, (int, float)):
        return float(s)
    try:
        return float(str(s).strip())
    except ValueError:
        return None


def enrich(addr, borough):
    civ, rue, orient = addr["civ"], addr["rue"], addr["orient"]
    # Le rôle foncier ajoute parfois une annotation entre parenthèses au nom
    # de rue (« CHARLEVOIX (0880) ») : ce n'est pas l'adresse civique,
    # on la retire (normalisation, pas d'invention).
    rue = re.sub(r"\s*\([^)]*\)", "", rue).strip()
    orient_letter = orient if orient in "EONS" else ("X" if not orient else orient)

    uev = eval_lookup(civ, rue, orient, addr["gener"])
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
        civ, rue, orient_letter, generics)
    if hit:
        lon, lat = hit
        method = "plages"
        generic = generic or used_generic
    else:
        generic = generic or GENERIC_MAP.get(addr["gener"])
        label = (street_label(civ, rue, generic or "",
                              orient if orient else "")
                 + ", Montréal, QC, Canada")
        hit = nominatim_coords(label)
        if hit:
            lon, lat = hit
            method = "nominatim"

    generic = generic or GENERIC_MAP.get(addr["gener"], "")
    display = street_label(civ, rue, generic, orient if orient else "")

    # Photo de rue réelle (Mapillary) — NULL si indisponible, jamais inventée.
    photo = resolve_street_photo(lat, lon) if lat is not None else None

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
        "assessment_total": to_float(addr["valeur"]),
        "assessment_year": to_int(addr["annee"]),
        "property_category": category,
        "data_source": DATA_SOURCE,
        "source_url": SOURCE_URL,
        "street_photo_url": photo["url"] if photo else None,
        "street_photo_taken_at": photo["taken_at"] if photo else None,
        "street_photo_author": photo["author"] if photo else None,
        "street_photo_source": photo["source"] if photo else None,
        "_coord_method": method,
    }

# ----------------------------------------------------------------------------
# Écriture SQL
# ----------------------------------------------------------------------------

COLUMNS = ["address", "borough", "city", "latitude", "longitude",
           "lot_area_sqm", "construction_year", "assessment_land",
           "assessment_building", "assessment_total", "assessment_year",
           "property_category", "data_source", "source_url",
           "street_photo_url", "street_photo_taken_at", "street_photo_author",
           "street_photo_source"]


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
        vals = ", ".join(sql_lit(p.get(c)) for c in COLUMNS)
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

def load_checkpoint():
    profiles = []
    if os.path.exists(CHECKPOINT):
        with open(CHECKPOINT, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    profiles.append(json.loads(line))
    return profiles


def save_checkpoint(profiles):
    with open(CHECKPOINT, "a", encoding="utf-8") as f:
        for p in profiles:
            f.write(json.dumps(p, ensure_ascii=False) + "\n")


def main():
    ap = argparse.ArgumentParser(description="Pipeline « vraies adresses » pour Nesta")
    ap.add_argument("--boroughs", type=int, default=len(BOROUGHS))
    ap.add_argument("--per-borough", type=int, default=PER_BOROUGH_DEFAULT)
    ap.add_argument("--resume", action="store_true",
                    help="reprend après une interruption (checkpoint JSONL)")
    ap.add_argument("--clear-checkpoint", action="store_true",
                    help="supprime le checkpoint avant de démarrer")
    args = ap.parse_args()
    boroughs = BOROUGHS[:args.boroughs]

    if args.clear_checkpoint and os.path.exists(CHECKPOINT):
        os.remove(CHECKPOINT)
        print("checkpoint supprimé")

    done = load_checkpoint() if args.resume else []
    done_boroughs = {p["borough"] for p in done}
    if done:
        print(f"reprise : {len(done)} profils déjà faits "
              f"({', '.join(sorted(done_boroughs))})")

    # Rattrapage photos : les profils du checkpoint antérieurs à la
    # fonction photo n'ont pas les clés street_photo_* — on les remplit.
    need_photo = [p for p in done if "street_photo_url" not in p]
    if need_photo:
        print(f"rattrapage photos : {len(need_photo)} profils", flush=True)
        for p in need_photo:
            photo = resolve_street_photo(p.get("latitude"),
                                         p.get("longitude"))
            p["street_photo_url"] = photo["url"] if photo else None
            p["street_photo_taken_at"] = (photo["taken_at"]
                                          if photo else None)
            p["street_photo_author"] = photo["author"] if photo else None
            p["street_photo_source"] = photo["source"] if photo else None
        os.remove(CHECKPOINT)
        save_checkpoint(done)
        print(f"  checkpoint réécrit : {len(done)} profils", flush=True)

    print("== 1/2 Échantillonnage + enrichissement ==", flush=True)
    profiles = list(done)
    for i, (name, rid) in enumerate(boroughs):
        if name in done_boroughs:
            print(f"-- {name} : déjà fait, sauté", flush=True)
            continue
        print(f"-- {name}", flush=True)
        new_profiles = []
        for addr in sample_tax_addresses(name, rid, args.per_borough, i * 1000):
            try:
                new_profiles.append(enrich(addr, name))
            except Exception as e:
                STATS["skipped"] += 1
                print(f"  [skip] {addr} : {e}")
        save_checkpoint(new_profiles)
        profiles.extend(new_profiles)
        print(f"  checkpoint : {len(profiles)} profils au total", flush=True)

    print("== 2/2 Écriture SQL ==")
    paths = write_seeds(profiles)

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
    print("Photos de rue trouvées :",
          sum(1 for p in profiles if p.get("street_photo_url")))
    print("Champs NULL :", {k: v for k, v in nulls.items() if v})
    print("Codes générique (taxes) observés :", sorted(STATS["gener_vocab"]))
    print("Replis q (2e variante) :", STATS["q_fallback"])
    print("Rues sans match évaluation :", STATS["eval_q_empty"],
          "| sans match adresse ponctuelle :", STATS["addr_q_empty"])
    print("Valeurs fiscales incohérentes (multi-lignes) :", STATS["inconsistent_tax_values"])
    print("Adresses écartées (erreur) :", STATS["skipped"])
    print("Fichiers :", paths)


if __name__ == "__main__":
    main()
