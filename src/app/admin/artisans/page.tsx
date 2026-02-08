"use client"

import React, { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Search, Plus, Eye, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import StarRating from "@/components/StarRating"
import { artisans as mockArtisans } from "@/data/artisans"
import { Trade, TRADES } from "@/types/artisan"
import { cn } from "@/lib/utils"
import { tradeBadgeVariant, tradeLabel } from "@/lib/constants"
import { isSupabaseConfigured, fetchArtisans } from "@/lib/supabase"

export default function AdminArtisansPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterTrade, setFilterTrade] = useState<string>("")
  const [filterStatus, setFilterStatus] = useState<string>("")
  const [supabaseConfigured, setSupabaseConfigured] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [artisans, setArtisans] = useState(mockArtisans)

  useEffect(() => {
    const loadArtisans = async () => {
      setIsLoading(true)
      const configured = isSupabaseConfigured()
      setSupabaseConfigured(configured)

      if (configured) {
        try {
          const data = await fetchArtisans()
          if (data && data.length > 0) {
            // Convert Supabase data to mock artisan format
            setArtisans(data as any)
          } else {
            // Use mock data if no Supabase data found
            setArtisans(mockArtisans)
          }
        } catch (error) {
          console.error("Error fetching artisans from Supabase:", error)
          setArtisans(mockArtisans)
        }
      } else {
        setArtisans(mockArtisans)
      }
      setIsLoading(false)
    }

    loadArtisans()
  }, [])

  const filteredArtisans = useMemo(() => {
    return artisans.filter((a) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        if (
          !a.businessName.toLowerCase().includes(q) &&
          !a.city.toLowerCase().includes(q) &&
          !a.email.toLowerCase().includes(q)
        ) {
          return false
        }
      }
      if (filterTrade && !a.trades.includes(filterTrade as Trade)) return false
      if (filterStatus && a.status !== filterStatus) return false
      return true
    })
  }, [searchQuery, filterTrade, filterStatus])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      {!supabaseConfigured && (
        <Card className="bg-amber-50 border-amber-200 p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-amber-900">Supabase non configuré</p>
            <p className="text-sm text-amber-800 mt-1">
              Actuellement en mode démo avec données locales. Pour activer Supabase:
              <ol className="list-decimal list-inside mt-2 ml-1 space-y-1">
                <li>Lisez le guide <code className="bg-white px-1 rounded text-xs">SUPABASE_SETUP.md</code></li>
                <li>Créez un projet Supabase</li>
                <li>Mettez à jour <code className="bg-white px-1 rounded text-xs">.env.local</code></li>
                <li>Redémarrez le serveur</li>
              </ol>
            </p>
          </div>
        </Card>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Gestion des artisans</h1>
          <p className="text-gray-500 mt-1">
            {artisans.length} artisans au total
            {!supabaseConfigured && " (mode démo)"}
          </p>
        </div>
        <Link href="/admin/artisans/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Ajouter un artisan
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Rechercher par nom, ville ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={filterTrade}
            onChange={(e) => setFilterTrade(e.target.value)}
            className="h-11 px-4 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            <option value="">Tous les m&eacute;tiers</option>
            {TRADES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-11 px-4 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            <option value="">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Artisan</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">M&eacute;tier</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Ville</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Note</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredArtisans.map((artisan) => (
                <tr key={artisan.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={artisan.profilePhoto}
                        alt={`Logo de ${artisan.businessName}`}
                        loading="lazy"
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <div className="font-medium text-sm text-gray-900 truncate">{artisan.businessName}</div>
                        <div className="text-xs text-gray-500 truncate">{artisan.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <div className="flex gap-1">
                      {artisan.trades.map((t) => (
                        <Badge key={t} variant={tradeBadgeVariant[t]} className="text-[10px]">
                          {tradeLabel[t]}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    <span className="text-sm text-gray-600">{artisan.city} ({artisan.postalCode})</span>
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    <StarRating rating={artisan.rating.average} count={artisan.rating.count} size="sm" />
                  </td>
                  <td className="py-3 px-4">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
                      artisan.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    )}>
                      {artisan.status === "active" ? (
                        <><CheckCircle className="w-3 h-3" /> Actif</>
                      ) : (
                        <><XCircle className="w-3 h-3" /> Inactif</>
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/artisan/${artisan.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/artisans/${artisan.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredArtisans.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">Aucun artisan trouv&eacute;</p>
            <p className="text-gray-400 text-sm mt-1">Essayez de modifier vos filtres</p>
          </div>
        )}
      </Card>
    </div>
  )
}
