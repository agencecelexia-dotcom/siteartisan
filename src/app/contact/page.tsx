"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nom <span className="text-red-500">*</span>
                          </label>
                          <Input placeholder="Votre nom" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Pr&eacute;nom <span className="text-red-500">*</span>
                          </label>
                          <Input placeholder="Votre pr\u00e9nom" required />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input type="email" placeholder="votre@email.fr" required />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          T&eacute;l&eacute;phone
                        </label>
                        <Input placeholder="06 12 34 56 78" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Sujet <span className="text-red-500">*</span>
                        </label>
                        <select className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" required>
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
                          placeholder="D&eacute;crivez votre demande..."
                          rows={5}
                          required
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full gap-2">
                        <Send className="w-4 h-4" />
                        Envoyer le message
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
