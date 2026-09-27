import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

/**
 * Liste déroulante native stylisée du design system NESTA.
 * À combiner avec <Field> pour le libellé et le message d'erreur.
 */
export function Select({ className = "", children, ...props }: SelectProps) {
  return (
    <select
      className={`w-full appearance-none rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-charcoal transition-colors focus:border-forest focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
