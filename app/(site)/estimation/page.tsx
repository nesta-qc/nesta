import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { EstimationForm } from "./EstimationForm";

export const metadata: Metadata = {
  title: "Estimation de propriété",
  description:
    "Obtenez une estimation indicative de la valeur marchande d'une propriété à partir des données officielles d'évaluation foncière.",
};

/** Page d'estimation indicative : formulaire + résultat. */
export default function EstimationPage() {
  return (
    <Container className="pb-20 pt-14 sm:pt-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
          Estimation
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1.08] text-charcoal sm:text-5xl">
          Combien vaut
          <br />
          votre propriété&nbsp;?
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/60">
          Une estimation indicative calculée à partir du rôle d&apos;évaluation
          foncière officiel et des prix de vente médians du marché. Simple,
          gratuit, sans engagement.
        </p>
      </div>

      <div className="mt-10 max-w-2xl">
        <EstimationForm />
      </div>
    </Container>
  );
}
