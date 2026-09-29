"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteProspect, type ProspectRow } from "@/actions/prospects";
import {
  addProspectActivity,
  setProspectFollowUp,
  updateProspectFull,
  type ProspectActivityRow,
} from "@/actions/crm";
import {
  PROSPECT_STATUSES,
  PROSPECT_STATUS_LABELS,
  type ProspectStatus,
} from "@/lib/prospects";
import {
  ACTIVITY_TYPE_LABELS,
  EMAIL_CONFIDENCE,
  EMAIL_CONFIDENCE_LABELS,
  STAGE_PROBABILITY,
  DEAL_VALUE_PER_PROJECT_CENTS,
  formatMoney,
  parseRdvDate,
  stripRdvDatePrefix,
  type ActivityType,
  type EmailConfidence,
} from "@/lib/crm";
import { timeAgo } from "@/components/admin/format";

/*
 * Fiche prospect du CRM : informations éditables, prochaine relance,
 * journal d'activités (notes, emails, appels, RDV, changements de statut).
 */

const ACTIVITY_STYLES: Record<ActivityType, string> = {
  note: "border-border bg-white",
  email_envoye: "border-blue-200 bg-blue-50/60",
  reponse: "border-forest/30 bg-forest/10",
  appel: "border-champagne/50 bg-champagne/10",
  rdv: "border-champagne/70 bg-champagne/15",
  changement_statut: "border-charcoal/10 bg-charcoal/[0.03]",
};

