// Fichier: app/admin/zones/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Plus, Trash2, Edit, Save, X, MapPin } from 'lucide-react';

export default function ZonesAdmin() {
  const [zones, setZones] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  
  // État du formulaire
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#1B3A5F',
    delivery_time: '',
    tarif_start: '',
    quartiers: '', // String séparée par des virgules
    priority: 0,
    is_active: true
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    fetchZones();
  }, []);

  async function fetchZones() {
    const { data } = await supabase
      .from('coverage_zones')
      .select('*')
      .order('priority', { ascending: true });
    setZones(data || []);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingZone) {
        await supabase.from('coverage_zones').update(formData).eq('id', editingZone.id);
      } else {
        await supabase.from('coverage_zones').insert([formData]);
      }
      setShowForm(false);
      setEditingZone(null);
      fetchZones();
      // Reset form
      setFormData({ name: '', description: '', color: '#1B3A5F', delivery_time: '', tarif_start: '', quartiers: '', priority: 0, is_active: true });
    } catch (error) {
      alert('Erreur: ' + error.message);
    }
  }

  function handleEdit(zone) {
    setEditingZone(zone);
    setFormData(zone);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if(confirm('Supprimer cette zone ?')) {
      await supabase.from('coverage_zones').delete().eq('id', id);
      fetchZones();
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto sm:py-20 md:pb-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1B3A5F]">Gestion des Zones</h1>
        <button 
          onClick={() => { setEditingZone(null); setShowForm(true); }}
          className="bg-[#F4B223] text-[#1B3A5F] px-4 py-2 rounded-lg font-bold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Nouvelle Zone
        </button>
      </div>

      {/* Formulaire Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">{editingZone ? 'Modifier' : 'Ajouter'} une zone</h2>
              <button onClick={() => setShowForm(false)}><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom de la zone</label>
                  <input className="w-full p-2 border rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required placeholder="Ex: Cotonou Centre" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Couleur (Hex)</label>
                  <div className="flex gap-2">
                    <input type="color" className="h-10 w-10 p-0 border rounded cursor-pointer" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} />
                    <input type="text" className="flex-1 p-2 border rounded" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} />
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Délai estimé</label>
                  <input className="w-full p-2 border rounded" value={formData.delivery_time} onChange={e => setFormData({...formData, delivery_time: e.target.value})} placeholder="Ex: 30-45 min" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tarif de départ</label>
                  <input className="w-full p-2 border rounded" value={formData.tarif_start} onChange={e => setFormData({...formData, tarif_start: e.target.value})} placeholder="Ex: Dès 700 FCFA" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description courte</label>
                <input className="w-full p-2 border rounded" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Ex: Le cœur économique..." />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Quartiers (séparés par des virgules)</label>
                <textarea 
                  className="w-full p-2 border rounded h-32" 
                  value={formData.quartiers} 
                  onChange={e => setFormData({...formData, quartiers: e.target.value})} 
                  placeholder="Ganhi, Jonquet, Haie Vive..."
                  required 
                />
                <p className="text-xs text-gray-500 mt-1">Séparez les quartiers par une virgule.</p>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                   <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} />
                   Actif
                </label>
                <div className="flex items-center gap-2">
                   <span className="text-sm">Priorité:</span>
                   <input type="number" className="w-16 p-1 border rounded" value={formData.priority} onChange={e => setFormData({...formData, priority: parseInt(e.target.value)})} />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded">Annuler</button>
                <button type="submit" className="px-4 py-2 bg-[#1B3A5F] text-white rounded font-bold flex items-center gap-2">
                  <Save className="w-4 h-4" /> Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Liste des Zones */}
      <div className="grid md:grid-cols-2 gap-6">
        {zones.map((zone) => (
          <div key={zone.id} className="bg-white p-6 rounded-xl shadow border-t-4 relative group" style={{ borderColor: zone.color }}>
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(zone)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-5 h-5" /></button>
              <button onClick={() => handleDelete(zone.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-5 h-5" /></button>
            </div>

            <h3 className="font-bold text-xl text-[#1B3A5F] mb-1">{zone.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{zone.description}</p>
            
            <div className="flex gap-2 mb-4">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded font-medium">{zone.delivery_time}</span>
              <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded font-medium">{zone.tarif_start}</span>
            </div>

            <div>
               <p className="text-xs font-bold uppercase text-gray-400 mb-2">Quartiers :</p>
               <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{zone.quartiers}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}