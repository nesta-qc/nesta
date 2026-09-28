"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createProspect,
  updateProspect,
  setProspectStatus,
  deleteProspect,
  type ProspectRow,
  type ProspectInput,
} from "@/actions/prospects";
import {
  PROSPECT_STATUSES,
  PROSPECT_STATUS_LABELS,
  type ProspectStatus,
} from "@/lib/prospects";
import { timeAgo } from "@/components/admin/format";

/*
 * Liste de prospection (admin uniquement).
 * Tableau des promoteurs/développeurs avec statut modifiable en ligne,
 * filtre par statut, et modale d'ajout / modification.
 */

const STATUS_STYLES: Record<ProspectStatus, string> = {
  a_contacter: "bg-ivory text-charcoal border-border",
  contacte: "bg-blue-50 text-blue-800 border-blue-200",
  interesse: "bg-champagne/20 text-charcoal border-champagne/50",
  en_discussion: "bg-amber-50 text-amber-800 border-amber-200",
  partenaire: "bg-forest/10 text-forest border-forest/30",
  refuse: "bg-charcoal/5 text-charcoal/50 border-charcoal/10",
  sans_reponse: "bg-red-50 text-red-700 border-red-200",
};

const EMPTY_FORM: ProspectInput = {
  company_name: "",
  contact_name: "",
  email: "",
  phone: "",
  website: "",
  project_name: "",
  project_location: "",
  project_type: "",
  status: "a_contacter",
  source: "",
  notes: "",
};

const FIELDS: { key: keyof ProspectInput; label: string; placeholder?: string }[] = [
  { key: "company_name", label: "Entreprise *", placeholder: "Nom du promoteur" },
  { key: "contact_name", label: "Nom du contact", placeholder: "Personne à joindre" },
  { key: "email", label: "Courriel", placeholder: "ventes@promoteur.ca" },
  { key: "phone", label: "Téléphone", placeholder: "514 555-0000" },
  { key: "website", label: "Site web", placeholder: "https://…" },
  { key: "project_name", label: "Projet", placeholder: "Nom du projet à vendre" },
  { key: "project_location", label: "Localisation du projet", placeholder: "Arrondissement, ville" },
  { key: "project_type", label: "Type de projet", placeholder: "Condos, plex, maisons…" },
  { key: "source", label: "Source", placeholder: "Où le prospect a été trouvé" },
];

