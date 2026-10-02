import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

/**
 * État vide du design system VEYLA : utilisé pour les sections
 * en construction (« Disponible prochainement ») et les listes sans résultat.
 * Aucune donnée fictive n'est affichée ici.
 */
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-white px-8 py-16 text-center">
      <div className="h-1.5 w-12 rounded-full bg-gold" aria-hidden="true" />
      <h2 className="font-display text-2xl text-charcoal">{title}</h2>
      {description ? (
        <p className="max-w-md text-sm leading-relaxed text-charcoal/60">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
