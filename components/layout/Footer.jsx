// Fichier: components/layout/Footer.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, Mail, MapPin, Clock, Facebook, Instagram, 
  Linkedin, Twitter, MessageCircle, Package 
} from 'lucide-react';
import DevisForm from '@/components/forms/DevisForm';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- DONNÉES RÉELLES MISES À JOUR ---
  // Liste des numéros avec leurs labels
  const phones = [
    { display: "01 47 04 28 14", clean: "2290147042814", label: "Service Commercial" },
    { display: "01 47 04 28 15", clean: "2290147042815", label: "Support Client" }
  ];
  
  // Numéro principal pour WhatsApp et le bouton flottant (Support Client)
  const mainPhoneClean = "2290147042815"; 
  const email = "lelivreur2zero@gmail.com";
  const whatsappLink = `https://wa.me/${mainPhoneClean}`;

  const services = [
    { name: 'Livraison Express', href: '/services#express' },
    { name: 'Livraison Programmée', href: '/services#programmee' },
    { name: 'Livraison Écologique', href: '/services#ecologique' },
    { name: 'Livraison Groupée', href: '/services#groupee' },
    { name: 'Service Corporate', href: '/services#corporate' },
    { name: 'Abonnements', href: '/services#abonnements' },
  ];

  const company = [
    { name: 'À propos', href: '/a-propos' },
    { name: 'Zone de Couverture', href: '/zone-de-couverture' },
    { name: 'Recrutement Livreurs', href: '/recrutement' },
    { name: 'Contact', href: '/contact' },
  ];

  const legal = [
    { name: 'Mentions Légales', href: '/mentions-legales' },
    { name: 'Politique de Confidentialité', href: '/politique-confidentialite' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com/lelivreur2.0' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com/lelivreur2.0' },
  ];

  return (
    <footer className="bg-[#0F2847] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Restez Informé de Nos Offres
              </h3>
              <p className="text-white/70">
                Inscrivez-vous à notre newsletter pour recevoir nos promotions et actualités
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-[#F4B223] focus:bg-white/20 outline-none transition-all text-white placeholder-white/50"
              />
              <button className="bg-[#F4B223] text-[#1B3A5F] px-8 py-3 rounded-lg font-bold hover:bg-[#D4920F] transition-all whitespace-nowrap">
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6 relative" style={{ width: '220px', height: '120px' }}> 
              <Image
                src="/logo-white.png" 
                alt="LE LIVREUR 2.0 Logo"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left' }}
              />
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Service de livraison professionnel à Cotonou et Calavi. Spécialiste de la livraison express, 
              programmée et écologique au Bénin.
            </p>

            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-[#F4B223] p-2.5 rounded-lg transition-all group"
                  aria-label={social.name}
                >
                  <span className="text-white group-hover:text-[#1B3A5F] transition-colors">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#F4B223]">
              Nos Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-white/70 hover:text-[#F4B223] transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#F4B223] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#F4B223]">
              Entreprise
            </h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-[#F4B223] transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#F4B223] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - MISE À JOUR VISUELLE */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#F4B223]">
              Nous Contacter
            </h4>
            <ul className="space-y-6"> {/* Espace augmenté pour la clarté */}
              
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#F4B223] flex-shrink-0 mt-1" />
                <div className="w-full">
                  <p className="text-white/70 text-sm mb-2 border-b border-white/10 pb-1">Téléphones</p>
                  <div className="flex flex-col gap-3">
                    {phones.map((phone, index) => (
                      <div key={index}>
                        <p className="text-[10px] uppercase tracking-wider text-[#F4B223] mb-0.5">
                          {phone.label}
                        </p>
                        <a 
                          href={`tel:+${phone.clean}`} 
                          className="text-white hover:text-[#F4B223] font-semibold transition-colors block text-lg"
                        >
                          {phone.display}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-[#F4B223] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70 text-sm mb-1">WhatsApp (Support)</p>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#F4B223] font-semibold transition-colors">
                    Discuter avec le support
                  </a>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#F4B223] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70 text-sm mb-1">Email</p>
                  <a href={`mailto:${email}`} className="text-white hover:text-[#F4B223] font-semibold transition-colors break-all">
                    {email}
                  </a>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#F4B223] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70 text-sm mb-1">Adresse</p>
                  <p className="text-white font-semibold text-sm">
                    Ilot 921, Parcelle C, Maison Hilaire Akpagbé, 7e Arrondissement, Cotonou
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#F4B223] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70 text-sm mb-1">Horaires</p>
                  <p className="text-white font-semibold">
                    Lun-Dim : 09h00 - 23h00
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/70 text-sm text-center md:text-left">
              © {currentYear} <strong className="text-white">LE LIVREUR 2.0</strong>. Tous droits réservés. | 
              Développé avec ❤️ au Bénin
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/70 hover:text-[#F4B223] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact Floating (Reste sur le numéro Support) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#F4B223] hover:bg-[#D4920F] text-[#1B3A5F] p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center font-bold"
          aria-label="Commander"
          title="Commander une livraison"
        >
          <Package className="w-6 h-6" />
        </button>
      </div>
      <DevisForm open={isModalOpen} onOpenChange={setIsModalOpen} />
    </footer>
  );
}