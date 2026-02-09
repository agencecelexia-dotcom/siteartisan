"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import EditArtisanClient from "../[id]/EditArtisanClient"

function EditArtisanContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  if (!id) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Artisan non trouv&eacute;</p>
      </div>
    )
  }

  return <EditArtisanClient id={id} />
}

export default function AdminEditArtisanPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <EditArtisanContent />
    </Suspense>
  )
}
