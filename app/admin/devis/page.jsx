// Fichier: app/admin/devis/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { 
  FileText, Mail, Phone, Calendar, Eye, Send, Save,
  CheckCircle, Trash2, Building2, 
  ShoppingBag, Truck, X, MessageCircle, Star 
} from 'lucide-react';

export default function DevisPage() {
  const [devisList, setDevisList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDevis, setSelectedDevis] = useState(null);
  const [proposedPrice, setProposedPrice] = useState('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    fetchDevis();
  }, []);

  async function fetchDevis() {
    setIsLoading(true);
    const { data } = await supabase
      .from('devis_requests')
      .select('*')
      .order('created_at', { ascending: false });
    setDevisList(data || []);
    setIsLoading(false);
  }

  async function updateStatus(id, newStatus) {
    await supabase.from('devis_requests').update({ status: newStatus }).eq('id', id);
    setDevisList(devisList.map(d => d.id === id ? { ...d, status: newStatus } : d));
    if (selectedDevis) setSelectedDevis({ ...selectedDevis, status: newStatus });
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer définitivement ?")) return;
    await supabase.from('devis_requests').delete().eq('id', id);
    setDevisList(devisList.filter(d => d.id !== id));
    setSelectedDevis(null);
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('fr-FR', { 
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' 
  });

  const getTypeIcon = (type) => {
    switch(type) {
      case 'express': return <Truck className="w-4 h-4 mr-1" />;
      case 'ecommerce': return <ShoppingBag className="w-4 h-4 mr-1" />;
      case 'corporate': return <Building2 className="w-4 h-4 mr-1" />;
      default: return <FileText className="w-4 h-4 mr-1" />;
    }
  };

  // 🧠 FONCTION DE DÉTECTION AMÉLIORÉE (Insensible à la casse et aux émojis)
  const getPreference = (details) => {
    if (!details) return null;
    
    // On met tout en majuscules pour comparer
    const text = details.toUpperCase();
    
    // On cherche des mots clés simples
    if (text.includes("CONTACT: WHATSAPP")) return 'whatsapp';
    if (text.includes("CONTACT: APPEL")) return 'appel';
    if (text.includes("CONTACT: EMAIL")) return 'email';
    
    return null;
  };

  // --- NOUVELLE FONCTION CLICK-TO-DEAL ---
  async function handleSendQuote(channel) {
    if (!proposedPrice) return alert("Veuillez entrer un prix d'abord !");

    // 1. Sauvegarder le prix et changer le statut
    await supabase.from('devis_requests').update({ 
      proposed_price: proposedPrice,
      status: 'quoted'
    }).eq('id', selectedDevis.id);

    // 2. Mettre à jour l'affichage local
    const updatedDevis = { ...selectedDevis, status: 'quoted', proposed_price: proposedPrice };
    setDevisList(devisList.map(d => d.id === selectedDevis.id ? updatedDevis : d));
    setSelectedDevis(updatedDevis);

    // 3. Générer le message
    const montant = new Intl.NumberFormat('fr-FR').format(proposedPrice);
    
    if (channel === 'whatsapp') {
      const message = `Bonjour ${selectedDevis.name} 👋,\n\nMerci pour votre demande chez LE LIVREUR 2.0 !\n\nVoici notre tarif pour votre course :\n📍 De : ${selectedDevis.pickup_address || 'Départ'}\n📍 À : ${selectedDevis.delivery_address || 'Arrivée'}\n\n💰 *PRIX TOTAL : ${montant} FCFA*\n\nCela vous convient ? On lance le livreur ? 🚀`;
      
      const url = `https://wa.me/${selectedDevis.phone.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    } 
    else if (channel === 'email') {
      const subject = `Votre Devis LE LIVREUR 2.0 #${selectedDevis.id}`;
      const body = `Bonjour ${selectedDevis.name},\n\nSuite à votre demande, voici notre proposition tarifaire : ${montant} FCFA.\n\nCordialement,\nL'équipe LE LIVREUR 2.0`;
      window.location.href = `mailto:${selectedDevis.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }

  return (
    <div className="px-4 py-30 md:py-20 max-w-7xl mx-auto sm:py-20 md:pb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1B3A5F]">Gestion des Devis</h1>
          <p className="text-gray-500 text-sm mt-1">Suivi des demandes clients</p>
        </div>
        <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
          {devisList.length} dossiers
        </span>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#1B3A5F] text-white">
              <tr>
                <th className="px-6 py-4 text-sm font-medium">Date</th>
                <th className="px-6 py-4 text-sm font-medium">Client & Préférence</th>
                <th className="px-6 py-4 text-sm font-medium">Service</th>
                <th className="px-6 py-4 text-sm font-medium">Statut</th>
                <th className="px-6 py-4 text-sm font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                 <tr><td colSpan="5" className="p-12 text-center text-gray-500">Chargement des données...</td></tr>
              ) : devisList.length === 0 ? (
                <tr><td colSpan="5" className="p-12 text-center text-gray-500">Aucune demande de devis pour le moment.</td></tr>
              ) : devisList.map((devis) => {
                const pref = getPreference(devis.details);
                return (
                  <tr key={devis.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {formatDate(devis.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center mb-1">
                        <p className="font-bold text-[#1B3A5F] mr-2 text-base">{devis.name}</p>
                        {pref === 'whatsapp' && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full border border-green-200 uppercase tracking-wide flex items-center gap-1"><MessageCircle className="w-3 h-3"/> WA</span>}
                        {pref === 'appel' && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full border border-blue-200 uppercase tracking-wide flex items-center gap-1"><Phone className="w-3 h-3"/> Tél</span>}
                        {pref === 'email' && <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-full border border-purple-200 uppercase tracking-wide flex items-center gap-1"><Mail className="w-3 h-3"/> Mail</span>}
                      </div>
                      <div className="text-xs text-gray-500 space-y-0.5">
                        <div>{devis.phone}</div>
                        <div className="opacity-75">{devis.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border mb-1 shadow-sm
                        ${['express', 'programmee'].includes(devis.service_type) ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                          ['ecommerce', 'groupee'].includes(devis.service_type) ? 'bg-purple-50 text-purple-700 border-purple-200' : 
                          'bg-orange-50 text-orange-800 border-orange-200'}`}>
                        {getTypeIcon(devis.service_type)}
                        {devis.service_type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border flex w-fit items-center ${
                        devis.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                        devis.status === 'quoted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        devis.status === 'accepted' ? 'bg-green-50 text-green-700 border-green-200' :
                        'bg-gray-100 text-gray-600 border-gray-200'
                      }`}>
                        {devis.status === 'pending' && '⏳ En attente'}
                        {devis.status === 'quoted' && '📝 Devis fait'}
                        {devis.status === 'accepted' && '✅ Validé'}
                        {devis.status === 'rejected' && '❌ Rejeté'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => {
                          setSelectedDevis(devis);
                          setProposedPrice(devis.proposed_price || ''); // Charge le prix s'il existe déjà
                        }}
                        className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#1B3A5F] hover:text-white hover:border-[#1B3A5F] transition-all shadow-sm flex items-center ml-auto"
                      >
                        <Eye className="w-4 h-4 mr-2" /> Détails
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL DE DÉTAILS --- */}
      {selectedDevis && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col">
            
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-[#1B3A5F] flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-[#F4B223]" />
                  Dossier #{selectedDevis.id}
                </h2>
                <p className="text-sm text-gray-500">{selectedDevis.name} • {formatDate(selectedDevis.created_at)}</p>
              </div>
              <button onClick={() => setSelectedDevis(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              
              {/* ACTIONS DE CONTACT (LES 3 OPTIONS) */}
              <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-[#1B3A5F] flex items-center">
                    <Send className="w-5 h-5 mr-2 text-[#F4B223]" />
                    Réponse Rapide
                  </h3>
                  {/* Petit badge pour voir la préférence du client */}
                  {(() => {
                    const pref = getPreference(selectedDevis.details);
                    return pref ? (
                      <span className="text-xs bg-white px-2 py-1 rounded border text-gray-500">
                        Préfère : <strong>{pref.toUpperCase()}</strong>
                      </span>
                    ) : null;
                  })()}
                </div>

                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Prix à proposer (FCFA)</label>
                    <input 
                      type="text" 
                      value={proposedPrice}
                      onChange={(e) => setProposedPrice(e.target.value)}
                      placeholder="Ex: 5000"
                      className="w-full text-lg font-bold text-[#1B3A5F] p-3 rounded-lg border-2 border-blue-200 focus:border-[#F4B223] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button 
                    onClick={() => handleSendQuote('whatsapp')}
                    className="flex items-center justify-center py-3 px-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg font-bold transition-all shadow-md active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Envoyer WhatsApp
                  </button>
                  <button 
                    onClick={() => handleSendQuote('email')}
                    className="flex items-center justify-center py-3 px-4 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-lg font-bold transition-all active:scale-95"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Envoyer Email
                  </button>
                </div>
                
                {/* Bouton appel simple au cas où */}
                <div className="text-center mt-3 pt-3 border-t border-blue-200/50">
                   <a href={`tel:${selectedDevis.phone}`} className="text-xs text-blue-600 hover:underline font-medium flex items-center justify-center">
                     <Phone className="w-3 h-3 mr-1" /> Passer un appel simple
                   </a>
                </div>
              </div>

              {/* RAPPORT */}
              <div>
                <h3 className="font-bold text-[#1B3A5F] mb-3 flex items-center text-lg border-b pb-2">
                  Fiche Technique
                </h3>
                <div className="bg-[#F8FAFC] border border-gray-200 p-5 rounded-xl shadow-inner font-mono text-sm text-gray-800 leading-relaxed whitespace-pre-wrap overflow-x-auto">
                  {selectedDevis.details}
                </div>
              </div>

              {/* STATUT */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-700 mb-4 text-sm uppercase tracking-wide">Mettre à jour le statut</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <button onClick={() => updateStatus(selectedDevis.id, 'pending')} className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${selectedDevis.status === 'pending' ? 'bg-yellow-100 border-yellow-400 text-yellow-900 ring-2 ring-yellow-200' : 'bg-white hover:bg-gray-50'}`}>⏳ En attente</button>
                  <button onClick={() => updateStatus(selectedDevis.id, 'quoted')} className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${selectedDevis.status === 'quoted' ? 'bg-blue-100 border-blue-400 text-blue-900 ring-2 ring-blue-200' : 'bg-white hover:bg-gray-50'}`}>📝 Devisé</button>
                  <button onClick={() => updateStatus(selectedDevis.id, 'accepted')} className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${selectedDevis.status === 'accepted' ? 'bg-green-100 border-green-400 text-green-900 ring-2 ring-green-200' : 'bg-white hover:bg-gray-50'}`}>✅ Validé</button>
                  <button onClick={() => updateStatus(selectedDevis.id, 'rejected')} className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${selectedDevis.status === 'rejected' ? 'bg-red-100 border-red-400 text-red-900 ring-2 ring-red-200' : 'bg-white hover:bg-gray-50'}`}>❌ Rejeté</button>
                </div>
              </div>

            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
              <button onClick={() => handleDelete(selectedDevis.id)} className="text-red-500 hover:text-red-700 text-sm flex items-center font-medium hover:bg-red-50 px-3 py-2 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 mr-2" /> Supprimer
              </button>
              <button onClick={() => setSelectedDevis(null)} className="bg-[#1B3A5F] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-[#0F2847] shadow-md transition-all">
                Fermer
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}