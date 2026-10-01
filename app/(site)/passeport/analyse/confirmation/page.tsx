import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Button, Card } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  return await pageMetadata({
    title: "Demande reçue",
    description: "Votre demande d'analyse a bien été enregistrée.",
    path: "/passeport/analyse/confirmation",
    noIndex: true,
  });
}


/** Confirmation sobre d'une demande d'analyse (sans délai inventé). */
export default function AnalyseConfirmationPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
        Passeport Nesta
      </p>
      <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
        Demande reçue.
      </h1>

      <Card className="mt-8 p-6">
        <p className="text-sm leading-relaxed text-charcoal/70">
          Votre demande d&apos;analyse a bien été enregistrée. Nous la
          traiterons et vous recevrez la réponse par courriel.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
          Aucun compte n&apos;a été créé. Pour suivre vos demandes en ligne,
          vous pouvez créer un compte Nesta quand vous voulez.
        </p>
      </Card>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/passeport">
          <Button variant="secondary">Analyser une autre adresse</Button>
        </Link>
        <Link href="/inscription">
          <Button variant="ghost">Créer un compte Nesta</Button>
        </Link>
      </div>
    </div>
  );
}
