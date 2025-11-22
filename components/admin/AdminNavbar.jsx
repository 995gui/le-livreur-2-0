// Fichier: components/admin/AdminNavbar.jsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  MessageSquare, 
  Image as ImageIcon, 
  LogOut, 
  Menu,
  Bell,
  Settings,
  Search,
  ChevronDown,
  Map as MapIcon,
  Handshake // Pour Partenaires
} from 'lucide-react';
import { useState, useMemo, useEffect, useRef } from 'react';

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // États pour les notifications
  const [counts, setCounts] = useState({ devis: 0, candidatures: 0, contacts: 0 });
  const totalNotifications = counts.devis + counts.candidatures + counts.contacts;

  const sidebarRef = useRef(null);
  const userMenuRef = useRef(null);

  const supabase = useMemo(
    () => createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ),
    []
  );

  // Récupération des compteurs (Rafraîchissement toutes les 30s)
  useEffect(() => {
    const fetchCounts = async () => {
      const { count: devisCount } = await supabase.from('devis_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      const { count: candidaturesCount } = await supabase.from('candidatures').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      const { count: contactsCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('is_read', false);

      setCounts({
        devis: devisCount || 0,
        candidatures: candidaturesCount || 0,
        contacts: contactsCount || 0
      });
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 30000);
    return () => clearInterval(interval);
  }, [supabase]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      setIsLoggingOut(false);
    }
  };

  // Fermeture au clic dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) setIsSidebarOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) setShowUserMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = [
    { name: 'Vue d\'ensemble', href: '/admin', icon: LayoutDashboard },
    { name: 'Hero Slides', href: '/admin/hero-slides', icon: ImageIcon },
    { name: 'Partenaires', href: '/admin/partners', icon: Handshake },
    { name: 'Zones', href: '/admin/zones', icon: MapIcon },
    { name: 'Tarifs', href: '/admin/tarifs', icon: FileText }, // Icône générique si pas mieux
    
    // Sections avec Notifications
    { 
      name: 'Candidatures', 
      href: '/admin/candidatures', 
      icon: Users, 
      count: counts.candidatures 
    },
    { 
      name: 'Devis', 
      href: '/admin/devis', 
      icon: FileText, 
      count: counts.devis 
    },
    { 
      name: 'Contacts', 
      href: '/admin/contacts', 
      icon: MessageSquare, 
      count: counts.contacts 
    },
  ];

  return (
    <>
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-xl border-b border-gray-200/80 z-50">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            <Link href="/admin" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-[#1B3A5F] via-[#2C5282] to-[#F4B223] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <span className="hidden sm:block text-sm font-semibold text-gray-900">Admin Panel</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex items-center space-x-2 ml-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Rechercher..." className="pl-10 pr-4 py-1.5 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F4B223]/20 focus:border-[#F4B223] transition-all" />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Notifications (Cloche) */}
            <button className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              {totalNotifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              )}
            </button>

            <button className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center space-x-2 p-1.5 pr-3 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-[#F4B223] to-[#1B3A5F] rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">AD</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Administrateur</p>
                    <p className="text-xs text-gray-500">admin@lelivreur2.bj</p>
                  </div>
                  <button onClick={handleLogout} disabled={isLoggingOut} className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50">
                    <LogOut className="w-4 h-4" />
                    <span>{isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-14 bottom-0 w-64 bg-gray-50/50 border-r border-gray-200/80 flex-col z-40">
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive ? 'bg-white text-[#1B3A5F] shadow-sm' : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#F4B223]' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  <span>{item.name}</span>
                </div>
                
                {/* Badge Compteur Sidebar */}
                {item.count > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {item.count}
                  </span>
                )}
                {isActive && !item.count && <div className="w-1.5 h-1.5 rounded-full bg-[#F4B223]" />}
              </Link>
            );
          })}
        </nav>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="p-3 bg-gradient-to-br from-[#1B3A5F] to-[#2C5282] rounded-lg">
            <p className="text-xs font-semibold text-white mb-1">Besoin d'aide ?</p>
            <p className="text-xs text-gray-300 mb-2">Support technique</p>
            <a href="mailto:support@webagency.com" className="text-xs text-white hover:text-[#F4B223] transition-colors font-medium block">
              Contactez le dév →
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200" onClick={() => setIsSidebarOpen(false)} />
          <aside ref={sidebarRef} className="lg:hidden fixed left-0 top-14 bottom-0 w-72 bg-white z-50 animate-in slide-in-from-left duration-300">
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive ? 'bg-gradient-to-r from-[#F4B223]/10 to-transparent text-[#1B3A5F] border-l-4 border-[#F4B223]' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-[#F4B223]' : 'text-gray-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.count > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </>
      )}

      {/* Bottom Navigation Mobile (Optionnel, si vous le gardez) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 z-40 pb-safe">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {navigation.slice(0, 5).map((item) => { // On affiche que les 5 premiers pour pas surcharger
             const isActive = pathname === item.href;
             return (
               <Link key={item.name} href={item.href} className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg ${isActive ? 'text-[#F4B223]' : 'text-gray-500'}`}>
                 <div className="relative">
                    <item.icon className={`w-6 h-6 mb-0.5 ${isActive ? 'scale-110' : ''}`} />
                    {item.count > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />}
                 </div>
                 <span className="text-[10px] font-medium truncate w-full text-center">{item.name.split(' ')[0]}</span>
               </Link>
             )
          })}
        </div>
      </div>

      {/* Spacers */}
      <div className="h-14" />
      <div className="lg:hidden h-16" />
      <div className="hidden lg:block lg:ml-64" />
    </>
  );
}