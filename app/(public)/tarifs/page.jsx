// Fichier: app/tarifs/page.jsx
'use client'; // On passe en Client Component pour le fetch dynamique

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Check, X, Zap, Clock, Package, Building2, Crown, Star, TrendingUp, Phone, ArrowRight, MapPin } from 'lucide-react';
import DevisForm from '@/components/forms/DevisForm';

export default function TarifsPage() {
  const [tarifs, setTarifs] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
                  Livraisons Express, de Nuit (après 21h) ou le Week-end :<br/>
                  <strong className="text-white text-xl">+ 50% sur le tarif standard</strong>
                </p>
              </div>
            </div>
            <a 
              href="#devis" 
              className="bg-white text-[#1B3A5F] px-8 py-4 rounded-xl font-bold hover:bg-[#F4B223] transition-colors shadow-lg whitespace-nowrap"
            >
              Calculer mon prix
            </a>
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
                    <a href="#devis" className="block text-center w-full bg-gray-100 py-3 rounded-lg font-bold hover:bg-gray-200">Choisir</a>
                 </div>
              </div>
            ))}
           </div>
        </div>
      </section>

      {/* Formulaire Devis */}
      <section id="devis" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                <h2 className="text-3xl font-bold text-center text-[#1B3A5F] mb-8">Demandez votre Devis</h2>
                <DevisForm />
             </div>
        </div>
      </section>

    </div>
  );
}