// ============================================
// FICHIER 1: app/api/auth/login/route.js
// ============================================
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'votre-secret-key-super-securise-changez-moi'
);

// Base de données temporaire (en production, utilisez une vraie BDD)
const ADMIN_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123', // En production, utilisez bcrypt !
    role: 'admin',
    name: 'Administrateur Principal'
  },
  {
    id: 2,
    username: 'manager',
    password: 'manager123',
    role: 'manager',
    name: 'Manager'
  }
];

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Validation des champs
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Identifiant et mot de passe requis' },
        { status: 400 }
      );
    }

    // Recherche de l'utilisateur
    const user = ADMIN_USERS.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Identifiants incorrects' },
        { status: 401 }
      );
    }

    // Création du token JWT
    const token = await new SignJWT({ 
      userId: user.id,
      username: user.username,
      role: user.role,
      name: user.name
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(SECRET_KEY);

    // Créer la réponse avec cookie
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Connexion réussie',
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role
        }
      },
      { status: 200 }
    );

    // Définir le cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 heures
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Erreur login:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
