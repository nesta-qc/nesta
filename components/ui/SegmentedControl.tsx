"use client";

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel: string;
  className?: string;
}

/**
 * Sélecteur segmenté (ex. Carte | Liste) : pilule unique, curseur discret.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className = "",
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`inline-flex rounded-full border border-border bg-white p-1 shadow-[var(--shadow-card)] ${className}`}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.value)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
              active
                ? "bg-forest text-white"
                : "text-charcoal/60 hover:text-charcoal"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
