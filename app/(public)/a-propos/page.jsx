// Fichier: app/a-propos/page.jsx - VERSION AMÉLIORÉE
import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Target, Eye, ShieldCheck, Award, Rocket, CheckCircle, 
  Truck, Zap, Leaf, Users, Heart, TrendingUp, MapPin,
  Clock, Package, Star, Lightbulb, ArrowRight
} from 'lucide-react';
import Cta from '@/components/sections/home/Cta';

export const metadata = {
  title: 'À Propos - Notre Histoire & Valeurs | LE LIVREUR 2.0',
  description: '1 an d\'engagement, 200 000 km parcourus, 8 000 missions réussies. Découvrez l\'équipe qui révolutionne la livraison à Cotonou avec passion et professionnalisme.',
  keywords: 'à propos LE LIVREUR 2.0, histoire livraison Cotonou, valeurs entreprise, équipe livraison Bénin',
  openGraph: {
    title: 'À Propos de LE LIVREUR 2.0 - Révolution de la Livraison au Bénin',
    description: '1 an de folie, 8000+ missions réussies, une équipe passionnée',
    type: 'website',
  }
};

// ✅ Stats enrichies avec animations
const stats = [
  { 
    label: 'Missions réussies', 
    value: '8 000+', 
    icon: <CheckCircle className="w-6 h-6" />,
    color: 'from-green-500 to-green-600',
    description: 'Livraisons effectuées'
  },
  { 
    label: 'Kilomètres parcourus', 
    value: '200 000', 
    icon: <Truck className="w-6 h-6" />,
    color: 'from-blue-500 to-blue-600',
    description: 'En mode électrique'
  },
  { 
    label: 'CO₂ évité', 
    value: '22 tonnes', 
    icon: <Leaf className="w-6 h-6" />,
    color: 'from-green-400 to-emerald-500',
    description: 'Impact environnemental'
  },
  { 
    label: 'Expérience', 
    value: '1 an', 
    icon: <Award className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-500',
    description: 'De croissance intense'
  },
];

// ✅ Valeurs enrichies
const valeurs = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    titre: 'Fiabilité',
    desc: 'Nous tenons nos promesses. Chaque colis est traité avec le plus grand soin, comme si c\'était le nôtre.',
    color: 'blue',
    stat: '98% de satisfaction'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    titre: 'Rapidité',
    desc: 'L\'optimisation de nos trajets nous permet de livrer en moins de 45 minutes dans Cotonou.',
    color: 'yellow',
    stat: '<45min en moyenne'
  },
  {
    icon: <Heart className="w-8 h-8" />,
    titre: 'Passion',
    desc: 'Au-delà du métier, c\'est une vocation. Nous aimons ce que nous faisons et ça se voit.',
    color: 'red',
    stat: '5 As de la route'
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    titre: 'Écoresponsabilité',
    desc: 'Une flotte 100% électrique pour un air plus pur et un Bénin plus vert.',
    color: 'green',
    stat: '100% électrique'
  },
];

// ✅ Timeline de l'entreprise
const timeline = [
  {
    date: 'Décembre 2023',
    titre: 'Le Lancement',
    desc: '1er livreur, 1er client, 1ère mission. L\'aventure commence à Cotonou.',
    icon: <Rocket className="w-5 h-5" />
  },
  {
    date: 'Mars 2024',
    titre: 'Passage à l\'Électrique',
    desc: 'Acquisition de notre première flotte 100% électrique pour réduire notre empreinte carbone.',
    icon: <Zap className="w-5 h-5" />
  },
  {
    date: 'Juin 2024',
    titre: '5 000 Missions',
    desc: 'Franchissement du cap des 5000 livraisons réussies. L\'équipe s\'agrandit à 3 livreurs.',
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    date: 'Décembre 2024',
    titre: 'Aujourd\'hui',
    desc: '8000+ missions, 5 livreurs professionnels, des dizaines de partenaires satisfaits.',
    icon: <Star className="w-5 h-5" />
  },
];

// ✅ Équipe (à personnaliser)
const equipe = [
  {
    nom: 'Fondateur & CEO',
    role: 'Vision & Stratégie',
    desc: 'Entrepreneur passionné par la logistique urbaine',
    icon: <Lightbulb className="w-6 h-6" />
  },
  {
    nom: 'Les As de la Route',
    role: '5 Livreurs Professionnels',
    desc: 'Formés, équipés et motivés à 100%',
    icon: <Users className="w-6 h-6" />
  },
  {
    nom: 'Support Client',
    role: 'Service 7j/7',
    desc: 'Une équipe à votre écoute du lundi au dimanche',
    icon: <Heart className="w-6 h-6" />
  },
];

