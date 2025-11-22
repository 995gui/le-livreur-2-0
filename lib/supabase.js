// Fichier: lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Ce client est sûr et peut être utilisé partout (Client & Serveur)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)