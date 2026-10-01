import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPropertyProfile, getSimilarProfiles } from "@/actions/property-profiles";
import { Badge } from "@/components/ui";
import { PropertyMap } from "@/components/properties/PropertyMap";
import {
  MissingChips,
  PassportSectionCard,
  PotentialDisclaimer,
  ProfileAnalysisCta,
  SpecsGrid,
  type SpecItem,
} from "@/components/passeport/PassportSections";
import { formatDate, formatNumber, formatPrice } from "@/lib/format";
import { profileIdSchema } from "@/lib/validation";
import { pageMetadata } from "@/lib/seo";
import { getLang } from "@/lib/i18n/lang";
import type { Lang } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const profile = await getPropertyProfile(id);
  if (!profile) {
    return await pageMetadata({
      title: "Passeport Nesta",
      description: "Fiche Passeport Nesta : caractéristiques et données sourcées d'une propriété.",
      path: "/passeport",
    });
  }
  return await pageMetadata({
    title: `Passeport Nesta — ${profile.address}`,
    description: `Profil issu des données publiques pour ${profile.address}, ${profile.borough ?? profile.city} : valeur au rôle, caractéristiques, points à confirmer.`,
    path: `/passeport/profil/${id}`,
  });
}

/**
 * Mention de source adaptée au vrai jeu de données du profil.
 * (Le libellé générique « Ville de Montréal » était affiché à tort
 * sur les profils Montérégie issus du MAMH.)
 */
function sourceIntro(dataSource: string | null, lang: Lang): string {
  const s = dataSource ?? "";
  if (/MAMH/i.test(s)) {
    return lang === "en"
      ? "Data from the MAMH via Données Québec (property assessment roll). Each value comes from the dataset; a missing field is marked as to be confirmed, never filled in."
      : "Données issues du MAMH via Données Québec (rôle d'évaluation foncière). Chaque valeur vient du jeu de données ; un champ absent est marqué « À confirmer », jamais complété.";
  }
  if (/Montréal/i.test(s)) {
    return lang === "en"
      ? "Data from the City of Montréal's open data. Each value comes from the dataset; a missing field is marked as to be confirmed, never filled in."
      : "Données issues des Données ouvertes de la Ville de Montréal. Chaque valeur vient du jeu de données ; un champ absent est marqué « À confirmer », jamais complété.";
  }
  return lang === "en"
    ? "Data from public sources. Each value comes from the dataset; a missing field is marked as to be confirmed, never filled in."
    : "Données issues de sources publiques. Chaque valeur vient du jeu de données ; un champ absent est marqué « À confirmer », jamais complété.";
}

/**
 * « à » + arrondissement avec la contraction qui convient
 * (« au Plateau-Mont-Royal », « à la Cité »…). Les noms sans
 * article initial restent tels quels (« à Granby »).
 */
