import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDevelopmentById } from "@/actions/developments";
import { Badge, Card } from "@/components/ui";
import { PropertyMap } from "@/components/properties/PropertyMap";
import { formatNumber, formatPrice } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

const STATUS_LABELS: Record<string, string> = {
  draft: "Brouillon",
  planned: "En planification",
  under_construction: "En construction",
  completed: "Terminé",
};

const UNIT_STATUS_LABELS: Record<string, string> = {
  AVAILABLE: "Disponible",
  RESERVED: "Réservée",
  SOLD: "Vendue",
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const dev = await getDevelopmentById(id);
  if (!dev)
    return await pageMetadata({
      title: "Projet introuvable",
      description: "Ce projet immobilier n'existe pas ou n'est plus publié sur Veyla.",
      path: "/projects",
    });
  const where = dev.city ? ` — ${dev.city}` : "";
  return await pageMetadata({
    title: `${dev.name}${where}`,
    description: dev.description ?? `Projet immobilier neuf : ${dev.name}.`,
    path: `/projects/${id}`,
  });
}

/**
 * Fiche publique d'un projet neuf : infos réelles du projet,
 * tableau des unités, carte si coordonnées, contact ventes.
 * Aucun chiffre inventé — seules les données en base s'affichent ;
 * les champs absents affichent « — » ou « À confirmer ».
 */
export default async function DevelopmentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const dev = await getDevelopmentById(id);
  if (!dev) notFound();

  const available = dev.units.filter((u) => u.status === "AVAILABLE");
  const priceFrom = available.reduce<number | null>(
    (min, u) => (u.price != null && (min == null || u.price < min) ? u.price : min),
    null,
  );
  const hasCoords = dev.latitude != null && dev.longitude != null;
  const hasContact =
    dev.sales_contact_name != null ||
    dev.sales_contact_email != null ||
    dev.sales_contact_phone != null;

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <nav aria-label="Fil d'Ariane" className="text-sm text-charcoal/50">
        <Link href="/projects" className="hover:text-forest hover:underline">
          Projets
        </Link>
        <span aria-hidden className="mx-2">
          /
        </span>
        <span className="text-charcoal/75">{dev.name}</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Badge variant="muted">{STATUS_LABELS[dev.status] ?? dev.status}</Badge>
        {dev.is_pro ? <Badge variant="forest">Projet Pro</Badge> : null}
        {dev.completion_date ? (
          <span className="text-sm text-charcoal/55">
            Livraison{" "}
            {new Date(dev.completion_date).toLocaleDateString("fr-CA", {
              year: "numeric",
              month: "long",
            })}
          </span>
        ) : null}
      </div>

      <h1 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">
        {dev.name}
      </h1>
      {(dev.address || dev.city) && (
        <p className="mt-2 text-[15px] text-charcoal/60">
          {[dev.address, dev.city].filter(Boolean).join(", ")}
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card className="p-6">
          <p className="text-xs text-charcoal/45">À partir de</p>
          <p className="mt-1 font-display text-2xl text-forest">
            {priceFrom != null ? formatPrice(priceFrom) : "—"}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-xs text-charcoal/45">Unités disponibles</p>
          <p className="mt-1 font-display text-2xl text-charcoal">
            {available.length}
            <span className="text-base text-charcoal/45">
              {" "}
              / {dev.units.length}
            </span>
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-xs text-charcoal/45">Livraison</p>
          <p className="mt-1 font-display text-2xl text-charcoal">
            {dev.completion_date
              ? new Date(dev.completion_date).toLocaleDateString("fr-CA", {
                  year: "numeric",
                  month: "short",
                })
              : "À confirmer"}
          </p>
        </Card>
      </div>

      {dev.description ? (
        <Card className="mt-4 p-6 sm:p-8">
          <h2 className="font-display text-xl text-charcoal">Le projet</h2>
          <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-charcoal/70">
            {dev.description}
          </p>
        </Card>
      ) : null}

      <Card className="mt-4 p-6 sm:p-8">
        <h2 className="font-display text-xl text-charcoal">
          Unités{dev.units.length > 0 ? ` (${dev.units.length})` : ""}
        </h2>
        {dev.units.length === 0 ? (
          <p className="mt-3 text-sm text-charcoal/60">
            Les unités de ce projet ne sont pas encore publiées.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-charcoal/45">
                  <th className="py-2 pr-3 font-medium">Unité</th>
                  <th className="py-2 pr-3 font-medium">Prix</th>
                  <th className="py-2 pr-3 font-medium">Ch.</th>
                  <th className="py-2 pr-3 font-medium">Sdb</th>
                  <th className="py-2 pr-3 font-medium">Superficie</th>
                  <th className="py-2 pr-3 font-medium">Étage</th>
                  <th className="py-2 pr-3 font-medium">Orientation</th>
                  <th className="py-2 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {dev.units.map((u) => (
                  <tr key={u.id} className="border-b border-border/60 last:border-0">
                    <td className="py-2.5 pr-3 font-medium text-charcoal">
                      {u.unit_number}
                    </td>
                    <td className="py-2.5 pr-3 text-forest">
                      {u.price != null ? formatPrice(u.price) : "—"}
                    </td>
                    <td className="py-2.5 pr-3">
                      {u.bedrooms != null ? formatNumber(u.bedrooms) : "—"}
                    </td>
                    <td className="py-2.5 pr-3">
                      {u.bathrooms != null ? formatNumber(u.bathrooms) : "—"}
                    </td>
                    <td className="py-2.5 pr-3">
                      {u.area != null ? `${formatNumber(u.area)} pi²` : "—"}
                    </td>
                    <td className="py-2.5 pr-3">
                      {u.floor != null ? formatNumber(u.floor) : "—"}
                    </td>
                    <td className="py-2.5 pr-3">{u.orientation ?? "—"}</td>
                    <td className="py-2.5">
                      <Badge
                        variant={u.status === "AVAILABLE" ? "forest" : "muted"}
                      >
                        {UNIT_STATUS_LABELS[u.status] ?? u.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {hasCoords ? (
          <div>
            <h2 className="font-display text-xl text-charcoal">
              Localisation
            </h2>
            <div className="mt-3">
              <PropertyMap
                latitude={dev.latitude as number}
                longitude={dev.longitude as number}
                address={[dev.address, dev.city].filter(Boolean).join(", ") || dev.name}
              />
            </div>
          </div>
        ) : null}
        {hasContact ? (
          <Card className="h-fit p-6 sm:p-8">
            <h2 className="font-display text-xl text-charcoal">
              Contact ventes
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              {dev.sales_contact_name ? (
                <div>
                  <dt className="text-xs text-charcoal/45">Nom</dt>
                  <dd className="mt-0.5 font-medium text-charcoal">
                    {dev.sales_contact_name}
                  </dd>
                </div>
              ) : null}
              {dev.sales_contact_email ? (
                <div>
                  <dt className="text-xs text-charcoal/45">Courriel</dt>
                  <dd className="mt-0.5">
                    <a
                      href={`mailto:${dev.sales_contact_email}`}
                      className="font-medium text-forest hover:underline"
                    >
                      {dev.sales_contact_email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {dev.sales_contact_phone ? (
                <div>
                  <dt className="text-xs text-charcoal/45">Téléphone</dt>
                  <dd className="mt-0.5">
                    <a
                      href={`tel:${dev.sales_contact_phone.replace(/[^+\d]/g, "")}`}
                      className="font-medium text-forest hover:underline"
                    >
                      {dev.sales_contact_phone}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
            <p className="mt-4 text-xs text-charcoal/45">
              Coordonnées fournies par le promoteur du projet.
            </p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
