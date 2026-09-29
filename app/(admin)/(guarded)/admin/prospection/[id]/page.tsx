import { notFound } from "next/navigation";
import { getProspectDetail } from "@/actions/crm";
import { ProspectDetail } from "@/components/admin/ProspectDetail";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = await getProspectDetail(id);
  return {
    title: detail ? `${detail.prospect.company_name} — Fiche prospect` : "Fiche prospect",
  };
}

export default async function ProspectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = await getProspectDetail(id);
  if (!detail) notFound();
  return (
    <ProspectDetail
      prospect={detail.prospect}
      activities={detail.activities}
    />
  );
}
