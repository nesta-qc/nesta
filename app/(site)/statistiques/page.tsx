import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Card, EmptyState } from "@/components/ui";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { getMarketStats } from "@/actions/property-profiles";
import { formatPrice } from "@/lib/format";
import { StatsNav } from "./StatsNav";
import { BoroughRow } from "./BoroughRow";

export async function generateMetadata(): Promise<Metadata> {
  return await pageMetadata({
    title: "Statistiques du marché",
    description:
      "Agrégats honnêtes calculés sur les profils du Passeport Nesta : répartition par ville et arrondissement, valeur au rôle médiane, catégories — issus des données ouvertes (Ville de Montréal et MAMH, Données Québec).",
    path: "/statistiques",
  });
}


/* Agrégats recalculés à chaque visite : les profils évoluent via les données ouvertes. */
export const dynamic = "force-dynamic";

/**
 * Hub /statistiques — page « Aperçu » : que des agrégats calculés depuis les
 * vrais profils Passeport (property_profiles). Aucun chiffre inventé ; la
 * méthodologie dit exactement ce que l'échantillon vaut — et ce qu'il ne vaut pas.
 * Les listes complètes vivent sur /statistiques/villes et
 * /statistiques/arrondissements (recherche + tri) pour garder le DOM léger.
 */
export default async function StatistiquesPage() {
  const lang = await getLang();
  const t = dictionaries[lang].statistiques;
  const stats = await getMarketStats();

  if (!stats) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <EmptyState
          title={t.indisponibleTitre}
          description={t.indisponibleTexte}
        />
      </div>
    );
  }

  const maxMedian = Math.max(
    0,
    ...stats.boroughs.map((b) => b.medianAssessment ?? 0),
  );
  const roleYears = stats.assessmentYears.map((y) => String(y.year)).join(", ");
  const nbCities = stats.cities.length;
  const nbBoroughs = stats.boroughs.length;
  const avgPerBorough =
    nbBoroughs > 0 ? Math.round(stats.total / nbBoroughs) : 0;
  const methodoEchantillon = t.methodoEchantillonMulti
    .replace("{n}", String(stats.total))
    .replace("{nv}", String(nbCities))
    .replace("{nb}", String(nbBoroughs))
    .replace("{par}", String(avgPerBorough));
  const computedOn = new Date().toLocaleDateString(
    lang === "fr" ? "fr-CA" : "en-CA",
    { day: "numeric", month: "long", year: "numeric" },
  );
  const topBoroughs = stats.boroughs.slice(0, 10);

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
        {t.eyebrow}
      </p>
      <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
        {t.titre}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal/70">
        {t.intro.replace("{n}", String(stats.total))}
      </p>

      <StatsNav
        labels={{
          apercu: t.ongletApercu,
          villes: t.ongletVilles,
          arrondissements: t.ongletArrondissements,
        }}
      />

      {/* ---------- Vue d'ensemble ---------- */}
      <h2 className="mt-10 font-display text-2xl text-charcoal">
        {t.vueEnsemble}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-charcoal/45">
            {t.profilsAnalyses}
          </p>
          <p className="mt-2 font-display text-3xl text-forest">
            {stats.total}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-charcoal/45">
            {t.valeurMediane}
          </p>
          <p className="mt-2 font-display text-3xl text-forest">
            {stats.medianAssessment != null
              ? formatPrice(stats.medianAssessment)
              : "—"}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-charcoal/45">
            {t.anneeMediane}
          </p>
          <p className="mt-2 font-display text-3xl text-forest">
            {stats.medianConstructionYear ?? "—"}
          </p>
        </Card>
      </div>

      {/* ---------- Top arrondissements ---------- */}
      <div className="mt-10 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-2xl text-charcoal">
          {t.topArrondissements}
        </h2>
        <Link
          href="/statistiques/arrondissements"
          className="text-sm font-medium text-forest underline-offset-4 hover:underline"
        >
          {t.voirTout}
        </Link>
      </div>
      <Card className="mt-4 p-5 sm:p-6">
        <ul className="flex flex-col gap-5">
          {topBoroughs.map((b) => (
            <BoroughRow
              key={b.borough}
              borough={b}
              maxMedian={maxMedian}
              profilsLabel={t.profils}
              valeurMedianeLabel={t.valeurMedianeColonne}
            />
          ))}
        </ul>
      </Card>

      {/* ---------- Catégories ---------- */}
      <h2 className="mt-10 font-display text-2xl text-charcoal">
        {t.categories}
      </h2>
      <Card className="mt-4 p-5 sm:p-6">
        <ul className="flex flex-col gap-3">
          {stats.categories.map((c) => (
            <li
              key={c.category}
              className="flex items-baseline justify-between gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0"
            >
              <p className="text-sm text-charcoal/80">{c.category}</p>
              <p className="text-sm font-semibold text-charcoal">
                {c.count}
              </p>
            </li>
          ))}
        </ul>
      </Card>

      {/* ---------- Méthodologie ---------- */}
      <div className="mt-10 rounded-[var(--radius-md)] border border-border bg-white p-5 sm:p-6">
        <h2 className="font-display text-xl text-charcoal">
          {t.methodoTitre}
        </h2>
        <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-charcoal/70">
          <li>{t.methodoSource}</li>
          <li>{methodoEchantillon}</li>
          <li>{t.methodoRole}</li>
          <li>{t.methodoAnnees.replace("{annees}", roleYears || "—")}</li>
        </ul>
        <p className="mt-4 text-xs text-charcoal/45">
          {t.donneesAu.replace("{date}", computedOn)}
        </p>
      </div>
    </div>
  );
}
