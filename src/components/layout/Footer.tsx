import React from "react"
import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-sm font-heading font-semibold text-white uppercase tracking-wider">
              ArtisansFrance.fr
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              L&apos;annuaire de r&eacute;f&eacute;rence pour trouver les meilleurs artisans pr&egrave;s de chez vous.
              Plombiers, piscinistes, paysagistes et &eacute;lectriciens certifi&eacute;s.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Accueil" },
                { href: "/artisans", label: "Tous les artisans" },
                { href: "/carte", label: "Carte des artisans" },
                { href: "/a-propos", label: "\u00c0 propos" },
                { href: "/ajouter-mon-entreprise", label: "Ajouter mon entreprise" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-primary-400" />
                07 69 13 61 82
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-primary-400" />
                contact.artisansfrance@gmail.com
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5" />
                France m&eacute;tropolitaine
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} ArtisansFrance.fr. Tous droits r&eacute;serv&eacute;s.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Link href="/mentions-legales" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Mentions l&eacute;gales
            </Link>
            <Link href="/politique-de-confidentialite" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Politique de confidentialit&eacute;
            </Link>
            <Link href="/cgu" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              CGU
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
