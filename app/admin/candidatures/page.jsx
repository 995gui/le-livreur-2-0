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

  // ✅ Mise à jour du statut (Version Corrigée "notes")
  const updateStatus = useCallback(async (id, newStatus, noteContent = null) => {
    setActionLoading(true);
    try {
      // On prépare les données à mettre à jour
      const updates = { 
        status: newStatus, 
        updated_at: new Date().toISOString() 
      };
      
      // ✅ ICI : On utilise ton champ 'notes' existant
      if (noteContent !== null) updates.notes = noteContent;

      const { error } = await supabase
        .from('candidatures')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      // Mise à jour locale
      setCandidatures(prev => 
        prev.map(c => c.id === id ? { ...c, ...updates } : c)
      );

      toast({
        title: "✅ Statut mis à jour",
        description: `Candidature passée en "${getStatusLabel(newStatus)}"`,
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
    <div className="px-4 py-30 md:py-20 max-w-7xl mx-auto sm:py-20 md:pb-8">
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
// ========== COMPOSANT MODAL (VERSION RENDEZ-VOUS FIXE) ========== //
function CandidatureModal({ candidature, onClose, onUpdateStatus, onDelete }) {
  const [note, setNote] = useState(candidature.notes || '');
  const [isSending, setIsSending] = useState(false);
  
  // Nouveaux états pour la planification
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');

  const handleResponse = async (action) => {
    let subject = "";
    let htmlBody = "";
    let newStatus = "";

    // 1. Scénario : CONVOCATION (Avec Date Fixe)
    if (action === 'interview') {
      // Validation : On oblige l'admin à choisir une date
      if (!interviewDate || !interviewTime) {
        alert("⚠️ Veuillez choisir une DATE et une HEURE pour l'entretien avant d'envoyer.");
        return;
      }

      // Formatage de la date en français (ex: Lundi 14 Novembre)
      const dateObj = new Date(interviewDate);
      const dateStr = dateObj.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });

      newStatus = 'accepted';
      subject = "Convocation à un entretien - LE LIVREUR 2.0";
      htmlBody = `
        <p>Bonjour <strong>${candidature.name}</strong>,</p>
        <p>Suite à l'étude de votre candidature, nous avons le plaisir de vous inviter à un entretien.</p>
        <div style="background-color: #f3f4f6; padding: 15px; border-left: 4px solid #1B3A5F; margin: 20px 0;">
          <p style="margin:0; font-weight:bold;">📅 Date : ${dateStr}</p>
          <p style="margin:0; font-weight:bold;">⏰ Heure : ${interviewTime}</p>
          <p style="margin:0;">📍 Lieu : Siège LE LIVREUR 2.0 (Cotonou)</p>
        </div>
        <p>Merci de nous confirmer votre présence par retour de mail.</p>
        <br/>
        <p>Cordialement,<br/>L'équipe Recrutement LE LIVREUR 2.0</p>
      `;
    } 
    // 2. Scénario : REFUS
    else if (action === 'reject') {
      newStatus = 'rejected';
      subject = "Mise à jour concernant votre candidature - LE LIVREUR 2.0";
      htmlBody = `
        <p>Bonjour <strong>${candidature.name}</strong>,</p>
        <p>Nous vous remercions de l'intérêt que vous portez à notre entreprise.</p>
        <p>Malgré la qualité de votre parcours, nous avons le regret de vous informer que nous ne donnerons pas suite à votre candidature pour le moment.</p>
        <p>Nous conservons toutefois votre CV pour de futures opportunités.</p>
        <br/>
        <p>Bonne continuation,<br/>L'équipe Recrutement LE LIVREUR 2.0</p>
      `;
    }
    // 3. Scénario : WHATSAPP
    else if (action === 'whatsapp') {
      const message = `Bonjour ${candidature.name}, c'est LE LIVREUR 2.0. Nous avons bien reçu votre candidature. Avez-vous quelques minutes pour échanger ?`;
      const url = `https://wa.me/${candidature.phone.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      return; 
    }

    // --- ENVOI AUTOMATIQUE ---
    if (newStatus) {
      setIsSending(true);
      try {
        const res = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: candidature.email,
            subject: subject,
            html: htmlBody
          })
        });

        if (!res.ok) throw new Error("Erreur lors de l'envoi du mail");

        // Sauvegarde de la note (avec la date d'entretien si définie)
        let finalNote = note;
        if (action === 'interview') {
          finalNote = `Entretien fixé le ${interviewDate} à ${interviewTime}. ` + (note || "");
        }

        onUpdateStatus(candidature.id, newStatus, finalNote || "Réponse automatique envoyée.");
        onClose();

      } catch (error) {
        alert("Erreur: Le mail n'a pas pu partir. Vérifiez l'adresse email du candidat.");
        console.error(error);
      } finally {
        setIsSending(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1B3A5F] to-[#2C5282] p-6 text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <FileText className="w-7 h-7" />
                Candidature de {candidature.name.split(' ')[0]}
              </h2>
              <p className="text-blue-200 text-sm mt-1">
                Reçue le {new Date(candidature.created_at).toLocaleDateString('fr-FR')}
              </p>
            </div>
            <BadgeStatus status={candidature.status} />
          </div>
        </div>

        {/* Contenu Scrollable */}
        <div className="p-8 space-y-6 flex-1 overflow-y-auto">
          {/* Informations */}
          <div className="grid md:grid-cols-2 gap-4">
            <InfoCard icon={<Phone />} label="Téléphone" value={candidature.phone} />
            <InfoCard icon={<Mail />} label="Email" value={candidature.email || 'Non renseigné'} />
            <InfoCard icon={<Calendar />} label="Expérience" value={candidature.experience || '-'} />
            <InfoCard icon={<FileText />} label="CV" value={candidature.cv_url ? "Disponible" : "Non"} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {candidature.motivation && (
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="font-bold text-[#1B3A5F] mb-2 text-sm uppercase">Motivation</h3>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {candidature.motivation}
                </p>
              </div>
            )}
            
            <div className="flex flex-col gap-4">
               {candidature.cv_url && (
                <a
                  href={candidature.cv_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-8 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-xl border-2 border-dashed border-blue-200 transition-all"
                >
                  <Download className="w-6 h-6" />
                  Voir le CV Complet
                </a>
              )}
              
              {/* Zone Note Interne */}
              <div>
                <Label className="text-sm font-bold text-gray-500 uppercase mb-2 block">
                  Note Interne / Mémo
                </Label>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ex: Candidat intéressant..."
                  className="bg-yellow-50/50 border-yellow-100 min-h-[80px]"
                />
              </div>

              {/* --- NOUVEAU : Zone Planification Entretien --- */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <h4 className="text-sm font-bold text-[#1B3A5F] mb-3 flex items-center">
                  <Calendar className="w-4 h-4 mr-2"/> 
                  Planifier l'entretien
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-blue-800 mb-1 block">Date</Label>
                    <Input 
                      type="date" 
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                      className="bg-white border-blue-200 h-9"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-blue-800 mb-1 block">Heure</Label>
                    <Input 
                      type="time" 
                      value={interviewTime}
                      onChange={(e) => setInterviewTime(e.target.value)}
                      className="bg-white border-blue-200 h-9"
                    />
                  </div>
                </div>
                <p className="text-xs text-blue-600 mt-2 italic">
                  * Nécessaire uniquement si vous cliquez sur "Convoquer".
                </p>
              </div>
              {/* ------------------------------------------- */}

            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 p-5 border-t sticky bottom-0 z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* 1. WhatsApp */}
            <Button
              onClick={() => handleResponse('whatsapp')}
              variant="outline"
              disabled={isSending}
              className="bg-white text-green-600 border-green-200 hover:bg-green-50 h-12"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              WhatsApp
            </Button>

            {/* 2. Refuser */}
            <Button
              onClick={() => handleResponse('reject')}
              variant="outline"
              disabled={isSending || !candidature.email}
              className="bg-white text-red-600 border-red-200 hover:bg-red-50 h-12"
            >
              {isSending ? <RefreshCw className="w-5 h-5 animate-spin mr-2"/> : <XCircle className="w-5 h-5 mr-2" />}
              Refuser
            </Button>

            {/* 3. Accepter (Convoquer) */}
            <Button
              onClick={() => handleResponse('interview')}
              disabled={isSending || !candidature.email}
              className="bg-[#1B3A5F] hover:bg-[#2C5282] text-white h-12 shadow-md"
            >
              {isSending ? <RefreshCw className="w-5 h-5 animate-spin mr-2"/> : <CheckCircle className="w-5 h-5 mr-2" />}
              Convoquer
            </Button>
          </div>
          
          <div className="text-center mt-4">
             <button 
               onClick={() => {
                  if (confirm('Supprimer définitivement ?')) {
                    onDelete(candidature.id);
                    onClose();
                  }
               }}
               disabled={isSending}
               className="text-xs text-gray-400 hover:text-red-500 underline"
             >
               Supprimer cette candidature
             </button>
             <button onClick={onClose} disabled={isSending} className="ml-4 text-xs text-gray-400 hover:text-gray-600 underline">
               Fermer
             </button>
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