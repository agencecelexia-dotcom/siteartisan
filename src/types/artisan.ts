export type Trade = "plombier" | "pisciniste" | "paysagiste" | "electricien"

export interface PortfolioImage {
  imageUrl: string
  description: string
}

export interface Artisan {
  id: string
  createdAt: string
  updatedAt: string
  status: "active" | "inactive"

  businessName: string
  trades: Trade[]
  profilePhoto: string
  coverPhoto: string
  foundedYear: number

  phone: string
  email: string
  website?: string
  address?: string
  city: string
  postalCode: string
  department: string
  socials?: {
    facebook?: string
    instagram?: string
    linkedin?: string
  }

  shortDescription: string
  fullDescription: string
  serviceArea: string[]
  serviceRadius?: number

  projectTypes: string[]
  specialties?: string
  portfolio: PortfolioImage[]

  certifications: string[]
  insurances: string[]
  guarantees?: string
  labels: string[]

  rating: {
    average: number
    count: number
  }

  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  isCertified: boolean
}

export interface TradeInfo {
  id: Trade
  name: string
  icon: string
  emoji: string
  color: string
  colorHex: string
  description: string
}

export const TRADES: TradeInfo[] = [
  {
    id: "plombier",
    name: "Plombier",
    icon: "Wrench",
    emoji: "\u{1F527}",
    color: "bg-trade-plombier",
    colorHex: "#3B82F6",
    description: "Installation, r\u00e9paration et entretien de vos syst\u00e8mes de plomberie",
  },
  {
    id: "pisciniste",
    name: "Pisciniste",
    icon: "Waves",
    emoji: "\u{1F3CA}",
    color: "bg-trade-pisciniste",
    colorHex: "#06B6D4",
    description: "Construction, r\u00e9novation et entretien de piscines",
  },
  {
    id: "paysagiste",
    name: "Paysagiste",
    icon: "TreePine",
    emoji: "\u{1F333}",
    color: "bg-trade-paysagiste",
    colorHex: "#22C55E",
    description: "Am\u00e9nagement et entretien de vos espaces ext\u00e9rieurs",
  },
  {
    id: "electricien",
    name: "\u00c9lectricien",
    icon: "Zap",
    emoji: "\u26A1",
    color: "bg-trade-electricien",
    colorHex: "#F59E0B",
    description: "Installation et mise aux normes de vos \u00e9quipements \u00e9lectriques",
  },
]
