// Fichier: app/api/hero-slides/all/route.js
import { supabaseAdmin } from '@/lib/supabase-admin';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    
    // --- ETAPE 1 : VÉRIFICATION AUTHENTIFICATION ---
    // CORRECTION NEXT.JS 15 : Ajout de 'await' devant cookies()
    const cookieStore = await cookies(); 
    
    const supabaseAuth = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: { persistSession: false },
        global: { headers: { cookie: cookieStore.toString() } }
      }
    );

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // --- ETAPE 2 : RÉCUPÉRATION DES DONNÉES ---
    const { data, error } = await supabaseAdmin
      .from('hero_slides')
      .select('*')
      .order('priority', { ascending: true });

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des slides' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      slides: data || [],
      count: data?.length || 0
    });

  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}