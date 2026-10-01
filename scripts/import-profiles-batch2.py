#!/usr/bin/env python3
"""
NESTA — Batch 2 : extension massive des profils Passeport (19 arrondissements).

Réutilise import-property-profiles.py (MÊME méthodologie, zéro invention) :
  - sources : Ville de Montréal — Données ouvertes (taxes municipales,
    unités d'évaluation foncière, adresse ponctuelle), licence CC-BY 4.0 ;
  - champ absent -> NULL ;
  - photos de rue FORCÉES à NULL (retirées du site) ;
  - Nominatim DÉSACTIVÉ dans les workers (backfill séquentiel dédié
    ensuite, pour respecter 1 req/s) ;
  - déduplication : contre les 240 profils existants (adresse normalisée,
    insensible casse/espaces) + dans le nouveau lot.

Usage :
    python3 import-profiles-batch2.py --worker A --out /tmp/batch2_A.jsonl \
        --checkpoint /tmp/batch2_A.ckpt --existing /tmp/existing_addrs.txt [--resume]

3 workers en parallèle (jamais deux imports SQL en parallèle — ici on ne
fait que GÉNÉRER des JSONL, l'import SQL viendra après, séquentiel).
"""

import argparse
import importlib.util
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location(
    "ipp", os.path.join(HERE, "import-property-profiles.py"))
ipp = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ipp)

# Photos : toujours NULL (retirées du site).
ipp.resolve_street_photo = lambda lat, lon: None
# Nominatim : désactivé dans les workers sauf BATCH2_NOMINATIM=1
# (le backfill se fait en UN SEUL flux séquentiel après).
if os.environ.get("BATCH2_NOMINATIM") != "1":
    ipp.nominatim_coords = lambda label: None

# (nom, resource_id taxes municipales, NOUVEAUX profils visés, worker)
# Les 6 premiers complètent les 40 existants -> 100. Les 13 autres : 100.
BOROUGHS_ALL = [
    ("Le Plateau-Mont-Royal", "13ad610a-5312-4765-aedd-8d016261480f", 60, "A"),
    ("Rosemont–La Petite-Patrie", "d2affd10-0879-490d-b296-f9fc0d225bfa", 60, "A"),
    ("Verdun", "cecf74d7-902e-42bc-93e8-4dfa687a8b64", 60, "A"),
    ("Ville-Marie", "31d21f1c-b084-4bdd-b65f-da94e3cf6417", 60, "A"),
    ("Ahuntsic-Cartierville", "da06242e-86c7-4e97-baf2-4a13dc33ebc0", 60, "A"),
    ("Le Sud-Ouest", "6230ea2f-2d84-4e3f-80bd-6bf56bb80b35", 60, "A"),
    ("Villeray–Saint-Michel–Parc-Extension", "9bfc305c-e930-4dfb-a345-6355bae4cadd", 100, "B"),
    ("Côte-des-Neiges–Notre-Dame-de-Grâce", "8819693b-870a-4288-bb09-f7eb20a6f095", 100, "B"),
    ("Anjou", "5b405217-6ebc-45e9-bf73-9269dd9666f6", 100, "B"),
    ("Lachine", "a3e11c74-9502-4ad5-a95f-43a0fa8e5c04", 100, "B"),
    ("LaSalle", "d17b9159-d9ea-4431-88f4-1fb9735cd084", 100, "B"),
    ("Mercier–Hochelaga-Maisonneuve", "1f74c2e0-a55a-46f2-923a-dbf91ee6bd1a", 100, "B"),
    ("Montréal-Nord", "6f45a3c9-0354-4f3b-89e6-099715ee1ac8", 100, "B"),
    ("Outremont", "07961002-d29c-43e3-a1ec-9966edc2e0e3", 100, "C"),
    ("Pierrefonds-Roxboro", "06533106-4ab7-474e-bb2a-b37837917782", 100, "C"),
    ("Rivière-des-Prairies–Pointe-aux-Trembles", "6266baa4-4392-4222-a96b-aa91981b351c", 100, "C"),
    ("Saint-Laurent", "544e7fbb-46af-46af-974f-d47d57557aed", 100, "C"),
    ("Saint-Léonard", "e58a361b-9fbe-4b13-a471-8efd9172e563", 100, "C"),
    ("L'Île-Bizard–Sainte-Geneviève", "36fd87af-6c92-45d0-9de1-8204fc1d7d95", 100, "C"),
]

