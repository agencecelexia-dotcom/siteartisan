"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import { DivIcon } from "leaflet"
import "leaflet/dist/leaflet.css"
import Link from "next/link"
import { Artisan, TRADES } from "@/types/artisan"
import { getCityCoordinates } from "@/lib/cityCoordinates"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, ArrowRight, MapPin as MapPinIcon, List, Map as MapIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ArtisanMapWithListProps {
  artisans: Artisan[]
}

const tradeColors: Record<string, string> = {
  plombier: "#3B82F6",
  pisciniste: "#06B6D4",
  paysagiste: "#10B981",
  electricien: "#F59E0B",
  demenageur: "#A855F7",
}

function getArtisanPosition(artisan: Artisan): [number, number] {
  const basePosition = getCityCoordinates(artisan.city)
  const hash = artisan.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const maxOffset = 0.02
  const angle = (hash * 137.508) % 360
  const distance = ((hash % 100) / 100) * maxOffset
  const latOffset = Math.sin((angle * Math.PI) / 180) * distance
  const lngOffset = Math.cos((angle * Math.PI) / 180) * distance
  return [basePosition[0] + latOffset, basePosition[1] + lngOffset]
}

function MapEventHandler({ onBoundsChange }: { onBoundsChange: (bounds: any) => void }) {
  const map = useMapEvents({
    moveend: () => onBoundsChange(map.getBounds()),
    zoomend: () => onBoundsChange(map.getBounds()),
  })
  return null
}

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
  const [selectedTrades, setSelectedTrades] = useState<string[]>([])
  const [mobileView, setMobileView] = useState<"map" | "list">("map")
  const [mapBounds, setMapBounds] = useState<any>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const filteredByTrade =
    selectedTrades.length > 0
      ? artisans.filter((a) => a.trades.some((t) => selectedTrades.includes(t)))
      : artisans

  useEffect(() => {
    if (mapBounds) {
      const filtered = filteredByTrade.filter((artisan) => {
        const position = getArtisanPosition(artisan)
        return mapBounds.contains(position)
      })
      setVisibleArtisans(filtered)
    } else {
      setVisibleArtisans(filteredByTrade)
    }
  }, [mapBounds, selectedTrades, artisans])

  const handleBoundsChange = (bounds: any) => {
    setMapBounds(bounds)
  }

  const toggleTrade = (tradeId: string) => {
    setSelectedTrades((prev) =>
      prev.includes(tradeId) ? prev.filter((t) => t !== tradeId) : [...prev, tradeId]
    )
  }

  const handleArtisanClick = (artisan: Artisan) => {
    const position = getArtisanPosition(artisan)
    setMapCenter(position)
    setSelectedArtisan(artisan.id)
    setMobileView("map")
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

  const centerPosition: [number, number] = [46.2276, 2.2137]

  const renderTradeFilters = (className?: string) => (
    <div className={cn("flex gap-2 flex-wrap", className)}>
      {TRADES.map((trade) => {
        const isActive = selectedTrades.includes(trade.id)
        const count = filteredByTrade.filter((a) => a.trades.includes(trade.id)).length
        return (
          <button
            key={trade.id}
            onClick={() => toggleTrade(trade.id)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all border",
              isActive
                ? "text-white border-transparent shadow-md"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-sm"
            )}
            style={isActive ? { backgroundColor: tradeColors[trade.id] } : undefined}
          >
            <span>{trade.emoji}</span>
            <span className="hidden sm:inline">{trade.name}</span>
            <span
              className={cn("text-xs px-1.5 py-0.5 rounded-full", isActive ? "bg-white/20" : "bg-gray-100")}
            >
              {count}
            </span>
          </button>
        )
      })}
      {selectedTrades.length > 0 && (
        <button
          onClick={() => setSelectedTrades([])}
          className="px-3 py-2 rounded-full text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all"
        >
          Tout afficher
        </button>
      )}
    </div>
  )

  const renderArtisanList = () => (
    <div className="space-y-2">
      {visibleArtisans.map((artisan) => {
        const trade = artisan.trades[0]
        const isSelected = selectedArtisan === artisan.id
        return (
          <div
            key={artisan.id}
            id={`artisan-${artisan.id}`}
            className={cn(
              "p-3 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md",
              isSelected ? "border-primary bg-primary-50" : "border-gray-200 bg-white hover:border-gray-300"
            )}
            onClick={() => handleArtisanClick(artisan)}
          >
            <div className="flex gap-3">
              {artisan.profilePhoto && (
                <img
                  src={artisan.profilePhoto}
                  alt={artisan.businessName}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1 truncate text-sm sm:text-base">
                  {artisan.businessName}
                </h4>
                <Badge variant={trade as any} className="mb-1.5">
                  {trade}
                </Badge>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPinIcon className="w-3 h-3" />
                  {artisan.city}
                </p>
                {artisan.rating && (
                  <p className="text-sm text-gray-600 mt-0.5">
                    ⭐ {artisan.rating.average}/5 ({artisan.rating.count})
                  </p>
                )}
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <Link href={`/artisan/${artisan.id}`} className="flex-1" onClick={(e) => e.stopPropagation()}>
                <Button size="sm" className="w-full gap-1" variant={isSelected ? "default" : "outline"}>
                  Voir la fiche
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
              {artisan.phone && (
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  onClick={(e: any) => e.stopPropagation()}
                >
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
          <p className="font-medium">Aucun artisan dans cette zone</p>
          <p className="text-sm mt-1">D&eacute;zoomez pour voir plus d&apos;artisans</p>
        </div>
      )}
    </div>
  )

  const renderMap = () => (
    <MapContainer center={centerPosition} zoom={6} scrollWheelZoom={true} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> France'
        url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        maxZoom={20}
      />
      <MapEventHandler onBoundsChange={handleBoundsChange} />
      <MapCenterController center={mapCenter} zoom={13} />

      {filteredByTrade.map((artisan) => {
        const position = getArtisanPosition(artisan)
        const trade = artisan.trades[0]
        const color = tradeColors[trade] || "#6B7280"
        const isSelected = selectedArtisan === artisan.id

        const icon = new DivIcon({
          html: `
            <div style="position:relative;width:40px;height:48px;display:flex;align-items:center;justify-content:center;cursor:pointer;${isSelected ? "transform:scale(1.2);" : ""}">
              <div style="position:absolute;top:0;left:50%;transform:translateX(-50%);background-color:${color};width:${isSelected ? "42px" : "36px"};height:${isSelected ? "42px" : "36px"};border-radius:50%;border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,${isSelected ? "0.4" : "0.25"});display:flex;align-items:center;justify-content:center;z-index:${isSelected ? "1000" : "2"};transition:all 0.2s;">
                <span style="color:white;font-size:${isSelected ? "16px" : "14px"};font-weight:700;">${trade[0].toUpperCase()}</span>
              </div>
              <div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:12px solid ${color};filter:drop-shadow(0 2px 4px rgba(0,0,0,0.15));z-index:1;"></div>
            </div>
          `,
          className: "custom-marker",
          iconSize: [40, 48],
          iconAnchor: [20, 48],
          popupAnchor: [0, -48],
        })

        return (
          <Marker key={artisan.id} position={position} icon={icon} eventHandlers={{ click: () => handleArtisanClick(artisan) }}>
            <Popup className="custom-popup" minWidth={250}>
              <div className="p-2">
                <div className="flex items-start gap-3">
                  {artisan.profilePhoto && (
                    <img src={artisan.profilePhoto} alt={artisan.businessName} className="w-16 h-16 rounded-lg object-cover" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-lg text-gray-900 mb-1">{artisan.businessName}</h3>
                    <Badge variant={trade as any} className="mb-2">{trade}</Badge>
                    <p className="text-sm text-gray-600 mb-1">📍 {artisan.city} ({artisan.postalCode})</p>
                    {artisan.rating && <p className="text-sm text-gray-600">⭐ {artisan.rating.average}/5 ({artisan.rating.count} avis)</p>}
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link href={`/artisan/${artisan.id}`} className="flex-1">
                    <Button size="sm" className="w-full gap-1">
                      Voir la fiche <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                  {artisan.phone && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={`tel:${artisan.phone}`}><Phone className="w-3 h-3" /></a>
                    </Button>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )

  return (
    <div className="space-y-3">
      {renderTradeFilters()}

      {/* Mobile toggle carte/liste */}
      <div className="flex lg:hidden gap-2">
        <button
          onClick={() => setMobileView("map")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all",
            mobileView === "map" ? "bg-primary text-white shadow-md" : "bg-white text-gray-600 border border-gray-200"
          )}
        >
          <MapIcon className="w-4 h-4" />
          Carte
        </button>
        <button
          onClick={() => setMobileView("list")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all",
            mobileView === "list" ? "bg-primary text-white shadow-md" : "bg-white text-gray-600 border border-gray-200"
          )}
        >
          <List className="w-4 h-4" />
          Liste ({visibleArtisans.length})
        </button>
      </div>

      {/* Desktop: liste + carte cote a cote */}
      <div className="hidden lg:flex gap-4 h-[calc(100vh-280px)]">
        <div className="w-96 flex-shrink-0 overflow-y-auto bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
            <h3 className="font-semibold text-gray-900">
              {visibleArtisans.length} artisan{visibleArtisans.length > 1 ? "s" : ""} dans cette zone
            </h3>
          </div>
          <div className="p-2">{renderArtisanList()}</div>
        </div>
        <div className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-gray-200">{renderMap()}</div>
      </div>

      {/* Mobile: carte OU liste */}
      <div className="lg:hidden">
        {mobileView === "map" ? (
          <div className="h-[calc(100vh-320px)] min-h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            {renderMap()}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 max-h-[calc(100vh-320px)] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
              <h3 className="font-semibold text-gray-900">
                {visibleArtisans.length} artisan{visibleArtisans.length > 1 ? "s" : ""} dans cette zone
              </h3>
            </div>
            <div className="p-2">{renderArtisanList()}</div>
          </div>
        )}
      </div>
    </div>
  )
}
