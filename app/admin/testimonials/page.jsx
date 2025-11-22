// Fichier: app/admin/testimonials/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Plus, Trash2, Star, Save, X } from 'lucide-react';

export default function TestimonialsAdmin() {
  const [reviews, setReviews] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', role: '', content: '', rating: 5 });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    setReviews(data || []);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await supabase.from('testimonials').insert([newReview]);
    setNewReview({ name: '', role: '', content: '', rating: 5 });
    setIsFormOpen(false);
    fetchReviews();
  }

  async function handleDelete(id) {
    if(confirm('Supprimer cet avis ?')) {
      await supabase.from('testimonials').delete().eq('id', id);
      fetchReviews();
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1B3A5F]">Gestion des Avis Clients</h1>
        <button onClick={() => setIsFormOpen(true)} className="bg-[#F4B223] text-[#1B3A5F] px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <Plus className="w-5 h-5" /> Ajouter un avis
        </button>
      </div>

      {/* Formulaire Modal (Simplifié) */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nouvel Avis</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input placeholder="Nom (ex: Jean D.)" className="w-full p-2 border rounded" value={newReview.name} onChange={e => setNewReview({...newReview, name: e.target.value})} required />
              <input placeholder="Rôle (ex: Restaurateur)" className="w-full p-2 border rounded" value={newReview.role} onChange={e => setNewReview({...newReview, role: e.target.value})} />
              <textarea placeholder="Le message..." className="w-full p-2 border rounded" rows="3" value={newReview.content} onChange={e => setNewReview({...newReview, content: e.target.value})} required />
              <div>
                <label className="text-sm font-bold">Note : {newReview.rating}/5</label>
                <input type="range" min="1" max="5" className="w-full" value={newReview.rating} onChange={e => setNewReview({...newReview, rating: parseInt(e.target.value)})} />
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 border rounded">Annuler</button>
                <button type="submit" className="px-4 py-2 bg-[#1B3A5F] text-white rounded">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Liste des Avis */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-xl shadow border border-gray-100 relative group">
             <button onClick={() => handleDelete(review.id)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100"><Trash2 className="w-5 h-5" /></button>
             <div className="flex text-[#F4B223] mb-2">{[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
             <p className="text-gray-600 italic mb-4 text-sm">"{review.content}"</p>
             <div>
                <p className="font-bold text-[#1B3A5F]">{review.name}</p>
                <p className="text-xs text-gray-400">{review.role}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}