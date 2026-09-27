import Link from "next/link";
import type { AuditEntry } from "@/actions/admin";
import { auditActionLabel, timeAgo } from "./format";

/** Historique des décisions admin sur un objet (ou vide élégant). */
export function AuditTimeline({ entries }: { entries: AuditEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className="text-sm text-charcoal/50">
        Aucune action administrative enregistrée pour le moment.
      </p>
    );
  }
  return (
    <ol className="space-y-0">
      {entries.map((e) => (
        <li
          key={e.id}
          className="flex gap-4 border-l-2 border-border py-3 pl-4 first:pt-0 last:pb-0"
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-charcoal">
              {auditActionLabel(e.action)}
            </p>
            <p className="mt-0.5 text-xs text-charcoal/55">
              {e.adminName ?? "Admin"} · {timeAgo(e.created_at)}
              {e.old_value || e.new_value ? (
                <span className="font-mono">
                  {" "}
                  · {JSON.stringify(e.old_value ?? null)} →{" "}
                  {JSON.stringify(e.new_value ?? null)}
                </span>
              ) : null}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Lien discret « voir tout » — utilisé dans les sections. */
export function SeeAllLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-forest underline-offset-4 hover:underline"
    >
      {children}
    </Link>
  );
}
