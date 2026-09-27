"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Badge, Button, Card, EmptyState } from "@/components/ui";
import {
  cancelServiceRequest,
  type ServiceRequestRow,
} from "@/actions/service-requests";
import { getServiceById, serviceStatusLabel } from "@/lib/services";

/* Suivi des demandes : statut réel, annulation possible si en cours. */

const ACTIVE_STATUSES = ["pending", "in_review", "quoted"];

export function ServiceRequestList({
  requests,
}: {
  requests: ServiceRequestRow[];
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState(requests);

  function handleCancel(id: string) {
    if (!window.confirm("Annuler cette demande ?")) return;
    setError(null);
    startTransition(async () => {
      const result = await cancelServiceRequest(id);
      if (!result.ok) {
        setError(result.message ?? "Annulation impossible.");
      } else {
        setItems((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: "cancelled" } : r)),
        );
      }
    });
  }

  if (items.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState
          title="Aucune demande"
          description="Décrivez votre projet et recevez un devis sans engagement."
          action={
            <Link href="/services/demande">
              <Button>Demander un devis</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-4">
      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
      {items.map((r) => {
        const service = getServiceById(r.service_id);
        const cancellable = ACTIVE_STATUSES.includes(r.status);
        return (
          <Card key={r.id} className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium text-charcoal">{r.project_name}</p>
                <p className="mt-0.5 text-sm text-charcoal/55">
                  {service?.name ?? r.service_id} ·{" "}
                  {new Date(r.created_at).toLocaleDateString("fr-CA")}
                </p>
              </div>
              <Badge
                variant={
                  r.status === "delivered"
                    ? "forest"
                    : r.status === "cancelled"
                      ? "muted"
                      : "gold"
                }
              >
                {serviceStatusLabel(r.status)}
              </Badge>
            </div>
            {r.admin_note ? (
              <p className="mt-3 rounded-[var(--radius-md)] bg-ivory p-3 text-sm text-charcoal/70">
                {r.admin_note}
              </p>
            ) : null}
            {cancellable ? (
              <div className="mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={pending}
                  onClick={() => handleCancel(r.id)}
                >
                  Annuler la demande
                </Button>
              </div>
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}
