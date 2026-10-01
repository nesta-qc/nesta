#!/usr/bin/env python3
"""Convertit les seed SQL (INSERT one-shot) en CSV pour import via Table Editor."""
import csv, re, sys

CANON = ["address","borough","city","latitude","longitude","lot_area_sqm",
         "construction_year","assessment_land","assessment_building",
         "assessment_total","assessment_year","property_category","data_source",
         "source_url","street_photo_url","street_photo_taken_at",
         "street_photo_author","street_photo_source"]

def split_top_commas(s):
    parts, cur, in_q = [], [], False
    i = 0
    while i < len(s):
        c = s[i]
        if in_q:
            if c == "'":
                if i+1 < len(s) and s[i+1] == "'":
                    cur.append("'"); i += 2; continue
                in_q = False; cur.append(c); i += 1; continue
            cur.append(c); i += 1; continue
        else:
            if c == "'":
                in_q = True; cur.append(c); i += 1; continue
            if c == ",":
                parts.append(''.join(cur)); cur = []; i += 1; continue
            cur.append(c); i += 1; continue
    parts.append(''.join(cur))
    return parts

def parse_values_block(block):
    """block = contenu entre parenthèses de VALUES(...) -> liste de valeurs python"""
    vals = []
    for raw in split_top_commas(block):
        t = raw.strip()
        if t.upper() == "NULL":
            vals.append("")
        elif len(t) >= 2 and t.startswith("'") and t.endswith("'"):
            vals.append(t[1:-1].replace("''", "'"))
        else:
            vals.append(t)
    return vals

def extract_inserts(sql):
    """Retourne [(cols, values_block)] en respectant quotes et parenthèses."""
    # retire les lignes de commentaires
    lines = [l for l in sql.splitlines() if not l.lstrip().startswith("--")]
    text = "\n".join(lines)
    out = []
    i = 0
    while True:
        m = re.search(r"INSERT\s+INTO\s+public\.property_profiles\s*\(", text[i:], re.I)
        if not m: break
        j = i + m.end()  # après la parenthèse ouvrante des colonnes
        # capture liste colonnes jusqu'à la parenthèse fermante top-level
        depth, k, in_q = 1, j, False
        while depth > 0:
            c = text[k]
            if in_q:
                if c == "'" and text[k+1:k+2] == "'": k += 2; continue
                if c == "'": in_q = False
            else:
                if c == "'": in_q = True
                elif c == "(": depth += 1
                elif c == ")": depth -= 1
            k += 1
        cols = [c.strip() for c in text[j:k-1].split(",")]
        # cherche VALUES (
        m2 = re.search(r"VALUES\s*\(", text[k:], re.I)
        j = k + m2.end()
        depth, in_q = 1, False
        start = j
        while depth > 0:
            c = text[j]
            if in_q:
                if c == "'" and text[j+1:j+2] == "'": j += 2; continue
                if c == "'": in_q = False
            else:
                if c == "'": in_q = True
                elif c == "(": depth += 1
                elif c == ")": depth -= 1
            j += 1
        out.append((cols, text[start:j-1]))
        i = j
    return out

def convert(src, dst):
    sql = open(src, encoding="utf-8").read()
    inserts = extract_inserts(sql)
    rows = []
    for cols, block in inserts:
        vals = parse_values_block(block)
        assert len(cols) == len(vals), f"cols {len(cols)} != vals {len(vals)}"
        d = dict(zip(cols, vals))
        rows.append([d.get(c, "") for c in CANON])
    with open(dst, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(CANON)
        w.writerows(rows)
    return len(rows)

if __name__ == "__main__":
    files = ["2a","2b","2c","2d","3a","3b","3c","3d","3e","3f","3g"]
    total = 0
    for tag in files:
        src = f"/home/hatch/workspace/nesta/supabase/seed_property_profiles_{tag}.sql"
        dst = f"/home/hatch/workspace/nesta/supabase/csv/seed_{tag}.csv"
        n = convert(src, dst)
        total += n
        print(f"{tag}: {n} lignes -> {dst}")
    print("TOTAL:", total)
