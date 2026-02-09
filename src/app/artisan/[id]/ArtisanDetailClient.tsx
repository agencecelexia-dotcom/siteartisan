"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Phone, Mail, Globe, MapPin, Calendar, Shield, ArrowLeft,
  ExternalLink, Award, Briefcase, Camera,
  ShieldCheck, CheckCircle2
} from "lucide-react"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import StarRating from "@/components/StarRating"
import { getArtisanById } from "@/data/artisans"
import { formatPhone } from "@/lib/utils"
import { tradeBadgeVariant, tradeLabel } from "@/lib/constants"
import { isSupabaseConfigured, fetchArtisanById } from "@/lib/supabase"
import type { Artisan } from "@/types/artisan"

export default function ArtisanDetailClient({ id }: { id: string }) {
  const [artisan, setArtisan] = useState<Artisan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      // Try mock data first (fast)
      const mock = getArtisanById(id)
      if (mock) {
        setArtisan(mock)
        setLoading(false)
        return
      }

      // If not in mock data, try Supabase (for new artisans added via admin)
      if (isSupabaseConfigured()) {
        try {
          const data = await fetchArtisanById(id)
          if (data) {
            setArtisan(data)
          }
        } catch (error) {
          console.error("Error fetching artisan:", error)
        }
      }
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/30 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!artisan) {
    return (
      <div className="min-h-screen bg-gray-50/30 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-heading font-bold text-gray-400">Artisan non trouv&eacute;</h1>
        <Link href="/artisans">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour &agrave; l&apos;annuaire
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Cover Image */}
      <div className="relative h-40 sm:h-56 md:h-80 overflow-hidden bg-gray-200">
        <img
          src={artisan.coverPhoto}
          alt={`Photo de couverture de ${artisan.businessName} - ${artisan.trades.map(t => tradeLabel[t]).join(', ')} \u00e0 ${artisan.city}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-6">
          <Link href="/artisans">
            <Button variant="ghost" className="bg-white/90 hover:bg-white text-gray-700 gap-2 shadow-sm backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white shrink-0">
                      <img
                        src={artisan.profilePhoto}
                        alt={`Logo de ${artisan.businessName}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start gap-3">
                        <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">
                          {artisan.businessName}
                        </h1>
                        {artisan.isCertified && (
                          <Badge variant="certified" className="gap-1 mt-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Certifi&eacute;
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {artisan.trades.map((trade) => (
                          <Badge key={trade} variant={tradeBadgeVariant[trade]}>
                            {tradeLabel[trade]}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-3">
                        <StarRating
                          rating={artisan.rating.average}
                          count={artisan.rating.count}
                          size="md"
                        />
                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          {artisan.city} ({artisan.postalCode})
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          Depuis {artisan.foundedYear}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Presentation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Pr&eacute;sentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{artisan.fullDescription}</p>

                  {artisan.specialties && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Sp&eacute;cialit&eacute;s</h4>
                      <p className="text-sm text-gray-500">{artisan.specialties}</p>
                    </div>
                  )}

                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Zone d&apos;intervention</h4>
                    <div className="flex flex-wrap gap-2">
                      {artisan.serviceArea.map((area) => (
                        <Badge key={area} variant="secondary" className="text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          {area}
                        </Badge>
                      ))}
                      {artisan.serviceRadius && (
                        <Badge variant="outline" className="text-xs">
                          Rayon de {artisan.serviceRadius} km
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Project Types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Types de projets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {artisan.projectTypes.map((type) => (
                      <Badge key={type} variant="outline" className="px-3 py-1.5">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Portfolio */}
            {artisan.portfolio.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="w-5 h-5 text-primary" />
                      R&eacute;alisations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {artisan.portfolio.map((item, i) => (
                        <div
                          key={i}
                          className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.description}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <p className="text-white text-sm font-medium">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Certifications &amp; Garanties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {artisan.certifications.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {artisan.certifications.map((cert) => (
                          <Badge key={cert} variant="certified" className="gap-1">
                            <Award className="w-3 h-3" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {artisan.insurances.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Assurances</h4>
                      <div className="flex flex-wrap gap-2">
                        {artisan.insurances.map((ins) => (
                          <Badge key={ins} variant="secondary" className="gap-1">
                            <Shield className="w-3 h-3" />
                            {ins}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {artisan.labels.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Labels</h4>
                      <div className="flex flex-wrap gap-2">
                        {artisan.labels.map((label) => (
                          <Badge key={label} className="gap-1 bg-amber-100 text-amber-700 border-transparent">
                            <CheckCircle2 className="w-3 h-3" />
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {artisan.guarantees && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Garanties</h4>
                      <p className="text-sm text-gray-600">{artisan.guarantees}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Contacter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a
                    href={`tel:${artisan.phone}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-primary text-white hover:bg-primary-700 transition-colors shadow-md"
                  >
                    <Phone className="w-5 h-5" />
                    <div>
                      <div className="text-sm font-medium">Appeler</div>
                      <div className="text-sm opacity-90">{formatPhone(artisan.phone)}</div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${artisan.email}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <div className="text-sm text-gray-500 truncate">{artisan.email}</div>
                    </div>
                  </a>

                  {artisan.website && (
                    <a
                      href={artisan.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Globe className="w-5 h-5 text-gray-500" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">Site web</div>
                        <div className="text-sm text-gray-500 truncate">{artisan.website}</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 shrink-0" />
                    </a>
                  )}

                  <Separator />

                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      {artisan.address && <div>{artisan.address}</div>}
                      <div>{artisan.postalCode} {artisan.city}</div>
                      <div className="text-gray-400">{artisan.department}</div>
                    </div>
                  </div>

                  {artisan.socials && (
                    <div className="flex gap-3 pt-2">
                      {artisan.socials.facebook && (
                        <a
                          href={artisan.socials.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition-all"
                        >
                          <Facebook className="w-4 h-4" />
                        </a>
                      )}
                      {artisan.socials.instagram && (
                        <a
                          href={artisan.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-pink-100 hover:text-pink-600 flex items-center justify-center transition-all"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {artisan.socials.linkedin && (
                        <a
                          href={artisan.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center transition-all"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}

                  <Separator />

                  <Button className="w-full gap-2 bg-secondary hover:bg-secondary-600 shadow-md" size="lg">
                    <Mail className="w-4 h-4" />
                    Demander un devis
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