function activityTitle(a: ProspectActivityRow): string {
  if (a.type === "rdv") {
    const at = parseRdvDate(a.body);
    if (at) {
      return `Rendez-vous prévu le ${new Date(at).toLocaleDateString("fr-CA", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
  }
  return ACTIVITY_TYPE_LABELS[a.type];
}

export function ProspectDetail({
  prospect,
  activities,
}: {
  prospect: ProspectRow;
  activities: ProspectActivityRow[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    company_name: prospect.company_name,
    contact_name: prospect.contact_name ?? "",
    email: prospect.email ?? "",
    phone: prospect.phone ?? "",
    website: prospect.website ?? "",
    project_name: prospect.project_name ?? "",
    project_location: prospect.project_location ?? "",
    project_type: prospect.project_type ?? "",
    source: prospect.source ?? "",
    notes: prospect.notes ?? "",
    status: prospect.status as ProspectStatus,
    assigned_to: prospect.assigned_to ?? "",
    estimated_projects: prospect.estimated_projects ?? 1,
    email_confidence: prospect.email_confidence as EmailConfidence,
    email_step: prospect.email_step ?? 0,
    do_not_contact: prospect.do_not_contact ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [actType, setActType] = useState<ActivityType>("note");
  const [actBody, setActBody] = useState("");
  const [actDate, setActDate] = useState("");
  const [actSaving, setActSaving] = useState(false);

  const [followUp, setFollowUp] = useState(
    prospect.next_follow_up_at ? prospect.next_follow_up_at.slice(0, 10) : "",
  );
  const [confirmDelete, setConfirmDelete] = useState(false);

  const weighted = (STAGE_PROBABILITY[prospect.status] ?? 0) *
    Math.max(0, prospect.estimated_projects ?? 1) *
    DEAL_VALUE_PER_PROJECT_CENTS;
  const overdue =
    !!prospect.next_follow_up_at &&
    new Date(prospect.next_follow_up_at).getTime() < Date.now() &&
    prospect.status !== "refuse" &&
    prospect.status !== "partenaire";

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    const result = await updateProspectFull(prospect.id, {
      ...form,
      next_follow_up_at: prospect.next_follow_up_at,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.message ?? "L’enregistrement a échoué.");
      return;
    }
    setEditing(false);
    setMessage("Fiche mise à jour.");
    router.refresh();
  }

  async function handleAddActivity(e: React.FormEvent) {
    e.preventDefault();
    if (!actBody.trim() && actType !== "rdv") {
      setError("Écris quelque chose avant d’ajouter.");
      return;
    }
    setActSaving(true);
    setError(null);
    let body = actBody.trim() || null;
    if (actType === "rdv" && actDate) {
      const d = new Date(actDate);
      const stamp = `${actDate.slice(0, 10)} ${actDate.slice(11, 16)}`;
      body = `[${stamp}]${body ? ` ${body}` : ""}`;
      void d;
    }
    const result = await addProspectActivity(prospect.id, actType, body);
    setActSaving(false);
    if (!result.ok) {
      setError(result.message ?? "L’ajout a échoué.");
      return;
    }
    setActBody("");
    setActDate("");
    setMessage("Activité ajoutée au journal.");
    router.refresh();
  }

  async function handleFollowUp() {
    setError(null);
    setMessage(null);
    const result = await setProspectFollowUp(prospect.id, followUp || null);
    if (!result.ok) {
      setError(result.message ?? "La relance n’a pas pu être définie.");
      return;
    }
    setMessage(
      followUp ? "Relance planifiée." : "Relance effacée.",
    );
    router.refresh();
  }

  async function handleDelete() {
    const result = await deleteProspect(prospect.id);
    if (!result.ok) {
      setError(result.message ?? "La suppression a échoué.");
      setConfirmDelete(false);
      return;
    }
    router.push("/admin/prospection");
    router.refresh();
  }

  const inputCls =
    "mt-1 w-full rounded-xl border border-border bg-ivory px-3 py-2 text-sm text-charcoal outline-none focus:border-forest";
  const labelCls = "text-xs font-semibold uppercase tracking-wide text-charcoal/60";

  return (
    <div>
      <Link
        href="/admin/prospection"
        className="text-sm font-medium text-forest hover:underline"
      >
        ← Retour à la prospection
      </Link>

      {message ? (
        <p role="status" className="mt-4 rounded-xl border border-forest/30 bg-forest/10 px-4 py-3 text-sm font-medium text-forest">
          {message}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      {/* En-tête */}
      <div className="mt-4 rounded-2xl border border-border bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl text-charcoal">
              {prospect.company_name}
            </h1>
            <p className="mt-1 text-sm text-charcoal/60">
              {[prospect.contact_name, prospect.email, prospect.phone]
                .filter(Boolean)
                .join(" · ") || "Aucun contact renseigné"}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-border bg-sand/60 px-2.5 py-1 font-semibold text-charcoal">
                {PROSPECT_STATUS_LABELS[prospect.status]}
              </span>
              <span className="rounded-full border border-border px-2.5 py-1 text-charcoal/60">
                Email : {EMAIL_CONFIDENCE_LABELS[prospect.email_confidence] ?? "—"}
              </span>
              {prospect.do_not_contact ? (
                <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 font-semibold text-red-700">
                  Ne pas contacter
                </span>
              ) : null}
              {prospect.email_step > 0 ? (
                <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-blue-800">
                  Séquence email : étape {prospect.email_step}
                </span>
              ) : null}
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-charcoal/50">
              Valeur pondérée
            </p>
            <p className="font-display text-3xl text-forest">{formatMoney(weighted)}</p>
            <p className="text-xs text-charcoal/55">
              {Math.round((STAGE_PROBABILITY[prospect.status] ?? 0) * 100)} % ×{" "}
              {prospect.estimated_projects} projet{prospect.estimated_projects > 1 ? "s" : ""} × 4 800 $
            </p>
          </div>
        </div>

        {/* Relance */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
          <label htmlFor="followup" className="text-sm font-medium text-charcoal">
            Prochaine relance
          </label>
          <input
            id="followup"
            type="date"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            className={`rounded-xl border px-3 py-2 text-sm outline-none ${
              overdue
                ? "border-red-300 bg-red-50 text-red-700"
                : "border-border bg-white text-charcoal"
            }`}
          />
          <button
            type="button"
            onClick={handleFollowUp}
            className="rounded-xl bg-forest px-4 py-2 text-sm font-semibold text-ivory hover:bg-forest/90"
          >
            Définir
          </button>
          {prospect.next_follow_up_at ? (
            <button
              type="button"
              onClick={() => {
                setFollowUp("");
                setProspectFollowUp(prospect.id, null).then(() => router.refresh());
              }}
              className="text-sm text-charcoal/55 hover:text-charcoal hover:underline"
            >
              Effacer
            </button>
          ) : null}
          {overdue ? (
            <span className="text-sm font-semibold text-red-700">
              Relance dépassée ({timeAgo(prospect.next_follow_up_at)})
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Informations */}
        <section className="rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-charcoal">Informations</h2>
            {!editing ? (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-sm font-medium text-forest hover:underline"
              >
                Modifier
              </button>
            ) : null}
          </div>
          {!editing ? (
            <dl className="mt-3 grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2">
              {[
                ["Contact", prospect.contact_name],
                ["Courriel", prospect.email],
                ["Téléphone", prospect.phone],
                ["Site web", prospect.website],
                ["Projet", prospect.project_name],
                ["Localisation", prospect.project_location],
                ["Type de projet", prospect.project_type],
                ["Source", prospect.source],
                ["Assigné à", prospect.assigned_to],
                ["Dernier contact", prospect.last_contact_at ? timeAgo(prospect.last_contact_at) : null],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className={labelCls}>{k}</dt>
                  <dd className="mt-0.5 text-charcoal">{v || "—"}</dd>
                </div>
              ))}
              <div className="sm:col-span-2">
                <dt className={labelCls}>Notes</dt>
                <dd className="mt-0.5 whitespace-pre-wrap text-charcoal">
                  {prospect.notes || "—"}
                </dd>
              </div>
            </dl>
          ) : (
            <form onSubmit={handleSave} className="mt-3 grid gap-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className={labelCls}>Entreprise *</span>
                  <input type="text" required value={form.company_name}
                    onChange={(e) => setForm((f) => ({ ...f, company_name: e.target.value }))}
                    className={inputCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>Statut</span>
                  <select value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ProspectStatus }))}
                    className={inputCls}>
                    {PROSPECT_STATUSES.map((s) => (
                      <option key={s} value={s}>{PROSPECT_STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className={labelCls}>Contact</span>
                  <input type="text" value={form.contact_name}
                    onChange={(e) => setForm((f) => ({ ...f, contact_name: e.target.value }))}
                    className={inputCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>Courriel</span>
                  <input type="email" value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={inputCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>Confiance email</span>
                  <select value={form.email_confidence}
                    onChange={(e) => setForm((f) => ({ ...f, email_confidence: e.target.value as EmailConfidence }))}
                    className={inputCls}>
                    {EMAIL_CONFIDENCE.map((c) => (
                      <option key={c} value={c}>{EMAIL_CONFIDENCE_LABELS[c]}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className={labelCls}>Téléphone</span>
                  <input type="text" value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className={inputCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>Site web</span>
                  <input type="text" value={form.website}
                    onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                    className={inputCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>Projet</span>
                  <input type="text" value={form.project_name}
                    onChange={(e) => setForm((f) => ({ ...f, project_name: e.target.value }))}
                    className={inputCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>Localisation</span>
                  <input type="text" value={form.project_location}
                    onChange={(e) => setForm((f) => ({ ...f, project_location: e.target.value }))}
                    className={inputCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>Type de projet</span>
                  <input type="text" value={form.project_type}
                    onChange={(e) => setForm((f) => ({ ...f, project_type: e.target.value }))}
                    className={inputCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>Assigné à</span>
                  <input type="text" value={form.assigned_to}
                    onChange={(e) => setForm((f) => ({ ...f, assigned_to: e.target.value }))}
                    className={inputCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>Projets estimés</span>
                  <input type="number" min={0} max={50} value={form.estimated_projects}
                    onChange={(e) => setForm((f) => ({ ...f, estimated_projects: Number(e.target.value) }))}
                    className={inputCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>Étape email</span>
                  <input type="number" min={0} max={10} value={form.email_step}
                    onChange={(e) => setForm((f) => ({ ...f, email_step: Number(e.target.value) }))}
                    className={inputCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>Source</span>
                  <input type="text" value={form.source}
                    onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
                    className={inputCls} />
                </label>
              </div>
              <label className="block">
                <span className={labelCls}>Notes</span>
                <textarea value={form.notes} rows={3}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className={inputCls} />
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-charcoal">
                <input type="checkbox" checked={form.do_not_contact}
                  onChange={(e) => setForm((f) => ({ ...f, do_not_contact: e.target.checked }))}
                  className="h-4 w-4 accent-[#2f4a3c]" />
                Ne plus contacter ce prospect
              </label>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setEditing(false)}
                  className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-charcoal/70 hover:bg-sand">
                  Annuler
                </button>
                <button type="submit" disabled={saving}
                  className="rounded-xl bg-forest px-4 py-2 text-sm font-semibold text-ivory hover:bg-forest/90 disabled:opacity-50">
                  {saving ? "Enregistrement…" : "Enregistrer"}
                </button>
              </div>
            </form>
          )}

          {/* Zone danger */}
          <div className="mt-6 border-t border-border/60 pt-4">
            {!confirmDelete ? (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="text-sm font-medium text-red-700 hover:underline"
              >
                Supprimer ce prospect
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm text-charcoal/70">Supprimer définitivement ?</p>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="rounded-xl border border-border px-3 py-1.5 text-sm font-medium text-charcoal/70 hover:bg-sand"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="rounded-xl bg-red-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-800"
                >
                  Oui, supprimer
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Journal d'activités */}
        <section className="rounded-2xl border border-border bg-white p-5">
          <h2 className="font-display text-lg text-charcoal">Journal d’activités</h2>

          <form onSubmit={handleAddActivity} className="mt-3 grid gap-2 rounded-2xl border border-border bg-sand/40 p-3">
            <div className="flex flex-wrap gap-2">
              <select
                value={actType}
                onChange={(e) => setActType(e.target.value as ActivityType)}
                aria-label="Type d’activité"
                className="rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none focus:border-forest"
              >
                {(Object.keys(ACTIVITY_TYPE_LABELS) as ActivityType[])
                  .filter((t) => t !== "changement_statut")
                  .map((t) => (
                    <option key={t} value={t}>{ACTIVITY_TYPE_LABELS[t]}</option>
                  ))}
              </select>
              {actType === "rdv" ? (
                <input
                  type="datetime-local"
                  value={actDate}
                  onChange={(e) => setActDate(e.target.value)}
                  aria-label="Date du rendez-vous"
                  className="rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none focus:border-forest"
                />
              ) : null}
            </div>
            <textarea
              value={actBody}
              onChange={(e) => setActBody(e.target.value)}
              rows={2}
              placeholder={
                actType === "rdv"
                  ? "Objet du rendez-vous…"
                  : actType === "note"
                    ? "Note interne…"
                    : "Détails…"
              }
              className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-forest"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={actSaving}
                className="rounded-xl bg-forest px-4 py-2 text-sm font-semibold text-ivory hover:bg-forest/90 disabled:opacity-50"
              >
                {actSaving ? "Ajout…" : "Ajouter"}
              </button>
            </div>
          </form>

          <ol className="mt-4 flex flex-col gap-2.5">
            {activities.map((a) => (
              <li
                key={a.id}
                className={`rounded-xl border p-3 ${ACTIVITY_STYLES[a.type]}`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-charcoal">
                    {activityTitle(a)}
                  </p>
                  <p className="text-xs text-charcoal/45" title={a.created_at}>
                    {timeAgo(a.created_at)}
                    {a.created_by ? ` · ${a.created_by}` : ""}
                  </p>
                </div>
                {stripRdvDatePrefix(a.body) ? (
                  <p className="mt-1 whitespace-pre-wrap text-sm text-charcoal/75">
                    {stripRdvDatePrefix(a.body)}
                  </p>
                ) : null}
              </li>
            ))}
            {activities.length === 0 ? (
              <li className="rounded-xl border border-dashed border-charcoal/20 px-4 py-8 text-center text-sm text-charcoal/50">
                Aucune activité pour l’instant.
              </li>
            ) : null}
          </ol>
        </section>
      </div>
    </div>
  );
}
