"use client"

import React, { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ArtisanForm from "@/components/admin/ArtisanForm"
import { getArtisanById } from "@/data/artisans"
import { isSupabaseConfigured, fetchArtisanById } from "@/lib/supabase"
import type { Artisan } from "@/types/artisan"

export default function EditArtisanClient({ id }: { id: string }) {
  const [artisan, setArtisan] = useState<Artisan | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFromSupabase, setIsFromSupabase] = useState(false)

  useEffect(() => {
    const load = async () => {
      // Try mock data first
      const mock = getArtisanById(id)
      if (mock) {
        setArtisan(mock)
        setLoading(false)
        return
      }

      // Try Supabase
      if (isSupabaseConfigured()) {
        try {
          const data = await fetchArtisanById(id)
          if (data) {
            setArtisan(data)
            setIsFromSupabase(true)
          }
        } catch (error) {
          console.error("Error fetching artisan:", error)
        }
      }
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!artisan) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-heading font-bold text-gray-400 mb-4">Artisan non trouv&eacute;</h2>
        <Link href="/admin/artisans">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour &agrave; la liste
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">{`\u00c9diter : ${artisan.businessName}`}</h1>
        <p className="text-gray-500 mt-1">Modifiez les informations de la fiche artisan</p>
      </div>
      <ArtisanForm artisan={artisan} supabaseId={isFromSupabase ? artisan.id : undefined} />
    </div>
  )
}
