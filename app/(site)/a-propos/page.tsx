import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Button } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  return await pageMetadata({
    title: "À propos",
    description: "Nesta : la plateforme immobilière québécoise, simple et transparente.",
    path: "/a-propos",
    titleEn: "About",
    descriptionEn: "Nesta: the Quebec real estate platform, simple and transparent.",
  });
}


/** À propos : institutionnel, honnête, sans récit inventé. */
export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
        À propos
      </p>
      <h1 className="mt-4 font-display text-4xl leading-[1.08] text-charcoal sm:text-5xl">
        L&apos;immobilier,
        <br />
        à votre façon.
      </h1>

      <div className="mt-8 flex flex-col gap-5 text-[16px] leading-relaxed text-charcoal/70">
        <p>
          Nesta est une plateforme immobilière québécoise. Elle permet de
          chercher, visiter, acheter ou vendre une propriété — avec ou sans
          courtier.
        </p>
        <p>
          Chaque annonce affiche ses informations réelles : prix, taxes,
          superficies, année de construction. Quand une information
          n&apos;est pas disponible, c&apos;est indiqué clairement plutôt
          que deviné.
        </p>
        <p>
          Les vendeurs peuvent publier leur annonce eux-mêmes, être
          accompagnés, ou confier la vente à un professionnel. Les acheteurs
          explorent les propriétés sur une carte, visitent en 3D quand une
          visite existe, et estiment leur coût réel avant de se déplacer.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { title: "Acheter", text: "Explorez les propriétés et visitez en 3D.", href: "/search" },
          { title: "Vendre", text: "Publiez votre annonce à votre façon.", href: "/sell" },
          { title: "Investir", text: "Analysez des immeubles avec des données claires.", href: "/investir" },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-[var(--radius-md)] border border-border bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
          >
            <h2 className="font-display text-lg text-charcoal">{c.title}</h2>
            <p className="mt-1.5 text-sm text-charcoal/55">{c.text}</p>
            <span className="mt-3 inline-block text-sm font-medium text-forest">
              Découvrir <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <h2 className="font-display text-xl text-charcoal">Nous joindre</h2>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
          Une question sur la plateforme, un projet immobilier, un service
          professionnel : écrivez-nous via une demande de service.
        </p>
        <Link href="/services/demande" className="mt-5 inline-block">
          <Button>Nous contacter</Button>
        </Link>
      </div>
    </div>
  );
}
