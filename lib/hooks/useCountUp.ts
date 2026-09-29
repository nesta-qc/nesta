import { useEffect, useRef, useState } from "react";

/**
 * Compteur animé : fait défiler une valeur vers sa cible avec un easing
 * sortant (requestAnimationFrame, sans dépendance). Respecte
 * prefers-reduced-motion (valeur appliquée sans transition).
 *
 * @param target  valeur cible
 * @param durationMs durée de l'animation (défaut 900 ms)
 * @returns la valeur courante (à formater par l'appelant)
 */
export function useCountUp(target: number, durationMs = 900): number {
  const [value, setValue] = useState(target);
  const targetRef = useRef(target);
  const valueRef = useRef(target);

  useEffect(() => {
    if (targetRef.current === target) return;
    const from = valueRef.current;
    targetRef.current = target;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 0 : durationMs;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = dur === 0 ? 1 : Math.min(1, (now - start) / dur);
      // easeOutExpo : départ franc, arrivée toute douce.
      const eased = t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const current = Math.round(from + (target - from) * eased);
      valueRef.current = current;
      setValue(current);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}
