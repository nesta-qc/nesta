import type { Metadata } from "next";
import { Container, EmptyState } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pro",
  description: "L'espace des professionnels de l'immobilier sur Nesta.",
};

/** Page Pro — l'espace professionnels sera branché en phase 2. */
export default function ProPage() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-3xl text-charcoal sm:text-4xl">Pro</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal/60">
        Courtiers, estimateurs, notaires et autres partenaires : gérez votre
        activité et vos mandats depuis un seul espace vérifié.
      </p>
      <div className="mt-8">
        <EmptyState
          title="Disponible prochainement"
          description="L'espace professionnels est en cours de construction. Revenez bientôt."
        />
      </div>
    </Container>
  );
}
