// Fichier: app/admin/candidatures/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { 
  Users, Phone, Mail, Calendar, Download, 
  Eye, Search, Filter, RefreshCw 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
// import CandidatureModal from '@/components/admin/CandidatureModal'; // À décommenter si vous avez ce fichier

export default function CandidaturesPage() {
  const [candidatures, setCandidatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCandidature, setSelectedCandidature] = useState(null);
  const { toast } = useToast();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    fetchCandidatures();
  }, []);

  async function fetchCandidatures() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('candidatures')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCandidatures(data || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les candidatures",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Filtrage (Récupéré de votre code)
  const filteredCandidatures = candidatures.filter(c => {
    const matchesSearch = 
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone?.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header de la page */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1B3A5F]">Gestion Candidatures</h1>
          <p className="text-gray-600 mt-1">
            {filteredCandidatures.length} candidature{filteredCandidatures.length > 1 ? 's' : ''}
          </p>
        </div>
        <Button 
          onClick={fetchCandidatures} 
          variant="outline"
          className="bg-white text-[#1B3A5F] hover:bg-gray-100"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      {/* Filtres (Récupéré de votre code) */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Rechercher (nom, email)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="viewed">Vue</SelectItem>
              <SelectItem value="accepted">Acceptée</SelectItem>
              <SelectItem value="rejected">Refusée</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#F4B223] text-[#1B3A5F] hover:bg-[#D4920F]">
            <Download className="w-4 h-4 mr-2" /> Exporter CSV
          </Button>
        </div>
      </div>

      {/* Tableau (Récupéré de votre code et adapté) */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#1B3A5F] text-white">
            <tr>
              <th className="px-6 py-4 font-semibold">Candidat</th>
              <th className="px-6 py-4 font-semibold">Contact</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">CV</th>
              <th className="px-6 py-4 font-semibold">Statut</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCandidatures.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  Aucune candidature trouvée.
                </td>
              </tr>
            ) : (
              filteredCandidatures.map((cand) => (
                <tr key={cand.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[#1B3A5F]">{cand.name}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm space-y-1">
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-3 h-3 mr-2" /> {cand.phone}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-3 h-3 mr-2" /> {cand.email || '-'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(cand.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <a 
                      href={cand.cv_url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                    >
                      <Download className="w-4 h-4 mr-1" /> Télécharger
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <BadgeStatus status={cand.status} />
                  </td>
                  <td className="px-6 py-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setSelectedCandidature(cand)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal (Placeholder - À relier à votre composant Modal si existant) */}
      {selectedCandidature && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Détails Candidature</h2>
            <p><strong>Nom:</strong> {selectedCandidature.name}</p>
            <p><strong>Motivation:</strong> {selectedCandidature.motivation}</p>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setSelectedCandidature(null)}>Fermer</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Petit composant pour colorer le statut
function BadgeStatus({ status }) {
  let styles = "bg-gray-100 text-gray-800";
  let label = status;

  switch (status) {
    case 'pending':
      styles = "bg-yellow-100 text-yellow-800";
      label = "En attente";
      break;
    case 'accepted':
      styles = "bg-green-100 text-green-800";
      label = "Acceptée";
      break;
    case 'rejected':
      styles = "bg-red-100 text-red-800";
      label = "Refusée";
      break;
    case 'viewed':
      styles = "bg-blue-100 text-blue-800";
      label = "Vue";
      break;
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles}`}>
      {label}
    </span>
  );
}