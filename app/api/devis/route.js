// Fichier: app/api/devis/route.js
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin'; // Client Admin (Droits d'écriture)
import { sendAdminNotification } from '@/lib/mail'; // Notre système d'email

export async function POST(request) {
  try {
    const body = await request.json();
    
    const {
      name, 
      phone, 
      email, 
      serviceType, 
      pickupAddress, 
      deliveryAddress, 
      details
    } = body;

    // 1. Validation des champs obligatoires
    if (!name || !phone || !serviceType) {
      return NextResponse.json(
        { success: false, message: 'Champs obligatoires manquants (Nom, Tél, Service)' },
        { status: 400 }
      );
    }

    // 2. Insertion dans Supabase
    const { data, error } = await supabaseAdmin
      .from('devis_requests')
      .insert([{
        name,
        phone,
        email,
        service_type: serviceType,
        pickup_address: pickupAddress,
        delivery_address: deliveryAddress,
        details,
        status: 'pending' // Statut par défaut : En attente
      }])
      .select()
      .single();

    // Gestion erreur BDD
    if (error) {
      console.error('❌ Erreur Supabase:', error);
      return NextResponse.json(
        { success: false, message: 'Erreur lors de l\'enregistrement en base de données' },
        { status: 500 }
      );
    }

    // 3. Envoi de la Notification Email à l'Admin
    // On utilise .catch() pour ne pas faire planter la requête si l'email échoue
    sendAdminNotification('devis', {
      name,
      phone,
      serviceType,
      details
    }).catch(err => console.error("⚠️ Erreur envoi email notification:", err));

    // 4. Réponse succès au client
    return NextResponse.json(
      { 
        success: true, 
        message: 'Devis reçu avec succès !',
        id: data.id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Erreur Serveur:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}