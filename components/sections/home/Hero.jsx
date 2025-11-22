// Fichier: components/sections/home/Hero.jsx - VERSION DYNAMIQUE SUPABASE
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { supabase} from '@/lib/supabase';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Slides par défaut (fallback si BDD vide ou erreur)
  const defaultSlides = [
    {
      title: "Livraison Express à Cotonou",
      subtitle: "Vos colis livrés en 30 à 45 minutes partout à Cotonou",
      bgGradient: "from-[#1B3A5F] via-[#2C5282] to-[#1B3A5F]",
      image: "/livreur-moto.png",
      imageAlt: "Livreur professionnel sur moto électrique à Cotonou",
      cta1Text: "Commander maintenant",
      cta1Href: "https://wa.me/229XXXXXXXX?text=Bonjour,%20je%20souhaite%20commander%20une%20livraison%20express",
      cta2Text: "Obtenir un devis",
      cta2Href: "/contact"
    },
    {
      title: "Service de Livraison Écologique",
      subtitle: "Flotte de motos électriques pour un avenir durable au Bénin",
      bgGradient: "from-[#1B5E20] via-[#4CAF50] to-[#1B5E20]",
      image: "/moto-electrique.png",
      imageAlt: "Moto électrique de livraison écologique au Bénin",
      cta1Text: "Découvrir nos motos",
      cta1Href: "/services#ecologique",
      cta2Text: "En savoir plus",
      cta2Href: "/services"
    },
    {
      title: "Solutions pour Entreprises",
      subtitle: "Service de coursier professionnel et abonnements sur-mesure",
      bgGradient: "from-[#E65100] via-[#FF9800] to-[#E65100]",
      image: "/equipe-livraison.png",
      imageAlt: "Équipe de livreurs professionnels LE LIVREUR 2.0",
      cta1Text: "Abonnements pro",
      cta1Href: "/tarifs#entreprise",
      cta2Text: "Contactez-nous",
      cta2Href: "/contact"
    }
  ];

  // Fetch slides depuis l'API
  useEffect(() => {
    async function fetchSlides() {
      try {
        const response = await fetch('/api/hero-slides', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store', // Toujours récupérer les données fraîches
        });

        if (!response.ok) {
          throw new Error('Erreur lors du chargement des slides');
        }

        const data = await response.json();

        if (data.success && data.slides && data.slides.length > 0) {
          setSlides(data.slides);
        } else {
          // Utiliser les slides par défaut si rien en BDD
          setSlides(defaultSlides);
        }
      } catch (error) {
        console.error('Erreur fetch slides:', error);
        setSlides(defaultSlides);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSlides();
  }, []);

  // Navigation avec gestion de la transition
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

  // Auto-slide
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, slides.length]);

  // Gestion du clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Afficher loader pendant le chargement
  if (isLoading) {
    return (
      <section className="relative h-screen min-h-[700px] flex items-center justify-center bg-gradient-to-br from-[#1B3A5F] to-[#2C5282]">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F4B223] mx-auto mb-4" />
          <p className="text-lg">Chargement...</p>
        </div>
      </section>
    );
  }

  // Si aucun slide, afficher message
  if (slides.length === 0) {
    return (
      <section className="relative h-screen min-h-[700px] flex items-center justify-center bg-gradient-to-br from-[#1B3A5F] to-[#2C5282]">
        <div className="text-white text-center max-w-2xl px-4">
          <h1 className="text-4xl font-bold mb-4">LE LIVREUR 2.0</h1>
          <p className="text-xl">Service de livraison express à Cotonou</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden" aria-label="Carousel de présentation">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 z-10' 
                : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={index !== currentSlide}
          >
            {/* Structure de fond avec gradient */}
            <div className={`h-full relative bg-gradient-to-b lg:bg-gradient-to-r ${slide.bgGradient}`}>
              
              {/* Image mobile */}
              <div className="absolute left-0 right-0 lg:hidden" style={{ top: '80px', height: '320px' }}>
                <div className="relative w-full h-full">
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    className="object-cover object-center"
                    priority={index === 0}
                    sizes="100vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-current" />
                
                {/* Indicateurs flottants sur l'image (mobile) */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40 flex space-x-3 lg:hidden">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      disabled={isTransitioning}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentSlide 
                          ? 'bg-[#F4B223] w-8' 
                          : 'bg-white/60 w-2 hover:bg-white/80'
                      } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
                      aria-label={`Aller au slide ${idx + 1}`}
                      aria-current={idx === currentSlide}
                    />
                  ))}
                </div>
              </div>

              {/* Fond gradient mobile */}
              <div 
                className={`absolute inset-0 lg:hidden bg-gradient-to-b ${slide.bgGradient}`} 
                style={{ top: '392px' }} 
              />

              {/* Pattern décoratif desktop */}
              <div 
                className="absolute inset-0 opacity-10 hidden lg:block pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} 
              />

              {/* Contenu principal */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-20">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end lg:items-center h-full pb-16 lg:pb-0">
                  
                  {/* Spacer mobile */}
                  <div className="lg:hidden h-0" style={{ marginTop: '400px' }} />
                  
                  {/* Colonne texte */}
                  <div className="text-white space-y-4 lg:space-y-6">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl opacity-90 leading-relaxed max-w-2xl">
                      {slide.subtitle}
                    </p>
                    
                    {/* Boutons d'action */}
                    <div className="flex flex-row gap-3 lg:gap-4 pt-2">
                      <a
                        href={slide.cta1Href}
                        target={slide.cta1Href.startsWith('http') ? '_blank' : undefined}
                        rel={slide.cta1Href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="bg-[#F4B223] text-[#1B3A5F] hover:bg-[#D4920F] flex-1 px-4 py-3 lg:px-8 lg:py-4 rounded-lg font-bold text-sm lg:text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center shadow-xl group"
                      >
                        <span className="hidden sm:inline">{slide.cta1Text}</span>
                        <span className="sm:hidden">{slide.cta1Text.split(' ')[0]}</span>
                        <ChevronRight className="ml-1 lg:ml-2 w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                      {slide.cta2Text && (
                        <a
                          href={slide.cta2Href}
                          className="flex-1 border-2 border-white text-white px-4 py-3 lg:px-8 lg:py-4 rounded-lg font-bold text-sm lg:text-lg hover:bg-white hover:text-[#1B3A5F] transition-all duration-300 hover:scale-105 shadow-xl text-center"
                        >
                          <span className="hidden sm:inline">{slide.cta2Text}</span>
                          <span className="sm:hidden">{slide.cta2Text.split(' ')[0]}</span>
                        </a>
                      )}
                    </div>

                    {/* Preuve sociale */}
                    <div className="flex items-center gap-4 pt-4 lg:pt-6 pb-20 lg:pb-0 border-t border-white/20">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div 
                            key={i}
                            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white bg-[#F4B223] flex items-center justify-center text-[#1B3A5F] text-base"
                            aria-hidden="true"
                          >
                            {i === 1 ? '👤' : i === 2 ? '👨' : '👩'}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs lg:text-sm">
                        <p className="font-bold">500+ clients satisfaits</p>
                        <p className="opacity-75">Ce mois-ci</p>
                      </div>
                    </div>
                  </div>

                  {/* Image desktop */}
                  <div className="relative hidden lg:block">
                    <div className="relative h-[500px] w-full">
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/30 overflow-hidden">
                        <Image
                          src={slide.image}
                          alt={slide.imageAlt}
                          fill
                          className="object-cover rounded-2xl"
                          priority={index === 0}
                          sizes="(max-width: 1024px) 0px, 50vw"
                        />
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-2xl pointer-events-none" />
                    </div>

                    {/* Badge de livraison */}
                    <div className="absolute -bottom-6 -right-6 bg-[#F4B223] text-[#1B3A5F] px-6 py-4 rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                      <p className="text-sm font-semibold">Livraison en</p>
                      <p className="text-3xl font-bold">30-45 min</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contrôles de navigation (desktop uniquement) */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Slide suivant"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicateurs desktop */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-[#F4B223] w-12' 
                : 'bg-white/50 w-3 hover:bg-white/70'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label={`Aller au slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>

      {/* Indicateur de défilement */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30 animate-bounce hidden lg:block">
        <div className="flex flex-col items-center text-white">
          <span className="text-sm mb-2 opacity-75">Découvrir</span>
          <ChevronRight className="w-6 h-6 rotate-90" />
        </div>
      </div>
    </section>
  );
}