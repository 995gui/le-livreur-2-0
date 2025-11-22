// Fichier: components/admin/AdminNavbar.jsx - VERSION FINALE OPTIMISÉE
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { 
  LayoutDashboard, Users, FileText, MessageSquare, 
  Settings, LogOut, Menu, X, ChevronRight,
  Image as ImageIcon, Handshake, Map as MapIcon,
  Bell, ChevronDown
} from 'lucide-react';

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [counts, setCounts] = useState({ devis: 0, candidatures: 0, contacts: 0 });

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
      {/* ========== SIDEBAR DESKTOP (Fixe à gauche) ========== */}
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

            {/* Search Bar Desktop */}
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

          {/* User + Notifications Desktop */}
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

      {/* ========== TOP BAR MOBILE (Sans spacer !) ========== */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Logo Mobile */}
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#F4B223] rounded-lg flex items-center justify-center">
              <span className="text-[#1B3A5F] font-bold">L</span>
            </div>
            <span className="text-[#1B3A5F] font-bold text-sm">ADMIN</span>
          </Link>

          {/* Actions Mobile */}
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            {totalNotifications > 0 && (
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            )}

            {/* Menu Burger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6 text-[#1B3A5F]" />
            </button>
          </div>
        </div>
      </div>

      {/* ========== MENU MOBILE FULLSCREEN ========== */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-gradient-to-b from-[#1B3A5F] to-[#2C5282] shadow-2xl animate-in slide-in-from-right">
            <div className="flex flex-col h-full">
              {/* Header Menu Mobile */}
              <div className="flex items-center justify-between h-14 px-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#F4B223] rounded-lg flex items-center justify-center">
                    <span className="text-[#1B3A5F] font-bold">L</span>
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-sm">LIVREUR 2.0</h2>
                    <p className="text-blue-200 text-xs">Administration</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Navigation Mobile */}
              <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all ${
                        isActive
                          ? 'bg-white/10 text-white shadow-lg'
                          : 'text-blue-100 hover:bg-white/5 hover:text-white active:scale-95'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 flex-shrink-0" />
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

              {/* Footer Menu Mobile */}
              <div className="border-t border-white/10 p-4 space-y-3">
                {/* Notifications Mobile */}
                {totalNotifications > 0 && (
                  <div className="bg-white/10 rounded-lg p-3 flex items-center gap-3">
                    <Bell className="w-5 h-5 text-[#F4B223]" />
                    <div>
                      <p className="text-xs text-blue-200">Notifications</p>
                      <p className="text-sm font-bold text-white">{totalNotifications} nouvelle(s)</p>
                    </div>
                  </div>
                )}

                {/* User Info Mobile */}
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-xs text-blue-200 mb-1">Connecté</p>
                  <p className="text-sm font-semibold text-white">Administrateur</p>
                </div>

                {/* Logout Mobile */}
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ❌ PAS DE SPACERS ! Chaque page gère son espacement */}
    </>
  );
}