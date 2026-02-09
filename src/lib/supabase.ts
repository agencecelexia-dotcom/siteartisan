import { createClient, SupabaseClient } from "@supabase/supabase-js"
import type { Artisan, Trade } from "@/types/artisan"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Lazy-initialized client
let _supabase: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) return null
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
  return _supabase
}

export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey)
}

// ---- DB Row type (matches Supabase columns) ----
export interface ArtisanRow {
  id: string
  business_name: string
  trades: string[]
  profile_photo: string | null
  cover_photo: string | null
  founded_year: number | null
  phone: string | null
  email: string
  website: string | null
  address: string | null
  city: string | null
  postal_code: string | null
  department: string | null
  facebook: string | null
  instagram: string | null
  linkedin: string | null
  short_description: string | null
  full_description: string | null
  service_area: string[]
  service_radius: number | null
  project_types: string[]
  specialties: string | null
  certifications: string[]
  insurances: string[]
  guarantees: string | null
  labels: string[]
  rating_average: number
  rating_count: number
  is_certified: boolean
  status: string
  meta_title: string | null
  meta_description: string | null
  portfolio: Array<{ imageUrl: string; description: string }>
  created_at: string
  updated_at: string
}

// ---- Conversion: DB Row -> Frontend Artisan ----
export function rowToArtisan(row: ArtisanRow): Artisan {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    status: (row.status === "active" ? "active" : "inactive") as "active" | "inactive",
    businessName: row.business_name,
    trades: (row.trades || []) as Trade[],
    profilePhoto: row.profile_photo || "",
    coverPhoto: row.cover_photo || "",
    foundedYear: row.founded_year || new Date().getFullYear(),
    phone: row.phone || "",
    email: row.email,
    website: row.website || undefined,
    address: row.address || undefined,
    city: row.city || "",
    postalCode: row.postal_code || "",
    department: row.department || "",
    socials: {
      facebook: row.facebook || undefined,
      instagram: row.instagram || undefined,
      linkedin: row.linkedin || undefined,
    },
    shortDescription: row.short_description || "",
    fullDescription: row.full_description || "",
    serviceArea: row.service_area || [],
    serviceRadius: row.service_radius || 30,
    projectTypes: row.project_types || [],
    specialties: row.specialties || undefined,
    portfolio: row.portfolio || [],
    certifications: row.certifications || [],
    insurances: row.insurances || [],
    guarantees: row.guarantees || undefined,
    labels: row.labels || [],
    rating: {
      average: Number(row.rating_average) || 0,
      count: row.rating_count || 0,
    },
    seo: {
      metaTitle: row.meta_title || undefined,
      metaDescription: row.meta_description || undefined,
    },
    isCertified: row.is_certified || false,
  }
}

// ---- Form data type (what the form collects) ----
export interface ArtisanFormData {
  businessName: string
  trades: Trade[]
  phone: string
  email: string
  website: string
  address: string
  city: string
  postalCode: string
  department: string
  facebook: string
  instagram: string
  linkedin: string
  shortDescription: string
  fullDescription: string
  foundedYear: number
  serviceArea: string
  serviceRadius: number
  projectTypes: string
  specialties: string
  certifications: string
  insurances: string
  guarantees: string
  labels: string
  ratingAverage: number
  ratingCount: number
  isCertified: boolean
  status: "active" | "inactive"
  metaTitle: string
  metaDescription: string
  profilePhotoUrl: string
  coverPhotoUrl: string
}

function formDataToRow(data: ArtisanFormData) {
  return {
    business_name: data.businessName,
    trades: data.trades,
    profile_photo: data.profilePhotoUrl || null,
    cover_photo: data.coverPhotoUrl || null,
    founded_year: data.foundedYear || null,
    phone: data.phone || null,
    email: data.email,
    website: data.website || null,
    address: data.address || null,
    city: data.city || null,
    postal_code: data.postalCode || null,
    department: data.department || null,
    facebook: data.facebook || null,
    instagram: data.instagram || null,
    linkedin: data.linkedin || null,
    short_description: data.shortDescription || null,
    full_description: data.fullDescription || null,
    service_area: data.serviceArea ? data.serviceArea.split(",").map((s) => s.trim()).filter(Boolean) : [],
    service_radius: data.serviceRadius || 30,
    project_types: data.projectTypes ? data.projectTypes.split(",").map((s) => s.trim()).filter(Boolean) : [],
    specialties: data.specialties || null,
    certifications: data.certifications ? data.certifications.split(",").map((s) => s.trim()).filter(Boolean) : [],
    insurances: data.insurances ? data.insurances.split(",").map((s) => s.trim()).filter(Boolean) : [],
    guarantees: data.guarantees || null,
    labels: data.labels ? data.labels.split(",").map((s) => s.trim()).filter(Boolean) : [],
    rating_average: data.ratingAverage || 0,
    rating_count: data.ratingCount || 0,
    is_certified: data.isCertified,
    status: data.status,
    meta_title: data.metaTitle || null,
    meta_description: data.metaDescription || null,
    updated_at: new Date().toISOString(),
  }
}

// ---- CRUD Functions ----

export async function fetchAllArtisans(): Promise<Artisan[]> {
  const client = getSupabase()
  if (!client) return []

  try {
    const { data, error } = await client
      .from("artisans")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching artisans:", error)
      return []
    }

    return (data || []).map(rowToArtisan)
  } catch (error) {
    console.error("Unexpected error:", error)
    return []
  }
}

export async function fetchActiveArtisans(): Promise<Artisan[]> {
  const client = getSupabase()
  if (!client) return []

  try {
    const { data, error } = await client
      .from("artisans")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching active artisans:", error)
      return []
    }

    return (data || []).map(rowToArtisan)
  } catch (error) {
    console.error("Unexpected error:", error)
    return []
  }
}

export async function fetchArtisanById(id: string): Promise<Artisan | null> {
  const client = getSupabase()
  if (!client) return null

  try {
    const { data, error } = await client
      .from("artisans")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching artisan:", error)
      return null
    }

    return data ? rowToArtisan(data) : null
  } catch (error) {
    console.error("Unexpected error:", error)
    return null
  }
}

export async function createArtisan(formData: ArtisanFormData): Promise<Artisan | null> {
  const client = getSupabase()
  if (!client) throw new Error("Supabase non configur\u00e9")

  const row = formDataToRow(formData)
  const { data, error } = await client
    .from("artisans")
    .insert([row])
    .select()
    .single()

  if (error) {
    console.error("Error creating artisan:", error)
    throw new Error(error.message)
  }

  return data ? rowToArtisan(data) : null
}

export async function updateArtisan(id: string, formData: ArtisanFormData): Promise<Artisan | null> {
  const client = getSupabase()
  if (!client) throw new Error("Supabase non configur\u00e9")

  const row = formDataToRow(formData)
  const { data, error } = await client
    .from("artisans")
    .update(row)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating artisan:", error)
    throw new Error(error.message)
  }

  return data ? rowToArtisan(data) : null
}

export async function deleteArtisan(id: string): Promise<boolean> {
  const client = getSupabase()
  if (!client) return false

  const { error } = await client
    .from("artisans")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting artisan:", error)
    return false
  }

  return true
}
