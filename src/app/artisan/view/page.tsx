"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import ArtisanDetailClient from "../[id]/ArtisanDetailClient"

function ArtisanViewContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50/30 flex items-center justify-center">
        <p className="text-gray-400">Artisan non trouv&eacute;</p>
      </div>
    )
  }

  return <ArtisanDetailClient id={id} />
}

export default function ArtisanViewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50/30 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ArtisanViewContent />
    </Suspense>
  )
}
