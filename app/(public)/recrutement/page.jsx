// Fichier: app/recrutement/page.jsx
import RecrutementForm from '@/components/forms/RecrutementForm';
import { Bike, Clock, TrendingUp, Users, Shield, Heart, CheckCircle, Star } from 'lucide-react';

export const metadata = {
  title: 'Recrutement - Devenir Livreur | LE LIVREUR 2.0',
  description: 'Rejoignez l\'équipe LE LIVREUR 2.0 à Cotonou. Devenez livreur professionnel avec salaire attractif, formation et équipements fournis.',
};

export default function RecrutementPage() {
  const advantages = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Revenus Attractifs',
      description: 'Salaire fixe + primes de performance + pourboires',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Bike className="w-8 h-8" />,
      title: 'Équipement Fourni',
      description: 'Moto, casque, gilet, sacoche et téléphone professionnel',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Horaires Flexibles',
      description: 'Temps plein ou partiel selon vos disponibilités',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Formation Gratuite',
      description: 'Formation complète à nos méthodes et à la sécurité',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Assurance Incluse',
      description: 'Couverture complète pour vous et votre moto',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Ambiance Conviviale',
      description: 'Équipe solidaire et management à l\'écoute',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const requirements = [
    'Avoir minimum 18 ans',
    'Posséder un permis de conduire valide (catégorie A)',
    'Savoir lire et écrire le français',
    'Avoir une bonne connaissance de Cotonou, Abomey-Calavi et environs',
    'Être entièrement disponible',
    'Posséder un smartphone (Android ou iOS)',
    'Avoir un casier judiciaire vierge',
    'Être en bonne condition physique'
  ];

  const process = [
    {
      step: '1',
      title: 'Candidature en ligne',
      description: 'Remplissez le formulaire ci-dessous avec votre CV',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: '2',
      title: 'Étude du dossier',
      description: 'Notre équipe RH étudie votre candidature sous 48h',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: '3',
      title: 'Entretien',
      description: 'Rencontre avec notre responsable recrutement',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: '4',
      title: 'Formation',
      description: '3 jours de formation pratique et théorique',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: '5',
      title: 'Intégration',
      description: 'Bienvenue dans la famille LE LIVREUR 2.0 !',
      icon: <Star className="w-6 h-6" />
    }
  ];

  const testimonials = [
    {
      name: 'Mathieu A.',
      role: 'Livreur depuis 1 an',
      photo: '👨',
      text: 'Excellente opportunité ! Les horaires sont flexibles et le management est top. Je recommande vivement.',
      rating: 5
    },
    {
      name: 'Sylvie K.',
      role: 'Livreuse depuis 6 mois',
      photo: '👩',
      text: 'Formation complète et équipe très accueillante. Je me sens en sécurité et bien encadrée.',
      rating: 5
    },
    {
      name: 'Ibrahim D.',
      role: 'Livreur depuis 2 ans',
      photo: '👨',
      text: 'Les primes de performance motivent vraiment. C\'est un travail valorisant avec de bons revenus.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#1B3A5F] to-[#2C5282] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F4B223' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="text-[#F4B223] font-bold text-sm uppercase tracking-wide">
              Rejoignez-nous
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mt-2 mb-6">
              Devenez Livreur Professionnel
            </h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Rejoignez la première équipe de livreurs professionnels du Bénin. 
              Revenus attractifs, formation gratuite, équipement fourni et assurance incluse.
            </p>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1B3A5F] mb-4">
              Pourquoi Nous Rejoindre ?
            </h2>
            <p className="text-xl text-gray-600">
              Des conditions de travail exceptionnelles pour nos livreurs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${advantage.color} text-white mb-6 shadow-lg`}>
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1B3A5F] mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#1B3A5F] mb-6">
                Profil Recherché
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nous recherchons des personnes motivées, sérieuses et professionnelles. 
                Voici les critères minimums pour postuler :
              </p>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#F4B223] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#1B3A5F] to-[#2C5282] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Package Livreur</h3>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#F4B223]">
                  <h4 className="font-bold text-[#F4B223] mb-2">Salaire de Base</h4>
                  <p className="text-3xl font-bold mb-2">SMIG en vigueur</p>
                  <p className="text-sm opacity-90">+ Primes de performance</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-[#F4B223] flex-shrink-0 mt-0.5" />
                    <span>Prime de rendement</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-[#F4B223] flex-shrink-0 mt-0.5" />
                    <span>Pourboires conservés à 100%</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-[#F4B223] flex-shrink-0 mt-0.5" />
                    <span>Assurance moto et santé incluses</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-[#F4B223] flex-shrink-0 mt-0.5" />
                    <span>Équipement professionnel fourni</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-[#F4B223] flex-shrink-0 mt-0.5" />
                    <span>Formation continue gratuite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1B3A5F] mb-4">
              Processus de Recrutement
            </h2>
            <p className="text-xl text-gray-600">
              5 étapes simples pour rejoindre notre équipe
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {process.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#F4B223] text-[#1B3A5F] font-bold text-xl flex items-center justify-center">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-[#1B3A5F]">
                        {item.title}
                      </h3>
                      <span className="text-[#F4B223]">{item.icon}</span>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1B3A5F] mb-4">
              Témoignages de Nos Livreurs
            </h2>
            <p className="text-xl text-gray-600">
              Ils ont rejoint l'aventure, voici leurs retours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-5xl">{testimonial.photo}</div>
                  <div>
                    <h3 className="font-bold text-[#1B3A5F]">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#F4B223] fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-[#1B3A5F] mb-4">
                Postuler Maintenant
              </h2>
              <p className="text-xl text-gray-600">
                Remplissez le formulaire ci-dessous pour rejoindre notre équipe
              </p>
            </div>

            <RecrutementForm isModal={false} />

            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-[#1B3A5F]">Protection des données :</strong> 
                Vos informations personnelles sont traitées de manière confidentielle et utilisées 
                uniquement dans le cadre du processus de recrutement. Elles ne seront jamais 
                partagées avec des tiers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#1B3A5F] text-center mb-12">
            Questions Fréquentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Dois-je avoir ma propre moto ?',
                a: 'Non ! Nous fournissons les motos professionnelles à tous nos livreurs. Vous n\'avez besoin que de votre permis de conduire.'
              },
              {
                q: 'Combien de temps dure la formation ?',
                a: 'La formation initiale dure 3 jours et couvre la sécurité routière, l\'utilisation de notre application et nos procédures.'
              },
              {
                q: 'Puis-je travailler en temps partiel ?',
                a: 'Oui ! Nous proposons des contrats flexibles.'
              },
              {
                q: 'Quand puis-je commencer après ma candidature ?',
                a: 'Si votre dossier est complet, vous pouvez commencer dans un délai de 1 à 2 semaines après validation.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-[#1B3A5F] mb-2 text-lg">
                  {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}