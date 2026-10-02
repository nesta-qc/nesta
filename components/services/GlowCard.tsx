"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";

/* ============================================================
 * VEYLA — carte avec lueur verte minimaliste qui suit le curseur.
 * La bordure (1px) s'illumine en vert forêt autour du point du
 * curseur + léger halo intérieur. Sans curseur : bordure normale.
 * ============================================================ */

const GREEN = "74, 140, 94"; // vert forêt VEYLA

export function GlowCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 0, y: 0, on: false });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top, on: true });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, on: false }))}
      className="h-full rounded-2xl p-px transition-[background] duration-300"
      style={{
        background: glow.on
          ? `radial-gradient(340px circle at ${glow.x}px ${glow.y}px, rgba(${GREEN}, 0.65), rgba(${GREEN}, 0.12) 45%, transparent 70%)`
          : "var(--color-border)",
      }}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] bg-white p-8">
        {/* halo intérieur subtil */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glow.on ? 1 : 0,
            background: `radial-gradient(520px circle at ${glow.x}px ${glow.y}px, rgba(${GREEN}, 0.08), transparent 60%)`,
          }}
        />
        <div className="relative flex h-full flex-col">{children}</div>
      </div>
    </div>
  );
}
