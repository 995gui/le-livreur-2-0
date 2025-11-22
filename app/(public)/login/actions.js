'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData) {
  const cookieStore = await cookies();
  
  // 1. Création du client Supabase Serveur
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  // 2. Récupération des données du formulaire
  const email = formData.get('email');
  const password = formData.get('password');

  // 3. Tentative de connexion
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // En cas d'erreur, on renvoie vers login avec le message
    return redirect(`/login?message=Erreur: ${error.message}`);
  }

  // 4. Succès : Redirection vers l'admin
  // Le cookie est maintenant "fixé" sur le serveur
  return redirect('/admin/hero-slides');
}