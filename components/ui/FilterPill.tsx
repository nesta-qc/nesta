"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

interface FilterPillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: ReactNode;
}

/**
 * Pastille de filtre horizontal : état actif vert forêt, inactif contour.
 * Touch target ≥ 44px de hauteur.
 */
export function FilterPill({
  active,
  children,
  className = "",
  ...props
}: FilterPillProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
        active
          ? "border-forest bg-forest text-white"
          : "border-border bg-white text-charcoal/75 hover:border-border-strong hover:text-charcoal"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
