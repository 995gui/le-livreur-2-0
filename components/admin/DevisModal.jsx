// ============================================
// FICHIER 1: components/admin/DevisModal.jsx
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
  X, Mail, Phone, MapPin, Package, Calendar, 
  FileText, Loader2, Save, CheckCircle 
} from 'lucide-react';

export default function DevisModal({ devis, onClose, onUpdate }) {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(devis.status);
  const [notes, setNotes] = useState(devis.notes || '');

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/devis/${devis.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Devis mis à jour ! ✅",
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
        description: "Impossible de mettre à jour le devis",
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
        <div className="sticky top-0 bg-gradient-to-r from-[#1B3A5F] to-[#2C5282] text-white p-6 rounded-t-2xl flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Détails du Devis</h2>
            <p className="text-blue-200 text-sm mt-1">ID: {devis.id}</p>
          </div>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Informations Client */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#1B3A5F] mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Informations Client
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-600 text-sm">Nom / Entreprise</Label>
                <p className="font-semibold text-[#1B3A5F] text-lg">{devis.name}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm">Type de service</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {devis.service_type}
                  </span>
                </div>
              </div>
              <div>
                <Label className="text-gray-600 text-sm flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  Téléphone
                </Label>
                <p className="font-semibold text-gray-800">{devis.phone}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Label>
                <p className="font-semibold text-gray-800">{devis.email}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Date de demande
                </Label>
                <p className="font-semibold text-gray-800">{formatDate(devis.created_at)}</p>
              </div>
            </div>
          </div>

          {/* Trajet */}
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#1B3A5F] mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Informations de Trajet
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border-l-4 border-green-500">
                <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <Label className="text-gray-600 text-sm">Adresse de départ</Label>
                  <p className="font-semibold text-gray-800">{devis.pickup_address}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border-l-4 border-red-500">
                <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <Label className="text-gray-600 text-sm">Adresse d'arrivée</Label>
                  <p className="font-semibold text-gray-800">{devis.delivery_address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Détails */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#1B3A5F] mb-4">Détails de la Demande</h3>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {devis.details}
            </p>
          </div>

          {/* Gestion du Devis */}
          <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
            <h3 className="text-xl font-bold text-[#1B3A5F] mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Gestion du Devis
            </h3>
            <div className="space-y-4">
              {/* Statut */}
              <div>
                <Label htmlFor="status" className="text-base font-semibold mb-2 block">
                  Statut du devis
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status" className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">🟡 En attente</SelectItem>
                    <SelectItem value="quoted">📧 Devis envoyé</SelectItem>
                    <SelectItem value="accepted">🟢 Accepté</SelectItem>
                    <SelectItem value="rejected">🔴 Refusé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes internes */}
              <div>
                <Label htmlFor="notes" className="text-base font-semibold mb-2 block">
                  Notes internes
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ajoutez des notes pour le suivi du devis..."
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

