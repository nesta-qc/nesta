import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Carte de contenu du design system VEYLA : fond blanc, bordure subtile,
 * coins arrondis généreux. Aucun effet de verre, aucune ombre agressive.
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-2xl border border-border bg-white ${className}`}>
      {children}
    </div>
  );
}
