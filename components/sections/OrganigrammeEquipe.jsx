'use client';
import { Users, ArrowRight, Lightbulb, Heart, Headphones, Truck, Wrench, Code, ChevronDown } from 'lucide-react';
import RecrutementForm from '@/components/forms/RecrutementForm';
import { useState } from 'react';

export default function OrganigrammeEquipe() {

  const [isOpen, setIsOpen] = useState(false);
  // Structure hiérarchique de l'équipe
  const direction = {
    nom: 'Fondateur & CEO',
    role: 'Vision & Stratégie',
    desc: 'Entrepreneur engagé pour une logistique urbaine durable et une expérience client exemplaire.',
    icon: <Lightbulb className="w-6 h-6" />
  };

  const managers = [
    {
      nom: 'Service Commercial',
      role: 'Relation Client & Développement B2B/B2C',
      desc: 'Gestion des relations clients, prospection et accompagnement commercial pour répondre aux besoins des particuliers et des entreprises.',
      icon: <Heart className="w-5 h-5" />,
      equipes: [
        {
          nom: 'Support Client 7j/7',
          role: 'Assistance & Suivi Continu',
          desc: 'Une équipe à votre écoute du lundi au dimanche pour répondre à toutes vos demandes.',
          icon: <Headphones className="w-5 h-5" />
        }
      ]
    },
    {
      nom: 'Service Opérationnel',
      role: 'Coordination & Supervision Terrain',
      desc: 'Organisation des tournées, contrôle qualité et optimisation des opérations pour garantir des livraisons rapides et fiables.',
      icon: <Truck className="w-5 h-5" />,
      equipes: [
        {
          nom: 'Service Maintenance',
          role: 'Maintenance & Optimisation de la Flotte Électrique',
          desc: 'Entretien, contrôle régulier et amélioration continue pour assurer la disponibilité maximale de nos motos électriques.',
          icon: <Wrench className="w-5 h-5" />
        },
        {
          nom: 'Service Livraison',
          role: 'Les As de la Route',
          desc: 'Livreurs professionnels, formés et équipés pour assurer un service impeccable, sécurisé et ponctuel.',
          icon: <Truck className="w-5 h-5" />
        }
      ]
    },
    {
      nom: 'Service Technologies & Solutions Digitales',
      role: 'Développement & Support Technique',
      desc: 'Une équipe dédiée à la conception, l\'amélioration et la maintenance de nos outils numériques, garantissant performance, sécurité et innovation au cœur de nos opérations.',
      icon: <Code className="w-5 h-5" />,
      equipes: []
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#1B3A5F] to-[#2C5282] text-white relative overflow-hidden">
      {/* Pattern décoratif */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F4B223' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-4">
            <Users className="w-4 h-4 text-[#F4B223]" />
            <span className="text-[#F4B223] font-bold text-xs uppercase tracking-wider">
              Notre Organisation
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Structure de Notre Équipe
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-sm">
            Une organisation claire pour un service optimal
          </p>
        </div>

        {/* Organigramme en cascade */}
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* NIVEAU 1 : Direction (CEO) - Centré */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-[#F4B223] to-yellow-600 rounded-2xl p-6 shadow-2xl border-2 border-yellow-400 w-full max-w-xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  {direction.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1B3A5F] leading-tight">
                    {direction.nom}
                  </h3>
                  <p className="text-sm font-semibold text-[#1B3A5F]/80">
                    {direction.role}
                  </p>
                </div>
              </div>
              <p className="hidden md:block text-xs text-[#1B3A5F]/90 leading-relaxed">
                {direction.desc}
              </p>
            </div>
          </div>

          {/* Indicateur visuel de hiérarchie */}
          <div className="flex justify-center">
            <ChevronDown className="w-8 h-8 text-[#F4B223] animate-bounce" />
          </div>

          {/* NIVEAU 2 & 3 : Managers et leurs équipes - En cascade avec indentation */}
          <div className="space-y-6">
            {managers.map((manager, idx) => (
              <div key={idx} className="space-y-4">
                {/* Manager - Légère indentation à gauche */}
                <div className="md:pl-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border-l-4 border-[#F4B223] hover:border-[#F4B223] hover:bg-white/15 transition-all shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F4B223] to-yellow-500 flex items-center justify-center shadow-lg flex-shrink-0">
                        {manager.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base md:text-lg font-bold leading-tight mb-1">
                          {manager.nom}
                        </h3>
                        <p className="text-xs md:text-sm text-[#F4B223] font-semibold mb-2">
                          {manager.role}
                        </p>
                        <p className="hidden md:block text-xs text-blue-100/80 leading-relaxed">
                          {manager.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Équipes sous ce manager - Plus d'indentation */}
                {manager.equipes.length > 0 && (
                  <div className="md:pl-20 space-y-3">
                    {manager.equipes.map((equipe, eIdx) => (
                      <div key={eIdx} className="relative">
                        {/* Petite ligne de connexion visuelle */}
                        <div className="hidden md:block absolute -left-6 top-6 w-4 h-0.5 bg-[#F4B223]/50"></div>
                        
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border-l-4 border-white/30 hover:border-[#F4B223]/50 transition-all">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F4B223]/70 to-yellow-500/70 flex items-center justify-center shadow-md flex-shrink-0">
                              {equipe.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold leading-tight mb-1">
                                {equipe.nom}
                              </h4>
                              <p className="text-xs text-[#F4B223]/90 font-semibold mb-1">
                                {equipe.role}
                              </p>
                              <p className="hidden md:block text-xs text-blue-100/70 leading-relaxed">
                                {equipe.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Stats rapides */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Livreurs Actifs', value: '5+', icon: <Truck className="w-5 h-5" /> },
              { label: 'Courses/Jour', value: '50+', icon: <Lightbulb className="w-5 h-5" /> },
              { label: 'Missions Réussies', value: '8000+', icon: <Heart className="w-5 h-5" /> },
              { label: 'Disponibilité', value: '24/7', icon: <Headphones className="w-5 h-5" /> }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center hover:bg-white/10 transition-all">
                <div className="flex justify-center mb-2 text-[#F4B223]">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs text-blue-100/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Rejoindre */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F4B223] to-yellow-500 flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Vous voulez rejoindre l'aventure ?</h3>
            </div>
            <p className="text-blue-100 text-sm mb-4 max-w-lg mx-auto">
              Nous recherchons constamment des livreurs motivés et professionnels
            </p>
            <button onClick={() => setIsOpen(true)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F4B223] hover:bg-[#D4920F] text-[#1B3A5F] font-bold rounded-lg transition-all shadow-lg hover:shadow-xl text-sm">
              Postuler maintenant
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <RecrutementForm open={isOpen} onOpenChange={setIsOpen} />
    </section>
  );
}