function ProspectModal({
  initial,
  onClose,
  onSaved,
}: {
  initial: ProspectInput & { id?: string };
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<ProspectInput>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof ProspectInput, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = initial.id
      ? await updateProspect(initial.id, form)
      : await createProspect(form);
    setSaving(false);
    if (!result.ok) {
      setError(result.message ?? "L’enregistrement a échoué.");
      return;
    }
    onSaved();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={initial.id ? "Modifier le prospect" : "Ajouter un prospect"}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-xl text-charcoal">
          {initial.id ? "Modifier le prospect" : "Ajouter un prospect"}
        </h2>

        {error ? (
          <p role="alert" className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
          {FIELDS.map((f) => (
            <label key={f.key} className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">
                {f.label}
              </span>
              <input
                type="text"
                value={(form[f.key] as string) ?? ""}
                onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                required={f.key === "company_name"}
                className="mt-1 w-full rounded-xl border border-border bg-ivory px-3 py-2 text-sm text-charcoal outline-none focus:border-forest"
              />
            </label>
          ))}

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">
              Statut
            </span>
            <select
              value={form.status ?? "a_contacter"}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ProspectStatus }))}
              className="mt-1 w-full rounded-xl border border-border bg-ivory px-3 py-2 text-sm text-charcoal outline-none focus:border-forest"
            >
              {PROSPECT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {PROSPECT_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">
              Notes
            </span>
            <textarea
              value={form.notes ?? ""}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              placeholder="Contexte, angle d’approche, relances…"
              className="mt-1 w-full rounded-xl border border-border bg-ivory px-3 py-2 text-sm text-charcoal outline-none focus:border-forest"
            />
          </label>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-charcoal/70 hover:bg-sand"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-forest px-4 py-2 text-sm font-semibold text-ivory hover:bg-forest/90 disabled:opacity-50"
            >
              {saving ? "Enregistrement…" : initial.id ? "Enregistrer" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ProspectsTable({
  initialProspects,
}: {
  initialProspects: ProspectRow[];
}) {
  const router = useRouter();
  const [prospects, setProspects] = useState(initialProspects);
  const [filter, setFilter] = useState<ProspectStatus | "all">("all");
  const [modal, setModal] = useState<(ProspectInput & { id?: string }) | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<ProspectRow | null>(null);

  const visible =
    filter === "all" ? prospects : prospects.filter((p) => p.status === filter);

  function refresh() {
    router.refresh();
  }

  async function handleStatusChange(id: string, status: ProspectStatus) {
    const previous = prospects.find((p) => p.id === id)?.status;
    setProspects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p)),
    );
    setError(null);
    const result = await setProspectStatus(id, status);
    if (!result.ok) {
      if (previous) {
        setProspects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: previous } : p)),
        );
      }
      setError(result.message ?? "Le changement de statut a échoué.");
      return;
    }
    refresh();
  }

  async function handleDelete(id: string) {
    const result = await deleteProspect(id);
    setConfirmDelete(null);
    if (!result.ok) {
      setError(result.message ?? "La suppression a échoué.");
      return;
    }
    setProspects((prev) => prev.filter((p) => p.id !== id));
    refresh();
  }

  return (
    <div>
      {error ? (
        <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setModal({ ...EMPTY_FORM })}
          className="rounded-xl bg-forest px-4 py-2 text-sm font-semibold text-ivory hover:bg-forest/90"
        >
          + Ajouter un prospect
        </button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as ProspectStatus | "all")}
          aria-label="Filtrer par statut"
          className="rounded-xl border border-border bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-forest"
        >
          <option value="all">Tous les statuts</option>
          {PROSPECT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {PROSPECT_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-charcoal/20 bg-white px-6 py-12 text-center">
          <p className="text-sm font-medium text-charcoal/60">
            {prospects.length === 0
              ? "Aucun prospect. Ajoute ton premier promoteur à contacter."
              : "Aucun prospect avec ce statut."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-sand/60 text-xs uppercase tracking-wide text-charcoal/50">
                <th className="px-4 py-3 font-semibold">Entreprise</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Projet</th>
                <th className="px-4 py-3 font-semibold">Statut</th>
                <th className="px-4 py-3 font-semibold">Dernier contact</th>
                <th className="px-4 py-3 font-semibold">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((p) => (
                <tr key={p.id} className="border-b border-border/60 last:border-0 hover:bg-sand/40">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-charcoal">{p.company_name}</p>
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
                      <a href={`mailto:${p.email}`} className="block text-forest hover:underline">
                        {p.email}
                      </a>
                    ) : null}
                    {p.phone ? <p>{p.phone}</p> : null}
                    {!p.contact_name && !p.email && !p.phone ? (
                      <span className="text-charcoal/40">—</span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-xs text-charcoal/70">
                    {p.project_name ? <p className="font-medium">{p.project_name}</p> : null}
                    {p.project_location ? <p>{p.project_location}</p> : null}
                    {p.project_type ? <p className="text-charcoal/50">{p.project_type}</p> : null}
                    {!p.project_name && !p.project_location ? (
                      <span className="text-charcoal/40">—</span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={p.status}
                      onChange={(e) => handleStatusChange(p.id, e.target.value as ProspectStatus)}
                      aria-label={`Statut de ${p.company_name}`}
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold outline-none ${STATUS_STYLES[p.status]}`}
                    >
                      {PROSPECT_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {PROSPECT_STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-charcoal/60">
                    {p.last_contact_at ? timeAgo(p.last_contact_at) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2 text-xs font-medium">
                      <button
                        type="button"
                        onClick={() =>
                          setModal({
                            id: p.id,
                            company_name: p.company_name,
                            contact_name: p.contact_name ?? "",
                            email: p.email ?? "",
                            phone: p.phone ?? "",
                            website: p.website ?? "",
                            project_name: p.project_name ?? "",
                            project_location: p.project_location ?? "",
                            project_type: p.project_type ?? "",
                            status: p.status,
                            source: p.source ?? "",
                            notes: p.notes ?? "",
                          })
                        }
                        className="text-forest hover:underline"
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(p)}
                        className="text-red-700 hover:underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal ? (
        <ProspectModal
          initial={modal}
          onClose={() => setModal(null)}
          onSaved={() => {
            setModal(null);
            refresh();
          }}
        />
      ) : null}

      {confirmDelete ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4"
          onClick={() => setConfirmDelete(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Confirmer la suppression"
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-lg text-charcoal">
              Supprimer ce prospect ?
            </h2>
            <p className="mt-2 text-sm text-charcoal/60">
              « {confirmDelete.company_name} » sera retiré de la liste de
              prospection. Cette action est irréversible.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-charcoal/70 hover:bg-sand"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => handleDelete(confirmDelete.id)}
                className="rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
