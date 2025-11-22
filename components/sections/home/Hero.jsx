// Fichier: components/sections/home/Hero.jsx - VERSION MOBILE OPTIMISÉE
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft, Loader2, Play, Phone } from 'lucide-react';
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
        console.error('Erreur fetch slides:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSlides();
  }, [supabase]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentSlide || slides.length === 0) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [currentSlide, isTransitioning, slides.length]);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  // Auto-play
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, slides.length]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#1B3A5F] to-[#2C5282]">
        <Loader2 className="w-12 h-12 animate-spin text-[#F4B223]" />
      </div>
    );
  }

  if (slides.length === 0) return null;

  // Helpers pour récupérer les données
  const getGradientStyle = (tailwindStr) => {
    if (!tailwindStr) return { background: 'linear-gradient(135deg, #1B3A5F, #2C5282)' };
    if (!tailwindStr.includes('[')) return {};

    const colors = tailwindStr
      .replace(/from-\[/g, '')
      .replace(/via-\[/g, '')
      .replace(/to-\[/g, '')
      .replace(/\]/g, '')
      .replace(/ /g, ', ');

    return { background: `linear-gradient(135deg, ${colors})` };
  };

  const getTitle = (s) => s.title || '';
  const getSubtitle = (s) => s.subtitle || '';
  const getImage = (s) => s.image_url || s.imageUrl || s.image || '';
  const getCta1Text = (s) => s.cta1_text || s.cta1Text || 'Commander';
  const getCta1Link = (s) => s.cta1_link || s.cta1Href || '/contact';
  const getCta2Text = (s) => s.cta2_text || s.cta2Text || '';
  const getCta2Link = (s) => s.cta2_link || s.cta2Href || '';

  return (
    <section className="relative h-screen min-h-[650px] lg:min-h-[700px] overflow-hidden">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const imgUrl = getImage(slide);
          const btn1Txt = getCta1Text(slide);
          const btn1Link = getCta1Link(slide);
          const btn2Txt = getCta2Text(slide);
          const btn2Link = getCta2Link(slide);
          const gradientStyle = getGradientStyle(slide.bg_gradient || slide.bgGradient);

          return (
            <div
              key={slide.id || index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div 
                className="h-full relative"
                style={Object.keys(gradientStyle).length > 0 ? gradientStyle : {}}
              >
                {/* Fallback gradient si vide */}
                <div className={`absolute inset-0 ${Object.keys(gradientStyle).length === 0 ? (slide.bg_gradient || 'bg-gradient-to-br from-[#1B3A5F] to-[#2C5282]') : ''}`} />

                {/* Pattern decoratif */}
                <div 
                  className="absolute inset-0 opacity-5 pointer-events-none" 
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
                  }} 
                />

                {/* ========== VERSION MOBILE OPTIMISÉE ========== */}
                <div className="lg:hidden h-full flex flex-col">
                  {/* Image en haut (compact) */}
                  <div className="relative h-[35vh] min-h-[250px] max-h-[300px] mt-16 overflow-hidden">
                    {imgUrl ? (
                      <>
                        <img 
                          src={imgUrl} 
                          alt={getTitle(slide)} 
                          className="w-full h-full object-cover"
                        />
                        {/* Overlay gradient vers le bas */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"></div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/10">
                        <div className="text-white/50 text-center">
                          <Play className="w-16 h-16 mx-auto mb-2" />
                          <p className="text-sm">Image non disponible</p>
                        </div>
                      </div>
                    )}

                    {/* Badge 30-45min flottant */}
                    <div className="absolute top-4 right-4 bg-[#F4B223] text-[#1B3A5F] px-4 py-2 rounded-lg shadow-xl backdrop-blur-sm">
                      <p className="text-xs font-semibold">Livraison en</p>
                      <p className="text-lg font-bold leading-tight">30-45 min</p>
                    </div>

                    {/* Indicateurs de slides flottants sur l'image */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                      {slides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => goToSlide(idx)}
                          className={`transition-all duration-300 rounded-full ${
                            idx === currentSlide 
                              ? 'w-8 h-2 bg-[#F4B223] shadow-lg' 
                              : 'w-2 h-2 bg-white/60 hover:bg-white/80 backdrop-blur-sm'
                          }`}
                          aria-label={`Aller au slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Contenu texte + CTA */}
                  <div className="flex-1 flex flex-col justify-between px-6 py-6 text-white">
                    {/* Texte */}
                    <div className="space-y-3">
                      <h1 className="text-3xl sm:text-4xl font-bold leading-tight drop-shadow-lg">
                        {getTitle(slide)}
                      </h1>
                      <p className="text-base sm:text-lg opacity-95 leading-relaxed max-w-lg drop-shadow-md">
                        {getSubtitle(slide)}
                      </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3 pt-4">
                      <a 
                        href={btn1Link} 
                        target={btn1Link.startsWith('http') ? '_blank' : undefined}
                        className="w-full bg-[#F4B223] text-[#1B3A5F] hover:bg-[#D4920F] px-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center shadow-2xl active:scale-[0.98] transition-transform"
                      >
                        {btn1Txt}
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </a>
                      
                      {btn2Txt && (
                        <a 
                          href={btn2Link}
                          className="w-full border-2 border-white text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#1B3A5F] flex items-center justify-center shadow-xl active:scale-[0.98] transition-all backdrop-blur-sm"
                        >
                          {btn2Txt}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* ========== VERSION DESKTOP (Inchangée) ========== */}
                <div className="hidden lg:block max-w-7xl mx-auto px-8 h-full relative z-20">
                  <div className="grid lg:grid-cols-2 gap-12 h-full items-center">
                    
                    {/* Texte Desktop */}
                    <div className="text-white space-y-6">
                      <h1 className="text-5xl xl:text-6xl font-bold leading-tight drop-shadow-lg">
                        {getTitle(slide)}
                      </h1>
                      <p className="text-xl opacity-95 max-w-2xl leading-relaxed drop-shadow-md">
                        {getSubtitle(slide)}
                      </p>
                      
                      <div className="flex gap-4 pt-4">
                        <a 
                          href={btn1Link} 
                          target={btn1Link.startsWith('http') ? '_blank' : undefined}
                          className="bg-[#F4B223] text-[#1B3A5F] hover:bg-[#D4920F] px-8 py-4 rounded-xl font-bold text-lg flex items-center shadow-2xl transition-transform hover:scale-105"
                        >
                          {btn1Txt}
                          <ChevronRight className="ml-2 w-5 h-5" />
                        </a>
                        {btn2Txt && (
                          <a 
                            href={btn2Link}
                            className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#1B3A5F] flex items-center shadow-xl transition-transform hover:scale-105"
                          >
                            {btn2Txt}
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Image Desktop */}
                    <div className="relative h-[550px]">
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/30 overflow-hidden shadow-2xl">
                        {imgUrl && (
                          <img 
                            src={imgUrl} 
                            alt={getTitle(slide)} 
                            className="w-full h-full object-cover"
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
      
      {/* Navigation Desktop */}
      <button 
        onClick={prevSlide} 
        className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30 text-white transition-all hover:scale-110 active:scale-95"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide} 
        className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30 text-white transition-all hover:scale-110 active:scale-95"
        aria-label="Slide suivant"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicateurs Desktop */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-30 gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide 
                ? 'w-12 h-3 bg-[#F4B223]' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Aller au slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}