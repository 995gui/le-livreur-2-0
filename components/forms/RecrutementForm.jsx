// Fichier: components/forms/RecrutementForm.jsx
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Upload, CheckCircle } from 'lucide-react';

export default function RecrutementForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validation de la taille (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Fichier trop volumineux",
          description: "Le CV ne doit pas dépasser 5MB",
        });
        e.target.value = '';
        setSelectedFile(null);
        return;
      }

      // Validation du type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Format non supporté",
          description: "Veuillez utiliser un fichier PDF, DOC ou DOCX",
        });
        e.target.value = '';
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Récupération des données du formulaire
      const formData = new FormData(e.target);

      // Validation côté client
      const phone = formData.get('phone');
      const phoneRegex = /^(\+229)?[0-9]{8,10}$/;
      
      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        toast({
          variant: "destructive",
          title: "Numéro invalide",
          description: "Veuillez entrer un numéro de téléphone valide",
        });
        setIsSubmitting(false);
        return;
      }

      // Envoi vers l'API
      const response = await fetch('/api/recrutement', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Toast de succès
        toast({
          title: "Candidature envoyée ! ✅",
          description: result.message,
          duration: 6000,
        });

        // Réinitialisation du formulaire
        e.target.reset();
        setSelectedFile(null);

        // Animation de succès (optionnel)
        setTimeout(() => {
          toast({
            title: "Prochaine étape",
            description: "Notre équipe RH vous contactera sous 48h pour la suite du processus.",
          });
        }, 3000);

      } else {
        // Toast d'erreur
        toast({
          variant: "destructive",
          title: "Erreur",
          description: result.message || "Une erreur est survenue",
        });
      }

    } catch (error) {
      console.error('Erreur:', error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Impossible de soumettre le formulaire. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nom complet */}
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="name" className="text-base font-semibold">
          Nom complet <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Ex: Jean ZOSSOU"
          required
          disabled={isSubmitting}
          className="h-12 text-base"
        />
      </div>

      {/* Téléphone */}
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="phone" className="text-base font-semibold">
          Numéro de téléphone <span className="text-red-500">*</span>
        </Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          placeholder="+229 XX XX XX XX"
          required
          disabled={isSubmitting}
          className="h-12 text-base"
        />
        <p className="text-xs text-gray-500">
          Format: +229XXXXXXXX ou XXXXXXXX
        </p>
      </div>

      {/* Email */}
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="email" className="text-base font-semibold">
          Adresse e-mail <span className="text-gray-400">(optionnel)</span>
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="vous@email.com"
          disabled={isSubmitting}
          className="h-12 text-base"
        />
      </div>

      {/* Motivation */}
      <div className="grid w-full gap-2">
        <Label htmlFor="motivation" className="text-base font-semibold">
          Pourquoi voulez-vous nous rejoindre ? <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="motivation"
          name="motivation"
          placeholder="Parlez-nous de vos motivations, votre expérience et ce qui vous intéresse dans ce poste..."
          required
          disabled={isSubmitting}
          className="min-h-[120px] text-base"
          maxLength={1000}
        />
        <p className="text-xs text-gray-500 text-right">
          Maximum 1000 caractères
        </p>
      </div>

      {/* CV Upload */}
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="cv" className="text-base font-semibold">
          Votre CV <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            id="cv"
            name="cv"
            type="file"
            required
            disabled={isSubmitting}
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="h-12 text-base file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#F4B223] file:text-[#1B3A5F] hover:file:bg-[#D4920F] file:cursor-pointer"
          />
          {selectedFile && (
            <div className="mt-2 flex items-center space-x-2 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>{selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)</span>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500">
          Formats acceptés: PDF, DOC, DOCX (Max 5MB)
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 text-lg font-bold bg-[#F4B223] hover:bg-[#D4920F] text-[#1B3A5F]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-5 w-5" />
            Envoyer ma candidature
          </>
        )}
      </Button>

      {/* Note de confidentialité */}
      <div className="text-xs text-gray-500 text-center leading-relaxed">
        En soumettant ce formulaire, vous acceptez que vos données soient 
        utilisées dans le cadre du processus de recrutement conformément à 
        notre politique de confidentialité.
      </div>
    </form>
  );
}