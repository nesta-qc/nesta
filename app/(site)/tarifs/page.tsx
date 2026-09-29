import type { Metadata } from "next";
import Link from "next/link";
import { Button, Card, Container } from "@/components/ui";
import { SELLER_PLANS, formatPlanPrice } from "@/lib/pricing";
import { NESTA_SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Comparez Nesta Free et Nesta Pro, découvrez nos services et nos forfaits vendeur. Des prix clairs, sans surprise.",
};

const FREE_FEATURES = [
  "Passeport : fiches honnêtes par adresse",
  "Estimation indicative gratuite",
  "Comparables du marché vérifiés",
  "Alertes courriel des nouveaux projets",
  "Favoris et recherche avancée",
];

const PRO_FEATURES = [
  "Tout Nesta Free, pour votre équipe",
  "Page projet dédiée avec vos visuels",
  "Unités, prix et disponibilités à jour",
  "Contact direct vers votre équipe des ventes",
  "Pilote gratuit de 3 mois, sans engagement",
];

const FAQ = [
  {
    q: "Pourquoi pas de commission en pourcentage ?",
    a: "Parce qu'un pourcentage fait payer le même service 25 000 $ ou 10 000 $ selon le prix de la maison (exemple à 5 %, un taux qui se négocie). Nos forfaits sont fixes et affichés d'avance : vous savez exactement ce que coûte votre vente, avant de payer.",
  },
  {
    q: "Et si je ne vends pas ?",
    a: "Votre annonce reste en ligne pendant toute la durée du forfait, et vous pouvez la renouveler. L'entrée est à 299 $ : un risque minime, sans engager des milliers de dollars d'avance.",
  },
  {
    q: "Le pilote gratuit de 3 mois m'engage-t-il ?",
    a: "Non. Vous publiez votre projet gratuitement pendant 3 mois, sans carte et sans engagement. À la fin du pilote, vous choisissez l'annuel ou le mensuel — ou vous arrêtez, simplement.",
  },
  {
    q: "Puis-je résilier l'abonnement mensuel ?",
    a: "Oui, à tout moment. L'annuel (4 800 $/an par projet) reste le plus avantageux : 400 $/mois effectifs, soit 1 080 $ d'économie par année.",
  },
  {
    q: "Les prix incluent-ils les taxes ?",
    a: "Non, les prix affichés sont avant taxes. Le détail est confirmé au moment de l'achat ou de la souscription.",
  },
  {
    q: "Puis-je publier une annonce avec Nesta Free ?",
    a: "Oui. La publication d'une annonce individuelle se fait via nos forfaits vendeur (paiement unique à partir de 299 $), accessibles à tout compte vendeur.",
  },
];

function Check() {
  return (
    <span aria-hidden="true" className="mt-0.5 shrink-0 text-forest">
      ✓
    </span>
  );
}

