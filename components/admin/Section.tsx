import type { ReactNode } from "react";

/** Section du dashboard : titre, description optionnelle, contenu. */
export function Section({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mt-8 first:mt-0">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl text-charcoal">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-charcoal/60">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
