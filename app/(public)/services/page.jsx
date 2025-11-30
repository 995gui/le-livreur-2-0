// Fichier: app/services/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DevisForm from '@/components/forms/DevisForm';
import ContactForm from '@/components/forms/ContactForm';
import { Zap, Clock, Leaf, Package, Building2, TrendingUp, Check, ArrowRight, Phone, MessageCircle, Globe, MapPin, Truck, Shield } from 'lucide-react';

export default function ServicesPage() {
  // VOS VRAIES COORDONNÉES
  const phoneNumber = "+2290147042815"; // REMPLACEZ PAR LE VRAI
  const whatsappNumber = "2290147042815";   // REMPLACEZ PAR LE VRAI
  const [isDevisModalOpen, setIsDevisModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const services = [
    {
      id: 'express',
      icon: <Zap className="w-12 h-12" />,
      title: 'Livraison Express',
      subtitle: 'Disponibilité en soirée, week-ends & jours fériés',
      description: 'Votre colis est prioritaire. Un livreur est dépêché immédiatement pour une course directe sans détours.',
      longDescription: 'Le service Express est conçu pour les urgences absolues, les livraisons de nuit, de week-ends et de jours fériés. Votre commande passe avant toutes les autres avec une prise en charge immédiate.',
      advantages: [
        'Prise en charge immédiate',
        'Livraison directe (Point A -> Point B)',
        'Disponible soirée, week-ends & jours fériés',
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
      pricing: 'Majoration +50% sur tarif standard', 
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'programmee',
      icon: <Clock className="w-12 h-12" />,
      title: 'Livraison Standard / Programmée et/ou Groupée',
      subtitle: 'Le choix malin et économique',
      description: 'La solution idéale pour vos livraisons quotidiennes non-urgentes. Planifiez à l\'avance et bénéficiez des meilleurs tarifs.',
      longDescription: 'Notre service standard couvre tout Cotonou, Abomey-Calavi et environs. En planifiant vos courses ou en acceptant un délai standard, vous optimisez vos coûts logistiques.',
      advantages: [
        'Le tarif le plus économique du marché',
        'Créneaux horaires respectés',
        'Couverture Cotonou, Abomey-Calavi et environs',
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
      longDescription: 'LE LIVREUR 2.0 est pionnier dans la logistique verte du dernier kilomètre au Bénin. Nos motos électriques sont silencieuses et n\'émettent aucun gaz d\'échappement, idéales pour les zones résidentielles.',
      advantages: [
        'Zéro émission de CO2',
        'Zéro pollution sonore (Silencieux)',
        'Image de marque positive pour vous',
        'Accès facilité aux zones résidentielles',
        'Même efficacité que les motos thermiques',
        'Contribution à une ville plus Verte'
      ],
      useCases: [
        'Marques éthiques et bio',
        'Livraisons matinales (sans bruit)',
        'Entreprises RSE',
        'Zones hospitalières ou calmes',
        'Clients sensibles à l\'écologie'
      ],
      pricing: 'Même prix que le standard',
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-50'
    },
    {
      id: 'groupee',
      icon: <Package className="w-12 h-12" />,
      title: 'Livraison Groupée & Stockage',
      subtitle: 'La solution E-commerçants',
      description: 'Nous stockons, emballons & livrons. Une logistique complète pour les vendeurs en ligne hors du Bénin ou Cotonou/Abomey-Calvi qui veulent se libérer du stress tout en augmentant leurs ventes.',
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
      description: 'Un service premium pour les entreprises qui ont besoin de fiabilité absolue : facturation mensuelle, courses administratives, et confidentialité.',
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
              Service de Livraison Professionnel
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              Des particuliers aux entreprises, découvrez nos solutions de <strong>livraison express</strong>, 
              <strong> programmée</strong> et <strong>corporate</strong>. 
              <br/>
              Tarification transparente dès <strong className="text-[#F4B223]">700 FCFA</strong>.
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
                        <button
                          onClick={() => setIsDevisModalOpen(true)}
                          className="inline-flex items-center justify-center bg-[#F4B223] text-[#1B3A5F] px-6 py-3 rounded-lg font-bold hover:bg-[#D4920F] transition-all shadow-lg hover:shadow-xl"
                        >
                          Obtenir un devis
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
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

      {/* NOUVEAU SERVICE : EXPÉDITION COTONOU ↔ LOMÉ */}
      <section id="expedition-lome" className="py-20 bg-gradient-to-br from-[#1B3A5F] via-[#2C5282] to-[#1B3A5F] text-white relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#F4B223] rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F4B223] rounded-full opacity-10 blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#F4B223]/20 text-[#F4B223] px-6 py-2 rounded-full text-sm font-bold mb-6 border border-[#F4B223]/30">
              <Globe className="w-5 h-5" /> Service International
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Expédition Cotonou ↔ Lomé
            </h2>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Expédiez vos colis en toute confiance avec <strong className="text-[#F4B223]">LE LIVREUR 2.0</strong>
            </p>
          </div>

          {/* Description principale */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 border border-white/20">
            <p className="text-lg md:text-xl leading-relaxed text-center text-white/90">
              Notre service d'expédition transfrontalier entre <strong>Cotonou (Bénin)</strong> et <strong>Lomé (Togo)</strong> garantit 
              <strong className="text-[#F4B223]"> rapidité, sécurité et transparence totale</strong>. Grâce à nos départs réguliers, notre équipe professionnelle 
              et une logistique parfaitement structurée, vos colis arrivent à destination sans stress, en toute sécurité et dans les délais annoncés.
            </p>
          </div>

          {/* Grille des avantages */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">Nos Avantages</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: 'Départs réguliers',
                  description: 'Expéditions fréquentes dans les deux sens pour des délais réduits et un flux logistique continu.'
                },
                {
                  icon: <MapPin className="w-8 h-8" />,
                  title: 'Suivi en temps réel',
                  description: 'Notifications à chaque étape : collecte, transit, arrivée et livraison finale.'
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: 'Livraison sécurisée (0,1 à 50 kg)',
                  description: 'Colis scellés, vérifiés et manipulés avec soin pour une sécurité maximale.'
                },
                {
                  icon: <Truck className="w-8 h-8" />,
                  title: 'Collecte & ramassage',
                  description: 'Passages chaque Mardi et Jeudi, à domicile, en boutique ou en entrepôt.'
                },
                {
                  icon: <Check className="w-8 h-8" />,
                  title: 'Paiement simple',
                  description: 'Règlement à la collecte ou au ramassage, selon votre convenance.'
                },
                {
                  icon: <Package className="w-8 h-8" />,
                  title: 'Livraison directe',
                  description: 'Livraison du colis à domicile ou en point relais selon la localisation du destinataire.'
                }
              ].map((adv, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F4B223] rounded-full mb-4">
                    {adv.icon}
                  </div>
                  <h4 className="font-bold text-lg mb-2">{adv.title}</h4>
                  <p className="text-white/80 text-sm leading-relaxed">{adv.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Option Sourcing (mise en valeur spéciale) */}
          <div className="bg-[#F4B223] text-[#1B3A5F] rounded-3xl p-8 md:p-12 mb-16 shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#1B3A5F] text-[#F4B223] rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Option Sourcing Cotonou ↔ Lomé
                </h3>
                <p className="text-base md:text-lg leading-relaxed mb-6">
                  Nous pouvons également <strong>acheter, récupérer ou sourcer des produits</strong> pour vous auprès de fournisseurs, 
                  marchés, grossistes ou boutiques à Cotonou ou à Lomé.
                </p>
                <div className="bg-[#1B3A5F]/10 rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-3">Cette option vous permet de :</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>Gagner du temps et éviter les déplacements inutiles</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>Vous protéger contre les arnaques</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>Bénéficier de nos vérifications sur place et contrôle d'authenticité</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>Gestion directe de la transaction sécurisée</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm font-medium">
                    Vous recevez ensuite vos articles en toute sécurité, livrés chez vous via notre service d'expédition.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tarifs - Renvoi vers page tarifs */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 border border-white/20 text-center">
            <h3 className="text-3xl font-bold mb-4">Tarification</h3>
            <p className="text-lg mb-6 text-white/90">
              Des prix <strong className="text-[#F4B223]">simples, transparents et accessibles</strong> (sans frais cachés)
            </p>
            <div className="inline-block bg-white text-[#1B3A5F] rounded-2xl p-8 shadow-2xl">
              <p className="text-sm uppercase font-bold text-gray-500 mb-2">À partir de</p>
              <p className="text-4xl md:text-5xl font-bold text-[#F4B223] mb-4">5 000 FCFA</p>
              <p className="text-sm text-gray-600 mb-6">Selon le poids (0,1 à 50 kg)</p>
              <Link
                href="/tarifs#expedition-lome"
                className="inline-flex items-center justify-center bg-[#1B3A5F] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#2C5282] transition-all"
              >
                Voir la grille tarifaire complète
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Comment ça marche ? */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Contact', description: 'Via WhatsApp, site web, appel ou Messenger' },
                { step: '2', title: 'Collecte', description: 'Du colis Mardi ou Jeudi' },
                { step: '3', title: 'Enregistrement', description: '& sécurisation du colis' },
                { step: '4', title: 'Transit', description: 'Cotonou ↔ Lomé' },
                { step: '5', title: 'Notification', description: 'D\'arrivée à destination' },
                { step: '6', title: 'Livraison', description: 'À domicile ou point relais' }
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#F4B223] text-[#1B3A5F] rounded-full font-bold text-xl mb-4">
                      {item.step}
                    </div>
                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-white/80 text-sm">{item.description}</p>
                  </div>
                  {idx < 5 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-[#F4B223]">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA spécifique pour ce service */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 inline-block">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Prêt à expédier entre Cotonou et Lomé ?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#F4B223] text-[#1B3A5F] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#D4920F] transition-all transform hover:scale-105 shadow-xl"
                >
                  <MessageCircle className="mr-2" />
                  Commander sur WhatsApp
                </a>
                <a
                  href={`tel:${phoneNumber.replace(/ /g, '')}`}
                  className="inline-flex items-center justify-center bg-white text-[#1B3A5F] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
                >
                  <Phone className="mr-2" />
                  Appeler maintenant
                </a>
              </div>
            </div>
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
      <DevisForm open={isDevisModalOpen} onOpenChange={setIsDevisModalOpen} />
      <ContactForm open={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </div>
  );
}