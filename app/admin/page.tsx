import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Badge, Button, Container, EmptyState } from "@/components/ui";
import { AdminActions } from "@/components/properties/AdminActions";
import { getAllPropertiesAdmin } from "@/actions/properties";
import { getViewerContext } from "@/lib/auth";
import {
  formatDate,
  formatPrice,
  statusBadgeVariant,
  statusLabel,
} from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administration",
  description: "Modération des annonces Nesta.",
};

/** Administration — rôle ADMIN requis. */
export default async function AdminPage() {
  const viewer = await getViewerContext();

  if (!viewer.user) {
    redirect("/connexion");
  }

  if (!viewer.isAdmin) {
    return (
      <Container className="py-12 sm:py-16">
        <EmptyState
          title="Accès refusé"
          description="Cette section est réservée aux administrateurs de la plateforme."
          action={
            <Link href="/">
              <Button variant="secondary">Retour à l’accueil</Button>
            </Link>
          }
        />
      </Container>
    );
  }

  const { items, error } = await getAllPropertiesAdmin();

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-3xl text-charcoal sm:text-4xl">
        Administration
      </h1>
      <p className="mt-2 text-sm text-charcoal/60">
        {items.length === 0
          ? "Aucune annonce."
          : `${items.length} annonce${items.length > 1 ? "s" : ""} au total.`}
      </p>

      {error ? (
        <p role="alert" className="mt-8 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      {items.length === 0 && !error ? (
        <div className="mt-8">
          <EmptyState
            title="Aucune annonce"
            description="Les annonces créées par les vendeurs apparaîtront ici pour modération."
          />
        </div>
      ) : null}

      {items.length > 0 ? (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-charcoal/50">
                <th scope="col" className="px-5 py-4 font-medium">
                  Adresse
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Prix
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Statut
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Propriétaire
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Créée le
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Modération
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-border/60 last:border-0"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/properties/${p.id}`}
                      className="font-medium text-forest underline-offset-4 hover:underline"
                    >
                      {p.address}
                    </Link>
                    <p className="mt-0.5 text-xs text-charcoal/50">{p.city}</p>
                  </td>
                  <td className="px-5 py-4 font-medium">
                    {formatPrice(p.asking_price)}
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={statusBadgeVariant(p.status)}>
                      {statusLabel(p.status)}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-charcoal/70">
                    {p.ownerName ?? (
                      <span className="font-mono text-xs">
                        {p.owner_id.slice(0, 8)}…
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-charcoal/70">
                    {formatDate(p.created_at)}
                  </td>
                  <td className="px-5 py-4">
                    <AdminActions id={p.id} status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </Container>
  );
}
