import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Card, EmptyState } from "@/components/ui";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { getMarketStats } from "@/actions/property-profiles";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = pageMetadata({
  title: "Statistiques du marché",
  description:
    "Agrégats honnêtes calculés sur les profils du Passeport Nesta : répartition par arrondissement, valeur au rôle médiane, catégories — issus des données ouvertes de la Ville de Montréal.",
  path: "/statistiques",
});

/* Agrégats recalculés à chaque visite : les profils évoluent via les données ouvertes. */
export const dynamic = "force-dynamic";

/**
 * Hub /statistiques : que des agrégats calculés depuis les vrais profils
 * Passeport (property_profiles). Aucun chiffre inventé ; la méthodologie
 * dit exactement ce que l'échantillon vaut — et ce qu'il ne vaut pas.
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
  const computedOn = new Date().toLocaleDateString(
    lang === "fr" ? "fr-CA" : "en-CA",
    { day: "numeric", month: "long", year: "numeric" },
  );

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

      {/* ---------- Par arrondissement ---------- */}
      <h2 className="mt-10 font-display text-2xl text-charcoal">
        {t.parArrondissement}
      </h2>
      <Card className="mt-4 p-5 sm:p-6">
        <ul className="flex flex-col gap-5">
          {stats.boroughs.map((b) => (
            <li key={b.borough}>
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-semibold text-charcoal">
                  {b.borough}
                </p>
                <p className="text-sm text-charcoal/60">
                  {b.count} {t.profils} ·{" "}
                  <span className="font-semibold text-forest">
                    {b.medianAssessment != null
                      ? formatPrice(b.medianAssessment)
                      : "—"}
                  </span>
                </p>
              </div>
              <div
                className="mt-2 h-2.5 overflow-hidden rounded-full bg-cream"
                role="img"
                aria-label={`${b.borough} : ${t.valeurMedianeColonne} ${b.medianAssessment != null ? formatPrice(b.medianAssessment) : "—"}`}
              >
                <div
                  className="h-full rounded-full bg-forest/80"
                  style={{
                    width: `${
                      maxMedian > 0 && b.medianAssessment != null
                        ? Math.max(
                            2,
                            Math.round(
                              (b.medianAssessment / maxMedian) * 100,
                            ),
                          )
                        : 0
                    }%`,
                  }}
                />
              </div>
            </li>
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
          <li>{t.methodoEchantillon.replace("{n}", String(stats.total))}</li>
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
