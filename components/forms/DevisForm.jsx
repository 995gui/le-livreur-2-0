'use client';

import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { 
  Loader2, Send, Zap, Clock, Package, Building2, Briefcase, 
  ShoppingBag, MapPin, AlertTriangle, ChevronRight, ChevronLeft, 
  CheckCircle2, AlertCircle
} from 'lucide-react';

export default function DevisFormImproved() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    serviceType: 'express',
    quoteMethod: 'whatsapp',
    isRoundTrip: false,
    isFragile: false,
    packageType: '',
    weight: '',
    dimensions: '',
    declaredValue: '',
    pickupVille: 'Cotonou', 
    pickupQuartier: '', 
    pickupLandmark: '',
    deliveryVille: 'Cotonou', 
    deliveryQuartier: '', 
    deliveryLandmark: '',
    recipientName: '', 
    recipientPhone: '',
    shopName: '', 
    shopLink: '', 
    productCategory: '', 
    monthlyVolume: '', 
    deliveryZones: '', 
    orderSystem: '',
    companyName: '', 
    sector: '', 
    courseTypes: '', 
    budget: '',
    decisionName: '', 
    decisionRole: '', 
    decisionEmail: '',
    hqAddress: '',
    name: '', 
    phone: '', 
    email: '', 
    details: '', 
    scheduledTime: ''
  });

  const isCourseMode = ['express', 'programmee', 'autre'].includes(formData.serviceType);
  const isEcommerceMode = formData.serviceType === 'ecommerce';
  const isBusinessMode = ['corporate', 'abonnement'].includes(formData.serviceType);
  const needsWeightAndDimensions = ['Petit Colis', 'Gros Colis', 'Autre'].includes(formData.packageType);

  // ✅ AMÉLIORATION 1: Validation robuste
  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.serviceType) {
        newErrors.serviceType = 'Veuillez sélectionner un service';
      }
    }

    if (currentStep === 2) {
      if (isCourseMode) {
        if (!formData.pickupQuartier) newErrors.pickupQuartier = 'Quartier requis';
        if (!formData.deliveryQuartier) newErrors.deliveryQuartier = 'Quartier requis';
        if (!formData.packageType) newErrors.packageType = 'Nature du colis requise';
      }
      if (isEcommerceMode) {
        if (!formData.shopName) newErrors.shopName = 'Nom de boutique requis';
        if (!formData.hqAddress) newErrors.hqAddress = 'Lieu de ramassage requis';
      }
      if (isBusinessMode) {
        if (!formData.companyName) newErrors.companyName = 'Nom d\'entreprise requis';
        if (!formData.hqAddress) newErrors.hqAddress = 'Adresse siège requise';
      }
    }

    if (currentStep === 3) {
      if (!formData.name || formData.name.length < 3) {
        newErrors.name = 'Nom complet requis (min 3 caractères)';
      }
      if (!formData.phone || !/^\+?[0-9\s-]{8,}$/.test(formData.phone)) {
        newErrors.phone = 'Numéro de téléphone valide requis';
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ AMÉLIORATION 2: Gestion optimisée des changements
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // ✅ AMÉLIORATION 3: Navigation avec validation
  const nextStep = (e) => {
    e?.preventDefault(); // Empêche la soumission du formulaire
    if (!validateStep(step)) {
      toast({
        variant: "destructive",
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs requis"
      });
      return;
    }
    setStep(prev => prev + 1);
    setTimeout(() => {
      document.getElementById('devis-form-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    setErrors({});
  };

  // ✅ AMÉLIORATION 4: Soumission avec meilleure gestion d'erreurs
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
      toast({
        variant: "destructive",
        title: "Formulaire incomplet",
        description: "Vérifiez les champs requis"
      });
      return;
    }

    setIsSubmitting(true);

    let headerInfo = `📞 CONTACT: ${formData.quoteMethod.toUpperCase()}`;
    let richDetails = "";

    if (isCourseMode) {
      richDetails = `
${headerInfo}
📦 TYPE: ${formData.serviceType.toUpperCase()}
${formData.scheduledTime ? `📅 DATE: ${formData.scheduledTime}` : ''}
📦 NATURE: ${formData.packageType}
⚖️ POIDS: ${formData.weight || '-'} | DIM: ${formData.dimensions || '-'}
💰 VALEUR: ${formData.declaredValue || '-'} FCFA
⚠️ FRAGILE: ${formData.isFragile ? 'OUI' : 'NON'}
🔄 TRAJET: ${formData.isRoundTrip ? 'Aller-Retour' : 'Aller simple'}
📍 DÉPART: ${formData.pickupQuartier} (${formData.pickupVille}) - Repère: ${formData.pickupLandmark}
📍 ARRIVÉE: ${formData.deliveryQuartier} (${formData.deliveryVille}) - Repère: ${formData.deliveryLandmark}
👤 DESTINATAIRE: ${formData.recipientName} (${formData.recipientPhone})
📝 NOTES: ${formData.details}
      `;
    } else if (isEcommerceMode) {
      richDetails = `
${headerInfo}
🛍️ TYPE: E-COMMERCE
🏪 BOUTIQUE: ${formData.shopName} (${formData.shopLink})
📦 PRODUITS: ${formData.productCategory}
📊 VOLUME: ${formData.monthlyVolume}
🗺️ ZONES: ${formData.deliveryZones}
💻 SYSTÈME: ${formData.orderSystem}
📍 STOCK: ${formData.hqAddress}
📝 BESOINS: ${formData.details}
      `;
    } else if (isBusinessMode) {
      richDetails = `
${headerInfo}
💼 TYPE: BUSINESS / ${formData.serviceType.toUpperCase()}
🏢 SOCIÉTÉ: ${formData.companyName} (${formData.sector})
📊 VOLUME: ${formData.monthlyVolume}
📦 TYPES: ${formData.courseTypes}
💰 BUDGET: ${formData.budget}
📍 SIÈGE: ${formData.hqAddress}
👤 DÉCISIONNAIRE: ${formData.decisionName} (${formData.decisionRole}) - ${formData.decisionEmail}
📝 BESOINS: ${formData.details}
      `;
    }

    let pickupAddr = isCourseMode ? `${formData.pickupQuartier} (${formData.pickupVille})` : (formData.hqAddress || "Siège");
    let deliveryAddr = isCourseMode ? `${formData.deliveryQuartier} (${formData.deliveryVille})` : "Multiples";

    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      serviceType: formData.serviceType,
      pickupAddress: pickupAddr,
      deliveryAddress: deliveryAddr,
      details: richDetails.trim(),
    };

    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "✅ Demande envoyée !",
          description: "Nous vous recontactons très rapidement.",
          duration: 5000,
        });
        
        // ✅ AMÉLIORATION 5: Reset complet et propre
        setFormData({
          serviceType: 'express',
          quoteMethod: 'whatsapp',
          isRoundTrip: false,
          isFragile: false,
          packageType: '',
          weight: '',
          dimensions: '',
          declaredValue: '',
          pickupVille: 'Cotonou',
          pickupQuartier: '',
          pickupLandmark: '',
          deliveryVille: 'Cotonou',
          deliveryQuartier: '',
          deliveryLandmark: '',
          recipientName: '',
          recipientPhone: '',
          shopName: '',
          shopLink: '',
          productCategory: '',
          monthlyVolume: '',
          deliveryZones: '',
          orderSystem: '',
          companyName: '',
          sector: '',
          courseTypes: '',
          budget: '',
          decisionName: '',
          decisionRole: '',
          decisionEmail: '',
          hqAddress: '',
          name: '',
          phone: '',
          email: '',
          details: '',
          scheduledTime: ''
        });
        setStep(1);
        setErrors({});
      } else {
        throw new Error(result.message || 'Échec de l\'envoi');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast({ 
        variant: "destructive", 
        title: "❌ Erreur d'envoi", 
        description: error.message || "Impossible de soumettre. Réessayez." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ AMÉLIORATION 6: Composant d'erreur réutilisable
  const ErrorMessage = ({ message }) => (
    message ? (
      <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
        <AlertCircle className="w-3 h-3" />
        <span>{message}</span>
      </div>
    ) : null
  );

  return (
    <div id="devis-form-top" className="w-full">
      
      {/* Barre de progression */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          <span className={step >= 1 ? "text-[#F4B223]" : ""}>1. Service</span>
          <span className={step >= 2 ? "text-[#F4B223]" : ""}>2. Détails</span>
          <span className={step >= 3 ? "text-[#F4B223]" : ""}>3. Contact</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#F4B223] transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="min-h-[300px]">
        
        {/* ÉTAPE 1 */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <Label className="text-lg font-bold text-[#1B3A5F] text-center block mb-6">
              De quel service avez-vous besoin ?
            </Label>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: 'express', icon: Zap, label: 'Express', desc: 'Urgent (-45min)' },
                { id: 'programmee', icon: Clock, label: 'Programmée', desc: 'Planifiée' },
                { id: 'ecommerce', icon: ShoppingBag, label: 'E-commerce', desc: 'Logistique' },
                { id: 'corporate', icon: Building2, label: 'Entreprise', desc: 'Coursier Pro' },
                { id: 'abonnement', icon: Briefcase, label: 'Abonnement', desc: 'Régulier' },
                { id: 'autre', icon: Package, label: 'Autre', desc: 'Spécifique' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => updateField('serviceType', s.id)}
                  className={`rounded-xl p-4 border-2 transition-all duration-200 flex flex-col items-center text-center justify-center h-32 ${
                    formData.serviceType === s.id
                      ? 'border-[#F4B223] bg-[#F4B223]/10 shadow-md ring-1 ring-[#F4B223]'
                      : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  aria-pressed={formData.serviceType === s.id}
                >
                  <s.icon className={`w-8 h-8 mb-3 ${formData.serviceType === s.id ? 'text-[#1B3A5F]' : 'text-gray-400'}`} />
                  <span className={`font-bold text-sm ${formData.serviceType === s.id ? 'text-[#1B3A5F]' : 'text-gray-600'}`}>{s.label}</span>
                  <span className="text-xs text-gray-400 mt-1">{s.desc}</span>
                </button>
              ))}
            </div>
            <ErrorMessage message={errors.serviceType} />

            <div className="bg-blue-50 p-4 rounded-xl mt-6">
              <Label className="text-sm font-semibold text-[#1B3A5F] mb-3 block">Réponse souhaitée par :</Label>
              <div className="flex gap-3">
                {[
                  { id: 'whatsapp', icon: '💬', label: 'WhatsApp' },
                  { id: 'appel', icon: '📞', label: 'Appel' },
                  { id: 'email', icon: '📧', label: 'Email' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => updateField('quoteMethod', m.id)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                      formData.quoteMethod === m.id
                        ? 'bg-white border-[#1B3A5F] text-[#1B3A5F] shadow-sm'
                        : 'border-transparent hover:bg-white/50 text-gray-600'
                    }`}
                  >
                    <span className="mr-2">{m.icon}</span> {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ÉTAPE 2 */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {isCourseMode && (
              <>
                <h3 className="text-xl font-bold text-[#1B3A5F] mb-4 flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-[#F4B223]" /> Détails du trajet
                </h3>
                
                <div className="space-y-6 relative">
                  <div className="absolute left-3 top-8 bottom-8 w-0.5 bg-gray-200 -z-10"></div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative">
                    <div className="absolute -left-3 top-4 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">A</div>
                    <div className="ml-4">
                      <Label className="text-xs uppercase text-gray-400 font-bold mb-2 block">Point de Retrait</Label>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <Input name="pickupVille" value={formData.pickupVille} onChange={handleChange} placeholder="Ville" className="col-span-1" />
                        <div className="col-span-2">
                          <Input name="pickupQuartier" value={formData.pickupQuartier} onChange={handleChange} placeholder="Quartier *" className={`bg-green-50/30 ${errors.pickupQuartier ? 'border-red-500' : ''}`} />
                          <ErrorMessage message={errors.pickupQuartier} />
                        </div>
                      </div>
                      <Input name="pickupLandmark" value={formData.pickupLandmark} onChange={handleChange} placeholder="Repère (Pharmacie...)" className="text-sm" />
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative">
                    <div className="absolute -left-3 top-4 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">B</div>
                    <div className="ml-4">
                      <Label className="text-xs uppercase text-gray-400 font-bold mb-2 block">Point de Livraison</Label>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <Input name="deliveryVille" value={formData.deliveryVille} onChange={handleChange} placeholder="Ville" className="col-span-1" />
                        <div className="col-span-2">
                          <Input name="deliveryQuartier" value={formData.deliveryQuartier} onChange={handleChange} placeholder="Quartier *" className={`bg-red-50/30 ${errors.deliveryQuartier ? 'border-red-500' : ''}`} />
                          <ErrorMessage message={errors.deliveryQuartier} />
                        </div>
                      </div>
                      <Input name="deliveryLandmark" value={formData.deliveryLandmark} onChange={handleChange} placeholder="Repère..." className="text-sm" />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl space-y-4 mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-1.5 block text-sm">Nature *</Label>
                      <select 
                        name="packageType" 
                        value={formData.packageType} 
                        onChange={handleChange} 
                        className={`w-full h-10 rounded-md border px-3 text-sm bg-white ${errors.packageType ? 'border-red-500' : ''}`}
                      >
                        <option value="">Choisir...</option>
                        <option value="Pli / Document">✉️ Pli</option>
                        <option value="Petit Colis">📦 Petit (-5kg)</option>
                        <option value="Gros Colis">🚛 Gros (+10kg)</option>
                        <option value="Repas">🍔 Repas</option>
                        <option value="Autre">❓ Autre</option>
                      </select>
                      <ErrorMessage message={errors.packageType} />
                    </div>
                    <div className="flex items-end">
                       <div className="flex items-center justify-between w-full h-10 bg-white border rounded-md px-3">
                          <span className="text-sm flex items-center"><AlertTriangle className="w-3 h-3 mr-1 text-orange-500"/> Fragile</span>
                          <Switch checked={formData.isFragile} onCheckedChange={(v) => updateField('isFragile', v)} className="scale-75 origin-right" />
                       </div>
                    </div>
                  </div>
                  
                  {needsWeightAndDimensions && (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in">
                      <Input name="weight" value={formData.weight} onChange={handleChange} placeholder="Poids (kg)" className="bg-white" />
                      <Input name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="Dim (cm)" className="bg-white" />
                    </div>
                  )}
                </div>
              </>
            )}

            {isEcommerceMode && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#1B3A5F] mb-4 flex items-center">
                  <ShoppingBag className="w-6 h-6 mr-2 text-[#F4B223]" /> Infos Boutique
                </h3>
                <div>
                  <Input name="shopName" value={formData.shopName} onChange={handleChange} placeholder="Nom de la Boutique *" className={`h-12 ${errors.shopName ? 'border-red-500' : ''}`} />
                  <ErrorMessage message={errors.shopName} />
                </div>
                <Input name="shopLink" value={formData.shopLink} onChange={handleChange} placeholder="Lien Page Facebook / Insta" />
                <div className="grid grid-cols-2 gap-4">
                  <select name="monthlyVolume" value={formData.monthlyVolume} onChange={handleChange} className="h-12 w-full rounded-md border px-3 bg-white">
                    <option value="">Volume mensuel...</option>
                    <option value="1-10">1-10 colis</option>
                    <option value="10-50">10-50 colis</option>
                    <option value="50+">50+ colis</option>
                  </select>
                  <div>
                    <Input name="hqAddress" value={formData.hqAddress} onChange={handleChange} placeholder="Lieu de ramassage *" className={errors.hqAddress ? 'border-red-500' : ''} />
                    <ErrorMessage message={errors.hqAddress} />
                  </div>
                </div>
              </div>
            )}

            {isBusinessMode && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#1B3A5F] mb-4 flex items-center">
                  <Briefcase className="w-6 h-6 mr-2 text-[#F4B223]" /> Infos Entreprise
                </h3>
                <div>
                  <Input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Nom de l'Entreprise *" className={`h-12 ${errors.companyName ? 'border-red-500' : ''}`} />
                  <ErrorMessage message={errors.companyName} />
                </div>
                <div>
                  <Input name="hqAddress" value={formData.hqAddress} onChange={handleChange} placeholder="Adresse du Siège *" className={errors.hqAddress ? 'border-red-500' : ''} />
                  <ErrorMessage message={errors.hqAddress} />
                </div>
                <select name="sector" value={formData.sector} onChange={handleChange} className="h-12 w-full rounded-md border px-3 bg-white">
                    <option value="">Secteur d'activité...</option>
                    <option value="Restauration">Restauration</option>
                    <option value="Santé">Santé</option>
                    <option value="Services">Services</option>
                    <option value="Commerce">Commerce</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* ÉTAPE 3 */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-[#1B3A5F]">Dernière étape !</h3>
              <p className="text-gray-500">Où pouvons-nous vous envoyer le tarif ?</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Votre Nom Complet *" className={`h-12 text-lg ${errors.name ? 'border-red-500' : ''}`} />
                <ErrorMessage message={errors.name} />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Téléphone / WhatsApp *" className={`h-12 ${errors.phone ? 'border-red-500' : ''}`} />
                  <ErrorMessage message={errors.phone} />
                </div>
                <div>
                  <Input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email (optionnel)" className={errors.email ? 'border-red-500' : ''} />
                  <ErrorMessage message={errors.email} />
                </div>
              </div>
              <Textarea name="details" value={formData.details} onChange={handleChange} placeholder="Ajouter une note ou instruction particulière..." className="min-h-[80px]" />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 pt-8">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={prevStep} className="h-12 px-6 border-2">
              <ChevronLeft className="w-4 h-4 mr-2" /> Retour
            </Button>
          )}
          
          {step < 3 ? (
            <Button type="button" onClick={nextStep} className="flex-1 h-12 bg-[#1B3A5F] hover:bg-[#2C5282] text-white text-lg">
              Suivant <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 h-12 bg-[#F4B223] hover:bg-[#D4920F] text-[#1B3A5F] font-bold text-lg shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Envoi...</>
              ) : (
                <><Send className="mr-2 h-5 w-5" /> Obtenir mon devis</>
              )}
            </Button>
          )}
        </div>

      </form>
    </div>
  );
}