
// Importez vos nouveaux composants
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster"

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