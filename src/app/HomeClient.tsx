"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Users, MapPin, Star, ArrowRight, Shield, Clock, ThumbsUp } from "lucide-react"
import SearchBar from "@/components/SearchBar"
import TradeCard from "@/components/TradeCard"
import ArtisanCard from "@/components/ArtisanCard"
import { Button } from "@/components/ui/button"
import { TRADES } from "@/types/artisan"
import { artisans, getArtisansByTrade, getStats } from "@/data/artisans"

export default function HomeClient() {
  const stats = getStats()

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative gradient-hero text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute top-40 right-40 w-48 h-48 bg-white rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Artisans v&eacute;rifi&eacute;s et certifi&eacute;s
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold leading-tight tracking-tight">
              Trouvez les meilleurs
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-300">
                artisans
              </span>{" "}
              pr&egrave;s de chez vous
            </h1>

            <p className="text-lg md:text-xl text-white/90 mt-8 max-w-2xl mx-auto leading-relaxed">
              Plombiers, piscinistes, paysagistes, &eacute;lectriciens...
              D&eacute;couvrez des professionnels de confiance, certifi&eacute;s et recommand&eacute;s.
            </p>

            {/* Search Bar */}
            <div className="mt-10">
              <SearchBar />
            </div>

            {/* Quick links */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="text-blue-200">Recherches populaires :</span>
              {["Plombier Lyon", "Pisciniste Aix", "Paysagiste Bordeaux", "\u00c9lectricien Toulouse"].map((term) => (
                <Link
                  key={term}
                  href={`/artisans?city=${term.split(" ")[1]}&trade=${term.split(" ")[0].toLowerCase()}`}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  {term}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50L48 45.7C96 41.3 192 32.7 288 30.2C384 27.7 480 31.3 576 39.8C672 48.3 768 61.7 864 63.3C960 65 1056 55 1152 48.3C1248 41.7 1344 38.3 1392 36.7L1440 35V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-4 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { icon: Users, value: `${stats.totalArtisans}+`, label: "Artisans r\u00e9f\u00e9renc\u00e9s", color: "text-primary" },
              { icon: MapPin, value: `${stats.totalCities}+`, label: "Villes couvertes", color: "text-green-500" },
              { icon: Star, value: `${stats.averageRating}/5`, label: "Note moyenne", color: "text-amber-500" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trades Section */}
      <section className="py-16 md:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
              Explorez par m&eacute;tier
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Cliquez sur une cat&eacute;gorie pour d&eacute;couvrir les artisans disponibles dans votre r&eacute;gion
            </p>
          </motion.div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {TRADES.map((trade, index) => (
              <TradeCard
                key={trade.id}
                trade={trade}
                artisans={getArtisansByTrade(trade.id)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artisans */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
                Artisans en vedette
              </h2>
              <p className="text-gray-500 mt-2">
                Les professionnels les mieux not&eacute;s de notre annuaire
              </p>
            </div>
            <Link href="/artisans">
              <Button variant="outline" className="gap-2">
                Voir tous les artisans
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artisans
              .filter((a) => a.status === "active")
              .sort((a, b) => b.rating.average - a.rating.average)
              .slice(0, 4)
              .map((artisan, index) => (
                <ArtisanCard key={artisan.id} artisan={artisan} index={index} />
              ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
              Pourquoi ArtisansFrance.fr ?
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Nous s&eacute;lectionnons les meilleurs artisans pour vous garantir un service de qualit&eacute;
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Shield,
                title: "Artisans v\u00e9rifi\u00e9s",
                description: "Chaque artisan est v\u00e9rifi\u00e9 : assurances, certifications, et qualit\u00e9 de travail valid\u00e9es.",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: Clock,
                title: "Rapide et simple",
                description: "Trouvez le bon artisan en quelques clics. Comparez les profils et contactez directement.",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: ThumbsUp,
                title: "Avis authentiques",
                description: "Des avis clients v\u00e9rifi\u00e9s pour vous aider \u00e0 choisir en toute confiance.",
                color: "bg-amber-100 text-amber-600",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-5`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO - FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
              Comment trouver un artisan de confiance ?
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Les questions les plus fr&eacute;quentes sur la recherche d&apos;artisans en France
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Comment trouver un bon artisan pr\u00e8s de chez moi ?",
                answer: "Utilisez ArtisansFrance.fr pour rechercher par m\u00e9tier et par ville. Chaque artisan dispose d\u2019une fiche compl\u00e8te avec ses certifications, avis clients et zone d\u2019intervention. Vous pouvez aussi explorer la carte interactive pour d\u00e9couvrir les artisans autour de vous.",
              },
              {
                question: "Comment choisir entre un plombier, \u00e9lectricien ou paysagiste ?",
                answer: "Comparez les fiches artisans : v\u00e9rifiez les certifications (RGE, Qualibat, Qualifelec), lisez les avis clients, et regardez le portfolio de r\u00e9alisations. Un artisan certifi\u00e9 avec de bons avis est g\u00e9n\u00e9ralement un choix s\u00fbr.",
              },
              {
                question: "L\u2019annuaire ArtisansFrance.fr est-il vraiment gratuit ?",
                answer: "Oui, ArtisansFrance.fr est 100% gratuit pour les particuliers comme pour les artisans. Contrairement aux annuaires traditionnels, nous ne faisons pas payer la visibilit\u00e9. Le classement est bas\u00e9 sur la qualit\u00e9 r\u00e9elle, pas sur un budget publicitaire.",
              },
              {
                question: "Quelle diff\u00e9rence entre un annuaire gratuit et payant ?",
                answer: "Les annuaires payants font payer les artisans pour appara\u00eetre en t\u00eate de liste. Cela ne garantit pas la qualit\u00e9. ArtisansFrance.fr est gratuit et classe les artisans selon leurs avis, certifications et qualit\u00e9 de service r\u00e9elle.",
              },
              {
                question: "Comment r\u00e9f\u00e9rencer mon entreprise gratuitement sur Google ?",
                answer: "En vous inscrivant sur ArtisansFrance.fr, votre fiche artisan est automatiquement index\u00e9e par Google. Notre site est optimis\u00e9 SEO : chaque fiche g\u00e9n\u00e8re une page d\u00e9di\u00e9e avec votre nom, m\u00e9tier, ville et avis. C\u2019est du r\u00e9f\u00e9rencement naturel gratuit.",
              },
            ].map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm"
              >
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/a-propos">
              <Button variant="outline" size="lg" className="gap-2">
                En savoir plus sur ArtisansFrance.fr
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO - Questions supplémentaires pour artisans et utilisateurs */}
      <section className="py-16 md:py-24 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
              Toutes vos questions sur les artisans et ArtisansFrance.fr
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Questions Utilisateurs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">
                ❓ Vous cherchez un artisan ?
              </h3>
              {[
                { q: "Quels sont les labels et certifications important pour un artisan ?", a: "RGE (éco-responsable), Qualibat (bâtiment), Qualifelec (électricité), IRVE (bornes recharge), UNEP (paysage) garantissent la qualité et l'assurance." },
                { q: "Comment vérifier les avis clients d'un artisan ?", a: "Sur ArtisansFrance.fr, chaque avis est authentique. Les évaluations doivent être justifiées et vérifiées pour garantir leur fiabilité." },
                { q: "Un artisan certifié coûte-t-il forcément plus cher ?", a: "Non, la certification garantit la qualité et l'assurance, mais les prix restent compétitifs. Comparez plusieurs offres sur ArtisansFrance.fr." },
                { q: "Comment trouver un artisan d'urgence le dimanche ?", a: "Utilisez ArtisansFrance.fr pour filtrer les artisans avec horaires spéciaux. Beaucoup proposent des interventions d'urgence 24/7." },
                { q: "Comment être sûr qu'un artisan est assuré ?", a: "Demandez sa RC Pro (responsabilité civile) et sa garantie décennale. Tous les artisans de ArtisansFrance.fr sont vérifiés sur ce point." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="font-medium text-gray-900 text-sm mb-2">{item.q}</p>
                  <p className="text-gray-600 text-sm">{item.a}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Questions Artisans */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">
                🔨 Vous êtes artisan ?
              </h3>
              {[
                { q: "Comment attirer plus de clients sur ArtisansFrance.fr ?", a: "Une fiche complète avec photos de qualité, avis positifs et certifications boost votre visibilité. Le classement est basé sur la qualité, pas sur le paiement." },
                { q: "ArtisansFrance.fr aide-t-il vraiment à trouver des clients ?", a: "Oui ! Chaque fiche est indexée sur Google et visible par des milliers de particuliers. Vous reçoivent des demandes de devis qualifiées." },
                { q: "Comment faire pour être mieux classé que les concurrents ?", a: "Augmentez vos avis clients, complétez votre portfolio, maintenez vos certifications à jour. Les meilleurs artisans sont naturellement mieux classés." },
                { q: "Puis-je gérer ma fiche moi-même sur ArtisansFrance.fr ?", a: "Oui, après validation initiale. Vous pouvez ajouter des photos, mettre à jour votre zone d'intervention et répondre aux avis clients directement." },
                { q: "Combien ça coûte d'être sur ArtisansFrance.fr ?", a: "C'est gratuit ! Pas de frais d'inscription, pas d'abonnement mensuel, pas de coûts cachés. ArtisansFrance.fr croit en la transparence." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="font-medium text-gray-900 text-sm mb-2">{item.q}</p>
                  <p className="text-gray-600 text-sm">{item.a}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl gradient-hero text-white p-6 sm:p-10 md:p-16 text-center"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-10 left-20 w-48 h-48 bg-white rounded-full blur-2xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                Vous &ecirc;tes artisan ?
              </h2>
              <p className="text-blue-100 mt-4 max-w-xl mx-auto text-lg">
                Rejoignez notre annuaire gratuitement et gagnez en visibilit&eacute;.
                Votre fiche sera index&eacute;e sur Google et visible par des milliers de particuliers.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ajouter-mon-entreprise">
                  <Button size="xl" className="bg-secondary hover:bg-secondary-600 text-white gap-2 shadow-lg">
                    Ajouter mon entreprise gratuitement
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/a-propos">
                  <Button size="xl" variant="outline" className="border-white hover:bg-white hover:text-primary-700 bg-white/10 text-white font-semibold">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
