import type { Metadata } from "next";
import AccesForm from "./AccesForm";

/* Page hors index : le sas d'accès n'a rien à faire dans Google. */
export const metadata: Metadata = {
  title: "Accès protégé | Veyla",
  robots: { index: false, follow: false },
};

/*
 * Sas d'accès au site : un seul code d'accès partagé.
 * Après validation, redirection vers la page demandée (?next=…).
 */
export default async function AccesPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const next =
    typeof params.next === "string" && params.next.startsWith("/")
      ? params.next
      : "/";
  return <AccesForm next={next} />;
}
