import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

/* Serif éditorial pour les titres — repli Georgia si le chargement échoue. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

/* Sans-serif pour le texte courant — repli system-ui si le chargement échoue. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nesta — L'immobilier, à votre façon",
    template: "%s — Nesta",
  },
  description:
    "Nesta, la plateforme immobilière québécoise : recherchez, vendez et gérez vos projets immobiliers en toute transparence.",
  icons: {
    icon: "/nesta-icon.png",
    apple: "/nesta-icon.png",
  },
};

/* Liens de navigation principaux (produits NESTA) : voir components/SiteHeader.tsx. */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />

        {/* Espace sous la barre d'onglets mobile. */}
        <main className="flex flex-1 flex-col pb-20 md:pb-0">{children}</main>

        <SiteFooter />
      </body>
    </html>
  );
}