WORKER_SEED_BASE = {"A": 0, "B": 50000, "C": 90000}
PHOTO_KEYS = ("street_photo_url", "street_photo_taken_at",
              "street_photo_author", "street_photo_source")


def load_existing(path):
    seen = set()
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                seen.add(ipp.norm(line))
    return seen


def load_checkpoint(path):
    profiles = []
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    profiles.append(json.loads(line))
    return profiles


def save_checkpoint(path, profiles):
    with open(path, "a", encoding="utf-8") as f:
        for p in profiles:
            f.write(json.dumps(p, ensure_ascii=False) + "\n")


def run_borough(name, rid, target, seen, seed_base, ckpt):
    """Échantillonne jusqu'à `target` NOUVEAUX profils (passes successives)."""
    collected = []
    passes = 0
    oversample = max(target + 60, int(target * 1.6))
    while len(collected) < target and passes < 6:
        print(f"-- {name} : passe {passes + 1} "
              f"(cible {target}, déjà {len(collected)})", flush=True)
        addrs = ipp.sample_tax_addresses(
            name, rid, oversample, seed_base + passes * 7919)
        batch = []
        for addr in addrs:
            try:
                p = ipp.enrich(addr, name)
            except Exception as e:
                ipp.STATS["skipped"] += 1
                print(f"  [skip] {addr.get('civ')}, {addr.get('rue')} : {e}")
                continue
            key = ipp.norm(p["address"])
            if key in seen:
                continue
            seen.add(key)
            for k in PHOTO_KEYS:
                p[k] = None
            batch.append(p)
            if len(collected) + len(batch) >= target:
                break
        save_checkpoint(ckpt, batch)
        collected.extend(batch)
        print(f"   -> +{len(batch)} nouveaux "
              f"({len(collected)}/{target})", flush=True)
        passes += 1
    if len(collected) < target:
        print(f"  !! {name} : SEULEMENT {len(collected)}/{target} "
              f"(pool épuisé ?)", flush=True)
    return collected


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--worker", required=True, choices=["A", "B", "C"])
    ap.add_argument("--out", required=True)
    ap.add_argument("--checkpoint", required=True)
    ap.add_argument("--existing", required=True)
    ap.add_argument("--existing-jsonl", action="append", default=[],
                    help="fichiers JSONL dont les adresses rejoignent "
                         "l'ensemble de déduplication (ex. lot précédent)")
    ap.add_argument("--target-per-borough", type=int, default=None,
                    help="remplace la cible de NOUVEAUX profils pour tous "
                         "les arrondissements du worker (ex. densification)")
    ap.add_argument("--seed-base", type=int, default=0,
                    help="décalage ajouté à la base de graine (lots suivants)")
    ap.add_argument("--resume", action="store_true")
    args = ap.parse_args()

    seen = load_existing(args.existing)
    for jpath in args.existing_jsonl:
        for p in load_checkpoint(jpath):
            seen.add(ipp.norm(p["address"]))
    print(f"dédupe : {len(seen)} adresses déjà vues", flush=True)
    done = load_checkpoint(args.checkpoint) if args.resume else []
    for p in done:
        seen.add(ipp.norm(p["address"]))
    done_by_borough = {}
    for p in done:
        done_by_borough[p["borough"]] = done_by_borough.get(p["borough"], 0) + 1
    print(f"worker {args.worker} : reprise {len(done)} profils, "
          f"{len(seen)} adresses vues", flush=True)

    mine = [b for b in BOROUGHS_ALL if b[3] == args.worker]
    all_profiles = list(done)
    for i, (name, rid, target, _) in enumerate(mine):
        if args.target_per_borough is not None:
            target = args.target_per_borough
        have = done_by_borough.get(name, 0)
        if have >= target:
            print(f"-- {name} : déjà {have}/{target}, sauté", flush=True)
            continue
        newp = run_borough(name, rid, target - have, seen,
                           args.seed_base + WORKER_SEED_BASE[args.worker] + i * 1000,
                           args.checkpoint)
        all_profiles.extend(newp)

    with open(args.out, "w", encoding="utf-8") as f:
        for p in all_profiles:
            f.write(json.dumps(p, ensure_ascii=False) + "\n")
    print(f"ÉCRIT : {args.out} ({len(all_profiles)} profils)", flush=True)


if __name__ == "__main__":
    main()
