// Fichier: app/manifest.js

export default function manifest() {
  return {
    name: 'LE LIVREUR 2.0',
    short_name: 'Livreur 2.0',
    description: 'Service de livraison express à Cotonou',
    start_url: '/',
    display: 'standalone',
    background_color: '#1B3A5F',
    theme_color: '#F4B223',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}