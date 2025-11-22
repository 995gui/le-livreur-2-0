// Fichier: app/api/hero-slides/route.js
import { supabase} from '@/lib/supabase';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// GET - Récupérer les slides actifs
export async function GET(request) {
  try {
    const now = new Date().toISOString();

    // Requête avec filtres
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .eq('active', true)
      .or(`start_date.is.null,start_date.lte.${now}`)
      .or(`end_date.is.null,end_date.gte.${now}`)
      .order('priority', { ascending: true });

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des slides' },
        { status: 500 }
      );
    }

    // Mapper les données au format attendu par le frontend
    const formattedSlides = (data || []).map(slide => ({
      id: slide.id,
      title: slide.title,
      subtitle: slide.subtitle,
      bgGradient: slide.bg_gradient,
      image: slide.image_url,
      imageAlt: slide.image_alt || slide.title,
      cta1Text: slide.cta1_text,
      cta1Href: slide.cta1_href,
      cta2Text: slide.cta2_text || null,
      cta2Href: slide.cta2_href || null,
    }));

    return NextResponse.json({
      success: true,
      slides: formattedSlides,
      count: formattedSlides.length
    });

  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau slide (ADMIN uniquement)
export async function POST(request) {
  try {    
    // Vérifier l'authentification admin
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // TODO: Vérifier le rôle admin (selon ton système)
    // if (user.role !== 'admin') { return 403 }

    const body = await request.json();

    // Validation des champs requis
    if (!body.title || !body.bg_gradient || !body.image_url || !body.cta1_text || !body.cta1_href) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('hero_slides')
      .insert([{
        title: body.title,
        subtitle: body.subtitle || null,
        bg_gradient: body.bg_gradient,
        image_url: body.image_url,
        image_alt: body.image_alt || body.title,
        cta1_text: body.cta1_text,
        cta1_href: body.cta1_href,
        cta2_text: body.cta2_text || null,
        cta2_href: body.cta2_href || null,
        active: body.active !== false,
        priority: body.priority || 0,
        start_date: body.start_date || null,
        end_date: body.end_date || null,
      }])
      .select()
      .single();

    if (error) {
      console.error('Erreur création slide:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la création du slide' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      slide: data
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}