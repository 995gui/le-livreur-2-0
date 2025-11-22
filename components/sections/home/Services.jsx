// Fichier: components/sections/home/Services.jsx (Version Allégée "Teasing")
import { Zap, Leaf, Building2, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
  // On ne garde que les 3 piliers majeurs pour l'accueil
  const highlightedServices = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Livraison Express",
      description: "Urgence ? Nous livrons vos colis en 30 à 45 minutes chrono sur Cotonou.",
      features: ["Prise en charge immédiate", "Suivi GPS réel"],
      color: "from-blue-500 to-blue-600",
      link: "/services#express"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Livraison Écologique",
      description: "Optez pour une logistique verte avec notre flotte 100% électrique.",
      features: ["Zéro émission", "Image de marque positive"],
      color: "from-green-500 to-green-600",
      link: "/services#ecologique"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Solutions Entreprises",
      description: "Externalisez votre logistique : e-commerce, abonnements et courses régulières.",
      features: ["Tarifs pro", "Facturation mensuelle"],
      color: "from-purple-500 to-purple-600",
      link: "/services#entreprises"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête Simplifié */}
        <div className="text-center mb-12">
          <span className="text-[#F4B223] font-bold text-sm uppercase tracking-wide">
            Nos Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B3A5F] mt-2 mb-4">
            Une solution pour chaque besoin
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Du pli urgent à la gestion complète de vos livraisons e-commerce.
          </p>
        </div>

        {/* Grille 3 colonnes (Plus aérée) */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {highlightedServices.map((service, index) => (
            <div
              key={index}
              className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 relative overflow-hidden"
            >
              {/* Petite barre de couleur au survol */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />

              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-[#1B3A5F] mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-500">
                    <Check className="w-4 h-4 text-[#F4B223] mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gros Bouton "Voir Tout" (Le Teasing) */}
        <div className="text-center">
          <Link 
            href="/services"
            className="inline-flex items-center justify-center bg-[#1B3A5F] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#F4B223] hover:text-[#1B3A5F] transition-all duration-300 shadow-lg group"
          >
            Voir tous nos services
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}