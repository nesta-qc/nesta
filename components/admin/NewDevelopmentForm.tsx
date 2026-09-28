"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Field,
  Input,
  Select,
  Textarea,
} from "@/components/ui";
import {
  createDevelopmentWithUnits,
  type DeveloperOption,
  type DevelopmentUnitInput,
} from "@/actions/developments";

/* ============================================================
 * NESTA Admin — création d'un projet (pilote promoteurs).
 * Formulaire : infos projet + unités (saisie manuelle et/ou
 * import CSV). Le statut « Brouillon » garde le projet invisible
 * du public jusqu'à validation (RLS).
 * ============================================================ */

const PROJECT_STATUSES = [
  { value: "draft", label: "Brouillon (non publié)" },
  { value: "planned", label: "En planification" },
  { value: "under_construction", label: "En construction" },
  { value: "completed", label: "Terminé" },
] as const;

const UNIT_STATUSES = [
  { value: "AVAILABLE", label: "Disponible" },
  { value: "RESERVED", label: "Réservée" },
  { value: "SOLD", label: "Vendue" },
] as const;

interface UnitDraft {
  key: string;
  unit_number: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  floor: string;
  orientation: string;
  status: string;
}

const emptyUnit = (): UnitDraft => ({
  key: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  unit_number: "",
  price: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  floor: "",
  orientation: "",
  status: "AVAILABLE",
});

const CSV_COLUMNS = "numero,prix,chambres,sdb,superficie,etage,orientation,statut";

/** Découpe une ligne CSV en respectant les champs entre guillemets. */
function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (quoted) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        cur += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === "," || c === ";") {
      out.push(cur.trim());
      cur = "";
    } else {
      cur += c;
    }
  }
  out.push(cur.trim());
  return out;
}

function parseCsv(text: string): UnitDraft[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length === 0) return [];
  const first = lines[0].toLowerCase();
  const hasHeader = first.includes("numero") || first.includes("prix");
  const rows = hasHeader ? lines.slice(1) : lines;
  return rows.map((line) => {
    const cols = splitCsvLine(line);
    const u = emptyUnit();
    u.unit_number = cols[0] ?? "";
    u.price = cols[1] ?? "";
    u.bedrooms = cols[2] ?? "";
    u.bathrooms = cols[3] ?? "";
    u.area = cols[4] ?? "";
    u.floor = cols[5] ?? "";
    u.orientation = cols[6] ?? "";
    const st = (cols[7] ?? "").toUpperCase();
    u.status = ["AVAILABLE", "RESERVED", "SOLD"].includes(st) ? st : "AVAILABLE";
    return u;
  });
}

