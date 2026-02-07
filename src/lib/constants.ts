import { Trade } from "@/types/artisan"

export const tradeBadgeVariant: Record<Trade, "plombier" | "pisciniste" | "paysagiste" | "electricien" | "demenageur"> = {
  plombier: "plombier",
  pisciniste: "pisciniste",
  paysagiste: "paysagiste",
  electricien: "electricien",
  demenageur: "demenageur",
}

export const tradeLabel: Record<Trade, string> = {
  plombier: "Plombier",
  pisciniste: "Pisciniste",
  paysagiste: "Paysagiste",
  electricien: "Électricien",
  demenageur: "Déménageur",
}

export const tradeIcons = {
  plombier: "Wrench",
  pisciniste: "Waves",
  paysagiste: "TreePine",
  electricien: "Zap",
  demenageur: "Truck",
} as const
