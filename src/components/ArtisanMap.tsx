"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { DivIcon } from "leaflet"
import "leaflet/dist/leaflet.css"
import Link from "next/link"
import { Artisan } from "@/types/artisan"
import { getArtisanUrl } from "@/lib/utils"
import { getCityCoordinates } from "@/lib/cityCoordinates"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, ArrowRight } from "lucide-react"

interface ArtisanMapProps {
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

export default function ArtisanMap({ artisans }: ArtisanMapProps) {
  const [isMounted, setIsMounted] = useState(false)
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example"

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="w-full h-[600px] bg-gray-100 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">Chargement de la carte...</p>
      </div>
    )
  }

  // Centre de la France
  const centerPosition: [number, number] = [46.2276, 2.2137]

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      <MapContainer
        center={centerPosition}
        zoom={6}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`}
          tileSize={512}
          zoomOffset={-1}
        />

        {artisans.map((artisan) => {
          const position = getCityCoordinates(artisan.city)
          const trade = artisan.trades[0]
          const color = tradeColors[trade] || "#6B7280"

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
              ">
                <div style="
                  position: absolute;
                  top: 0;
                  left: 50%;
                  transform: translateX(-50%);
                  background-color: ${color};
                  width: 36px;
                  height: 36px;
                  border-radius: 50%;
                  border: 3px solid white;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  z-index: 2;
                ">
                  <span style="
                    color: white;
                    font-size: 14px;
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
            <Marker key={artisan.id} position={position} icon={icon}>
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
                    <Link href={getArtisanUrl(artisan.id)} className="flex-1">
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
  )
}
