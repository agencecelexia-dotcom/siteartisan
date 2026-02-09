import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions l\u00e9gales | ArtisansFrance.fr",
  description: "Mentions l\u00e9gales du site ArtisansFrance.fr, annuaire d'artisans en France.",
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <section className="gradient-hero text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">Mentions l&eacute;gales</h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8 text-gray-600 leading-relaxed">
            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">&Eacute;diteur du site</h2>
              <p>
                Le site <strong>SiteArtisan</strong> (ci-apr&egrave;s &laquo; le Site &raquo;) est &eacute;dit&eacute; par :<br />
                SiteArtisan<br />
                Adresse : France m&eacute;tropolitaine<br />
                Email : contact.artisansfrance@gmail.com<br />
                T&eacute;l&eacute;phone : 07 69 13 61 82
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Directeur de la publication</h2>
              <p>Le directeur de la publication est le repr&eacute;sentant l&eacute;gal de SiteArtisan.</p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">H&eacute;bergement</h2>
              <p>
                Le Site est h&eacute;berg&eacute; par :<br />
                Vercel Inc.<br />
                340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
                Site web : https://vercel.com
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Propri&eacute;t&eacute; intellectuelle</h2>
              <p>
                L&apos;ensemble du contenu du Site (textes, images, graphismes, logo, ic&ocirc;nes, etc.)
                est prot&eacute;g&eacute; par les lois en vigueur sur la propri&eacute;t&eacute; intellectuelle.
                Toute reproduction, distribution ou utilisation sans autorisation pr&eacute;alable est interdite.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Limitation de responsabilit&eacute;</h2>
              <p>
                SiteArtisan met tout en &oelig;uvre pour assurer l&apos;exactitude des informations publi&eacute;es.
                Toutefois, SiteArtisan ne peut garantir l&apos;exactitude, la compl&eacute;tude ou l&apos;actualit&eacute;
                des informations fournies par les artisans r&eacute;f&eacute;renc&eacute;s.
                L&apos;utilisateur utilise ces informations sous sa propre responsabilit&eacute;.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Cookies</h2>
              <p>
                Le Site peut utiliser des cookies pour am&eacute;liorer l&apos;exp&eacute;rience utilisateur.
                Pour plus d&apos;informations, consultez notre{" "}
                <a href="/politique-de-confidentialite" className="text-primary hover:underline">
                  politique de confidentialit&eacute;
                </a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Droit applicable</h2>
              <p>
                Les pr&eacute;sentes mentions l&eacute;gales sont r&eacute;gies par le droit fran&ccedil;ais.
                En cas de litige, les tribunaux fran&ccedil;ais seront seuls comp&eacute;tents.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
