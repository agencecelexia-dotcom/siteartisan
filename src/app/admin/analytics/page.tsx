"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
  Eye, MousePointerClick, Phone, Mail, Globe, MessageSquare,
  TrendingUp, ArrowRight, Calendar, Loader2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { isSupabaseConfigured, fetchAllArtisans } from "@/lib/supabase"
import { fetchAnalyticsSummary, type ArtisanEventCount } from "@/lib/analytics"
import { artisans as mockArtisans } from "@/data/artisans"
import { getArtisanUrl } from "@/lib/utils"
import type { Artisan } from "@/types/artisan"

type Period = "7d" | "30d" | "all"

function getPeriodDate(period: Period): Date | undefined {
  if (period === "all") return undefined
  const now = new Date()
  if (period === "7d") now.setDate(now.getDate() - 7)
  if (period === "30d") now.setDate(now.getDate() - 30)
  return now
}

const eventLabels: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  view: { label: "Vues", icon: <Eye className="w-4 h-4" />, color: "bg-blue-100 text-blue-600" },
  phone_click: { label: "Clics tel", icon: <Phone className="w-4 h-4" />, color: "bg-green-100 text-green-600" },
  email_click: { label: "Clics email", icon: <Mail className="w-4 h-4" />, color: "bg-amber-100 text-amber-600" },
  website_click: { label: "Clics site", icon: <Globe className="w-4 h-4" />, color: "bg-purple-100 text-purple-600" },
  quote_click: { label: "Demandes devis", icon: <MessageSquare className="w-4 h-4" />, color: "bg-red-100 text-red-600" },
  facebook_click: { label: "Clics Facebook", icon: <MousePointerClick className="w-4 h-4" />, color: "bg-blue-100 text-blue-700" },
  instagram_click: { label: "Clics Instagram", icon: <MousePointerClick className="w-4 h-4" />, color: "bg-pink-100 text-pink-600" },
  linkedin_click: { label: "Clics LinkedIn", icon: <MousePointerClick className="w-4 h-4" />, color: "bg-sky-100 text-sky-600" },
}

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<Period>("30d")
  const [summary, setSummary] = useState<ArtisanEventCount[]>([])
  const [artisans, setArtisans] = useState<Artisan[]>([])
  const [loading, setLoading] = useState(true)
  const [configured, setConfigured] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const ok = isSupabaseConfigured()
      setConfigured(ok)
      if (!ok) {
        setLoading(false)
        return
      }

      const [analyticsData, artisansData] = await Promise.all([
        fetchAnalyticsSummary(getPeriodDate(period)),
        fetchAllArtisans(),
      ])

      setSummary(analyticsData)
      // Merge mock artisans + Supabase artisans so all IDs resolve to a name
      const allArtisans = [...mockArtisans]
      for (const a of artisansData) {
        if (!allArtisans.find((m) => m.id === a.id)) {
          allArtisans.push(a)
        }
      }
      setArtisans(allArtisans)
      setLoading(false)
    }
    load()
  }, [period])

  // Build totals
  const totals: Record<string, number> = {}
  for (const row of summary) {
    totals[row.event_type] = (totals[row.event_type] || 0) + row.count
  }
  const totalViews = totals["view"] || 0
  const totalClicks =
    (totals["phone_click"] || 0) +
    (totals["email_click"] || 0) +
    (totals["website_click"] || 0) +
    (totals["quote_click"] || 0)

  // Build per-artisan stats
  const artisanMap = new Map(artisans.map((a) => [a.id, a]))
  const perArtisan: Record<string, Record<string, number>> = {}
  for (const row of summary) {
    if (!perArtisan[row.artisan_id]) perArtisan[row.artisan_id] = {}
    perArtisan[row.artisan_id][row.event_type] = row.count
  }

  // Sort artisans by total views desc
  const sortedArtisans = Object.entries(perArtisan)
    .map(([id, events]) => ({
      id,
      artisan: artisanMap.get(id),
      views: events["view"] || 0,
      phoneClicks: events["phone_click"] || 0,
      emailClicks: events["email_click"] || 0,
      websiteClicks: events["website_click"] || 0,
      quoteClicks: events["quote_click"] || 0,
      totalClicks:
        (events["phone_click"] || 0) +
        (events["email_click"] || 0) +
        (events["website_click"] || 0) +
        (events["quote_click"] || 0),
    }))
    .sort((a, b) => b.views - a.views)

  if (!configured) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Analytics</h1>
        <Card className="bg-amber-50 border-amber-200 p-6">
          <p className="text-amber-800">
            <strong>Supabase non configur&eacute;</strong> &mdash; Les analytics n&eacute;cessitent une connexion Supabase active.
            Ajoutez vos variables d&apos;environnement pour activer cette fonctionnalit&eacute;.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">Statistiques de visites et d&apos;interactions</p>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-1">
          {([
            { value: "7d" as Period, label: "7 jours" },
            { value: "30d" as Period, label: "30 jours" },
            { value: "all" as Period, label: "Tout" },
          ]).map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                period === p.value
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Global Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{totalViews}</div>
                    <div className="text-sm text-gray-500">Vues totales</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
                    <MousePointerClick className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{totalClicks}</div>
                    <div className="text-sm text-gray-500">Clics contact</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0"}%
                    </div>
                    <div className="text-sm text-gray-500">Taux de conversion</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{sortedArtisans.length}</div>
                    <div className="text-sm text-gray-500">Artisans vus</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Event Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Par type d&apos;interaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.entries(eventLabels).map(([key, info]) => (
                  <div
                    key={key}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
                  >
                    <div className={`w-9 h-9 rounded-lg ${info.color} flex items-center justify-center`}>
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{totals[key] || 0}</div>
                      <div className="text-xs text-gray-500">{info.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Per-Artisan Table */}
          <Card>
            <CardHeader>
              <CardTitle>D&eacute;tail par artisan</CardTitle>
            </CardHeader>
            <CardContent>
              {sortedArtisans.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  Aucune donn&eacute;e pour cette p&eacute;riode. Les statistiques appara&icirc;tront d&egrave;s que des visiteurs consulteront les fiches artisans.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-2 font-medium text-gray-500">Artisan</th>
                        <th className="text-center py-3 px-2 font-medium text-gray-500">
                          <Eye className="w-4 h-4 mx-auto" />
                        </th>
                        <th className="text-center py-3 px-2 font-medium text-gray-500">
                          <Phone className="w-4 h-4 mx-auto" />
                        </th>
                        <th className="text-center py-3 px-2 font-medium text-gray-500">
                          <Mail className="w-4 h-4 mx-auto" />
                        </th>
                        <th className="text-center py-3 px-2 font-medium text-gray-500">
                          <Globe className="w-4 h-4 mx-auto" />
                        </th>
                        <th className="text-center py-3 px-2 font-medium text-gray-500">
                          <MessageSquare className="w-4 h-4 mx-auto" />
                        </th>
                        <th className="text-center py-3 px-2 font-medium text-gray-500">Conv.</th>
                        <th className="text-right py-3 px-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedArtisans.map((row) => {
                        const conversion = row.views > 0
                          ? ((row.totalClicks / row.views) * 100).toFixed(1)
                          : "0"

                        return (
                          <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-3">
                                {row.artisan?.profilePhoto ? (
                                  <img
                                    src={row.artisan.profilePhoto}
                                    alt=""
                                    className="w-8 h-8 rounded-lg object-cover"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                    ?
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <div className="font-medium text-gray-900 truncate max-w-[180px]">
                                    {row.artisan?.businessName || `Artisan #${row.id}`}
                                  </div>
                                  {row.artisan?.city && (
                                    <div className="text-xs text-gray-400">{row.artisan.city}</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="text-center py-3 px-2 font-semibold text-gray-900">{row.views}</td>
                            <td className="text-center py-3 px-2 text-gray-600">{row.phoneClicks || "-"}</td>
                            <td className="text-center py-3 px-2 text-gray-600">{row.emailClicks || "-"}</td>
                            <td className="text-center py-3 px-2 text-gray-600">{row.websiteClicks || "-"}</td>
                            <td className="text-center py-3 px-2 text-gray-600">{row.quoteClicks || "-"}</td>
                            <td className="text-center py-3 px-2">
                              <Badge variant={Number(conversion) > 5 ? "certified" : "secondary"} className="text-xs">
                                {conversion}%
                              </Badge>
                            </td>
                            <td className="text-right py-3 px-2">
                              <Link href={getArtisanUrl(row.id)}>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <ArrowRight className="w-4 h-4" />
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
