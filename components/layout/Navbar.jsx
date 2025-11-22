// Fichier: components/layout/Navbar.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // VOS COORDONNÉES RÉELLES
  const phoneNumber = "01 47 04 28 15";
  const cleanPhone = "2290147042815"; // Format pour les liens

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Accueil', href: '/' },
    {
      name: 'Services',
      href: '/services', // Le lien principal va en haut de la page
      dropdown: [
        { name: 'Livraison Express', href: '/services#express', description: 'Urgences 30-45 min' },
        { name: 'Livraison Programmée', href: '/services#programmee', description: 'Planification flexible' },
        { name: 'Livraison Écologique', href: '/services#ecologique', description: 'Motos électriques' },
        { name: 'Livraison Groupée', href: '/services#groupee', description: 'E-commerce & Stockage' },
        { name: 'Service Corporate', href: '/services#corporate', description: 'Solutions Entreprises' },
        { name: 'Abonnements', href: '/services#abonnements', description: 'Gros volumes' },
      ]
    },
    { name: 'Tarifs', href: '/tarifs' },
    { name: 'Zone de Couverture', href: '/zone-de-couverture' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
            {isScrolled ? (
              <Image
                src="/logo-color.png" 
                alt="LE LIVREUR 2.0 Logo"
                width={0} height={0} sizes="100vw"
                priority
                className="h-[50px] md:h-[55px] w-auto transition-all duration-300"
              />
            ) : (
              <Image
                src="/logo-white.png" 
                alt="LE LIVREUR 2.0 Logo"
                width={0} height={0} sizes="100vw"
                className="h-[55px] md:h-[60px] w-auto transition-all duration-300"
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center font-semibold text-sm xl:text-base transition-colors ${
                    isScrolled
                      ? 'text-gray-700 hover:text-[#F4B223]'
                      : 'text-white hover:text-[#F4B223]'
                  }`}
                  onClick={() => setActiveDropdown(null)}
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown className="ml-1 w-4 h-4" />
                  )}
                </Link>

                {/* Dropdown Menu CORRIGÉ */}
                {item.dropdown && activeDropdown === item.name && (
                  // 1. Conteneur invisible : On utilise pt-4 (padding) au lieu de mt-2.
                  // Cela étend la zone sensible jusqu'au bouton "Services", comblant le vide.
                  <div className="absolute top-full left-0 w-72 pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    
                    {/* 2. La boîte visuelle (blanche) est DANS le conteneur */}
                    <div className="bg-white rounded-xl shadow-2xl py-2 border border-gray-100 overflow-hidden">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-6 py-3 hover:bg-[#F4B223]/10 transition-colors group/item"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="font-semibold text-gray-800 group-hover/item:text-[#F4B223] transition-colors">
                            {subItem.name}
                          </div>
                          {subItem.description && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              {subItem.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:+${cleanPhone}`}
              className={`flex items-center px-3 py-2 rounded-lg font-semibold transition-all ${
                isScrolled
                  ? 'text-[#1B3A5F] hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="hidden xl:inline text-sm">{phoneNumber}</span>
            </a>
            <Link
              href="/contact"
              className="bg-[#F4B223] text-[#1B3A5F] px-5 py-2.5 rounded-lg font-bold hover:bg-[#D4920F] transition-all transform hover:scale-105 shadow-lg text-sm"
            >
              Commander
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className={isScrolled ? 'text-[#1B3A5F]' : 'text-white'} size={28} />
            ) : (
              <Menu className={isScrolled ? 'text-[#1B3A5F]' : 'text-white'} size={28} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-2xl h-screen overflow-y-auto pb-20">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block text-[#1B3A5F] hover:text-[#F4B223] font-semibold text-lg py-2 transition-colors flex justify-between items-center"
                  onClick={() => !item.dropdown && setIsMenuOpen(false)}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
                
                {/* Mobile Dropdown Items */}
                {item.dropdown && (
                  <div className="ml-4 mt-1 space-y-2 border-l-2 border-gray-100 pl-4">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block text-gray-600 hover:text-[#F4B223] py-2 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="text-sm font-medium">{subItem.name}</div>
                        {subItem.description && (
                          <div className="text-xs text-gray-400">{subItem.description}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="pt-6 space-y-3 border-t border-gray-200 mt-4">
              <a
                href={`tel:+${cleanPhone}`}
                className="flex items-center justify-center bg-[#1B3A5F] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#0F2847] transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Appeler {phoneNumber}
              </a>
              <a
                href={`https://wa.me/${cleanPhone}?text=Bonjour,%20je%20souhaite%20commander%20une%20livraison`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-[#F4B223] text-[#1B3A5F] px-6 py-3 rounded-lg font-bold hover:bg-[#D4920F] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Commander sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}