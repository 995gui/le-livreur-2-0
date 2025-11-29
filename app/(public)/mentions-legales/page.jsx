// Fichier: app/(public)/mentions-legales/page.jsx
import React from 'react';
import Link from 'next/link';
import { 
  FileText, Package, MapPin, MessageSquare, CreditCard, Clock, 
  AlertTriangle, UserCheck, Lock, Building2, Calendar, 
  CloudLightning, RefreshCw, Scale, CheckCircle, Phone, Mail 
} from 'lucide-react';

export const metadata = {
  title: 'Conditions Générales de Vente (CGV) | LE LIVREUR 2.0',
  description: 'Conditions générales de vente des services de livraison LE LIVREUR 2.0 au Bénin. Droits, obligations et modalités de service.',
};

// ✅ Structure des articles basée sur votre fichier CGV.docx
const articles = [
  {
    id: 1,
    icon: <FileText className="w-6 h-6" />,
    title: 'Objet',
    color: 'blue',
    content: (
      <>
        <p>
          Les présentes Conditions Générales de Vente ont pour objet de définir les droits et obligations de <strong>LE LIVREUR 2.0</strong> (le "Prestataire") et du Client dans le cadre des prestations de livraison (express, écologique, programmée, groupée, service entreprise, abonnements…) proposées via le site ou tout autre support.
        </p>
        <p className="mt-2 font-medium text-blue-800">
          L’acceptation d’une commande implique l’adhésion pleine et entière aux présentes CGV.
        </p>
      </>
    ),
  },
  {
    id: 2,
    icon: <Package className="w-6 h-6" />,
    title: 'Services proposés',
    color: 'green',
    content: (
      <>
        <p>LE LIVREUR 2.0 propose notamment :</p>
        <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-700">
          <li>Livraison express (30/45 min) à Cotonou et environs</li>
          <li>Livraison écologique via flotte de motos électriques</li>
          <li>Livraison programmée, groupée</li>
          <li>L’expédition de colis</li>
          <li>Services pour entreprises : courses récurrentes, logistique e-commerce, facturation mensuelle, compte client dédié</li>
        </ul>
        <p className="mt-4 text-sm italic bg-gray-50 p-3 rounded">
          Les caractéristiques de chaque service (délai, zone couverte, tarif) sont précisées dans le “tarif” ou le devis correspondant.
        </p>
      </>
    ),
  },
  {
    id: 3,
    icon: <MapPin className="w-6 h-6" />,
    title: 'Zone de couverture',
    color: 'orange',
    content: (
      <>
        <p>
          Les prestations sont assurées sur les zones indiquées sur le site : <strong>Bénin (Cotonou, Abomey-Calavi, etc.)</strong> et Togo (Lomé).
        </p>
        <div className="mt-2 p-3 bg-orange-50 text-orange-800 rounded-lg text-sm">
          Toute demande en dehors de ces zones peut faire l’objet d’un devis spécifique.
        </div>
      </>
    ),
  },
  {
    id: 4,
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Commande / Demande de prestation',
    color: 'purple',
    content: (
      <ul className="space-y-3">
        <li className="flex items-start gap-2">
          <span className="font-bold text-purple-600">1.</span>
          <span>Toute commande doit être passée via le site, l’application, téléphone, WhatsApp ou email.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="font-bold text-purple-600">2.</span>
          <span>Le Prestataire confirme la prise en charge via un message ou devis. <strong>Jusqu’à cette acceptation, la commande n’est pas validée.</strong></span>
        </li>
        <li className="flex items-start gap-2">
          <span className="font-bold text-purple-600">3.</span>
          <span>Pour les clients professionnels (B2B), un devis ou contrat peut être établi. Toute prestation non couverte par un devis signé peut être refusée.</span>
        </li>
      </ul>
    ),
  },
  {
    id: 5,
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Prix et paiement',
    color: 'teal',
    content: (
      <>
        <p className="mb-3">Les prix sont ceux en vigueur au moment de la commande ou du devis.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-teal-800 mb-2">Modalités</h4>
            <p className="text-sm">Espèces, virement, mobile money.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-teal-800 mb-2">Professionnels</h4>
            <p className="text-sm">Selon conditions convenues (mensuel, facturation...).</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-red-600">
          * En cas de retard ou non-paiement, des pénalités peuvent être appliquées.
        </p>
      </>
    ),
  },
  {
    id: 6,
    icon: <Clock className="w-6 h-6" />,
    title: 'Délais et modalité de livraison',
    color: 'blue',
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Livraison express :</strong> délai cible 30-45 minutes à compter de la prise en charge.</li>
        <li><strong>Autres services :</strong> délai convenu dans le devis ou à la commande.</li>
        <li>Le Prestataire s’engage à informer le Client en cas de retard.</li>
        <li className="text-sm text-gray-500">Si le Client modifie l’adresse ou les informations après validation, des frais supplémentaires peuvent s’appliquer.</li>
      </ul>
    ),
  },
  {
    id: 7,
    icon: <AlertTriangle className="w-6 h-6" />,
    title: 'Acceptation et transfert des risques',
    color: 'red',
    content: (
      <>
        <p className="font-medium mb-2">Le Client doit vérifier l’état de la marchandise à la réception.</p>
        <div className="bg-red-50 border-l-4 border-red-500 p-3 my-3">
          <p className="text-sm text-red-700">
            Toute réserve (détérioration, manquant…) doit être formulée immédiatement par écrit (email, photo…) sous 24 heures.
          </p>
        </div>
        <p className="text-sm">
          Sauf accord contraire, la responsabilité du Prestataire est limitée au montant de la prestation.
        </p>
      </>
    ),
  },
  {
    id: 8,
    icon: <UserCheck className="w-6 h-6" />,
    title: 'Obligations du Client',
    color: 'indigo',
    content: (
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-indigo-600" />
          Fournir des informations exactes (adresse, contact...)
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-indigo-600" />
          Être présent ou donner les instructions nécessaires
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-indigo-600" />
          Payer le prix convenu dans les délais
        </li>
      </ul>
    ),
  },
  {
    id: 9,
    icon: <Lock className="w-6 h-6" />,
    title: 'Données personnelles & confidentialité',
    color: 'gray',
    content: (
      <p>
        Les données personnelles collectées sont utilisées uniquement pour l’exécution de la prestation. Elles ne seront ni revendues ni exploitées sans consentement. Conformément à la loi, le Client dispose d’un droit d’accès, rectification ou suppression.
      </p>
    ),
  },
  {
    id: 10,
    icon: <Building2 className="w-6 h-6" />,
    title: 'Clients professionnels (B2B)',
    color: 'blue',
    content: (
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-bold text-blue-900 mb-2">Conditions spécifiques</h4>
        <ul className="text-sm space-y-1 list-disc pl-4 text-blue-800">
          <li>Prestations externalisées sur contrat ou devis.</li>
          <li>Tarifs, facturation, périodicité définis dans le contrat.</li>
          <li>Conditions de règlement à convenir.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 11,
    icon: <Calendar className="w-6 h-6" />,
    title: 'Durée — Abonnement',
    color: 'green',
    content: (
      <p>
        Si le Client souscrit à un abonnement, le contrat court pour la période définie. Les modalités de renouvellement, résiliation et préavis sont précisées dans le contrat spécifique.
      </p>
    ),
  },
  {
    id: 12,
    icon: <CloudLightning className="w-6 h-6" />,
    title: 'Force majeure',
    color: 'orange',
    content: (
      <p>
        Le Prestataire ne peut être tenu responsable en cas d'événement indépendant de sa volonté (intempéries, grève, panne technique, etc.) rendant impossible l’exécution. Le Client sera informé et une nouvelle date ou un remboursement sera proposé.
      </p>
    ),
  },
  {
    id: 13,
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Modification des CGV',
    color: 'teal',
    content: (
      <p>
        Le Prestataire se réserve le droit de modifier les CGV à tout moment. Les CGV applicables sont celles en vigueur à la date de la commande. Le Client doit les accepter avant chaque commande.
      </p>
    ),
  },
  {
    id: 14,
    icon: <Scale className="w-6 h-6" />,
    title: 'Droit applicable',
    color: 'purple',
    content: (
      <p>
        Les présentes CGV sont soumises au droit en vigueur au Bénin. En cas de litige, les tribunaux compétents seront ceux du ressort du siège social du Prestataire.
      </p>
    ),
  },
  {
    id: 15,
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Acceptation du client',
    color: 'green',
    content: (
      <p className="font-medium text-green-800">
        Toute commande ou signature d’un devis implique l’acceptation sans réserve des présentes CGV.
      </p>
    ),
  },
];

