import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import LayoutWrapper from "@/components/layout/LayoutWrapper"

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "ArtisansFrance.fr - Annuaire gratuit d'artisans certifi\u00e9s en France",
  description: "Trouvez les meilleurs artisans pr\u00e8s de chez vous gratuitement. Plombiers, piscinistes, paysagistes, \u00e9lectriciens, d\u00e9m\u00e9nageurs certifi\u00e9s avec avis clients v\u00e9rifi\u00e9s. Annuaire 100% gratuit.",
  keywords: "artisan, plombier, pisciniste, paysagiste, \u00e9lectricien, d\u00e9m\u00e9nageur, annuaire gratuit, artisan pr\u00e8s de chez moi, France, artisansfrance",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "ArtisansFrance.fr - Annuaire gratuit d'artisans certifi\u00e9s",
    description: "Trouvez les meilleurs artisans pr\u00e8s de chez vous. 100% gratuit, avis v\u00e9rifi\u00e9s, artisans certifi\u00e9s.",
    type: "website",
    locale: "fr_FR",
    siteName: "ArtisansFrance.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArtisansFrance.fr - Annuaire gratuit d'artisans",
    description: "Trouvez les meilleurs artisans pr\u00e8s de chez vous. 100% gratuit.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={nunito.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
