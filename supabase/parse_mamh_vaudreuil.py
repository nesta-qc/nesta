#!/usr/bin/env python3
"""NESTA — Rôles d'évaluation MAMH (XML) de Vaudreuil-Soulanges -> CSV.

Lit les 9 fichiers RL<code>_2026.xml du MAMH (Données Québec, CC-BY 4.0)
et produit un CSV mappé au schéma public.property_profiles
(même ordre de colonnes que supabase/sql_to_csv.py :: CANON).

Règles :
- Champ absent dans le XML -> chaîne vide (NULL à l'import). Jamais inventé.
- Les renseignements personnels sont caviardés à la source (RL0201 ne
  contient que des dates) et il est INTERDIT de les réidentifier : le
  script ne lit JAMAIS le bloc RL0201 (propriétaires).
- Adresses + données foncières seulement. Aucune photo de rue.
- latitude/longitude -> vides : le géocodage (Nominatim) est une étape
  ultérieure, comme pour les lots Montréal.
- borough -> vide : hors Montréal il n'y a pas d'arrondissements ;
  la ville va dans `city`.

Mapping des champs MAMH (format XML v2.8, rôles triennaux) :
  RL0101Ax (+RL0101Cx unité) / RL0101Gx -> address  ("100, 5e Boulevard")
  RL0302A  -> lot_area_sqm        (superficie du terrain, m²)
  RL0307A  -> construction_year   (RL0307B = R réelle / E estimée)
  RL0402A  -> assessment_land     (valeur du terrain)
  RL0403A  -> assessment_building (valeur du bâtiment)
  RL0404A  -> assessment_total    (valeur totale inscrite au rôle)
  RLM02A   -> assessment_year     (année du rôle — 2025 dans les fichiers
                                   nommés _2026 : divergence signalée)
  RL0105A  -> property_category   (utilisation prédominante MAMH,
                                   mapping grossier au 1er chiffre :
                                   1=Logement, 4=Immeuble commercial,
                                   5=Immeuble à bureaux, 6=Industrie,
                                   7=Institutionnel, 8=Agricole,
                                   9=Terrain vacant, sinon vide)

Usage :
  python3 parse_mamh_vaudreuil.py [--in DIR] [--out CSV]
"""
import argparse
import csv
import re
import sys
import xml.etree.ElementTree as ET
from collections import Counter, defaultdict

CANON = ["address", "borough", "city", "latitude", "longitude", "lot_area_sqm",
         "construction_year", "assessment_land", "assessment_building",
         "assessment_total", "assessment_year", "property_category",
         "data_source", "source_url", "street_photo_url",
         "street_photo_taken_at", "street_photo_author", "street_photo_source"]

MUNICIPALITIES = {
    "71040": "Coteau-du-Lac",
    "71060": "L'Île-Perrot",
    "71065": "Notre-Dame-de-l'Île-Perrot",
    "71070": "Pincourt",
    "71075": "Terrasse-Vaudreuil",
    "71083": "Vaudreuil-Dorion",
    "71090": "Vaudreuil-sur-le-Lac",
    "71100": "Hudson",
    "71105": "Saint-Lazare",
}

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
    s = re.sub(r"(\d)\s+(er|e)\b", r"\1\2", s)  # "3 e" -> "3e", "1 er" -> "1er"
    words = []
    for w in s.split():
        if re.fullmatch(r"\d+(er|e)", w):
            words.append(w)  # ordinal déjà normalisé
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


def parse_municipality(code: str, path: str, city: str, stats: dict):
    """Parse un XML en streaming (iterparse + clear). Rend des lignes CSV."""
    rows = []
    role_year = ""
    cat_counter = Counter()
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
            street = norm_street(gx)
            if ax:
                address = f"{ax}, {street}"
            else:
                address = street  # lot sans numéro civique (ex. terrain vague)
                stats["no_civic"] += 1
            if cx:
                address += f", app. {cx}"
                stats["with_unit"] += 1

            land = to_num(el.findtext("RL0402A"))
            bldg = to_num(el.findtext("RL0403A"))
            total = to_num(el.findtext("RL0404A"))
            if land and bldg and total:
                try:
                    if abs((float(land) + float(bldg)) - float(total)) > 1:
                        stats["sum_mismatch"] += 1
                except ValueError:
                    pass
            year = to_int(el.findtext("RL0307A"))
            if not year:
                stats["no_constr_year"] += 1
            cat = category_for(el.findtext("RL0105A"))
            cat_counter[cat or "(vide)"] += 1

            rows.append({
                "address": address,
                "borough": "",
                "city": city,
                "latitude": "",
                "longitude": "",
                "lot_area_sqm": to_num(el.findtext("RL0302A")),
                "construction_year": year,
                "assessment_land": land,
                "assessment_building": bldg,
                "assessment_total": total,
                "assessment_year": role_year,
                "property_category": cat,
                "data_source": DATA_SOURCE,
                "source_url": BASE_URL.format(code),
                "street_photo_url": "",
                "street_photo_taken_at": "",
                "street_photo_author": "",
                "street_photo_source": "",
            })
            el.clear()  # libère la mémoire (streaming)
    stats["role_year"] = role_year
    stats["categories"] = dict(cat_counter)
    return rows


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="indir", default="/tmp/mamh",
                    help="dossier contenant les RL<code>_2026.xml")
    ap.add_argument("--out", dest="outcsv",
                    default="seed_property_profiles_vaudreuil.csv",
                    help="CSV de sortie")
    args = ap.parse_args()

    all_rows = []
    report = {}
    for code, city in MUNICIPALITIES.items():
        path = f"{args.indir}/RL{code}_2026.xml"
        stats = Counter()
        try:
            rows = parse_municipality(code, path, city, stats)
        except FileNotFoundError:
            print(f"!! {path} introuvable — municipalité ignorée", file=sys.stderr)
            continue
        report[code] = (city, stats, len(rows))
        all_rows.extend(rows)
        print(f"{code} {city}: {len(rows)} fiches "
              f"(rôle {stats['role_year']}, sans n° civique: {stats['no_civic']}, "
              f"unités/app.: {stats['with_unit']})", flush=True)

    with open(args.outcsv, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=CANON)
        w.writeheader()
        for r in all_rows:
            w.writerow(r)
    print(f"\nCSV écrit : {args.outcsv} ({len(all_rows)} lignes)")

    print("\n--- Rapport qualité par municipalité ---")
    for code, (city, s, n) in report.items():
        print(f"{code} {city}: total={s['total']} exploitables={n} "
              f"sans_rue={s['no_street']} sans_annee_constr={s['no_constr_year']} "
              f"ecarts_somme={s['sum_mismatch']}")
        print(f"    catégories: {dict(s['categories'])}")


if __name__ == "__main__":
    main()
