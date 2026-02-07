"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, ArrowRight, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import StarRating from "@/components/StarRating"
import { Artisan, Trade } from "@/types/artisan"
import { formatPhone } from "@/lib/utils"

interface ArtisanCardProps {
  artisan: Artisan
  index?: number
}

const tradeBadgeVariant: Record<Trade, "plombier" | "pisciniste" | "paysagiste" | "electricien"> = {
  plombier: "plombier",
  pisciniste: "pisciniste",
  paysagiste: "paysagiste",
  electricien: "electricien",
}

const tradeLabel: Record<Trade, string> = {
  plombier: "Plombier",
  pisciniste: "Pisciniste",
  paysagiste: "Paysagiste",
  electricien: "\u00c9lectricien",
}

export default function ArtisanCard({ artisan, index = 0 }: ArtisanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/artisan/${artisan.id}`}>
        <Card className="group overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-gray-100">
            <img
              src={artisan.coverPhoto || artisan.profilePhoto}
              alt={artisan.businessName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
              {artisan.trades.map((trade) => (
                <Badge key={trade} variant={tradeBadgeVariant[trade]} className="shadow-sm">
                  {tradeLabel[trade]}
                </Badge>
              ))}
            </div>

            {artisan.isCertified && (
              <div className="absolute top-3 right-3">
                <Badge variant="certified" className="gap-1 shadow-sm">
                  <ShieldCheck className="w-3 h-3" />
                  Certifi&eacute;
                </Badge>
              </div>
            )}

            {/* Profile photo overlay */}
            <div className="absolute -bottom-6 left-4">
              <div className="w-14 h-14 rounded-xl border-3 border-white shadow-lg overflow-hidden bg-white">
                <img
                  src={artisan.profilePhoto}
                  alt={artisan.businessName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 pt-8">
            <h3 className="font-heading font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">
              {artisan.businessName}
            </h3>

            <div className="flex items-center gap-1.5 mt-1 text-gray-500">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-sm">{artisan.city} ({artisan.postalCode})</span>
            </div>

            <StarRating
              rating={artisan.rating.average}
              count={artisan.rating.count}
              size="sm"
              className="mt-2"
            />

            <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-relaxed">
              {artisan.shortDescription}
            </p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                <Phone className="w-3.5 h-3.5" />
                {formatPhone(artisan.phone)}
              </div>
              <span className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Voir la fiche
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
