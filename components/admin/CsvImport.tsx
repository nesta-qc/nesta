"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { importProspectsCsv, type CsvProspectRow } from "@/actions/crm";

/*
 * Import CSV de prospects : téléversement → détection des colonnes →
 * aperçu des 10 premières lignes → import avec déduplication sur
 * (entreprise, courriel). Analyseur CSV maison (aucune dépendance).
 */

type FieldKey =
  | "company_name"
  | "contact_name"
  | "email"
  | "phone"
  | "website"
  | "project_name"
  | "project_location"
  | "project_type"
  | "source";

const FIELDS: { key: FieldKey; label: string; required?: boolean }[] = [
  { key: "company_name", label: "Entreprise", required: true },
  { key: "contact_name", label: "Contact" },
  { key: "email", label: "Courriel" },
  { key: "phone", label: "Téléphone" },
  { key: "website", label: "Site web" },
  { key: "project_name", label: "Projet" },
  { key: "project_location", label: "Localisation" },
  { key: "project_type", label: "Type de projet" },
  { key: "source", label: "Source" },
];

/** En-têtes reconnus automatiquement (minuscules, sans accents). */
const HEADER_ALIASES: Record<FieldKey, string[]> = {
  company_name: ["entreprise", "company", "company_name", "societe", "société", "nom entreprise"],
  contact_name: ["contact", "contact_name", "nom", "name", "personne"],
  email: ["courriel", "email", "e-mail", "mail"],
  phone: ["telephone", "téléphone", "phone", "tel", "tél"],
  website: ["site", "website", "site web", "url"],
  project_name: ["projet", "project", "project_name", "nom projet"],
  project_location: ["localisation", "location", "ville", "city", "secteur", "emplacement"],
  project_type: ["type", "type de projet", "project_type"],
  source: ["source"],
};

function normalizeHeader(h: string): string {
  return h
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/** Analyseur CSV : gère les champs entre guillemets, les virgules et les "" échappés. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  const pushField = () => {
    row.push(field);
    field = "";
  };
  const pushRow = () => {
    pushField();
    /* Ignore les lignes entièrement vides. */
    if (row.some((f) => f.trim() !== "")) rows.push(row);
    row = [];
  };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      pushField();
    } else if (c === "\r") {
      /* ignoré, le \n suit */
    } else if (c === "\n") {
      pushRow();
    } else {
      field += c;
    }
  }
  if (field !== "" || row.length > 0) pushRow();
  return rows;
}

