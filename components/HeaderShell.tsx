"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Coquille du header : se compacte légèrement et gagne une ombre
 * dès que l'utilisateur défile. Le contenu reste rendu côté serveur.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border/70 bg-ivory/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_10px_30px_-14px_rgba(30,58,50,0.35)]" : ""
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between px-5 transition-[height] duration-300 sm:px-8 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        {children}
      </div>
    </header>
  );
}
