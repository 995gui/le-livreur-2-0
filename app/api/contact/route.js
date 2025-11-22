// Fichier: app/api/contact/route.js
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin'; // On utilise le client Admin pour être sûr d'avoir le droit d'écrire
import { sendAdminNotification } from '@/lib/mail'; // Pour recevoir l'email (si configuré)

export async function POST(request) {
  try {
    const body = await request.json();
    
    const { name, email, phone, subject, message } = body;

    // 1. Validation simple
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Champs requis manquants' }, 
        { status: 400 }
      );
    }

    // 2. Insertion dans Supabase
    const { error } = await supabaseAdmin
      .from('contacts')
      .insert([
        { 
          name, 
          email, 
          phone, 
          subject, 
          message,
          is_read: false // Marqué comme non lu par défaut
        }
      ]);

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { success: false, message: 'Erreur base de données' }, 
        { status: 500 }
      );
    }

    // 3. Envoi Notification Email (Optionnel, ne bloque pas si ça échoue)
    // Assurez-vous d'avoir configuré lib/mail.js et vos variables d'env pour que ça marche
    try {
        await sendAdminNotification('contact', { name, email, subject, message });
    } catch (mailError) {
        console.error("Erreur envoi mail notification:", mailError);
    }

    return NextResponse.json(
      { success: true, message: 'Message envoyé avec succès' }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur Serveur:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur interne du serveur' }, 
      { status: 500 }
    );
  }
}