function toNumberOrNull(raw: string): number | null {
  const v = raw.trim().replace(/\s/g, "").replace(",", ".");
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function NewDevelopmentForm({
  developers,
  createdId,
}: {
  developers: DeveloperOption[];
  createdId: string | null;
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [developerId, setDeveloperId] = useState("");
  const [status, setStatus] = useState<string>("draft");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [description, setDescription] = useState("");
  const [salesName, setSalesName] = useState("");
  const [salesEmail, setSalesEmail] = useState("");
  const [salesPhone, setSalesPhone] = useState("");

  const [units, setUnits] = useState<UnitDraft[]>([emptyUnit()]);
  const [csvText, setCsvText] = useState("");
  const [csvCount, setCsvCount] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const updateUnit = (key: string, patch: Partial<UnitDraft>) =>
    setUnits((prev) => prev.map((u) => (u.key === key ? { ...u, ...patch } : u)));

  const removeUnit = (key: string) =>
    setUnits((prev) => (prev.length > 1 ? prev.filter((u) => u.key !== key) : prev));

  const importCsv = () => {
    const parsed = parseCsv(csvText).filter((u) => u.unit_number.length > 0);
    if (parsed.length === 0) {
      setCsvCount(0);
      return;
    }
    setUnits((prev) => {
      const kept = prev.filter((u) => u.unit_number.trim().length > 0);
      return [...kept, ...parsed];
    });
    setCsvCount(parsed.length);
  };

  const loadCsvFile = async (file: File | undefined) => {
    if (!file) return;
    const text = await file.text();
    setCsvText(text);
    setCsvCount(null);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setWarning(null);

    if (name.trim().length < 2) {
      setError("Le nom du projet est requis.");
      return;
    }
    if (!developerId) {
      setError("Choisissez le compte promoteur du projet.");
      return;
    }

    const unitInputs: DevelopmentUnitInput[] = units
      .filter((u) => u.unit_number.trim().length > 0)
      .map((u) => ({
        unit_number: u.unit_number.trim(),
        floor: toNumberOrNull(u.floor),
        price: toNumberOrNull(u.price),
        bedrooms: toNumberOrNull(u.bedrooms),
        bathrooms: toNumberOrNull(u.bathrooms),
        area: toNumberOrNull(u.area),
        orientation: u.orientation.trim() || null,
        status: (["AVAILABLE", "RESERVED", "SOLD"].includes(u.status)
          ? u.status
          : "AVAILABLE") as DevelopmentUnitInput["status"],
      }));

    setPending(true);
    const result = await createDevelopmentWithUnits({
      name: name.trim(),
      developer_id: developerId,
      address: address.trim() || null,
      city: city.trim() || null,
      status,
      completion_date: completionDate || null,
      description: description.trim() || null,
      sales_contact_name: salesName.trim() || null,
      sales_contact_email: salesEmail.trim() || null,
      sales_contact_phone: salesPhone.trim() || null,
      units: unitInputs,
    });

    if (!result.ok) {
      setError(result.message);
      setPending(false);
      return;
    }
    if (result.warning) setWarning(result.warning);
    router.push(`/admin/projets/nouveau?cree=${result.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex max-w-4xl flex-col gap-6">
      {createdId ? (
        <Card className="border-forest/30 bg-forest/[0.06] p-5">
          <p className="font-medium text-forest">Projet créé.</p>
          <p className="mt-1 text-sm text-charcoal/65">
            Identifiant : <span className="font-mono text-xs">{createdId}</span>
            {status === "draft"
              ? " — statut « Brouillon » : invisible du public jusqu'à sa mise en ligne."
              : " — visible sur la page publique /projects."}
          </p>
          {warning ? (
            <p role="alert" className="mt-2 text-sm font-medium text-amber-800">
              {warning}
            </p>
          ) : null}
        </Card>
      ) : null}

      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <Card className="p-6 sm:p-8">
        <h2 className="font-display text-xl text-charcoal">Projet</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Nom du projet" htmlFor="dev-name" required>
            <Input
              id="dev-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              maxLength={160}
              placeholder="Ex. : Le Moden"
            />
          </Field>
          <Field label="Compte promoteur" htmlFor="dev-owner" required>
            <Select
              id="dev-owner"
              value={developerId}
              onChange={(e) => setDeveloperId(e.target.value)}
              required
            >
              <option value="">— Choisir —</option>
              {developers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.display_name || d.id.slice(0, 8)}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Statut" htmlFor="dev-status">
            <Select
              id="dev-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {PROJECT_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Livraison estimée" htmlFor="dev-date">
            <Input
              id="dev-date"
              type="date"
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}
            />
          </Field>
          <Field label="Adresse" htmlFor="dev-address">
            <Input
              id="dev-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              maxLength={200}
              placeholder="Ex. : 1234 boul. Saint-Laurent"
            />
          </Field>
          <Field label="Ville" htmlFor="dev-city">
            <Input
              id="dev-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              maxLength={120}
              placeholder="Ex. : Brossard"
            />
          </Field>
        </div>
        <div className="mt-5">
          <Field
            label="Description"
            htmlFor="dev-desc"
            hint="Texte fourni par le promoteur — jamais inventé."
          >
            <Textarea
              id="dev-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={4000}
              placeholder="Présentation du projet…"
            />
          </Field>
        </div>
      </Card>

      <Card className="p-6 sm:p-8">
        <h2 className="font-display text-xl text-charcoal">Contact ventes</h2>
        <p className="mt-1 text-sm text-charcoal/55">
          Coordonnées affichées sur la fiche publique du projet.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          <Field label="Nom" htmlFor="dev-sales-name">
            <Input
              id="dev-sales-name"
              value={salesName}
              onChange={(e) => setSalesName(e.target.value)}
              maxLength={160}
              autoComplete="off"
            />
          </Field>
          <Field label="Courriel" htmlFor="dev-sales-email">
            <Input
              id="dev-sales-email"
              type="email"
              value={salesEmail}
              onChange={(e) => setSalesEmail(e.target.value)}
              maxLength={200}
              autoComplete="off"
            />
          </Field>
          <Field label="Téléphone" htmlFor="dev-sales-phone">
            <Input
              id="dev-sales-phone"
              type="tel"
              value={salesPhone}
              onChange={(e) => setSalesPhone(e.target.value)}
              maxLength={40}
              autoComplete="off"
            />
          </Field>
        </div>
      </Card>

      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl text-charcoal">Unités</h2>
            <p className="mt-1 text-sm text-charcoal/55">
              Saisie manuelle ou import CSV. Les lignes sans numéro
              d&apos;unité sont ignorées.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setUnits((prev) => [...prev, emptyUnit()])}
          >
            + Ajouter une unité
          </Button>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-charcoal/45">
                <th className="pb-2 pr-2 font-medium">N° *</th>
                <th className="pb-2 pr-2 font-medium">Prix $</th>
                <th className="pb-2 pr-2 font-medium">Ch.</th>
                <th className="pb-2 pr-2 font-medium">Sdb</th>
                <th className="pb-2 pr-2 font-medium">Pi²</th>
                <th className="pb-2 pr-2 font-medium">Étage</th>
                <th className="pb-2 pr-2 font-medium">Orientation</th>
                <th className="pb-2 pr-2 font-medium">Statut</th>
                <th className="pb-2 font-medium" aria-label="Supprimer" />
              </tr>
            </thead>
            <tbody>
              {units.map((u) => (
                <tr key={u.key} className="border-t border-border">
                  <td className="py-2 pr-2">
                    <Input
                      value={u.unit_number}
                      onChange={(e) =>
                        updateUnit(u.key, { unit_number: e.target.value })
                      }
                      placeholder="101"
                      className="min-w-20"
                      aria-label="Numéro d'unité"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <Input
                      value={u.price}
                      onChange={(e) => updateUnit(u.key, { price: e.target.value })}
                      placeholder="450000"
                      inputMode="decimal"
                      className="min-w-28"
                      aria-label="Prix"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <Input
                      value={u.bedrooms}
                      onChange={(e) =>
                        updateUnit(u.key, { bedrooms: e.target.value })
                      }
                      placeholder="2"
                      inputMode="numeric"
                      className="min-w-16"
                      aria-label="Chambres"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <Input
                      value={u.bathrooms}
                      onChange={(e) =>
                        updateUnit(u.key, { bathrooms: e.target.value })
                      }
                      placeholder="1"
                      inputMode="decimal"
                      className="min-w-16"
                      aria-label="Salles de bain"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <Input
                      value={u.area}
                      onChange={(e) => updateUnit(u.key, { area: e.target.value })}
                      placeholder="850"
                      inputMode="decimal"
                      className="min-w-20"
                      aria-label="Superficie en pieds carrés"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <Input
                      value={u.floor}
                      onChange={(e) => updateUnit(u.key, { floor: e.target.value })}
                      placeholder="3"
                      inputMode="numeric"
                      className="min-w-16"
                      aria-label="Étage"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <Input
                      value={u.orientation}
                      onChange={(e) =>
                        updateUnit(u.key, { orientation: e.target.value })
                      }
                      placeholder="Sud"
                      className="min-w-20"
                      aria-label="Orientation"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <Select
                      value={u.status}
                      onChange={(e) => updateUnit(u.key, { status: e.target.value })}
                      className="min-w-32"
                      aria-label="Statut de l'unité"
                    >
                      {UNIT_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </Select>
                  </td>
                  <td className="py-2 text-right">
                    <button
                      type="button"
                      onClick={() => removeUnit(u.key)}
                      className="rounded-lg px-2 py-1 text-sm text-charcoal/45 hover:bg-sand hover:text-red-700"
                      aria-label="Retirer cette unité"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-charcoal">
            Import CSV
          </h3>
          <p className="mt-1 text-xs text-charcoal/55">
            Colonnes, dans l&apos;ordre :{" "}
            <span className="font-mono">{CSV_COLUMNS}</span>. Première ligne
            d&apos;en-tête acceptée. Le statut accepte AVAILABLE, RESERVED ou
            SOLD.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => loadCsvFile(e.target.files?.[0])}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => fileRef.current?.click()}
            >
              Choisir un fichier CSV
            </Button>
            <Button type="button" variant="secondary" onClick={importCsv}>
              Importer dans le tableau
            </Button>
            {csvCount != null ? (
              <p className="self-center text-sm text-charcoal/60">
                {csvCount === 0
                  ? "Aucune ligne valide trouvée."
                  : `${csvCount} unité${csvCount > 1 ? "s" : ""} importée${csvCount > 1 ? "s" : ""}.`}
              </p>
            ) : null}
          </div>
          <Textarea
            value={csvText}
            onChange={(e) => {
              setCsvText(e.target.value);
              setCsvCount(null);
            }}
            rows={5}
            maxLength={200000}
            placeholder={"numero,prix,chambres,sdb,superficie,etage,orientation,statut\n101,450000,2,1,850,3,Sud,AVAILABLE"}
            className="mt-3 font-mono text-xs"
            aria-label="Contenu CSV à importer"
          />
        </div>
      </Card>

      <div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Création en cours…" : "Créer le projet"}
        </Button>
        <p className="mt-3 text-xs text-charcoal/45">
          Le projet est créé en statut « Brouillon » par défaut : invisible
          du public jusqu&apos;à sa mise en ligne.
        </p>
      </div>
    </form>
  );
}
