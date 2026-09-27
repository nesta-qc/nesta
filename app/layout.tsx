import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
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

/*
 * Coquille racine minimale : les groupes de routes définissent
 * leur propre habillage ((site) = header/footer publics,
 * (admin) = coquille du centre de contrôle interne).
 */
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
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
