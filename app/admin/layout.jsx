// Fichier: app/admin/layout.jsx
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
    // --- CORRECTION ICI ---
    // On encode le message pour que les accents (è, é) passent sur Vercel
    const message = encodeURIComponent("Accès réservé. Veuillez vous connecter ok.");
    redirect(`/login?message=${message}`);
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <AdminNavbar />
      <main className="pt-14 lg:pl-64 pb-20 lg:pb-10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}