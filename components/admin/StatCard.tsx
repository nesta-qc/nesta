interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  subTone?: "default" | "warn";
}

/** Carte statistique de l'Overview : libellé, grande valeur, sous-texte. */
export function StatCard({ label, value, sub, subTone = "default" }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-charcoal/50">
        {label}
      </p>
      <p className="mt-2 font-display text-[32px] leading-none text-charcoal">
        {value}
      </p>
      {sub ? (
        <p
          className={`mt-2 text-xs ${
            subTone === "warn"
              ? "font-medium text-amber-700"
              : "text-charcoal/60"
          }`}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}
