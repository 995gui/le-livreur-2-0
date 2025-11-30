import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendAdminNotification } from '@/lib/mail'; // Notre système d'email

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email') || null;
    const motivation = formData.get('motivation');
    const cv = formData.get('cv');

    // Validation
    if (!name || !phone || !motivation || !cv) {
      return NextResponse.json(
        { success: false, message: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Validation fichier
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(cv.type)) {
      return NextResponse.json(
        { success: false, message: 'Format de CV non supporté. Utilisez PDF, DOC ou DOCX' },
        { status: 400 }
      );
    }

    if (cv.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'Le fichier CV ne doit pas dépasser 5MB' },
        { status: 400 }
      );
    }

    // Upload du CV vers Supabase Storage
    const timestamp = Date.now();
    const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_');
    const extension = cv.name.split('.').pop();
    const filename = `${sanitizedName}_${timestamp}.${extension}`;

    const bytes = await cv.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('cv_uploads')
      .upload(filename, buffer, {
        contentType: cv.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Erreur upload CV:', uploadError);
      return NextResponse.json(
        { success: false, message: 'Erreur lors de l\'upload du CV' },
        { status: 500 }
      );
    }

    // Obtenir l'URL publique du CV
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('cv_uploads')
      .getPublicUrl(filename);

    // Insertion dans la base de données
    const { data, error } = await supabaseAdmin
      .from('candidatures')
      .insert([
        {
          name,
          phone,
          email,
          motivation,
          cv_url: publicUrl,
          is_viewed: false
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { success: false, message: 'Erreur lors de l\'enregistrement' },
        { status: 500 }
      );
    }

    try {
      console.log(data);
      await sendAdminNotification('recrutement', data);
    } catch (mailError) {
      // On loggue l'erreur mais on ne bloque pas la réponse de succès pour le client
      console.error("⚠️ Erreur envoi email notification:", mailError);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Candidature envoyée avec succès !',
        data: {
          id: data.id,
          name: data.name
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { data, error } = await supabaseAdmin
      .from('candidatures')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { success: false, message: 'Erreur lors de la récupération' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        data: data,
        count: data.length
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}