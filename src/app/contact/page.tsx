"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Send, Phone, Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    sujet: "",
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message")
      }

      setSubmitted(true)
      setFormData({ nom: "", prenom: "", email: "", telephone: "", sujet: "", message: "" })
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold">Contactez-nous</h1>
            <p className="text-blue-100 mt-4 max-w-2xl mx-auto text-lg">
              Une question ? Vous souhaitez r&eacute;f&eacute;rencer votre entreprise ? N&apos;h&eacute;sitez pas &agrave; nous contacter.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                  Nos coordonn&eacute;es
                </h2>
                <p className="text-gray-500 leading-relaxed">
                  Notre &eacute;quipe est disponible du lundi au vendredi, de 9h &agrave; 18h.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Phone, label: "T\u00e9l\u00e9phone", value: "01 23 45 67 89", href: "tel:0123456789" },
                  { icon: Mail, label: "Email", value: "contact@siteartisan.fr", href: "mailto:contact@siteartisan.fr" },
                  { icon: MapPin, label: "Adresse", value: "France m\u00e9tropolitaine", href: "#" },
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

            {/* Contact Form */}
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
                        Message envoy&eacute; !
                      </h3>
                      <p className="text-gray-500">
                        Merci pour votre message. Nous reviendrons vers vous dans les plus brefs d&eacute;lais.
                      </p>
                      <Button
                        className="mt-6"
                        onClick={() => setSubmitted(false)}
                      >
                        Envoyer un autre message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="text-lg font-heading font-bold text-gray-900">
                        Envoyez-nous un message
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
                          <Input
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            placeholder="Votre nom"
                            required
                            disabled={loading}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Pr&eacute;nom <span className="text-red-500">*</span>
                          </label>
                          <Input
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            placeholder="Votre pr\u00e9nom"
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="votre@email.fr"
                          required
                          disabled={loading}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          T&eacute;l&eacute;phone
                        </label>
                        <Input
                          name="telephone"
                          value={formData.telephone}
                          onChange={handleChange}
                          placeholder="06 12 34 56 78"
                          disabled={loading}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Sujet <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="sujet"
                          value={formData.sujet}
                          onChange={handleChange}
                          className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-50"
                          required
                          disabled={loading}
                        >
                          <option value="">Choisissez un sujet</option>
                          <option value="inscription">Inscription artisan</option>
                          <option value="question">Question g&eacute;n&eacute;rale</option>
                          <option value="partenariat">Partenariat</option>
                          <option value="autre">Autre</option>
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
                          placeholder="D&eacute;crivez votre demande..."
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
                            Envoyer le message
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
