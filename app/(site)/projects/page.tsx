import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Badge, Card } from "@/components/ui";
import { getDevelopments } from "@/actions/developments";
import { DevelopmentAlertForm } from "@/components/developments/DevelopmentAlertForm";
import { ProLeadForm } from "@/components/pro/ProLeadForm";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await pageMetadata({
    title: "Projets",
    description: "Découvrez les projets immobiliers neufs publiés sur Veyla.",
    path: "/projects",
    titleEn: "Projects",
    descriptionEn: "Discover new real estate developments listed on Veyla.",
  });
}


const STATUS_LABELS: Record<string, string> = {
  planned: "En planification",
  under_construction: "En construction",
  completed: "Terminé",
};

/**
 * Projets neufs : uniquement des développements réels.
 * Si vide : page institutionnelle + alerte email réelle.
 */
export default async function ProjectsPage() {
  const developments = await getDevelopments();

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
          Projets neufs
        </p>
        <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
          Projets immobiliers
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-charcoal/60">
          Les développements neufs publiés sur Veyla : condos, maisons de
          ville et immeubles en pré-construction.
        </p>
      </div>

      {developments.length === 0 ? (
        <Card className="mt-10 max-w-2xl p-8 sm:p-10">
          <h2 className="font-display text-2xl text-charcoal">
            Les premiers projets arrivent.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-charcoal/60">
            Aucun projet n&apos;est publié pour le moment. Laissez votre
            courriel : nous vous aviserons dès qu&apos;un développement sera
            annoncé.
          </p>
          <DevelopmentAlertForm />
          <p className="mt-4 text-xs text-charcoal/45">
            Un seul courriel par nouveau projet. Désinscription à tout moment.
          </p>
          <p className="mt-4 border-t border-border pt-4 text-sm text-charcoal/60">
            Vous êtes promoteur ?{" "}
            <a href="#pro" className="font-semibold text-forest underline">
              Soyez le premier projet publié →
            </a>
          </p>
        </Card>
      ) : (
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {developments.map((d) => (
            <Link
              key={d.id}
              href={`/projects/${d.id}`}
              className="group flex"
              aria-label={`Voir le projet ${d.name}`}
            >
            <Card className="flex w-full flex-col p-7 transition-shadow group-hover:shadow-md">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="muted">
                    {STATUS_LABELS[d.status] ?? d.status}
                  </Badge>
                  {d.is_pro ? (
                    <Badge variant="forest">Projet Pro</Badge>
                  ) : null}
                </div>
                {d.completion_date ? (
                  <span className="text-xs text-charcoal/50">
                    Livraison{" "}
                    {new Date(d.completion_date).toLocaleDateString("fr-CA", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                ) : null}
              </div>
              <h2 className="mt-4 font-display text-2xl text-charcoal group-hover:text-forest">{d.name}</h2>
              {d.city ? (
                <p className="mt-1 text-sm text-charcoal/55">
                  {d.address ? `${d.address}, ` : ""}
                  {d.city}
                </p>
              ) : null}
              {d.description ? (
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-charcoal/60">
                  {d.description}
                </p>
              ) : null}
              <dl className="mt-5 flex gap-6 border-t border-border pt-4 text-sm">
                <div>
                  <dt className="text-xs text-charcoal/45">À partir de</dt>
                  <dd className="mt-0.5 font-display text-lg text-forest">
                    {d.units.priceFrom !== null
                      ? formatPrice(d.units.priceFrom)
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-charcoal/45">Unités dispo.</dt>
                  <dd className="mt-0.5 font-display text-lg text-charcoal">
                    {d.units.available}
                    <span className="text-sm text-charcoal/45">
                      {" "}
                      / {d.units.total}
                    </span>
                  </dd>
                </div>
              </dl>
            </Card>
            </Link>
          ))}
        </div>
      )}
      {/* VEYLA Pro — offre promoteurs */}
      <section id="pro" className="mt-16 scroll-mt-24 overflow-hidden rounded-2xl bg-forest text-ivory">
        <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
              VEYLA Pro
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">
              Vous êtes promoteur ?
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ivory/70">
              Publiez vos projets neufs sur Veyla et présentez-les à des
              acheteurs qui comprennent déjà le potentiel avant de visiter.
            </p>
            <ul className="mt-6 flex flex-col gap-2.5 text-sm text-ivory/85">
              {[
                "Page projet dédiée avec vos visuels",
                "Unités, prix et disponibilités à jour",
                "Contact direct vers votre équipe des ventes",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path d="M3 8.5l3.5 3.5L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-white/5 p-6 sm:p-8">
            <p className="font-display text-xl">Notre offre</p>
            <p className="mt-2 text-sm leading-relaxed text-ivory/70">
              Pilote gratuit de 3 mois, sans engagement. Ensuite, vous
              choisissez :
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <div className="relative rounded-xl border-2 border-champagne/70 bg-champagne/10 p-4">
                <span className="absolute -top-3 left-4 rounded-full bg-champagne px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-charcoal">
                  Le plus avantageux
                </span>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-ivory">Annuel</p>
                  <p className="font-display text-xl text-ivory">
                    4 800 $<span className="text-sm font-normal text-ivory/60">/an par projet</span>
                  </p>
                </div>
                <p className="mt-1 text-xs text-ivory/60">
                  Soit 400 $/mois — vous économisez 1 080 $ par année.
                </p>
              </div>
              <div className="rounded-xl border border-white/15 p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-ivory/85">Mensuel</p>
                  <p className="font-display text-xl text-ivory/85">
                    490 $<span className="text-sm font-normal text-ivory/50">/mois par projet</span>
                  </p>
                </div>
                <p className="mt-1 text-xs text-ivory/50">
                  Résiliable à tout moment.
                </p>
              </div>
            </div>
            <ProLeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}