const colorClasses = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  orange: 'from-orange-500 to-orange-600',
  purple: 'from-purple-500 to-purple-600',
  teal: 'from-teal-500 to-teal-600',
  red: 'from-red-500 to-red-600',
  indigo: 'from-indigo-500 to-indigo-600',
  gray: 'from-gray-500 to-gray-600',
};

export default function CGVPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1B3A5F] via-[#2C5282] to-[#1B3A5F] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-[#F4B223] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-sm font-semibold">⚖️ Cadre Légal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Conditions Générales de Vente
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Transparence et confiance pour nos services de livraison
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-blue-200">
            <Clock className="w-4 h-4" />
            <span>Dernière mise à jour : <strong>27 Novembre 2025</strong></span>
          </div>
        </div>
      </section>

      {/* Contenu Principal */}
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Intro Parties */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-12 text-center md:text-left">
            <h2 className="text-xl font-bold text-[#1B3A5F] mb-4">Entre :</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-bold text-blue-900">LE LIVREUR 2 ZERO S.A.R.L</p>
                <p className="text-sm text-blue-800">Siège : Enagnon-Sikè, Cotonou</p>
                <p className="text-sm text-blue-800">RCCM : RB/COT/25 B 40122</p>
                <p className="text-sm text-blue-800">IFU : 3202574907795</p>
                <p className="text-xs text-blue-600 mt-1">Ci-après « le Prestataire »</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg flex flex-col justify-center">
                <p className="font-bold text-gray-900">ET</p>
                <p className="text-sm text-gray-800">Le client, toute personne physique ou morale</p>
                <p className="text-xs text-gray-600 mt-1">Ci-après « le Client »</p>
              </div>
            </div>
          </div>

          {/* Articles */}
          <div className="space-y-8">
            {articles.map((article, index) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 scroll-mt-24 hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-r ${colorClasses[article.color]} p-5 text-white`}>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      {article.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold opacity-80 uppercase tracking-wider">Article {article.id}</p>
                      <h2 className="text-2xl font-bold">{article.title}</h2>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 prose prose-lg max-w-none text-gray-600 text-base leading-relaxed">
                  {article.content}
                </div>
              </article>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 text-center border-t border-gray-200 pt-8">
             <h3 className="text-2xl font-bold text-[#1B3A5F] mb-4">Une question sur nos CGV ?</h3>
             <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:+22901470428" className="flex items-center gap-2 bg-[#F4B223] text-[#1B3A5F] px-6 py-3 rounded-lg font-bold hover:bg-[#D4920F] transition-colors">
                  <Phone className="w-5 h-5"/> 01 47 04 28 15
                </a>
                <a href="mailto:lelivreur2zero@gmail.com" className="flex items-center gap-2 bg-white border-2 border-[#1B3A5F] text-[#1B3A5F] px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                  <Mail className="w-5 h-5"/> Nous écrire
                </a>
             </div>
          </div>

        </div>
      </div>
    </>
  );
}