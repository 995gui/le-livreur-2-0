// Fichier: components/sections/home/Cta.jsx
'use client';
import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send } from 'lucide-react';
import DevisForm from '@/components/forms/DevisForm';

export default function Cta() {
  // VOS VRAIES COORDONNÉES
  const phone1 = "+229 01 47 04 28 14";
  const phone2 = "+229 01 47 04 28 15";
  const phoneLabel1 = "Service Commercial";
  const phoneLabel2 = "Support Client";
  const whatsappNumber1 = "2290147042814";
  const whatsappNumber2 = "2290147042815";
  const email = "lelivreur2zero@gmail.com";
  const [isDevisModalOpen, setIsDevisModalOpen] = useState(false);

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      subtitle: "2 lignes disponibles",
      phones: [
        {
          number: phone1,
          label: phoneLabel1,
          href: `tel:${phone1.replace(/\s/g, '')}`,
          description: "Devis & Commandes"
        },
        {
          number: phone2,
          label: phoneLabel2,
          href: `tel:${phone2.replace(/\s/g, '')}`,
          description: "Suivi & Assistance"
        }
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      subtitle: "Chat instantané",
      phones: [
        {
          number: phone1,
          label: phoneLabel1,
          href: `https://wa.me/${whatsappNumber1}?text=Bonjour%20LE%20LIVREUR%202.0`,
          description: "Devis & Commandes"
        },
        {
          number: phone2,
          label: phoneLabel2,
          href: `https://wa.me/${whatsappNumber2}?text=Bonjour%20LE%20LIVREUR%202.0`,
          description: "Suivi & Assistance"
        }
      ],
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      subtitle: "Réponse sous 2h",
      value: email,
      action: "Envoyer un email",
      href: `mailto:${email}`,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const quickInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Zone de couverture",
      value: "Cotonou & Abomey-Calavi"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Horaires d'ouverture",
      value: "Lun - Dim : 09h00 - 23h00" 
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5F] via-[#2C5282] to-[#0F2847]">
        {/* Animated Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F4B223' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Besoin d'une livraison fiable ?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Nous sommes disponibles <strong className="text-[#F4B223]">jusqu'à 23h00</strong> pour satisfaire vos clients. 
            Rapidité et fiabilité garanties.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                {method.icon}
              </div>
              <h3 className="text-white font-bold text-xl mb-1">
                {method.title}
              </h3>
              <p className="text-white/60 text-xs mb-4">
                {method.subtitle}
              </p>

              {/* Si c'est Email (pas de phones array) */}
              {method.value ? (
                <>
                  <p className="text-white/80 mb-4 text-sm truncate">
                    {method.value}
                  </p>
                  <a
                    href={method.href}
                    className="block w-full bg-[#F4B223] text-[#1B3A5F] py-3 rounded-lg font-bold hover:bg-[#D4920F] transition-colors shadow-lg text-center"
                  >
                    {method.action}
                  </a>
                </>
              ) : (
                /* Si c'est Téléphone ou WhatsApp avec 2 numéros */
                <div className="space-y-3">
                  {method.phones.map((phoneItem, phoneIndex) => (
                    <a
                      key={phoneIndex}
                      href={phoneItem.href}
                      target={method.title === "WhatsApp" ? "_blank" : undefined}
                      rel={method.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                      className="block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-3 transition-all group/phone"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-[10px] text-white/50 font-bold uppercase tracking-wide">
                          {phoneItem.label}
                        </span>
                        <span className="text-[10px] text-[#F4B223] font-semibold">
                          {phoneItem.description}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold text-sm group-hover/phone:text-[#F4B223] transition-colors">
                          {phoneItem.number}
                        </span>
                        {method.title === "Téléphone" ? (
                          <Phone className="w-4 h-4 text-white/40 group-hover/phone:text-[#F4B223] transition-colors" />
                        ) : (
                          <MessageCircle className="w-4 h-4 text-white/40 group-hover/phone:text-[#F4B223] transition-colors" />
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Info & CTA Form */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quick Info */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Informations Pratiques
            </h3>
            <div className="space-y-6">
              {quickInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-[#F4B223] text-[#1B3A5F] p-3 rounded-lg flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-white/70 text-sm mb-1">{info.label}</p>
                    <p className="text-white font-bold text-lg">{info.value}</p>
                  </div>
                </div>
              ))}

              {/* Additional Info */}
              <div className="pt-6 border-t border-white/20">
                <h4 className="text-white font-bold mb-3">Nos Services</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#F4B223] rounded-full mr-3" />
                    Livraison de repas & colis
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#F4B223] rounded-full mr-3" />
                    Service de transport
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#F4B223] rounded-full mr-3" />
                    Livraison Express (30-45 min)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#F4B223] rounded-full mr-3" />
                    Flotte Motos Électriques
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* BOUTON DEVIS */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-bold text-[#1B3A5F] mb-4">
              Demande de Devis
            </h3>
            <p className="text-gray-600 mb-8 max-w-sm">
              Pour vos besoins réguliers ou spécifiques, obtenez une proposition adaptée sous 24h.
            </p>
            
            <button 
              onClick={() => setIsDevisModalOpen(true)}
              className="w-full bg-[#F4B223] text-[#1B3A5F] py-4 rounded-lg font-bold text-lg hover:bg-[#D4920F] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center group"
            >
              Obtenir un devis gratuit
              <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-xs text-gray-500 text-center mt-6 flex items-center justify-center">
              <Clock className="w-3 h-3 mr-1" />
              Réponse rapide garantie
            </p>
          </div>
        </div>
      </div>
      <DevisForm open={isDevisModalOpen} onOpenChange={setIsDevisModalOpen} />
    </section>
  );
}