// Fichier: components/layout/Navbar.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown, MessageCircle } from 'lucide-react';
import DevisForm from '@/components/forms/DevisForm';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  // État spécifique pour le menu mobile (accordéon)
  const [expandedMobile, setExpandedMobile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const pathname = usePathname();

  const companyInfo = {
    phone: "01 47 04 28 15",
    cleanPhone: "2290147042815",
  };

  // Gestion du scroll pour l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquer le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navigation = [
    { name: 'Accueil', href: '/', icon: '🏠' },
    {
      name: 'Services',
      href: '/services',
      icon: '📦',
      dropdown: [
        { name: 'Livraison Express', href: '/services#express', icon: '⚡', description: '30-45 min' },
        { name: 'Livraison Programmée', href: '/services#programmee', icon: '📅', description: 'Planification flexible' },
        { name: 'Livraison Écologique', href: '/services#ecologique', icon: '🌿', description: 'Flotte électrique' },
        { name: 'Livraison Groupée', href: '/services#groupee', icon: '📦', description: 'E-commerce & Stockage' },
        { name: 'Service Corporate', href: '/services#corporate', icon: '💼', description: 'Solutions Entreprises' },
        { name: 'Abonnements', href: '/services#abonnements', icon: '⭐', description: 'Tarifs préférentiels' },
        { name: 'Expédition Cotonou ↔ Lomé', href: '/services#expedition-lome', icon: '🌍', description: 'Service transfrontalier' },
      ]
    },
    { name: 'Tarifs', href: '/tarifs', icon: '💰' },
    {
      name: 'Entreprise',
      href: '#',
      icon: '🏢',
      dropdown: [
        { name: 'À propos', href: '/a-propos', icon: '📖', description: 'Notre histoire' },
        { name: 'Zone de Couverture', href: '/zone-de-couverture', icon: '🗺️', description: 'Nos zones de livraison' },
        { name: 'Recrutement Livreurs', href: '/recrutement', icon: '🏍️', description: 'Rejoignez-nous' },
      ]
    },
    { name: 'Contact', href: '/contact', icon: '📞' },
  ];

  const isActive = (path) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed w-full z-50 top-0 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-3 lg:py-6'
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
                  className="h-[40px] md:h-[50px] lg:h-[50px] w-auto"
                />
              ) : (
                <Image
                  src="/logo-white.png" 
                  alt="Logo Le Livreur 2.0"
                  width={0} height={0} sizes="100vw"
                  className="h-[45px] md:h-[55px] lg:h-[60px] w-auto"
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
                    
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#F4B223] transform origin-left transition-transform duration-300 ${
                      isItemActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </Link>

                  {/* Dropdown Desktop avec le correctif "Gap of Death" (pt-4) */}
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
                            <span className="font-bold text-[#1B3A5F] text-sm group-hover/item:text-[#F4B223] transition-colors flex items-center gap-2">
                              {subItem.icon && <span>{subItem.icon}</span>}
                              {subItem.name}
                            </span>
                            {subItem.description && (
                              <span className="text-xs text-gray-500 mt-1 font-medium">
                                {subItem.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA Buttons Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:+${companyInfo.cleanPhone}`}
              className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all ${
                isScrolled
                  ? 'text-[#1B3A5F] hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="hidden xl:inline">{companyInfo.phone}</span>
            </a>
            
            <button
              onClick={() => setIsModalOpen(true)} 
              className="bg-[#F4B223] text-[#1B3A5F] px-6 py-2 rounded-lg font-bold hover:bg-[#D4920F] transition-all transform hover:scale-105 shadow-lg"
            >
              Commander
            </button>
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

      {/* MENU MOBILE FULLSCREEN (Le retour du code complet) */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white flex flex-col animate-in slide-in-from-right duration-300">
           
           {/* Header Mobile */}
           <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 bg-white">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                 <Image src="/logo-color.png" alt="Logo" width={140} height={40} className="h-10 w-auto" />
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                 <X className="w-6 h-6 text-gray-600" />
              </button>
           </div>

           {/* Navigation Links Mobile */}
           <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
              {navigation.map((item) => {
                 const hasDropdown = item.dropdown && item.dropdown.length > 0;
                 const isExpanded = expandedMobile === item.name;

                 return (
                    <div key={item.name} className="border-b border-gray-50 last:border-0 pb-2">
                       {hasDropdown ? (
                         // Item avec sous-menu (Accordéon)
                         <div className="flex flex-col">
                           <button
                             onClick={() => setExpandedMobile(isExpanded ? null : item.name)}
                             className="flex items-center justify-between w-full py-3 text-lg font-bold text-[#1B3A5F] hover:text-[#F4B223] transition-colors"
                           >
                             <div className="flex items-center gap-3">
                               <span className="text-2xl">{item.icon}</span>
                               {item.name}
                             </div>
                             <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#F4B223]' : 'text-gray-400'}`} />
                           </button>
                           
                           {/* Sous-menu déroulant */}
                           <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                             <div className="ml-4 pl-4 border-l-2 border-[#F4B223]/30 space-y-3">
                               {item.dropdown.map((subItem) => (
                                 <Link
                                   key={subItem.name}
                                   href={subItem.href}
                                   className="flex flex-col py-1 group"
                                   onClick={() => { setIsMenuOpen(false); setExpandedMobile(null); }}
                                 >
                                   <span className="font-semibold text-[#1B3A5F] group-hover:text-[#F4B223] flex items-center gap-2">
                                     {subItem.icon && <span className="text-base">{subItem.icon}</span>}
                                     {subItem.name}
                                   </span>
                                   {subItem.description && (
                                     <span className="text-xs text-gray-400 font-medium ml-6">
                                       {subItem.description}
                                     </span>
                                   )}
                                 </Link>
                               ))}
                             </div>
                           </div>
                         </div>
                       ) : (
                         // Item simple sans sous-menu
                         <Link
                           href={item.href}
                           onClick={() => setIsMenuOpen(false)}
                           className="flex items-center gap-3 py-3 text-lg font-bold text-[#1B3A5F] hover:text-[#F4B223] transition-colors"
                         >
                            <span className="text-2xl">{item.icon}</span>
                            {item.name}
                         </Link>
                       )}
                    </div>
                 );
              })}
           </div>

           {/* Footer Mobile Fixe (Appel / WhatsApp) */}
           <div className="p-4 border-t border-gray-100 bg-gray-50 pb-safe">
              <div className="grid grid-cols-2 gap-3">
                <a
                   href={`tel:+${companyInfo.cleanPhone}`}
                   className="flex items-center justify-center w-full bg-[#1B3A5F] text-white py-3.5 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
                >
                   <Phone className="w-5 h-5 mr-2" /> Appeler
                </a>
                <a
                   href={`https://wa.me/${companyInfo.cleanPhone}?text=Bonjour`}
                   className="flex items-center justify-center w-full bg-[#25D366] text-white py-3.5 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
                >
                   <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
                </a>
              </div>
           </div>
        </div>
      )}
      <DevisForm open={isModalOpen} onOpenChange={setIsModalOpen} />
    </header>
  );
}