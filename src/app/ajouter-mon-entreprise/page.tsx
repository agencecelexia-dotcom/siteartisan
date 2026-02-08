"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Send, Phone, Mail, MapPin, CheckCircle, AlertCircle, Loader2, Plus, Star, TrendingUp, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function AjouterEntreprisePage() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    sujet: "inscription",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("https://n8n.srv1241880.hstgr.cloud/webhook/68967526-a9f3-467d-95a5-ba3f9738d221", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Erreur lors de l'envoi")

      setSubmitted(true)
      setFormData({ nom: "", prenom: "", email: "", telephone: "", sujet: "inscription", message: "" })
    } catch (err) {
      setError("Une erreur est survenue. Veuillez r\u00e9essayer.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium mb-6">
              <Plus className="w-4 h-4" />
              100% gratuit
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Ajoutez votre entreprise gratuitement
            </h1>
            <p className="text-blue-100 mt-4 max-w-2xl mx-auto text-lg">
              Rejoignez l&apos;annuaire SiteArtisan et gagnez en visibilit&eacute; aupr&egrave;s de clients qualifi&eacute;s.
              Inscription gratuite, sans engagement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-12 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Star, title: "Visibilit\u00e9 accrue", description: "Votre fiche visible par des milliers de particuliers", color: "bg-amber-100 text-amber-600" },
              { icon: TrendingUp, title: "R\u00e9f\u00e9rencement SEO", description: "Votre entreprise index\u00e9e sur Google naturellement", color: "bg-green-100 text-green-600" },
              { icon: Shield, title: "Profil v\u00e9rifi\u00e9", description: "Un badge de confiance pour rassurer vos clients", color: "bg-blue-100 text-blue-600" },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm"
              >
                <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                  Comment &ccedil;a marche ?
                </h2>
                <div className="space-y-4">
                  {[
                    { step: "1", text: "Remplissez le formulaire ci-contre" },
                    { step: "2", text: "Notre \u00e9quipe v\u00e9rifie vos informations" },
                    { step: "3", text: "Votre fiche est publi\u00e9e gratuitement" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
                        {item.step}
                      </div>
                      <p className="text-gray-600 text-sm pt-1">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Phone, label: "T\u00e9l\u00e9phone", value: "01 23 45 67 89", href: "tel:0123456789" },
                  { icon: Mail, label: "Email", value: "contact@siteartisan.fr", href: "mailto:contact@siteartisan.fr" },
                  { icon: MapPin, label: "Zone", value: "France m\u00e9tropolitaine", href: "#" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.label}</div>
                      <div className="text-sm text-gray-500">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <Card className="shadow-md">
                <CardContent className="p-8">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                        Demande envoy&eacute;e !
                      </h3>
                      <p className="text-gray-500">
                        Merci ! Nous traiterons votre demande sous 48h et vous recontacterons par email.
                      </p>
                      <Button className="mt-6" onClick={() => setSubmitted(false)}>
                        Envoyer une autre demande
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="text-lg font-heading font-bold text-gray-900">
                        Inscrivez votre entreprise
                      </h3>

                      {error && (
                        <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                          <p className="text-sm text-red-800">{error}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nom <span className="text-red-500">*</span>
                          </label>
                          <Input name="nom" value={formData.nom} onChange={handleChange} placeholder="Votre nom" required disabled={loading} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Pr&eacute;nom <span className="text-red-500">*</span>
                          </label>
                          <Input name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Votre pr&eacute;nom" required disabled={loading} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="votre@email.fr" required disabled={loading} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          T&eacute;l&eacute;phone
                        </label>
                        <Input name="telephone" value={formData.telephone} onChange={handleChange} placeholder="06 12 34 56 78" disabled={loading} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Votre m&eacute;tier <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="sujet"
                          value={formData.sujet}
                          onChange={handleChange}
                          className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-50"
                          required
                          disabled={loading}
                        >
                          <option value="inscription">Inscription artisan</option>
                          <option value="plombier">Plombier</option>
                          <option value="pisciniste">Pisciniste</option>
                          <option value="paysagiste">Paysagiste</option>
                          <option value="electricien">&Eacute;lectricien</option>
                          <option value="demenageur">D&eacute;m&eacute;nageur</option>
                          <option value="autre">Autre m&eacute;tier</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Pr&eacute;sentez votre entreprise, votre zone d'intervention, vos sp&eacute;cialit&eacute;s..."
                          rows={5}
                          required
                          disabled={loading}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Envoyer ma demande d&apos;inscription
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
