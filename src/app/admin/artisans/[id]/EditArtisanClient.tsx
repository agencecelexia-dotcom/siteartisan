"use client"

import React from "react"
import ArtisanForm from "@/components/admin/ArtisanForm"
import type { Artisan } from "@/types/artisan"

export default function EditArtisanClient({ artisan }: { artisan: Artisan }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">Éditer : {artisan.businessName}</h1>
        <p className="text-gray-500 mt-1">Modifiez les informations de la fiche artisan</p>
      </div>
      <ArtisanForm artisan={artisan} />
    </div>
  )
}
