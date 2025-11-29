// Fichier: app/admin/contacts/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { 
  MessageSquare, Mail, Phone, Calendar, Eye, 
  CheckCircle, Trash2, User, X, Inbox, MailOpen 
} from 'lucide-react';

export default function ContactsPage() {
  const [contactsList, setContactsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    setIsLoading(true);
    const { data } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    setContactsList(data || []);
    setIsLoading(false);
  }

  // Marquer comme Lu / Non lu
  async function toggleReadStatus(id, currentStatus) {
    await supabase
      .from('contacts')
      .update({ is_read: !currentStatus })
      .eq('id', id);
    
    setContactsList(contactsList.map(c => c.id === id ? { ...c, is_read: !currentStatus } : c));
    if (selectedMessage) setSelectedMessage({ ...selectedMessage, is_read: !currentStatus });
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer définitivement ce message ?")) return;
    await supabase.from('contacts').delete().eq('id', id);
    setContactsList(contactsList.filter(c => c.id !== id));
    setSelectedMessage(null);
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('fr-FR', { 
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' 
  });

  return (
    <div className="px-4 py-30 md:py-20 max-w-7xl mx-auto sm:py-20 md:pb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1B3A5F]">Boîte de Réception</h1>
          <p className="text-gray-500 text-sm mt-1">Messages du formulaire de contact</p>
        </div>
        <div className="flex gap-3">
          <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
            {contactsList.filter(c => !c.is_read).length} non lus
          </span>
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
            {contactsList.length} total
          </span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#1B3A5F] text-white">
              <tr>
                <th className="px-6 py-4 text-sm font-medium w-48">Date</th>
                <th className="px-6 py-4 text-sm font-medium w-64">Expéditeur</th>
                <th className="px-6 py-4 text-sm font-medium">Sujet</th>
                <th className="px-6 py-4 text-sm font-medium w-32">État</th>
                <th className="px-6 py-4 text-sm font-medium text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                 <tr><td colSpan="5" className="p-12 text-center text-gray-500">Chargement...</td></tr>
              ) : contactsList.length === 0 ? (
                <tr><td colSpan="5" className="p-12 text-center text-gray-500">Aucun message reçu.</td></tr>
              ) : contactsList.map((msg) => (
                <tr key={msg.id} className={`hover:bg-blue-50/30 transition-colors group ${!msg.is_read ? 'bg-blue-50/60' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {formatDate(msg.created_at)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center mb-1">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span className={`text-base ${!msg.is_read ? 'font-bold text-[#1B3A5F]' : 'font-medium text-gray-700'}`}>
                        {msg.name}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 pl-6">{msg.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-sm ${!msg.is_read ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                      {msg.subject}
                    </div>
                    <div className="text-xs text-gray-400 truncate max-w-[300px] mt-1">
                      {msg.message}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex w-fit items-center ${
                      !msg.is_read 
                        ? 'bg-red-100 text-red-700 border-red-200' 
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}>
                      {!msg.is_read ? <><Mail className="w-3 h-3 mr-1"/> Nouveau</> : <><MailOpen className="w-3 h-3 mr-1"/> Lu</>}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedMessage(msg)}
                      className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#1B3A5F] hover:text-white hover:border-[#1B3A5F] transition-all shadow-sm flex items-center ml-auto"
                    >
                      <Eye className="w-4 h-4 mr-2" /> Lire
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL DE LECTURE --- */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10 shadow-sm">
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${!selectedMessage.is_read ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                   <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1B3A5F]">{selectedMessage.subject}</h2>
                  <p className="text-sm text-gray-500">Reçu le {formatDate(selectedMessage.created_at)}</p>
                </div>
              </div>
              <button onClick={() => setSelectedMessage(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              
              {/* Actions Rapides (Répondre) */}
              <div className="grid grid-cols-3 gap-3">
                 <a 
                    href={`mailto:${selectedMessage.email}`} 
                    className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl border bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 transition-all"
                 >
                    <Mail className="w-6 h-6" />
                    <span className="font-bold text-xs">Répondre (Email)</span>
                 </a>

                 {selectedMessage.phone ? (
                   <>
                     <a 
                        href={`tel:${selectedMessage.phone}`} 
                        className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl border bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 transition-all"
                     >
                        <Phone className="w-6 h-6" />
                        <span className="font-bold text-xs">Appeler</span>
                     </a>
                     <a 
                        href={`https://wa.me/${selectedMessage.phone.replace(/\D/g,'')}`} 
                        target="_blank" rel="noreferrer"
                        className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl border bg-green-50 border-green-200 text-green-700 hover:bg-green-100 transition-all"
                     >
                        <MessageSquare className="w-6 h-6" />
                        <span className="font-bold text-xs">WhatsApp</span>
                     </a>
                   </>
                 ) : (
                   <div className="col-span-2 flex items-center justify-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-gray-100 italic">
                      Pas de numéro de téléphone
                   </div>
                 )}
              </div>

              {/* Info Expéditeur */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                 <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#1B3A5F] rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                       {selectedMessage.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                       <p className="font-bold text-gray-900">{selectedMessage.name}</p>
                       <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                    </div>
                 </div>
                 {selectedMessage.phone && (
                    <span className="text-sm font-mono bg-white px-2 py-1 rounded border">{selectedMessage.phone}</span>
                 )}
              </div>

              {/* Corps du Message */}
              <div>
                <h3 className="font-bold text-gray-700 mb-2 text-sm uppercase tracking-wide">Message</h3>
                <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
                  {selectedMessage.message}
                </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
              <div className="flex gap-2">
                 <button 
                   onClick={() => toggleReadStatus(selectedMessage.id, selectedMessage.is_read)}
                   className={`px-4 py-2 rounded-lg text-sm font-bold border transition-colors flex items-center ${
                     selectedMessage.is_read 
                       ? 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100' 
                       : 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200'
                   }`}
                 >
                   {selectedMessage.is_read ? 'Marquer comme non lu' : 'Marquer comme lu'}
                 </button>
                 
                 <button 
                   onClick={() => handleDelete(selectedMessage.id)}
                   className="px-4 py-2 rounded-lg text-sm font-bold text-red-600 border border-transparent hover:bg-red-50 transition-colors flex items-center"
                 >
                   <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                 </button>
              </div>
              
              <button onClick={() => setSelectedMessage(null)} className="bg-[#1B3A5F] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#0F2847]">
                Fermer
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}