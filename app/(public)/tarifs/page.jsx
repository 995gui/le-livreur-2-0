// Fichier: app/tarifs/page.jsx
'use client'; // On passe en Client Component pour le fetch dynamique

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Check, X, Zap, Clock, Package, Building2, Crown, Star, TrendingUp, Phone, ArrowRight, MapPin } from 'lucide-react';
import DevisForm from '@/components/forms/DevisForm';
import Link from 'next/link';

export default function TarifsPage() {
  const [tarifs, setTarifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const phoneNumber = "01 47 04 28 15";
  const cleanPhone = "2290147042815";

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    async function fetchTarifs() {
      const { data } = await supabase
        .from('pricing_grid')
        .select('*')
        .order('priority', { ascending: true });
      setTarifs(data || []);
      setLoading(false);
    }
    fetchTarifs();
  }, []);

  // Séparation des données
  const tarifsCotonou = tarifs.filter(t => t.departure_zone === 'Cotonou');
  const tarifsCalavi = tarifs.filter(t => t.departure_zone === 'Calavi');

  // ... (Gardez ici la constante 'subscriptionPlans' identique à avant) ...
  // Je la remets pour que le fichier soit complet
  const subscriptionPlans = [
      {
        name: 'Pro / E-commerce',
        icon: <Zap className="w-8 h-8" />,
        price: 'Sur Devis',
        description: 'Pour les vendeurs en ligne avec volume régulier',
        features: [
          { text: 'Tarifs préférentiels au volume', included: true },
          { text: 'Livraisons illimitées', included: true },
          { text: 'Gestion des retours', included: true },
          { text: 'Suivi temps réel', included: true },
        ],
        color: 'from-blue-500 to-blue-600',
        popular: false
      },
      {
        name: 'Business',
        icon: <Building2 className="w-8 h-8" />,
        price: 'Sur Devis',
        description: 'Pour PME, Restaurants et Pharmacies',
        features: [
          { text: 'Gestionnaire de compte dédié', included: true },
          { text: 'Priorité absolue sur la flotte', included: true },
          { text: 'Facturation mensuelle unique', included: true },
          { text: 'Service coursier administratif', included: true },
        ],
        color: 'from-[#F4B223] to-[#D4920F]',
        popular: true
      },
      {
        name: 'Partenariat',
        icon: <Crown className="w-8 h-8" />,
        price: 'Sur Mesure',
        description: 'Contrats longue durée et gros volumes',
        features: [
          { text: 'Flotte dédiée (Livreurs exclusifs)', included: true },
          { text: 'Branding (Tenue/Moto à vos couleurs)', included: true },
          { text: 'Intégration API possible', included: true },
          { text: 'Couverture nationale', included: true },
        ],
        color: 'from-purple-500 to-purple-600',
        popular: false
      }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1B3A5F] to-[#2C5282] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[#F4B223] font-bold text-sm uppercase tracking-wide">
              Grille Tarifaire
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mt-2 mb-6">
              Tarifs Transparents
            </h1>
            <p className="text-xl opacity-90 leading-relaxed">
              À partir de <strong className="text-[#F4B223]">700 FCFA</strong>. Gérez vos tarifs en temps réel.
            </p>
          </div>
        </div>
      </section>

      {/* GRILLE TARIFAIRE DYNAMIQUE */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Colonne COTONOU */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-[#1B3A5F]">
              <div className="bg-gray-50 p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-[#1B3A5F] flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-[#1B3A5F]" />
                  Départs de COTONOU
                </h2>
              </div>
              <div className="p-6">
                {loading ? <p>Chargement...</p> : (
                  <ul className="space-y-4">
                    {tarifsCotonou.map((item) => (
                      <li key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0">
                        <span className="text-gray-700 font-medium">{item.destination}</span>
                        <span className="font-bold text-[#1B3A5F] bg-blue-50 px-3 py-1 rounded-full text-sm whitespace-nowrap ml-2">
                          {item.price_display}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Colonne CALAVI */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-[#F4B223]">
              <div className="bg-gray-50 p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-[#1B3A5F] flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-[#F4B223]" />
                  Départs de CALAVI
                </h2>
              </div>
              <div className="p-6">
                {loading ? <p>Chargement...</p> : (
                  <ul className="space-y-4">
                    {tarifsCalavi.map((item) => (
                      <li key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0">
                        <span className="text-gray-700 font-medium">{item.destination}</span>
                        <span className="font-bold text-[#1B3A5F] bg-yellow-50 px-3 py-1 rounded-full text-sm whitespace-nowrap ml-2">
                          {item.price_display}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* TARIFS EXPÉDITION COTONOU ↔ LOMÉ */}
          <section id="expedition-lome" className="mb-12 scroll-mt-20">
            <div className="bg-gradient-to-br from-[#1B3A5F] via-[#2C5282] to-[#1B3A5F] text-white rounded-3xl shadow-2xl overflow-hidden">
              
              {/* Header */}
              <div className="bg-white/10 backdrop-blur-sm p-8 border-b border-white/20">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-[#F4B223]/20 text-[#F4B223] px-4 py-1 rounded-full text-sm font-bold mb-3 border border-[#F4B223]/30">
                      🌍 Service International
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                      Expédition Cotonou ↔ Lomé
                    </h2>
                    <p className="text-lg text-white/90">
                      Service transfrontalier sécurisé • Départs réguliers Mardi & Jeudi
                    </p>
                  </div>
                  <Link
                    href="/services#expedition-lome"
                    className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-white/30 transition-all border border-white/30"
                  >
                    Voir les détails du service
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Grille Tarifaire */}
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {[
                    { weight: '0,1 – 17 kg', price: '5 000', description: 'Petits colis et documents' },
                    { weight: '17,1 – 34 kg', price: '7 500', description: 'Colis moyens' },
                    { weight: '34,1 – 50 kg', price: '10 000', description: 'Gros colis' }
                  ].map((tarif, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white text-[#1B3A5F] rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition-transform duration-300 border-2 border-[#F4B223]"
                    >
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                        Poids
                      </p>
                      <p className="text-2xl font-bold mb-3 text-[#1B3A5F]">
                        {tarif.weight}
                      </p>
                      <div className="h-1 w-12 bg-[#F4B223] mx-auto mb-4"></div>
                      <p className="text-4xl font-bold text-[#F4B223] mb-2">
                        {tarif.price}
                        <span className="text-lg ml-1">FCFA</span>
                      </p>
                      <p className="text-xs text-gray-500 font-medium mt-2">
                        {tarif.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 text-center">
                  <p className="text-white/90 mb-4 text-sm">
                    💡 <strong>Paiement simple :</strong> À la collecte ou au ramassage selon votre convenance
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={`https://wa.me/${cleanPhone}?text=Bonjour, je souhaite des informations sur l'expédition Cotonou ↔ Lomé`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-[#F4B223] text-[#1B3A5F] px-8 py-4 rounded-lg font-bold hover:bg-[#D4920F] transition-all shadow-lg"
                    >
                      Commander sur WhatsApp
                    </a>
                    <a
                      href={`tel:+${cleanPhone}`}
                      className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold hover:bg-white/30 transition-all border border-white/30"
                    >
                      <Phone className="mr-2 w-5 h-5" />
                      Appeler maintenant
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Majoration (Statique) */}
          <div className="bg-[#1B3A5F] text-white rounded-2xl p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
             {/* ... (Le code de la majoration reste identique, copiez-le de la version précédente) ... */}
             <div className="flex items-start gap-4">
              <div className="bg-[#F4B223] p-3 rounded-full text-[#1B3A5F]">
                <Star className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#F4B223] mb-2">Majoration Spéciale</h3>
                <p className="text-lg text-blue-100 max-w-2xl">
                  Livraisons Express, Nuit, Week-ends & Jours fériés (après 20h) :<br/>
                  <strong className="text-white text-xl">+ 50% sur le tarif standard</strong>
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-white text-[#1B3A5F] px-8 py-4 rounded-xl font-bold hover:bg-[#F4B223] transition-colors shadow-lg whitespace-nowrap"
            >
              Calculer mon prix
            </button>
          </div>

        </div>
      </section>

      {/* Subscription Plans (Le reste de la page reste identique) */}
      <section id="abonnements" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           {/* ... Copiez ici la section des cartes d'abonnement ... */}
            <div className="grid lg:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                  plan.popular ? 'ring-4 ring-[#F4B223]' : ''
                }`}
              >
                 {/* ... contenu carte ... */}
                 <div className={`bg-gradient-to-r ${plan.color} text-white p-8`}>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <span className="text-3xl font-bold">{plan.price}</span>
                 </div>
                 <div className="p-8">
                    <ul className="space-y-3 mb-6">
                        {plan.features.map((f, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-600">
                                <Check className="w-4 h-4 text-green-500 mr-2" /> {f.text}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setIsModalOpen(true)} className="block text-center w-full bg-gray-100 py-3 rounded-lg font-bold hover:bg-gray-200">Démarrer</button>
                 </div>
              </div>
            ))}
           </div>
        </div>
      </section>

      {/* Formulaire Devis */}
      <DevisForm open={isModalOpen} onOpenChange={setIsModalOpen} />

    </div>
  );
}