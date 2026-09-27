import type { Metadata } from "next";
import { Badge, Card } from "@/components/ui";
import { getDevelopments } from "@/actions/developments";
import { DevelopmentAlertForm } from "@/components/developments/DevelopmentAlertForm";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Découvrez les projets immobiliers neufs publiés sur Nesta.",
};

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
          Les développements neufs publiés sur Nesta : condos, maisons de
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
        </Card>
      ) : (
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {developments.map((d) => (
            <Card key={d.id} className="flex flex-col p-7">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="muted">
                  {STATUS_LABELS[d.status] ?? d.status}
                </Badge>
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
              <h2 className="mt-4 font-display text-2xl text-charcoal">{d.name}</h2>
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
          ))}
        </div>
      )}
    </div>
  );
}
