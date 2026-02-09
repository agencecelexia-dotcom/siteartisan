import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "")
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")
  }
  return phone
}

export function getTradeColor(trade: string): string {
  const colors: Record<string, string> = {
    plombier: "bg-trade-plombier",
    pisciniste: "bg-trade-pisciniste",
    paysagiste: "bg-trade-paysagiste",
    electricien: "bg-trade-electricien",
  }
  return colors[trade.toLowerCase()] || "bg-primary"
}

export function getTradeColorHex(trade: string): string {
  const colors: Record<string, string> = {
    plombier: "#3B82F6",
    pisciniste: "#06B6D4",
    paysagiste: "#22C55E",
    electricien: "#F59E0B",
  }
  return colors[trade.toLowerCase()] || "#2563EB"
}

export function getTradeIcon(trade: string): string {
  const icons: Record<string, string> = {
    plombier: "Wrench",
    pisciniste: "Waves",
    paysagiste: "TreePine",
    electricien: "Zap",
  }
  return icons[trade.toLowerCase()] || "Hammer"
}

export function getTradeEmoji(trade: string): string {
  const emojis: Record<string, string> = {
    plombier: "\u{1F527}",
    pisciniste: "\u{1F3CA}",
    paysagiste: "\u{1F333}",
    electricien: "\u26A1",
  }
  return emojis[trade.toLowerCase()] || "\u{1F528}"
}

/** Check if an ID is a Supabase UUID (not a mock artisan slug) */
function isUUID(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

/** Get the correct URL for an artisan detail page */
export function getArtisanUrl(id: string): string {
  return isUUID(id) ? `/artisan/view/?id=${id}` : `/artisan/${id}`
}

/** Get the correct URL for admin artisan edit page */
export function getAdminEditUrl(id: string): string {
  return isUUID(id) ? `/admin/artisans/edit/?id=${id}` : `/admin/artisans/${id}`
}

export function generateStars(rating: number): string[] {
  const stars: string[] = []
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push("full")
    } else if (i - rating < 1 && i - rating > 0) {
      stars.push("half")
    } else {
      stars.push("empty")
    }
  }
  return stars
}