/** Page Tarifs : comparatif Free vs Pro, services, forfaits vendeur. */
export default function TarifsPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-10 pt-14 sm:px-8 sm:pt-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            Tarifs
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.08] text-charcoal sm:text-5xl">
            Des prix clairs,
            <br />
            sans surprise.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/60">
            Nesta Free pour comprendre le marché. Nesta Pro pour les
            promoteurs. Et pour vendre : des forfaits fixes, affichés
            d'avance — jamais de commission en pourcentage.
          </p>
        </div>
      </section>

      {/* ---------- Ancrage : pourquoi forfaitaire ---------- */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8">
        <div className="rounded-2xl bg-forest p-8 text-ivory sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
            Pourquoi forfaitaire ?
          </p>
          <p className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
            25 000 $ ou 699 $ ?
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ivory/75">
            Exemple : une commission de 5 % (taux négociable, à titre
            indicatif) sur une vente de 500 000 $ = 25 000 $ + taxes. Le
            forfait Nesta SELL : 699 $, paiement unique. Le même
            accompagnement, un prix affiché d'avance, zéro pourcentage prélevé
            sur votre vente.
          </p>
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-ivory/45">
            Les taux de commission varient et se négocient librement : ce
            calcul est un exemple, pas un taux imposé.
          </p>
        </div>
      </section>

      {/* ---------- Comparatif Free vs Pro ---------- */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Free */}
          <Card className="flex flex-col p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
              Nesta Free
            </p>
            <p className="mt-4 font-display text-4xl text-charcoal">0 $</p>
            <p className="mt-2 text-sm text-charcoal/55">
              Pour acheter, vendre et comprendre le marché.
            </p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {FREE_FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-charcoal/70"
                >
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl bg-ivory px-4 py-3 text-xs leading-relaxed text-charcoal/60">
              Publier une annonce individuelle : forfaits vendeur à partir de
              299 $ (paiement unique).
            </p>
            <Link href="/inscription" className="mt-auto pt-8">
              <Button variant="secondary" className="w-full">
                Créer un compte gratuit
              </Button>
            </Link>
          </Card>

          {/* Pro */}
          <div className="relative flex flex-col overflow-hidden rounded-2xl bg-forest p-8 text-ivory">
            <span className="absolute right-6 top-6 rounded-full bg-champagne px-3 py-1 text-xs font-bold uppercase tracking-wide text-charcoal">
              Le plus avantageux
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
              Nesta Pro
            </p>
            <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <p className="font-display text-4xl">4 800 $</p>
              <p className="text-sm text-ivory/60">/an par projet</p>
            </div>
            <p className="mt-2 text-sm text-ivory/70">
              ou 490 $/mois par projet, résiliable à tout moment. Pour les
              promoteurs.
            </p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {PRO_FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-ivory/85"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-champagne"
                  >
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/projects" className="mt-auto pt-8">
              <Button className="w-full bg-white text-forest hover:bg-ivory">
                Devenir Pro
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="border-y border-border bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
              Services
            </p>
            <h2 className="mt-4 font-display text-2xl text-charcoal sm:text-3xl">
              Des services pros, à la carte
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-charcoal/55">
              En plus de votre abonnement — ou sans abonnement du tout.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {NESTA_SERVICES.map((s) => (
              <Card key={s.id} className="flex flex-col p-7">
                <h3 className="font-display text-xl text-charcoal">{s.name}</h3>
                <p className="mt-2 text-sm text-charcoal/55">{s.tagline}</p>
                <div className="mt-5">
                  {s.tiers ? (
                    <ul className="flex flex-col gap-1.5">
                      {s.tiers.map((t) => (
                        <li
                          key={t.name}
                          className="flex items-baseline justify-between gap-3 text-sm"
                        >
                          <span className="text-charcoal/70">
                            <span className="font-semibold text-charcoal">
                              {t.name}
                            </span>{" "}
                            — {t.detail}
                          </span>
                          <span className="shrink-0 font-display text-forest">
                            {t.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <p className="font-display text-xl text-forest">
                        Sur devis
                      </p>
                      <p className="mt-1 text-xs text-charcoal/50">
                        Devis détaillé sous 48 h, sans engagement.
                      </p>
                    </>
                  )}
                  {s.addon ? (
                    <p className="mt-2 text-xs text-charcoal/55">
                      + {s.addon.label} — {s.addon.detail}
                    </p>
                  ) : null}
                </div>
                <Link
                  href={`/services/demande?service=${s.id}`}
                  className="mt-auto pt-6"
                >
                  <Button variant="secondary" className="w-full">
                    {s.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Forfaits vendeur ---------- */}
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            Vendre
          </p>
          <h2 className="mt-4 font-display text-2xl text-charcoal sm:text-3xl">
            Forfaits vendeur
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-charcoal/55">
            Un seul paiement. Pas de commission en %, pas de pari payé
            d'avance, pas de surprise.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {SELLER_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`flex flex-col p-7 ${
                plan.highlighted ? "border-forest" : ""
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                {plan.name}
              </p>
              <p className="mt-3 font-display text-3xl text-charcoal">
                {formatPlanPrice(plan.price)}
              </p>
              <p className="mt-1 text-sm text-charcoal/55">{plan.tagline}</p>
              <Link href="/sell/nouveau" className="mt-auto pt-6">
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
          Tarifs affichés à titre indicatif, taxes en sus.
        </p>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
            Questions fréquentes
          </h2>
          <div className="mt-8 flex flex-col gap-6">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className="font-semibold text-charcoal">{item.q}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal/60">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/projects">
              <Button size="lg">Découvrir Nesta Pro</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
