"use client"

import { useEffect, useState, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import { DivIcon, Map as LeafletMap } from "leaflet"
import "leaflet/dist/leaflet.css"
import Link from "next/link"
import { Artisan } from "@/types/artisan"
import { getCityCoordinates } from "@/lib/cityCoordinates"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, ArrowRight, MapPin as MapPinIcon } from "lucide-react"

interface ArtisanMapWithListProps {
  artisans: Artisan[]
}

// Couleurs des markers par métier
const tradeColors: Record<string, string> = {
  plombier: "#3B82F6",
  pisciniste: "#06B6D4",
  paysagiste: "#10B981",
  electricien: "#F59E0B",
  demenageur: "#A855F7",
}

// Fonction pour ajouter un léger décalage unique à chaque artisan
// Pour éviter que les markers se superposent dans la même ville
function getArtisanPosition(artisan: Artisan): [number, number] {
  const basePosition = getCityCoordinates(artisan.city)

  // Créer un offset déterministe basé sur l'ID de l'artisan
  // Utilise un hash simple pour distribuer les artisans autour du centre
  const hash = artisan.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)

  // Offset en degrés (environ 0.01° = ~1km)
  // Distribue les artisans dans un rayon de ~2km autour du centre
  const maxOffset = 0.02
  const angle = (hash * 137.508) % 360 // Angle doré pour une meilleure distribution
  const distance = ((hash % 100) / 100) * maxOffset

  const latOffset = Math.sin(angle * Math.PI / 180) * distance
  const lngOffset = Math.cos(angle * Math.PI / 180) * distance

  return [basePosition[0] + latOffset, basePosition[1] + lngOffset]
}

// Composant pour gérer les événements de la carte
function MapEventHandler({ onBoundsChange }: { onBoundsChange: (bounds: any) => void }) {
  const map = useMapEvents({
    moveend: () => {
      const bounds = map.getBounds()
      onBoundsChange(bounds)
    },
    zoomend: () => {
      const bounds = map.getBounds()
      onBoundsChange(bounds)
    },
  })

  return null
}

// Composant pour centrer la carte sur un artisan
function MapCenterController({ center, zoom }: { center: [number, number] | null; zoom?: number }) {
  const map = useMap()

  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom(), { animate: true })
    }
  }, [center, zoom, map])

  return null
}

