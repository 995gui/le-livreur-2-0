// Fichier: app/(public)/politique-confidentialite/page.jsx - VERSION AMÉLIORÉE
import React from 'react';
import Link from 'next/link';
import { 
  RefreshCw, Clock, AlertCircle, Shield, Lock, Eye, UserCheck, 
  FileText, Mail, Phone, CheckCircle, XCircle, DollarSign, 
  Package, Truck, Camera, Calendar, Info
} from 'lucide-react';

export const metadata = {
  title: 'Politique de Confidentialité & Remboursement | LE LIVREUR 2.0',
  description: 'Conditions de remboursement, politique de retour et protection des données personnelles. Transparence totale sur vos droits et notre engagement.',
  keywords: 'politique confidentialité, remboursement, protection données, RGPD Bénin',
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1B3A5F] via-[#2C5282] to-[#1B3A5F] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[#F4B223] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-semibold">Protection & Transparence</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Politique de Confidentialité<br/>& Remboursement
          </h1>
          
          <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
            Vos droits, notre engagement pour un service transparent et équitable
          </p>
        </div>
      </section>

      {/* Navigation par onglets */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1 overflow-x-auto scrollbar-hide">
            <a
              href="#remboursement"
              className="flex items-center gap-2 px-6 py-4 font-semibold text-[#1B3A5F] border-b-2 border-[#F4B223] whitespace-nowrap hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Remboursement
            </a>
            <a
              href="#confidentialite"
              className="flex items-center gap-2 px-6 py-4 font-semibold text-gray-600 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap hover:bg-gray-50 transition-colors"
            >
              <Lock className="w-4 h-4" />
              Confidentialité
            </a>
          </nav>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ==================== SECTION REMBOURSEMENT ==================== */}
          <div id="remboursement" className="scroll-mt-24 mb-20">
            
            {/* Introduction */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-8 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <RefreshCw className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-3">Politique de Remboursement</h2>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    Chez <strong>LE LIVREUR 2.0</strong>, nous nous engageons à offrir un service de livraison rapide et sécurisé. Notre politique de remboursement est conçue pour traiter équitablement les situations spécifiques liées aux prestations de livraison.
                  </p>
                </div>
              </div>
            </div>

            {/* Points importants à retenir */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3 mb-4">
                <Info className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-yellow-900 mb-2">⚠️ Points Importants</h3>
                  <ul className="space-y-2 text-sm text-yellow-800">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Les remboursements concernent <strong>uniquement les frais de livraison</strong>, pas les produits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Pour les produits, contactez directement le <strong>vendeur/boutique</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Délai de réclamation : <strong>48 heures maximum</strong> après livraison</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 1. Conditions d'Éligibilité */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-7 h-7" />
                  <h3 className="text-2xl font-bold">1. Conditions d'Éligibilité au Remboursement</h3>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                {/* Retards */}
                <div className="border-l-4 border-orange-400 pl-6 py-2">
                  <div className="flex items-start gap-3 mb-2">
                    <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                    <h4 className="font-bold text-[#1B3A5F] text-lg">Retards de Livraison</h4>
                  </div>
                  <p className="text-gray-700">
                    Si une livraison n'est pas effectuée dans le <strong>délai prévu et confirmé</strong>, un remboursement partiel ou total des frais de livraison pourra être accordé selon la gravité du retard.
                  </p>
                  <div className="mt-3 bg-orange-50 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-orange-800 mb-1">Barème de remboursement :</p>
                    <ul className="space-y-1 text-orange-700">
                      <li>• Retard de 1-2h : <strong>50% du frais de livraison</strong></li>
                      <li>• Retard de +2h : <strong>100% du frais de livraison</strong></li>
                      <li>• Livraison non effectuée : <strong>Remboursement intégral</strong></li>
                    </ul>
                  </div>
                </div>

                {/* Erreur de livraison */}
                <div className="border-l-4 border-red-400 pl-6 py-2">
                  <div className="flex items-start gap-3 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    <h4 className="font-bold text-[#1B3A5F] text-lg">Erreur dans la Livraison</h4>
                  </div>
                  <p className="text-gray-700 mb-3">
                    En cas de livraison d'un produit <strong>incorrect</strong> ou <strong>endommagé</strong> :
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="font-semibold text-blue-900 mb-2">📦 Problème de Produit</p>
                      <p className="text-sm text-blue-700">
                        → Contactez directement le <strong>vendeur</strong> pour le remboursement/échange du produit
                      </p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <p className="font-semibold text-red-900 mb-2">🚚 Problème de Livraison</p>
                      <p className="text-sm text-red-700">
                        → Contactez <strong>LE LIVREUR 2.0</strong> pour les frais de livraison
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    ⏰ Réclamation à faire dans les <strong>24 heures</strong> avec photos à l'appui
                  </p>
                </div>

                {/* Problème de service */}
                <div className="border-l-4 border-purple-400 pl-6 py-2">
                  <div className="flex items-start gap-3 mb-2">
                    <Truck className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                    <h4 className="font-bold text-[#1B3A5F] text-lg">Problèmes de Service de Livraison</h4>
                  </div>
                  <p className="text-gray-700 mb-2">
                    Un remboursement partiel peut être envisagé en cas de :
                  </p>
                  <ul className="space-y-1 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      <span>Mauvais traitement des colis (chocs, jets, négligence)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      <span>Comportement inapproprié du livreur</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      <span>Non-respect des consignes de livraison</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      <span>Communication insuffisante ou inexistante</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Demande de Remboursement */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <FileText className="w-7 h-7" />
                  <h3 className="text-2xl font-bold">2. Comment Demander un Remboursement</h3>
                </div>
              </div>
              
              <div className="p-8">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                  <p className="font-semibold text-blue-900 mb-3 text-lg">
                    ⏰ Délai : <span className="text-blue-700">48 heures maximum après la livraison</span>
                  </p>
                  <p className="text-sm text-blue-700">
                    Passé ce délai, aucune demande de remboursement ne pourra être traitée.
                  </p>
                </div>

                <h4 className="font-bold text-[#1B3A5F] mb-4 text-lg">📞 Canaux de Contact</h4>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <a 
                    href="mailto:lelivreur2zero@gmail.com"
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <Mail className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">lelivreur2zero@gmail.com</p>
                    </div>
                  </a>
                  <a 
                    href="tel:+22901470428"
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <Phone className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Téléphone / WhatsApp</p>
                      <p className="text-sm text-gray-600">01 47 04 28 15</p>
                    </div>
                  </a>
                </div>

                <h4 className="font-bold text-[#1B3A5F] mb-3">📋 Informations à Fournir</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Package className="w-5 h-5 text-[#F4B223] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Numéro de commande/suivi</p>
                      <p className="text-xs text-gray-600">Référence unique de votre livraison</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-[#F4B223] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Description détaillée du problème</p>
                      <p className="text-xs text-gray-600">Expliquez précisément ce qui s'est passé</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Camera className="w-5 h-5 text-[#F4B223] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Photos ou preuves (si applicable)</p>
                      <p className="text-xs text-gray-600">Colis endommagé, mauvaise adresse, etc.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Délai de Traitement */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Calendar className="w-7 h-7" />
                  <h3 className="text-2xl font-bold">3. Délai de Traitement</h3>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-purple-900 mb-1">1-3</p>
                    <p className="text-sm text-purple-700 font-semibold">Jours Ouvrables</p>
                    <p className="text-xs text-gray-600 mt-2">Pour l'examen de votre demande</p>
                  </div>

                  <div className="text-center p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-900 mb-1">24h</p>
                    <p className="text-sm text-blue-700 font-semibold">Confirmation</p>
                    <p className="text-xs text-gray-600 mt-2">Notification de la décision</p>
                  </div>

                  <div className="text-center p-6 bg-green-50 rounded-xl border-2 border-green-200">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-900 mb-1">3-5</p>
                    <p className="text-sm text-green-700 font-semibold">Jours Ouvrables</p>
                    <p className="text-xs text-gray-600 mt-2">Pour recevoir le remboursement</p>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-700">
                    <strong>Mode de remboursement :</strong> Le remboursement sera effectué via le <strong>même moyen de paiement</strong> utilisé lors de la commande initiale (Mobile Money ou espèces selon le cas).
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Exclusions */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <XCircle className="w-7 h-7" />
                  <h3 className="text-2xl font-bold">4. Cas EXCLUS du Remboursement</h3>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-4">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Annulation Tardive
                    </h4>
                    <p className="text-sm text-red-700">
                      Aucun remboursement ne sera effectué si l'annulation intervient <strong>après l'envoi du colis</strong> ou <strong>après la prise en charge par le livreur</strong>.
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Erreur du Client ou Vendeur
                    </h4>
                    <p className="text-sm text-red-700 mb-2">
                      Si le problème est dû à une erreur du client ou du vendeur :
                    </p>
                    <ul className="text-sm text-red-700 space-y-1 pl-4">
                      <li>• Mauvais emballage causant des dommages</li>
                      <li>• Adresse incorrecte ou incomplète fournie</li>
                      <li>• Numéro de téléphone injoignable</li>
                      <li>• Colis non conforme aux spécifications annoncées</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Frais Additionnels Non Remboursables
                    </h4>
                    <p className="text-sm text-red-700">
                      Les frais supplémentaires non liés à la prestation de base (assurances optionnelles, services premium non rendus) ne sont pas remboursables.
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Force Majeure
                    </h4>
                    <p className="text-sm text-red-700">
                      Retards ou impossibilité de livrer dus à des événements hors de notre contrôle (catastrophes naturelles, troubles civils, accidents majeurs, etc.).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Modalités */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-7 h-7" />
                  <h3 className="text-2xl font-bold">5. Modalités de Remboursement</h3>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                    <CheckCircle className="w-10 h-10 text-green-600 mb-3" />
                    <h4 className="font-bold text-green-900 mb-2">Remboursement Complet (100%)</h4>
                    <p className="text-sm text-green-700 mb-2">Pour des problèmes majeurs :</p>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Retard significatif (+2h)</li>
                      <li>• Livraison non effectuée</li>
                      <li>• Service inacceptable</li>
                      <li>• Colis perdu de notre fait</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border-2 border-yellow-200">
                    <AlertCircle className="w-10 h-10 text-yellow-600 mb-3" />
                    <h4 className="font-bold text-yellow-900 mb-2">Remboursement Partiel (50%)</h4>
                    <p className="text-sm text-yellow-700 mb-2">Pour des problèmes mineurs :</p>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Petits retards (1-2h)</li>
                      <li>• Erreurs de livraison corrigées</li>
                      <li>• Problèmes de communication</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Important à noter
                  </h4>
                  <p className="text-sm text-blue-700">
                    Pour les problèmes relatifs à la <strong>qualité ou conformité des produits</strong> (erreur de commande, produit défectueux, etc.), le remboursement devra être traité <strong>directement avec le vendeur/la boutique</strong>, selon leurs propres conditions de retour.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== SECTION CONFIDENTIALITÉ ==================== */}
          <div id="confidentialite" className="scroll-mt-24">
            
            {/* Introduction */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white mb-8 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <Lock className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-3">Politique de Confidentialité</h2>
                  <p className="text-indigo-100 text-lg leading-relaxed">
                    LE LIVREUR 2.0 s'engage à protéger vos données personnelles et à respecter votre vie privée conformément aux lois en vigueur au Bénin.
                  </p>
                </div>
              </div>
            </div>

            {/* Données collectées */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Eye className="w-7 h-7" />
                  <h3 className="text-2xl font-bold">1. Données Collectées</h3>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-gray-700 mb-6">
                  Dans le cadre de nos services de livraison, nous collectons uniquement les informations nécessaires :
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">👤 Informations Personnelles</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Nom et prénom</li>
                      <li>• Numéro de téléphone</li>
                      <li>• Adresse email (optionnel)</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">📍 Informations de Livraison</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Adresses de ramassage et livraison</li>
                      <li>• Repères géographiques</li>
                      <li>• Instructions de livraison</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">📦 Informations Colis</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Nature du colis</li>
                      <li>• Poids et dimensions</li>
                      <li>• Valeur déclarée</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">💳 Informations de Paiement</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Mode de paiement utilisé</li>
                      <li>• Historique de transactions</li>
                      <li>• Numéro Mobile Money (si applicable)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Utilisation des données */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-7 h-7" />
                  <h3 className="text-2xl font-bold">2. Utilisation des Données</h3>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-gray-700 mb-6">
                  Vos données personnelles sont utilisées <strong>exclusivement</strong> dans les buts suivants :
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-teal-900">Gestion et suivi des livraisons</p>
                      <p className="text-sm text-teal-700">Coordonner les courses, suivre les colis en temps réel</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-teal-900">Communication relative à vos commandes</p>
                      <p className="text-sm text-teal-700">Notifications SMS/WhatsApp, confirmations, alertes</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-teal-900">Amélioration de nos services</p>
                      <p className="text-sm text-teal-700">Analyses statistiques, optimisation des trajets</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-teal-900">Support client et réclamations</p>
                      <p className="text-sm text-teal-700">Traitement des demandes, résolution de litiges</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-teal-900">Conformité légale</p>
                      <p className="text-sm text-teal-700">Respect des obligations légales et fiscales</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Protection et sécurité */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Shield className="w-7 h-7" />
                  <h3 className="text-2xl font-bold">3. Protection et Sécurité</h3>
                </div>
              </div>
              
              <div className="p-8">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-green-900 mb-3 text-lg flex items-center gap-2">
                    <Lock className="w-6 h-6" />
                    Nos Garanties de Sécurité
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 text-xl">✓</span>
                      <p className="text-sm text-green-800">
                        <strong>Stockage sécurisé :</strong> Vos données sont hébergées sur des serveurs protégés
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 text-xl">✓</span>
                      <p className="text-sm text-green-800">
                        <strong>Accès limité :</strong> Seul le personnel autorisé peut accéder à vos informations
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 text-xl">✓</span>
                      <p className="text-sm text-green-800">
                        <strong>Chiffrement :</strong> Les transactions sensibles sont cryptées
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 text-xl">✓</span>
                      <p className="text-sm text-green-800">
                        <strong>Mise à jour régulière :</strong> Nos systèmes de sécurité sont constamment améliorés
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                  <h4 className="font-bold text-red-900 mb-2">❌ Ce que nous ne faisons JAMAIS</h4>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Vendre vos données à des tiers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Partager vos informations sans votre consentement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Envoyer de la publicité non sollicitée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Stocker vos données plus longtemps que nécessaire</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Vos droits */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <FileText className="w-7 h-7" />
                  <h3 className="text-2xl font-bold">4. Vos Droits</h3>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-gray-700 mb-6">
                  Conformément à la réglementation en vigueur, vous disposez des droits suivants :
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 rounded-xl p-5 border-2 border-purple-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="w-5 h-5 text-purple-600" />
                      <h4 className="font-bold text-purple-900">Droit d'Accès</h4>
                    </div>
                    <p className="text-sm text-purple-700">
                      Consulter toutes les données personnelles que nous détenons sur vous
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <h4 className="font-bold text-blue-900">Droit de Rectification</h4>
                    </div>
                    <p className="text-sm text-blue-700">
                      Corriger ou mettre à jour vos informations inexactes ou obsolètes
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-xl p-5 border-2 border-red-200">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <h4 className="font-bold text-red-900">Droit de Suppression</h4>
                    </div>
                    <p className="text-sm text-red-700">
                      Demander l'effacement de vos données (sauf obligations légales)
                    </p>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-5 border-2 border-orange-200">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      <h4 className="font-bold text-orange-900">Droit d'Opposition</h4>
                    </div>
                    <p className="text-sm text-orange-700">
                      Vous opposer au traitement de vos données pour certains usages
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-indigo-50 border-2 border-indigo-200 rounded-xl p-5">
                  <h4 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Comment Exercer vos Droits ?
                  </h4>
                  <p className="text-sm text-indigo-700 mb-3">
                    Contactez notre responsable de la protection des données :
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm">
                      📧 Email : <a href="mailto:contact@lelivreur2.com" className="text-indigo-900 font-semibold hover:text-indigo-700">contact@lelivreur2.com</a>
                    </p>
                    <p className="text-sm">
                      📞 Téléphone : <a href="tel:+22901470428" className="text-indigo-900 font-semibold hover:text-indigo-700">01 47 04 28 15</a>
                    </p>
                  </div>
                  <p className="text-xs text-indigo-600 mt-3">
                    ⏱️ Délai de réponse : maximum 30 jours
                  </p>
                </div>
              </div>
            </div>

            {/* Partage des données */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-7 h-7" />
                  <h3 className="text-2xl font-bold">5. Partage des Données</h3>
                </div>
              </div>
              
              <div className="p-8">
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Transparence Totale
                  </h4>
                  <p className="text-sm text-yellow-800">
                    Nous pouvons être amenés à partager certaines données <strong>uniquement</strong> dans les cas suivants :
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-blue-900 mb-1">✅ Avec Nos Livreurs</h4>
                    <p className="text-sm text-blue-700">
                      Nom, téléphone et adresse <strong>nécessaires</strong> pour effectuer la livraison
                    </p>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-green-900 mb-1">✅ Avec les Vendeurs/Boutiques</h4>
                    <p className="text-sm text-green-700">
                      Coordonnées du destinataire pour faciliter la coordination
                    </p>
                  </div>

                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-purple-900 mb-1">✅ Avec les Autorités</h4>
                    <p className="text-sm text-purple-700">
                      Uniquement sur <strong>réquisition judiciaire</strong> ou obligation légale
                    </p>
                  </div>

                  <div className="bg-gray-50 border-l-4 border-gray-500 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-gray-900 mb-1">✅ Prestataires Techniques</h4>
                    <p className="text-sm text-gray-700">
                      Hébergement, SMS, paiement (sous contrats de confidentialité stricts)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conservation des données */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
              <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Clock className="w-7 h-7" />
                  <h3 className="text-2xl font-bold">6. Durée de Conservation</h3>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Données de Livraison</h4>
                      <p className="text-sm text-gray-700">
                        Conservées pendant <strong>3 ans</strong> après la dernière commande (obligation comptable et fiscale)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Données Marketing</h4>
                      <p className="text-sm text-gray-700">
                        Conservées pendant <strong>3 ans</strong> maximum, suppression immédiate sur demande
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="bg-red-100 rounded-full p-2 flex-shrink-0">
                      <Calendar className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Comptes Inactifs</h4>
                      <p className="text-sm text-gray-700">
                        Suppression automatique après <strong>5 ans</strong> sans activité
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookies */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Info className="w-7 h-7" />
                  <h3 className="text-2xl font-bold">7. Cookies et Traceurs</h3>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-gray-700 mb-4">
                  Notre site web utilise des cookies pour améliorer votre expérience :
                </p>

                <div className="space-y-3">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-1">🍪 Cookies Essentiels (obligatoires)</h4>
                    <p className="text-sm text-green-700">
                      Nécessaires au fonctionnement du site (session, panier, sécurité)
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-1">📊 Cookies Analytiques (avec votre accord)</h4>
                    <p className="text-sm text-blue-700">
                      Comprendre l'utilisation du site pour l'améliorer (Google Analytics)
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-4">
                  Vous pouvez gérer vos préférences de cookies à tout moment dans les paramètres de votre navigateur.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-[#1B3A5F] to-[#2C5282] rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
                <Mail className="w-7 h-7" />
                Questions sur la Confidentialité ?
              </h3>
              <p className="text-blue-100 mb-6">
                Pour toute question concernant le traitement de vos données personnelles ou pour exercer vos droits :
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <a 
                  href="mailto:contact@lelivreur2.com"
                  className="flex items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  <Mail className="w-5 h-5" />
                  <div className="text-left">
                    <p className="text-xs text-blue-200">Email</p>
                    <p className="font-semibold text-sm">contact@lelivreur2.com</p>
                  </div>
                </a>
                <a 
                  href="tel:+22901470428"
                  className="flex items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  <Phone className="w-5 h-5" />
                  <div className="text-left">
                    <p className="text-xs text-blue-200">Téléphone</p>
                    <p className="font-semibold text-sm">01 47 04 28 15</p>
                  </div>
                </a>
                <Link 
                  href="/contact"
                  className="flex items-center gap-2 p-4 bg-[#F4B223] hover:bg-[#D4920F] text-[#1B3A5F] rounded-lg transition-colors font-bold justify-center"
                >
                  <FileText className="w-5 h-5" />
                  <span>Nous contacter</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer légal */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p className="mb-2">
              <strong className="text-gray-700">LE LIVREUR 2.0</strong> - Service de Livraison au Bénin
            </p>
            <p>Ilot 921, Parcelle C, Maison Hilaire Akpagbé, 7e Arrondissement, Cotonou</p>
            <p className="mt-2">
              <Link href="/mentions-legales" className="text-[#1B3A5F] hover:text-[#F4B223] font-semibold">
                Voir nos Conditions Générales d'Utilisation
              </Link>
            </p>
            <p className="mt-4 text-xs">
              © {new Date().getFullYear()} LE LIVREUR 2.0 - Tous droits réservés | 
              <span className="ml-1">Dernière mise à jour : 10 décembre 2024</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}