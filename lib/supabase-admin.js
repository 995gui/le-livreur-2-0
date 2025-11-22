// Fichier: lib/supabase-admin.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Sécurité : On vérifie que la clé existe côté serveur
if (!supabaseServiceKey) {
  // En dev, cela permet de voir l'erreur dans le terminal serveur
  console.warn("Attention: SUPABASE_SERVICE_ROLE_KEY est manquant.")
}

// Ce client ne doit être importé QUE dans les API Routes (dossier app/api)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || '', {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})