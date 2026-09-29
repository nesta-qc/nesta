"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  approveSendBatch,
  deleteSendBatch,
  markBatchSent,
  type EmailTemplateRow,
  type SendBatchRow,
} from "@/actions/crm";
import { BATCH_STATUS_LABELS } from "@/lib/crm";
import { timeAgo } from "@/components/admin/format";

/*
 * Lots d'envoi du CRM : file d'approbation manuelle.
 * Brouillon → (go du patron) → Approuvé → (envoi manuel via Gmail) → Envoyé.
 * AUCUN envoi automatique n'est construit ici : le bouton « Copier les
 * courriels » prépare le collage dans Gmail.
 */

const BATCH_STYLES: Record<SendBatchRow["status"], string> = {
  brouillon: "bg-ivory text-charcoal border-border",
  approuve: "bg-champagne/20 text-charcoal border-champagne/50",
  envoye: "bg-forest/10 text-forest border-forest/30",
};

export function SendBatches({
  batches,
  templates,
  emailMap,
}: {
  batches: SendBatchRow[];
  templates: EmailTemplateRow[];
  emailMap: Record<string, string>;
}) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmApprove, setConfirmApprove] = useState<SendBatchRow | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<SendBatchRow | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const templateName = (id: string | null) =>
    templates.find((t) => t.id === id)?.name ?? "—";

  const batchEmails = (b: SendBatchRow): string[] =>
    (Array.isArray(b.prospect_ids) ? b.prospect_ids : [])
      .map((pid) => emailMap[pid])
      .filter((e): e is string => !!e);

  async function handleApprove() {
    if (!confirmApprove) return;
    setBusyId(confirmApprove.id);
    setError(null);
    const result = await approveSendBatch(confirmApprove.id);
    setBusyId(null);
    setConfirmApprove(null);
    if (!result.ok) {
      setError(result.message ?? "L’approbation a échoué.");
      return;
    }
    setMessage(
      "Lot approuvé. Copie les courriels, envoie-les via Gmail, puis clique « Marquer envoyé » pour journaliser l’envoi.",
    );
    router.refresh();
  }

  async function handleMarkSent(id: string) {
    setBusyId(id);
    setError(null);
    const result = await markBatchSent(id);
    setBusyId(null);
    if (!result.ok) {
      setError(result.message ?? "La mise à jour a échoué.");
      return;
    }
    setMessage("Lot marqué comme envoyé.");
    router.refresh();
  }

  async function handleDelete() {
    if (!confirmDelete) return;
    setBusyId(confirmDelete.id);
    setError(null);
    const result = await deleteSendBatch(confirmDelete.id);
    setBusyId(null);
    setConfirmDelete(null);
    if (!result.ok) {
      setError(result.message ?? "La suppression a échoué.");
      return;
    }
    setMessage("Brouillon supprimé.");
    router.refresh();
  }

  async function handleCopyEmails(b: SendBatchRow) {
    const emails = batchEmails(b);
    if (emails.length === 0) return;
    try {
      await navigator.clipboard.writeText(emails.join(", "));
      setCopiedId(b.id);
      setTimeout(() => setCopiedId((c) => (c === b.id ? null : c)), 2500);
    } catch {
      setError("Copie impossible : sélectionne les courriels manuellement.");
    }
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

      {batches.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-charcoal/20 bg-white px-6 py-10 text-center">
          <p className="text-sm text-charcoal/60">
            Aucun lot pour l’instant. Sélectionne des prospects dans le tableau
            puis « Créer un lot ».
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {batches.map((b) => {
            const emails = batchEmails(b);
            return (
              <li
                key={b.id}
                className="rounded-2xl border border-border bg-white p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-charcoal">{b.name}</p>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${BATCH_STYLES[b.status]}`}
                      >
                        {BATCH_STATUS_LABELS[b.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-charcoal/55">
                      {b.prospect_ids.length} prospect{b.prospect_ids.length > 1 ? "s" : ""}
                      {" · "}modèle : {templateName(b.template_id)}
                      {" · "}créé {timeAgo(b.created_at)}
                      {b.approved_at ? ` · approuvé ${timeAgo(b.approved_at)}` : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => handleCopyEmails(b)}
                      disabled={emails.length === 0}
                      className="rounded-xl border border-border px-3 py-1.5 text-charcoal/70 hover:bg-sand disabled:opacity-40"
                      title="Copier les courriels pour Gmail"
                    >
                      {copiedId === b.id ? "Copié !" : `Copier ${emails.length} courriel${emails.length > 1 ? "s" : ""}`}
                    </button>
                    {b.status === "brouillon" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setConfirmApprove(b)}
                          disabled={busyId === b.id}
                          className="rounded-xl bg-forest px-3 py-1.5 font-semibold text-ivory hover:bg-forest/90 disabled:opacity-50"
                        >
                          Approuver
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDelete(b)}
                          className="rounded-xl px-3 py-1.5 text-red-700 hover:underline"
                        >
                          Supprimer
                        </button>
                      </>
                    ) : null}
                    {b.status === "approuve" ? (
                      <button
                        type="button"
                        onClick={() => handleMarkSent(b.id)}
                        disabled={busyId === b.id}
                        title="À cliquer une fois les courriels réellement envoyés via Gmail : journalise l’envoi et avance la séquence."
                        className="rounded-xl border border-forest/40 px-3 py-1.5 font-semibold text-forest hover:bg-forest/10 disabled:opacity-50"
                      >
                        Marquer envoyé
                      </button>
                    ) : null}
                  </div>
                </div>
                {b.status === "brouillon" ? (
                  <p className="mt-2 text-xs text-charcoal/50">
                    En attente du go : l’approbation marque le lot « prêt à
                    envoyer » sans rien journaliser. Envoie ensuite les
                    courriels via Gmail, puis « Marquer envoyé » journalise
                    l’envoi pour chaque prospect et avance sa séquence.
                  </p>
                ) : null}
                {b.status === "approuve" ? (
                  <p className="mt-2 text-xs text-charcoal/50">
                    Approuvé — envoie les courriels via Gmail (bouton « Copier
                    les courriels »), puis clique « Marquer envoyé » une fois
                    que c’est réellement parti.
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}

      {confirmApprove ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4"
          onClick={() => setConfirmApprove(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Approuver le lot"
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-lg text-charcoal">
              Approuver « {confirmApprove.name} » ?
            </h2>
            <p className="mt-2 text-sm text-charcoal/65">
              C’est le go du patron. L’approbation passe le lot en « approuvé » —
              elle ne journalise rien. Ensuite :
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-charcoal/65">
              <li>
                copie les {confirmApprove.prospect_ids.length} courriels avec le
                bouton « Copier les courriels » ;
              </li>
              <li>envoie-les via Gmail ;</li>
              <li>
                clique « Marquer envoyé » — c’est là que l’email est journalisé
                pour chaque prospect et que sa séquence avance.
              </li>
            </ul>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmApprove(null)}
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-charcoal/70 hover:bg-sand"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleApprove}
                disabled={busyId === confirmApprove.id}
                className="rounded-xl bg-forest px-4 py-2 text-sm font-semibold text-ivory hover:bg-forest/90 disabled:opacity-50"
              >
                {busyId === confirmApprove.id ? "Approbation…" : "Oui, approuver"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {confirmDelete ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4"
          onClick={() => setConfirmDelete(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Supprimer le brouillon"
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-lg text-charcoal">
              Supprimer ce brouillon ?
            </h2>
            <p className="mt-2 text-sm text-charcoal/60">
              « {confirmDelete.name} » sera supprimé. Les prospects ne sont pas
              touchés.
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
                onClick={handleDelete}
                disabled={busyId === confirmDelete.id}
                className="rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-50"
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
