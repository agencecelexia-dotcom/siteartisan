"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TRADES } from "@/types/artisan"
import { getAllCities } from "@/data/artisans"

interface SearchBarProps {
  variant?: "hero" | "compact"
  defaultCity?: string
  defaultTrade?: string
}

export default function SearchBar({ variant = "hero", defaultCity = "", defaultTrade = "" }: SearchBarProps) {
  const router = useRouter()
  const [city, setCity] = useState(defaultCity)
  const [trade, setTrade] = useState(defaultTrade)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (city) params.set("city", city)
    if (trade && trade !== "all") params.set("trade", trade)
    router.push(`/artisans?${params.toString()}`)
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Ville..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
        <Select value={trade} onValueChange={setTrade}>
          <SelectTrigger className="w-40 h-10">
            <SelectValue placeholder="M&eacute;tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {TRADES.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.emoji} {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" size="icon" className="h-10 w-10 shrink-0">
          <Search className="w-4 h-4" />
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-3 flex flex-col sm:flex-row gap-3">
        {/* City */}
        <div className="relative flex-1">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Votre ville..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full h-13 pl-12 pr-4 text-base rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            list="cities"
          />
          <datalist id="cities">
            {getAllCities().map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>

        {/* Trade */}
        <div className="relative flex-1">
          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
          <Select value={trade} onValueChange={setTrade}>
            <SelectTrigger className="h-13 pl-12 text-base border-gray-200 rounded-xl">
              <SelectValue placeholder="Choisir un m&eacute;tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les m&eacute;tiers</SelectItem>
              {TRADES.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.emoji} {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button type="submit" size="xl" className="gap-2 rounded-xl sm:w-auto shrink-0 shadow-lg hover:shadow-xl">
          <Search className="w-5 h-5" />
          <span className="hidden sm:inline">Rechercher</span>
        </Button>
      </div>
    </form>
  )
}
