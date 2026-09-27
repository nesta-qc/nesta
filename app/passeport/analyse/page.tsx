import type { Metadata } from "next";
import { AnalysisRequestForm } from "@/components/passeport/AnalysisRequestForm";

export const metadata: Metadata = {
  title: "Demander l'analyse d'une propriété",
  description:
    "Demandez l'analyse d'une propriété sans créer de compte : nom, courriel et objectif suffisent.",
};

/** Passeport : demande d'analyse d'une propriété, sans compte. */
export default async function AnalysePage({
  searchParams,
}: {
  searchParams: Promise<{ adresse?: string }>;
}) {
  const params = await searchParams;
  const address = (params.adresse ?? "").trim();

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
        Passeport Nesta
      </p>
      <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
        {address ? address : "Analyser une propriété"}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
        Demandez l&apos;analyse de cette propriété : caractéristiques,
        données sourcées et hypothèses affichées. Aucun compte requis —
        la réponse vous parvient par courriel.
      </p>

      <AnalysisRequestForm initialAddress={address} />
    </div>
  );
}
