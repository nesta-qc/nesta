import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

/**
 * Champ de saisie texte du design system VEYLA.
 * À combiner avec <Field> pour le libellé et le message d'erreur.
 */
export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 transition-colors focus:border-forest focus:outline-none ${className}`}
      {...props}
    />
  );
}
