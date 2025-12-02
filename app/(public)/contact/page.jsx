// Fichier: app/(public)/contact/page.jsx
import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Zap, CheckCircle, ExternalLink } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import ContactPageClient from '@/components/contact/ContactPageClient';

export const metadata = {
  title: 'Contact - LE LIVREUR 2.0 | Service Client 7j/7 jusqu\'à 23h',
  description: 'Contactez LE LIVREUR 2.0 à Cotonou. Téléphones: +229 01 47 04 28 15 / 14, WhatsApp 24/7, Email: lelivreur2zero@gmail.com. Agence à Akpakpa, ouvert 7j/7 de 09h à 23h.',
  keywords: 'contact livreur cotonou, service client livraison benin, whatsapp livraison, agence akpakpa',
  openGraph: {
    title: 'Contact - LE LIVREUR 2.0',
    description: 'Contactez-nous 7j/7 de 09h à 23h. Réponse rapide sur WhatsApp.',
    url: 'https://votresite.com/contact',
    siteName: 'LE LIVREUR 2.0',
    locale: 'fr_FR',
    type: 'website',
  },
};

// DONNÉES RÉELLES
const phoneNumber1 = "01 47 04 28 14";
const phoneNumber2 = "01 47 04 28 15";
const phoneLabel1 = "Service Commercial";
const phoneLabel2 = "Support Client";
const cleanPhone1 = "2290147042814";
const cleanPhone2 = "2290147042815";
const displayPhones = "+229 01 47 04 28 14 / 15";
const email = "lelivreur2zero@gmail.com";
const address = "9C86+3F, Cotonou";
const addressDetails = "Ilot: 921, Quartier: Enagnon Sikè, Parcelle: C, Maison: HILAIRE AKPAGBE";
const googleMapsLink = "https://www.google.com/maps/dir//9C86%2B3F,+Cotonou/@6.3723026,2.3961783,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x102355bc8599d61b:0x2561daa3961b6a1c!2m2!1d2.4111875!2d6.3651875?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D";

// RÉSEAUX SOCIAUX
const socialLinks = {
  tiktok: "https://www.tiktok.com/@lelivreur2zero",
  linkedin: "https://www.linkedin.com/company/105257854",
  facebook: "https://www.facebook.com/profile.php?id=61560593846367",
};

// TEMPS DE RÉPONSE (provisoires)
const responseTime = {
  whatsapp: "< 5 minutes",
  phone: "Immédiat",
  email: "< 2 heures",
};

const contactInfo = [
  {
    icon: 'Phone',
    title: 'Téléphones',
    content: displayPhones,
    href: `tel:+${cleanPhone1}`,
    secondHref: `tel:+${cleanPhone2}`,
    responseTime: responseTime.phone,
  },
  {
    icon: 'MessageSquare',
    title: 'WhatsApp',
    content: 'Chat en direct',
    href: `https://wa.me/${cleanPhone1}?text=Bonjour%20LE%20LIVREUR%202.0%2C%20j%27ai%20besoin%20d%27aide`,
    badge: { text: 'Plus rapide', color: 'bg-green-100 text-green-700' },
    responseTime: responseTime.whatsapp,
    target: '_blank',
  },
  {
    icon: 'Mail',
    title: 'E-mail',
    content: email,
    href: `mailto:${email}`,
    responseTime: responseTime.email,
  },
  {
    icon: 'MapPin',
    title: 'Agence & Point Relais',
    content: address,
    description: addressDetails,
    href: googleMapsLink,
    target: '_blank',
  },
  {
    icon: 'Clock',
    title: 'Horaires',
    content: 'Tous les jours : 09h00 - 23h00',
    badge: { text: '7j/7', color: 'bg-blue-100 text-blue-700' },
    description: 'Ouvert même les jours fériés',
  },
];

const contactReasons = [
  { icon: 'Zap', text: 'Urgence Colis' },
  { icon: 'CheckCircle', text: 'Suivi Commande' },
  { icon: 'Phone', text: 'Réclamation' },
  { icon: 'MessageSquare', text: 'Partenariat' },
];

