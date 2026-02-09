"use client"

import React, { Suspense, useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { SlidersHorizontal, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ArtisanCard from "@/components/ArtisanCard"
import SearchBar from "@/components/SearchBar"
import { artisans as mockArtisans } from "@/data/artisans"
import { TRADES, Artisan } from "@/types/artisan"
import { cn } from "@/lib/utils"
import { isSupabaseConfigured, fetchActiveArtisans } from "@/lib/supabase"
import Breadcrumbs from "@/components/Breadcrumbs"

export default function ArtisansClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50/30 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <ArtisansContent />
    </Suspense>
  )
}

function ArtisansContent() {
  const searchParams = useSearchParams()
  const initialTrade = searchParams.get("trade") || ""
  const initialCity = searchParams.get("city") || ""

  const [allArtisans, setAllArtisans] = useState<Artisan[]>(
    mockArtisans.filter((a) => a.status === "active")
  )
  const [loading, setLoading] = useState(true)
  const [selectedTrades, setSelectedTrades] = useState<string[]>(
    initialTrade ? [initialTrade] : []
  )
  const [cityFilter, setCityFilter] = useState(initialCity)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState<"rating" | "name" | "recent">("rating")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const load = async () => {
      if (isSupabaseConfigured()) {
        try {
          const data = await fetchActiveArtisans()
          if (data && data.length > 0) {
            setAllArtisans(data)
          }
        } catch (error) {
          console.error("Error fetching artisans:", error)
        }
      }
      setLoading(false)
    }
    load()
  }, [])

  const filteredArtisans = useMemo(() => {
    let result = [...allArtisans]

    if (selectedTrades.length > 0) {
      result = result.filter((a) =>
        a.trades.some((t) => selectedTrades.includes(t))
      )
    }

    if (cityFilter) {
      const query = cityFilter.toLowerCase()
      result = result.filter(
        (a) =>
          a.city.toLowerCase().includes(query) ||
          a.department.toLowerCase().includes(query) ||
          a.serviceArea.some((s) => s.toLowerCase().includes(query))
      )
    }

    if (minRating > 0) {
      result = result.filter((a) => a.rating.average >= minRating)
    }

    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating.average - a.rating.average)
        break
      case "name":
        result.sort((a, b) => a.businessName.localeCompare(b.businessName))
        break
      case "recent":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    return result
  }, [allArtisans, selectedTrades, cityFilter, minRating, sortBy])

  const toggleTrade = (tradeId: string) => {
    setSelectedTrades((prev) =>
      prev.includes(tradeId)
        ? prev.filter((t) => t !== tradeId)
        : [...prev, tradeId]
    )
  }

  const clearFilters = () => {
    setSelectedTrades([])
    setCityFilter("")
    setMinRating(0)
    setSortBy("rating")
  }

  const hasActiveFilters = selectedTrades.length > 0 || cityFilter || minRating > 0

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[
          { label: "Accueil", href: "/" },
          { label: "Tous les artisans" },
        ]} />
      </div>

      {/* Search header */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar variant="compact" defaultCity={initialCity} defaultTrade={initialTrade} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtres
              {hasActiveFilters && (
                <span className="ml-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  {selectedTrades.length + (cityFilter ? 1 : 0) + (minRating > 0 ? 1 : 0)}
                </span>
              )}
            </Button>
          </div>

          {/* Sidebar filters */}
          <aside
            className={cn(
              "lg:w-72 shrink-0",
              showFilters ? "block" : "hidden lg:block"
            )}
          >
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-bold text-gray-900">Filtres</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-primary hover:text-primary-700 font-medium"
                  >
                    R&eacute;initialiser
                  </button>
                )}
              </div>

              {/* Trade filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">M&eacute;tier</h3>
                <div className="space-y-2">
                  {TRADES.map((trade) => {
                    const count = allArtisans.filter(
                      (a) => a.trades.includes(trade.id)
                    ).length
                    return (
                      <label
                        key={trade.id}
                        className="flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTrades.includes(trade.id)}
                          onChange={() => toggleTrade(trade.id)}
                          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm flex-1">
                          {trade.emoji} {trade.name}
                        </span>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                          {count}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* City filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Ville / D&eacute;partement</h3>
                <Input
                  placeholder="Ex: Lyon, Marseille..."
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="h-10"
                />
              </div>

              {/* Rating filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Note minimum</h3>
                <div className="flex gap-2">
                  {[0, 3, 3.5, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                        minRating === rating
                          ? "bg-primary text-white shadow-sm"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      )}
                    >
                      {rating === 0 ? "Tous" : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Results header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-heading font-bold text-gray-900">
                  {loading ? "Chargement..." : `${filteredArtisans.length} artisan${filteredArtisans.length > 1 ? "s" : ""} trouv\u00e9${filteredArtisans.length > 1 ? "s" : ""}`}
                </h1>
                {hasActiveFilters && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTrades.map((t) => {
                      const trade = TRADES.find((tr) => tr.id === t)
                      return trade ? (
                        <button
                          key={t}
                          onClick={() => toggleTrade(t)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-50 text-primary text-xs font-medium hover:bg-primary-100 transition-colors"
                        >
                          {trade.emoji} {trade.name}
                          <X className="w-3 h-3" />
                        </button>
                      ) : null
                    })}
                    {cityFilter && (
                      <button
                        onClick={() => setCityFilter("")}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors"
                      >
                        {cityFilter}
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Trier :</span>
                {[
                  { value: "rating" as const, label: "Note" },
                  { value: "name" as const, label: "Nom" },
                  { value: "recent" as const, label: "R\u00e9cent" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                      sortBy === option.value
                        ? "bg-primary text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredArtisans.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredArtisans.map((artisan, index) => (
                  <ArtisanCard key={artisan.id} artisan={artisan} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold text-gray-400">
                  Aucun artisan trouv&eacute;
                </h3>
                <p className="text-gray-400 mt-2">
                  Essayez de modifier vos filtres de recherche
                </p>
                <Button variant="outline" onClick={clearFilters} className="mt-6">
                  R&eacute;initialiser les filtres
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
