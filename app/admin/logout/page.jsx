import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function AdminLayout({ children }) {
  // 1. Récupérer les cookies (Next.js 15 nécessite 'await')
  const cookieStore = await cookies();

  // 2. Créer un client Supabase temporaire pour vérifier la session
  // (On utilise les clés publiques ici car on vérifie juste l'identité)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: { persistSession: false },
      global: { headers: { cookie: cookieStore.toString() } }
    }
  );

  // 3. Vérifier si l'utilisateur est connecté
  const { data: { user }, error } = await supabase.auth.getUser();

  // 4. SI PAS CONNECTÉ : Redirection immédiate avec un message
  if (error || !user) {
    // On ajoute un paramètre ?error pour afficher le feedback sur la page login
    redirect('/login?message=Accès réservé. Veuillez vous connecter.');
  }

  // 5. SI CONNECTÉ : On laisse passer (affiche les pages enfants)
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Vous pouvez ajouter ici une Sidebar Admin ou une Navbar Admin commune */}
      {children}
    </div>
  );
}