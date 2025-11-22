// Fichier: components/sections/home/Hero.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    async function fetchSlides() {
      try {
        const { data, error } = await supabase
          .from('hero_slides')
          .select('*')
          .eq('is_active', true)
          .order('priority', { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) setSlides(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSlides();
  }, []);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentSlide || slides.length === 0) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [currentSlide, isTransitioning, slides.length]);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, slides.length]);

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-[#1B3A5F]"><Loader2 className="animate-spin text-[#F4B223]" /></div>;
  if (slides.length === 0) return null;

  // --- FONCTIONS DE NETTOYAGE (Le "Fix" pour les couleurs) ---
  
  // Convertit "from-[#123] via-[#456] to-[#789]" en "linear-gradient(to right, #123, #456, #789)"
  const getGradientStyle = (tailwindStr) => {
    if (!tailwindStr) return { background: 'linear-gradient(to right, #1B3A5F, #2C5282)' };
    
    // Si c'est déjà un style simple (pas de crochets)
    if (!tailwindStr.includes('[')) return {}; 

    const colors = tailwindStr
      .replace(/from-\[/g, '') // Enlève "from-["
      .replace(/via-\[/g, '')  // Enlève "via-["
      .replace(/to-\[/g, '')   // Enlève "to-["
      .replace(/\]/g, '')      // Enlève "]"
      .replace(/ /g, ', ');    // Remplace espaces par virgules

    // On force le style CSS directement
    return { background: `linear-gradient(to right, ${colors})` };
  };

  const getTitle = (s) => s.title || '';
  const getSubtitle = (s) => s.subtitle || '';
  const getImage = (s) => s.image_url || s.imageUrl || s.image || '';
  const getCta1Text = (s) => s.cta1_text || s.cta1Text || 'Commander';
  const getCta1Link = (s) => s.cta1_link || s.cta1Href || '#';
  const getCta2Text = (s) => s.cta2_text || s.cta2Text || '';
  const getCta2Link = (s) => s.cta2_link || s.cta2Href || '';

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const imgUrl = getImage(slide);
          const btn1Txt = getCta1Text(slide);
          const btn1Link = getCta1Link(slide);
          const btn2Txt = getCta2Text(slide);
          const btn2Link = getCta2Link(slide);
          
          // Calcul du style de gradient dynamique
          const gradientStyle = getGradientStyle(slide.bg_gradient || slide.bgGradient);

          return (
            <div
              key={slide.id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* On applique le style ici directement via l'attribut style={} */}
              <div 
                className="h-full relative"
                style={Object.keys(gradientStyle).length > 0 ? gradientStyle : {}} 
              >
                {/* Fallback si le gradientStyle est vide (cas des classes Tailwind standard) */}
                 <div className={`absolute inset-0 ${Object.keys(gradientStyle).length === 0 ? (slide.bg_gradient || 'bg-blue-900') : ''}`} />

                {/* Image Mobile */}
                <div className="absolute left-0 right-0 lg:hidden" style={{ top: '80px', height: '320px' }}>
                  <div className="relative w-full h-full">
                    {imgUrl && (
                      <img 
                        src={imgUrl} 
                        alt={getTitle(slide)} 
                        className="object-cover w-full h-full" 
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-current" />
                </div>

                <div className="absolute inset-0 opacity-10 hidden lg:block pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-20">
                  <div className="grid lg:grid-cols-2 gap-8 h-full pb-16 lg:pb-0 items-end lg:items-center">
                    
                    <div className="lg:hidden h-0" style={{ marginTop: '400px' }} />
                    
                    {/* Texte */}
                    <div className="text-white space-y-4 lg:space-y-6">
                      <h1 className="text-4xl lg:text-6xl font-bold leading-tight drop-shadow-md">{getTitle(slide)}</h1>
                      <p className="text-lg lg:text-xl opacity-90 max-w-2xl drop-shadow-sm">{getSubtitle(slide)}</p>
                      
                      <div className="flex flex-row gap-3 pt-2">
                        <a href={btn1Link} target={btn1Link.startsWith('http') ? '_blank' : undefined} className="bg-[#F4B223] text-[#1B3A5F] hover:bg-[#D4920F] flex-1 px-6 py-3 rounded-lg font-bold text-lg flex items-center justify-center shadow-xl transition-transform hover:scale-105">
                          {btn1Txt} <ChevronRight className="ml-2 w-5 h-5" />
                        </a>
                        {btn2Txt && (
                          <a href={btn2Link} className="flex-1 border-2 border-white text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1B3A5F] flex items-center justify-center shadow-xl transition-transform hover:scale-105">
                            {btn2Txt}
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Image Desktop (Utilisation de <img> standard pour éviter les erreurs Next/Supabase) */}
                    <div className="relative hidden lg:block h-[500px]">
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/30 overflow-hidden">
                        {imgUrl && (
                          <img 
                            src={imgUrl} 
                            alt={getTitle(slide)} 
                            className="object-cover w-full h-full" 
                          />
                        )}
                      </div>
                      <div className="absolute -bottom-6 -right-6 bg-[#F4B223] text-[#1B3A5F] px-6 py-4 rounded-xl shadow-2xl transform rotate-3">
                        <p className="text-sm font-semibold">Livraison en</p>
                        <p className="text-3xl font-bold">30-45 min</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <button onClick={prevSlide} className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 p-3 rounded-full hover:bg-white/30 text-white"><ChevronLeft /></button>
      <button onClick={nextSlide} className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 p-3 rounded-full hover:bg-white/30 text-white"><ChevronRight /></button>
    </section>
  );
}