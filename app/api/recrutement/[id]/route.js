// app/api/recrutement/[id]/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// GET - Récupérer une candidature spécifique
export async function GET(request, context) {
  try {
    const params = await context.params;
    const { id } = params;  // ✅ Gardez la string

    const { data, error } = await supabase
      .from('candidatures')
      .select('*')
      .eq('id', id)  // ✅ Supabase convertit automatiquement
      .single();

    if (error || !data) {
      console.log('Erreur GET:', error);
      return NextResponse.json(
        { success: false, message: 'Candidature non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Erreur GET:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// PATCH - Mettre à jour une candidature
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;  // ✅ Gardez la string

    const body = await request.json();
    
    console.log('=== DEBUG PATCH ===');
    console.log('ID reçu:', id, 'Type:', typeof id);
    console.log('Body:', body);

    // Vérifier l'existence
    const { data: existing, error: checkError } = await supabase
      .from('candidatures')
      .select('*')
      .eq('id', id)  // ✅ String "4"
      .single();

    console.log('Test résultat:', existing);
    console.log('Test erreur:', checkError);

    if (checkError || !existing) {
      return NextResponse.json(
        { error: 'Candidat non trouvé' },
        { status: 404 }
      );
    }

    // Mettre à jour
    const { data, error } = await supabase
      .from('candidatures')
      .update(body)
      .eq('id', id)  // ✅ String "4"
      .select();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data[0]);
    
  } catch (error) {
    console.error('Erreur PATCH:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une candidature
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;  // ✅ Gardez la string

    const { error } = await supabase
      .from('candidatures')
      .delete()
      .eq('id', id);  // ✅ String

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Candidat supprimé' });
    
  } catch (error) {
    console.error('Erreur DELETE:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}