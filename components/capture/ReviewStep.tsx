"use client";

import { Button } from "@/components/ui";
import type { PhotoCheck, NestaScore } from "@/lib/capture/scoring";

/* ============================================================
 * VEYLA Capture — révision d'une photo après analyse.
 * Score /100, constats techniques, recommandations, choix
 * garder / reprendre.
 * ============================================================ */

interface Props {
  imageUrl: string;
  roomLabel: string;
  score: NestaScore;
  checks: PhotoCheck[];
  analyzing: boolean;
  analysisError: boolean;
  onRetryAnalysis: () => void;
  onKeep: () => void;
  onRetake: () => void;
}

export function ReviewStep({
  imageUrl,
  roomLabel,
  score,
  checks,
  analyzing,
  analysisError,
  onRetryAnalysis,
  onKeep,
  onRetake,
}: Props) {
  const failed = checks.filter((c) => !c.ok);
  const passed = checks.filter((c) => c.ok);

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-ivory">
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-sm font-medium text-charcoal/70">VEYLA Capture</p>
        <p className="text-sm font-medium text-charcoal">{roomLabel}</p>
        <div className="w-[88px]" aria-hidden="true" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`Photo ${roomLabel}`}
          className="max-h-[38vh] w-full rounded-2xl border border-border object-cover"
        />

        {analyzing ? (
          <div className="mt-6 flex flex-col items-center gap-3 py-8">
            <div
              aria-hidden="true"
              className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-forest"
            />
            <p className="text-sm text-charcoal/60">Analyse de la photo…</p>
          </div>
        ) : analysisError ? (
          <div className="mt-6 flex flex-col items-center gap-3 py-8 text-center">
            <p className="font-medium text-charcoal">
              L&apos;analyse de la photo a échoué.
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-charcoal/60">
              Vous pouvez réessayer l&apos;analyse ou reprendre la photo.
            </p>
            <Button
              type="button"
              variant="secondary"
              onClick={onRetryAnalysis}
              className="mt-2"
            >
              Réessayer l&apos;analyse
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-forest">
                <span className="font-display text-2xl text-white">
                  {score.value}
                </span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-charcoal/50">
                  Qualité photo
                </p>
                <p className="font-display text-xl text-charcoal">
                  {score.verdict}
                </p>
              </div>
            </div>

            <ul className="mt-5 flex flex-col gap-2.5">
              {passed.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center gap-3 text-sm text-charcoal"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest/10 text-sm font-bold text-forest"
                  >
                    ✓
                  </span>
                  {c.label}
                </li>
              ))}
              {failed.map((c) => (
                <li key={c.id} className="flex flex-col gap-1">
                  <span className="flex items-center gap-3 text-sm font-medium text-charcoal">
                    <span
                      aria-hidden="true"
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-champagne/25 text-sm font-bold text-charcoal"
                    >
                      ⚠
                    </span>
                    {c.label}
                  </span>
                  {c.advice ? (
                    <p className="pl-9 text-sm leading-relaxed text-charcoal/65">
                      {c.advice}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-border bg-ivory px-4 py-4">
        <Button
          type="button"
          size="lg"
          disabled={analyzing || analysisError}
          onClick={onKeep}
          className="w-full"
        >
          Garder la photo
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={analyzing}
          onClick={onRetake}
          className="w-full"
        >
          Reprendre
        </Button>
      </div>
    </div>
  );
}
