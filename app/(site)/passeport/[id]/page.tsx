import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublicProperty } from "@/actions/properties";
import { PropertyCostEstimate } from "@/components/properties/PropertyCostEstimate";
import { Badge, Card } from "@/components/ui";
import {
  formatDate,
  formatNumber,
  formatPrice,
  listingTypeLabel,
  propertyTypeLabel,
} from "@/lib/format";
import { propertyIdSchema } from "@/lib/validation";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getPublicProperty(id);
  if (!result) {
    return pageMetadata({
      title: "Passeport Nesta",
      description: "Fiche Passeport Nesta : caractéristiques et données sourcées d'une propriété.",
      path: "/passeport",
    });
  }
  const { property } = result;
  return pageMetadata({
    title: `Passeport Nesta — ${property.address}, ${property.city}`,
    description: `Données disponibles et points à confirmer pour ${property.address}, ${property.city}.`,
    path: `/passeport/${id}`,
  });
}

/**
 * Passeport Nesta : synthèse honnête d'une annonce.
 * Chaque chiffre vient de l'annonce du vendeur ; toute donnée
 * manquante affiche « À confirmer » — jamais de chiffre inventé,
 * jamais une possibilité présentée comme une autorisation.
 */
export default async function PropertyPassportPage({ params }: PageProps) {
  const { id } = await params;

  if (!propertyIdSchema.safeParse(id).success) {
    notFound();
  }

  const result = await getPublicProperty(id);
  if (!result) {
    notFound();
  }
  const { property: p } = result;

  /* ---------- Champs manquants (section « Informations à confirmer ») ---------- */
  const missingFields: string[] = [];
  if (p.asking_price == null) missingFields.push("Prix demandé");
  if (!p.property_type) missingFields.push("Type de propriété");
  if (p.bedrooms == null) missingFields.push("Nombre de chambres");
  if (p.bathrooms == null) missingFields.push("Nombre de salles de bain");
  if (p.living_area == null) missingFields.push("Superficie habitable");
  if (p.lot_area == null) missingFields.push("Superficie du terrain");
  if (p.year_built == null) missingFields.push("Année de construction");
  if (p.municipal_tax == null) missingFields.push("Taxes municipales");
  if (p.school_tax == null) missingFields.push("Taxes scolaires");
  if (!p.description) missingFields.push("Description");
  if (!p.postal_code) missingFields.push("Code postal");

  const specs = [
    { label: "Type", value: p.property_type ? propertyTypeLabel(p.property_type) : null },
    { label: "Chambres", value: p.bedrooms != null ? formatNumber(p.bedrooms) : null },
    { label: "Salles de bain", value: p.bathrooms != null ? formatNumber(p.bathrooms) : null },
    {
      label: "Superficie habitable",
      value: p.living_area != null ? `${formatNumber(p.living_area)} pi²` : null,
    },
    {
      label: "Terrain",
      value: p.lot_area != null ? `${formatNumber(p.lot_area)} pi²` : null,
    },
    { label: "Année de construction", value: p.year_built != null ? String(p.year_built) : null },
    {
      label: "Taxes municipales",
      value: p.municipal_tax != null ? `${formatPrice(p.municipal_tax)}/an` : null,
    },
    {
      label: "Taxes scolaires",
      value: p.school_tax != null ? `${formatPrice(p.school_tax)}/an` : null,
    },
  ];

  /* ---------- Constats sobres (section « Potentiel ») : données réelles seulement ---------- */
  const findings: string[] = [];
  if (p.lot_area != null) {
    findings.push(
      `Terrain de ${formatNumber(p.lot_area)} pi² selon l'annonce du vendeur.`,
    );
  }
  if (p.living_area != null) {
    findings.push(
      `Superficie habitable déclarée de ${formatNumber(p.living_area)} pi².`,
    );
  }
  if (p.year_built != null) {
    findings.push(`Bâtiment construit en ${p.year_built} selon le vendeur.`);
  }
  if (p.property_type === "land") {
    findings.push("Le bien est annoncé comme un terrain.");
  }

  const headerSpecs = [
    p.bedrooms != null ? `${formatNumber(p.bedrooms)} chambres` : null,
    p.bathrooms != null ? `${formatNumber(p.bathrooms)} salles de bain` : null,
    p.living_area != null ? `${formatNumber(p.living_area)} pi² habitables` : null,
    p.lot_area != null ? `terrain ${formatNumber(p.lot_area)} pi²` : null,
  ].filter(Boolean);

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8">
      <Link
        href={`/properties/${p.id}`}
        className="text-sm font-medium text-charcoal/55 underline-offset-4 transition-colors hover:text-forest hover:underline"
      >
        ← Retour à l&apos;annonce
      </Link>

      {/* ---------- 1. En-tête ---------- */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="forest">Passeport Nesta</Badge>
          <Badge>{listingTypeLabel(p.listing_type)}</Badge>
          {p.property_type ? <Badge>{propertyTypeLabel(p.property_type)}</Badge> : null}
        </div>
        <h1 className="mt-4 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
          {p.address}
        </h1>
        <p className="mt-2 text-[15px] text-charcoal/55">
          {p.city}, {p.province}
        </p>
        <div className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <p className="font-display text-3xl text-forest sm:text-4xl">
            {p.asking_price != null ? formatPrice(p.asking_price) : "À confirmer"}
          </p>
          {headerSpecs.length > 0 ? (
            <p className="text-[15px] text-charcoal/60">{headerSpecs.join(" · ")}</p>
          ) : null}
        </div>
      </header>

      <div className="mt-10 space-y-6">
        {/* ---------- 2. Caractéristiques ---------- */}
        <Card className="p-6 sm:p-8">
          <h2 className="font-display text-xl text-charcoal">Caractéristiques</h2>
          <dl className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border border-border bg-border sm:grid-cols-2">
            {specs.map((s) => (
              <div key={s.label} className="bg-white px-5 py-4">
                <dt className="text-xs text-charcoal/50">{s.label}</dt>
                <dd className="mt-1 text-[15px] font-medium text-charcoal">
                  {s.value ?? <span className="font-normal italic text-charcoal/45">À confirmer</span>}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-charcoal/70">Description</h3>
            {p.description ? (
              <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-charcoal/75">
                {p.description}
              </p>
            ) : (
              <p className="mt-2 text-[15px] italic text-charcoal/45">À confirmer</p>
            )}
          </div>
        </Card>

        {/* ---------- 3. Données disponibles ---------- */}
        <Card className="p-6 sm:p-8">
          <h2 className="font-display text-xl text-charcoal">Données disponibles</h2>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/55">
            Chaque information ci-dessous vient d&apos;une source nommée —
            rien n&apos;est estimé ni extrapolé.
          </p>
          <ul className="mt-5 space-y-4">
            <li className="flex flex-col gap-1 border-b border-border pb-4 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="text-[15px] font-medium text-charcoal">
                  Annonce du vendeur via Nesta
                </p>
                <p className="text-sm text-charcoal/55">
                  Adresse, prix, caractéristiques, description, photos.
                </p>
              </div>
              <p className="shrink-0 text-sm text-charcoal/50">
                Publiée le {formatDate(p.created_at)} · mise à jour le {formatDate(p.updated_at)}
              </p>
            </li>
            <li className="flex flex-col gap-1 border-b border-border pb-4 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="text-[15px] font-medium text-charcoal">
                  Taxes municipales et scolaires
                </p>
                <p className="text-sm text-charcoal/55">Fournies par le vendeur.</p>
              </div>
              <p className="shrink-0 text-sm text-charcoal/50">
                {p.municipal_tax != null || p.school_tax != null
                  ? `${formatPrice((p.municipal_tax ?? 0) + (p.school_tax ?? 0))}/an`
                  : "À confirmer"}
              </p>
            </li>
            <li className="flex flex-col gap-1 border-b border-border pb-4 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="text-[15px] font-medium text-charcoal">Zonage</p>
                <p className="text-sm text-charcoal/55">
                  Règlement municipal applicable au terrain.
                </p>
              </div>
              <Badge className="self-start">Connexion en préparation</Badge>
            </li>
            <li className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="text-[15px] font-medium text-charcoal">Évaluation foncière</p>
                <p className="text-sm text-charcoal/55">
                  Valeur au rôle municipal (terrain + bâtiment).
                </p>
              </div>
              <Badge className="self-start">Connexion en préparation</Badge>
            </li>
          </ul>
        </Card>

        {/* ---------- 4. Informations à confirmer ---------- */}
        <Card className="p-6 sm:p-8">
          <h2 className="font-display text-xl text-charcoal">Informations à confirmer</h2>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/55">
            Ces informations n&apos;apparaissent pas dans l&apos;annonce.
            Demandez-les au vendeur avant de prendre une décision.
          </p>
          {missingFields.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {missingFields.map((field) => (
                <li key={field}>
                  <Badge className="normal-case tracking-normal">
                    {field} — à confirmer
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-[15px] text-charcoal/60">
              Tous les champs usuels sont renseignés pour cette annonce.
            </p>
          )}
        </Card>

        {/* ---------- 5. Potentiel du terrain et du bâtiment ---------- */}
        <Card className="p-6 sm:p-8">
          <h2 className="font-display text-xl text-charcoal">
            Potentiel du terrain et du bâtiment
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/55">
            Hypothèses : les constats ci-dessous reprennent uniquement les
            données de l&apos;annonce, sans visite ni vérification au
            registre. Le zonage et l&apos;évaluation foncière ne sont pas
            encore branchés à Nesta.
          </p>
          {findings.length > 0 ? (
            <ul className="mt-5 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-charcoal/75">
              {findings.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-[15px] italic text-charcoal/45">À confirmer</p>
          )}
          <p className="mt-5 text-xs leading-relaxed text-charcoal/45">
            Aucune possibilité de construction, d&apos;agrandissement ou de
            changement d&apos;usage n&apos;est présentée ici comme une
            autorisation : seul le règlement municipal applicable, vérifié
            auprès de la ville, fait foi.
          </p>
        </Card>

        {/* ---------- 6. Budget indicatif des travaux ---------- */}
        <Card className="p-6 sm:p-8">
          <h2 className="font-display text-xl text-charcoal">
            Budget indicatif des travaux
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/55">
            Hypothèses : sans visite, sans plans et sans état des lieux, aucun
            budget de travaux ne peut être estimé sérieusement. Chaque projet
            dépend de l&apos;état réel du bâtiment et des exigences
            municipales.
          </p>
          <p className="mt-5 text-[15px] italic text-charcoal/45">À confirmer</p>
          <Link
            href="/services/demande"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-2.5 text-sm font-medium text-charcoal transition-colors duration-200 hover:border-gold hover:bg-cream"
          >
            Demander une estimation
          </Link>
          <p className="mt-3 text-xs text-charcoal/45">
            Sans compte requis — un professionnel Nesta vous répond.
          </p>
        </Card>

        {/* ---------- 7. Scénarios financiers pour un plex ---------- */}
        {p.property_type === "plex" ? (
          p.asking_price != null ? (
            <div>
              <h2 className="font-display text-xl text-charcoal">
                Scénarios financiers pour un plex
              </h2>
              <div className="mt-4">
                <PropertyCostEstimate
                  price={p.asking_price}
                  municipalTax={p.municipal_tax}
                  schoolTax={p.school_tax}
                />
              </div>
            </div>
          ) : (
            <Card className="p-6 sm:p-8">
              <h2 className="font-display text-xl text-charcoal">
                Scénarios financiers pour un plex
              </h2>
              <p className="mt-3 text-[15px] italic text-charcoal/45">À confirmer</p>
            </Card>
          )
        ) : (
          <Card className="p-6 sm:p-8">
            <h2 className="font-display text-xl text-charcoal">
              Scénarios financiers pour un plex
            </h2>
            <p className="mt-3 text-[15px] text-charcoal/55">
              Cette propriété n&apos;est pas un plex.
            </p>
          </Card>
        )}

        {/* ---------- 8. CTA ---------- */}
        <Card className="border-forest/20 bg-forest p-6 text-white sm:p-8">
          <h2 className="font-display text-xl">Aller plus loin</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            Recevez une analyse de cette propriété préparée par un
            professionnel — basée sur les données réelles ci-dessus.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`/passeport/analyse?adresse=${encodeURIComponent(p.address)}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-8 py-3.5 text-base font-medium text-forest transition-colors duration-200 hover:bg-white"
            >
              Demander l&apos;analyse de cette propriété
            </Link>
            <Link
              href="/services/demande"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:border-white/60"
            >
              Demander une estimation
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
