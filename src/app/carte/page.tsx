import { Metadata } from "next"
import dynamic from "next/dynamic"
import { artisans } from "@/data/artisans"
import { MapPin } from "lucide-react"

// Import dynamique pour éviter les erreurs SSR avec Leaflet
const ArtisanMapWithList = dynamic(() => import("@/components/ArtisanMapWithList"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-200px)] bg-gray-100 rounded-2xl flex items-center justify-center">
      <p className="text-gray-500">Chargement de la carte...</p>
    </div>
  ),
})

export const metadata: Metadata = {
  title: "Carte des artisans | SiteArtisan",
  description: "Découvrez tous nos artisans sur une carte interactive",
}

export default function CartePage() {
  const activeArtisans = artisans.filter((artisan) => artisan.status === "active")

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary to-primary-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-7 h-7" />
            <h1 className="text-2xl md:text-3xl font-heading font-bold">
              Carte des artisans
            </h1>
          </div>
          <p className="text-base text-white/90">
            Explorez la zone et découvrez les artisans près de chez vous
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ArtisanMapWithList artisans={activeArtisans} />
      </section>
    </div>
  )
}
