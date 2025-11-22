// Fichier: app/(public)/mentions-legales/page.jsx - VERSION AMÉLIORÉE
import React from 'react';
import Link from 'next/link';
import { 
  FileText, Shield, CreditCard, AlertTriangle, MessageSquare, 
  Lock, Scale, Clock, Package, Phone, MapPin, Mail 
} from 'lucide-react';

export const metadata = {
  title: 'CGU & Mentions Légales | LE LIVREUR 2.0',
  description: 'Conditions générales d\'utilisation et mentions légales des services de livraison LE LIVREUR 2.0 au Bénin. Protection des données, responsabilités et conditions de service.',
  keywords: 'CGU, mentions légales, conditions utilisation, livraison Bénin',
};

// ✅ Structure des articles avec icônes
const articles = [
  {
    id: 1,
    icon: <FileText className="w-6 h-6" />,
    title: 'Objet',
    color: 'blue',
    content: (
      <>
        <p>
          Les présentes Conditions Générales d'Utilisation (CGU) régissent les relations entre l'agence <strong className="text-[#1B3A5F]">LE LIVREUR 2.0</strong> (ci-après "l'Agence") et ses clients utilisateurs des services de livraison (ci-après "le Client").
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4 rounded">
          <p className="text-sm">
            ⚠️ <strong>Important :</strong> En accédant à nos services ou en passant une commande, vous acceptez ces conditions sans réserve. Si vous n'acceptez pas ces CGU, veuillez ne pas utiliser nos services.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 2,
    icon: <Package className="w-6 h-6" />,
    title: 'Services proposés',
    color: 'green',
    content: (
      <>
        <p className="mb-4">
          LE LIVREUR 2.0 propose des services de transport et de livraison de colis dans les zones suivantes :
        </p>
        <div className="bg-green-50 rounded-lg p-4 mb-4">
          <p className="font-semibold text-green-900 mb-2">🗺️ Zones de couverture :</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            <li className="flex items-center gap-2">✓ Cotonou</li>
            <li className="flex items-center gap-2">✓ Abomey-Calavi</li>
            <li className="flex items-center gap-2">✓ Ouidah</li>
            <li className="flex items-center gap-2">✓ Porto-Novo</li>
            <li className="flex items-center gap-2 col-span-2">✓ Et leurs environs</li>
          </ul>
        </div>
        
        <p className="font-semibold mb-2">Ces services incluent :</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="text-[#F4B223] text-xl">📦</span>
            <span>La prise en charge des colis à l'adresse indiquée</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#F4B223] text-xl">🚚</span>
            <span>Le transport sécurisé jusqu'à destination</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#F4B223] text-xl">✅</span>
            <span>La remise du colis au destinataire ou à un point de dépôt désigné</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#F4B223] text-xl">💰</span>
            <span>La collecte des fonds pour le paiement à la livraison (service optionnel)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#F4B223] text-xl">📱</span>
            <span>Le suivi en temps réel de votre colis</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 3,
    icon: <Shield className="w-6 h-6" />,
    title: 'Conditions d\'accès aux services',
    color: 'orange',
    content: (
      <>
        <p className="mb-4">Pour bénéficier de nos services, le Client s'engage à respecter les conditions suivantes :</p>
        
        <div className="space-y-4">
          <div className="bg-white border-2 border-orange-200 rounded-lg p-4">
            <h4 className="font-bold text-[#1B3A5F] mb-2">1. Informations exactes requises</h4>
            <p className="text-sm">Le client doit fournir des informations complètes et exactes sur :</p>
            <ul className="text-sm mt-2 space-y-1 pl-4">
              <li>• Nature du colis (contenu général)</li>
              <li>• Poids et dimensions approximatives</li>
              <li>• Valeur déclarée (pour assurance)</li>
              <li>• Coordonnées complètes de l'expéditeur et du destinataire</li>
            </ul>
          </div>

          <div className="bg-white border-2 border-orange-200 rounded-lg p-4">
            <h4 className="font-bold text-[#1B3A5F] mb-2">2. Normes de sécurité</h4>
            <div className="bg-red-50 border border-red-200 rounded p-3 mb-2">
              <p className="font-semibold text-red-800 text-sm mb-2">❌ Colis INTERDITS :</p>
              <ul className="text-sm space-y-1 text-red-700">
                <li>• Substances dangereuses (explosifs, toxiques, inflammables)</li>
                <li>• Articles illégaux ou contraires à la loi béninoise</li>
                <li>• Denrées périssables non conformes aux normes sanitaires</li>
                <li>• Armes, munitions ou objets assimilés</li>
                <li>• Documents officiels falsifiés</li>
              </ul>
            </div>
            <p className="text-sm"><strong>Poids maximum accepté :</strong> 50 kg par colis</p>
          </div>

          <div className="bg-white border-2 border-orange-200 rounded-lg p-4">
            <h4 className="font-bold text-[#1B3A5F] mb-2">3. Adresses précises</h4>
            <p className="text-sm">Les adresses de ramassage et de livraison doivent être clairement spécifiées avec :</p>
            <ul className="text-sm mt-2 space-y-1 pl-4">
              <li>• Ville et quartier</li>
              <li>• Repères géographiques précis</li>
              <li>• Numéro de téléphone joignable</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 4,
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Tarification et paiements',
    color: 'purple',
    content: (
      <>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">💵 Calcul des tarifs</h4>
            <p className="text-sm">Les tarifs sont déterminés selon :</p>
            <ul className="text-sm mt-2 space-y-1 pl-4">
              <li>• La distance entre le point de ramassage et la destination</li>
              <li>• Le poids et les dimensions du colis</li>
              <li>• Les spécificités de la commande (urgence, fragilité, valeur)</li>
              <li>• La grille tarifaire officielle de LE LIVREUR 2.0</li>
            </ul>
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-[#1B3A5F] mb-2">💳 Moyens de paiement acceptés</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-2xl">💵</span>
                <span>Espèces (CFA)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-2xl">📱</span>
                <span>Mobile Money (MTN, Moov)</span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold text-red-800 text-sm mb-2">⚠️ Impayés</p>
            <p className="text-sm text-red-700">
              Toute prestation non réglée après la livraison entraînera une <strong>suspension immédiate du service</strong>. LE LIVREUR 2.0 se réserve le droit d'avoir recours à tous les moyens légaux (poursuites judiciaires, agences de recouvrement) pour récupérer les frais dus.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 5,
    icon: <AlertTriangle className="w-6 h-6" />,
    title: 'Responsabilité',
    color: 'yellow',
    content: (
      <>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">✅ L'Agence s'engage à :</h4>
            <ol className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="font-bold text-green-600">1.</span>
                <span>Transporter les colis dans les meilleures conditions de sécurité</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-green-600">2.</span>
                <span>Informer le client en cas d'imprévu (retard, incident, adresse introuvable)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-green-600">3.</span>
                <span>Procéder au remboursement selon sa politique en cas de perte ou dommage avéré</span>
              </li>
            </ol>
          </div>

          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Limitations de responsabilité</h4>
            <p className="text-sm mb-2">La responsabilité de l'Agence ne peut être engagée dans les cas suivants :</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span><strong>Force majeure :</strong> accidents de la circulation, intempéries, catastrophes naturelles, troubles à l'ordre public</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span><strong>Informations erronées :</strong> adresses incorrectes ou incomplètes fournies par le Client</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span><strong>Contenu illégal :</strong> colis contenant des produits interdits ou non déclarés</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span><strong>Refus de réception :</strong> destinataire absent ou refusant le colis sans motif valable</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm italic">
              <strong>Note importante :</strong> Le Client est tenu <strong className="text-blue-900">entièrement responsable</strong> de la nature, de la légalité et de la conformité des produits envoyés. L'Agence décline toute responsabilité en cas de saisie par les autorités de colis contenant des articles interdits.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 6,
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Réclamations',
    color: 'red',
    content: (
      <>
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="font-semibold text-red-900 mb-2">⏱️ Délai de réclamation</p>
            <p className="text-sm">
              Toute réclamation concernant une livraison doit être formulée dans un délai maximum de <strong className="text-red-700">48 heures</strong> après la livraison ou la date prévue de livraison.
            </p>
            <p className="text-sm mt-2 text-red-700">
              ⚠️ Passé ce délai, aucune réclamation ne pourra être traitée.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold text-[#1B3A5F] mb-3">📞 Canaux de réclamation</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Téléphone / WhatsApp</p>
                  <a href="tel:+22901470428" className="text-[#1B3A5F] hover:text-[#F4B223]">
                    01 47 04 28 15
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Disponible 7j/7 de 8h à 20h</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Adresse physique</p>
                  <p className="text-sm">Ilot 921, Parcelle C<br/>Maison Hilaire Akpagbé<br/>7e Arrondissement, Cotonou</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Email</p>
                  <a href="mailto:contact@lelivreur2.com" className="text-[#1B3A5F] hover:text-[#F4B223]">
                    contact@lelivreur2.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm">
              <strong>💡 Conseil :</strong> Pour accélérer le traitement de votre réclamation, munissez-vous de votre numéro de suivi et des preuves (photos, reçu) si nécessaire.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 7,
    icon: <Clock className="w-6 h-6" />,
    title: 'Modification des CGU',
    color: 'indigo',
    content: (
      <>
        <p className="mb-4">
          LE LIVREUR 2.0 se réserve le droit de modifier ces Conditions Générales d'Utilisation à tout moment afin de les adapter aux évolutions de ses services ou de la réglementation.
        </p>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <h4 className="font-semibold text-indigo-900 mb-2">📣 Notification des modifications</h4>
          <p className="text-sm mb-2">Les modifications seront communiquées via :</p>
          <ul className="text-sm space-y-1 pl-4">
            <li>• Publication sur le site web officiel</li>
            <li>• Notification par email aux clients réguliers</li>
            <li>• Annonce sur les réseaux sociaux</li>
          </ul>
          <p className="text-sm mt-3 font-semibold text-indigo-800">
            Les modifications prennent effet immédiatement après publication.
          </p>
        </div>
        <p className="text-sm mt-3 italic text-gray-600">
          Il est de la responsabilité du Client de consulter régulièrement ces CGU pour prendre connaissance des éventuelles modifications.
        </p>
      </>
    ),
  },
  {
    id: 8,
    icon: <Lock className="w-6 h-6" />,
    title: 'Protection des données personnelles',
    color: 'teal',
    content: (
      <>
        <div className="space-y-4">
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <h4 className="font-semibold text-teal-900 mb-2">🔒 Collecte et utilisation</h4>
            <p className="text-sm mb-2">Les données personnelles collectées (nom, adresse, téléphone, email) sont utilisées exclusivement pour :</p>
            <ul className="text-sm space-y-1 pl-4">
              <li>• La gestion et le suivi des livraisons</li>
              <li>• La communication relative à vos commandes</li>
              <li>• L'amélioration de nos services</li>
              <li>• L'envoi de notifications importantes</li>
            </ul>
          </div>

          <div className="bg-white border-2 border-teal-200 rounded-lg p-4">
            <h4 className="font-semibold text-[#1B3A5F] mb-2">✅ Vos garanties</h4>
            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <span className="text-teal-600">•</span>
                <span>Vos données <strong>ne seront jamais vendues</strong> à des tiers</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-teal-600">•</span>
                <span>Elles ne seront <strong>pas partagées</strong> sans votre consentement explicite</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-teal-600">•</span>
                <span>Elles sont <strong>stockées de manière sécurisée</strong></span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-teal-600">•</span>
                <span>Vous avez un <strong>droit d'accès, de modification et de suppression</strong></span>
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Pour exercer vos droits concernant vos données personnelles, contactez-nous à : 
            <a href="mailto:contact@lelivreur2.com" className="text-[#1B3A5F] hover:text-[#F4B223] font-semibold ml-1">
              contact@lelivreur2.com
            </a>
          </p>
        </div>
      </>
    ),
  },
  {
    id: 9,
    icon: <Scale className="w-6 h-6" />,
    title: 'Règlement des litiges',
    color: 'gray',
    content: (
      <>
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">🤝 Solution amiable prioritaire</h4>
            <p className="text-sm">
              En cas de différend ou de litige, l'Agence et le Client s'engagent à rechercher en priorité une <strong>solution amiable</strong> par la négociation et le dialogue.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
            <h4 className="font-semibold text-[#1B3A5F] mb-2">⚖️ Juridiction compétente</h4>
            <p className="text-sm">
              À défaut de solution amiable dans un délai raisonnable, tout litige relatif à l'interprétation ou à l'exécution des présentes CGU sera soumis aux <strong>tribunaux compétents de Cotonou</strong>, République du Bénin.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm">
              <strong>📞 Médiation :</strong> Avant toute action en justice, nous vous encourageons à contacter notre service client pour tenter de résoudre le différend à l'amiable.
            </p>
          </div>
        </div>
      </>
    ),
  },
];

// ✅ Couleurs par catégorie
const colorClasses = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  orange: 'from-orange-500 to-orange-600',
  purple: 'from-purple-500 to-purple-600',
  yellow: 'from-yellow-500 to-yellow-600',
  red: 'from-red-500 to-red-600',
  indigo: 'from-indigo-500 to-indigo-600',
  teal: 'from-teal-500 to-teal-600',
  gray: 'from-gray-500 to-gray-600',
};

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1B3A5F] via-[#2C5282] to-[#1B3A5F] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-[#F4B223] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-sm font-semibold">⚖️ Documents Légaux</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Conditions Générales d'Utilisation
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Lisez attentivement ces conditions avant d'utiliser nos services
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-blue-200">
            <Clock className="w-4 h-4" />
            <span>Dernière mise à jour : <strong>10 décembre 2024</strong></span>
          </div>
        </div>
      </section>

      {/* Navigation Rapide */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">Navigation rapide :</span>
            {articles.map((article) => (
              <a
                key={article.id}
                href={`#article-${article.id}`}
                className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-[#F4B223] hover:text-white rounded-full whitespace-nowrap transition-colors"
              >
                Art. {article.id}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contenu Principal */}
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Articles */}
          <div className="space-y-8">
            {articles.map((article, index) => (
              <article
                key={article.id}
                id={`article-${article.id}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 scroll-mt-24"
              >
                {/* Header avec gradient */}
                <div className={`bg-gradient-to-r ${colorClasses[article.color]} p-6 text-white`}>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      {article.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold opacity-90">Article {article.id}</p>
                      <h2 className="text-2xl font-bold">{article.title}</h2>
                    </div>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6 md:p-8 prose prose-lg max-w-none">
                  {article.content}
                </div>
              </article>
            ))}
          </div>

          {/* Footer avec CTA */}
          <div className="mt-16 bg-gradient-to-br from-[#1B3A5F] to-[#2C5282] rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Des questions sur nos CGU ?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Notre équipe est disponible pour répondre à toutes vos interrogations concernant nos conditions d'utilisation
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F4B223] hover:bg-[#D4920F] text-[#1B3A5F] font-bold rounded-lg transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                Nous contacter
              </Link>
              <a
                href="tel:+22901470428"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                01 47 04 28 15
              </a>
            </div>

            <p className="mt-8 text-sm text-blue-200">
              Merci de votre confiance et de choisir <strong>LE LIVREUR 2.0</strong> pour vos besoins de livraison 🚚
            </p>
          </div>

          {/* Signature légale */}
          <div className="mt-8 text-center text-sm text-gray-500 border-t pt-6">
            <p className="mb-2">
              <strong className="text-gray-700">LE LIVREUR 2.0</strong>
            </p>
            <p>Ilot 921, Parcelle C, Maison Hilaire Akpagbé</p>
            <p>7e Arrondissement, Cotonou - République du Bénin</p>
            <p className="mt-2">
              Tél: <a href="tel:+22901470428" className="text-[#1B3A5F] hover:text-[#F4B223]">01 47 04 28 15</a> | 
              Email: <a href="mailto:contact@lelivreur2.com" className="text-[#1B3A5F] hover:text-[#F4B223]">contact@lelivreur2.com</a>
            </p>
            <p className="mt-4 text-xs">
              © {new Date().getFullYear()} LE LIVREUR 2.0 - Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </>
  );
}