import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Card } from "@/components/ui";
import { ProWaitlistForm } from "@/components/pro/ProWaitlistForm";
import { ProjetsSubscribe } from "@/components/checkout/ProjetsSubscribe";

export async function generateMetadata(): Promise<Metadata> {
  return await pageMetadata({
    title: "Nesta Pro",
    description: "L'espace des professionnels de l'immobilier : promoteurs, courtiers, notaires, estimateurs.",
    path: "/pro",
    titleEn: "Nesta Pro",
    descriptionEn: "The space for real estate professionals: developers, brokers, notaries, estimators.",
  });
}


/** Nesta Pro — carrefour des professionnels. */
export default function ProPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
          Nesta Pro
        </p>
        <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
          L&apos;espace des professionnels
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-charcoal/60">
          Promoteurs, courtiers, notaires, estimateurs : développez votre
          activité avec Nesta.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {/* Promoteurs */}
        <div className="flex flex-col overflow-hidden rounded-2xl bg-forest p-8 text-ivory sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
            Promoteurs
          </p>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl">
            Publiez vos projets neufs
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ivory/70">
            Page projet dédiée, unités et disponibilités à jour, contact direct
            vers votre équipe des ventes. Pilote gratuit de 3 mois, sans
            engagement.
          </p>
          <ul className="mt-6 flex flex-col gap-2.5 text-sm text-ivory/85">
            {[
              "4 800 $/an par projet — le plus avantageux",
              "ou 490 $/mois par projet, résiliable",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span aria-hidden="true" className="mt-0.5 text-champagne">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          {/* Paiement Stripe Checkout : pilote gratuit 3 mois (inactif tant que Stripe n'est pas configuré). */}
          <ProjetsSubscribe />
          <Link href="/projects#pro" className="mt-4 block">
            <span className="inline-flex items-center rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold text-forest transition-colors hover:bg-ivory">
              Découvrir l&apos;offre
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </span>
          </Link>
        </div>

        {/* Professionnels partenaires */}
        <Card className="flex flex-col p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            Courtiers · Notaires · Estimateurs
          </p>
          <h2 className="mt-3 font-display text-2xl text-charcoal sm:text-3xl">
            Rejoignez la liste d&apos;attente
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-charcoal/60">
            L&apos;espace partenaires ouvre bientôt : gestion de votre activité
            et de vos mandats depuis un seul espace vérifié. Laissez votre
            courriel, on vous écrit dès l&apos;ouverture.
          </p>
          <div className="mt-auto pt-4">
            <ProWaitlistForm />
          </div>
        </Card>
      </div>
    </div>
  );
}
