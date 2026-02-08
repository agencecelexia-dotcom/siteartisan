import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// Client for browser (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client for server (uses service role key)
export const supabaseServer = createClient(supabaseUrl, serviceRoleKey)

// Type for Artisan data from Supabase
export type Artisan = {
  id: string
  name: string
  prenom: string
  email: string
  telephone: string
  entreprise: string
  metier: string
  specialite?: string
  telephone_professionnel?: string
  email_professionnel?: string
  adresse?: string
  code_postal?: string
  ville?: string
  zone_intervention?: string
  site_web?: string
  services?: string[]
  certifications?: string[]
  assurances?: string[]
  photos?: string[]
  avis_count?: number
  note_moyenne?: number
  date_creation?: string
  date_modification?: string
  verifie?: boolean
  actif?: boolean
}

// Helper to check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey)
}

// Helper for authentication
export async function authenticateAdmin(password: string): Promise<boolean> {
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  return password === adminPassword
}

// Fetch all artisans from Supabase
export async function fetchArtisans(): Promise<Artisan[]> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning empty array")
    return []
  }

  try {
    const { data, error } = await supabase
      .from("artisans")
      .select("*")
      .eq("actif", true)
      .order("date_creation", { ascending: false })

    if (error) {
      console.error("Error fetching artisans:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Unexpected error fetching artisans:", error)
    return []
  }
}

// Fetch single artisan by ID
export async function fetchArtisanById(id: string): Promise<Artisan | null> {
  if (!isSupabaseConfigured()) {
    return null
  }

  try {
    const { data, error } = await supabase
      .from("artisans")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching artisan:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Unexpected error fetching artisan:", error)
    return null
  }
}

// Create new artisan
export async function createArtisan(artisan: Omit<Artisan, "id" | "date_creation" | "date_modification">): Promise<Artisan | null> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured")
    return null
  }

  try {
    const { data, error } = await supabase
      .from("artisans")
      .insert([
        {
          ...artisan,
          date_creation: new Date().toISOString(),
          date_modification: new Date().toISOString(),
          actif: true,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating artisan:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Unexpected error creating artisan:", error)
    return null
  }
}

// Update artisan
export async function updateArtisan(id: string, updates: Partial<Artisan>): Promise<Artisan | null> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured")
    return null
  }

  try {
    const { data, error } = await supabase
      .from("artisans")
      .update({
        ...updates,
        date_modification: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating artisan:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Unexpected error updating artisan:", error)
    return null
  }
}

// Soft delete artisan (set actif to false)
export async function deleteArtisan(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured")
    return false
  }

  try {
    const { error } = await supabase
      .from("artisans")
      .update({
        actif: false,
        date_modification: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error("Error deleting artisan:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Unexpected error deleting artisan:", error)
    return false
  }
}
