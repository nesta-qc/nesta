import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Zone de texte multiligne du design system NESTA.
 * À combiner avec <Field> pour le libellé et le message d'erreur.
 */
export function Textarea({ className = "", rows = 4, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={`w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 transition-colors focus:border-forest focus:outline-none ${className}`}
      {...props}
    />
  );
}
