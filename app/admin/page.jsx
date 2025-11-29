// Fichier: app/admin/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { 
  Users, FileText, MessageSquare, ArrowRight, 
  TrendingUp, Clock, CheckCircle, AlertCircle, 
  Activity, Package, DollarSign 
} from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    devis: { total: 0, pending: 0, quoted: 0 },
    candidatures: { total: 0, pending: 0 },
    contacts: { total: 0, unread: 0 }
  });
  const [recentActivity, setRecentActivity] = useState([]);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        // 1. Récupération parallèle des stats
        const [
          devisTotal, devisPending, devisQuoted,
          candTotal, candPending,
          contactTotal, contactUnread
        ] = await Promise.all([
          supabase.from('devis_requests').select('*', { count: 'exact', head: true }),
          supabase.from('devis_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('devis_requests').select('*', { count: 'exact', head: true }).eq('status', 'quoted'),
          
          supabase.from('candidatures').select('*', { count: 'exact', head: true }),
          supabase.from('candidatures').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          
          supabase.from('contacts').select('*', { count: 'exact', head: true }),
          supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('is_read', false),
        ]);

        setStats({
          devis: { 
            total: devisTotal.count || 0, 
            pending: devisPending.count || 0,
            quoted: devisQuoted.count || 0
          },
          candidatures: { 
            total: candTotal.count || 0, 
            pending: candPending.count || 0 
          },
          contacts: { 
            total: contactTotal.count || 0, 
            unread: contactUnread.count || 0 
          }
        });

        // 2. Récupération du "Fil d'actualité" (Les 3 derniers de chaque, fusionnés)
        const { data: lastDevis } = await supabase.from('devis_requests').select('*').order('created_at', { ascending: false }).limit(4);
        const { data: lastCands } = await supabase.from('candidatures').select('*').order('created_at', { ascending: false }).limit(3);
        const { data: lastContacts } = await supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(3);

        // Fusion et tri par date
        const mixedActivity = [
          ...(lastDevis?.map(d => ({ ...d, type: 'devis' })) || []),
          ...(lastCands?.map(c => ({ ...c, type: 'candidature' })) || []),
          ...(lastContacts?.map(c => ({ ...c, type: 'contact' })) || [])
        ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
         .slice(0, 7); // On garde les 7 plus récents tout confondu

        setRecentActivity(mixedActivity);

      } catch (error) {
        console.error("Erreur dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  // Calcul du taux de traitement des devis
  const devisRate = stats.devis.total > 0 
    ? Math.round(((stats.devis.total - stats.devis.pending) / stats.devis.total) * 100) 
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      
      {/* Header avec Date et Salutations */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Vue d'ensemble</p>
          <h1 className="text-3xl font-bold text-[#1B3A5F]">Tableau de Bord</h1>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm text-gray-500">Dernière mise à jour</p>
          <p className="font-medium text-[#1B3A5F]">À l'instant</p>
        </div>
      </div>
      
      {/* --- SECTION 1 : LES CHIFFRES CLÉS (FOCUS URGENCE) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Carte Devis En Attente */}
        <StatCard 
          title="Devis en attente" 
          count={stats.devis.pending} 
          icon={FileText} 
          color="blue"
          subtext={`${stats.devis.total} au total`}
          link="/admin/devis"
          urgent={stats.devis.pending > 0}
        />

        {/* Carte Recrutement */}
        <StatCard 
          title="Candidatures à voir" 
          count={stats.candidatures.pending} 
          icon={Users} 
          color="purple"
          subtext={`${stats.candidatures.total} reçues`}
          link="/admin/candidatures"
          urgent={stats.candidatures.pending > 0}
        />

        {/* Carte Messages */}
        <StatCard 
          title="Messages non lus" 
          count={stats.contacts.unread} 
          icon={MessageSquare} 
          color="green"
          subtext="Boîte de réception"
          link="/admin/contacts"
          urgent={stats.contacts.unread > 0}
        />

        {/* Carte Performance (Taux de traitement) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-500 font-medium text-sm">Efficacité Traitement</h3>
              <Activity className="w-5 h-5 text-[#F4B223]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#1B3A5F]">{devisRate}%</span>
              <span className="text-xs text-gray-400">des devis traités</span>
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
            <div 
              className="bg-[#F4B223] h-2 rounded-full transition-all duration-1000" 
              style={{ width: `${devisRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* --- SECTION 2 : ACTIVITÉ & ACTIONS --- */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Colonne Gauche (2/3) : Fil d'actualité */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center">
              <h2 className="font-bold text-[#1B3A5F] flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                Activité Récente
              </h2>
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-500 rounded-md">Temps réel</span>
            </div>
            
            <div className="divide-y divide-gray-50">
              {loading ? (
                 <div className="p-8 text-center text-gray-400">Chargement de l'activité...</div>
              ) : recentActivity.length === 0 ? (
                 <div className="p-8 text-center text-gray-400">Aucune activité récente.</div>
              ) : (
                recentActivity.map((item) => (
                  <ActivityItem key={item.id + item.type} item={item} />
                ))
              )}
            </div>
            
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 text-center">
              <Link href="/admin/devis" className="text-sm text-blue-600 font-medium hover:underline">
                Voir tout l'historique
              </Link>
            </div>
          </div>
        </div>

        {/* Colonne Droite (1/3) : Actions Rapides & Infos */}
        <div className="space-y-6">
          
          {/* Bloc Actions Rapides */}
          <div className="bg-gradient-to-br from-[#1B3A5F] to-[#2C5282] rounded-xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-4">Actions Rapides</h3>
            <div className="space-y-3">
              <Link href="/admin/devis" className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors group">
                <span className="text-sm font-medium">Traiter les devis</span>
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/admin/tarifs" className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors group">
                <span className="text-sm font-medium">Modifier les tarifs</span>
                <DollarSign className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/" target="_blank" className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors group">
                <span className="text-sm font-medium">Voir le site public</span>
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Résumé Statut Devis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-[#1B3A5F] mb-4 text-sm">État des Devis</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span className="text-gray-600">En attente</span>
                </div>
                <span className="font-bold text-[#1B3A5F]">{stats.devis.pending}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-gray-600">Traités (Quoted)</span>
                </div>
                <span className="font-bold text-[#1B3A5F]">{stats.devis.quoted}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-600">Total reçus</span>
                </div>
                <span className="font-bold text-[#1B3A5F]">{stats.devis.total}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- SOUS-COMPOSANTS ---

function StatCard({ title, count, icon: Icon, color, subtext, link, urgent }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50 border-blue-200",
    purple: "text-purple-600 bg-purple-50 border-purple-200",
    green: "text-green-600 bg-green-50 border-green-200",
  };

  return (
    <Link href={link} className="block group">
      <div className={`bg-white rounded-xl shadow-sm border p-6 transition-all duration-200 hover:shadow-md ${urgent ? 'border-red-200 ring-1 ring-red-100' : 'border-gray-100'}`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
            {urgent && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mt-1">
                Action requise
              </span>
            )}
          </div>
          <div className={`p-2 rounded-lg ${colors[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div>
          <p className="text-3xl font-bold text-[#1B3A5F] mb-1">{count}</p>
          <div className="flex items-center text-xs text-gray-400 group-hover:text-blue-600 transition-colors">
            {subtext}
            <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function ActivityItem({ item }) {
  let icon, title, desc, link, colorClass;

  if (item.type === 'devis') {
    icon = <Package className="w-4 h-4" />;
    title = `Nouveau devis : ${item.serviceType}`;
    desc = `${item.name} • ${item.pickupAddress?.split(',')[0]} → ${item.deliveryAddress?.split(',')[0]}`;
    link = "/admin/devis";
    colorClass = "bg-blue-100 text-blue-600";
  } else if (item.type === 'candidature') {
    icon = <Users className="w-4 h-4" />;
    title = `Candidature : ${item.name}`;
    desc = `Poste : Livreur • Exp: ${item.experience || 'Non précisé'}`;
    link = "/admin/candidatures";
    colorClass = "bg-purple-100 text-purple-600";
  } else {
    icon = <MessageSquare className="w-4 h-4" />;
    title = `Message : ${item.subject}`;
    desc = `De : ${item.name}`;
    link = "/admin/contacts";
    colorClass = "bg-green-100 text-green-600";
  }

  return (
    <Link href={link} className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors group">
      <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <p className="text-sm font-semibold text-[#1B3A5F] group-hover:text-blue-600 truncate">{title}</p>
          <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
            {formatDistanceToNow(new Date(item.created_at), { addSuffix: true, locale: fr })}
          </span>
        </div>
        <p className="text-sm text-gray-500 truncate">{desc}</p>
      </div>
    </Link>
  );
}