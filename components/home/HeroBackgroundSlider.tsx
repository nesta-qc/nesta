"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HERO_ROTATION_MS, type SiteImage } from "@/lib/site-images";

interface HeroBackgroundSliderProps {
  images: SiteImage[];
  /** Contenu (titre, recherche) affiché par-dessus. */
  children: React.ReactNode;
}

/**
 * Fond cinématique plein écran : rotation douce toutes les 8 s,
 * crossfade 1,2 s, zoom Ken Burns quasi imperceptible, préchargement
 * de l'image suivante. Respecte prefers-reduced-motion (aucune
 * rotation, aucun zoom). Pause quand l'utilisateur interagit avec
 * le hero (focus, tactile) ou quand l'onglet est masqué.
 */
export function HeroBackgroundSlider({ images, children }: HeroBackgroundSliderProps) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [userHold, setUserHold] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = images.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const wrapped = ((next % count) + count) % count;
      if (wrapped === index) return;
      setPrevIndex(index);
      setIndex(wrapped);
      window.setTimeout(() => setPrevIndex(null), 1400);
    },
    [index, count]
  );

  const advance = useCallback(() => {
    const n = (index + 1) % count;
    setPrevIndex(index);
    setIndex(n);
    window.setTimeout(() => setPrevIndex(null), 1400);
  }, [index, count]);

  /* Rotation automatique. */
  useEffect(() => {
    if (reducedMotion || paused || userHold || count < 2) return;
    const id = window.setInterval(advance, HERO_ROTATION_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, paused, userHold, count, advance]);

  /* Pause quand l'onglet est masqué. */
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    setUserHold(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 48) goTo(index + (dx < 0 ? 1 : -1));
    touchX.current = null;
    window.setTimeout(() => setUserHold(false), 4000);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goTo(index + 1);
    if (e.key === "ArrowLeft") goTo(index - 1);
  };

  /* Fenêtre de rendu : précédente (fondu sortant), courante, suivante (préchargée). */
  const nextIndex = (index + 1) % count;
  const renderSet = new Set<number>([index, nextIndex]);
  if (prevIndex != null) renderSet.add(prevIndex);

  return (
    <section
      className="relative flex min-h-[560px] items-end overflow-hidden bg-forest-ink sm:items-center"
      style={{ height: "88vh" }}
      aria-roledescription="carousel"
      aria-label="Propriétés en vedette"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onFocus={() => setUserHold(true)}
      onBlur={() => setUserHold(false)}
    >
      {/* Images superposées — crossfade, jamais de flash blanc (fond forest-ink). */}
      {[...renderSet].map((i) => {
        const img = images[i];
        const isActive = i === index;
        const isPrev = i === prevIndex;
        return (
          <div
            key={img.src}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
              isActive ? "opacity-100" : "opacity-0"
            } ${!reducedMotion && (isActive || isPrev) ? "nesta-kenburns" : ""}`}
          >
            <Image
              src={img.src}
              alt={isActive ? img.alt : ""}
              fill
              priority={i === 0}
              sizes="100vw"
              quality={82}
              className="object-cover"
            />
          </div>
        );
      })}

      {/* Overlay de lisibilité uniquement : teinte forêt profonde, jamais décoratif. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1f19]/75 via-[#0a1f19]/25 to-[#0a1f19]/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a1f19]/45 via-transparent to-transparent"
      />

      {/* Contenu. */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-24 sm:px-8 sm:pb-20">
        {children}
      </div>

      {/* Indicateur discret : fines barres de progression. */}
      {count > 1 && !reducedMotion ? (
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-1.5"
        >
          {images.map((_, i) => (
            <span
              key={i}
              className="relative h-[3px] w-8 overflow-hidden rounded-full bg-white/25"
            >
              {i === index ? (
                <span
                  key={`bar-${index}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-white/90"
                  style={{
                    animation: `nesta-progress ${HERO_ROTATION_MS}ms linear forwards`,
                  }}
                />
              ) : null}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
