import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions G\u00e9n\u00e9rales d'Utilisation | SiteArtisan",
  description: "CGU de SiteArtisan, annuaire gratuit d'artisans en France.",
}

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <section className="gradient-hero text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">Conditions G&eacute;n&eacute;rales d&apos;Utilisation</h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8 text-gray-600 leading-relaxed">
            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Article 1 &mdash; Objet</h2>
              <p>
                Les pr&eacute;sentes Conditions G&eacute;n&eacute;rales d&apos;Utilisation (CGU) r&eacute;gissent l&apos;acc&egrave;s
                et l&apos;utilisation du site <strong>SiteArtisan</strong>, annuaire en ligne d&apos;artisans.
                En utilisant le Site, vous acceptez les pr&eacute;sentes CGU dans leur int&eacute;gralit&eacute;.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Article 2 &mdash; Acc&egrave;s au site</h2>
              <p>
                L&apos;acc&egrave;s au Site est gratuit pour tous les utilisateurs.
                SiteArtisan se r&eacute;serve le droit de modifier, suspendre ou interrompre
                tout ou partie du Site &agrave; tout moment, sans pr&eacute;avis.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Article 3 &mdash; Inscription des artisans</h2>
              <p>
                L&apos;inscription sur l&apos;annuaire est gratuite et soumise &agrave; validation par l&apos;&eacute;quipe SiteArtisan.
                L&apos;artisan s&apos;engage &agrave; fournir des informations exactes et &agrave; jour.
                SiteArtisan se r&eacute;serve le droit de refuser ou supprimer toute fiche
                ne respectant pas les pr&eacute;sentes conditions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Article 4 &mdash; Obligations de l&apos;utilisateur</h2>
              <p>L&apos;utilisateur s&apos;engage &agrave; :</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Utiliser le Site de mani&egrave;re conforme &agrave; la loi</li>
                <li>Ne pas publier de contenu diffamatoire, trompeur ou illicite</li>
                <li>Ne pas perturber le fonctionnement du Site</li>
                <li>Respecter les droits de propri&eacute;t&eacute; intellectuelle</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Article 5 &mdash; Responsabilit&eacute;</h2>
              <p>
                SiteArtisan agit en tant qu&apos;interm&eacute;diaire et ne peut &ecirc;tre tenu responsable
                des prestations r&eacute;alis&eacute;es par les artisans r&eacute;f&eacute;renc&eacute;s.
                Les relations contractuelles entre utilisateurs et artisans sont de leur seule responsabilit&eacute;.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Article 6 &mdash; Propri&eacute;t&eacute; intellectuelle</h2>
              <p>
                L&apos;ensemble des contenus du Site (textes, images, logos, graphismes)
                est la propri&eacute;t&eacute; de SiteArtisan ou de ses partenaires.
                Toute reproduction sans autorisation est interdite.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Article 7 &mdash; Donn&eacute;es personnelles</h2>
              <p>
                Le traitement des donn&eacute;es personnelles est d&eacute;taill&eacute; dans notre{" "}
                <a href="/politique-de-confidentialite" className="text-primary hover:underline">
                  politique de confidentialit&eacute;
                </a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Article 8 &mdash; Modification des CGU</h2>
              <p>
                SiteArtisan se r&eacute;serve le droit de modifier les pr&eacute;sentes CGU &agrave; tout moment.
                Les utilisateurs seront inform&eacute;s de toute modification significative.
                La poursuite de l&apos;utilisation du Site apr&egrave;s modification vaut acceptation des nouvelles CGU.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Article 9 &mdash; Droit applicable</h2>
              <p>
                Les pr&eacute;sentes CGU sont soumises au droit fran&ccedil;ais.
                Tout litige sera soumis aux tribunaux comp&eacute;tents de France.
              </p>
            </div>

            <p className="text-sm text-gray-400 pt-4 border-t border-gray-100">
              Derni&egrave;re mise &agrave; jour : f&eacute;vrier 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
