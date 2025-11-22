'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Upload, Plus, Edit, Trash2, Eye, EyeOff, Save, X, Loader2, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

export default function HeroSlidesAdmin() {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  
  // --- GESTION NOTIFICATIONS ---
  const [notification, setNotification] = useState(null);
  const notify = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // --- GESTION SUPPRESSION (NOUVEAU) ---
  const [slideToDelete, setSlideToDelete] = useState(null); // Stocke l'ID du slide à supprimer
  const [isDeleting, setIsDeleting] = useState(false);      // Loading state pour le bouton supprimer

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    fetchSlides();
  }, []);

  async function fetchSlides() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('hero_slides').select('*').order('priority', { ascending: true });
      if (error) throw error;
      setSlides(data || []);
    } catch (error) {
      console.error('Erreur:', error);
      notify('error', 'Impossible de charger les slides');
    } finally {
      setIsLoading(false);
    }
  }

  async function toggleActive(id, currentStatus) {
    try {
      const { error } = await supabase.from('hero_slides').update({ is_active: !currentStatus }).eq('id', id);
      if (error) throw error;
      await fetchSlides();
      notify('success', currentStatus ? 'Slide désactivé' : 'Slide activé');
    } catch (error) {
      notify('error', 'Erreur lors de la modification');
    }
  }

  // --- FONCTION DE SUPPRESSION FINALE ---
  async function confirmDelete() {
    if (!slideToDelete) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('hero_slides')
        .delete()
        .eq('id', slideToDelete);

      if (error) throw error;
      
      await fetchSlides();
      notify('success', 'Slide supprimé définitivement');
      setSlideToDelete(null); // On ferme la modale
    } catch (error) {
      console.error('Erreur:', error);
      notify('error', 'Erreur lors de la suppression');
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading && slides.length === 0) {
    return <div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin h-12 w-12 text-[#F4B223]" /></div>;
  }

  return (
    // Padding réduit sur mobile (p-4) et agrandi sur desktop (md:p-8)
    <div className="p-4 md:p-8 max-w-7xl mx-auto sm:py-20 md:pb-8">
      {notification && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl animate-in slide-in-from-top-5 fade-in duration-300 ${
          notification.type === 'success' ? 'bg-[#1B3A5F] text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-6 h-6 text-[#F4B223]" />
          ) : (
            <AlertCircle className="w-6 h-6 text-white" />
          )}
          <p className="font-medium text-sm">{notification.message}</p>
          <button onClick={() => setNotification(null)} className="ml-2 opacity-70 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1B3A5F]">Gestion Hero Slides</h1>
          <p className="text-gray-600 text-sm mt-1">
            {slides.length} slide{slides.length > 1 ? 's' : ''} · 
            {slides.filter(s => s.is_active).length} actif{slides.filter(s => s.is_active).length > 1 ? 's' : ''}
          </p>
        </div>
        
        <button
          onClick={() => { setEditingSlide(null); setShowForm(true); }}
          className="w-full sm:w-auto bg-[#F4B223] text-[#1B3A5F] px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#D4920F] transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nouveau slide
        </button>
      </div>

      {/* Liste des slides */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-[#F4B223] animate-spin" />
        </div>
      ) : slides.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg mb-4">Aucun slide pour le moment</p>
          <button onClick={() => setShowForm(true)} className="text-[#F4B223] font-semibold hover:underline">
            Créer le premier slide →
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:gap-6">
          {slides.map((slide) => (
            <div key={slide.id} className={`bg-white rounded-xl shadow-sm border transition-all overflow-hidden ${slide.is_active ? 'border-[#F4B223] shadow-md' : 'border-gray-200 opacity-75'}`}>
              <div className="flex flex-col sm:flex-row">
                <div className="w-full h-48 sm:w-48 sm:h-auto bg-gray-100 relative flex-shrink-0">
                  {slide.image_url ? (
                    <img src={slide.image_url} alt={slide.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400"><Upload className="w-8 h-8" /></div>
                  )}
                </div>

                <div className="p-4 md:p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-lg md:text-xl font-bold text-[#1B3A5F] mb-1">{slide.title}</h3>
                      <span className="flex-shrink-0 text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">#{slide.priority}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{slide.subtitle}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1 ${slide.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {slide.is_active ? 'Active' : 'Inactive'}
                      </span>
                      {slide.bg_gradient && (
                        <span className="text-[10px] px-2 py-1 rounded-md text-white font-medium"
                          style={{ background: `linear-gradient(to right, ${slide.bg_gradient.replace('from-', '').replace('via-', '').replace('to-', '').split(' ').join(', ')})` }}>
                          Gradient
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 pt-3 border-t sm:border-t-0 sm:pt-0 sm:mt-0 flex justify-end items-center gap-2">
                    <button onClick={() => toggleActive(slide.id, slide.is_active)} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200">
                      {slide.is_active ? <Eye className="w-5 h-5 text-green-600" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
                    </button>
                    <button onClick={() => { setEditingSlide(slide); setShowForm(true); }} className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-100 text-blue-600">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setSlideToDelete(slide.id)} 
                      className="p-2 bg-red-50 hover:bg-red-100 rounded-lg border border-red-100 text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {slideToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Supprimer ce slide ?</h3>
              <p className="text-gray-500 text-sm mb-6">
                Cette action est irréversible. Le slide sera définitivement retiré de votre base de données.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setSlideToDelete(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  disabled={isDeleting}
                >
                  Annuler
                </button>
                <button onClick={confirmDelete} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg border border-red-100 text-red-600">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <SlideFormModal 
          slide={editingSlide}
          onClose={() => { setShowForm(false); setEditingSlide(null); }}
          onSave={() => { fetchSlides(); setShowForm(false); setEditingSlide(null); }}
          supabase={supabase}
          notify={notify} // <--- On passe la fonction de notification ici
        />
      )}
    </div>
  );
}

function SlideFormModal({ slide, onClose, onSave, supabase, notify }) {
  
  // --- GESTION COULEURS ---
  const extractColors = (gradientStr) => {
    const defaultColors = { from: '#1B3A5F', via: '#2C5282', to: '#1B3A5F' };
    if (!gradientStr) return defaultColors;
    try {
      const fromMatch = gradientStr.match(/from-\[(#[a-fA-F0-9]{6})\]/);
      const viaMatch = gradientStr.match(/via-\[(#[a-fA-F0-9]{6})\]/);
      const toMatch = gradientStr.match(/to-\[(#[a-fA-F0-9]{6})\]/);
      return {
        from: fromMatch ? fromMatch[1] : defaultColors.from,
        via: viaMatch ? viaMatch[1] : defaultColors.via,
        to: toMatch ? toMatch[1] : defaultColors.to,
      };
    } catch (e) { return defaultColors; }
  };

  const initialColors = extractColors(slide?.bg_gradient);

  const [formData, setFormData] = useState({
    title: slide?.title || '',
    subtitle: slide?.subtitle || '',
    bg_gradient: slide?.bg_gradient || `from-[${initialColors.from}] via-[${initialColors.via}] to-[${initialColors.to}]`,
    image_url: slide?.image_url || '',
    cta1_text: slide?.cta1_text || 'En savoir plus',
    cta1_link: slide?.cta1_link || '/',
    cta2_text: slide?.cta2_text || '',
    cta2_link: slide?.cta2_link || '',
    is_active: slide?.is_active !== false,
    priority: slide?.priority || 0,
  });

  const [colors, setColors] = useState(initialColors);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const newGradientString = `from-[${colors.from}] via-[${colors.via}] to-[${colors.to}]`;
    setFormData(prev => ({ ...prev, bg_gradient: newGradientString }));
  }, [colors]);

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `hero-slides/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
      notify('success', 'Image uploadée !'); // Notification au lieu d'alert

    } catch (error) {
      console.error('Erreur upload:', error);
      notify('error', 'Échec de l\'upload image'); // Notification au lieu d'alert
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // --- 1. VALIDATION STRICTE (Sécurité) ---
    // On vérifie que les champs obligatoires ne sont pas vides ou juste des espaces
    if (!formData.title || formData.title.trim() === '') {
      notify('error', 'Le titre est obligatoire !');
      return; // On arrête tout ici
    }

    if (!formData.cta1_text || formData.cta1_text.trim() === '') {
      notify('error', 'Le texte du bouton 1 est requis');
      return;
    }

    if (!formData.cta1_link || formData.cta1_link.trim() === '') {
      notify('error', 'Le lien du bouton 1 est requis');
      return;
    }

    if (!formData.image_url) {
      notify('error', 'Veuillez ajouter une image');
      return;
    }

    // --- 2. SI TOUT EST BON, ON ENVOIE ---
    setIsSaving(true);

    try {
      let error;
      
      // Nettoyage des données avant envoi (éviter les espaces inutiles)
      const cleanData = {
        ...formData,
        title: formData.title.trim(),
        subtitle: formData.subtitle?.trim() || '',
        cta1_text: formData.cta1_text.trim(),
        cta1_link: formData.cta1_link.trim(),
        cta2_text: formData.cta2_text?.trim() || '',
        cta2_link: formData.cta2_link?.trim() || '',
      };

      if (slide) {
        // MODE UPDATE
        const { error: updateError } = await supabase
          .from('hero_slides')
          .update(cleanData) // On envoie cleanData au lieu de formData
          .eq('id', slide.id);
        error = updateError;
      } else {
        // MODE CREATE
        const { error: insertError } = await supabase
          .from('hero_slides')
          .insert([cleanData]); // On envoie cleanData au lieu de formData
        error = insertError;
      }

      if (error) throw error;
      
      notify('success', slide ? 'Slide modifié avec succès' : 'Nouveau slide créé !');
      onSave();
    } catch (error) {
      console.error('Erreur:', error);
      notify('error', error.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 backdrop-blur-sm">
      <div className="bg-white w-full h-[95vh] sm:h-auto sm:max-h-[90vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300 max-w-3xl">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-4 py-4 flex items-center justify-between z-10 flex-shrink-0">
          <h2 className="text-xl font-bold text-[#1B3A5F]">
            {slide ? 'Modifier' : 'Nouveau slide'}
          </h2>
          <button onClick={onClose} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
          
          {/* Titre & Sous-titre */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Titre <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F4B223] focus:border-transparent outline-none text-lg"
              placeholder="Titre principal..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Sous-titre</label>
            <textarea
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F4B223] focus:border-transparent outline-none resize-none"
              rows="2"
              placeholder="Description..."
            />
          </div>

          {/* --- UPLOAD IMAGE (NOUVEAU) --- */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Image du slide</label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 flex flex-col items-center justify-center gap-3 text-center relative overflow-hidden hover:bg-gray-100 transition-colors">
              
              {isUploading ? (
                // État de chargement
                <div className="py-8 flex flex-col items-center text-[#F4B223]">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <span className="text-sm font-medium text-gray-600">Envoi en cours...</span>
                </div>
              ) : formData.image_url ? (
                // État : Image présente (Preview)
                <div className="w-full relative group">
                  <img 
                    src={formData.image_url} 
                    alt="Preview" 
                    className="h-48 w-full object-contain rounded-lg bg-white border"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    <label className="cursor-pointer bg-white text-gray-800 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 mr-2">
                      Changer
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload} 
                      />
                    </label>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, image_url: ''})}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  {/* Bouton mobile visible toujours si pas hover */}
                  <label className="sm:hidden absolute bottom-2 right-2 bg-[#F4B223] text-[#1B3A5F] p-2 rounded-full shadow-lg">
                    <Upload className="w-5 h-5" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              ) : (
                // État : Pas d'image (Zone de drop)
                <label className="cursor-pointer w-full py-6 flex flex-col items-center">
                  <div className="bg-white p-3 rounded-full shadow-sm mb-2">
                    <Upload className="w-6 h-6 text-[#1B3A5F]" />
                  </div>
                  <span className="text-sm font-bold text-[#1B3A5F]">Cliquez pour ajouter une image</span>
                  <span className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 2MB</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload} 
                  />
                </label>
              )}
            </div>
            
            {/* Champ URL de secours (optionnel, caché si upload utilisé mais utile pour debug) */}
            {formData.image_url && (
               <div className="mt-2 text-xs text-gray-400 truncate">
                 URL: {formData.image_url}
               </div>
            )}
          </div>

          {/* --- SELECTEUR GRADIENT --- */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <label className="block text-sm font-semibold mb-3 text-gray-700">Dégradé de fond</label>
            <div 
              className="h-12 w-full rounded-lg mb-4 shadow-inner border border-black/5"
              style={{ background: `linear-gradient(to right, ${colors.from}, ${colors.via}, ${colors.to})` }}
            />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-10 rounded-lg border overflow-hidden relative">
                <input type="color" value={colors.from} onChange={(e) => setColors({ ...colors, from: e.target.value })} className="absolute -top-2 -left-2 w-[150%] h-[150%] cursor-pointer border-0" />
              </div>
              <div className="h-10 rounded-lg border overflow-hidden relative">
                <input type="color" value={colors.via} onChange={(e) => setColors({ ...colors, via: e.target.value })} className="absolute -top-2 -left-2 w-[150%] h-[150%] cursor-pointer border-0" />
              </div>
              <div className="h-10 rounded-lg border overflow-hidden relative">
                <input type="color" value={colors.to} onChange={(e) => setColors({ ...colors, to: e.target.value })} className="absolute -top-2 -left-2 w-[150%] h-[150%] cursor-pointer border-0" />
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bouton 1</p>
              <input
                type="text"
                required
                value={formData.cta1_text}
                onChange={(e) => setFormData({ ...formData, cta1_text: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                placeholder="Texte"
              />
              <input
                type="text"
                required
                value={formData.cta1_link}
                onChange={(e) => setFormData({ ...formData, cta1_link: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm font-mono bg-gray-50"
                placeholder="Lien"
              />
            </div>
            <div className="space-y-2 pt-2 sm:pt-0 border-t sm:border-0">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bouton 2</p>
              <input
                type="text"
                value={formData.cta2_text}
                onChange={(e) => setFormData({ ...formData, cta2_text: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                placeholder="Texte"
              />
              <input
                type="text"
                value={formData.cta2_link}
                onChange={(e) => setFormData({ ...formData, cta2_link: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm font-mono bg-gray-50"
                placeholder="Lien"
              />
            </div>
          </div>

          {/* Footer Options */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
             <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.is_active ? 'bg-green-500' : 'bg-gray-300'}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${formData.is_active ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
              <input type="checkbox" className="hidden" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />
              <span className="font-semibold text-sm text-gray-700">Actif</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Ordre:</span>
              <input type="number" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })} className="w-16 px-2 py-1 border rounded-lg text-center font-bold" />
            </div>
          </div>
        </form>

        {/* Actions Footer */}
        <div className="p-4 border-t bg-gray-50 flex gap-3 flex-shrink-0 pb-8 sm:pb-4">
          <button onClick={onClose} className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-white">Annuler</button>
          <button onClick={handleSubmit} disabled={isSaving || isUploading} className="flex-1 bg-[#F4B223] text-[#1B3A5F] py-3 rounded-xl font-bold hover:bg-[#D4920F] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg">
            {isSaving ? <Loader2 className="animate-spin w-5 h-5" /> : <><Save className="w-5 h-5" /> <span>Sauvegarder</span></>}
          </button>
        </div>
      </div>
    </div>
  );
}