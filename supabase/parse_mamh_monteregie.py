#!/usr/bin/env python3
"""NESTA — Rôles d'évaluation MAMH (XML) de la Montérégie -> CSV découpés.

Lit les 154 fichiers RL<code>_2026.xml du MAMH (Données Québec, CC-BY 4.0)
pour toute la Montérégie (14 MRC + agglomération de Longueuil),
sauf les municipalités déjà importées (Vaudreuil-Soulanges + Valleyfield).

Produit des CSV mappés au schéma public.property_profiles
(même ordre de colonnes que supabase/sql_to_csv.py :: CANON),
découpés en morceaux de CHUNK lignes pour l'import via Table Editor.

Règles (identiques au batch 2) :
- Champ absent dans le XML -> chaîne vide (NULL à l'import). Jamais inventé.
- RL0201 (propriétaires) JAMAIS lu : caviardé à la source, réidentification interdite.
- Lignes sans rue -> exclues. Lignes sans numéro civique -> exclues
  (terrains vagues, champs : pas d'adresse réelle).
- UN Passeport par adresse : déduplication sur (ville, adresse sans unité).
  La ligne conservée garde son adresse telle quelle (comme le batch 2,
  ex. "100, 5e Boulevard, app. 3" possible).
- latitude/longitude -> vides (géocodage ultérieur). borough -> vide.

Usage :
  python3 parse_mamh_monteregie.py
"""
import csv
import os
import re
import sys
import xml.etree.ElementTree as ET
from collections import Counter

CANON = ["address", "borough", "city", "latitude", "longitude", "lot_area_sqm",
         "construction_year", "assessment_land", "assessment_building",
         "assessment_total", "assessment_year", "property_category",
         "data_source", "source_url", "street_photo_url",
         "street_photo_taken_at", "street_photo_author", "street_photo_source"]

BASE = os.path.dirname(os.path.abspath(__file__))
XML_DIR = os.path.join(BASE, "xml_mont")
OUT_DIR = os.path.join(BASE, "csv_mont")
CHUNK = 4990

DATA_SOURCE = "MAMH — Données Québec (rôle d'évaluation foncière)"
BASE_URL = "https://donneesouvertes.affmunqc.net/role/RL{}_2026.xml"

CATEGORY_BY_FAMILY = {
    "1": "Logement",
    "4": "Immeuble commercial",
    "5": "Immeuble à bureaux",
    "6": "Industrie",
    "7": "Institutionnel",
    "8": "Agricole",
    "9": "Terrain vacant",
}


def norm_street(raw: str) -> str:
    s = " ".join((raw or "").split())
    s = re.sub(r"\bIER\b", "er", s)
    s = re.sub(r"\bIEME\b", "e", s)
    s = re.sub(r"(\d)\s+(er|e)\b", r"\1\2", s)
    words = []
    for w in s.split():
        if re.fullmatch(r"\d+(er|e)", w):
            words.append(w)
        else:
            words.append(w.capitalize())
    return " ".join(words)


def to_num(txt):
    if txt is None:
        return ""
    t = txt.strip().replace(" ", "")
    if not t:
        return ""
    try:
        f = float(t)
    except ValueError:
        return ""
    return str(int(f)) if f.is_integer() else str(f)


def to_int(txt):
    if txt is None:
        return ""
    t = txt.strip()
    return t if re.fullmatch(r"\d{3,4}", t) else ""


def category_for(use_code: str) -> str:
    code = (use_code or "").strip()
    return CATEGORY_BY_FAMILY.get(code[:1], "") if code else ""


def base_address(ax: str, street: str) -> str:
    """Adresse sans suffixe d'unité (clé de déduplication)."""
    return f"{ax}, {street}" if ax else street


