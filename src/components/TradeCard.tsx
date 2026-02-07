"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ChevronDown, Wrench, Waves, TreePine, Zap, Truck, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import StarRating from "@/components/StarRating"
import { TradeInfo, Artisan, Trade } from "@/types/artisan"
import { cn } from "@/lib/utils"

interface TradeCardProps {
  trade: TradeInfo
  artisans: Artisan[]
  index: number
}

const tradeIcons: Record<string, React.ReactNode> = {
  Wrench: <Wrench className="w-7 h-7" />,
  Waves: <Waves className="w-7 h-7" />,
  TreePine: <TreePine className="w-7 h-7" />,
  Zap: <Zap className="w-7 h-7" />,
  Truck: <Truck className="w-7 h-7" />,
}

const tradeBg: Record<Trade, string> = {
  plombier: "from-blue-500 to-blue-600",
  pisciniste: "from-cyan-500 to-cyan-600",
  paysagiste: "from-green-500 to-green-600",
  electricien: "from-amber-500 to-amber-600",
  demenageur: "from-purple-500 to-purple-600",
}

const tradeLightBg: Record<Trade, string> = {
  plombier: "bg-blue-50 hover:bg-blue-100",
  pisciniste: "bg-cyan-50 hover:bg-cyan-100",
  paysagiste: "bg-green-50 hover:bg-green-100",
  electricien: "bg-amber-50 hover:bg-amber-100",
  demenageur: "bg-purple-50 hover:bg-purple-100",
}

export default function TradeCard({ trade, artisans, index }: TradeCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        {/* Header - Clickable */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-5 p-6 text-left group"
        >
          {/* Icon */}
          <div className={cn(
            "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform",
            tradeBg[trade.id]
          )}>
            {tradeIcons[trade.icon]}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-heading font-bold text-gray-900">
              {trade.emoji} {trade.name}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">{trade.description}</p>
          </div>

          {/* Count + Arrow */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-600">
              {artisans.length}
            </span>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-gray-400 transition-transform duration-300",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </button>

        {/* Expandable Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 space-y-3">
                <div className="h-px bg-gray-100 mb-4" />
                {artisans.length > 0 ? (
                  artisans.map((artisan) => (
                    <Link
                      key={artisan.id}
                      href={`/artisan/${artisan.id}`}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group/item",
                        tradeLightBg[trade.id]
                      )}
                    >
                      <img
                        src={artisan.profilePhoto}
                        alt={`Logo de ${artisan.businessName}`}
                        loading="lazy"
                        className="w-12 h-12 rounded-xl object-cover shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {artisan.businessName}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {artisan.city} ({artisan.postalCode})
                        </p>
                        <StarRating
                          rating={artisan.rating.average}
                          count={artisan.rating.count}
                          size="sm"
                          className="mt-1"
                        />
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover/item:translate-x-1 transition-transform" />
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 text-center py-4">
                    Aucun artisan dans cette cat&eacute;gorie pour le moment.
                  </p>
                )}

                <Link
                  href={`/artisans?trade=${trade.id}`}
                  className="flex items-center justify-center gap-2 mt-4 py-3 text-sm font-medium text-primary hover:text-primary-700 transition-colors"
                >
                  Voir tous les {trade.name.toLowerCase()}s
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
