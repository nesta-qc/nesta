import type { ReactNode } from "react";

/* Variantes visuelles du badge. */
type BadgeVariant = "gold" | "forest" | "muted";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  /* Accent champagne : statut mis en valeur. */
  gold: "bg-gold/20 text-charcoal",
  /* Vert forêt : statut actif / vérifié. */
  forest: "bg-forest text-white",
  /* Neutre : statut informatif discret. */
  muted: "bg-cream text-charcoal/70 border border-border",
};

/**
 * Petite étiquette de statut du design system VEYLA.
 */
export function Badge({
  variant = "muted",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
