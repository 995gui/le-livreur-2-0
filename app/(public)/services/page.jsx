// Fichier: app/services/page.jsx
import Link from 'next/link';
import { Zap, Clock, Leaf, Package, Building2, TrendingUp, Check, ArrowRight, Phone, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Services de Livraison à Cotonou | LE LIVREUR 2.0',
  description: 'Livraison express, programmée, écologique et corporate à Cotonou. Solutions professionnelles pour particuliers et entreprises au Bénin.',
};

export default function ServicesPage() {
  // VOS VRAIES COORDONNÉES
  const phoneNumber = "+229 00 00 00 00"; // REMPLACEZ PAR LE VRAI
  const whatsappNumber = "22900000000";   // REMPLACEZ PAR LE VRAI
  
  const services = [
    {
      id: 'express',
      icon: <Zap className="w-12 h-12" />,
      title: 'Livraison Express',
      subtitle: 'Urgence & Nuit & Week-end',
      description: 'Votre colis est prioritaire. Un livreur est dépêché immédiatement pour une course directe sans détours.',
      longDescription: 'Le service Express est conçu pour les urgences absolues, les livraisons de nuit ou les week-ends. Votre commande passe avant toutes les autres avec une prise en charge immédiate.',
      advantages: [
        'Prise en charge immédiate',
        'Livraison directe (Point A -> Point B)',
        'Disponible soirs et week-ends',
        'Priorité absolue sur la flotte',
        'Idéal pour repas chauds et documents urgents',
        'Traçabilité GPS temps réel'
      ],
      useCases: [
        'Documents administratifs urgents',
        'Livraison de repas (Déjeuner/Diner)',
        'Médicaments et urgences',
        'Cadeaux dernière minute',
        'Oublis de clés ou documents'
      ],
      // MISE À JOUR SELON L'IMAGE : +50% sur tarif standard
      pricing: 'Majoration +50% sur tarif standard', 
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'programmee',
      icon: <Clock className="w-12 h-12" />,
      title: 'Livraison Standard / Programmée',
      subtitle: 'Le choix malin et économique',
      description: 'La solution idéale pour vos livraisons quotidiennes non-urgentes. Planifiez à l\'avance et bénéficiez des meilleurs tarifs.',
      longDescription: 'Notre service standard couvre tout Cotonou et Calavi. En planifiant vos courses ou en acceptant un délai standard, vous optimisez vos coûts logistiques.',
      advantages: [
        'Le tarif le plus économique du marché',
        'Créneaux horaires respectés',
        'Couverture Cotonou & Calavi',
        'Fiabilité et soin des colis',
        'Notifications à l\'enlèvement et livraison',
        'Idéal pour e-commerce classique'
      ],
      useCases: [
        'Livraisons clients e-commerce',
        'Envois de courriers non-urgents',
        'Distribution de produits',
        'Retours de marchandises',
        'Cadeaux planifiés'
      ],
      // MISE À JOUR SELON L'IMAGE : Départ à 700F
      pricing: 'À partir de 700 FCFA',
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'ecologique',
      icon: <Leaf className="w-12 h-12" />,
      title: 'Livraison Écologique',
      subtitle: 'Motos électriques silencieuses',
      description: 'Faites livrer vos colis sans polluer. Notre flotte de motos électriques réduit l\'empreinte carbone de chaque course.',
      longDescription: 'LE LIVREUR 2.0 est pionnier dans la logistique verte au Bénin. Nos motos électriques sont silencieuses et n\'émettent aucun gaz d\'échappement, idéales pour les zones résidentielles.',
      advantages: [
        'Zéro émission de CO2',
        'Zéro pollution sonore (Silencieux)',
        'Image de marque positive pour vous',
        'Accès facilité aux zones résidentielles',
        'Même efficacité que les motos thermiques',
        'Contribution à un Cotonou plus vert'
      ],
      useCases: [
        'Marques éthiques et bio',
        'Livraisons matinales (sans bruit)',
        'Entreprises RSE',
        'Zones hospitalières ou calmes',
        'Clients sensibles à l\'écologie'
      ],
      pricing: 'Même prix que le standard', // Argument fort
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-50'
    },
    {
      id: 'groupee',
      icon: <Package className="w-12 h-12" />,
      title: 'Livraison Groupée & Stockage',
      subtitle: 'La solution E-commerçants',
      description: 'Nous stockons, nous emballons, nous livrons. Une logistique complète pour les vendeurs en ligne qui veulent se libérer du stress.',
      longDescription: 'Confiez-nous votre stock tampon. Dès que vous recevez une commande, nous préparons le colis (closing) et l\'expédions. Les livraisons groupées permettent de réduire drastiquement vos coûts.',
      advantages: [
        'Stockage sécurisé dans nos locaux',
        'Service de "Closing" (Emballage pro)',
        'Tarifs dégressifs par volume',
        'Gestion des retours et échecs',
        'Gain de temps énorme pour le vendeur',
        'Reporting des ventes livrées'
      ],
      useCases: [
        'Boutiques Instagram / Facebook',
        'Grossistes et semi-grossistes',
        'Campagnes promotionnelles',
        'Box mensuelles',
        'Vendeurs sans entrepôt'
      ],
      pricing: 'Sur devis (Formule adaptée)',
      color: 'from-yellow-500 to-yellow-700',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'corporate',
      icon: <Building2 className="w-12 h-12" />,
      title: 'Offre Corporate / Entreprise',
      subtitle: 'Votre coursier dédié',
      description: 'Un service premium pour les entreprises qui ont besoin de fiabilité absolue : facturation fin de mois, courses administratives, et confidentialité.',
      longDescription: 'Fini la petite caisse pour payer chaque course. Avec l\'offre Corporate, vous avez un compte entreprise, une facturation mensuelle claire et des livreurs formés aux codes de l\'entreprise (tenue, langage, confidentialité).',
      advantages: [
        'Facturation mensuelle unique',
        'Gestionnaire de compte dédié',
        'Coursiers en tenue professionnelle',
        'Confidentialité des plis garantie',
        'Priorité sur le planning',
        'Récupération de chèques et documents'
      ],
      useCases: [
        'Cabinets d\'avocats et notaires',
        'Agences de communication',
        'Administrations et banques',
        'PME avec flux régulier',
        'Pharmacies et laboratoires'
      ],
      // MISE À JOUR SELON L'IMAGE
      pricing: 'Accompagnement personnalisé', 
      color: 'from-indigo-500 to-indigo-700',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'abonnements',
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Abonnements Gros Volumes',
      subtitle: 'Réduisez vos coûts logistiques',
      description: 'Vous faites plus de 50 livraisons par mois ? Passez à l\'abonnement pour bloquer un tarif préférentiel et maximiser vos marges.',
      longDescription: 'L\'abonnement est la formule mathématique la plus rentable pour les restaurants et les gros e-commerçants. Nous définissons ensemble un volume mensuel et un tarif fixe par course, bien en dessous du prix public.',
      advantages: [
        'Tarifs négociés ultra-compétitifs',
        'Budget logistique maîtrisé',
        'Pas de surprise de majoration',
        'Livreurs habitués à vos produits',
        'Reporting mensuel détaillé',
        'Flexibilité selon les saisons'
      ],
      useCases: [
        'Restaurants (Livraison repas midi/soir)',
        'Supermarchés en ligne',
        'Distributeurs de boissons',
        'Pressings et blanchisseries',
        'Services d\'abonnement'
      ],
      pricing: 'Sur étude de volume',
      color: 'from-[#F4B223] to-[#D4920F]',
      bgColor: 'bg-yellow-50'
    }
  ];

  // MISE À JOUR DU TABLEAU COMPARATIF AVEC LES VRAIES DONNÉES
  const comparisonTable = [
    { feature: 'Prix de départ (Cotonou)', express: 'Standard + 50%', programmee: '700 FCFA', groupee: 'Sur devis' },
    { feature: 'Délai moyen', express: '30-45 min', programmee: 'Standard', groupee: 'J+1 / J+2' },
    { feature: 'Disponibilité', express: '24/24 (Nuit inclus)', programmee: '07h - 23h', groupee: 'Jours ouvrés' },
    { feature: 'Prise en charge', express: 'Immédiate', programmee: 'Sur créneau', groupee: 'Planifiée' },
    { feature: 'Type de besoin', express: 'Urgence absolue', programmee: 'Quotidien', groupee: 'Stock E-com' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#1B3A5F] to-[#2C5282] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F4B223' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="text-[#F4B223] font-bold text-sm uppercase tracking-wide">
              Nos Solutions
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-6 leading-tight">
              Services de Livraison Professionnels
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              Du particulier à l'entreprise, découvrez nos solutions de <strong>livraison express</strong>, 
              <strong> programmée</strong> et <strong>corporate</strong>. 
              <br/>
              Tarifs clairs à partir de <strong className="text-[#F4B223]">700 FCFA</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className="scroll-mt-32">
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Image/Icon Side */}
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className={`relative rounded-2xl ${service.bgColor} p-8 md:p-12 border-4 border-[#F4B223]`}>
                      <div className={`inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${service.color} text-white mb-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300`}>
                        {service.icon}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#1B3A5F] mb-3">
                        {service.title}
                      </h2>
                      <p className="text-xl text-[#F4B223] font-bold mb-6">
                        {service.subtitle}
                      </p>
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#1B3A5F]/10">
                        <p className="text-sm uppercase font-bold text-[#1B3A5F]/60 mb-1">Tarification</p>
                        <p className="text-xl md:text-2xl font-bold text-[#1B3A5F]">{service.pricing}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                        {service.description}
                      </p>
                      <p className="text-gray-600 leading-relaxed mb-8 text-base">
                        {service.longDescription}
                      </p>

                      <h3 className="text-xl font-bold text-[#1B3A5F] mb-4 flex items-center">
                        <span className="bg-[#F4B223] w-2 h-8 mr-3 rounded-full"></span>
                        Avantages clés
                      </h3>
                      <ul className="space-y-3 mb-8 grid sm:grid-cols-2 gap-x-4">
                        {service.advantages.map((advantage, idx) => (
                          <li key={idx} className="flex items-start space-x-3 text-sm">
                            <Check className="w-5 h-5 text-[#F4B223] flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{advantage}</span>
                          </li>
                        ))}
                      </ul>

                      <h3 className="text-xl font-bold text-[#1B3A5F] mb-4">
                        Cas d'usage idéaux
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-10">
                        {service.useCases.map((useCase, idx) => (
                          <span
                            key={idx}
                            className="bg-[#1B3A5F]/10 text-[#1B3A5F] px-3 py-1 rounded-full text-sm font-medium border border-[#1B3A5F]/20"
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          href="/tarifs#devis"
                          className="inline-flex items-center justify-center bg-[#F4B223] text-[#1B3A5F] px-6 py-3 rounded-lg font-bold hover:bg-[#D4920F] transition-all shadow-lg hover:shadow-xl"
                        >
                          Obtenir un devis
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link
                          href="/contact"
                          className="inline-flex items-center justify-center border-2 border-[#1B3A5F] text-[#1B3A5F] px-6 py-3 rounded-lg font-bold hover:bg-[#1B3A5F] hover:text-white transition-all"
                        >
                          Nous contacter
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B3A5F] mb-4">
              Comparatif Rapide
            </h2>
            <p className="text-lg text-gray-600">
              Trouvez le service adapté à vos besoins en un coup d'œil
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1B3A5F] text-white">
                  <tr>
                    <th className="px-6 py-5 text-left font-bold text-lg">Critère</th>
                    <th className="px-6 py-5 text-center font-bold text-lg bg-[#2C5282]">Express</th>
                    <th className="px-6 py-5 text-center font-bold text-lg">Standard</th>
                    <th className="px-6 py-5 text-center font-bold text-lg bg-[#2C5282]">Groupée</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonTable.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 font-bold text-[#1B3A5F]">{row.feature}</td>
                      <td className="px-6 py-5 text-center text-gray-700 font-medium bg-blue-50/30">{row.express}</td>
                      <td className="px-6 py-5 text-center text-gray-700">{row.programmee}</td>
                      <td className="px-6 py-5 text-center text-gray-700 bg-blue-50/30">{row.groupee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5F] to-[#2C5282] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[#F4B223] rounded-full opacity-10 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à expédier ?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
            Notre équipe est disponible <strong className="text-[#F4B223]">7j/7 de 09h00 à 23h00</strong> pour répondre à vos besoins de livraison. 
            Faites confiance aux pros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${phoneNumber.replace(/ /g, '')}`}
              className="inline-flex items-center justify-center bg-[#F4B223] text-[#1B3A5F] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#D4920F] transition-all transform hover:scale-105 shadow-xl"
            >
              <Phone className="mr-2" />
              Appeler
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-xl"
            >
              <MessageCircle className="mr-2" />
              WhatsApp
            </a>
            <Link
              href="/tarifs"
              className="inline-flex items-center justify-center bg-white text-[#1B3A5F] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}