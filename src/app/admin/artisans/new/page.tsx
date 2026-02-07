"use client"

import React from "react"
import ArtisanForm from "@/components/admin/ArtisanForm"

export default function NewArtisanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">Ajouter un artisan</h1>
        <p className="text-gray-500 mt-1">Remplissez les informations pour cr&eacute;er une nouvelle fiche artisan</p>
      </div>
      <ArtisanForm />
    </div>
  )
}
