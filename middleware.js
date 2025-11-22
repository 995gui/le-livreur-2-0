// Fichier: middleware.js
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  // 1. Créer une réponse vide (qu'on va remplir avec les cookies)
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Créer le client Supabase pour gérer les cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        // Lire tous les cookies
        getAll() {
          return request.cookies.getAll()
        },
        // Écrire les cookies (rafraîchir la session)
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // 3. IMPORTANT : Rafraîchir la session Supabase
  // C'est cette ligne qui synchronise le login entre le navigateur et le serveur
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    /*
     * Applique ce middleware à toutes les routes SAUF :
     * - Les fichiers statiques (_next/static)
     * - Les images (_next/image)
     * - Le favicon (favicon.ico)
     * - Les fichiers publics (images, svgs...)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}