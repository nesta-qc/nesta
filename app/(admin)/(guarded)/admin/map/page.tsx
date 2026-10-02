import type { Metadata } from "next";
import { getMapPoints } from "@/actions/admin";
import { StatCard } from "@/components/admin/StatCard";
import { Section } from "@/components/admin/Section";
import { WorldMap } from "@/components/admin/WorldMap";import { EmptyState } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Carte",
  description: "Carte du monde des biens VEYLA — positions réelles.",
};

/* ============================================================
 * VEYLA Admin — Carte du monde.
 *
 * 100 % données réelles : seuls les biens avec coordonnées en
 * base sont placés précisément ; les autres sont regroupés par
 * ville (marqués « approximatif »). Le halo lumineux indique la
 * position réelle de la personne qui consulte (géolocalisation
 * du navigateur, avec permission). Les clients n'ont aucune
 * donnée de localisation en base : ce n'est pas affiché, et
 * c'est dit explicitement.
 * ============================================================ */

export default async function AdminMapPage() {
  const map = await getMapPoints();

  if (!map) {
    return (
      <EmptyState
        title="Carte indisponible"
        description="La connexion à la base de données n'est pas configurée."
      />
    );
  }

  // Regroupement par ville pour le détail (précis + approximatifs).
  const cityDetail = new Map<string, { precise: number; approx: number }>();
  for (const p of map.points) {
    const entry = cityDetail.get(p.city) ?? { precise: 0, approx: 0 };
    if (p.kind === "precise") entry.precise += p.count;
    else entry.approx += p.count;
    cityDetail.set(p.city, entry);
  }
  const cityRows = [...cityDetail.entries()]
    .map(([city, v]) => ({ city, ...v, total: v.precise + v.approx }))
    .sort((a, b) => b.total - a.total);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
            VEYLA Admin
          </p>
          <h1 className="mt-1 font-display text-3xl text-charcoal">Carte</h1>
          <p className="mt-2 max-w-xl text-sm text-charcoal/60">
            Où se trouvent les biens de la plateforme. Survolez un point pour le
            détail.
          </p>
        </div>
      </div>

      {/* Chiffres honnêtes. */}
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Biens au total" value={String(map.total)} />
        <StatCard
          label="Adresse exacte"
          value={String(map.preciseCount)}
          sub="Coordonnées réelles en base"
        />
        <StatCard
          label="Regroupés par ville"
          value={String(map.cityCount)}
          sub="Position approximative"
        />
        <StatCard
          label="Non localisables"
          value={String(map.unlocatedCount)}
          sub="Ville inconnue — non placés"
          subTone={map.unlocatedCount > 0 ? "warn" : "default"}
        />
      </div>

      {/* Carte du monde. */}
      <Section
        title="Carte du monde"
        description="Votre position s'allume automatiquement si vous autorisez la géolocalisation."
      >
        <div className="h-[420px] md:h-[520px]">
          <WorldMap points={map.points} />
        </div>
      </Section>

      {/* Détail par ville. */}
      {cityRows.length > 0 && (
        <Section
          title="Détail par ville"
          description="Biens avec adresse exacte vs regroupés au centre-ville."
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-charcoal/50">
                  <th className="px-5 py-3 font-medium">Ville</th>
                  <th className="px-5 py-3 text-right font-medium">Adresse exacte</th>
                  <th className="px-5 py-3 text-right font-medium">Approximatif</th>
                  <th className="px-5 py-3 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {cityRows.map((r) => (
                  <tr key={r.city} className="border-b border-border/60 last:border-0">
                    <td className="px-5 py-3 font-medium text-charcoal">{r.city}</td>
                    <td className="px-5 py-3 text-right text-charcoal/75">{r.precise}</td>
                    <td className="px-5 py-3 text-right text-charcoal/75">{r.approx}</td>
                    <td className="px-5 py-3 text-right font-semibold text-charcoal">
                      {r.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {map.total === 0 && (
        <div className="mt-6">
          <EmptyState
            title="Aucun bien"
            description="Il n'y a encore aucune propriété en base. Les biens publiés apparaîtront automatiquement sur la carte."
          />
        </div>
      )}

      {/* Note honnête sur les clients. */}
      <p className="mt-8 rounded-xl border border-border bg-white px-4 py-3 text-xs leading-relaxed text-charcoal/60">
        Note : la localisation des clients n’est pas collectée à l’inscription —
        la carte montre uniquement les biens. Si vous voulez voir d’où viennent
        les clients, il faudra ajouter la ville au profil.
      </p>
    </div>
  );
}
