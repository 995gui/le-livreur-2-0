// Fichier: app/admin/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Users, FileText, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    devisCount: 0,
    candidaturesCount: 0,
    contactsCount: 0
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    async function fetchStats() {
      // On fait 3 requêtes légères pour avoir juste le nombre (count)
      const { count: devisCount } = await supabase.from('devis_requests').select('*', { count: 'exact', head: true });
      const { count: candidaturesCount } = await supabase.from('candidatures').select('*', { count: 'exact', head: true });
      const { count: contactsCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true });

      setStats({ 
        devisCount: devisCount || 0, 
        candidaturesCount: candidaturesCount || 0, 
        contactsCount: contactsCount || 0 
      });
    }
    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[#1B3A5F] mb-8">Vue d'ensemble</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Carte Devis */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-500 font-medium">Devis reçus</h3>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-4xl font-bold text-[#1B3A5F] mb-4">{stats.devisCount}</p>
          <Link href="/admin/devis" className="text-blue-600 hover:underline text-sm flex items-center">
            Gérer les devis <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Carte Candidatures */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-500 font-medium">Candidatures</h3>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-4xl font-bold text-[#1B3A5F] mb-4">{stats.candidaturesCount}</p>
          <Link href="/admin/candidatures" className="text-purple-600 hover:underline text-sm flex items-center">
            Voir les CVs <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Carte Contacts */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-500 font-medium">Messages Contact</h3>
            <MessageSquare className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-4xl font-bold text-[#1B3A5F] mb-4">{stats.contactsCount}</p>
          <Link href="/admin/contacts" className="text-green-600 hover:underline text-sm flex items-center">
            Lire les messages <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}