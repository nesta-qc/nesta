"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createProspect,
  type ProspectInput,
  type ProspectRow,
} from "@/actions/prospects";
import {
  bulkUpdateProspects,
  createSendBatch,
  setProspectFollowUp,
  type EmailTemplateRow,
} from "@/actions/crm";
import {
  PROSPECT_STATUSES,
  PROSPECT_STATUS_LABELS,
  type ProspectStatus,
} from "@/lib/prospects";
import {
  STAGE_PROBABILITY,
  DEAL_VALUE_PER_PROJECT_CENTS,
  EMAIL_CONFIDENCE,
  EMAIL_CONFIDENCE_LABELS,
  formatMoney,
  type EmailConfidence,
} from "@/lib/crm";
import { timeAgo } from "@/components/admin/format";

/*
 * Tableau de bord principal du CRM : onglets Tableau / Kanban,
 * recherche, filtres, tri, sélection multiple + actions groupées,
 * ajout de prospect et création de lots d'envoi.
 * Responsive : cartes empilées sous md, kanban en scroll horizontal.
 */

const STATUS_STYLES: Record<ProspectStatus, string> = {
  a_contacter: "bg-ivory text-charcoal border-border",
  contacte: "bg-blue-50 text-blue-800 border-blue-200",
  sans_reponse: "bg-red-50 text-red-700 border-red-200",
  interesse: "bg-champagne/20 text-charcoal border-champagne/50",
  en_discussion: "bg-amber-50 text-amber-800 border-amber-200",
  partenaire: "bg-forest/10 text-forest border-forest/30",
  refuse: "bg-charcoal/5 text-charcoal/50 border-charcoal/10",
};

const CONFIDENCE_STYLES: Record<EmailConfidence, string> = {
  verifie: "bg-forest/10 text-forest border-forest/30",
  a_confirmer: "bg-amber-50 text-amber-800 border-amber-200",
  manquant: "bg-charcoal/5 text-charcoal/50 border-charcoal/10",
};

type SortKey = "company" | "value" | "followup" | "updated";

function weightedValue(p: ProspectRow): number {
  const prob = STAGE_PROBABILITY[p.status] ?? 0;
  return prob * Math.max(0, p.estimated_projects ?? 1) * DEAL_VALUE_PER_PROJECT_CENTS;
}

function isOverdue(p: ProspectRow, now: number): boolean {
  return (
    !!p.next_follow_up_at &&
    new Date(p.next_follow_up_at).getTime() < now &&
    !p.do_not_contact &&
    p.status !== "refuse" &&
    p.status !== "partenaire"
  );
}

function formatDateShort(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("fr-CA", {
    day: "numeric",
    month: "short",
  });
}

/* ------------------------- Modale d'ajout ------------------------- */

const EMPTY_FORM: ProspectInput = {
  company_name: "",
  contact_name: "",
  email: "",
  phone: "",
  website: "",
  project_name: "",
  project_location: "",
  project_type: "",
  source: "",
  notes: "",
  status: "a_contacter",
  assigned_to: "",
  estimated_projects: 1,
  email_confidence: "a_confirmer",
  next_follow_up_at: "",
};

