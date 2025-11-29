// Fichier: components/sections/home/Advantages.jsx - NOUVELLE VERSION UI
'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import TestimonialsSection from '@/components/sections/home/TestimonialsSection';
import DevisForm from '@/components/forms/DevisForm';
import { 
  CheckCircle, MapPin, Clock, Shield, 
  Users, Smartphone, Award, Quote 
} from 'lucide-react';
import Link from 'next/link';

export default function Advantages() {
  const [testimonials, setTestimonials] = useState([]);
  const [isDevisModalOpen, setIsDevisModalOpen] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    async function fetchTestimonials() {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
        // ⬆️ J'ai retiré le .limit(3)
      setTestimonials(data || []);
    }
    fetchTestimonials();
  }, []);

  const advantages = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Rapidité Éclair",
      description: "Livraison express garantie sous 30 à 45 minutes."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "100% Sécurisé",
      description: "Vos colis sont assurés et suivis en temps réel."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Livreurs Formés",
      description: "Une équipe professionnelle, polie et en uniforme."
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Large Couverture",
      description: "Tout Cotonou, Abomey-Calavi et les environs."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- PARTIE 1 : LES ATOUTS (GRILLE MODERNE) --- */}
        <div className="text-center mb-16">
          <span className="text-[#F4B223] font-bold text-sm uppercase tracking-wide">
            Nos Engagements
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B3A5F] mt-2">
            L'Excellence Logistique
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {advantages.map((adv, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-[#1B3A5F] rounded-full shadow-sm mb-4">
                {adv.icon}
              </div>
              <h3 className="font-bold text-lg text-[#1B3A5F] mb-2">{adv.title}</h3>
              <p className="text-gray-600 text-sm">{adv.description}</p>
            </div>
          ))}
        </div>

        {/* --- PARTIE 2 : OFFRE ENTREPRISE (MISE EN VALEUR) --- */}
        <div className="bg-[#1B3A5F] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-20">
          {/* Cercle décoratif */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#F4B223] opacity-10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#F4B223]/20 text-[#F4B223] px-4 py-1 rounded-full text-sm font-bold mb-6">
                <Award className="w-4 h-4" /> Offre Business
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Vous êtes une entreprise ?
              </h3>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Profitez de tarifs préférentiels, d'une facturation mensuelle simplifiée et d'un gestionnaire de compte dédié pour toutes vos courses.
              </p>
              <button 
                onClick={() => setIsDevisModalOpen(true)}
                className="inline-flex items-center bg-[#F4B223] text-[#1B3A5F] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#D4920F] transition-colors shadow-lg"
              >
                Obtenir un devis pro
              </button>
            </div>
            {/* Liste des avantages Pro */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <ul className="space-y-4">
                <li className="flex items-center text-white">
                  <CheckCircle className="w-6 h-6 text-[#F4B223] mr-3 flex-shrink-0" />
                  <span className="text-lg">Courses illimitées</span>
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-6 h-6 text-[#F4B223] mr-3 flex-shrink-0" />
                  <span className="text-lg">Priorité absolue</span>
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-6 h-6 text-[#F4B223] mr-3 flex-shrink-0" />
                  <span className="text-lg">Facturation fin de mois</span>
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-6 h-6 text-[#F4B223] mr-3 flex-shrink-0" />
                  <span className="text-lg">Tarifs sur mesure</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- PARTIE 3 : TÉMOIGNAGES DYNAMIQUES --- */}
        {testimonials.length > 0 && (
          <TestimonialsSection testimonials={testimonials} />
        )}
        <DevisForm open={isDevisModalOpen} onOpenChange={setIsDevisModalOpen} />
      </div>
    </section>
  );
}