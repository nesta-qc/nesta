import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { Button, Card, Container } from "@/components/ui";

export async function generateMetadata() {
  return await pageMetadata({
    title: "Paiement confirmé",
    description:
      "Votre paiement Veyla a bien été reçu. Prochaines étapes d'activation.",
    path: "/tarifs/succes",
    noIndex: true,
  });
}

/** Page affichée après un paiement Stripe réussi. */
export default async function TarifSuccesPage() {
  const lang = await getLang();
  const t = dictionaries[lang].checkout;

  return (
    <Container className="py-14 sm:py-20">
      <Card className="mx-auto max-w-2xl p-8 sm:p-10">
        <p
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-xl text-white"
        >
          ✓
        </p>
        <h1 className="mt-5 font-display text-3xl text-charcoal">
          {t.succesTitre}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-charcoal/60">
          {t.succesTexte}
        </p>
        <ol className="mt-6 flex flex-col gap-3">
          {t.succesEtapes.map((etape, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-charcoal/70">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ivory text-xs font-semibold text-forest"
              >
                {i + 1}
              </span>
              {etape}
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/">
            <Button>{t.succesCtaAccueil}</Button>
          </Link>
          <Link href="/tarifs">
            <Button variant="secondary">{t.succesCtaTarifs}</Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
}
