import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getViewerContext } from "@/lib/auth";
import { getServiceById } from "@/lib/services";
import { ServiceRequestForm } from "@/components/services/ServiceRequestForm";

export async function generateMetadata(): Promise<Metadata> {
  return await pageMetadata({
    title: "Demander un devis",
    description: "Décrivez votre projet et recevez un devis sans engagement.",
    path: "/services/demande",
  });
}


const STEPS = ["Devis", "Infos projet", "Fichiers", "Confirmation"];

/**
 * Demande de devis : service → infos → fichiers → envoi.
 * Possible SANS compte (champs nom / courriel / téléphone) :
 * la réponse parvient alors par courriel et le suivi en ligne
 * (/services/suivi) reste réservé aux comptes connectés.
 */
export default async function ServiceRequestPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const viewer = await getViewerContext();
  const anonymous = !viewer.user;

  const params = await searchParams;
  const preselected = getServiceById(params.service ?? "")?.id ?? "estimation";

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
        Services
      </p>
      <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
        Demander un devis
      </h1>

      {anonymous ? (
        <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
          Aucun compte requis : décrivez votre projet et nous vous répondrons
          par courriel. Avec un compte Veyla, vous suivez votre demande en
          ligne et joignez des plans.
        </p>
      ) : null}

      <ol className="mt-6 flex items-center gap-2 text-xs text-charcoal/50" aria-label="Étapes">
        {STEPS.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                i === 0 ? "bg-forest text-white" : "bg-sand text-charcoal/60"
              }`}
            >
              {i + 1}
            </span>
            <span className={i === 0 ? "font-medium text-charcoal" : ""}>{step}</span>
            {i < STEPS.length - 1 ? (
              <span aria-hidden="true" className="mx-1 text-charcoal/25">→</span>
            ) : null}
          </li>
        ))}
      </ol>

      <ServiceRequestForm preselected={preselected} anonymous={anonymous} />
    </div>
  );
}