function AddProspectModal({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<ProspectInput>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof ProspectInput, value: string | number) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await createProspect(form);
    setSaving(false);
    if (!result.ok) {
      setError(result.message ?? "L’enregistrement a échoué.");
      return;
    }
    onSaved();
  }

  const inputCls =
    "mt-1 w-full rounded-xl border border-border bg-ivory px-3 py-2 text-sm text-charcoal outline-none focus:border-forest";
  const labelCls =
    "text-xs font-semibold uppercase tracking-wide text-charcoal/60";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Ajouter un prospect"
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-xl text-charcoal">Ajouter un prospect</h2>
        {error ? (
          <p role="alert" className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
        <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
          <label className="block">
            <span className={labelCls}>Entreprise *</span>
            <input type="text" value={form.company_name ?? ""} required
              onChange={(e) => set("company_name", e.target.value)}
              placeholder="Nom du promoteur" className={inputCls} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className={labelCls}>Contact</span>
              <input type="text" value={form.contact_name ?? ""}
                onChange={(e) => set("contact_name", e.target.value)}
                placeholder="Personne à joindre" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Courriel</span>
              <input type="email" value={form.email ?? ""}
                onChange={(e) => set("email", e.target.value)}
                placeholder="ventes@promoteur.ca" className={inputCls} />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className={labelCls}>Confiance email</span>
              <select value={form.email_confidence ?? "a_confirmer"}
                onChange={(e) => set("email_confidence", e.target.value as EmailConfidence)}
                className={inputCls}>
                {EMAIL_CONFIDENCE.map((c) => (
                  <option key={c} value={c}>{EMAIL_CONFIDENCE_LABELS[c]}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={labelCls}>Projets estimés</span>
              <input type="number" min={0} max={50} value={form.estimated_projects ?? 1}
                onChange={(e) => set("estimated_projects", Number(e.target.value))}
                className={inputCls} />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className={labelCls}>Assigné à</span>
              <input type="text" value={form.assigned_to ?? ""}
                onChange={(e) => set("assigned_to", e.target.value)}
                placeholder="prenom@…" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Relance le</span>
              <input type="date" value={form.next_follow_up_at ?? ""}
                onChange={(e) => set("next_follow_up_at", e.target.value)}
                className={inputCls} />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className={labelCls}>Projet</span>
              <input type="text" value={form.project_name ?? ""}
                onChange={(e) => set("project_name", e.target.value)}
                placeholder="Nom du projet" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Localisation</span>
              <input type="text" value={form.project_location ?? ""}
                onChange={(e) => set("project_location", e.target.value)}
                placeholder="Ville, secteur" className={inputCls} />
            </label>
          </div>
          <label className="block">
            <span className={labelCls}>Notes</span>
            <textarea value={form.notes ?? ""} rows={2}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Contexte, angle d’approche…" className={inputCls} />
          </label>
          <div className="mt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose}
              className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-charcoal/70 hover:bg-sand">
              Annuler
            </button>
            <button type="submit" disabled={saving}
              className="rounded-xl bg-forest px-4 py-2 text-sm font-semibold text-ivory hover:bg-forest/90 disabled:opacity-50">
              {saving ? "Enregistrement…" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* --------------------- Modale de création de lot --------------------- */

function CreateBatchModal({
  prospectIds,
  prospects,
  templates,
  onClose,
  onCreated,
}: {
  prospectIds: string[];
  prospects: ProspectRow[];
  templates: EmailTemplateRow[];
  onClose: () => void;
  onCreated: () => void;
}) {
  const router = useRouter();
  const eligible = prospects.filter(
    (p) => prospectIds.includes(p.id) && p.email && !p.do_not_contact,
  );
  const excluded = prospectIds.length - eligible.length;
  const [name, setName] = useState(
    `Lot du ${new Date().toLocaleDateString("fr-CA", { day: "numeric", month: "long" })}`,
  );
  const [templateId, setTemplateId] = useState<string>(templates[0]?.id ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!templateId) {
      setError("Choisis un modèle d’email.");
      return;
    }
    setSaving(true);
    setError(null);
    const result = await createSendBatch(
      name,
      templateId,
      eligible.map((p) => p.id),
    );
    setSaving(false);
    if (!result.ok) {
      setError(result.message ?? "La création du lot a échoué.");
      return;
    }
    onCreated();
    router.refresh();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Créer un lot d’envoi"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-xl text-charcoal">Créer un lot d’envoi</h2>
        <p className="mt-1 text-sm text-charcoal/60">
          {eligible.length} prospect{eligible.length > 1 ? "s" : ""} avec courriel
          {excluded > 0 ? ` (${excluded} sans courriel ou exclu${excluded > 1 ? "s" : ""} ignoré${excluded > 1 ? "s" : ""})` : ""}.
        </p>
        {error ? (
          <p role="alert" className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
        <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">
              Nom du lot
            </span>
            <input type="text" value={name} required
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-ivory px-3 py-2 text-sm text-charcoal outline-none focus:border-forest" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">
              Modèle d’email
            </span>
            <select value={templateId} onChange={(e) => setTemplateId(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-ivory px-3 py-2 text-sm text-charcoal outline-none focus:border-forest">
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} (étape {t.step})
                </option>
              ))}
            </select>
          </label>
          <p className="text-xs text-charcoal/50">
            Le lot sera créé en <strong>brouillon</strong>. Il faudra
            l’approuver dans la section « Lots d’envoi » avant l’envoi manuel
            via Gmail.
          </p>
          <div className="mt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose}
              className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-charcoal/70 hover:bg-sand">
              Annuler
            </button>
            <button type="submit" disabled={saving || eligible.length === 0}
              className="rounded-xl bg-forest px-4 py-2 text-sm font-semibold text-ivory hover:bg-forest/90 disabled:opacity-50">
              {saving ? "Création…" : "Créer le lot"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------ Board ------------------------------ */

export function CrmBoard({
  prospects,
  templates,
}: {
  prospects: ProspectRow[];
  templates: EmailTemplateRow[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(prospects);
  const [tab, setTab] = useState<"table" | "kanban">("table");
  const [search, setSearch] = useState("");
  const [fStatus, setFStatus] = useState<ProspectStatus | "all">("all");
  const [fAssigned, setFAssigned] = useState<string>("all");
  const [fFollowUp, setFFollowUp] = useState(false);
  const [fConfidence, setFConfidence] = useState<EmailConfidence | "all">("all");
  const [fIncludeExcluded, setFIncludeExcluded] = useState(false);
  const [sort, setSort] = useState<SortKey>("updated");
  const [selected, setSelected] = useState<string[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [batchOpen, setBatchOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState<string>("");
  const [bulkAssign, setBulkAssign] = useState("");
  const [bulkFollowUp, setBulkFollowUp] = useState("");
  const [bulkExclude, setBulkExclude] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);

  useEffect(() => {
    setItems(prospects);
    setSelected([]);
  }, [prospects]);

  const now = Date.now();
  const assignees = useMemo(
    () =>
      Array.from(
        new Set(items.map((p) => p.assigned_to).filter((a): a is string => !!a)),
      ).sort(),
    [items],
  );

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = items.filter((p) => {
      if (!fIncludeExcluded && p.do_not_contact) return false;
      if (fStatus !== "all" && p.status !== fStatus) return false;
      if (fAssigned === "unassigned" && p.assigned_to) return false;
      if (fAssigned === "assigned" && !p.assigned_to) return false;
      if (fAssigned !== "all" && fAssigned !== "unassigned" && fAssigned !== "assigned" && p.assigned_to !== fAssigned) return false;
      if (fFollowUp && !isOverdue(p, now)) return false;
      if (fConfidence !== "all" && p.email_confidence !== fConfidence) return false;
      if (q) {
        const hay = [p.company_name, p.contact_name, p.email, p.project_name, p.project_location]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    const dir = 1;
    list.sort((a, b) => {
      switch (sort) {
        case "company":
          return dir * a.company_name.localeCompare(b.company_name, "fr");
        case "value":
          return weightedValue(b) - weightedValue(a);
        case "followup": {
          const fa = a.next_follow_up_at ? new Date(a.next_follow_up_at).getTime() : Infinity;
          const fb = b.next_follow_up_at ? new Date(b.next_follow_up_at).getTime() : Infinity;
          return fa - fb;
        }
        case "updated":
        default:
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
      }
    });
    return list;
  }, [items, search, fStatus, fAssigned, fFollowUp, fConfidence, fIncludeExcluded, sort, now]);

  function toggleSelect(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  function toggleSelectAll() {
    setSelected((s) =>
      s.length === visible.length ? [] : visible.map((p) => p.id),
    );
  }

  async function runBulk(patch: Parameters<typeof bulkUpdateProspects>[1]) {
    setBusy(true);
    setError(null);
    setMessage(null);
    const result = await bulkUpdateProspects(selected, patch);
    setBusy(false);
    if (!result.ok) {
      setError(result.message ?? "L’action groupée a échoué.");
      return;
    }
    setMessage(`${result.updated ?? selected.length} prospect${(result.updated ?? 0) > 1 ? "s" : ""} mis à jour.`);
    setSelected([]);
    setBulkStatus("");
    setBulkAssign("");
    setBulkFollowUp("");
    setBulkExclude(false);
    router.refresh();
  }

  async function handleApplyBulk() {
    const patch: Parameters<typeof bulkUpdateProspects>[1] = {};
    if (bulkStatus) patch.status = bulkStatus as ProspectStatus;
    if (bulkAssign.trim()) patch.assigned_to = bulkAssign.trim();
    if (bulkFollowUp) patch.next_follow_up_at = bulkFollowUp;
    if (bulkExclude) patch.do_not_contact = true;
    if (Object.keys(patch).length === 0) {
      setError("Rien à appliquer : choisis un statut, un assigné ou une relance.");
      return;
    }
    await runBulk(patch);
  }

  async function handleInlineStatus(id: string, status: ProspectStatus) {
    const prev = items.find((p) => p.id === id)?.status;
    setItems((list) => list.map((p) => (p.id === id ? { ...p, status } : p)));
    setError(null);
    const result = await bulkUpdateProspects([id], { status });
    if (!result.ok) {
      if (prev) setItems((list) => list.map((p) => (p.id === id ? { ...p, status: prev } : p)));
      setError(result.message ?? "Le changement de statut a échoué.");
      return;
    }
    router.refresh();
  }

  async function handleInlineFollowUp(id: string, value: string) {
    setError(null);
    const result = await setProspectFollowUp(id, value || null);
    if (!result.ok) {
      setError(result.message ?? "La relance n’a pas pu être définie.");
      return;
    }
    router.refresh();
  }

  async function handleKanbanDrop(id: string, status: ProspectStatus) {
    const p = items.find((x) => x.id === id);
    if (!p || p.status === status) {
      setDragId(null);
      return;
    }
    setItems((list) => list.map((x) => (x.id === id ? { ...x, status } : x)));
    setDragId(null);
    const result = await bulkUpdateProspects([id], { status });
    if (!result.ok) {
      setItems((list) => list.map((x) => (x.id === id ? { ...x, status: p.status } : x)));
      setError(result.message ?? "Le déplacement a échoué.");
      return;
    }
    router.refresh();
  }

  const toolbar = (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => setAddOpen(true)}
        className="rounded-xl bg-forest px-4 py-2 text-sm font-semibold text-ivory hover:bg-forest/90"
      >
        + Ajouter
      </button>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher entreprise, contact, projet…"
        aria-label="Rechercher"
        className="min-w-0 flex-1 rounded-xl border border-border bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-forest sm:max-w-xs"
      />
      <select
        value={fStatus}
        onChange={(e) => setFStatus(e.target.value as ProspectStatus | "all")}
        aria-label="Filtrer par statut"
        className="rounded-xl border border-border bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-forest"
      >
        <option value="all">Tous les statuts</option>
        {PROSPECT_STATUSES.map((s) => (
          <option key={s} value={s}>{PROSPECT_STATUS_LABELS[s]}</option>
        ))}
      </select>
      <select
        value={fAssigned}
        onChange={(e) => setFAssigned(e.target.value)}
        aria-label="Filtrer par assignation"
        className="rounded-xl border border-border bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-forest"
      >
        <option value="all">Tous</option>
        <option value="unassigned">Non assignés</option>
        <option value="assigned">Assignés</option>
        {assignees.map((a) => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>
      <select
        value={fConfidence}
        onChange={(e) => setFConfidence(e.target.value as EmailConfidence | "all")}
        aria-label="Filtrer par confiance email"
        className="rounded-xl border border-border bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-forest"
      >
        <option value="all">Email : tous</option>
        {EMAIL_CONFIDENCE.map((c) => (
          <option key={c} value={c}>{EMAIL_CONFIDENCE_LABELS[c]}</option>
        ))}
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as SortKey)}
        aria-label="Trier"
        className="rounded-xl border border-border bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-forest"
      >
        <option value="updated">Tri : récents</option>
        <option value="company">Tri : entreprise</option>
        <option value="value">Tri : valeur</option>
        <option value="followup">Tri : relance</option>
      </select>
      <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border bg-white px-3 py-2 text-sm text-charcoal">
        <input
          type="checkbox"
          checked={fFollowUp}
          onChange={(e) => setFFollowUp(e.target.checked)}
          className="accent-[#2f4a3c]"
        />
        À relancer
      </label>
      <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border bg-white px-3 py-2 text-sm text-charcoal">
        <input
          type="checkbox"
          checked={fIncludeExcluded}
          onChange={(e) => setFIncludeExcluded(e.target.checked)}
          className="accent-[#2f4a3c]"
        />
        Exclus
      </label>
    </div>
  );

  const tabs = (
    <div className="mb-4 inline-flex rounded-xl border border-border bg-white p-1 text-sm font-medium">
      {(["table", "kanban"] as const).map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setTab(t)}
          className={`rounded-lg px-4 py-1.5 ${
            tab === t ? "bg-forest text-ivory" : "text-charcoal/60 hover:text-charcoal"
          }`}
        >
          {t === "table" ? "Tableau" : "Kanban"}
        </button>
      ))}
    </div>
  );

  return (
    <div>
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

      <div className="flex flex-wrap items-center justify-between gap-3">
        {tabs}
        <p className="text-sm text-charcoal/55">
          {visible.length} / {items.length} prospect{items.length > 1 ? "s" : ""}
        </p>
      </div>
      {toolbar}

      {tab === "table" ? (
        <>
          {/* Cartes mobiles */}
          <div className="flex flex-col gap-3 md:hidden">
            {visible.map((p) => (
              <article key={p.id} className="rounded-2xl border border-border bg-white p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(p.id)}
                    onChange={() => toggleSelect(p.id)}
                    aria-label={`Sélectionner ${p.company_name}`}
                    className="mt-1 h-4 w-4 accent-[#2f4a3c]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/admin/prospection/${p.id}`}
                        className="font-semibold text-charcoal hover:text-forest hover:underline"
                      >
                        {p.company_name}
                      </Link>
                      {p.do_not_contact ? (
                        <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-700">
                          Exclu
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-charcoal/60">
                      {[p.contact_name, p.email].filter(Boolean).join(" · ") || "—"}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <select
                        value={p.status}
                        onChange={(e) => handleInlineStatus(p.id, e.target.value as ProspectStatus)}
                        aria-label={`Statut de ${p.company_name}`}
                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold outline-none ${STATUS_STYLES[p.status]}`}
                      >
                        {PROSPECT_STATUSES.map((s) => (
                          <option key={s} value={s}>{PROSPECT_STATUS_LABELS[s]}</option>
                        ))}
                      </select>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${isOverdue(p, now) ? "border-red-200 bg-red-50 text-red-700" : "border-border text-charcoal/55"}`}
                        title={p.next_follow_up_at ?? undefined}
                      >
                        {p.next_follow_up_at
                          ? isOverdue(p, now)
                            ? `Relance dépassée (${formatDateShort(p.next_follow_up_at)})`
                            : `Relance : ${formatDateShort(p.next_follow_up_at)}`
                          : "Sans relance"}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-charcoal/55">
                      Valeur pondérée : <strong className="text-forest">{formatMoney(weightedValue(p))}</strong>
                      {p.estimated_projects > 1 ? ` · ${p.estimated_projects} projets` : ""}
                    </p>
                  </div>
                </div>
              </article>
            ))}
            {visible.length === 0 ? (
              <EmptyState hasAny={items.length > 0} />
            ) : null}
          </div>

          {/* Tableau desktop */}
          <div className="hidden overflow-x-auto rounded-2xl border border-border bg-white md:block">
            <table className="w-full min-w-[1020px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-sand/60 text-xs uppercase tracking-wide text-charcoal/50">
                  <th className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={visible.length > 0 && selected.length === visible.length}
                      onChange={toggleSelectAll}
                      aria-label="Tout sélectionner"
                      className="h-4 w-4 accent-[#2f4a3c]"
                    />
                  </th>
                  <th className="px-4 py-3 font-semibold">Entreprise</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Projet</th>
                  <th className="px-4 py-3 font-semibold">Statut</th>
                  <th className="px-4 py-3 font-semibold">Relance</th>
                  <th className="px-4 py-3 font-semibold">Assigné</th>
                  <th className="px-4 py-3 font-semibold">Valeur</th>
                  <th className="px-4 py-3 font-semibold">
                    <span className="sr-only">Fiche</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((p) => (
                  <tr key={p.id} className="border-b border-border/60 last:border-0 hover:bg-sand/40">
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(p.id)}
                        onChange={() => toggleSelect(p.id)}
                        aria-label={`Sélectionner ${p.company_name}`}
                        className="h-4 w-4 accent-[#2f4a3c]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-charcoal">
                        {p.company_name}
                        {p.do_not_contact ? (
                          <span className="ml-2 rounded-full border border-red-200 bg-red-50 px-2 py-0.5 align-middle text-[11px] font-semibold text-red-700">
                            Exclu
                          </span>
                        ) : null}
                      </p>
                      {p.website ? (
                        <a
                          href={p.website.startsWith("http") ? p.website : `https://${p.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-forest hover:underline"
                        >
                          Site web
                        </a>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-xs text-charcoal/70">
                      {p.contact_name ? <p className="font-medium">{p.contact_name}</p> : null}
                      {p.email ? (
                        <span className="flex items-center gap-1.5">
                          <a href={`mailto:${p.email}`} className="block truncate text-forest hover:underline">
                            {p.email}
                          </a>
                          <span className={`shrink-0 rounded-full border px-1.5 py-px text-[10px] font-semibold ${CONFIDENCE_STYLES[p.email_confidence]}`}>
                            {EMAIL_CONFIDENCE_LABELS[p.email_confidence]}
                          </span>
                        </span>
                      ) : (
                        <span className="text-charcoal/40">Sans courriel</span>
                      )}
                      {p.phone ? <p>{p.phone}</p> : null}
                    </td>
                    <td className="px-4 py-3 text-xs text-charcoal/70">
                      {p.project_name ? <p className="font-medium">{p.project_name}</p> : null}
                      {p.project_location ? <p>{p.project_location}</p> : null}
                      {!p.project_name && !p.project_location ? (
                        <span className="text-charcoal/40">—</span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={p.status}
                        onChange={(e) => handleInlineStatus(p.id, e.target.value as ProspectStatus)}
                        aria-label={`Statut de ${p.company_name}`}
                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold outline-none ${STATUS_STYLES[p.status]}`}
                      >
                        {PROSPECT_STATUSES.map((s) => (
                          <option key={s} value={s}>{PROSPECT_STATUS_LABELS[s]}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="date"
                        value={p.next_follow_up_at ? p.next_follow_up_at.slice(0, 10) : ""}
                        onChange={(e) => handleInlineFollowUp(p.id, e.target.value)}
                        aria-label={`Relance de ${p.company_name}`}
                        className={`rounded-lg border px-2 py-1 text-xs outline-none ${
                          isOverdue(p, now)
                            ? "border-red-300 bg-red-50 text-red-700"
                            : "border-border bg-white text-charcoal"
                        }`}
                      />
                      {isOverdue(p, now) ? (
                        <p className="mt-0.5 text-[11px] font-semibold text-red-700">
                          Dépassée ({timeAgo(p.next_follow_up_at)})
                        </p>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-xs text-charcoal/70">
                      {p.assigned_to ?? <span className="text-charcoal/40">—</span>}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <p className="font-semibold text-forest">{formatMoney(weightedValue(p))}</p>
                      <p className="text-charcoal/45">
                        {p.estimated_projects} projet{p.estimated_projects > 1 ? "s" : ""}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/prospection/${p.id}`}
                        className="text-xs font-medium text-forest hover:underline"
                      >
                        Fiche
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visible.length === 0 ? (
              <div className="px-6 py-10">
                <EmptyState hasAny={items.length > 0} />
              </div>
            ) : null}
          </div>
        </>
      ) : (
        /* Kanban : scroll horizontal (mobile + desktop) */
        <div className="flex gap-3 overflow-x-auto pb-2">
          {PROSPECT_STATUSES.map((status) => {
            const col = items.filter((p) =>
              fIncludeExcluded ? p.status === status : p.status === status && !p.do_not_contact,
            );
            const colValue = col.reduce((s, p) => s + weightedValue(p), 0);
            return (
              <section
                key={status}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData("text/plain");
                  if (id) handleKanbanDrop(id, status);
                }}
                aria-label={PROSPECT_STATUS_LABELS[status]}
                className="flex w-[270px] shrink-0 flex-col rounded-2xl border border-border bg-sand/40 p-3"
              >
                <header className="mb-2 px-1">
                  <p className="text-sm font-semibold text-charcoal">
                    {PROSPECT_STATUS_LABELS[status]}
                    <span className="ml-1.5 text-xs font-normal text-charcoal/50">
                      {col.length}
                    </span>
                  </p>
                  <p className="text-xs text-forest/80">{formatMoney(colValue)}</p>
                </header>
                <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto">
                  {col.map((p) => (
                    <article
                      key={p.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", p.id);
                        e.dataTransfer.effectAllowed = "move";
                        setDragId(p.id);
                      }}
                      onDragEnd={() => setDragId(null)}
                      className={`cursor-grab rounded-xl border border-border bg-white p-3 shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing ${
                        dragId === p.id ? "opacity-50" : ""
                      }`}
                    >
                      <Link
                        href={`/admin/prospection/${p.id}`}
                        onClick={(e) => e.stopPropagation()}
                        onDragStart={(e) => e.preventDefault()}
                        className="text-sm font-semibold text-charcoal hover:text-forest hover:underline"
                      >
                        {p.company_name}
                      </Link>
                      <p className="mt-0.5 truncate text-xs text-charcoal/60">
                        {[p.contact_name, p.email].filter(Boolean).join(" · ") || "—"}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[11px]">
                        {p.next_follow_up_at ? (
                          <span
                            className={
                              isOverdue(p, now)
                                ? "font-semibold text-red-700"
                                : "text-charcoal/55"
                            }
                          >
                            Relance : {formatDateShort(p.next_follow_up_at)}
                          </span>
                        ) : (
                          <span className="text-charcoal/40">Sans relance</span>
                        )}
                        <span className="font-semibold text-forest">
                          {formatMoney(weightedValue(p))}
                        </span>
                      </div>
                    </article>
                  ))}
                  {col.length === 0 ? (
                    <p className="px-2 py-4 text-center text-xs text-charcoal/40">
                      Glisse une carte ici
                    </p>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* Barre d'actions groupées */}
      {selected.length > 0 ? (
        <div className="sticky bottom-4 z-30 mt-4 rounded-2xl border border-forest/30 bg-white/95 p-3 shadow-lg backdrop-blur">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <p className="font-semibold text-charcoal">
              {selected.length} sélectionné{selected.length > 1 ? "s" : ""}
            </p>
            <select
              value={bulkStatus}
              onChange={(e) => setBulkStatus(e.target.value)}
              aria-label="Statut à appliquer"
              className="rounded-xl border border-border bg-white px-2.5 py-1.5 text-sm outline-none focus:border-forest"
            >
              <option value="">Statut…</option>
              {PROSPECT_STATUSES.map((s) => (
                <option key={s} value={s}>{PROSPECT_STATUS_LABELS[s]}</option>
              ))}
            </select>
            <input
              type="text"
              value={bulkAssign}
              onChange={(e) => setBulkAssign(e.target.value)}
              placeholder="Assigner à…"
              aria-label="Assigner à"
              className="w-32 rounded-xl border border-border bg-white px-2.5 py-1.5 text-sm outline-none focus:border-forest"
            />
            <input
              type="date"
              value={bulkFollowUp}
              onChange={(e) => setBulkFollowUp(e.target.value)}
              aria-label="Relance à appliquer"
              className="rounded-xl border border-border bg-white px-2.5 py-1.5 text-sm outline-none focus:border-forest"
            />
            <label className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-charcoal/70">
              <input
                type="checkbox"
                checked={bulkExclude}
                onChange={(e) => setBulkExclude(e.target.checked)}
                className="accent-[#2f4a3c]"
              />
              Exclure
            </label>
            <button
              type="button"
              onClick={handleApplyBulk}
              disabled={busy}
              className="rounded-xl bg-forest px-3.5 py-1.5 text-sm font-semibold text-ivory hover:bg-forest/90 disabled:opacity-50"
            >
              {busy ? "…" : "Appliquer"}
            </button>
            <button
              type="button"
              onClick={() => setBatchOpen(true)}
              disabled={busy}
              className="rounded-xl border border-champagne/60 px-3.5 py-1.5 text-sm font-semibold text-charcoal hover:bg-champagne/10 disabled:opacity-50"
            >
              Créer un lot
            </button>
            <button
              type="button"
              onClick={() => setSelected([])}
              className="ml-auto text-sm text-charcoal/55 hover:text-charcoal hover:underline"
            >
              Tout désélectionner
            </button>
          </div>
        </div>
      ) : null}

      {addOpen ? (
        <AddProspectModal
          onClose={() => setAddOpen(false)}
          onSaved={() => {
            setAddOpen(false);
            setMessage("Prospect ajouté.");
            router.refresh();
          }}
        />
      ) : null}

      {batchOpen ? (
        <CreateBatchModal
          prospectIds={selected}
          prospects={items}
          templates={templates}
          onClose={() => setBatchOpen(false)}
          onCreated={() => {
            setBatchOpen(false);
            setSelected([]);
            setMessage("Lot créé en brouillon — approuve-le dans « Lots d’envoi ».");
          }}
        />
      ) : null}
    </div>
  );
}

function EmptyState({ hasAny }: { hasAny: boolean }) {
  return (
    <div className="rounded-2xl border border-dashed border-charcoal/20 bg-white px-6 py-12 text-center">
      <p className="text-sm font-medium text-charcoal/60">
        {hasAny
          ? "Aucun prospect avec ces filtres."
          : "Aucun prospect. Ajoute ton premier promoteur ou importe un CSV."}
      </p>
    </div>
  );
}
