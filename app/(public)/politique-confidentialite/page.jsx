// Fichier: app/(public)/politique-confidentialite/page.jsx
import React from 'react';
import { 
  RefreshCw, Clock, AlertCircle, Shield, Lock, Eye, UserCheck, 
  FileText, Mail, Phone, CheckCircle, XCircle, DollarSign, 
  Package, Truck, Camera, Calendar, Info, MapPin, Globe // <-- AJOUT DE MapPin ICI
} from 'lucide-react';

export const metadata = {
  title: 'Politique de Confidentialité & Remboursement | LE LIVREUR 2.0',
  description: 'Protection des données (Loi n°2017-20) et conditions de remboursement. Transparence totale sur vos droits et notre engagement.',
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
            <span className="text-sm font-semibold">Conforme Code du Numérique</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Politique de Confidentialité<br/>& Remboursement
          </h1>
          
          <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
            Dernière mise à jour : <strong>27 Novembre 2025</strong>
          </p>
        </div>
      </section>

      {/* Navigation par onglets */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1 overflow-x-auto scrollbar-hide">
            <a
              href="#remboursement"
              className="flex items-center gap-2 px-6 py-4 font-semibold text-gray-600 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Remboursement
            </a>
            <a
              href="#confidentialite"
              className="flex items-center gap-2 px-6 py-4 font-semibold text-[#1B3A5F] border-b-2 border-[#F4B223] whitespace-nowrap hover:bg-gray-50 transition-colors"
            >
              <Lock className="w-4 h-4" />
              Confidentialité (RGPD Bénin)
            </a>
          </nav>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ==================== SECTION REMBOURSEMENT (Conservée) ==================== */}
          <div id="remboursement" className="scroll-mt-24 mb-20 border-b border-gray-200 pb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                   <RefreshCw className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-[#1B3A5F]">Politique de Remboursement</h2>
              </div>
              
              <div className="prose prose-lg text-gray-700 max-w-none space-y-8">
                 {/* Points clés (Résumé visuel) */}
                 <div className="grid md:grid-cols-3 gap-4 not-prose">
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                       <h4 className="font-bold text-orange-800 mb-1">⏳ Délai</h4>
                       <p className="text-sm text-orange-700">Réclamation sous 48h maximum</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                       <h4 className="font-bold text-blue-800 mb-1">🚚 Livraison</h4>
                       <p className="text-sm text-blue-700">Seuls les frais de port sont remboursables</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                       <h4 className="font-bold text-green-800 mb-1">💳 Moyen</h4>
                       <p className="text-sm text-green-700">Remboursement via mode de paiement initial</p>
                    </div>
                 </div>

                 {/* Contenu détaillé */}
                 <div>
                    <h3 className="text-xl font-bold text-[#1B3A5F] mb-3">Conditions d'Éligibilité</h3>
                    <ul className="list-disc pl-5 space-y-2">
                       <li><strong>Retard majeur :</strong> Remboursement partiel ou total si le délai confirmé n'est pas respecté (+2h de retard).</li>
                       <li><strong>Erreur de service :</strong> Colis endommagé par le livreur ou comportement inapproprié.</li>
                       <li><strong>Non-livraison :</strong> Remboursement intégral si la livraison n'a pas lieu de notre fait.</li>
                    </ul>
                 </div>

                 <div>
                    <h3 className="text-xl font-bold text-[#1B3A5F] mb-3">Exclusions</h3>
                    <p>Le remboursement ne s'applique pas si :</p>
                    <ul className="list-disc pl-5 space-y-2">
                       <li>L'adresse fournie était incorrecte ou le destinataire absent.</li>
                       <li>Le produit est endommagé à cause d'un mauvais emballage du vendeur.</li>
                       <li>L'annulation intervient après le départ du coursier.</li>
                    </ul>
                 </div>
                 
                 <div className="bg-gray-100 p-4 rounded-lg text-sm">
                    <p><strong>Note importante :</strong> Pour tout problème lié à la qualité du produit (erreur de commande, goût, défaut), merci de contacter directement le vendeur. Notre responsabilité se limite au transport.</p>
                 </div>
              </div>
            </div>
          </div>

          {/* ==================== SECTION CONFIDENTIALITÉ ==================== */}
          <div id="confidentialite" className="scroll-mt-24">
            
            {/* En-tête Juridique */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-[#1B3A5F] mb-12">
              <h2 className="text-3xl font-bold text-[#1B3A5F] mb-6 flex items-center gap-3">
                <Lock className="w-8 h-8" />
                Politique de Confidentialité
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-sm md:text-base">
                <p className="mb-4 leading-relaxed">
                  La présente Politique de confidentialité explique comment <strong>LE LIVREUR 2 ZERO S.A.R.L</strong> recueille, utilise, conserve, protège et partage vos données personnelles conformément à la législation en vigueur au Bénin, notamment la <strong>Loi n°2017-20 portant Code du Numérique</strong>.
                </p>
                <div className="grid md:grid-cols-2 gap-y-2 gap-x-8 text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#F4B223] rounded-full"></span>
                    <span>Société au capital de 1 550 000 FCFA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#F4B223] rounded-full"></span>
                    <span>RCCM : RB/COT/25 B 40122</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#F4B223] rounded-full"></span>
                    <span>IFU : 3202574907795</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#F4B223] rounded-full"></span>
                    <span>Siège : Enagnon-Sikè, Cotonou</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              {/* 1. Responsable */}
              <section>
                <h3 className="text-2xl font-bold text-[#1B3A5F] mb-4 flex items-center gap-2">
                  <span className="bg-[#F4B223] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  Responsable du traitement
                </h3>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <p className="font-bold text-lg mb-2">LE LIVREUR 2 ZERO S.A.R.L</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#F4B223]"/> Enagnon-Sikè, Cotonou</li>
                    <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#F4B223]"/> 01 47 04 28 15</li>
                    <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#F4B223]"/> lelivreur2zero@gmail.com</li>
                  </ul>
                </div>
              </section>

              {/* 2. Données collectées */}
              <section>
                <h3 className="text-2xl font-bold text-[#1B3A5F] mb-4 flex items-center gap-2">
                  <span className="bg-[#F4B223] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                  Données personnelles collectées
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2"><UserCheck className="w-5 h-5"/> Données fournies</h4>
                    <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
                      <li>Nom, prénom & âge</li>
                      <li>Numéro de téléphone</li>
                      <li>Adresse email</li>
                      <li>Adresses de livraison</li>
                      <li>Infos de facturation</li>
                      <li>Contenu des messages</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                    <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2"><Globe className="w-5 h-5"/> Données automatiques</h4>
                    <ul className="text-sm text-purple-700 space-y-1 list-disc pl-4">
                      <li>Données de navigation</li>
                      <li>Adresse IP</li>
                      <li>Identifiants d’appareils</li>
                      <li>Cookies techniques</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                    <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2"><Package className="w-5 h-5"/> Données Service</h4>
                    <ul className="text-sm text-green-700 space-y-1 list-disc pl-4">
                      <li>Historique de commandes</li>
                      <li>Infos de suivi de colis</li>
                      <li>Preuves de livraison</li>
                      <li>Géolocalisation (si activée)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. Finalités */}
              <section>
                <h3 className="text-2xl font-bold text-[#1B3A5F] mb-4 flex items-center gap-2">
                  <span className="bg-[#F4B223] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                  Finalités du traitement
                </h3>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-800">3.1. Exécuter nos services</h4>
                    <p className="text-gray-600 text-sm">Gérer vos commandes, organiser la livraison, assurer le suivi en temps réel et communiquer avec vous.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">3.2. Améliorer nos services</h4>
                    <p className="text-gray-600 text-sm">Optimiser nos trajets, analyser les statistiques et améliorer l'ergonomie.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">3.3. Communication marketing</h4>
                    <p className="text-gray-600 text-sm">Envoi d’offres promotionnelles (avec consentement), programmes de fidélité et enquêtes.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">3.4. Obligations légales</h4>
                    <p className="text-gray-600 text-sm">Facturation, prévention des fraudes et archivage légal.</p>
                  </div>
                </div>
              </section>

              {/* 4. Fondements légaux */}
              <section>
                <h3 className="text-2xl font-bold text-[#1B3A5F] mb-4 flex items-center gap-2">
                  <span className="bg-[#F4B223] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                  Fondements légaux
                </h3>
                <p className="text-gray-700 mb-3">Conformément au Code du Numérique, vos données sont collectées sur les bases suivantes :</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm border border-gray-200">📜 Exécution d'un contrat</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm border border-gray-200">✅ Consentement</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm border border-gray-200">⚖️ Intérêt légitime</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm border border-gray-200">🏛️ Obligations légales</span>
                </div>
              </section>

              {/* 5. Partage */}
              <section>
                <h3 className="text-2xl font-bold text-[#1B3A5F] mb-4 flex items-center gap-2">
                  <span className="bg-[#F4B223] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                  Partage des données
                </h3>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                  <p className="font-bold text-red-600 mb-2">🚫 Nous ne vendons jamais vos données.</p>
                  <p className="text-gray-700 mb-2">Nous partageons certaines données uniquement avec :</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Nos livreurs et équipes opérationnelles</li>
                    <li>Nos partenaires technologiques (hébergement, SMS)</li>
                    <li>Les autorités compétentes lorsque la loi l’exige</li>
                  </ul>
                </div>
              </section>

              {/* 6. Durée de conservation */}
              <section>
                <h3 className="text-2xl font-bold text-[#1B3A5F] mb-4 flex items-center gap-2">
                  <span className="bg-[#F4B223] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">6</span>
                  Durée de conservation
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-3 font-bold text-gray-700">Type de données</th>
                        <th className="p-3 font-bold text-gray-700">Durée</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b border-gray-100"><td className="p-3">Données de compte</td><td className="p-3">3 ans après dernière activité</td></tr>
                      <tr className="border-b border-gray-100"><td className="p-3">Données de facturation</td><td className="p-3">10 ans (exigences légales)</td></tr>
                      <tr className="border-b border-gray-100"><td className="p-3">Données de livraison</td><td className="p-3">5 ans</td></tr>
                      <tr><td className="p-3">Cookies</td><td className="p-3">6 à 12 mois</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 7, 8, 10, 11, 12 Groupés */}
              <div className="space-y-8">
                <section>
                   <h4 className="font-bold text-[#1B3A5F] text-lg mb-2">7. Cookies et technologies</h4>
                   <p className="text-gray-600">Nous utilisons des cookies pour le fonctionnement, la mesure d'audience et la personnalisation. Vous pouvez les gérer via votre navigateur.</p>
                </section>
                <section>
                   <h4 className="font-bold text-[#1B3A5F] text-lg mb-2">8. Sécurité des données</h4>
                   <p className="text-gray-600">Nous utilisons le chiffrement SSL, des contrôles d’accès et des sauvegardes régulières. Nous notifierons toute violation conformément à la loi.</p>
                </section>
                <section>
                   <h4 className="font-bold text-[#1B3A5F] text-lg mb-2">10. Transfert hors Bénin</h4>
                   <p className="text-gray-600">Certains fournisseurs (ex : cloud) peuvent être à l'étranger. Nous veillons à ce qu'ils respectent les standards internationaux.</p>
                </section>
                <section>
                   <h4 className="font-bold text-[#1B3A5F] text-lg mb-2">11. Mineurs</h4>
                   <p className="text-gray-600">Nos services ne sont pas destinés aux moins de 16 ans sans consentement parental.</p>
                </section>
              </div>

              {/* 9. Vos Droits */}
              <section className="bg-[#1B3A5F] text-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="bg-[#F4B223] text-[#1B3A5F] w-8 h-8 rounded-full flex items-center justify-center text-sm">9</span>
                  Vos droits (Code du Numérique)
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <ul className="space-y-2 text-blue-100">
                    <li>• Droit d’accès à vos données</li>
                    <li>• Droit de rectification</li>
                    <li>• Droit à l’effacement (« droit à l’oubli »)</li>
                    <li>• Droit d’opposition</li>
                  </ul>
                  <ul className="space-y-2 text-blue-100">
                    <li>• Droit à la limitation du traitement</li>
                    <li>• Droit à la portabilité</li>
                    <li>• Droit de retirer votre consentement</li>
                  </ul>
                </div>
                <div className="bg-white/10 p-4 rounded-xl text-center">
                  <p className="mb-2">Pour exercer ces droits :</p>
                  <a href="mailto:lelivreur2zero@gmail.com" className="font-bold text-[#F4B223] text-lg hover:underline">
                    lelivreur2zero@gmail.com
                  </a>
                </div>
              </section>

              {/* 13. Contact */}
              <section className="text-center pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-[#1B3A5F] mb-4">Une question sur la protection de vos données ?</h3>
                <div className="flex flex-wrap justify-center gap-6 text-gray-700">
                   <a href="mailto:lelivreur2zero@gmail.com" className="flex items-center gap-2 hover:text-[#F4B223]"><Mail className="w-5 h-5"/> lelivreur2zero@gmail.com</a>
                   <a href="tel:+22901470428" className="flex items-center gap-2 hover:text-[#F4B223]"><Phone className="w-5 h-5"/> 01 47 04 28 15</a>
                   <span className="flex items-center gap-2"><MapPin className="w-5 h-5"/> Enagnon-Sikè, Cotonou</span>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}