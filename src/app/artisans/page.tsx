import type { Metadata } from "next"
import ArtisansClient from "./ArtisansClient"

export const metadata: Metadata = {
  title: "Tous les artisans certifi\u00e9s | ArtisansFrance.fr",
  description: "D\u00e9couvrez tous les artisans certifi\u00e9s de France : plombiers, piscinistes, paysagistes, \u00e9lectriciens, d\u00e9m\u00e9nageurs. Filtrez par m\u00e9tier, ville et avis clients. Annuaire 100% gratuit.",
  keywords: "artisans, annuaire artisans, plombier, pisciniste, paysagiste, \u00e9lectricien, d\u00e9m\u00e9nageur, France, avis clients",
  openGraph: {
    title: "Tous les artisans certifi\u00e9s | ArtisansFrance.fr",
    description: "D\u00e9couvrez tous les artisans certifi\u00e9s de France. Filtrez par m\u00e9tier et ville.",
    type: "website",
    locale: "fr_FR",
    siteName: "ArtisansFrance.fr",
  },
  twitter: {
    card: "summary",
    title: "Tous les artisans certifi\u00e9s | ArtisansFrance.fr",
    description: "D\u00e9couvrez tous les artisans certifi\u00e9s de France.",
  },
}

export default function ArtisansPage() {
  return <ArtisansClient />
}
