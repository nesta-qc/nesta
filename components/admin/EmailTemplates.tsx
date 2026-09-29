"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveEmailTemplate, type EmailTemplateRow } from "@/actions/crm";
import { renderTemplate } from "@/lib/crm";

/*
 * Gestion des modèles d'emails du CRM : liste, édition et aperçu
 * avec les variables {{prenom}} {{entreprise}} {{projet}} remplacées
 * par un exemple.
 */

const PREVIEW_VARS = {
  prenom: "Marie",
  entreprise: "Constructions Exemple",
  projet: "le Boisé du Parc",
};

export function EmailTemplates({
  templates,
}: {
  templates: EmailTemplateRow[];
}) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(
    templates[0]?.id ?? null,
  );
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selected = templates.find((t) => t.id === selectedId) ?? null;
  const isNew = selectedId === "new";

  function loadTemplate(t: EmailTemplateRow) {
    setSelectedId(t.id);
    setName(t.name);
    setSubject(t.subject);
    setBody(t.body);
    setStep(t.step);
    setMessage(null);
    setError(null);
  }

  function startNew() {
    setSelectedId("new");
    setName("");
    setSubject("");
    setBody("");
    setStep((templates.length || 0) + 1);
    setMessage(null);
    setError(null);
  }

  /* Charge le premier modèle au montage (et après refresh). */
  if (!isNew && selected && name === "" && subject === "" && body === "" && !saving) {
    setName(selected.name);
    setSubject(selected.subject);
    setBody(selected.body);
    setStep(selected.step);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    const result = await saveEmailTemplate(isNew ? null : selectedId, {
      name,
      subject,
      body,
      step,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.message ?? "L’enregistrement a échoué.");
      return;
    }
    if (result.id) setSelectedId(result.id);
    setMessage("Modèle enregistré.");
    router.refresh();
  }

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

      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        {/* Liste */}
        <div className="flex flex-col gap-2">
          {templates.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => loadTemplate(t)}
              className={`rounded-xl border p-3 text-left text-sm ${
                selectedId === t.id
                  ? "border-forest bg-forest/5"
                  : "border-border bg-white hover:border-forest/40"
              }`}
            >
              <p className="font-semibold text-charcoal">{t.name}</p>
              <p className="mt-0.5 text-xs text-charcoal/55">Étape {t.step}</p>
            </button>
          ))}
          <button
            type="button"
            onClick={startNew}
            className="rounded-xl border border-dashed border-charcoal/25 p-3 text-sm font-medium text-charcoal/60 hover:border-forest hover:text-forest"
          >
            + Nouveau modèle
          </button>
        </div>

        {/* Éditeur */}
        <div className="rounded-2xl border border-border bg-white p-5">
          {selected || isNew ? (
            <div className="grid gap-4 lg:grid-cols-2">
              <form onSubmit={handleSave} className="grid content-start gap-3">
                <h3 className="font-display text-lg text-charcoal">
                  {isNew ? "Nouveau modèle" : "Modifier le modèle"}
                </h3>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">
                    Nom
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 w-full rounded-xl border border-border bg-ivory px-3 py-2 text-sm text-charcoal outline-none focus:border-forest"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">
                    Objet
                  </span>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="mt-1 w-full rounded-xl border border-border bg-ivory px-3 py-2 text-sm text-charcoal outline-none focus:border-forest"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">
                    Contenu
                  </span>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    rows={12}
                    className="mt-1 w-full rounded-xl border border-border bg-ivory px-3 py-2 font-mono text-xs text-charcoal outline-none focus:border-forest"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">
                    Étape de la séquence
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={step}
                    onChange={(e) => setStep(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-border bg-ivory px-3 py-2 text-sm text-charcoal outline-none focus:border-forest"
                  />
                </label>
                <p className="text-xs text-charcoal/50">
                  Variables : {"{{prenom}}"} {"{{entreprise}}"} {"{{projet}}"}
                </p>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-forest px-4 py-2 text-sm font-semibold text-ivory hover:bg-forest/90 disabled:opacity-50"
                  >
                    {saving ? "Enregistrement…" : "Enregistrer"}
                  </button>
                </div>
              </form>

              {/* Aperçu */}
              <div className="rounded-2xl border border-border bg-sand/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/50">
                  Aperçu (exemple)
                </p>
                <div className="mt-3 rounded-xl border border-border bg-white">
                  <div className="border-b border-border px-4 py-3">
                    <p className="text-xs text-charcoal/50">Objet</p>
                    <p className="text-sm font-semibold text-charcoal">
                      {renderTemplate(subject, PREVIEW_VARS) || "—"}
                    </p>
                  </div>
                  <div className="px-4 py-3">
                    <p className="whitespace-pre-wrap text-sm text-charcoal/80">
                      {renderTemplate(body, PREVIEW_VARS) || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="py-10 text-center text-sm text-charcoal/50">
              Sélectionne un modèle pour le modifier, ou crée-en un nouveau.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
