// Fichier: app/layout.jsx
import './globals.css'; // Importe les styles Tailwind

// Importez vos nouveaux composants
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Optionnel : Pour une police moderne comme Poppins (recommandé)
import { Poppins } from 'next/font/google';

// Configuration de la police
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'] // Chargez les graisses dont vous avez besoin
});

export const metadata = {
  // Votre Slogan principal comme Titre
  title: 'LE LIVREUR 2.0 - Votre service de livraison rapide et professionnel au Bénin',
  // Votre Sous-texte optimisé comme Description
  description: 'Agence de livraison professionnelle à Cotonou, spécialisée en livraison express, programmée, et solutions logistiques pour particuliers, entreprises et e-commerces.',
  keywords: [
    'livraison Cotonou', 
    'service de livraison Cotonou', 
    'livreur professionnel Bénin', 
    'agence de livraison Bénin', 
    'livraison express Cotonou', 
    'livraison écologique moto électrique Bénin', 
    'service de coursier Cotonou', 
    'livraison pour entreprises', 
    'solution de livraison pour e-commerce'
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}