// FAQ - RÉPONSES VALIDÉES
const faqData = [
  {
    question: "Quel est le délai de livraison ?",
    answer: "Nos délais varient selon la zone : Livraison Express (30-45 minutes) dans Cotonou centre, Livraison Standard (3-6h) dans le Grand Cotonou. Pour les autres villes du Bénin, comptez 24-48h selon la destination."
  },
  {
    question: "Comment suivre mon colis ?",
    answer: "Après validation de votre commande, vous recevez un numéro de suivi par SMS et WhatsApp. Pour suivre votre colis en temps réel, contactez-nous directement par téléphone au +229 01 47 04 28 15/14 ou sur WhatsApp. Notre application mobile avec suivi en temps réel sera bientôt disponible !"
  },
  {
    question: "Livrez-vous en dehors de Cotonou ?",
    answer: "Oui ! Nous livrons dans tout le Bénin : Porto-Novo, Parakou, Abomey-Calavi, Ouidah, et toutes les grandes villes. Les délais et tarifs varient selon la distance. Contactez-nous pour un devis personnalisé."
  },
  {
    question: "Quels sont vos tarifs de livraison ?",
    answer: "Nos tarifs démarrent à 700 FCFA pour Cotonou centre. Le prix final dépend de la distance, du poids et de l'urgence. Utilisez notre calculateur en ligne ou contactez-nous pour un devis gratuit."
  },
  {
    question: "Puis-je payer à la livraison ?",
    answer: "Oui, nous acceptons le paiement cash à la livraison. Nous acceptons aussi Mobile Money (MTN, Moov) et les virements bancaires pour les entreprises avec facture."
  },
];

// Fonction pour vérifier si l'agence est ouverte
function isCurrentlyOpen() {
  const now = new Date();
  const hours = now.getHours();
  return hours >= 9 && hours < 23;
}

