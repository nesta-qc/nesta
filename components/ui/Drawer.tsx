"use client";

import { useEffect, type ReactNode } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Action affichée en bas (ex. « Appliquer les filtres »). */
  footer?: ReactNode;
}

/**
 * Tiroir inférieur (bottom sheet) pour mobile : filtres, options.
 * Sur desktop, se comporte comme une modale centrée étroite.
 */
export function Drawer({ open, onClose, title, children, footer }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/45 sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="nesta-fade-up flex max-h-[88vh] w-full flex-col rounded-t-[var(--radius-xl)] bg-white shadow-[var(--shadow-pop)] sm:max-w-md sm:rounded-[var(--radius-lg)]"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-display text-lg text-charcoal">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none text-charcoal/60 transition-colors hover:bg-ivory hover:text-charcoal"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer ? (
          <div className="border-t border-border px-6 py-4">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
