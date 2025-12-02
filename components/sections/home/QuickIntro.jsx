import { TrendingUp, Shield, Clock, Zap } from 'lucide-react';
import Link from 'next/link';

export default function QuickIntro() {
  const stats = [
    { 
      icon: <TrendingUp className="w-8 h-8" />,
      number: "500+", 
      label: "Livraisons par mois",
      color: "from-blue-500 to-blue-600"
    },
    { 
      icon: <Clock className="w-8 h-8" />,
      number: "30min", 
      label: "Temps moyen",
      color: "from-yellow-500 to-yellow-600"
    },
    { 
      icon: <Zap className="w-8 h-8" />,
      number: "7j/7", 
      label: "Service disponible",
      color: "from-green-500 to-green-600"
    },
    { 
      icon: <Shield className="w-8 h-8" />,
      number: "100%", 
      label: "Traçabilité",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative p-6 md:p-8 text-center">
                <div className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${stat.color} text-white mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#1B3A5F] mb-2 group-hover:text-[#F4B223] transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement (Version Centrée - Sans doublon) */}
        <div className="bg-gradient-to-r from-[#1B3A5F] to-[#2C5282] rounded-2xl p-8 md:p-16 text-white shadow-xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Notre Mission
          </h3>
          <p className="text-lg md:text-xl leading-relaxed opacity-90 mb-10 max-w-3xl mx-auto">
            Offrir un service de livraison rapide, fiable et durable, en combinant digitalisation et mobilité électrique pour faciliter le commerce local et améliorer la qualité de vie urbaine.
          </p>
          
          {/* Tags visuels */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold border border-[#F4B223] text-[#F4B223]">
              🚀 Rapide
            </span>
            <span className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold border border-[#F4B223] text-[#F4B223]">
              🔒 Sécurisé
            </span>
            <span className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold border border-[#F4B223] text-[#F4B223]">
              🌿 Écologique
            </span>
            <span className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold border border-[#F4B223] text-[#F4B223]">
              💼 Professionnel
            </span>
          </div>

          <Link 
            href="/a-propos"
            className="inline-block bg-white text-[#1B3A5F] px-8 py-3 rounded-lg font-bold hover:bg-[#F4B223] transition-colors shadow-lg"
          >
            Découvrir notre histoire
          </Link>
        </div>
      </div>
    </section>
  );
}