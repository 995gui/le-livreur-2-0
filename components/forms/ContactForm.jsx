// Fichier: components/forms/ContactForm.jsx
'use client';

import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Send, User, Phone, Mail, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // ✅ Validation robuste
  const validateForm = () => {
    const newErrors = {};

    // Nom (minimum 3 caractères)
    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = 'Le nom doit contenir au moins 3 caractères';
    }

    // Téléphone (format béninois ou international)
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    // Email (optionnel mais doit être valide si renseigné)
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Adresse email invalide';
      }
    }

    // Message (minimum 10 caractères)
    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Gestion des changements avec nettoyage des erreurs
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  // ✅ Soumission avec gestion d'erreurs complète
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validation locale
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "❌ Formulaire incomplet",
        description: "Veuillez corriger les erreurs avant d'envoyer"
      });
      return;
    }

    setIsSubmitting(true);

    // 2. Préparation des données (Gestion du sujet par défaut)
    const finalData = {
        ...formData,
        subject: formData.subject || "Demande de contact générale" 
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // ✅ Affichage succès
        setIsSuccess(true);
        toast({
          title: "✅ Message envoyé !",
          description: "Nous vous répondrons dans les plus brefs délais.",
          duration: 5000,
        });

        // Reset formulaire après 3 secondes
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
          });
          setIsSuccess(false);
        }, 3000);
      } else {
        throw new Error(result.message || 'Échec de l\'envoi');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        variant: "destructive",
        title: "❌ Erreur d'envoi",
        description: "Impossible d'envoyer votre message. Vérifiez votre connexion.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Composant Message d'Erreur
  const ErrorMessage = ({ message }) => (
    message ? (
      <div className="flex items-center gap-1 text-red-600 text-xs mt-1 animate-in fade-in">
        <AlertCircle className="w-3 h-3 flex-shrink-0" />
        <span>{message}</span>
      </div>
    ) : null
  );

  // État de succès visuel
  if (isSuccess) {
    return (
      <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#1B3A5F] mb-2">Message envoyé !</h3>
        <p className="text-gray-600">Merci de nous avoir contactés.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* Nom complet */}
      <div>
        <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          Nom complet <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Votre nom et prénom"
          className={`h-12 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
          aria-invalid={!!errors.name}
        />
        <ErrorMessage message={errors.name} />
      </div>

      {/* Téléphone */}
      <div>
        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" />
          Téléphone / WhatsApp <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+229 01 XX XX XX"
          className={`h-12 ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
          aria-invalid={!!errors.phone}
        />
        <ErrorMessage message={errors.phone} />
      </div>

      {/* Email (optionnel) */}
      <div>
        <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          Email <span className="text-xs text-gray-400">(optionnel)</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="votre.email@exemple.com"
          className={`h-12 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
          aria-invalid={!!errors.email}
        />
        <ErrorMessage message={errors.email} />
      </div>

      {/* Sujet */}
      <div>
        <Label htmlFor="subject" className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gray-400" />
          Sujet <span className="text-xs text-gray-400">(optionnel)</span>
        </Label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full h-12 rounded-md border border-gray-300 px-3 bg-white focus:ring-2 focus:ring-[#F4B223] focus:border-[#F4B223] ${errors.subject ? 'border-red-500' : ''}`}
        >
          <option value="">Sélectionnez un sujet...</option>
          <option value="Demande de devis">📋 Demande de devis</option>
          <option value="Suivi de livraison">📦 Suivi de livraison</option>
          <option value="Partenariat">🤝 Partenariat professionnel</option>
          <option value="Réclamation">⚠️ Réclamation</option>
          <option value="Information">ℹ️ Demande d'information</option>
          <option value="Autre">💬 Autre</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message" className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-gray-400" />
            Votre message <span className="text-red-500">*</span>
          </span>
          <span className="text-xs text-gray-400">
            {formData.message.length}/500
          </span>
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Décrivez votre besoin ou posez votre question..."
          maxLength={500}
          rows={5}
          className={`resize-none ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
          aria-invalid={!!errors.message}
        />
        <ErrorMessage message={errors.message} />
      </div>

      {/* Bouton de soumission */}
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full h-12 bg-[#F4B223] hover:bg-[#D4920F] text-[#1B3A5F] font-bold text-lg shadow-lg transition-all disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Envoyer le message
          </>
        )}
      </Button>

      {/* Note de confidentialité */}
      <p className="text-xs text-gray-500 text-center mt-4">
        🔒 Vos données sont protégées et ne seront utilisées que pour répondre à votre demande
      </p>
    </form>
  );
}