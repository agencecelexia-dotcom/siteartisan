import type { Metadata } from "next"
import HomeClient from "./HomeClient"

export const metadata: Metadata = {
  title: "ArtisansFrance.fr - Annuaire gratuit d'artisans certifi\u00e9s en France",
  description: "Trouvez les meilleurs artisans pr\u00e8s de chez vous gratuitement. Plombiers, piscinistes, paysagistes, \u00e9lectriciens, d\u00e9m\u00e9nageurs certifi\u00e9s avec avis clients v\u00e9rifi\u00e9s. Annuaire 100% gratuit.",
  keywords: "artisan, plombier, pisciniste, paysagiste, \u00e9lectricien, d\u00e9m\u00e9nageur, annuaire gratuit, artisan pr\u00e8s de chez moi, France, artisansfrance",
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
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Comment trouver un bon artisan pr\u00e8s de chez moi ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Utilisez ArtisansFrance.fr pour rechercher par m\u00e9tier et par ville. Chaque artisan dispose d\u2019une fiche compl\u00e8te avec ses certifications, avis clients et zone d\u2019intervention.",
      },
    },
    {
      "@type": "Question",
      name: "Comment choisir entre un plombier, \u00e9lectricien ou paysagiste ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Comparez les fiches artisans : v\u00e9rifiez les certifications (RGE, Qualibat, Qualifelec), lisez les avis clients, et regardez le portfolio de r\u00e9alisations.",
      },
    },
    {
      "@type": "Question",
      name: "L\u2019annuaire ArtisansFrance.fr est-il vraiment gratuit ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, ArtisansFrance.fr est 100% gratuit pour les particuliers comme pour les artisans. Le classement est bas\u00e9 sur la qualit\u00e9 r\u00e9elle, pas sur un budget publicitaire.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle diff\u00e9rence entre un annuaire gratuit et payant ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les annuaires payants font payer les artisans pour appara\u00eetre en t\u00eate de liste. ArtisansFrance.fr est gratuit et classe les artisans selon leurs avis, certifications et qualit\u00e9 de service r\u00e9elle.",
      },
    },
    {
      "@type": "Question",
      name: "Comment r\u00e9f\u00e9rencer mon entreprise gratuitement sur Google ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En vous inscrivant sur ArtisansFrance.fr, votre fiche artisan est automatiquement index\u00e9e par Google. Chaque fiche g\u00e9n\u00e8re une page d\u00e9di\u00e9e avec votre nom, m\u00e9tier, ville et avis.",
      },
    },
    {
      "@type": "Question",
      name: "Quels sont les labels et certifications importants pour un artisan ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RGE (\u00e9co-responsable), Qualibat (b\u00e2timent), Qualifelec (\u00e9lectricit\u00e9), IRVE (bornes recharge), UNEP (paysage) garantissent la qualit\u00e9 et l\u2019assurance.",
      },
    },
    {
      "@type": "Question",
      name: "Combien \u00e7a co\u00fbte d'\u00eatre sur ArtisansFrance.fr ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "C'est gratuit ! Pas de frais d'inscription, pas d'abonnement mensuel, pas de co\u00fbts cach\u00e9s.",
      },
    },
  ],
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ArtisansFrance.fr",
  url: "https://artisansfrance.fr",
  logo: "https://artisansfrance.fr/logo.png",
  description: "Annuaire gratuit d'artisans certifi\u00e9s en France. Plombiers, piscinistes, paysagistes, \u00e9lectriciens, d\u00e9m\u00e9nageurs.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "FR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+33769136182",
    email: "contact.artisansfrance@gmail.com",
    contactType: "customer service",
    availableLanguage: "French",
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomeClient />
    </>
  )
}
