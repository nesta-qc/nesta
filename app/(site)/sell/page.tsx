import type { Metadata } from "next";
import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { SELLER_PLANS, formatPlanPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Vendre",
  description:
    "Vendez votre propriété à votre façon : seul, accompagné ou avec un courtier.",
};

const OPTIONS = [
  {
    title: "Je vends moi-même",
    text: "Vous gardez le contrôle : créez votre annonce, recevez les demandes et menez vos visites.",
  },
  {
    title: "Je veux de l'accompagnement",
    text: "Un parcours guidé et une équipe disponible à chaque étape, sans céder votre autonomie.",
  },
  {
    title: "Je veux un courtier",
    text: "Confiez la vente à un professionnel vérifié tout en suivant tout depuis Nesta.",
  },
];

const STEPS = ["Créer", "Publier", "Recevoir des visites", "Gérer la vente"];

/** Page vendeur : hero, trois options, processus, forfaits configurables. */
export default function SellPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-14 pt-14 sm:px-8 sm:pt-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            Vendre
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.08] text-charcoal sm:text-5xl">
            Vendez votre propriété,
            <br />
            à votre façon.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/60">
            Trois façons de vendre, un seul outil. Choisissez le niveau
            d&apos;accompagnement qui vous convient.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {OPTIONS.map((o, i) => (
            <Card key={o.title} className="p-7">
              <span className="font-display text-sm text-champagne">
                {`0${i + 1}`}
              </span>
              <h2 className="mt-3 font-display text-xl text-charcoal">{o.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/55">{o.text}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/sell/nouveau">
            <Button size="lg">Publier une annonce</Button>
          </Link>
          <Link href="/sell/annonces">
            <Button size="lg" variant="secondary">
              Voir mes annonces
            </Button>
          </Link>
        </div>
      </section>

      {/* ---------- Processus ---------- */}
      <section className="border-y border-border bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
          <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
            Un processus simple
          </h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest font-display text-sm text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-charcoal">{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Forfaits ---------- */}
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
            Des forfaits clairs
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-charcoal/55">
            Un seul paiement, sans commission cachée. Choisissez votre forfait
            au moment de publier.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {SELLER_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`flex flex-col p-8 ${
                plan.highlighted
                  ? "border-forest shadow-[var(--shadow-lift)]"
                  : ""
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                {plan.name}
              </p>
              <p className="mt-4 font-display text-4xl text-charcoal">
                {formatPlanPrice(plan.price)}
              </p>
              <p className="mt-2 text-sm text-charcoal/55">{plan.tagline}</p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-charcoal/70">
                    <span aria-hidden="true" className="mt-0.5 text-forest">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/sell/nouveau" className="mt-auto pt-8">
                <Button
                  variant={plan.highlighted ? "primary" : "secondary"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-xs text-charcoal/45">
          Tarifs affichés à titre indicatif, taxes en sus. Le détail des
          inclusions est confirmé au moment de la publication.
        </p>
      </section>
    </>
  );
}
