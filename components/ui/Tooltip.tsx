import type { ReactNode } from "react";

interface TooltipProps {
  label: string;
  children: ReactNode;
}

/**
 * Infobulle CSS pure : survol / focus affiche le libellé.
 * Réservée aux compléments vraiment utiles.
 */
export function Tooltip({ label, children }: TooltipProps) {
  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 -translate-x-1/2 whitespace-nowrap rounded-[var(--radius-sm)] bg-charcoal px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-[var(--shadow-pop)] transition-opacity duration-150 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}