export default function ArtisanMapWithList({ artisans }: ArtisanMapWithListProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [visibleArtisans, setVisibleArtisans] = useState<Artisan[]>(artisans)
  const [selectedArtisan, setSelectedArtisan] = useState<string | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null)
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""
  const useMapbox = mapboxToken && !mapboxToken.includes("example")

  useEffect(() => {
    setIsMounted(true)
    setVisibleArtisans(artisans)
  }, [artisans])

  const handleBoundsChange = (bounds: any) => {
    const filtered = artisans.filter((artisan) => {
      const position = getArtisanPosition(artisan)
      return bounds.contains(position)
    })
    setVisibleArtisans(filtered)
  }

  const handleArtisanClick = (artisan: Artisan) => {
    const position = getArtisanPosition(artisan)
    setMapCenter(position)
    setSelectedArtisan(artisan.id)

    // Scroll to artisan in list
    const element = document.getElementById(`artisan-${artisan.id}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }

  if (!isMounted) {
    return (
      <div className="w-full h-[calc(100vh-200px)] bg-gray-100 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">Chargement de la carte...</p>
      </div>
    )
  }

  // Centre de la France
  const centerPosition: [number, number] = [46.2276, 2.2137]

  return (
    <div className="flex gap-4 h-[calc(100vh-200px)]">
      {/* Liste des artisans à gauche */}
      <div className="w-96 flex-shrink-0 overflow-y-auto bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
          <h3 className="font-semibold text-gray-900">
            {visibleArtisans.length} artisan{visibleArtisans.length > 1 ? "s" : ""} dans cette zone
          </h3>
        </div>

        <div className="p-2 space-y-2">
          {visibleArtisans.map((artisan) => {
            const trade = artisan.trades[0]
            const isSelected = selectedArtisan === artisan.id

            return (
              <div
                key={artisan.id}
                id={`artisan-${artisan.id}`}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                  isSelected
                    ? "border-primary bg-primary-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
                onClick={() => handleArtisanClick(artisan)}
              >
                <div className="flex gap-3">
                  {artisan.profilePhoto && (
                    <img
                      src={artisan.profilePhoto}
                      alt={artisan.businessName}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1 truncate">
                      {artisan.businessName}
                    </h4>
                    <Badge variant={trade as any} className="mb-2">
                      {trade}
                    </Badge>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                      <MapPinIcon className="w-3 h-3" />
                      {artisan.city}
                    </p>
                    {artisan.rating && (
                      <p className="text-sm text-gray-600">
                        ⭐ {artisan.rating.average}/5 ({artisan.rating.count})
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <Link href={`/artisan/${artisan.id}`} className="flex-1" onClick={(e) => e.stopPropagation()}>
                    <Button size="sm" className="w-full gap-1" variant={isSelected ? "default" : "outline"}>
                      Voir la fiche
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                  {artisan.phone && (
                    <Button size="sm" variant="outline" asChild onClick={(e) => e.stopPropagation()}>
                      <a href={`tel:${artisan.phone}`}>
                        <Phone className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )
          })}

          {visibleArtisans.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <MapPinIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Aucun artisan dans cette zone</p>
              <p className="text-sm mt-1">Dézoomer pour voir plus d'artisans</p>
            </div>
          )}
        </div>
      </div>

      {/* Carte à droite */}
      <div className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        <MapContainer
          center={centerPosition}
          zoom={6}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> France'
            url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
            maxZoom={20}
          />

          <MapEventHandler onBoundsChange={handleBoundsChange} />
          <MapCenterController center={mapCenter} zoom={13} />

          {artisans.map((artisan) => {
            const position = getArtisanPosition(artisan)
            const trade = artisan.trades[0]
            const color = tradeColors[trade] || "#6B7280"
            const isSelected = selectedArtisan === artisan.id

            // Créer un marker style Airbnb avec DivIcon
            const icon = new DivIcon({
              html: `
                <div style="
                  position: relative;
                  width: 40px;
                  height: 48px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  transition: transform 0.2s;
                  ${isSelected ? "transform: scale(1.2);" : ""}
                ">
                  <div style="
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: ${color};
                    width: ${isSelected ? "42px" : "36px"};
                    height: ${isSelected ? "42px" : "36px"};
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 4px 12px rgba(0,0,0,${isSelected ? "0.4" : "0.25"});
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: ${isSelected ? "1000" : "2"};
                    transition: all 0.2s;
                  ">
                    <span style="
                      color: white;
                      font-size: ${isSelected ? "16px" : "14px"};
                      font-weight: 700;
                    ">
                      ${trade[0].toUpperCase()}
                    </span>
                  </div>
                  <div style="
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-top: 12px solid ${color};
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
                    z-index: 1;
                  ">
                  </div>
                </div>
              `,
              className: "custom-marker",
              iconSize: [40, 48],
              iconAnchor: [20, 48],
              popupAnchor: [0, -48],
            })

            return (
              <Marker
                key={artisan.id}
                position={position}
                icon={icon}
                eventHandlers={{
                  click: () => handleArtisanClick(artisan),
                }}
              >
                <Popup className="custom-popup" minWidth={250}>
                  <div className="p-2">
                    <div className="flex items-start gap-3">
                      {artisan.profilePhoto && (
                        <img
                          src={artisan.profilePhoto}
                          alt={artisan.businessName}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-semibold text-lg text-gray-900 mb-1">
                          {artisan.businessName}
                        </h3>
                        <Badge variant={trade as any} className="mb-2">
                          {trade}
                        </Badge>
                        <p className="text-sm text-gray-600 mb-1">
                          📍 {artisan.city} ({artisan.postalCode})
                        </p>
                        {artisan.rating && (
                          <p className="text-sm text-gray-600">
                            ⭐ {artisan.rating.average}/5 ({artisan.rating.count} avis)
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Link href={`/artisan/${artisan.id}`} className="flex-1">
                        <Button size="sm" className="w-full gap-1">
                          Voir la fiche
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                      {artisan.phone && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={`tel:${artisan.phone}`}>
                            <Phone className="w-3 h-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
      </div>
    </div>
  )
}
