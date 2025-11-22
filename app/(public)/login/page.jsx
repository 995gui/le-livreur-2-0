// Fichier: app/login/page.jsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { login } from './actions'; // <-- Import de la Server Action
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, AlertCircle, Loader2 } from 'lucide-react';

function LoginForm() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const msg = searchParams.get('message');
    if (msg) setMessage(msg);
  }, [searchParams]);

  // Petit hack pour afficher le loading pendant la Server Action
  const handleSubmit = (e) => {
    setLoading(true);
    // Le formulaire sera soumis normalement, 'action={login}' s'en charge
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 bg-[#F4B223] text-[#1B3A5F] flex items-center justify-center rounded-full mb-4">
          <Lock className="h-6 w-6" />
        </div>
        <h2 className="text-3xl font-bold text-[#1B3A5F]">
          Espace Administration
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Connectez-vous pour gérer le site
        </p>
      </div>

      {message && (
        <Alert variant={message.includes('Erreur') ? "destructive" : "default"} className={message.includes('Erreur') ? "" : "bg-yellow-50 border-yellow-200 text-yellow-800"}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{message.replace('Erreur: ', '')}</AlertDescription>
        </Alert>
      )}

      {/* IMPORTANT : L'attribut 'action' pointe vers notre Server Action */}
      <form className="mt-8 space-y-6" action={login} onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Adresse Email</Label>
            <Input
              id="email"
              name="email" // 'name' est indispensable pour le Server Action
              type="email"
              required
              placeholder="admin@lelivreur2.bj"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              name="password" // 'name' est indispensable
              type="password"
              required
              placeholder="••••••••"
              className="mt-1"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#1B3A5F] hover:bg-[#0F2847] text-white"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Connexion...
            </>
          ) : 'Se connecter'}
        </Button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div>Chargement...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}