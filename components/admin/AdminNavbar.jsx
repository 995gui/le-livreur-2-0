// Fichier: components/admin/AdminNavbar.jsx
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { 
  LayoutDashboard, Users, FileText, MessageSquare, 
  Settings, LogOut, Menu, X, ChevronRight,
  Image as ImageIcon, Handshake, Map as MapIcon,
  Bell, ChevronDown, ExternalLink
} from 'lucide-react';

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Ajouté pour cohérence si utilisé
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [counts, setCounts] = useState({ devis: 0, candidatures: 0, contacts: 0 });
  
  const sidebarRef = useRef(null);
  const userMenuRef = useRef(null);

  const supabase = useMemo(
    () => createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ),
    []
  );

  // ✅ Récupération des compteurs de notifications
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [devisRes, candidaturesRes, contactsRes] = await Promise.all([
          supabase.from('devis_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('candidatures').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('is_read', false)
        ]);

        setCounts({
          devis: devisRes.count || 0,
          candidatures: candidaturesRes.count || 0,
          contacts: contactsRes.count || 0
        });
      } catch (error) {
        console.error('Erreur fetch counts:', error);
      }
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 30000); // Refresh toutes les 30s
    return () => clearInterval(interval);
  }, [supabase]);

  const totalNotifications = counts.devis + counts.candidatures + counts.contacts;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Erreur logout:', error);
      setIsLoggingOut(false);
    }
  };

  // Fermeture au clic dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = [
    { name: 'Vue d\'ensemble', href: '/admin', icon: LayoutDashboard },
    { name: 'Hero Slides', href: '/admin/hero-slides', icon: ImageIcon },
    { name: 'Partenaires', href: '/admin/partners', icon: Handshake },
    { name: 'Zones', href: '/admin/zones', icon: MapIcon },
    { name: 'Tarifs', href: '/admin/tarifs', icon: FileText },
    { name: 'Candidatures', href: '/admin/candidatures', icon: Users, count: counts.candidatures },
    { name: 'Devis', href: '/admin/devis', icon: FileText, count: counts.devis },
    { name: 'Contacts', href: '/admin/contacts', icon: MessageSquare, count: counts.contacts },
    { name: 'Avis', href: '/admin/testimonials', icon: MessageSquare },
  ];

  return (
    <>
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-xl border-b border-gray-200/80 z-50">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle - Desktop */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* Logo */}
            <Link href="/admin" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-[#1B3A5F] via-[#2C5282] to-[#F4B223] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <span className="hidden sm:block text-sm font-semibold text-gray-900">Admin Panel</span>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            
            {/* --- 1. BOUTON VOIR LE SITE (Desktop) --- */}
            <Link 
              href="/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-[#1B3A5F] transition-colors text-xs font-bold mr-2"
              title="Ouvrir le site dans un nouvel onglet"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Voir le site</span>
            </Link>
            {/* --------------------------------------- */}

            {/* Notifications */}
            <button className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              {totalNotifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              )}
            </button>

            {/* Settings */}
            <button className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1.5 pr-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#F4B223] to-[#1B3A5F] rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">AD</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Administrateur</p>
                    <p className="text-xs text-gray-500">admin@lelivreur2.bj</p>
                  </div>
                  
                  {/* --- 2. LIEN VOIR LE SITE (Mobile) --- */}
                  <Link 
                    href="/" 
                    target="_blank" 
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors sm:hidden"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Voir le site</span>
                  </Link>
                  {/* ------------------------------------- */}

                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
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
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-gradient-to-b from-[#1B3A5F] to-[#2C5282] z-50">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo + Search */}
          <div className="flex-shrink-0 px-6 py-4 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#F4B223] rounded-lg flex items-center justify-center">
                <span className="text-[#1B3A5F] font-bold text-xl">L</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">LIVREUR 2.0</h1>
                <p className="text-blue-200 text-xs">Administration</p>
              </div>
            </Link>

            {/* Search Bar Desktop Sidebar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-3 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-[#F4B223]/50"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white/10 text-white shadow-lg'
                      : 'text-blue-100 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  
                  {/* Badge Compteur */}
                  {item.count > 0 ? (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.count}
                    </span>
                  ) : isActive ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* User + Notifications Desktop Sidebar */}
          <div className="flex-shrink-0 border-t border-white/10 p-4 space-y-3">
            {/* Notifications */}
            {totalNotifications > 0 && (
              <div className="bg-white/10 rounded-lg p-3 flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#F4B223]" />
                <div className="flex-1">
                  <p className="text-xs text-blue-200">Notifications</p>
                  <p className="text-sm font-bold text-white">{totalNotifications} nouvelle(s)</p>
                </div>
              </div>
            )}

            {/* User Info */}
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-xs text-blue-200 mb-1">Connecté en tant que</p>
              <p className="text-sm font-semibold text-white truncate">Administrateur</p>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <LogOut className="w-5 h-5" />
              <span>{isLoggingOut ? 'Déconnexion...' : 'Déconnexion'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ========== MOBILE SIDEBAR OVERLAY ========== */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={() => setIsSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#1B3A5F] animate-in slide-in-from-left duration-300">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button onClick={() => setIsSidebarOpen(false)} className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            
            {/* Contenu Sidebar Mobile (Copie de la desktop pour simplifier) */}
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4 text-white font-bold text-xl">
                ADMIN PANEL
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-white/10"
                  >
                    <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-blue-200" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}