// Fichier: app/admin/hero-slides/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Upload, Plus, Edit, Trash2, Eye, EyeOff, Save, X } from 'lucide-react';

export default function HeroSlidesAdmin() {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);

  // Initialisation du client Supabase pour le navigateur
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Chargement initial
  useEffect(() => {
    fetchSlides();
  }, []);

  // Fonction pour récupérer les slides directement depuis la DB
  async function fetchSlides() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .order('priority', { ascending: true });
      
      if (error) throw error;
      
      setSlides(data || []);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du chargement des slides : ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Basculer Actif/Inactif
  async function toggleActive(id, currentStatus) {
    try {
      // Note : Assurez-vous que votre colonne s'appelle 'active' ou 'is_active' dans Supabase
      // Ici j'utilise 'is_active' car c'est ce qu'on avait mis dans le script SQL de création
      // Si votre colonne s'appelle 'active', changez 'is_active' par 'active' ci-dessous
      const { error } = await supabase
        .from('hero_slides')
        .update({ is_active: !currentStatus }) 
        .eq('id', id);

      if (error) throw error;
      
      await fetchSlides();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la modification');
    }
  }

  // Supprimer un slide
  async function deleteSlide(id) {
    if (!confirm('Supprimer définitivement ce slide ?')) return;

    try {
      const { error } = await supabase
        .from('hero_slides')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchSlides();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la suppression');
    }
  }

  if (isLoading && slides.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F4B223]" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1B3A5F]">Gestion Hero Slides</h1>
          <p className="text-gray-600 mt-1">
            {slides.length} slide{slides.length > 1 ? 's' : ''} · 
            {slides.filter(s => s.is_active).length} actif{slides.filter(s => s.is_active).length > 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => { setEditingSlide(null); setShowForm(true); }}
          className="bg-[#F4B223] text-[#1B3A5F] px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-[#D4920F] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouveau slide
        </button>
      </div>

      {/* Liste des slides */}
      {slides.length === 0 && !isLoading ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg mb-4">Aucun slide pour le moment</p>
          <button
            onClick={() => setShowForm(true)}
            className="text-[#F4B223] font-semibold hover:underline"
          >
            Créer le premier slide →
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {slides.map((slide) => (
            <div 
              key={slide.id} 
              className={`bg-white p-6 rounded-xl shadow-lg border-2 transition-all ${
                slide.is_active ? 'border-[#F4B223]' : 'border-gray-200 opacity-60'
              }`}
            >
              <div className="flex gap-6">
                {/* Preview image */}
                <div className="w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative group">
                  {slide.image_url ? (
                    <img 
                      src={slide.image_url} 
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Upload className="w-8 h-8" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Infos */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-[#1B3A5F]">{slide.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{slide.subtitle}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs px-3 py-1 bg-gray-100 rounded-full font-medium">
                          Priorité: {slide.priority}
                        </span>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          slide.is_active 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {slide.is_active ? '✓ Actif' : '✕ Inactif'}
                        </span>
                        {slide.bg_gradient && (
                          <span 
                            className="text-xs px-3 py-1 rounded-full text-white font-medium"
                            style={{ 
                              background: `linear-gradient(to right, ${slide.bg_gradient.replace('from-', '').replace('via-', '').replace('to-', '').split(' ').join(', ')})` 
                            }}
                          >
                            Gradient
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2 text-xs text-gray-500">
                        <span>CTA1: {slide.cta1_text}</span>
                        {slide.cta2_text && <span>· CTA2: {slide.cta2_text}</span>}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => toggleActive(slide.id, slide.is_active)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title={slide.is_active ? 'Désactiver' : 'Activer'}
                      >
                        {slide.is_active ? (
                          <Eye className="w-5 h-5 text-green-600" />
                        ) : (
                          <EyeOff className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      <button
                        onClick={() => { setEditingSlide(slide); setShowForm(true); }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-5 h-5 text-blue-600" />
                      </button>
                      <button
                        onClick={() => deleteSlide(slide.id)}
                        className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <SlideFormModal 
          slide={editingSlide}
          onClose={() => { setShowForm(false); setEditingSlide(null); }}
          onSave={() => { fetchSlides(); setShowForm(false); setEditingSlide(null); }}
          supabase={supabase} // On passe le client Supabase au composant enfant
        />
      )}
    </div>
  );
}

// --- COMPOSANT MODAL DE FORMULAIRE ---
function SlideFormModal({ slide, onClose, onSave, supabase }) {
  const [formData, setFormData] = useState({
    title: slide?.title || '',
    subtitle: slide?.subtitle || '',
    bg_gradient: slide?.bg_gradient || 'from-[#1B3A5F] via-[#2C5282] to-[#1B3A5F]',
    image_url: slide?.image_url || '',
    cta1_text: slide?.cta1_text || 'En savoir plus',
    cta1_link: slide?.cta1_link || '/',
    cta2_text: slide?.cta2_text || '',
    cta2_link: slide?.cta2_link || '',
    is_active: slide?.is_active !== false, // Par défaut actif
    priority: slide?.priority || 0,
  });

  const [isSaving, setIsSaving] = useState(false);

  const gradientPresets = [
    { name: 'Bleu Pro', value: 'from-[#1B3A5F] via-[#2C5282] to-[#1B3A5F]' },
    { name: 'Vert Éco', value: 'from-[#1B5E20] via-[#4CAF50] to-[#1B5E20]' },
    { name: 'Orange Business', value: 'from-[#E65100] via-[#FF9800] to-[#E65100]' },
    { name: 'Rouge Promo', value: 'from-[#C41E3A] via-[#FF6B6B] to-[#C41E3A]' },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);

    try {
      let error;
      
      if (slide) {
        // MODE UPDATE
        const { error: updateError } = await supabase
          .from('hero_slides')
          .update(formData)
          .eq('id', slide.id);
        error = updateError;
      } else {
        // MODE CREATE
        const { error: insertError } = await supabase
          .from('hero_slides')
          .insert([formData]);
        error = insertError;
      }

      if (error) throw error;

      onSave();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la sauvegarde : ' + error.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-[#1B3A5F]">
            {slide ? 'Modifier le slide' : 'Nouveau slide'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Titre */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Titre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4B223] focus:border-transparent outline-none"
              placeholder="Ex: Livraison Express à Cotonou"
            />
          </div>

          {/* Sous-titre */}
          <div>
            <label className="block text-sm font-semibold mb-2">Sous-titre</label>
            <textarea
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4B223] focus:border-transparent outline-none resize-none"
              rows="2"
              placeholder="Description courte..."
            />
          </div>

          {/* Gradient */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Gradient de fond <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
              {gradientPresets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => setFormData({ ...formData, bg_gradient: preset.value })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.bg_gradient === preset.value
                      ? 'border-[#F4B223] shadow-lg scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{
                    background: `linear-gradient(to right, ${preset.value.replace('from-', '').replace('via-', '').replace('to-', '').split(' ').join(', ')})`
                  }}
                >
                  <span className="text-white font-semibold text-xs drop-shadow-md">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
            <input
              type="text"
              required
              value={formData.bg_gradient}
              onChange={(e) => setFormData({ ...formData, bg_gradient: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-mono bg-gray-50"
              placeholder="from-[#1B3A5F] via-[#2C5282] to-[#1B3A5F]"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              URL de l'image
            </label>
            <input
              type="text"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4B223] focus:border-transparent outline-none"
              placeholder="/images/ma-photo.jpg ou https://..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Astuce : Utilisez Supabase Storage pour uploader vos images et coller le lien public ici.
            </p>
          </div>

          {/* CTAs - Ligne 1 */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Texte Bouton 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.cta1_text}
                onChange={(e) => setFormData({ ...formData, cta1_text: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#F4B223]"
                placeholder="Commander"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Lien Bouton 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.cta1_link}
                onChange={(e) => setFormData({ ...formData, cta1_link: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#F4B223]"
                placeholder="/contact"
              />
            </div>
          </div>

          {/* CTAs - Ligne 2 */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Texte Bouton 2</label>
              <input
                type="text"
                value={formData.cta2_text}
                onChange={(e) => setFormData({ ...formData, cta2_text: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#F4B223]"
                placeholder="En savoir plus"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Lien Bouton 2</label>
              <input
                type="text"
                value={formData.cta2_link}
                onChange={(e) => setFormData({ ...formData, cta2_link: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#F4B223]"
                placeholder="/services"
              />
            </div>
          </div>

          {/* Options (Active / Priority) */}
          <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-5 h-5 text-[#F4B223] rounded focus:ring-[#F4B223]"
              />
              <span className="font-semibold text-gray-700">Visible sur le site (Actif)</span>
            </label>
            
            <div className="flex items-center gap-3 ml-auto">
              <label className="font-semibold text-sm text-gray-700">Priorité (Ordre):</label>
              <input
                type="number"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center outline-none focus:border-[#F4B223]"
                min="0"
              />
            </div>
          </div>

          {/* Actions Buttons */}
          <div className="flex gap-3 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-lg font-bold hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-[#F4B223] text-[#1B3A5F] py-3 rounded-lg font-bold hover:bg-[#D4920F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1B3A5F]" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {slide ? 'Mettre à jour le slide' : 'Créer le slide'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}