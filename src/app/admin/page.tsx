"use client"

import React from "react"
import Link from "next/link"
import { Users, MapPin, Star, TrendingUp, Plus, ArrowRight, Wrench, Waves, TreePine, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { artisans, getStats } from "@/data/artisans"
import { TRADES, Trade } from "@/types/artisan"

const tradeIcons: Record<Trade, React.ReactNode> = {
  plombier: <Wrench className="w-5 h-5" />,
  pisciniste: <Waves className="w-5 h-5" />,
  paysagiste: <TreePine className="w-5 h-5" />,
  electricien: <Zap className="w-5 h-5" />,
}

const tradeBadgeVariant: Record<Trade, "plombier" | "pisciniste" | "paysagiste" | "electricien"> = {
  plombier: "plombier",
  pisciniste: "pisciniste",
  paysagiste: "paysagiste",
  electricien: "electricien",
}

export default function AdminDashboard() {
  const stats = getStats()
  const activeArtisans = artisans.filter((a) => a.status === "active")
  const recentArtisans = [...activeArtisans].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5)

  const tradeStats = TRADES.map((trade) => ({
    ...trade,
    count: activeArtisans.filter((a) => a.trades.includes(trade.id)).length,
  }))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Vue d&apos;ensemble de votre annuaire</p>
        </div>
        <Link href="/admin/artisans/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Ajouter un artisan
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalArtisans}</div>
                <div className="text-sm text-gray-500">Artisans actifs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalCities}</div>
                <div className="text-sm text-gray-500">Villes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.averageRating}/5</div>
                <div className="text-sm text-gray-500">Note moyenne</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{artisans.length}</div>
                <div className="text-sm text-gray-500">Total fiches</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Trade */}
        <Card>
          <CardHeader>
            <CardTitle>Par m&eacute;tier</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tradeStats.map((trade) => (
              <div key={trade.id} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                  {tradeIcons[trade.id]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{trade.name}</span>
                    <span className="text-sm text-gray-500">{trade.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${(trade.count / Math.max(activeArtisans.length, 1)) * 100}%`,
                        backgroundColor: trade.colorHex,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Artisans */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Derniers ajout&eacute;s</CardTitle>
            <Link href="/admin/artisans">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                Voir tout <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentArtisans.map((artisan) => (
              <Link
                key={artisan.id}
                href={`/admin/artisans/${artisan.id}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <img
                  src={artisan.profilePhoto}
                  alt={artisan.businessName}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {artisan.businessName}
                  </div>
                  <div className="text-xs text-gray-500">{artisan.city}</div>
                </div>
                <div className="flex gap-1">
                  {artisan.trades.map((t) => (
                    <Badge key={t} variant={tradeBadgeVariant[t]} className="text-[10px] px-2 py-0.5">
                      {t}
                    </Badge>
                  ))}
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
