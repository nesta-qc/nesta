/* ============================================================
 * NESTA — formulaire du sas d'accès (client).
 * Étape 1 : code d'accès du site → POST /api/gate/code
 * Étape 2 : code à 6 chiffres (double vérification)
 *           → POST /api/gate/totp → redirection vers ?next
 * ============================================================ */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Etape = 1 | 2;

export default function AccesForm({ next }: { next: string }) {
  const router = useRouter();
  const [etape, setEtape] = useState<Etape>(1);
  const [valeur, setValeur] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);

  async function soumettre(e: React.FormEvent) {
    e.preventDefault();
    if (chargement) return;
    setErreur(null);
    setChargement(true);
    try {
      const url = etape === 1 ? "/api/gate/code" : "/api/gate/totp";
      const corps = etape === 1 ? { code: valeur } : { totp: valeur };
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corps),
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
      if (etape === 1) {
        setEtape(2);
        setValeur("");
        setChargement(false);
      } else {
        router.replace(next);
        router.refresh();
      }
    } catch {
      setErreur("Connexion impossible. Réessayez.");
      setChargement(false);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#0b1526] px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur">
        <div className="mb-6 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nesta-wordmark-transparent.png"
            alt="Nesta"
            className="mx-auto h-10 w-auto"
          />
          <h1 className="mt-4 text-xl font-semibold text-white">
            Accès protégé
          </h1>
          <p className="mt-1 text-sm text-white/60">
            {etape === 1
              ? "Ce site est en accès restreint. Saisissez le code d'accès."
              : "Double vérification : ouvrez votre application d'authentification et saisissez le code à 6 chiffres."}
          </p>
        </div>

        {/* Indicateur d'étapes */}
        <div className="mb-6 flex items-center justify-center gap-2">
          {[1, 2].map((n) => (
            <span
              key={n}
              className={`h-1.5 w-10 rounded-full transition-colors ${
                n <= etape ? "bg-emerald-400" : "bg-white/15"
              }`}
            />
          ))}
        </div>

        <form onSubmit={soumettre} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-white/80">
              {etape === 1 ? "Code d'accès" : "Code de vérification"}
            </span>
            <input
              type={etape === 1 ? "text" : "text"}
              inputMode={etape === 1 ? "text" : "numeric"}
              autoComplete="one-time-code"
              autoFocus
              value={valeur}
              onChange={(e) => setValeur(e.target.value)}
              placeholder={etape === 1 ? "••••-••••-••••" : "123456"}
              maxLength={etape === 1 ? 32 : 6}
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
            {chargement
              ? "Vérification…"
              : etape === 1
                ? "Continuer"
                : "Déverrouiller le site"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/40">
          L'accès reste actif 30 jours sur cet appareil.
        </p>
      </div>
    </main>
  );
}
