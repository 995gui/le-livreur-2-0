// Fichier: app/admin/tarifs/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Plus, Trash2, Save, MapPin } from 'lucide-react';

export default function TarifsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Formulaire d'ajout
  const [newItem, setNewItem] = useState({
    departure_zone: 'Cotonou',
    destination: '',
    price_display: '',
    priority: 0
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await supabase
      .from('pricing_grid')
      .select('*')
      .order('priority', { ascending: true });
    setItems(data || []);
    setLoading(false);
  }

  async function handleAdd(e) {
    e.preventDefault();
    const { error } = await supabase.from('pricing_grid').insert([newItem]);
    if (!error) {
      setNewItem({ ...newItem, destination: '', price_display: '' });
      fetchData();
    } else {
      alert('Erreur lors de l\'ajout');
    }
  }

  async function handleDelete(id) {
    if(confirm('Supprimer cette ligne ?')) {
      await supabase.from('pricing_grid').delete().eq('id', id);
      fetchData();
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto sm:py-20 md:pb-8">
      <h1 className="text-3xl font-bold text-[#1B3A5F] mb-8">Gestion de la Grille Tarifaire</h1>

      {/* Formulaire d'ajout */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
        <h3 className="font-bold mb-4 text-gray-700">Ajouter une ligne</h3>
        <form onSubmit={handleAdd} className="grid md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Départ de :</label>
            <select 
              className="w-full p-2 border rounded"
              value={newItem.departure_zone}
              onChange={e => setNewItem({...newItem, departure_zone: e.target.value})}
            >
              <option value="Cotonou">Cotonou</option>
              <option value="Calavi">Calavi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Destination</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded"
              placeholder="Ex: Centre-ville"
              value={newItem.destination}
              onChange={e => setNewItem({...newItem, destination: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Prix (Texte)</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded"
              placeholder="Ex: 700F / 1000F"
              value={newItem.price_display}
              onChange={e => setNewItem({...newItem, price_display: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="bg-[#F4B223] text-[#1B3A5F] font-bold py-2 px-4 rounded hover:bg-[#D4920F]">
            <Plus className="w-5 h-5 inline mr-1" /> Ajouter
          </button>
        </form>
      </div>

      {/* Liste des Tarifs (Deux colonnes visuelles) */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Colonne Cotonou */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="bg-[#1B3A5F] text-white p-4 font-bold flex items-center">
            <MapPin className="w-5 h-5 mr-2" /> Départs de COTONOU
          </div>
          <div className="divide-y">
            {items.filter(i => i.departure_zone === 'Cotonou').map(item => (
              <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50 group">
                <div>
                  <p className="font-medium text-gray-800">{item.destination}</p>
                  <p className="text-[#1B3A5F] font-bold">{item.price_display}</p>
                </div>
                <button onClick={() => handleDelete(item.id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne Calavi */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="bg-[#F4B223] text-[#1B3A5F] p-4 font-bold flex items-center">
            <MapPin className="w-5 h-5 mr-2" /> Départs de CALAVI
          </div>
          <div className="divide-y">
            {items.filter(i => i.departure_zone === 'Calavi').map(item => (
              <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50 group">
                <div>
                  <p className="font-medium text-gray-800">{item.destination}</p>
                  <p className="text-[#1B3A5F] font-bold">{item.price_display}</p>
                </div>
                <button onClick={() => handleDelete(item.id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}