const colorClasses = {
  blue: 'from-blue-500 to-blue-600',
  yellow: 'from-yellow-500 to-yellow-600',
  red: 'from-red-500 to-red-600',
  green: 'from-green-500 to-green-600',
};

export default function AProposPage() {
  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#1B3A5F] via-[#2C5282] to-[#1B3A5F] text-white overflow-hidden">
        {/* Pattern décoratif */}
        <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F4B223' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        {/* Particules flottantes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#F4B223] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenu gauche */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#F4B223]/20 backdrop-blur-sm px-4 py-2 rounded-full border border-[#F4B223]/30 mb-6">
                <Rocket className="w-4 h-4 text-[#F4B223]" />
                <span className="text-[#F4B223] font-bold text-sm uppercase tracking-wide">
                  Notre Histoire
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-[#F4B223]">1 an</span> de folie,<br/>
                et ce n'est que<br/>
                <span className="bg-gradient-to-r from-[#F4B223] to-yellow-300 bg-clip-text text-transparent">
                  le début !
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                De <strong className="text-white">1 à 5 "As de la route"</strong>, nous avons bâti une dream team à votre service. 
                Plus qu'une agence de livraison, nous sommes une <strong className="text-[#F4B223]">révolution logistique</strong> à Cotonou.
              </p>
              
              {/* CTA rapides */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link 
                  href="/devis"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#F4B223] hover:bg-[#D4920F] text-[#1B3A5F] font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Demander un devis
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg transition-all"
                >
                  Nous contacter
                </Link>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 hover:bg-white/15 transition-all group"
                  >
                    <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3 text-white group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-blue-200 font-semibold">{stat.label}</div>
                    <div className="text-xs text-blue-300 mt-1">{stat.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image droite */}
            <div className="relative h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-[#F4B223] group">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center text-center p-8">
                  <div className="space-y-4">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                      <Truck className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-white font-bold text-2xl">Image "1 an à vos côtés"</p>
                    <p className="text-white/90 text-sm max-w-xs mx-auto">
                      Remplacez par : Photo du livreur souriant sur sa moto électrique, avec le logo LE LIVREUR 2.0
                    </p>
                    <p className="text-xs text-white/70 mt-4">
                      Chemin: /public/images/about-hero.jpg
                    </p>
                  </div>
               </div>
               {/* Décommenter quand l'image est disponible */}
               {/* <Image src="/images/about-hero.jpg" alt="Équipe LE LIVREUR 2.0" fill className="object-cover group-hover:scale-105 transition-transform duration-500" /> */}
               
               {/* Badge flottant */}
               <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                 <p className="text-sm font-bold text-[#1B3A5F]">⭐ 4.9/5 - 200+ avis</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MISSION & VISION ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-50 text-blue-700 font-bold text-sm uppercase tracking-wider rounded-full">
              Notre Raison d'Être
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1B3A5F] mb-6">
              La Révolution Logistique
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              LE LIVREUR 2.0 est né d'une ambition simple mais puissante : offrir une logistique urbaine 
              <strong className="text-[#1B3A5F]"> fiable</strong>, 
              <strong className="text-[#1B3A5F]"> rapide</strong> et 
              <strong className="text-[#1B3A5F]"> écologique</strong>. 
              Nous connectons les e-commerçants, restaurateurs et entrepreneurs à leurs clients avec professionnalisme et sourire.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 p-8 md:p-10 rounded-2xl border-2 border-blue-200 overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1B3A5F] mb-4">Notre Mission</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Offrir un service de livraison hautement performant, alliant <strong>rapidité</strong>, <strong>sécurité</strong> et <strong>transparence</strong>, 
                  afin d'améliorer la mobilité des marchandises en zone urbaine.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-700 font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Performance garantie</span>
                </div>
              </div>
            </div>
            
            {/* Vision */}
            <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 p-8 md:p-10 rounded-2xl border-2 border-orange-200 overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-lg">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1B3A5F] mb-4">Notre Vision</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Devenir le <strong>réseau de livreurs professionnels le plus fiable</strong> du Bénin et de la sous-région CEDEAO, 
                  en intégrant la logistique moderne et la digitalisation.
                </p>
                <div className="flex items-center gap-2 text-sm text-orange-700 font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  <span>Expansion régionale en cours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TIMELINE ========== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-[#F4B223]/10 text-[#1B3A5F] font-bold text-sm uppercase tracking-wider rounded-full">
              Notre Parcours
            </div>
            <h2 className="text-4xl font-bold text-[#1B3A5F] mb-4">
              1 An en 4 Étapes Clés
            </h2>
            <p className="text-gray-600">
              De l'idée à la réalité, voici notre aventure
            </p>
          </div>

          <div className="relative">
            {/* Ligne verticale centrale */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-200 via-[#F4B223] to-green-200"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`relative flex items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
                >
                  {/* Contenu */}
                  <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className="inline-block mb-2 px-3 py-1 bg-[#F4B223]/10 text-[#F4B223] text-xs font-bold uppercase tracking-wider rounded-full">
                        {item.date}
                      </div>
                      <h3 className="text-xl font-bold text-[#1B3A5F] mb-2">{item.titre}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>

                  {/* Point central */}
                  <div className="hidden md:flex w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full items-center justify-center text-white shadow-lg ring-4 ring-white z-10">
                    {item.icon}
                  </div>

                  {/* Espace vide pour alignement */}
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== VALEURS ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-green-50 text-green-700 font-bold text-sm uppercase tracking-wider rounded-full">
              Ce Qui Nous Anime
            </div>
            <h2 className="text-4xl font-bold text-[#1B3A5F] mb-4">
              Nos 4 Piliers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des valeurs qui guident chacune de nos décisions et actions au quotidien
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valeurs.map((valeur, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-[#F4B223] overflow-hidden"
              >
                {/* Background gradient au hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[valeur.color]} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                
                <div className="relative z-10">
                  <div className={`bg-gradient-to-r ${colorClasses[valeur.color]} w-16 h-16 rounded-xl flex items-center justify-center mb-5 text-white group-hover:scale-110 transition-transform shadow-lg`}>
                    {valeur.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1B3A5F] mb-3">
                    {valeur.titre}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {valeur.desc}
                  </p>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#F4B223]">
                      {valeur.stat}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ÉQUIPE ========== */}
      <section className="py-20 bg-gradient-to-br from-[#1B3A5F] to-[#2C5282] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 font-bold text-sm uppercase tracking-wider rounded-full">
              Notre Force
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Une Équipe Passionnée
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Des professionnels dévoués qui font la différence chaque jour
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {equipe.map((membre, idx) => (
              <div 
                key={idx}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all text-center"
              >
                <div className="bg-gradient-to-r from-[#F4B223] to-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-white shadow-lg">
                  {membre.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{membre.nom}</h3>
                <p className="text-[#F4B223] font-semibold text-sm mb-3">{membre.role}</p>
                <p className="text-blue-100 text-sm">{membre.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Rejoindre */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <Users className="w-12 h-12 text-[#F4B223] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Vous voulez rejoindre l'aventure ?</h3>
              <p className="text-blue-100 mb-6 max-w-md mx-auto">
                Nous recherchons constamment des livreurs motivés et professionnels
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F4B223] hover:bg-[#D4920F] text-[#1B3A5F] font-bold rounded-lg transition-colors shadow-lg"
              >
                Postuler maintenant
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== IMPACT ========== */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-green-100 text-green-700 font-bold text-sm uppercase tracking-wider rounded-full">
                Notre Impact
              </div>
              <h2 className="text-4xl font-bold text-[#1B3A5F] mb-6">
                Livrer Vite,<br/>Polluer Moins
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                En choisissant une flotte 100% électrique, nous contribuons activement à la réduction de la pollution atmosphérique à Cotonou.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-green-200">
                  <div className="bg-green-100 rounded-lg p-2">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1B3A5F] mb-1">22 tonnes de CO₂ évitées</h4>
                    <p className="text-sm text-gray-600">Équivalent à 110 arbres plantés</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-green-200">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1B3A5F] mb-1">200 000 km en électrique</h4>
                    <p className="text-sm text-gray-600">Zéro émission directe de CO₂</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-green-200">
                  <div className="bg-yellow-100 rounded-lg p-2">
                    <Heart className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1B3A5F] mb-1">Un air plus pur pour tous</h4>
                    <p className="text-sm text-gray-600">Notre contribution à un Bénin plus vert</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visuel impact */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 flex items-center justify-center text-center p-8">
                <div>
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                    <Leaf className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-white font-bold text-2xl mb-2">Image Impact Écologique</p>
                  <p className="text-white/90 text-sm">
                    Photo : Moto électrique en charge, arbres en arrière-plan
                  </p>
                  <p className="text-xs text-white/70 mt-4">
                    Chemin: /public/images/impact-eco.jpg
                  </p>
                </div>
              </div>
              {/* <Image src="/images/impact-eco.jpg" alt="Impact écologique" fill className="object-cover" /> */}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CHIFFRES CLÉS ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1B3A5F] mb-4">
              En Chiffres
            </h2>
            <p className="text-gray-600">
              Notre performance en quelques statistiques
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
              <div className="text-5xl font-bold text-[#1B3A5F] mb-2">98%</div>
              <p className="text-sm font-semibold text-gray-700">Taux de satisfaction</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200">
              <div className="text-5xl font-bold text-[#1B3A5F] mb-2">&lt;45</div>
              <p className="text-sm font-semibold text-gray-700">Minutes en moyenne</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border-2 border-yellow-200">
              <div className="text-5xl font-bold text-[#1B3A5F] mb-2">24/7</div>
              <p className="text-sm font-semibold text-gray-700">Service disponible</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200">
              <div className="text-5xl font-bold text-[#1B3A5F] mb-2">50+</div>
              <p className="text-sm font-semibold text-gray-700">Partenaires actifs</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TÉMOIGNAGES ========== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-yellow-100 text-yellow-700 font-bold text-sm uppercase tracking-wider rounded-full">
              Ils Nous Font Confiance
            </div>
            <h2 className="text-4xl font-bold text-[#1B3A5F] mb-4">
              Ce Qu'ils Disent de Nous
            </h2>
            <p className="text-gray-600">
              La satisfaction client, notre meilleure récompense
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Témoignage 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "Service impeccable ! Mes colis arrivent toujours à temps et en parfait état. L'équipe est professionnelle et très réactive."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">AC</span>
                </div>
                <div>
                  <p className="font-bold text-[#1B3A5F]">Amina C.</p>
                  <p className="text-sm text-gray-500">E-commerçante</p>
                </div>
              </div>
            </div>

            {/* Témoignage 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "Rapidité impressionnante ! J'utilise LE LIVREUR 2.0 pour mon restaurant et mes clients sont ravis. Un vrai partenaire."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">JM</span>
                </div>
                <div>
                  <p className="font-bold text-[#1B3A5F]">Jean-Marc A.</p>
                  <p className="text-sm text-gray-500">Restaurateur</p>
                </div>
              </div>
            </div>

            {/* Témoignage 3 */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "Enfin un service de livraison fiable à Cotonou ! L'aspect écologique avec les motos électriques est un vrai plus."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">SD</span>
                </div>
                <div>
                  <p className="font-bold text-[#1B3A5F]">Sophie D.</p>
                  <p className="text-sm text-gray-500">Particulière</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Avis */}
          <div className="mt-12 text-center">
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 text-[#1B3A5F] hover:text-[#F4B223] font-semibold transition-colors"
            >
              Voir tous les avis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== POURQUOI NOUS CHOISIR ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1B3A5F] mb-4">
              Pourquoi Nous Choisir ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ce qui fait de LE LIVREUR 2.0 votre meilleur partenaire logistique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100">
              <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#1B3A5F] mb-2">Ponctualité Garantie</h3>
                <p className="text-sm text-gray-600">
                  98% de nos livraisons sont effectuées dans les délais annoncés
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors border border-gray-100">
              <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#1B3A5F] mb-2">Sécurité Maximale</h3>
                <p className="text-sm text-gray-600">
                  Vos colis sont assurés et manipulés avec le plus grand soin
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-yellow-50 transition-colors border border-gray-100">
              <div className="bg-yellow-100 rounded-lg p-3 flex-shrink-0">
                <MapPin className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#1B3A5F] mb-2">Suivi en Temps Réel</h3>
                <p className="text-sm text-gray-600">
                  Suivez votre colis à chaque étape via SMS ou WhatsApp
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors border border-gray-100">
              <div className="bg-purple-100 rounded-lg p-3 flex-shrink-0">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#1B3A5F] mb-2">Équipe Professionnelle</h3>
                <p className="text-sm text-gray-600">
                  Livreurs formés, équipés et constamment évalués
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors border border-gray-100">
              <div className="bg-red-100 rounded-lg p-3 flex-shrink-0">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#1B3A5F] mb-2">Service Client 7j/7</h3>
                <p className="text-sm text-gray-600">
                  Une équipe à votre écoute du lundi au dimanche
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors border border-gray-100">
              <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#1B3A5F] mb-2">100% Électrique</h3>
                <p className="text-sm text-gray-600">
                  Réduisez votre empreinte carbone avec chaque livraison
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <Cta />
    </>
  );
}