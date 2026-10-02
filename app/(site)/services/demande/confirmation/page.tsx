import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Button, Card } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  return await pageMetadata({
    title: "Demande envoyée",
    description: "Votre demande de devis a bien été enregistrée.",
    path: "/services/demande/confirmation",
    noIndex: true,
  });
}


/**
 * Confirmation d'une demande de devis faite SANS compte.
 * Sobre : aucune promesse de délai, réponse par courriel.
 */
export default function AnonymousServiceConfirmationPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
        Services
      </p>
      <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
        Demande envoyée.
      </h1>

      <Card className="mt-8 p-6">
        <p className="text-sm leading-relaxed text-charcoal/70">
          Votre demande de devis a bien été enregistrée. Nous vous
          répondrons par courriel, sans engagement.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
          Aucun compte n&apos;a été créé. Pour suivre vos demandes en ligne
          et joindre des plans, créez un compte Veyla.
        </p>
      </Card>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/services">
          <Button variant="secondary">Voir nos services</Button>
        </Link>
        <Link href="/inscription">
          <Button variant="ghost">Créer un compte Veyla</Button>
        </Link>
      </div>
    </div>
  );
}
