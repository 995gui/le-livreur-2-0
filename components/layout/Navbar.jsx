// Fichier: components/layout/Navbar.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();

  // INFOS ENTREPRISE (Pour les boutons d'action)
  const companyInfo = {
    phone: "01 47 04 28 15",
    cleanPhone: "2290147042815",
  };

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Accueil', href: '/' },
    {
      name: 'Services',
      href: '/services',
      dropdown: [
        { name: 'Livraison Express', href: '/services#express', description: 'Urgences 30-45 min' },
        { name: 'Livraison Programmée', href: '/services#programmee', description: 'Planification flexible' },
        { name: 'Livraison Écologique', href: '/services#ecologique', description: 'Flotte électrique' },
        { name: 'Livraison Groupée', href: '/services#groupee', description: 'E-commerce & Stockage' },
        { name: 'Service Corporate', href: '/services#corporate', description: 'Solutions Entreprises' },
        { name: 'Abonnements', href: '/services#abonnements', description: 'Tarifs préférentiels' },
      ]
    },
    { name: 'Tarifs', href: '/tarifs' },
    { name: 'Zone de Couverture', href: '/zone-de-couverture' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed w-full z-50 top-0 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' // Compact au scroll
          : 'bg-transparent py-4 lg:py-6' // Plus aéré en haut
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center group" onClick={() => setIsMenuOpen(false)}>
            <div className="relative transition-transform duration-300 group-hover:scale-105">
              {isScrolled ? (
                <Image
                  src="/logo-color.png" 
                  alt="Logo Le Livreur 2.0"
                  width={0} height={0} sizes="100vw"
                  priority
                  className="h-[45px] md:h-[50px] w-auto"
                />
              ) : (
                <Image
                  src="/logo-white.png" 
                  alt="Logo Le Livreur 2.0"
                  width={0} height={0} sizes="100vw"
                  className="h-[50px] md:h-[60px] w-auto"
                />
              )}
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => {
              const isItemActive = isActive(item.href);
              
              return (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center font-bold text-sm xl:text-base transition-all duration-200 relative py-2 ${
                      isScrolled
                        ? isItemActive ? 'text-[#F4B223]' : 'text-[#1B3A5F] hover:text-[#F4B223]'
                        : isItemActive ? 'text-[#F4B223]' : 'text-white hover:text-[#F4B223]'
                    }`}
                    onClick={() => setActiveDropdown(null)}
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    )}
                    
                    {/* Soulignement animé */}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#F4B223] transform origin-left transition-transform duration-300 ${
                      isItemActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </Link>

                  {/* DROPDOWN */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 w-72 pt-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      <div className="absolute top-2 left-6 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-100"></div>
                      
                      <div className="bg-white rounded-xl shadow-2xl py-3 border border-gray-100 overflow-hidden relative">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="flex flex-col px-6 py-3 hover:bg-gray-50 transition-colors group/item border-l-4 border-transparent hover:border-[#F4B223]"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="font-bold text-[#1B3A5F] text-sm group-hover/item:text-[#F4B223] transition-colors">
                              {subItem.name}
                            </span>
                            <span className="text-xs text-gray-500 mt-1 font-medium">
                              {subItem.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:+${companyInfo.cleanPhone}`}
              className={`group flex items-center px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 border ${
                isScrolled
                  ? 'border-[#1B3A5F]/20 text-[#1B3A5F] hover:bg-[#1B3A5F] hover:text-white'
                  : 'border-white/30 text-white hover:bg-white hover:text-[#1B3A5F]'
              }`}
            >
              <Phone className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              <span className="hidden xl:inline">{companyInfo.phone}</span>
            </a>

            <Link
              href="/contact"
              className="relative overflow-hidden bg-[#F4B223] text-[#1B3A5F] px-6 py-2.5 rounded-full font-bold hover:bg-[#D4920F] transition-all transform hover:scale-105 shadow-lg text-sm group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Commander
                <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg active:scale-95 transition-transform"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className={isScrolled ? 'text-[#1B3A5F]' : 'text-white'} size={32} />
            ) : (
              <Menu className={isScrolled ? 'text-[#1B3A5F]' : 'text-white'} size={32} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{ top: '0', paddingTop: '100px' }}>
        
        <div className="h-full overflow-y-auto pb-20 px-6">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isItemActive = isActive(item.href);
              return (
                <div key={item.name} className="border-b border-gray-100 last:border-0">
                  <Link
                    href={item.href}
                    className={`flex justify-between items-center text-xl font-bold py-4 transition-colors ${
                      isItemActive ? 'text-[#F4B223]' : 'text-[#1B3A5F]'
                    }`}
                    onClick={() => !item.dropdown && setIsMenuOpen(false)}
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="w-5 h-5 opacity-50" />}
                  </Link>
                  
                  {item.dropdown && (
                    <div className="ml-4 mb-4 space-y-3 border-l-2 border-[#F4B223]/30 pl-4">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block group"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="text-[#1B3A5F] font-semibold text-base group-hover:text-[#F4B223] transition-colors">
                            {subItem.name}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">{subItem.description}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile CTA Footer */}
          <div className="mt-8 space-y-4">
            <a
              href={`https://wa.me/${companyInfo.cleanPhone}`}
              className="flex items-center justify-center w-full bg-[#25D366] text-white px-6 py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 2.598 4.671 4.958 4.671 9.888 0 5.45-4.43 9.884-9.877 9.884m11.368-9.884c-.001-8.179-6.654-14.834-14.837-14.834-4.085 0-7.812 1.627-10.603 4.394l-.105.105-5.832 1.532 1.562 5.693-.103.164a14.758 14.758 0 00-2.258 7.703c.001 8.179 6.654 14.833 14.833 14.833 8.183 0 14.837-6.654 14.837-14.833z" /></svg>
              WhatsApp
            </a>
            <a
              href={`tel:+${companyInfo.cleanPhone}`}
              className="flex items-center justify-center w-full bg-[#1B3A5F] text-white px-6 py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
            >
              <Phone className="w-6 h-6 mr-2" />
              Appeler maintenant
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function ChevronRightIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}