function avecContraction(borough: string): string {
  if (/^le\s/i.test(borough)) return `au ${borough.replace(/^le\s/i, "")}`;
  if (/^la\s/i.test(borough)) return `à la ${borough.replace(/^la\s/i, "")}`;
  if (/^les\s/i.test(borough)) return `aux ${borough.replace(/^les\s/i, "")}`;
  if (/^l['’]/i.test(borough)) return `à ${borough}`;
  return `à ${borough}`;
}

/**
 * Résumé unique par fiche, assemblé uniquement depuis ses données
 * réelles (anti thin content : chaque fiche a son texte propre).
 * Aucune donnée inventée — seules les clauses aux champs non nuls
 * sont incluses.
 */
function buildProfileSummary(
  p: {
    address: string;
    borough: string | null;
    city: string;
    property_category: string | null;
    assessment_total: number | null;
    assessment_year: number | null;
    construction_year: number | null;
    lot_area_sqm: number | null;
  },
  lang: Lang,
): string {
  const lieu =
    lang === "fr"
      ? p.borough
        ? `${avecContraction(p.borough)}, ${p.city}`
        : `à ${p.city}`
      : p.borough
        ? `in ${p.borough}, ${p.city}`
        : `in ${p.city}`;
  const head =
    lang === "en"
      ? `${p.address} — property ${lieu}${p.property_category ? ` (category: ${p.property_category})` : ""}.`
      : `${p.address} — ${p.property_category ? `bien de catégorie ${p.property_category}` : "bien immobilier"} ${lieu}.`;
  const facts: string[] = [];
  if (p.assessment_total != null) {
    facts.push(
      lang === "en"
        ? `Total assessed value: ${formatPrice(p.assessment_total, lang)}${p.assessment_year != null ? ` (${p.assessment_year} roll)` : ""}`
        : `Valeur au rôle totale : ${formatPrice(p.assessment_total, lang)}${p.assessment_year != null ? ` (rôle ${p.assessment_year})` : ""}`,
    );
  }
  if (p.construction_year != null) {
    facts.push(
      lang === "en"
        ? `Built in ${p.construction_year}`
        : `Construction datant de ${p.construction_year}`,
    );
  }
  if (p.lot_area_sqm != null) {
    facts.push(
      lang === "en"
        ? `Lot area of ${formatNumber(p.lot_area_sqm)} sq m`
        : `Terrain de ${formatNumber(p.lot_area_sqm)} m²`,
    );
  }
  if (facts.length === 0) return head;
  return `${head} ${facts.map((f) => `${f}.`).join(" ")}`;
}

/**
 * Passeport d'un profil public : fiche honnête d'une propriété issue
 * de données ouvertes (Ville de Montréal ou MAMH/Données Québec).
 * Ce N'EST PAS une annonce — rien ici n'est « à vendre », et toute
 * donnée manquante affiche « À confirmer » (jamais inventée).
 */
export default async function ProfilePassportPage({ params }: PageProps) {
  const { id } = await params;

  if (!profileIdSchema.safeParse(id).success) {
    notFound();
  }

  const p = await getPropertyProfile(id);
  if (!p) {
    notFound();
  }

  const lang = await getLang();
  const similar = await getSimilarProfiles({
    id: p.id,
    borough: p.borough,
    city: p.city,
    property_category: p.property_category,
  });
  const summary = buildProfileSummary(p, lang);

  /* ---------- Champs manquants ---------- */
  const missingFields: string[] = [];
  if (p.construction_year == null) missingFields.push("Année de construction");
  if (p.lot_area_sqm == null) missingFields.push("Superficie du terrain");
  if (p.assessment_total == null) missingFields.push("Valeur au rôle");
  if (p.assessment_year == null) missingFields.push("Année du rôle");
  if (!p.property_category) missingFields.push("Catégorie de propriété");
  if (p.latitude == null || p.longitude == null) missingFields.push("Coordonnées");

  const specs: SpecItem[] = [
    { label: "Adresse", value: p.address },
    { label: "Arrondissement", value: p.borough },
    { label: "Ville", value: p.city },
    {
      label: "Année de construction",
      value: p.construction_year != null ? String(p.construction_year) : null,
    },
    {
      label: "Superficie du terrain",
      value:
        p.lot_area_sqm != null ? `${formatNumber(p.lot_area_sqm)} m²` : null,
    },
    { label: "Catégorie de propriété", value: p.property_category },
  ];

  const assessmentSpecs: SpecItem[] = [
    {
      label: "Valeur au rôle — terrain",
      value: p.assessment_land != null ? formatPrice(p.assessment_land) : null,
    },
    {
      label: "Valeur au rôle — bâtiment",
      value:
        p.assessment_building != null ? formatPrice(p.assessment_building) : null,
    },
    {
      label: "Valeur au rôle — totale",
      value: p.assessment_total != null ? formatPrice(p.assessment_total) : null,
    },
    {
      label: "Année du rôle d'évaluation",
      value: p.assessment_year != null ? String(p.assessment_year) : null,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8">
      <Link
        href="/passeport"
        className="text-sm font-medium text-charcoal/55 underline-offset-4 transition-colors hover:text-forest hover:underline"
      >
        ← Retour au Passeport
      </Link>

      {/* ---------- 1. En-tête ---------- */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="forest">Passeport Nesta</Badge>
          <Badge variant="gold">Profil — données publiques</Badge>
          {p.borough ? <Badge>{p.borough}</Badge> : null}
        </div>
        <h1 className="mt-4 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
          {p.address}
        </h1>
        <p className="mt-2 text-[15px] text-charcoal/55">
          {p.borough ? `${p.borough}, ` : ""}
          {p.city}
        </p>
        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wider text-charcoal/50">
            Valeur au rôle
          </p>
          <p className="mt-1 font-display text-3xl text-forest sm:text-4xl">
            {p.assessment_total != null ? formatPrice(p.assessment_total) : "À confirmer"}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal/55">
            Ce profil est issu de données publiques — ce n&apos;est pas une
            annonce. La valeur au rôle est une évaluation foncière à des fins
            de taxation, pas une valeur marchande.
          </p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-charcoal/75">
            {summary}
          </p>
        </div>
      </header>

      <div className="mt-10 space-y-6">
        {/* ---------- 2. Localisation ---------- */}
        {p.latitude != null && p.longitude != null ? (
          <PassportSectionCard
            title="Localisation"
            intro="Emplacement approximatif de la propriété, issu des données ouvertes."
          >
            <PropertyMap
              latitude={p.latitude}
              longitude={p.longitude}
              address={p.address}
            />
          </PassportSectionCard>
        ) : null}

        {/* ---------- 3. Caractéristiques (données ouvertes) ---------- */}
        <PassportSectionCard
          title="Caractéristiques"
          intro={sourceIntro(p.data_source, lang)}
        >
          <SpecsGrid specs={specs} />
        </PassportSectionCard>

        {/* ---------- 4. Données disponibles ---------- */}
        <PassportSectionCard
          title="Données disponibles"
          intro="Chaque information ci-dessous vient d'une source nommée — rien n'est estimé ni extrapolé."
        >
          <div className="flex flex-col gap-1 border-b border-border pb-4 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <p className="text-[15px] font-medium text-charcoal">
                {p.data_source}
              </p>
              <p className="text-sm text-charcoal/55">
                Unités d&apos;évaluation foncière et adresses ponctuelles
                {p.assessment_year != null
                  ? ` — rôle d'évaluation ${p.assessment_year}`
                  : ""}
                .
              </p>
              {p.source_url ? (
                <a
                  href={p.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-medium text-forest underline-offset-4 hover:underline"
                >
                  Voir la source
                </a>
              ) : null}
            </div>
            <p className="shrink-0 text-sm text-charcoal/50">
              {p.created_at
                ? `Données importées le ${formatDate(p.created_at)}`
                : "Date d'import à confirmer"}
            </p>
          </div>
          <div className="mt-5">
            <h3 className="text-sm font-medium text-charcoal/70">
              Évaluation foncière au rôle
            </h3>
            <div className="mt-3">
              <SpecsGrid specs={assessmentSpecs} />
            </div>
          </div>
        </PassportSectionCard>

        {/* ---------- 5. Informations à confirmer ---------- */}
        <PassportSectionCard
          title="Informations à confirmer"
          intro="Ces informations ne figurent pas dans les données publiques. Avant toute décision, vérifiez-les auprès des sources officielles (ville, registre foncier, professionnel)."
        >
          <MissingChips fields={missingFields} />
        </PassportSectionCard>

        {/* ---------- 6. Potentiel du terrain et du bâtiment ---------- */}
        <PassportSectionCard
          title="Potentiel du terrain et du bâtiment"
          intro="Hypothèses : seuls les constats ci-dessus, issus des données ouvertes, sont connus. Sans visite, sans vérification au registre foncier et sans le règlement municipal applicable, aucun potentiel de transformation ne peut être affirmé."
        >
          <p className="text-[15px] italic text-charcoal/45">À confirmer</p>
          <PotentialDisclaimer />
        </PassportSectionCard>

        {/* ---------- 7. Budget indicatif des travaux ---------- */}
        <PassportSectionCard
          title="Budget indicatif des travaux"
          intro="Hypothèses : sans visite, sans plans et sans état des lieux, aucun budget de travaux ne peut être estimé sérieusement. Chaque projet dépend de l'état réel du bâtiment et des exigences municipales."
        >
          <p className="text-[15px] italic text-charcoal/45">À confirmer</p>
          <Link
            href="/services/demande"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-2.5 text-sm font-medium text-charcoal transition-colors duration-200 hover:border-gold hover:bg-cream"
          >
            Demander une estimation
          </Link>
          <p className="mt-3 text-xs text-charcoal/45">
            Sans compte requis — un professionnel Nesta vous répond.
          </p>
        </PassportSectionCard>

        {/* ---------- 8. Scénarios financiers pour un plex ---------- */}
        <PassportSectionCard
          title="Scénarios financiers pour un plex"
          intro="Aucune donnée financière (loyers, charges, mise de fonds) n'est disponible pour ce profil dans les données publiques."
        >
          <p className="text-[15px] italic text-charcoal/45">À confirmer</p>
        </PassportSectionCard>

        {/* ---------- 9. Profils similaires (maillage interne) ---------- */}
        {similar.length > 0 ? (
          <PassportSectionCard
            title={lang === "en" ? "Similar profiles" : "Profils similaires"}
            intro={
              lang === "en"
                ? "Other properties in the same area and category."
                : "D'autres biens du même secteur et de même catégorie."
            }
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {similar.map((s) => (
                <Link
                  key={s.id}
                  href={`/passeport/profil/${s.id}`}
                  className="group rounded-xl border border-border bg-white p-4 transition-colors duration-200 hover:border-forest/40 hover:bg-cream"
                >
                  <p className="text-sm font-semibold text-charcoal group-hover:text-forest">
                    {s.address}
                  </p>
                  <p className="mt-0.5 text-xs text-charcoal/55">
                    {s.borough ? `${s.borough}, ` : ""}
                    {s.city}
                    {s.assessment_total != null
                      ? ` — ${formatPrice(s.assessment_total, lang)}`
                      : ""}
                  </p>
                </Link>
              ))}
            </div>
          </PassportSectionCard>
        ) : null}

        {/* ---------- 10. CTA ---------- */}
        <ProfileAnalysisCta address={p.address} />
      </div>
    </div>
  );
}
