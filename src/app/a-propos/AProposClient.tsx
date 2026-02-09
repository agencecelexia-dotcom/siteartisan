"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, Users, Award, Target, ArrowRight, CheckCircle, XCircle, HelpCircle, Zap, Heart, Globe, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export default function AProposClient() {
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
              <Heart className="w-4 h-4" />
              Notre histoire
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              L&apos;annuaire qui change les r&egrave;gles du jeu
            </h1>
            <p className="text-blue-100 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
              ArtisansFrance.fr est n&eacute; d&apos;un constat simple : les annuaires d&apos;artisans en France sont d&eacute;pass&eacute;s,
              payants et peu utiles. On a d&eacute;cid&eacute; de faire mieux. Gratuitement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pourquoi ce site existe */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
              Pourquoi ArtisansFrance.fr existe ?
            </h2>
          </motion.div>

          <motion.div {...fadeIn} className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              Vous avez d&eacute;j&agrave; cherch&eacute; un plombier en urgence ? Un pisciniste de confiance ? Un paysagiste pour votre jardin ?
              Si oui, vous connaissez la frustration : <strong className="text-gray-900">des annuaires dat&eacute;s, des r&eacute;sultats pay&eacute;s,
              aucune garantie de qualit&eacute;</strong>.
            </p>
            <p>
              Les annuaires professionnels en France n&apos;ont quasiment pas &eacute;volu&eacute; depuis 15 ans.
              Ils vendent de la visibilit&eacute; aux artisans au lieu de la m&eacute;riter.
              R&eacute;sultat : le premier r&eacute;sultat n&apos;est pas le meilleur, c&apos;est celui qui a pay&eacute; le plus.
            </p>
            <p>
              <strong className="text-gray-900">ArtisansFrance.fr renverse ce mod&egrave;le.</strong> Chez nous,
              la visibilit&eacute; est gratuite et bas&eacute;e sur la qualit&eacute; r&eacute;elle : avis clients, certifications,
              r&eacute;activit&eacute;. Pas sur un ch&egrave;que.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparaison ancien vs nouveau */}
      <section className="py-16 md:py-24 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
              Annuaires classiques vs ArtisansFrance.fr
            </h2>
            <p className="text-gray-500 mt-3">
              Pourquoi les anciens mod&egrave;les ne fonctionnent plus
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Ancien modele */}
            <motion.div {...fadeIn} className="p-8 rounded-2xl bg-white border-2 border-red-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <XCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-900">Annuaires classiques</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Abonnement mensuel obligatoire pour \u00eatre visible",
                  "Interfaces dat\u00e9es et peu ergonomiques",
                  "Les r\u00e9sultats d\u00e9pendent du budget, pas de la qualit\u00e9",
                  "Aucun r\u00e9f\u00e9rencement naturel pour l\u2019artisan",
                  "Avis souvent non v\u00e9rifi\u00e9s ou inexistants",
                  "Pas d\u2019exp\u00e9rience mobile digne de ce nom",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ArtisansFrance.fr */}
            <motion.div {...fadeIn} className="p-8 rounded-2xl bg-white border-2 border-green-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-900">ArtisansFrance.fr</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "100% gratuit pour les artisans \u2014 pas de frais cach\u00e9s",
                  "Design moderne, fluide sur mobile et desktop",
                  "Classement bas\u00e9 sur les avis et la qualit\u00e9 r\u00e9elle",
                  "R\u00e9f\u00e9rencement SEO naturel inclus gratuitement",
                  "Avis clients v\u00e9rifi\u00e9s et authentiques",
                  "Carte interactive et exp\u00e9rience mobile-first",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
              Nos valeurs
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Shield, title: "V\u00e9rification", description: "Chaque artisan est v\u00e9rifi\u00e9 : assurances, certifications, qualit\u00e9 de travail.", color: "bg-blue-100 text-blue-600" },
              { icon: Users, title: "Communaut\u00e9", description: "Un r\u00e9seau de professionnels recommand\u00e9s par leurs pairs et leurs clients.", color: "bg-green-100 text-green-600" },
              { icon: Award, title: "Excellence", description: "Les meilleurs artisans de leur r\u00e9gion, labels et certifications reconnus.", color: "bg-amber-100 text-amber-600" },
              { icon: Target, title: "Proximit\u00e9", description: "Artisans pr\u00e8s de chez vous pour r\u00e9activit\u00e9 et suivi de qualit\u00e9.", color: "bg-purple-100 text-purple-600" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-heading font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Questions / Reponses */}
      <section className="py-16 md:py-24 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
              Questions fr&eacute;quentes
            </h2>
            <p className="text-gray-500 mt-3">
              Tout ce que vous devez savoir sur ArtisansFrance.fr
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Pourquoi ce site existe ?",
                answer: "Parce que trouver un bon artisan en France ne devrait pas \u00eatre un parcours du combattant. Les annuaires existants sont payants, peu fiables et mal r\u00e9f\u00e9renc\u00e9s. ArtisansFrance.fr a \u00e9t\u00e9 cr\u00e9\u00e9 pour offrir une alternative moderne, gratuite et transparente.",
              },
              {
                question: "En quoi ArtisansFrance.fr est diff\u00e9rent des autres annuaires ?",
                answer: "Contrairement aux annuaires classiques qui font payer les artisans pour \u00eatre visibles, ArtisansFrance.fr est enti\u00e8rement gratuit. Le classement est bas\u00e9 sur la qualit\u00e9 r\u00e9elle (avis, certifications), pas sur le budget publicitaire. Le site est moderne, rapide et optimis\u00e9 pour le mobile.",
              },
              {
                question: "Est-ce vraiment gratuit ?",
                answer: "Oui, 100% gratuit pour les artisans comme pour les particuliers. Pas d\u2019abonnement, pas de frais cach\u00e9s, pas de mise en avant payante. L\u2019inscription est libre et la visibilit\u00e9 est la m\u00eame pour tous.",
              },
              {
                question: "Comment les artisans sont-ils r\u00e9f\u00e9renc\u00e9s ?",
                answer: "Chaque artisan dispose d\u2019une fiche compl\u00e8te index\u00e9e par Google : nom, m\u00e9tier, zone d\u2019intervention, certifications, avis clients. Le site est construit avec les meilleures pratiques SEO pour que chaque fiche artisan apparaisse naturellement dans les r\u00e9sultats de recherche Google.",
              },
              {
                question: "\u00c0 qui s\u2019adresse le site ?",
                answer: "Aux particuliers qui cherchent un artisan de confiance pr\u00e8s de chez eux, et aux artisans qui veulent gagner en visibilit\u00e9 sans payer. Plombiers, piscinistes, paysagistes, \u00e9lectriciens, d\u00e9m\u00e9nageurs : tous les m\u00e9tiers du b\u00e2timent et des services sont les bienvenus.",
              },
              {
                question: "Pourquoi Google va mieux r\u00e9f\u00e9rencer ce site ?",
                answer: "ArtisansFrance.fr est construit selon les standards modernes du web : architecture Next.js optimis\u00e9e, temps de chargement ultra-rapide, contenu structur\u00e9 (H1, H2, H3, FAQ), responsive mobile-first, donn\u00e9es structur\u00e9es. Google privil\u00e9gie les sites rapides, utiles et bien structur\u00e9s \u2014 c\u2019est exactement notre ADN.",
              },
            ].map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-heading font-bold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeIn}
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
                Rejoignez ArtisansFrance.fr gratuitement et gagnez en visibilit&eacute;.
                Votre fiche sera visible par des milliers de particuliers et index&eacute;e sur Google.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ajouter-mon-entreprise">
                  <Button size="xl" className="bg-secondary hover:bg-secondary-600 text-white gap-2 shadow-lg">
                    Ajouter mon entreprise gratuitement
                    <ArrowRight className="w-5 h-5" />
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
