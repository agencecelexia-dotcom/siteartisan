import { artisans, getArtisanById } from "@/data/artisans"
import EditArtisanClient from "./EditArtisanClient"

export function generateStaticParams() {
  return artisans.map((a) => ({ id: a.id }))
}

export default function EditArtisanPage({ params }: { params: { id: string } }) {
  const artisan = getArtisanById(params.id)
  if (!artisan) return <div>Artisan non trouvé</div>

  return <EditArtisanClient artisan={artisan} />
}
