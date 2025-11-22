


// ============================================
// FICHIER 3: app/api/auth/verify/route.js
// ============================================
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'votre-secret-key-super-securise-changez-moi'
);

export async function GET(request) {
  try {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, authenticated: false },
        { status: 401 }
      );
    }

    // Vérifier le token
    const { payload } = await jwtVerify(token, SECRET_KEY);

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: {
        id: payload.userId,
        username: payload.username,
        name: payload.name,
        role: payload.role
      }
    });

  } catch (error) {
    console.error('Erreur vérification:', error);
    return NextResponse.json(
      { success: false, authenticated: false },
      { status: 401 }
    );
  }
}