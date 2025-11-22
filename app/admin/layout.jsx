// Fichier: app/admin/layout.jsx - VERSION OPTIMISÉE MOBILE
import { createServerClient } from '@supabase/ssr';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminNavbar from '@/components/admin/AdminNavbar';

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {},
      },
    }
  );

  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    const message = encodeURIComponent("Accès réservé. Veuillez vous connecter.");
    redirect(`/login?message=${message}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      {/* ✅ OPTIMISATION MOBILE/DESKTOP */}
      <main className="lg:pl-64 transition-all duration-300">
        <div className="">
          {children}
        </div>
      </main>
    </div>
  );
}