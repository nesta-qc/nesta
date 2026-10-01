import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui";
import { getViewerContext } from "@/lib/auth";
import { getMyServiceRequests } from "@/actions/service-requests";
import { ServiceRequestList } from "@/components/services/ServiceRequestList";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await pageMetadata({
    title: "Suivi de mes demandes",
    description: "Suivez l'avancement de vos demandes de services.",
    path: "/services/suivi",
    noIndex: true,
  });
}


/** Suivi des demandes de services : statuts réels uniquement. */
export default async function ServiceTrackingPage({
  searchParams,
}: {
  searchParams: Promise<{ nouveau?: string }>;
}) {
  const viewer = await getViewerContext();
  if (!viewer.user) {
    redirect("/connexion?redirect=/services/suivi");
  }

  const params = await searchParams;
  const requests = await getMyServiceRequests();

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            Services
          </p>
          <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
            Mes demandes
          </h1>
        </div>
        <Link href="/services/demande">
          <Button>Nouvelle demande</Button>
        </Link>
      </div>

      {params.nouveau ? (
        <p
          role="status"
          className="mt-6 rounded-[var(--radius-md)] border border-forest/20 bg-forest/[0.06] p-4 text-sm text-charcoal"
        >
          Demande envoyée. Vous recevrez un devis avant toute facturation.
        </p>
      ) : null}

      <ServiceRequestList requests={requests} />
    </div>
  );
}
