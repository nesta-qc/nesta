"use client";

import { useEffect, useState } from "react";

/**
 * Écran d'accueil éclair : « Nesta » en fondu sur fond ivoire,
 * visible ~1 s à l'arrivée puis retiré du DOM.
 * Léger : aucun asset, une seule animation CSS, aucun blocage d'interaction.
 * N'apparaît qu'au chargement initial (le layout persiste en navigation cliente).
 */
export function Splash() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <>
      <style>{`@keyframes nesta-splash{0%{opacity:0}25%{opacity:1}70%{opacity:1}100%{opacity:0}}`}</style>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{
          backgroundColor: "var(--color-ivory)",
          animation: "nesta-splash 1.1s ease forwards",
          pointerEvents: "none",
        }}
      >
        <p
          className="text-5xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-forest)",
          }}
        >
          Nesta
        </p>
      </div>
    </>
  );
}
