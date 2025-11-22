// Fichier: app/admin/candidatures/page.jsx - VERSION AMÉLIORÉE
'use client';

import { useState, useEffect, useCallback } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { 
  Users, Phone, Mail, Calendar, Download, Eye, Search, 
  Filter, RefreshCw, CheckCircle, XCircle, Clock, 
  FileText, TrendingUp, MoreVertical, Trash2, MessageSquare,
  AlertCircle, Archive
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function CandidaturesPage() {
  const [candidatures, setCandidatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCandidature, setSelectedCandidature] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const { toast } = useToast();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    fetchCandidatures();
  }, []);

  // ✅ Fetch avec gestion d'erreurs améliorée
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
      console.error('Erreur fetch:', error);
      toast({
        variant: "destructive",
        title: "❌ Erreur de chargement",
        description: "Impossible de charger les candidatures. Vérifiez votre connexion.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // ✅ Mise à jour du statut
  const updateStatus = useCallback(async (id, newStatus) => {
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from('candidatures')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setCandidatures(prev => 
        prev.map(c => c.id === id ? { ...c, status: newStatus } : c)
      );

      toast({
        title: "✅ Statut mis à jour",
        description: `La candidature est maintenant "${getStatusLabel(newStatus)}"`,
      });
    } catch (error) {
      console.error('Erreur update:', error);
      toast({
        variant: "destructive",
        title: "❌ Erreur",
        description: "Impossible de mettre à jour le statut",
      });
    } finally {
      setActionLoading(false);
    }
  }, [supabase, toast]);

  // ✅ Suppression
  const deleteCandidature = useCallback(async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) return;

    setActionLoading(true);
    try {
      const { error } = await supabase
        .from('candidatures')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCandidatures(prev => prev.filter(c => c.id !== id));
      toast({
        title: "✅ Supprimée",
        description: "La candidature a été supprimée avec succès",
      });
    } catch (error) {
      console.error('Erreur delete:', error);
      toast({
        variant: "destructive",
        title: "❌ Erreur",
        description: "Impossible de supprimer la candidature",
      });
    } finally {
      setActionLoading(false);
    }
  }, [supabase, toast]);

  // ✅ Export CSV
  const exportToCSV = () => {
    const headers = ['Nom', 'Téléphone', 'Email', 'Date', 'Statut', 'Motivation'];
    const rows = filteredCandidatures.map(c => [
      c.name,
      c.phone,
      c.email || '-',
      formatDate(c.created_at),
      getStatusLabel(c.status),
      c.motivation || '-'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `candidatures_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast({
      title: "✅ Export réussi",
      description: `${filteredCandidatures.length} candidature(s) exportée(s)`,
    });
  };

  // ✅ Filtrage optimisé
  const filteredCandidatures = candidatures.filter(c => {
    const matchesSearch = 
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone?.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // ✅ Statistiques
  const stats = {
    total: candidatures.length,
    pending: candidatures.filter(c => c.status === 'pending').length,
    accepted: candidatures.filter(c => c.status === 'accepted').length,
    rejected: candidatures.filter(c => c.status === 'rejected').length,
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'En attente',
      viewed: 'Vue',
      accepted: 'Acceptée',
      rejected: 'Refusée'
    };
    return labels[status] || status;
  };

  // ✅ Ouvrir le modal de détails
  const openModal = (candidature) => {
    setSelectedCandidature(candidature);
    setIsModalOpen(true);
    
    // Marquer comme "vue" si elle était "pending"
    if (candidature.status === 'pending') {
      updateStatus(candidature.id, 'viewed');
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto sm:py-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========== HEADER ========== */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#1B3A5F] flex items-center gap-3">
                <Users className="w-8 h-8 text-[#F4B223]" />
                Gestion des Candidatures
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredCandidatures.length} candidature{filteredCandidatures.length > 1 ? 's' : ''} 
                {filterStatus !== 'all' && ` (${getStatusLabel(filterStatus)})`}
              </p>
            </div>
            <Button 
              onClick={fetchCandidatures} 
              variant="outline"
              className="bg-white hover:bg-gray-50 border-2"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
          </div>
        </div>

        {/* ========== STATISTIQUES ========== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-600">Total</p>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-[#1B3A5F]">{stats.total}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-600">En attente</p>
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-600">Acceptées</p>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.accepted}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-600">Refusées</p>
              <XCircle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
          </div>
        </div>

        {/* ========== FILTRES ========== */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher par nom, email ou téléphone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <span className="flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Tous les statuts
                  </span>
                </SelectItem>
                <SelectItem value="pending">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-500" /> En attente
                  </span>
                </SelectItem>
                <SelectItem value="viewed">
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-500" /> Vues
                  </span>
                </SelectItem>
                <SelectItem value="accepted">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" /> Acceptées
                  </span>
                </SelectItem>
                <SelectItem value="rejected">
                  <span className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" /> Refusées
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              onClick={exportToCSV}
              className="h-11 bg-[#F4B223] text-[#1B3A5F] hover:bg-[#D4920F] font-semibold"
              disabled={filteredCandidatures.length === 0}
            >
              <Download className="w-4 h-4 mr-2" /> 
              Exporter CSV
            </Button>
          </div>
        </div>

        {/* ========== TABLEAU ========== */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="w-8 h-8 text-[#F4B223] animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gradient-to-r from-[#1B3A5F] to-[#2C5282] text-white">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Candidat</th>
                    <th className="px-6 py-4 font-semibold">Contact</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Expérience</th>
                    <th className="px-6 py-4 font-semibold">CV</th>
                    <th className="px-6 py-4 font-semibold">Statut</th>
                    <th className="px-6 py-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCandidatures.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <AlertCircle className="w-12 h-12 text-gray-300" />
                          <p className="text-gray-500 font-medium">Aucune candidature trouvée</p>
                          <p className="text-sm text-gray-400">
                            {searchTerm || filterStatus !== 'all' 
                              ? 'Essayez de modifier vos filtres' 
                              : 'Les candidatures apparaîtront ici'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredCandidatures.map((cand) => (
                      <tr 
                        key={cand.id} 
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => openModal(cand)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                              {cand.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-[#1B3A5F]">{cand.name}</p>
                              {cand.status === 'pending' && (
                                <span className="text-xs text-yellow-600 font-medium">Nouveau</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm space-y-1">
                            <div className="flex items-center text-gray-600">
                              <Phone className="w-3.5 h-3.5 mr-2 text-green-600" /> 
                              {cand.phone}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Mail className="w-3.5 h-3.5 mr-2 text-blue-600" /> 
                              {cand.email || '-'}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {formatDate(cand.created_at)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-700">
                            {cand.experience || '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {cand.cv_url ? (
                            <a 
                              href={cand.cv_url} 
                              target="_blank" 
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                            >
                              <Download className="w-4 h-4" /> 
                              Télécharger
                            </a>
                          ) : (
                            <span className="text-gray-400 text-sm">Aucun CV</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <BadgeStatus status={cand.status} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                openModal(cand);
                              }}
                              className="hover:bg-blue-50"
                            >
                              <Eye className="w-4 h-4 text-blue-600" />
                            </Button>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button size="sm" variant="ghost" className="hover:bg-gray-100">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateStatus(cand.id, 'accepted');
                                  }}
                                  className="text-green-600"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Accepter
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateStatus(cand.id, 'rejected');
                                  }}
                                  className="text-red-600"
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Refuser
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteCandidature(cand.id);
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination (placeholder si besoin) */}
        {filteredCandidatures.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Affichage de {filteredCandidatures.length} candidature{filteredCandidatures.length > 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>

      {/* ========== MODAL DÉTAILS ========== */}
      {isModalOpen && selectedCandidature && (
        <CandidatureModal
          candidature={selectedCandidature}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCandidature(null);
          }}
          onUpdateStatus={updateStatus}
          onDelete={deleteCandidature}
        />
      )}
    </div>
  );
}

// ========== COMPOSANT BADGE STATUS ========== //
function BadgeStatus({ status }) {
  const configs = {
    pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      icon: <Clock className="w-3.5 h-3.5" />,
      label: "En attente"
    },
    viewed: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      icon: <Eye className="w-3.5 h-3.5" />,
      label: "Vue"
    },
    accepted: {
      bg: "bg-green-100",
      text: "text-green-800",
      icon: <CheckCircle className="w-3.5 h-3.5" />,
      label: "Acceptée"
    },
    rejected: {
      bg: "bg-red-100",
      text: "text-red-800",
      icon: <XCircle className="w-3.5 h-3.5" />,
      label: "Refusée"
    }
  };

  const config = configs[status] || configs.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.icon}
      {config.label}
    </span>
  );
}

// ========== COMPOSANT MODAL ========== //
function CandidatureModal({ candidature, onClose, onUpdateStatus, onDelete }) {
  const [note, setNote] = useState('');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1B3A5F] to-[#2C5282] p-6 text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <FileText className="w-7 h-7" />
                Détails de la Candidature
              </h2>
              <p className="text-blue-200 text-sm mt-1">
                Reçue le {new Date(candidature.created_at).toLocaleDateString('fr-FR')}
              </p>
            </div>
            <BadgeStatus status={candidature.status} />
          </div>
        </div>

        {/* Contenu */}
        <div className="p-8 space-y-6">
          {/* Informations personnelles */}
          <div>
            <h3 className="text-lg font-bold text-[#1B3A5F] mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Informations du Candidat
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <InfoCard icon={<Users />} label="Nom complet" value={candidature.name} />
              <InfoCard icon={<Phone />} label="Téléphone" value={candidature.phone} />
              <InfoCard icon={<Mail />} label="Email" value={candidature.email || 'Non renseigné'} />
              <InfoCard icon={<Calendar />} label="Expérience" value={candidature.experience || 'Non renseignée'} />
            </div>
          </div>

          {/* Motivation */}
          {candidature.motivation && (
            <div>
              <h3 className="text-lg font-bold text-[#1B3A5F] mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Lettre de Motivation
              </h3>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {candidature.motivation}
                </p>
              </div>
            </div>
          )}

          {/* CV */}
          {candidature.cv_url && (
            <div>
              <h3 className="text-lg font-bold text-[#1B3A5F] mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Curriculum Vitae
              </h3>
              <a
                href={candidature.cv_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg transition-colors border border-blue-200"
              >
                <Download className="w-5 h-5" />
                Télécharger le CV
              </a>
            </div>
          )}

          {/* Note interne (placeholder) */}
          <div>
            <Label htmlFor="note" className="text-lg font-bold text-[#1B3A5F] mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Note Interne (optionnelle)
            </Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ajoutez des notes sur ce candidat..."
              className="min-h-[100px]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 p-6 flex flex-wrap gap-3 justify-between border-t sticky bottom-0">
          <div className="flex gap-3">
            <Button
              onClick={() => {
                onUpdateStatus(candidature.id, 'accepted');
                onClose();
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Accepter
            </Button>
            <Button
              onClick={() => {
                onUpdateStatus(candidature.id, 'rejected');
                onClose();
              }}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Refuser
            </Button>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                if (confirm('Supprimer définitivement cette candidature ?')) {
                  onDelete(candidature.id);
                  onClose();
                }
              }}
              variant="ghost"
              className="text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer
            </Button>
            <Button onClick={onClose} variant="outline">
              Fermer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== COMPOSANT INFO CARD ========== //
function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
        <span className="w-4 h-4">{icon}</span>
        {label}
      </div>
      <p className="font-semibold text-[#1B3A5F]">{value}</p>
    </div>
  );
}