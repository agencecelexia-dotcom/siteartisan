"use client"

import EditArtisanClient from "./EditArtisanClient"

export default function EditArtisanPage({ params }: { params: { id: string } }) {
  return <EditArtisanClient id={params.id} />
}
