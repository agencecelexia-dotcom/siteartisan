import type { Metadata } from "next"
import AProposClient from "./AProposClient"

export const metadata: Metadata = {
  title: "\u00c0 propos de ArtisansFrance.fr - Annuaire gratuit d'artisans",
  description: "D\u00e9couvrez pourquoi ArtisansFrance.fr est diff\u00e9rent des annuaires classiques. 100% gratuit, classement bas\u00e9 sur la qualit\u00e9, avis v\u00e9rifi\u00e9s. L'annuaire qui change les r\u00e8gles du jeu.",
  keywords: "ArtisansFrance, annuaire gratuit, artisans certifi\u00e9s, \u00e0 propos, avis v\u00e9rifi\u00e9s, qualit\u00e9",
  openGraph: {
    title: "\u00c0 propos de ArtisansFrance.fr",
    description: "L'annuaire d'artisans qui change les r\u00e8gles du jeu. 100% gratuit, qualit\u00e9 v\u00e9rifi\u00e9e.",
    type: "website",
    locale: "fr_FR",
    siteName: "ArtisansFrance.fr",
  },
  twitter: {
    card: "summary",
    title: "\u00c0 propos de ArtisansFrance.fr",
    description: "L'annuaire d'artisans qui change les r\u00e8gles du jeu.",
  },
}

export default function AProposPage() {
  return <AProposClient />
}
