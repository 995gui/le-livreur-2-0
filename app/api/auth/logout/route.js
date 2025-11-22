// ============================================
// FICHIER 2: app/api/auth/logout/route.js
// ============================================
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: 'Déconnexion réussie' },
    { status: 200 }
  );

  // Supprimer le cookie
  response.cookies.delete('admin-token');

  return response;
}