export default function ContactPage() {
  const currentlyOpen = isCurrentlyOpen();

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
                {currentlyOpen && (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </>
                )}
                {!currentlyOpen && (
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                )}
              </span>
              {currentlyOpen ? 'Service Client En Ligne' : 'Fermé · Réouverture à 09h00'}
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
            {contactReasons.map((reason, index) => {
              const IconComponent = reason.icon === 'Zap' ? Zap : reason.icon === 'CheckCircle' ? CheckCircle : reason.icon === 'Phone' ? Phone : MessageSquare;
              return (
                <div key={index} className="flex items-center gap-2 text-sm bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-colors cursor-default">
                  <div className="text-[#F4B223]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-left font-medium">{reason.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Principale */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Colonne 1 : Coordonnées */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-[#1B3A5F] mb-2">Contactez-nous</h2>
                <p className="text-gray-600">Choisissez le canal qui vous convient le mieux.</p>
              </div>

              <ul className="space-y-4">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon === 'Phone' ? Phone : item.icon === 'MessageSquare' ? MessageSquare : item.icon === 'Mail' ? Mail : item.icon === 'MapPin' ? MapPin : Clock;
                  const iconColor = item.icon === 'MessageSquare' ? 'text-green-600' : item.icon === 'MapPin' ? 'text-[#F4B223]' : 'text-[#1B3A5F]';
                  
                  return (
                    <li key={index} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 bg-gray-50 rounded-lg p-3 group-hover:bg-blue-50 transition-colors">
                          <IconComponent className={`w-6 h-6 ${iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">{item.title}</h3>
                            {item.badge && (
                              <span className={`px-2 py-0.5 ${item.badge.color} text-[10px] font-bold uppercase rounded-full`}>
                                {item.badge.text}
                              </span>
                            )}
                          </div>
                          {item.href ? (
                            <>
                              <a 
                                href={item.href} 
                                target={item.target}
                                rel={item.target ? "noopener noreferrer" : undefined}
                                className="text-lg font-bold text-[#1B3A5F] hover:text-[#F4B223] transition-colors block"
                              >
                                {item.content}
                                {item.target && <ExternalLink className="inline w-4 h-4 ml-1" />}
                              </a>
                              {/* Bouton second numéro pour téléphone */}
                              {item.secondHref && (
                                <div className="flex gap-2 mt-2">
                                  <a 
                                    href={item.href}
                                    className="flex-1 text-center text-sm bg-[#1B3A5F] text-white py-2 rounded-lg hover:bg-[#2C5282] transition-colors font-semibold"
                                  >
                                    <div className="text-[10px] text-blue-300 mb-0.5">{phoneLabel1}</div>
                                    📞 {phoneNumber1}
                                  </a>
                                  <a 
                                    href={item.secondHref}
                                    className="flex-1 text-center text-sm bg-[#1B3A5F] text-white py-2 rounded-lg hover:bg-[#2C5282] transition-colors font-semibold"
                                  >
                                    <div className="text-[10px] text-blue-300 mb-0.5">{phoneLabel2}</div>
                                    📞 {phoneNumber2}
                                  </a>
                                </div>
                              )}
                            </>
                          ) : (
                            <p className="text-lg font-bold text-[#1B3A5F]">{item.content}</p>
                          )}
                          {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
                          {item.responseTime && (
                            <p className="text-xs text-[#F4B223] font-semibold mt-2">
                              ⚡ Réponse : {item.responseTime}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* CTA WhatsApp */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold">Réponse Immédiate</h3>
                    <p className="text-green-100 text-sm">Le moyen le plus rapide · {responseTime.whatsapp}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <a 
                    href={`https://wa.me/${cleanPhone1}?text=Bonjour%20LE%20LIVREUR%202.0%2C%20j%27ai%20besoin%20d%27aide`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white text-green-600 font-bold text-center py-3 rounded-lg hover:bg-green-50 transition-colors shadow-sm"
                  >
                    <div className="text-[10px] text-green-500 mb-0.5">{phoneLabel1}</div>
                    💬 WhatsApp {phoneNumber1}
                  </a>
                  <a 
                    href={`https://wa.me/${cleanPhone2}?text=Bonjour%20LE%20LIVREUR%202.0%2C%20j%27ai%20besoin%20d%27aide`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white text-green-600 font-bold text-center py-3 rounded-lg hover:bg-green-50 transition-colors shadow-sm"
                  >
                    <div className="text-[10px] text-green-500 mb-0.5">{phoneLabel2}</div>
                    💬 WhatsApp {phoneNumber2}
                  </a>
                </div>
              </div>

              {/* Réseaux Sociaux */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#1B3A5F] mb-4 flex items-center gap-2">
                  <span className="text-lg">Suivez-nous</span>
                </h3>
                <div className="flex gap-3">
                  <a 
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#1877F2] text-white py-3 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity text-sm"
                    aria-label="Facebook"
                  >
                    Facebook
                  </a>
                  <a 
                    href={socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-black text-white py-3 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity text-sm"
                    aria-label="TikTok"
                  >
                    TikTok
                  </a>
                  <a 
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#0A66C2] text-white py-3 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity text-sm"
                    aria-label="LinkedIn"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Colonne 2 : Formulaire */}
            <div className="lg:col-span-3">
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border-t-4 border-[#F4B223]">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-[#1B3A5F] mb-2">Envoyez-nous un message</h2>
                  <p className="text-gray-600">Pour toute demande non-urgente, partenariat ou réclamation.</p>
                </div>
                
                <ContactForm isModal={false} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section FAQ - Component Client */}
      <ContactPageClient faqData={faqData} cleanPhone={cleanPhone1} />

      {/* Section Map avec iframe Google Maps */}
      <section className="h-96 w-full relative overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.2229394765004!2d2.408612574804465!3d6.365187493624907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102355bc8599d61b%3A0x2561daa3961b6a1c!2sLe%20Livreur%202.0!5e0!3m2!1sfr!2sbj!4v1764365890710!5m2!1sfr!2sbj"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localisation LE LIVREUR 2.0 - Akpakpa, Cotonou"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        ></iframe>
        
        {/* Overlay avec infos */}
        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl max-w-sm">
          <div className="flex items-start gap-3">
            <div className="bg-[#F4B223] rounded-lg p-2">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-[#1B3A5F] text-lg">Notre Agence</h3>
              <p className="text-gray-700 text-sm font-medium">{address}</p>
              <p className="text-gray-500 text-xs mt-1">Akpakpa, Cotonou</p>
              <a 
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-[#1B3A5F] font-semibold text-sm hover:text-[#F4B223] transition-colors"
              >
                Obtenir l'itinéraire
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}