/**
 * Migration helper - imports mock artisans into Supabase (new schema)
 */

import { getSupabase } from "./supabase"
import { artisans as mockArtisans } from "@/data/artisans"
import type { Artisan as MockArtisan } from "@/types/artisan"

export async function migrateArtisansToSupabase() {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error("Supabase non configur\u00e9. V\u00e9rifiez vos variables d'environnement.")
  }

  console.log(`Migration de ${mockArtisans.length} artisans...`)

  const rows = mockArtisans.map((a: MockArtisan) => ({
    business_name: a.businessName,
    trades: a.trades,
    profile_photo: a.profilePhoto || null,
    cover_photo: a.coverPhoto || null,
    founded_year: a.foundedYear || null,
    phone: a.phone || null,
    email: a.email,
    website: a.website || null,
    address: a.address || null,
    city: a.city || null,
    postal_code: a.postalCode || null,
    department: a.department || null,
    facebook: a.socials?.facebook || null,
    instagram: a.socials?.instagram || null,
    linkedin: a.socials?.linkedin || null,
    short_description: a.shortDescription || null,
    full_description: a.fullDescription || null,
    service_area: a.serviceArea || [],
    service_radius: a.serviceRadius || 30,
    project_types: a.projectTypes || [],
    specialties: a.specialties || null,
    certifications: a.certifications || [],
    insurances: a.insurances || [],
    guarantees: a.guarantees || null,
    labels: a.labels || [],
    rating_average: a.rating?.average || 0,
    rating_count: a.rating?.count || 0,
    is_certified: a.isCertified || false,
    status: a.status || "active",
    meta_title: a.seo?.metaTitle || null,
    meta_description: a.seo?.metaDescription || null,
    portfolio: a.portfolio || [],
    created_at: a.createdAt ? new Date(a.createdAt).toISOString() : new Date().toISOString(),
    updated_at: a.updatedAt ? new Date(a.updatedAt).toISOString() : new Date().toISOString(),
  }))

  let inserted = 0
  const batchSize = 5
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize)
    const { data, error } = await supabase.from("artisans").insert(batch).select()

    if (error) {
      console.error(`Erreur batch ${i / batchSize + 1}:`, error.message)
    } else {
      inserted += data?.length || 0
    }

    await new Promise((r) => setTimeout(r, 100))
  }

  console.log(`Migration termin\u00e9e: ${inserted}/${mockArtisans.length} artisans import\u00e9s`)
  return inserted
}

export async function checkMigrationStatus(): Promise<number> {
  const supabase = getSupabase()
  if (!supabase) return 0

  const { count, error } = await supabase
    .from("artisans")
    .select("*", { count: "exact", head: true })

  if (error) {
    console.error("Erreur:", error.message)
    return 0
  }

  return count || 0
}
