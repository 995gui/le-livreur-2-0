// Fichier: app/page.jsx
import Hero from '@/components/sections/home/Hero';
import Partners from '@/components/sections/home/Partners';
import Services from '@/components/sections/home/Services';
import QuickIntro from '@/components/sections/home/QuickIntro'; // <-- NOUVEAU
import Advantages from '@/components/sections/home/Advantages';
import Cta from '@/components/sections/home/Cta';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Partners />
      <Services />
      <QuickIntro /> {/* <-- AJOUTÉ ICI */}
      <Advantages />
      <Cta />
    </main>
  );
}