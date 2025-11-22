import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// PATCH - Mettre à jour un devis
export async function PATCH(request, context) {
  try {
    // Next.js 15 : params est une Promise
    const params = await context.params;
    const { id } = params;
    
    console.log('PATCH devis ID:', id); // Debug
    
    const { status, notes } = await request.json();

    if (!status) {
      return NextResponse.json(
        { success: false, message: 'Le statut est requis' },
        { status: 400 }
      );
    }

    // Mise à jour dans Supabase (sans .single() d'abord)
    const { data, error } = await supabase
      .from('devis_requests')
      .update({ 
        status,
        notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Erreur PATCH Supabase:', error);
      return NextResponse.json(
        { success: false, message: 'Erreur lors de la mise à jour' },
        { status: 500 }
      );
    }

    // Vérifier si l'enregistrement existe
    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Devis non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Devis mis à jour avec succès',
      data: data[0]
    });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// GET - Récupérer un devis spécifique
export async function GET(request, context) {
  try {
    const params = await context.params;
    const { id } = params;

    const { data, error } = await supabase
      .from('devis_requests')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, message: 'Devis non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data
    });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un devis
export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const { id } = params;

    const { error } = await supabase
      .from('devis_requests')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { success: false, message: 'Erreur lors de la suppression' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Devis supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}