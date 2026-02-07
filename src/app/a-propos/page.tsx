"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, Users, Award, Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AProposPage() {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold">&Agrave; propos de SiteArtisan</h1>
            <p className="text-blue-100 mt-4 max-w-2xl mx-auto text-lg">
              L&apos;annuaire de confiance qui connecte les particuliers avec les meilleurs artisans de France.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Notre mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Chez SiteArtisan, nous croyons que trouver un artisan de qualit&eacute; ne devrait pas &ecirc;tre un parcours du combattant.
              Notre plateforme met en relation les particuliers avec des professionnels v&eacute;rifi&eacute;s,
              certifi&eacute;s et recommand&eacute;s dans quatre m&eacute;tiers cl&eacute;s : plomberie, piscine, paysagisme et &eacute;lectricit&eacute;.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {[
              {
                icon: Shield,
                title: "V\u00e9rification rigoureuse",
                description: "Chaque artisan r\u00e9f\u00e9renc\u00e9 fait l\u2019objet d\u2019une v\u00e9rification compl\u00e8te : assurances, certifications, qualit\u00e9 de travail et avis clients.",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: Users,
                title: "Communaut\u00e9 de confiance",
                description: "Nous construisons un r\u00e9seau de professionnels de confiance, recommand\u00e9s par leurs pairs et leurs clients.",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: Award,
                title: "Excellence reconnue",
                description: "Nos artisans partenaires sont parmi les meilleurs de leur r\u00e9gion, avec des labels et certifications reconnus.",
                color: "bg-amber-100 text-amber-600",
              },
              {
                icon: Target,
                title: "Proximit\u00e9 locale",
                description: "Trouvez des artisans pr\u00e8s de chez vous. La proximit\u00e9 garantit r\u00e9activit\u00e9 et suivi de qualit\u00e9.",
                color: "bg-purple-100 text-purple-600",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            Vous &ecirc;tes artisan ?
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Rejoignez notre annuaire et b&eacute;n&eacute;ficiez d&apos;une visibilit&eacute; accrue aupr&egrave;s de clients qualifi&eacute;s.
          </p>
          <Link href="/contact">
            <Button size="xl" className="gap-2">
              Nous contacter
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
