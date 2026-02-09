import { artisans } from "@/data/artisans"
import EditArtisanClient from "./EditArtisanClient"

export function generateStaticParams() {
  return artisans.map((a) => ({ id: a.id }))
}

export default function EditArtisanPage({ params }: { params: { id: string } }) {
  return <EditArtisanClient id={params.id} />
}
