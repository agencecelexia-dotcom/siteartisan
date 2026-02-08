import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "SiteArtisan - Trouvez les meilleurs artisans pr\u00e8s de chez vous",
  description: "Annuaire professionnel d'artisans certifi\u00e9s : plombiers, piscinistes, paysagistes, \u00e9lectriciens. Trouvez et contactez les meilleurs professionnels pr\u00e8s de chez vous.",
  keywords: "artisan, plombier, pisciniste, paysagiste, \u00e9lectricien, annuaire, France",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={nunito.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
