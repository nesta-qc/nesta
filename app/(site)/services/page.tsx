import type { Metadata } from "next";
import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { NESTA_SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Estimation de construction, dessin Revit et modélisation 3D. Demandez un devis.",
};

/** Services professionnels : catalogue, devis, suivi. */
export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-5 pb-14 pt-14 sm:px-8 sm:pt-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            Services
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.08] text-charcoal sm:text-5xl">
            Des services pros,
            <br />
            sans détour.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/60">
            Estimation, dessin et modélisation 3D pour vos projets de
            construction et de rénovation. Demandez un devis, suivez
            l&apos;avancement.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/services/demande">
              <Button size="lg">Demander un devis</Button>
            </Link>
            <Link href="/services/suivi">
              <Button size="lg" variant="secondary">
                Suivre mes demandes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {NESTA_SERVICES.map((s, i) => (
            <div key={s.id} id={s.id} className="scroll-mt-24">
            <Card className="flex h-full flex-col p-8">
              <span className="font-display text-sm text-champagne">{`0${i + 1}`}</span>
              <h2 className="mt-3 font-display text-2xl text-charcoal">{s.name}</h2>
              <p className="mt-2 text-sm text-charcoal/55">{s.tagline}</p>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-charcoal/45">
                Portée
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {s.scope.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal/70">
                    <span aria-hidden="true" className="mt-0.5 text-forest">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-charcoal/45">
                Livrable
              </p>
              <p className="mt-2 text-sm text-charcoal/70">{s.deliverable}</p>

              <div className="mt-auto pt-8">
                <p className="font-display text-xl text-forest">
                  {s.startingPrice !== null
                    ? s.priceUnit === "h"
                      ? `${s.startingPrice} $/h`
                      : `À partir de ${s.startingPrice} $`
                    : "Sur devis"}
                </p>
                {s.addon ? (
                  <p className="mt-2 text-sm text-charcoal/60">
                    <span className="font-semibold text-charcoal">
                      + {s.addon.label}
                    </span>{" "}
                    — {s.addon.detail}
                  </p>
                ) : null}
                <Link
                  href={`/services/demande?service=${s.id}`}
                  className="mt-4 block"
                >
                  <Button variant="secondary" className="w-full">
                    {s.cta}
                  </Button>
                </Link>
              </div>
            </Card>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-charcoal/45">
          Chaque projet est différent : le prix final et le délai sont
          confirmés dans le devis, avant tout engagement. Ces services sont
          des prestations techniques indépendantes — Nesta ne fait pas de
          courtage immobilier.
        </p>
      </section>
    </>
  );
}
