// Fichier: components/contact/ContactPageClient.jsx
'use client';

import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';

// Composant FAQ Item avec animation
function FAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-[#1B3A5F] text-lg pr-8 group-hover:text-[#F4B223] transition-colors">
          {question}
        </span>
        <ChevronDown 
          className={`w-6 h-6 text-[#F4B223] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-5 text-gray-700 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function ContactPageClient({ faqData, cleanPhone }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B3A5F] mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-gray-600 text-lg">
            Trouvez rapidement des réponses à vos questions
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          {faqData.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
          <a 
            href={`https://wa.me/${cleanPhone}?text=Bonjour%2C%20j%27ai%20une%20question`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md"
          >
            <MessageSquare className="w-5 h-5" />
            Contactez-nous sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}