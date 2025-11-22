// Fichier: components/sections/home/Partners.jsx
'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Image from 'next/image';

export default function Partners() {
  const [partners, setPartners] = useState([]);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    async function fetchPartners() {
      const { data } = await supabase
        .from('partners')
        .select('*')
        .eq('is_active', true)
        .order('priority', { ascending: true });
      
      if (data && data.length > 0) {
        setPartners(data);
      }
    }
    fetchPartners();
  }, []);

  // Si aucun partenaire n'est dans la BDD, on ne retourne RIEN (section invisible)
  if (partners.length === 0) return null;

  return (
    <section className="py-10 border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">
          Ils nous font confiance pour leurs livraisons
        </p>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="relative h-12 w-32 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 flex items-center justify-center"
            >
              {partner.logo_url ? (
                <Image 
                  src={partner.logo_url} 
                  alt={partner.name} 
                  fill 
                  className="object-contain"
                />
              ) : (
                <span className="text-xl font-bold text-gray-400 hover:text-[#1B3A5F] transition-colors cursor-default">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}