/**
 * Migration helper to convert mock artisans to Supabase format
 * Run this in the browser console to migrate all artisans at once
 */

import { supabase } from "./supabase"
import { artisans as mockArtisans } from "@/data/artisans"
import type { Artisan as MockArtisan } from "@/types/artisan"

export async function migrateArtisansToSupabase() {
  try {
    console.log(`Starting migration of ${mockArtisans.length} artisans...`)

    const artisansToInsert = mockArtisans.map((artisan: MockArtisan) => ({
      name: artisan.businessName.split(" ")[0] || "Artisan",
      prenom: artisan.businessName.includes(" ")
        ? artisan.businessName.split(" ").slice(1).join(" ")
        : artisan.businessName,
      email: artisan.email,
      telephone: artisan.phone,
      entreprise: artisan.businessName,
      metier: artisan.trades[0] || "artisan",
      specialite: artisan.specialties || "",
      adresse: artisan.address,
      code_postal: artisan.postalCode,
      ville: artisan.city,
      zone_intervention: artisan.serviceArea?.join(", ") || artisan.city,
      site_web: artisan.website || "",
      services: artisan.projectTypes || [],
      certifications: artisan.certifications || [],
      assurances: artisan.insurances || [],
      photos: [artisan.profilePhoto, artisan.coverPhoto, ...(artisan.portfolio?.map((p) => p.imageUrl) || [])].filter(Boolean),
      avis_count: artisan.rating.count || 0,
      note_moyenne: artisan.rating.average || 0,
      verifie: artisan.isCertified || false,
      actif: artisan.status === "active",
      date_creation: artisan.createdAt ? new Date(artisan.createdAt).toISOString() : new Date().toISOString(),
      date_modification: artisan.updatedAt ? new Date(artisan.updatedAt).toISOString() : new Date().toISOString(),
    }))

    // Insert in batches of 5 to avoid overwhelming the API
    const batchSize = 5
    for (let i = 0; i < artisansToInsert.length; i += batchSize) {
      const batch = artisansToInsert.slice(i, i + batchSize)

      const { data, error } = await supabase.from("artisans").insert(batch).select()

      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error)
      } else {
        console.log(`✓ Batch ${i / batchSize + 1}: ${data?.length || 0} artisans inserted`)
      }

      // Small delay between batches
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    console.log("✅ Migration complete!")
  } catch (error) {
    console.error("Migration failed:", error)
  }
}

// Check if migration is complete
export async function checkMigrationStatus() {
  try {
    const { count, error } = await supabase.from("artisans").select("*", { count: "exact" })

    if (error) {
      console.error("Error checking migration status:", error)
      return
    }

    console.log(`Database contains ${count} artisans`)
    return count
  } catch (error) {
    console.error("Error:", error)
  }
}
