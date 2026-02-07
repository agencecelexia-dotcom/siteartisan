"use client"

import React from "react"
import { notFound } from "next/navigation"
import ArtisanForm from "@/components/admin/ArtisanForm"
import { getArtisanById } from "@/data/artisans"

export default function EditArtisanPage({ params }: { params: { id: string } }) {
  const artisan = getArtisanById(params.id)
  if (!artisan) return notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">&Eacute;diter : {artisan.businessName}</h1>
        <p className="text-gray-500 mt-1">Modifiez les informations de la fiche artisan</p>
      </div>
      <ArtisanForm artisan={artisan} />
    </div>
  )
}