export function CsvImport() {
  const router = useRouter();
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [mapping, setMapping] = useState<Record<FieldKey, number | null>>({
    company_name: null,
    contact_name: null,
    email: null,
    phone: null,
    website: null,
    project_name: null,
    project_location: null,
    project_type: null,
    source: null,
  });
  const [open, setOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setMessage(null);
    setError(null);
    const text = await file.text();
    /* Détecte le séparateur : point-virgule si l'en-tête n'a pas de virgule mais des points-virgules. */
    const firstLine = text.split(/\r?\n/)[0] ?? "";
    const useSemicolon = !firstLine.includes(",") && firstLine.includes(";");
    const normalized = useSemicolon ? firstLine.replace(/;/g, ",") + text.slice(firstLine.length).replace(/;/g, ",") : text;
    const parsed = parseCsv(normalized);
    if (parsed.length < 2) {
      setError("Fichier illisible : aucune ligne de données trouvée.");
      return;
    }
    const hdrs = parsed[0];
    const data = parsed.slice(1);
    const auto: Record<FieldKey, number | null> = {
      company_name: null,
      contact_name: null,
      email: null,
      phone: null,
      website: null,
      project_name: null,
      project_location: null,
      project_type: null,
      source: null,
    };
    hdrs.forEach((h, i) => {
      const nh = normalizeHeader(h);
      for (const f of FIELDS) {
        if (auto[f.key] === null && HEADER_ALIASES[f.key].includes(nh)) {
          auto[f.key] = i;
        }
      }
    });
    setHeaders(hdrs);
    setRows(data);
    setMapping(auto);
    setOpen(true);
  }

  function setMap(key: FieldKey, value: string) {
    setMapping((m) => ({ ...m, [key]: value === "" ? null : Number(value) }));
  }

  async function handleImport() {
    if (mapping.company_name === null) {
      setError("Associe une colonne au champ « Entreprise » (obligatoire).");
      return;
    }
    const data: CsvProspectRow[] = rows.map((r) => {
      const get = (k: FieldKey): string | null => {
        const idx = mapping[k];
        if (idx === null || idx === undefined) return null;
        const v = (r[idx] ?? "").trim();
        return v.length > 0 ? v : null;
      };
      return {
        company_name: get("company_name") ?? "",
        contact_name: get("contact_name"),
        email: get("email"),
        phone: get("phone"),
        website: get("website"),
        project_name: get("project_name"),
        project_location: get("project_location"),
        project_type: get("project_type"),
        source: get("source"),
      };
    });
    setImporting(true);
    setError(null);
    setMessage(null);
    const result = await importProspectsCsv(data);
    setImporting(false);
    if (!result.ok) {
      setError(result.message ?? "L’import a échoué.");
      return;
    }
    setMessage(
      `${result.inserted ?? 0} prospect${(result.inserted ?? 0) > 1 ? "s" : ""} importé${(result.inserted ?? 0) > 1 ? "s" : ""}` +
        (result.skipped ? `, ${result.skipped} doublon${result.skipped > 1 ? "s" : ""} ou ligne${result.skipped > 1 ? "s" : ""} vide${result.skipped > 1 ? "s" : ""} ignorée${result.skipped > 1 ? "s" : ""}` : "") +
        ".",
    );
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      {message ? (
        <p role="status" className="mb-4 rounded-xl border border-forest/30 bg-forest/10 px-4 py-3 text-sm font-medium text-forest">
          {message}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-dashed border-charcoal/25 px-6 py-8 text-center hover:border-forest">
        <span className="text-sm font-semibold text-charcoal">
          Choisir un fichier CSV
        </span>
        <span className="text-xs text-charcoal/55">
          Colonnes reconnues : entreprise, contact, courriel, téléphone, site,
          projet, localisation, type, source. Séparateur virgule ou
          point-virgule.
        </span>
        <input
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleFile(f);
            e.target.value = "";
          }}
        />
      </label>

      {open && rows.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-charcoal">
            Correspondance des colonnes ({rows.length} lignes détectées)
          </h3>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {FIELDS.map((f) => (
              <label key={f.key} className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">
                  {f.label}
                  {f.required ? " *" : ""}
                </span>
                <select
                  value={mapping[f.key] === null ? "" : String(mapping[f.key])}
                  onChange={(e) => setMap(f.key, e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-ivory px-3 py-2 text-sm text-charcoal outline-none focus:border-forest"
                >
                  <option value="">— Ignorer —</option>
                  {headers.map((h, i) => (
                    <option key={i} value={i}>
                      {h || `(colonne ${i + 1})`}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>

          <h3 className="mt-4 text-sm font-semibold text-charcoal">
            Aperçu (10 premières lignes)
          </h3>
          <div className="mt-2 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[640px] text-left text-xs">
              <thead>
                <tr className="border-b border-border bg-sand/60 text-charcoal/55">
                  {headers.map((h, i) => (
                    <th key={i} className="px-3 py-2 font-semibold">
                      {h || `(colonne ${i + 1})`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 10).map((r, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    {headers.map((_, j) => (
                      <td key={j} className="max-w-[220px] truncate px-3 py-2 text-charcoal/75">
                        {r[j] ?? ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-charcoal/50">
              Les doublons sur (entreprise, courriel) sont ignorés, insensible
              à la casse.
            </p>
            <button
              type="button"
              onClick={handleImport}
              disabled={importing}
              className="rounded-xl bg-forest px-5 py-2 text-sm font-semibold text-ivory hover:bg-forest/90 disabled:opacity-50"
            >
              {importing ? "Import…" : `Importer ${rows.length} lignes`}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
