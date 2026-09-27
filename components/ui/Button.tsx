import type { ButtonHTMLAttributes, ReactNode } from "react";

/* Variantes visuelles du bouton. */
type ButtonVariant = "primary" | "secondary" | "ghost";
/* Tailles du bouton. */
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  /* Action principale : vert forêt plein. */
  primary:
    "bg-forest text-white hover:bg-forest-deep focus-visible:outline-forest",
  /* Action secondaire : contour subtil sur fond blanc. */
  secondary:
    "border border-border bg-white text-charcoal hover:border-gold hover:bg-cream",
  /* Action discrète : texte seul. */
  ghost: "text-forest hover:bg-cream",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

/**
 * Bouton principal du design system NESTA.
 * Trois variantes (primary / secondary / ghost), trois tailles.
 */
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
