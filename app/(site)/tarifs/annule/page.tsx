import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { Button, Card, Container } from "@/components/ui";

export async function generateMetadata() {
  return await pageMetadata({
    title: "Paiement annulé",
    description: "Votre paiement Nesta a été annulé. Aucun montant débité.",
    path: "/tarifs/annule",
    noIndex: true,
  });
}

/** Page affichée quand le client annule le paiement Stripe. */
export default async function TarifAnnulePage() {
  const lang = await getLang();
  const t = dictionaries[lang].checkout;

  return (
    <Container className="py-14 sm:py-20">
      <Card className="mx-auto max-w-2xl p-8 sm:p-10">
        <h1 className="font-display text-3xl text-charcoal">
          {t.annuleTitre}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-charcoal/60">
          {t.annuleTexte}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/tarifs">
            <Button>{t.annuleCtaTarifs}</Button>
          </Link>
          <Link href="/services/demande">
            <Button variant="secondary">{t.annuleCtaContact}</Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
}
