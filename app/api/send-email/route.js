// Fichier: app/api/send-email/route.js
import { NextResponse } from 'next/server';
import { sendAdminNotification } from '@/lib/mail'; // On importe la nouvelle fonction

export async function POST(request) {
  try {
    const { to, subject, html } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json({ success: false, message: "Données manquantes" }, { status: 400 });
    }

    // Appel du helper centralisé
    await sendAdminNotification(to, subject, html);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}