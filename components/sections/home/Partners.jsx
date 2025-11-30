'use client';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Image from 'next/image';

function PartnerCard({ partner, index }) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setImageError(false);
    setIsLoading(true);
  }, [partner.logo_url]);

  const CardContent = () => {
    if (!partner.logo_url || imageError) {
      return (
        <div className="group relative px-8 py-6 rounded-2xl border-2 border-gray-200 bg-white hover:border-[#F4B223] transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
          <h3 className="text-xl font-bold text-gray-400 group-hover:text-[#1B3A5F] transition-colors duration-300 whitespace-nowrap">
            {partner.name}
          </h3>
        </div>
      );
    }

    return (
      <div 
        className="group relative flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Container avec taille fixe et uniforme */}
        <div className={`
          relative w-26 h-26 md:w-40 md:h-40 flex items-center justify-center
          rounded-2xl transition-all duration-500 overflow-hidden
          ${isHovered ? 'bg-gradient-to-br from-gray-50 to-white shadow-2xl scale-110' : 'bg-white/50'}
        `}>
          {/* Background blur effect */}
          {isHovered && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
          )}

          {/* Skeleton */}
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" 
                 style={{
                   backgroundSize: '200% 100%',
                   animation: 'shimmer 1.5s infinite'
                 }}
            />
          )}
          
          {/* Image avec padding uniforme */}
          <div className="relative w-full h-full p-8 z-10">
            <Image
              src={partner.logo_url}
              alt={`Logo de ${partner.name}`}
              fill
              sizes="(max-width: 768px) 144px, 160px"
              className={`
                object-contain transition-all duration-700 ease-out
                ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
                ${isHovered ? 'scale-110' : 'scale-100'}
              `}
              style={{ filter: isHovered ? 'none' : 'grayscale(20%)' }}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                console.error(`Erreur: ${partner.name}`);
                setImageError(true);
                setIsLoading(false);
              }}
              loading="lazy"
              quality={95}
            />
          </div>

          {/* Shine effect au hover */}
          {isHovered && (
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(244,178,35,0.3), transparent)',
                animation: 'shine 1.5s ease-in-out'
              }}
            />
          )}
        </div>

        {/* Tooltip au hover */}
        {isHovered && partner.website && (
          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-[#1B3A5F] text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-20 animate-fadeIn">
            Visiter le site
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#1B3A5F] rotate-45" />
          </div>
        )}
      </div>
    );
  };

  return partner.website ? (
    <a 
      href={partner.website} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#F4B223] focus:ring-offset-4 rounded-2xl"
      aria-label={`Visiter ${partner.name}`}
    >
      <CardContent />
    </a>
  ) : (
    <div className="flex-shrink-0">
      <CardContent />
    </div>
  );
}

export default function Partners() {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  const supabase = useMemo(
    () => createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ),
    []
  );

  const fetchPartners = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('partners')
        .select('*')
        .eq('is_active', true)
        .order('priority', { ascending: true });
      
      if (fetchError) throw fetchError;
      
      setPartners(data || []);
    } catch (err) {
      console.error('Erreur chargement partenaires:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 overflow-hidden bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="h-4 w-48 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-8 w-64 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
          <div className="flex gap-6 items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-36 h-36 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500 mb-4">Une erreur est survenue</p>
          <button 
            onClick={fetchPartners}
            className="px-6 py-3 bg-[#1B3A5F] text-white rounded-xl hover:bg-[#2a5080] transition-all duration-300 hover:shadow-lg"
          >
            Réessayer
          </button>
        </div>
      </section>
    );
  }

  if (partners.length === 0) return null;

  // Dupliquer les partenaires pour l'effet infini
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 md:py-24 overflow-hidden bg-white relative">
      {/* Gradient background subtil */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header avec effet moderne */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#F4B223]" />
              <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-[0.3em]">
                Partenaires
              </p>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#F4B223]" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#1B3A5F] via-[#2a5080] to-[#1B3A5F] bg-clip-text text-transparent mb-4">
            Ils nous font confiance
          </h2>
          
          <p className="text-gray-500 max-w-2xl mx-auto">
            Rejoignez les entreprises qui transforment leur activité avec nos solutions
          </p>
        </div>

        {/* Conteneur du carousel avec fade edges minimaux */}
        <div className="relative py-4">
          {/* Fade gauche - très réduit */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          
          {/* Fade droite - très réduit */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Carousel infini avec animation garantie */}
          <div className="overflow-hidden">
            <div 
              ref={scrollRef}
              className="flex gap-6 md:gap-8 items-center will-change-transform"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{
                animation: isPaused ? 'none' : `scroll-partners ${Math.max(partners.length * 2, 20)}s linear infinite`,
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <PartnerCard 
                  key={`${partner.id}-${index}`} 
                  partner={partner}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats badge moderne */}
        {partners.length > 3 && (
          <div className="text-center mt-20">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex -space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-75" />
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-150" />
              </div>
              <span className="text-base font-semibold text-gray-700">
                <span className="text-[#1B3A5F] font-bold">{partners.length}+</span> partenaires actifs
              </span>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes scroll-partners {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, 10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        .delay-75 {
          animation-delay: 75ms;
        }

        .delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </section>
  );
}