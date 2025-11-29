// Fichier: app/robots.js

export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://le-livreur-2-0.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/', // On cache l'admin
        '/api/',   // On cache les API
        '/login',  // On cache la page de login
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}