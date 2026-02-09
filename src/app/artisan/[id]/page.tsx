import { artisans } from "@/data/artisans"
import ArtisanDetailClient from "./ArtisanDetailClient"

export function generateStaticParams() {
  return artisans.map((a) => ({ id: a.id }))
}

export default function ArtisanDetailPage({ params }: { params: { id: string } }) {
  return <ArtisanDetailClient id={params.id} />
}
