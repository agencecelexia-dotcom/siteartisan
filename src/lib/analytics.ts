import { getSupabase, isSupabaseConfigured } from "@/lib/supabase"

export type EventType =
  | "view"
  | "phone_click"
  | "email_click"
  | "website_click"
  | "quote_click"
  | "facebook_click"
  | "instagram_click"
  | "linkedin_click"

/**
 * Track an event for an artisan. Fire-and-forget, never blocks UI.
 */
export function trackEvent(artisanId: string, eventType: EventType) {
  if (!isSupabaseConfigured()) return

  const client = getSupabase()
  if (!client) return

  // Fire-and-forget — we don't await on purpose
  client
    .from("artisan_analytics")
    .insert({
      artisan_id: artisanId,
      event_type: eventType,
    })
    .then(({ error }) => {
      if (error) console.error("Analytics tracking error:", error)
    })
}

// ---- Admin: fetch analytics data ----

export interface ArtisanEventCount {
  artisan_id: string
  event_type: string
  count: number
}

export interface ArtisanAnalyticsRow {
  id: string
  artisan_id: string
  event_type: string
  created_at: string
}

/**
 * Fetch aggregated event counts grouped by artisan and event type.
 * Used by the admin analytics dashboard.
 */
export async function fetchAnalyticsSummary(
  since?: Date
): Promise<ArtisanEventCount[]> {
  const client = getSupabase()
  if (!client) return []

  try {
    let query = client.from("artisan_analytics").select("artisan_id, event_type")

    if (since) {
      query = query.gte("created_at", since.toISOString())
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching analytics:", error)
      return []
    }

    // Group and count client-side
    const counts: Record<string, ArtisanEventCount> = {}
    for (const row of data || []) {
      const key = `${row.artisan_id}:${row.event_type}`
      if (!counts[key]) {
        counts[key] = {
          artisan_id: row.artisan_id,
          event_type: row.event_type,
          count: 0,
        }
      }
      counts[key].count++
    }

    return Object.values(counts)
  } catch (error) {
    console.error("Unexpected analytics error:", error)
    return []
  }
}

/**
 * Fetch total event counts grouped by event type.
 */
export async function fetchTotalCounts(
  since?: Date
): Promise<Record<string, number>> {
  const summary = await fetchAnalyticsSummary(since)
  const totals: Record<string, number> = {}

  for (const row of summary) {
    totals[row.event_type] = (totals[row.event_type] || 0) + row.count
  }

  return totals
}
