import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

/**
 * Groupe champ de formulaire : libellé, contrôle (Input, Textarea, Select…),
 * indication optionnelle et message d'erreur.
 */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  required = false,
  children,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-charcoal">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p className="text-xs text-charcoal/50">{hint}</p>
      ) : null}
      {error ? (
        <p role="alert" className="text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
