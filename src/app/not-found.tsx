import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page introuvable | ArtisansFrance.fr",
  description: "La page que vous recherchez n'existe pas ou a \u00e9t\u00e9 d\u00e9plac\u00e9e.",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl font-heading font-bold text-gray-200 mb-4">404</div>
      <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-3">
        Page introuvable
      </h1>
      <p className="text-gray-500 max-w-md mb-8">
        La page que vous recherchez n&apos;existe pas ou a \u00e9t\u00e9 d\u00e9plac\u00e9e. Retournez \u00e0 l&apos;accueil pour trouver votre artisan.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-700 transition-colors shadow-sm"
        >
          Retour \u00e0 l&apos;accueil
        </Link>
        <Link
          href="/artisans"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Voir tous les artisans
        </Link>
      </div>
    </div>
  )
}
