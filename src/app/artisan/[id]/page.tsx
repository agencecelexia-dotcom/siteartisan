import type { Metadata } from "next"
import { artisans, getArtisanById } from "@/data/artisans"
import { tradeLabel } from "@/lib/constants"
import ArtisanDetailClient from "./ArtisanDetailClient"

export function generateStaticParams() {
  return artisans.map((a) => ({ id: a.id }))
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const artisan = getArtisanById(params.id)

  if (!artisan) {
    return {
      title: "Artisan | ArtisansFrance.fr",
      description: "Fiche artisan sur ArtisansFrance.fr",
    }
  }

  const trades = artisan.trades.map((t) => tradeLabel[t]).join(", ")
  const title = `${artisan.businessName} - ${trades} \u00e0 ${artisan.city} | ArtisansFrance.fr`
  const description = artisan.shortDescription || `${artisan.businessName}, ${trades} \u00e0 ${artisan.city} (${artisan.postalCode}). Avis clients v\u00e9rifi\u00e9s, certifications, contact. Trouvez votre artisan sur ArtisansFrance.fr.`

  return {
    title,
    description,
    keywords: `${artisan.businessName}, ${trades}, ${artisan.city}, ${artisan.department}, artisan, ${artisan.trades.join(", ")}, avis, certifi\u00e9`,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "fr_FR",
      siteName: "ArtisansFrance.fr",
      images: artisan.profilePhoto ? [{ url: artisan.profilePhoto, alt: artisan.businessName }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default function ArtisanDetailPage({ params }: { params: { id: string } }) {
  const artisan = getArtisanById(params.id)

  const jsonLd = artisan
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: artisan.businessName,
        description: artisan.shortDescription,
        telephone: artisan.phone,
        email: artisan.email,
        url: `https://artisansfrance.fr/artisan/${artisan.id}/`,
        image: artisan.profilePhoto,
        address: {
          "@type": "PostalAddress",
          streetAddress: artisan.address,
          addressLocality: artisan.city,
          postalCode: artisan.postalCode,
          addressRegion: artisan.department,
          addressCountry: "FR",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: artisan.rating.average,
          reviewCount: artisan.rating.count,
          bestRating: 5,
        },
        areaServed: artisan.serviceArea.map((area) => ({
          "@type": "Place",
          name: area,
        })),
        knowsAbout: artisan.trades.map((t) => tradeLabel[t]),
        foundingDate: artisan.foundedYear?.toString(),
        ...(artisan.website ? { sameAs: [artisan.website] } : {}),
      }
    : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ArtisanDetailClient id={params.id} />
    </>
  )
}
