// Importez vos nouveaux composants
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://le-livreur-2-0.vercel.app';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'LE LIVREUR 2.0 | Livraison Express à Cotonou & Calavi',
    template: '%s | LE LIVREUR 2.0'
  },
  description: 'Service de livraison rapide, fiable et écologique au Bénin. Courses express, programmées et abonnements entreprises. Flotte de motos électriques.',
  keywords: ['livraison cotonou', 'coursier bénin', 'Expédition Lomé Cotonou', 'logistique', 'moto électrique', 'le livreur 2.0', 'livraison express'],
  authors: [{ name: 'LE LIVREUR 2.0' }],
  creator: 'LE LIVREUR 2.0',
  publisher: 'LE LIVREUR 2.0',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Open Graph (Pour Facebook, WhatsApp, LinkedIn)
  openGraph: {
    title: 'LE LIVREUR 2.0 - La Révolution Logistique au Bénin',
    description: 'Livraison express, programmée et écologique. Commandez votre coursier en quelques clics.',
    url: BASE_URL,
    siteName: 'LE LIVREUR 2.0',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png', // On créera cette image après
        width: 1200,
        height: 630,
        alt: 'LE LIVREUR 2.0 - Livraison Express',
      },
    ],
  },
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'LE LIVREUR 2.0',
    description: 'Votre partenaire logistique de confiance à Cotonou.',
    images: ['/opengraph-image.png'], // On réutilise la même image
  },
  // Icônes (Favicon)
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png', // Si vous en avez un
  },
  // Robots (Indexation)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
      <Toaster /> {/* Affiche les notifications (Toasts) sur les pages publiques */}
    </div>
  );
}