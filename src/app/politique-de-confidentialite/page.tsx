import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de confidentialit\u00e9 | SiteArtisan",
  description: "Politique de confidentialit\u00e9 et protection des donn\u00e9es personnelles de SiteArtisan.",
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <section className="gradient-hero text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">Politique de confidentialit&eacute;</h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8 text-gray-600 leading-relaxed">
            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Introduction</h2>
              <p>
                SiteArtisan s&apos;engage &agrave; prot&eacute;ger la vie priv&eacute;e de ses utilisateurs.
                Cette politique de confidentialit&eacute; d&eacute;crit les donn&eacute;es que nous collectons,
                comment nous les utilisons et vos droits en mati&egrave;re de protection des donn&eacute;es,
                conform&eacute;ment au R&egrave;glement G&eacute;n&eacute;ral sur la Protection des Donn&eacute;es (RGPD).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Donn&eacute;es collect&eacute;es</h2>
              <p className="mb-3">Nous pouvons collecter les donn&eacute;es suivantes :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Donn&eacute;es de contact</strong> : nom, pr&eacute;nom, email, t&eacute;l&eacute;phone (via le formulaire d&apos;inscription)</li>
                <li><strong>Donn&eacute;es professionnelles</strong> : nom d&apos;entreprise, m&eacute;tier, zone d&apos;intervention (pour les artisans)</li>
                <li><strong>Donn&eacute;es de navigation</strong> : adresse IP, type de navigateur, pages visit&eacute;es (via cookies analytiques)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Finalit&eacute;s du traitement</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Gestion des inscriptions d&apos;artisans sur l&apos;annuaire</li>
                <li>R&eacute;ponse aux demandes de contact</li>
                <li>Am&eacute;lioration du site et de l&apos;exp&eacute;rience utilisateur</li>
                <li>Statistiques anonymes de fr&eacute;quentation</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Base l&eacute;gale</h2>
              <p>
                Le traitement de vos donn&eacute;es est fond&eacute; sur votre consentement (formulaire d&apos;inscription)
                et notre int&eacute;r&ecirc;t l&eacute;gitime (am&eacute;lioration du service).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Dur&eacute;e de conservation</h2>
              <p>
                Les donn&eacute;es personnelles sont conserv&eacute;es pendant la dur&eacute;e n&eacute;cessaire
                aux finalit&eacute;s pour lesquelles elles ont &eacute;t&eacute; collect&eacute;es,
                et au maximum 3 ans apr&egrave;s le dernier contact.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Vos droits</h2>
              <p className="mb-3">Conform&eacute;ment au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Droit d&apos;acc&egrave;s</strong> : obtenir une copie de vos donn&eacute;es personnelles</li>
                <li><strong>Droit de rectification</strong> : corriger des donn&eacute;es inexactes</li>
                <li><strong>Droit &agrave; l&apos;effacement</strong> : demander la suppression de vos donn&eacute;es</li>
                <li><strong>Droit &agrave; la portabilit&eacute;</strong> : recevoir vos donn&eacute;es dans un format structur&eacute;</li>
                <li><strong>Droit d&apos;opposition</strong> : vous opposer au traitement de vos donn&eacute;es</li>
              </ul>
              <p className="mt-3">
                Pour exercer vos droits, contactez-nous &agrave; : <strong>contact@siteartisan.fr</strong>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Cookies</h2>
              <p>
                Le Site utilise des cookies techniques n&eacute;cessaires &agrave; son fonctionnement.
                Des cookies analytiques peuvent &ecirc;tre utilis&eacute;s pour mesurer l&apos;audience du site.
                Vous pouvez g&eacute;rer vos pr&eacute;f&eacute;rences de cookies via les param&egrave;tres de votre navigateur.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Contact</h2>
              <p>
                Pour toute question relative &agrave; cette politique, contactez-nous :<br />
                Email : contact@siteartisan.fr<br />
                T&eacute;l&eacute;phone : 01 23 45 67 89
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
