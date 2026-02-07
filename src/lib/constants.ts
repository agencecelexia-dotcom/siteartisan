import { Trade } from "@/types/artisan"

export const tradeBadgeVariant: Record<Trade, "plombier" | "pisciniste" | "paysagiste" | "electricien"> = {
  plombier: "plombier",
  pisciniste: "pisciniste",
  paysagiste: "paysagiste",
  electricien: "electricien",
}

export const tradeLabel: Record<Trade, string> = {
  plombier: "Plombier",
  pisciniste: "Pisciniste",
  paysagiste: "Paysagiste",
  electricien: "Électricien",
}

export const tradeIcons = {
  plombier: "Wrench",
  pisciniste: "Waves",
  paysagiste: "TreePine",
  electricien: "Zap",
} as const
