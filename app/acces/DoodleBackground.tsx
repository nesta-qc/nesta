/* ============================================================
 * NESTA — fond quadrillé interactif du sas d'accès.
 * Papier millimétré subtil + griffonnage au crayon (souris/tactile).
 * Purement décoratif : aucun impact sur la sécurité du sas.
 * ============================================================ */
"use client";

import { useEffect, useRef, useState } from "react";

/* Curseur crayon dessiné en SVG : corps brun, efface rose, style épuré. */
const PENCIL_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'>" +
  "<g transform='rotate(45 18 18)'>" +
  "<rect x='15.5' y='5' width='5' height='15' rx='1' fill='%239C6B3C'/>" +
  "<rect x='15.5' y='2' width='5' height='3.4' rx='1' fill='%23F2A3C0'/>" +
  "<rect x='15.5' y='5' width='5' height='1.2' fill='%23D9CFC2'/>" +
  "<polygon points='15.5,20 20.5,20 18,28.5' fill='%23EAD9B8'/>" +
  "<polygon points='16.9,23.5 19.1,23.5 18,28.5' fill='%23333333'/>" +
  "</g></svg>";

const CURSOR = `url("data:image/svg+xml,${encodeURIComponent(
  PENCIL_SVG
)}") 11 25, crosshair`;

const FOND = "#0b1526";
const COULEUR_TRAIT = "rgba(226,232,240,0.55)";
const EPAISSEUR = 2.2;
const MAX_POINTS = 6000;

type Pt = { x: number; y: number };

export default function DoodleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const traitsRef = useRef<Pt[][]>([]);
  const enCoursRef = useRef<Pt[] | null>(null);
  const [, rafraichir] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const repeindre = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const echelle = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * echelle);
      canvas.height = Math.round(h * echelle);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(echelle, 0, 0, echelle, 0, 0);

      /* Fond bleu marine. */
      ctx.fillStyle = FOND;
      ctx.fillRect(0, 0, w, h);

      /* Quadrillé : petites mailles + lignes fortes façon papier. */
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(148,163,184,0.10)";
      ctx.beginPath();
      for (let x = 0.5; x <= w; x += 28) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0.5; y <= h; y += 28) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
      ctx.strokeStyle = "rgba(148,163,184,0.17)";
      ctx.beginPath();
      for (let x = 0.5; x <= w; x += 140) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0.5; y <= h; y += 140) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      /* Rejoue les traits existants (après un redimensionnement). */
      ctx.strokeStyle = COULEUR_TRAIT;
      ctx.lineWidth = EPAISSEUR;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (const trait of traitsRef.current) {
        if (trait.length === 1) {
          ctx.beginPath();
          ctx.fillStyle = COULEUR_TRAIT;
          ctx.arc(trait[0].x, trait[0].y, EPAISSEUR / 2, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }
        ctx.beginPath();
        ctx.moveTo(trait[0].x, trait[0].y);
        for (let i = 1; i < trait.length - 1; i++) {
          const mx = (trait[i].x + trait[i + 1].x) / 2;
          const my = (trait[i].y + trait[i + 1].y) / 2;
          ctx.quadraticCurveTo(trait[i].x, trait[i].y, mx, my);
        }
        const dernier = trait[trait.length - 1];
        ctx.lineTo(dernier.x, dernier.y);
        ctx.stroke();
      }
    };

    repeindre();
    window.addEventListener("resize", repeindre);

    const position = (e: PointerEvent): Pt => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const demarrer = (e: PointerEvent) => {
      enCoursRef.current = [position(e)];
      traitsRef.current.push(enCoursRef.current);
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        /* capture indisponible : le dessin reste fonctionnel */
      }
      rafraichir((n) => n + 1);
    };

    const dessiner = (e: PointerEvent) => {
      const trait = enCoursRef.current;
      if (!trait) return;
      const p = position(e);
      const precedent = trait[trait.length - 1];
      ctx.strokeStyle = COULEUR_TRAIT;
      ctx.lineWidth = EPAISSEUR;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(precedent.x, precedent.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      trait.push(p);

      /* Borne mémoire : on oublie les traits les plus anciens. */
      let total = 0;
      for (const t of traitsRef.current) total += t.length;
      while (total > MAX_POINTS && traitsRef.current.length > 1) {
        total -= traitsRef.current.shift()!.length;
      }
    };

    const terminer = () => {
      enCoursRef.current = null;
    };

    canvas.addEventListener("pointerdown", demarrer);
    canvas.addEventListener("pointermove", dessiner);
    canvas.addEventListener("pointerup", terminer);
    canvas.addEventListener("pointercancel", terminer);

    return () => {
      window.removeEventListener("resize", repeindre);
      canvas.removeEventListener("pointerdown", demarrer);
      canvas.removeEventListener("pointermove", dessiner);
      canvas.removeEventListener("pointerup", terminer);
      canvas.removeEventListener("pointercancel", terminer);
    };
  }, []);

  const effacer = () => {
    traitsRef.current = [];
    enCoursRef.current = null;
    window.dispatchEvent(new Event("resize"));
    rafraichir((n) => n + 1);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-0"
        style={{ cursor: CURSOR, touchAction: "none" }}
      />
      <p className="pointer-events-none fixed bottom-4 left-5 z-10 text-xs text-white/30">
        Griffonne sur le fond ✏️
      </p>
      {traitsRef.current.length > 0 && (
        <button
          type="button"
          onClick={effacer}
          className="fixed bottom-3 right-4 z-10 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/60 backdrop-blur transition hover:bg-white/10 hover:text-white"
        >
          Effacer
        </button>
      )}
    </>
  );
}
