/* ============================================================
 * NESTA — formulaire du sas d'accès (client).
 * Une seule étape : code d'accès du site → POST /api/gate/code
 * → redirection vers ?next (?next=…).
 * ============================================================ */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DoodleBackground from "./DoodleBackground";

export default function AccesForm({ next }: { next: string }) {
  const router = useRouter();
  const [valeur, setValeur] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);

  async function soumettre(e: React.FormEvent) {
    e.preventDefault();
    if (chargement) return;
    setErreur(null);
    setChargement(true);
    try {
      const res = await fetch("/api/gate/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: valeur }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!res.ok || !data?.ok) {
        setErreur(data?.error ?? "Une erreur est survenue.");
        setChargement(false);
        return;
      }
      router.replace(next);
      router.refresh();
    } catch {
      setErreur("Connexion impossible. Réessayez.");
      setChargement(false);
    }
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center bg-[#0b1526] px-4 py-12">
      <DoodleBackground />
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur">
        <div className="mb-6 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-groupe-nesta.png"
            alt="Groupe Nesta"
            className="mx-auto h-10 w-auto brightness-0 invert"
          />
          <h1 className="mt-4 text-xl font-semibold text-white">
            Accès protégé
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Ce site est en accès restreint. Saisissez le code d&apos;accès.
          </p>
        </div>

        <form onSubmit={soumettre} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-white/80">
              Code d&apos;accès
            </span>
            <input
              type="text"
              inputMode="text"
              autoComplete="off"
              autoFocus
              value={valeur}
              onChange={(e) => setValeur(e.target.value)}
              placeholder="••••-••••-••••"
              maxLength={32}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center text-lg tracking-widest text-white placeholder:text-white/25 focus:border-emerald-400 focus:outline-none"
            />
          </label>

          {erreur && (
            <p role="alert" className="text-center text-sm text-red-400">
              {erreur}
            </p>
          )}

          <button
            type="submit"
            disabled={chargement || valeur.trim().length === 0}
            className="w-full rounded-xl bg-emerald-400 px-4 py-3 font-semibold text-[#0b1526] transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {chargement ? "Vérification…" : "Déverrouiller le site"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/40">
          L&apos;accès reste actif 30 jours sur cet appareil.
        </p>
      </div>
    </main>
  );
}
