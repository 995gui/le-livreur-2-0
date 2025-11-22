// ============================================
// FICHIER 2: components/admin/CandidatureModal.jsx
// ============================================
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { 
  X, Mail, Phone, Calendar, FileText, 
  Download, Loader2, Save, CheckCircle, User
} from 'lucide-react';

export default function CandidatureModal({ candidature, onClose, onUpdate }) {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(candidature.status);
  const [notes, setNotes] = useState(candidature.notes || '');

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/recrutement/${candidature.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Candidature mise à jour ! ✅",
          description: "Les modifications ont été enregistrées",
        });
        onUpdate();
        onClose();
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: result.message,
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour la candidature",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-t-2xl flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Détails de la Candidature</h2>
            <p className="text-purple-200 text-sm mt-1">ID: {candidature.id}</p>
          </div>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Informations Candidat */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#1B3A5F] mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Informations du Candidat
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-600 text-sm">Nom complet</Label>
                <p className="font-semibold text-[#1B3A5F] text-lg">{candidature.name}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Date de candidature
                </Label>
                <p className="font-semibold text-gray-800">{formatDate(candidature.created_at)}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  Téléphone
                </Label>
                <p className="font-semibold text-gray-800">{candidature.phone}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Label>
                <p className="font-semibold text-gray-800">{candidature.email || 'Non renseigné'}</p>
              </div>
            </div>
          </div>

          {/* Motivation */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#1B3A5F] mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Lettre de Motivation
            </h3>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {candidature.motivation}
            </p>
          </div>

          {/* CV */}
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#1B3A5F] mb-4 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Curriculum Vitae
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Label className="text-gray-600 text-sm">Fichier CV</Label>
                <p className="font-semibold text-gray-800">
                  {candidature.cv_url ? candidature.cv_url.split('/').pop() : 'CV.pdf'}
                </p>
              </div>
              <a
                href={candidature.cv_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-[#1B3A5F] text-white rounded-lg font-semibold hover:bg-[#0F2847] transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger
              </a>
            </div>
          </div>

          {/* Gestion de la Candidature */}
          <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
            <h3 className="text-xl font-bold text-[#1B3A5F] mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Gestion de la Candidature
            </h3>
            <div className="space-y-4">
              {/* Statut */}
              <div>
                <Label htmlFor="status" className="text-base font-semibold mb-2 block">
                  Statut de la candidature
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status" className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">🟡 En attente</SelectItem>
                    <SelectItem value="interview">📞 Convoqué entretien</SelectItem>
                    <SelectItem value="accepted">🟢 Accepté</SelectItem>
                    <SelectItem value="rejected">🔴 Refusé</SelectItem>
                    <SelectItem value="training">📚 En formation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes internes */}
              <div>
                <Label htmlFor="notes" className="text-base font-semibold mb-2 block">
                  Notes internes RH
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ajoutez des notes sur le candidat (date entretien, impressions, décision...)"
                  className="min-h-[120px]"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button
              onClick={onClose}
              variant="outline"
              className="px-6"
            >
              Annuler
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="bg-[#F4B223] hover:bg-[#D4920F] text-[#1B3A5F] px-6"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}