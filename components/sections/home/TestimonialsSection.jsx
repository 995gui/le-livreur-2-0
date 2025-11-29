import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialsSection({ testimonials }) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Gestion du responsive
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= itemsPerView) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, itemsPerView]);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (testimonials.length === 0) return null;

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-[#1B3A5F] mb-12">
        Ce que disent nos clients
      </h2>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Buttons - Affichés seulement si plus de témoignages que la vue */}
        {testimonials.length > itemsPerView && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-50 text-[#1B3A5F] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#F4B223]"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-50 text-[#1B3A5F] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#F4B223]"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Testimonials Grid */}
        <div className="overflow-hidden px-2">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-50 text-left relative h-full hover:shadow-xl transition-shadow duration-300">
                  <Quote className="w-10 h-10 text-gray-100 absolute top-6 right-6" />
                  <div className="flex text-[#F4B223] mb-4 text-xl">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed min-h-[100px]">
                    "{t.content}"
                  </p>
                  <div>
                    <p className="font-bold text-[#1B3A5F]">{t.name}</p>
                    <p className="text-sm text-gray-400 uppercase tracking-wide">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicators - Affichés seulement si plus de témoignages que la vue */}
        {testimonials.length > itemsPerView && (
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(maxIndex + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F4B223] focus:ring-offset-2 ${
                  currentIndex === index
                    ? 'bg-[#F4B223] w-8 h-3'
                    : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
                }`}
                aria-label={`Aller au groupe ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Progress Bar (optionnel) */}
        {isAutoPlaying && testimonials.length > itemsPerView && (
          <div className="mt-6 max-w-xs mx-auto">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F4B223] transition-all duration-[5000ms] ease-linear"
                style={{
                  width: '100%',
                  animation: 'progress 5s linear infinite'
                }}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}