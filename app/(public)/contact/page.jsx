// Fichier: app/contact/page.jsx
import React from 'react';
import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, MessageSquare, Zap, CheckCircle } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm'; // Assurez-vous que ce fichier existe
import Link from 'next/link';

export const metadata = {
  title: 'Contact - LE LIVREUR 2.0 | Livraison Express à Cotonou',
  description: 'Contactez-nous 7j/7 de 09h à 23h. Téléphone, WhatsApp ou Email. Agence à Akpakpa, Cotonou.',
};

// VOS DONNÉES RÉELLES
const phoneNumber = "01 47 04 28 15";
const cleanPhone = "2290147042815";
const email = "lelivreur2zero@gmail.com";
const address = "Akpakpa, Cotonou (Face station Rubis)";

const contactInfo = [
  {
    icon: <Phone className="w-6 h-6 text-[#1B3A5F]" />,
    title: 'Téléphone',
    content: phoneNumber,
    href: `tel:+${cleanPhone}`,
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-green-600" />,
    title: 'WhatsApp',
    content: 'Discuter en direct',
    href: `https://wa.me/${cleanPhone}?text=Bonjour%20LE%20LIVREUR%202.0`,
    badge: { text: 'Réponse rapide', color: 'bg-green-100 text-green-700' },
    target: '_blank',
  },
  {
    icon: <Mail className="w-6 h-6 text-[#1B3A5F]" />,
    title: 'E-mail',
    content: email,
    href: `mailto:${email}`,
  },
  {
    icon: <MapPin className="w-6 h-6 text-[#F4B223]" />,
    title: 'Agence',
    content: address,
    description: 'Point de relais colis',
  },
  {
    icon: <Clock className="w-6 h-6 text-[#1B3A5F]" />,
    title: 'Horaires d\'ouverture',
    content: 'Lun - Dim : 09h00 - 23h00', // Mis à jour selon capture WhatsApp
    badge: { text: '7j/7', color: 'bg-blue-100 text-blue-700' },
  },
];

const contactReasons = [
  { icon: <Zap className="w-5 h-5" />, text: 'Urgence Colis' },
  { icon: <CheckCircle className="w-5 h-5" />, text: 'Suivi de commande' },
  { icon: <Phone className="w-5 h-5" />, text: 'Réclamation' },
  { icon: <MessageSquare className="w-5 h-5" />, text: 'Partenariat Pro' },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#1B3A5F] via-[#2C5282] to-[#1B3A5F] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F4B223' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-sm font-semibold flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Service Client En Ligne
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Besoin d'aide ?
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-2xl mx-auto mb-8">
            Une question sur une livraison ? Un partenariat ? <br/>
            Nous sommes là pour vous répondre jusqu'à <strong className="text-[#F4B223]">23h00</strong>.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-8">
            {contactReasons.map((reason, index) => (
              <div key={index} className="flex items-center gap-2 text-sm bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-colors cursor-default">
                <div className="text-[#F4B223]">{reason.icon}</div>
                <span className="text-left font-medium">{reason.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Principale */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Colonne 1 : Coordonnées */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#1B3A5F] mb-2">Nos Canaux</h2>
                <p className="text-gray-600">Choisissez le moyen qui vous convient.</p>
              </div>

              <ul className="space-y-4">
                {contactInfo.map((item, index) => (
                  <li key={index} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 bg-gray-50 rounded-lg p-3 group-hover:bg-blue-50 transition-colors">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">{item.title}</h3>
                          {item.badge && (
                            <span className={`px-2 py-0.5 ${item.badge.color} text-[10px] font-bold uppercase rounded-full`}>
                              {item.badge.text}
                            </span>
                          )}
                        </div>
                        {item.href ? (
                          <a 
                            href={item.href} 
                            target={item.target}
                            rel={item.target ? "noopener noreferrer" : undefined}
                            className="text-lg font-bold text-[#1B3A5F] hover:text-[#F4B223] transition-colors block truncate"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-lg font-bold text-[#1B3A5F]">{item.content}</p>
                        )}
                        {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* CTA WhatsApp */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold">Réponse Immédiate</h3>
                    <p className="text-green-100 text-sm">Le moyen le plus rapide</p>
                  </div>
                </div>
                <a 
                  href={`https://wa.me/${cleanPhone}?text=Bonjour%20LE%20LIVREUR%202.0`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white text-green-600 font-bold text-center py-3 rounded-lg hover:bg-green-50 transition-colors shadow-sm"
                >
                  Ouvrir WhatsApp
                </a>
              </div>
            </div>

            {/* Colonne 2 : Formulaire */}
            <div className="lg:col-span-3">
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border-t-4 border-[#F4B223]">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-[#1B3A5F] mb-2">Écrivez-nous</h2>
                  <p className="text-gray-600">Pour toute demande non-urgente ou partenariat.</p>
                </div>
                
                {/* Insertion du composant formulaire */}
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section Map (Image Statique ou Lien) */}
      <section className="h-80 w-full relative bg-gray-200 group overflow-hidden">
        {/* Placeholder Visuel en attendant Google Maps API Key */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#1B3A5F]/5 group-hover:bg-[#1B3A5F]/10 transition-colors">
            <div className="text-center">
                <MapPin className="w-16 h-16 text-[#F4B223] mx-auto mb-2 animate-bounce" />
                <p className="font-bold text-[#1B3A5F] text-xl">Akpakpa, Cotonou</p>
                <p className="text-gray-600">Face Station Rubis</p>
                <a 
                    href="https://goo.gl/maps/..." // Mettez le vrai lien Google Maps ici
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-[#1B3A5F] text-white px-6 py-2 rounded-full font-bold hover:bg-[#2C5282] transition-colors"
                >
                    Voir sur la carte
                </a>
            </div>
        </div>
      </section>
    </>
  );
}