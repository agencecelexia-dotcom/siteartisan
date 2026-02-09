import type { Metadata } from "next"
import AjouterClient from "./AjouterClient"

export const metadata: Metadata = {
  title: "Ajouter mon entreprise gratuitement | ArtisansFrance.fr",
  description: "Inscrivez votre entreprise artisanale gratuitement sur ArtisansFrance.fr. Gagnez en visibilit\u00e9, soyez r\u00e9f\u00e9renc\u00e9 sur Google et recevez des demandes de clients qualifi\u00e9s. Sans engagement.",
  keywords: "inscrire artisan, ajouter entreprise, r\u00e9f\u00e9rencement gratuit, visibilit\u00e9 artisan, annuaire gratuit",
  openGraph: {
    title: "Ajouter mon entreprise gratuitement | ArtisansFrance.fr",
    description: "Inscrivez votre entreprise artisanale gratuitement et gagnez en visibilit\u00e9.",
    type: "website",
    locale: "fr_FR",
    siteName: "ArtisansFrance.fr",
  },
  twitter: {
    card: "summary",
    title: "Ajouter mon entreprise | ArtisansFrance.fr",
    description: "Inscrivez votre entreprise artisanale gratuitement.",
  },
}

export default function AjouterEntreprisePage() {
  return <AjouterClient />
}
