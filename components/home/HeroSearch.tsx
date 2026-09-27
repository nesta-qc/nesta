"use client";

import { useState } from "react";

/**
 * Barre de recherche premium du hero : ville, transaction, type, prix max,
 * chambres. Soumet en GET vers /search (mêmes paramètres que la page).
 */
export function HeroSearch() {
  const [transaction, setTransaction] = useState<"sale" | "rent">("sale");

  const field =
    "flex flex-col gap-1 px-5 py-3.5 text-left transition-colors focus-within:bg-ivory/60";
  const label = "text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal/45";
  const input =
    "w-full bg-transparent text-[15px] font-medium text-charcoal placeholder:text-charcoal/35 focus:outline-none";

  return (
    <form
      method="get"
      action="/search"
      role="search"
      aria-label="Recherche de propriété"
      className="mt-8 w-full max-w-3xl rounded-2xl bg-white/95 shadow-[0_24px_60px_-12px_rgb(10_31_25/0.45)] backdrop-blur-sm"
    >
      {/* Segmented Acheter / Louer */}
      <div className="flex gap-1 border-b border-charcoal/8 px-4 pt-3">
        {(["sale", "rent"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTransaction(t)}
            aria-pressed={transaction === t}
            className={`rounded-t-lg px-4 py-2 text-sm font-semibold transition-colors ${
              transaction === t
                ? "bg-forest text-white"
                : "text-charcoal/55 hover:text-charcoal"
            }`}
          >
            {t === "sale" ? "Acheter" : "Louer"}
          </button>
        ))}
        <input type="hidden" name="transaction" value={transaction} />
      </div>

      <div className="grid grid-cols-2 divide-x divide-charcoal/8 sm:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
        <label className={`${field} col-span-2 sm:col-span-1`}>
          <span className={label}>Où cherchez-vous ?</span>
          <input
            name="ville"
            placeholder="Ville, quartier…"
            autoComplete="off"
            className={input}
          />
        </label>
        <label className={field}>
          <span className={label}>Type</span>
          <select name="type" defaultValue="" className={`${input} cursor-pointer`}>
            <option value="">Tous</option>
            <option value="house">Maison</option>
            <option value="condo">Condo</option>
            <option value="plex">Plex</option>
            <option value="land">Terrain</option>
          </select>
        </label>
        <label className={`${field} border-t border-charcoal/8 sm:border-t-0`}>
          <span className={label}>Prix max</span>
          <select name="prix_max" defaultValue="" className={`${input} cursor-pointer`}>
            <option value="">Sans limite</option>
            <option value="300000">300 000 $</option>
            <option value="500000">500 000 $</option>
            <option value="750000">750 000 $</option>
            <option value="1000000">1 M$</option>
            <option value="1500000">1,5 M$</option>
          </select>
        </label>
        <label className={`${field} border-t border-charcoal/8 sm:border-t-0`}>
          <span className={label}>Chambres</span>
          <select name="chambres" defaultValue="" className={`${input} cursor-pointer`}>
            <option value="">Toutes</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </label>
        <div className="col-span-2 flex items-stretch p-2 sm:col-span-1">
          <button
            type="submit"
            aria-label="Rechercher"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-6 text-[15px] font-semibold text-white transition-all hover:bg-forest-deep sm:w-auto"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="sm:hidden">Rechercher</span>
          </button>
        </div>
      </div>
    </form>
  );
}
