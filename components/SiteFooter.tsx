import Link from "next/link";

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Nesta",
    links: [
      { href: "/a-propos", label: "À propos" },
      { href: "/services/demande", label: "Nous joindre" },
      { href: "/favoris", label: "Mes favoris" },
    ],
  },
  {
    title: "Immobilier",
    links: [
      { href: "/search", label: "Acheter" },
      { href: "/sell", label: "Vendre" },
      { href: "/investir", label: "Investir" },
      { href: "/projects", label: "Projets" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services#estimation", label: "Estimation" },
      { href: "/services#dessin-revit", label: "Revit / BIM" },
      { href: "/services#modelisation-3d", label: "Modélisation 3D" },
    ],
  },
  {
    title: "Professionnels",
    links: [{ href: "/pro", label: "Nesta Pro" }],
  },
  {
    title: "Légal",
    links: [
      { href: "/confidentialite", label: "Confidentialité" },
      { href: "/conditions", label: "Conditions" },
    ],
  },
];

/** Pied de page institutionnel NESTA. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-1">
            <p className="font-display text-2xl text-forest">Nesta</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-charcoal/55">
              L&apos;immobilier, à votre façon.
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/45">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-charcoal/70 transition-colors duration-200 hover:text-forest"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-charcoal/45">
            © 2026 Nesta — Plateforme immobilière québécoise. Tous droits réservés.
          </p>
          <p className="text-xs text-charcoal/45">
            Les estimations affichées sont indicatives et ne constituent pas une approbation hypothécaire.
          </p>
        </div>
      </div>
    </footer>
  );
}
