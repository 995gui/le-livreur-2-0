// Fichier: app/admin/partners/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Plus, Trash2, Save, Upload, X, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function PartnersAdmin() {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  // Formulaire d'ajout rapide
  const [newPartner, setNewPartner] = useState({ name: '', website: '' });
  const [file, setFile] = useState(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    fetchPartners();
  }, []);

  async function fetchPartners() {
    const { data } = await supabase
      .from('partners')
      .select('*')
      .order('priority', { ascending: true });
    setPartners(data || []);
    setIsLoading(false);
  }

  async function handleAddPartner(e) {
    e.preventDefault();
    if (!newPartner.name) return;
    setIsUploading(true);

    try {
      let logo_url = null;

      // 1. Upload du logo (si présent)
      if (file) {
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
        const { error: uploadError } = await supabase.storage
          .from('partner_logos')
          .upload(filename, file);
        
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('partner_logos')
          .getPublicUrl(filename);
          
        logo_url = urlData.publicUrl;
      }

      // 2. Insertion en base
      const { error } = await supabase
        .from('partners')
        .insert([{
          name: newPartner.name,
          website: newPartner.website,
          logo_url: logo_url,
          is_active: true
        }]);

      if (error) throw error;

      // Reset
      setNewPartner({ name: '', website: '' });
      setFile(null);
      fetchPartners();
    } catch (error) {
      alert('Erreur: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDelete(id, logoUrl) {
    if (!confirm('Supprimer ce partenaire ?')) return;

    // Supprimer l'image du stockage si elle existe (optionnel mais propre)
    /* if (logoUrl) { ... logique de suppression bucket ... } */

    await supabase.from('partners').delete().eq('id', id);
    fetchPartners();
  }

  return (
    <div className="px-4 py-30 md:py-20 max-w-7xl mx-auto sm:py-20 md:pb-8">
      <h1 className="text-3xl font-bold text-[#1B3A5F] mb-8">Gestion des Partenaires</h1>

      {/* Formulaire d'ajout (Carte en haut) */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
        <h3 className="text-lg font-bold mb-4 text-gray-700">Ajouter un nouveau partenaire</h3>
        <form onSubmit={handleAddPartner} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input 
              type="text" 
              required
              value={newPartner.name}
              onChange={(e) => setNewPartner({...newPartner, name: e.target.value})}
              className="w-full p-2 border rounded-lg"
              placeholder="Ex: Super U"
            />
          </div>
          
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo (Image)</label>
            <div className="relative">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-full p-2 border border-dashed rounded-lg text-gray-500 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                {file ? (
                  <span className="text-[#1B3A5F] font-medium truncate">{file.name}</span>
                ) : (
                  <><Upload className="w-4 h-4 mr-2" /> Choisir un logo</>
                )}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isUploading}
            className="bg-[#F4B223] text-[#1B3A5F] font-bold px-6 py-2 rounded-lg hover:bg-[#D4920F] transition-colors h-[42px] flex items-center justify-center min-w-[120px]"
          >
            {isUploading ? '...' : <><Plus className="w-5 h-5 mr-1" /> Ajouter</>}
          </button>
        </form>
      </div>

      {/* Liste des Partenaires */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {partners.map((partner) => (
          <div key={partner.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 relative group">
            <button 
              onClick={() => handleDelete(partner.id, partner.logo_url)}
              className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="h-20 flex items-center justify-center mb-3">
              {partner.logo_url ? (
                <div className="relative w-full h-full">
                   <Image 
                    src={partner.logo_url} 
                    alt={partner.name} 
                    fill 
                    className="object-contain"
                  />
                </div>
              ) : (
                <span className="text-xl font-bold text-gray-300">{partner.name}</span>
              )}
            </div>
            
            <p className="text-center font-medium text-sm text-[#1B3A5F] truncate">
              {partner.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}