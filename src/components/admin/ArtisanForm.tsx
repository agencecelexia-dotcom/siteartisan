"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Save, Eye, ArrowLeft,
  User, Phone,
  FileText, Briefcase, Award, Tag
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Artisan, Trade, TRADES } from "@/types/artisan"
import { cn } from "@/lib/utils"

interface ArtisanFormProps {
  artisan?: Artisan
}

export default function ArtisanForm({ artisan }: ArtisanFormProps) {
  const isEditing = !!artisan

  const [formData, setFormData] = useState({
    businessName: artisan?.businessName || "",
    trades: artisan?.trades || [] as Trade[],
    phone: artisan?.phone || "",
    email: artisan?.email || "",
    website: artisan?.website || "",
    address: artisan?.address || "",
    city: artisan?.city || "",
    postalCode: artisan?.postalCode || "",
    department: artisan?.department || "",
    facebook: artisan?.socials?.facebook || "",
    instagram: artisan?.socials?.instagram || "",
    linkedin: artisan?.socials?.linkedin || "",
    shortDescription: artisan?.shortDescription || "",
    fullDescription: artisan?.fullDescription || "",
    foundedYear: artisan?.foundedYear || new Date().getFullYear(),
    serviceArea: artisan?.serviceArea?.join(", ") || "",
    serviceRadius: artisan?.serviceRadius || 30,
    projectTypes: artisan?.projectTypes?.join(", ") || "",
    specialties: artisan?.specialties || "",
    certifications: artisan?.certifications?.join(", ") || "",
    insurances: artisan?.insurances?.join(", ") || "",
    guarantees: artisan?.guarantees || "",
    labels: artisan?.labels?.join(", ") || "",
    ratingAverage: artisan?.rating?.average || 5,
    ratingCount: artisan?.rating?.count || 0,
    isCertified: artisan?.isCertified || false,
    status: artisan?.status || "active" as "active" | "inactive",
    metaTitle: artisan?.seo?.metaTitle || "",
    metaDescription: artisan?.seo?.metaDescription || "",
    profilePhotoUrl: artisan?.profilePhoto || "",
    coverPhotoUrl: artisan?.coverPhoto || "",
  })

  const [saved, setSaved] = useState(false)

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleTrade = (trade: Trade) => {
    setFormData((prev) => ({
      ...prev,
      trades: prev.trades.includes(trade)
        ? prev.trades.filter((t) => t !== trade)
        : [...prev.trades, trade],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to a database
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm sticky top-0 z-30">
        <Link href="/admin/artisans" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-4 h-4" />
          Retour &agrave; la liste
        </Link>
        <div className="flex items-center gap-3">
          {artisan && (
            <Link href={`/artisan/${artisan.id}`}>
              <Button type="button" variant="outline" size="sm" className="gap-2">
                <Eye className="w-4 h-4" />
                Pr&eacute;visualiser
              </Button>
            </Link>
          )}
          <Button type="submit" size="sm" className="gap-2">
            <Save className="w-4 h-4" />
            {saved ? "Sauvegard\u00e9 !" : "Sauvegarder"}
          </Button>
        </div>
      </div>

      {/* General Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5 text-primary" />
            Informations g&eacute;n&eacute;rales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nom de l&apos;entreprise <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.businessName}
                onChange={(e) => updateField("businessName", e.target.value)}
                placeholder="Ex: Dupont Plomberie"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                M&eacute;tier(s) <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {TRADES.map((trade) => (
                  <button
                    key={trade.id}
                    type="button"
                    onClick={() => toggleTrade(trade.id)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all",
                      formData.trades.includes(trade.id)
                        ? "border-primary bg-primary-50 text-primary"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    )}
                  >
                    {trade.emoji} {trade.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Ann&eacute;e de cr&eacute;ation
              </label>
              <Input
                type="number"
                value={formData.foundedYear}
                onChange={(e) => updateField("foundedYear", parseInt(e.target.value))}
                min={1900}
                max={new Date().getFullYear()}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Statut</label>
                <Switch
                  checked={formData.status === "active"}
                  onCheckedChange={(checked) => updateField("status", checked ? "active" : "inactive")}
                />
                <span className={cn(
                  "text-sm font-medium",
                  formData.status === "active" ? "text-green-600" : "text-gray-400"
                )}>
                  {formData.status === "active" ? "Actif" : "Inactif"}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                URL Photo de profil
              </label>
              <Input
                value={formData.profilePhotoUrl}
                onChange={(e) => updateField("profilePhotoUrl", e.target.value)}
                placeholder="https://..."
              />
              {formData.profilePhotoUrl && (
                <img src={formData.profilePhotoUrl} alt="Aperçu de la photo de profil" loading="lazy" className="mt-2 w-20 h-20 rounded-xl object-cover" />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                URL Photo de couverture
              </label>
              <Input
                value={formData.coverPhotoUrl}
                onChange={(e) => updateField("coverPhotoUrl", e.target.value)}
                placeholder="https://..."
              />
              {formData.coverPhotoUrl && (
                <img src={formData.coverPhotoUrl} alt="Aperçu de la photo de couverture" loading="lazy" className="mt-2 w-full h-24 rounded-xl object-cover" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Phone className="w-5 h-5 text-primary" />
            Coordonn&eacute;es
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                T&eacute;l&eacute;phone <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="06 12 34 56 78"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="contact@entreprise.fr"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Site web</label>
              <Input
                value={formData.website}
                onChange={(e) => updateField("website", e.target.value)}
                placeholder="https://www.entreprise.fr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Adresse</label>
              <Input
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="12 rue de la R\u00e9publique"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Ville <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.city}
                onChange={(e) => updateField("city", e.target.value)}
                placeholder="Lyon"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Code postal <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.postalCode}
                onChange={(e) => updateField("postalCode", e.target.value)}
                placeholder="69001"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                D&eacute;partement <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.department}
                onChange={(e) => updateField("department", e.target.value)}
                placeholder="Rh\u00f4ne"
                required
              />
            </div>
          </div>

          <Separator />

          <h4 className="text-sm font-semibold text-gray-700">R&eacute;seaux sociaux</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Facebook</label>
              <Input
                value={formData.facebook}
                onChange={(e) => updateField("facebook", e.target.value)}
                placeholder="URL Facebook"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Instagram</label>
              <Input
                value={formData.instagram}
                onChange={(e) => updateField("instagram", e.target.value)}
                placeholder="URL Instagram"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">LinkedIn</label>
              <Input
                value={formData.linkedin}
                onChange={(e) => updateField("linkedin", e.target.value)}
                placeholder="URL LinkedIn"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Presentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-primary" />
            Pr&eacute;sentation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description courte <span className="text-xs text-gray-400">(200 caract&egrave;res max, affich&eacute;e dans les cards)</span>
            </label>
            <Textarea
              value={formData.shortDescription}
              onChange={(e) => updateField("shortDescription", e.target.value)}
              maxLength={200}
              rows={2}
              placeholder="Description courte de l'entreprise..."
            />
            <p className="text-xs text-gray-400 mt-1">{formData.shortDescription.length}/200</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description compl&egrave;te
            </label>
            <Textarea
              value={formData.fullDescription}
              onChange={(e) => updateField("fullDescription", e.target.value)}
              rows={6}
              placeholder="Description d\u00e9taill\u00e9e de l'entreprise, services, historique..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Zone d&apos;intervention <span className="text-xs text-gray-400">(villes, s&eacute;par&eacute;es par des virgules)</span>
              </label>
              <Input
                value={formData.serviceArea}
                onChange={(e) => updateField("serviceArea", e.target.value)}
                placeholder="Lyon, Villeurbanne, Caluire..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Rayon d&apos;intervention (km)
              </label>
              <Input
                type="number"
                value={formData.serviceRadius}
                onChange={(e) => updateField("serviceRadius", parseInt(e.target.value))}
                min={0}
                max={200}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects & Expertise */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Briefcase className="w-5 h-5 text-primary" />
            Projets &amp; Expertises
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Types de projets <span className="text-xs text-gray-400">(s&eacute;par&eacute;s par des virgules)</span>
            </label>
            <Textarea
              value={formData.projectTypes}
              onChange={(e) => updateField("projectTypes", e.target.value)}
              rows={2}
              placeholder="R\u00e9novation salle de bain, Installation chauffage, D\u00e9pannage urgence..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Sp&eacute;cialit&eacute;s
            </label>
            <Input
              value={formData.specialties}
              onChange={(e) => updateField("specialties", e.target.value)}
              placeholder="R\u00e9novation haut de gamme, plomberie \u00e9cologique..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="w-5 h-5 text-primary" />
            Certifications &amp; Qualit&eacute;
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Certifications <span className="text-xs text-gray-400">(s&eacute;par&eacute;es par des virgules)</span>
              </label>
              <Input
                value={formData.certifications}
                onChange={(e) => updateField("certifications", e.target.value)}
                placeholder="Qualibat, RGE..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Assurances <span className="text-xs text-gray-400">(s&eacute;par&eacute;es par des virgules)</span>
              </label>
              <Input
                value={formData.insurances}
                onChange={(e) => updateField("insurances", e.target.value)}
                placeholder="RC Pro, D\u00e9cennale..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Labels <span className="text-xs text-gray-400">(s&eacute;par&eacute;s par des virgules)</span>
              </label>
              <Input
                value={formData.labels}
                onChange={(e) => updateField("labels", e.target.value)}
                placeholder="RGE, Qualibat..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Garanties
              </label>
              <Input
                value={formData.guarantees}
                onChange={(e) => updateField("guarantees", e.target.value)}
                placeholder="Garantie d\u00e9cennale, SAV..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
            <Switch
              checked={formData.isCertified}
              onCheckedChange={(checked) => updateField("isCertified", checked)}
            />
            <div>
              <div className="text-sm font-medium text-emerald-800">Badge &quot;Artisan certifi&eacute;&quot;</div>
              <div className="text-xs text-emerald-600">Affiche un badge de certification sur la fiche</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Tag className="w-5 h-5 text-primary" />
            Note &amp; SEO
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Note moyenne</label>
              <Input
                type="number"
                value={formData.ratingAverage}
                onChange={(e) => updateField("ratingAverage", parseFloat(e.target.value))}
                min={0}
                max={5}
                step={0.1}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre d&apos;avis</label>
              <Input
                type="number"
                value={formData.ratingCount}
                onChange={(e) => updateField("ratingCount", parseInt(e.target.value))}
                min={0}
              />
            </div>
          </div>

          <Separator />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Meta Title <span className="text-xs text-gray-400">(pour le SEO)</span>
            </label>
            <Input
              value={formData.metaTitle}
              onChange={(e) => updateField("metaTitle", e.target.value)}
              placeholder={`${formData.businessName} - ${formData.trades.join(", ")} \u00e0 ${formData.city}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Meta Description <span className="text-xs text-gray-400">(pour le SEO)</span>
            </label>
            <Textarea
              value={formData.metaDescription}
              onChange={(e) => updateField("metaDescription", e.target.value)}
              rows={2}
              placeholder={formData.shortDescription || "Description pour les moteurs de recherche..."}
              maxLength={160}
            />
            <p className="text-xs text-gray-400 mt-1">{formData.metaDescription.length}/160</p>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end pb-8">
        <Link href="/admin/artisans">
          <Button type="button" variant="outline">
            Annuler
          </Button>
        </Link>
        <Button type="submit" className="gap-2">
          <Save className="w-4 h-4" />
          {saved ? "Sauvegard\u00e9 !" : isEditing ? "Mettre \u00e0 jour" : "Cr\u00e9er l'artisan"}
        </Button>
      </div>
    </form>
  )
}