class ChunkWriter:
    def __init__(self):
        os.makedirs(OUT_DIR, exist_ok=True)
        self.n_chunk = 0
        self.n_in_chunk = 0
        self.w = None
        self.f = None
        self.files = []

    def _rotate(self):
        if self.f:
            self.f.close()
        self.n_chunk += 1
        self.n_in_chunk = 0
        path = os.path.join(OUT_DIR, f"seed_mont_v{self.n_chunk}.csv")
        self.f = open(path, "w", newline="", encoding="utf-8")
        self.w = csv.DictWriter(self.f, fieldnames=CANON)
        self.w.writeheader()
        self.files.append(path)

    def write(self, row):
        if self.w is None or self.n_in_chunk >= CHUNK:
            self._rotate()
        self.w.writerow(row)
        self.n_in_chunk += 1

    def close(self):
        if self.f:
            self.f.close()
            self.f = None


def parse_file(code: str, city: str, writer: ChunkWriter, seen: set, stats: Counter):
    path = os.path.join(XML_DIR, f"RL{code}_2026.xml")
    role_year = ""
    ctx = ET.iterparse(path, events=("end",))
    for _ev, el in ctx:
        if el.tag == "RLM02A" and not role_year:
            role_year = (el.text or "").strip()
        elif el.tag == "RLUEx":
            stats["total"] += 1
            ax = (el.findtext(".//RL0101Ax") or "").strip()
            cx = (el.findtext(".//RL0101Cx") or "").strip()
            gx = (el.findtext(".//RL0101Gx") or "").strip()
            if not gx:
                stats["no_street"] += 1
                el.clear()
                continue
            if not ax:
                stats["no_civic"] += 1
                el.clear()
                continue
            street = norm_street(gx)
            key = (city, base_address(ax, street))
            if key in seen:
                stats["dupes"] += 1
                el.clear()
                continue
            seen.add(key)

            address = base_address(ax, street)
            if cx:
                address += f", app. {cx}"

            writer.write({
                "address": address,
                "borough": "",
                "city": city,
                "latitude": "",
                "longitude": "",
                "lot_area_sqm": to_num(el.findtext("RL0302A")),
                "construction_year": to_int(el.findtext("RL0307A")),
                "assessment_land": to_num(el.findtext("RL0402A")),
                "assessment_building": to_num(el.findtext("RL0403A")),
                "assessment_total": to_num(el.findtext("RL0404A")),
                "assessment_year": role_year,
                "property_category": category_for(el.findtext("RL0105A")),
                "data_source": DATA_SOURCE,
                "source_url": BASE_URL.format(code),
                "street_photo_url": "",
                "street_photo_taken_at": "",
                "street_photo_author": "",
                "street_photo_source": "",
            })
            stats["kept"] += 1
            el.clear()
    return role_year


def main():
    mun_path = os.path.join(XML_DIR, "municipalites.txt")
    municipalities = []
    with open(mun_path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                code, name = line.split(",", 1)
                municipalities.append((code, name))
    print(f"{len(municipalities)} municipalités à traiter", flush=True)

    writer = ChunkWriter()
    seen = set()
    grand = Counter()
    for i, (code, city) in enumerate(municipalities, 1):
        stats = Counter()
        try:
            role_year = parse_file(code, city, writer, seen, stats)
        except FileNotFoundError:
            print(f"!! RL{code}_2026.xml introuvable — {city} ignorée", file=sys.stderr)
            continue
        grand.update(stats)
        print(f"[{i}/{len(municipalities)}] {code} {city}: "
              f"rôle {role_year}, gardées={stats['kept']}, "
              f"sans_rue={stats['no_street']}, sans_n°={stats['no_civic']}, "
              f"doublons={stats['dupes']}", flush=True)
    writer.close()

    print(f"\n=== TOTAL === fiches lues={grand['total']} gardées={grand['kept']} "
          f"sans_rue={grand['no_street']} sans_n°={grand['no_civic']} "
          f"doublons={grand['dupes']}")
    print(f"{writer.n_chunk} fichiers dans {OUT_DIR}/")
    for p in writer.files:
        n = sum(1 for _ in open(p, encoding="utf-8")) - 1
        print(f"  {os.path.basename(p)}: {n} lignes")


if __name__ == "__main__":
    main()
