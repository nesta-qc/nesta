#!/usr/bin/env python3
"""
NESTA — Batch 2 : finalisation.

1. Fusionne les JSONL des workers.
2. Backfill Nominatim SÉQUENTIEL (1 req/s, un seul flux) pour les profils
   sans coordonnées — donnée réelle OSM, jamais inventée.
3. Déduplication globale (adresse normalisée) contre le lot 1 et dans le lot.
4. Écrit supabase/seed_property_profiles_2a..2d.sql (même format que le lot 1,
   ~450 INSERTs par fichier).

Usage :
    python3 finalize-profiles-batch2.py --inputs /tmp/batch2_A.jsonl /tmp/batch2_B.jsonl /tmp/batch2_C.jsonl \
        --merged /tmp/batch2_all.jsonl [--backfill] [--write-sql]
"""

import argparse
import importlib.util
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location(
    "ipp", os.path.join(HERE, "import-property-profiles.py"))
ipp = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ipp)

ipp.resolve_street_photo = lambda lat, lon: None  # photos : toujours NULL

SUPABASE_DIR = os.path.join(os.path.dirname(HERE), "supabase")
CONSULT_DATE = "2026-09-30"


def sql_lit(v):
    if v is None:
        return "NULL"
    if isinstance(v, str):
        return "'" + v.replace("'", "''") + "'"
    return repr(v)


HEADER = (
    "-- ============================================================\n"
    "-- NESTA — seed « vraies adresses » (données ouvertes) — LOT 2\n"
    "-- Généré le {date} par scripts/import-profiles-batch2.py\n"
    "-- (même méthodologie que le lot 1 : taxes municipales, unités\n"
    "-- d'évaluation foncière, adresse ponctuelle — CC-BY 4.0 ;\n"
    "-- coordonnées manquantes via Nominatim (OpenStreetMap, ODbL) ;\n"
    "-- photos de rue : NULL — retirées du site.)\n"
    "-- Champ absent dans les jeux -> NULL (jamais inventé).\n"
    "-- IMPORTANT : one-shot, PAS d'upsert — ne contient QUE des profils\n"
    "-- inédits (dédupliqués contre le lot 1 et dans le lot). Ne pas\n"
    "-- réappliquer. RLS : lecture publique seule.\n"
    "-- Fichier {tag}/{ntags} — {rows} lignes.\n"
    "-- ============================================================\n\n"
)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--inputs", nargs="+", required=True)
    ap.add_argument("--merged", required=True)
    ap.add_argument("--existing", required=True,
                    help="adresses du lot 1 (une par ligne)")
    ap.add_argument("--backfill", action="store_true")
    ap.add_argument("--write-sql", action="store_true")
    ap.add_argument("--per-file", type=int, default=450)
    ap.add_argument("--tag-prefix", default="2",
                    help="préfixe des fichiers SQL (2 -> 2a..2d, 3 -> 3a..3g)")
    args = ap.parse_args()

    profiles = []
    for inp in args.inputs:
        with open(inp, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    profiles.append(json.loads(line))
    print(f"fusion : {len(profiles)} profils bruts", flush=True)

    if args.backfill:
        missing = [p for p in profiles
                   if p.get("latitude") is None or p.get("longitude") is None]
        print(f"backfill Nominatim : {len(missing)} profils sans "
              f"coordonnées", flush=True)
        n = 0
        for p in missing:
            hit = ipp.nominatim_coords(p["address"] + ", Montréal, QC, Canada")
            if hit:
                p["longitude"], p["latitude"] = round(hit[0], 6), round(hit[1], 6)
                n += 1
        print(f"  -> {n} géocodés via Nominatim", flush=True)

    with open(args.merged, "w", encoding="utf-8") as f:
        for p in profiles:
            f.write(json.dumps(p, ensure_ascii=False) + "\n")
    print(f"fusion écrite : {args.merged}", flush=True)

    # Dédupe globale : lot 1 + dans le lot (adresse normalisée).
    seen = set()
    with open(args.existing, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                seen.add(ipp.norm(line))
    deduped, dropped = [], 0
    for p in profiles:
        key = ipp.norm(p["address"])
        if key in seen:
            dropped += 1
            continue
        seen.add(key)
        deduped.append(p)
    print(f"dédupe globale : {len(deduped)} gardés, "
          f"{dropped} doublons écartés", flush=True)

    by_b, by_method, nulls = {}, {}, {}
    for p in deduped:
        by_b[p["borough"]] = by_b.get(p["borough"], 0) + 1
        by_method[p.get("_coord_method")] = by_method.get(p.get("_coord_method"), 0) + 1
        for c in ipp.COLUMNS:
            if p.get(c) is None:
                nulls[c] = nulls.get(c, 0) + 1
    print("par arrondissement :")
    for b in sorted(by_b):
        print(f"  {b} : {by_b[b]}")
    print("coordonnées par méthode :", by_method)
    print("champs NULL :", nulls)

    if args.write_sql:
        chunks = [deduped[i:i + args.per_file]
                  for i in range(0, len(deduped), args.per_file)]
        tags = [f"{args.tag_prefix}{chr(ord('a') + k)}" for k in range(len(chunks))]
        header = HEADER.replace("— LOT 2", f"— LOT {args.tag_prefix}")
        for tag, chunk in zip(tags, chunks):
            path = os.path.join(
                SUPABASE_DIR, f"seed_property_profiles_{tag}.sql")
            with open(path, "w", encoding="utf-8") as f:
                f.write(header.format(date=CONSULT_DATE, tag=tag,
                                      ntags="/".join(tags), rows=len(chunk)))
                for p in chunk:
                    vals = ", ".join(sql_lit(p.get(c)) for c in ipp.COLUMNS)
                    f.write(
                        f"INSERT INTO public.property_profiles "
                        f"({', '.join(ipp.COLUMNS)})\nVALUES ({vals});\n\n")
            kb = os.path.getsize(path) / 1024
            print(f"  écrit : {path} ({len(chunk)} lignes, {kb:.0f} Ko)")


if __name__ == "__main__":
    main()
