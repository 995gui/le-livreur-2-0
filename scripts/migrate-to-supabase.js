// Fichier: scripts/migrate-to-supabase.js

// IMPORTANT: Charger les variables d'environnement
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Vérifier que les variables sont chargées
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Erreur : Variables d\'environnement manquantes !');
  console.log('Vérifiez que .env.local contient :');
  console.log('  NEXT_PUBLIC_SUPABASE_URL=...');
  console.log('  SUPABASE_SERVICE_ROLE_KEY=...');
  process.exit(1);
}

console.log('✓ Variables d\'environnement chargées');
console.log(`URL Supabase: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function migrateDevis() {
  try {
    const devisFile = path.join(process.cwd(), 'data', 'devis.json');
    
    // Vérifier si le fichier existe
    if (!fs.existsSync(devisFile)) {
      console.log('⚠️  Aucun fichier devis.json trouvé. Migration ignorée.');
      return;
    }

    const devisData = JSON.parse(fs.readFileSync(devisFile, 'utf8'));

    if (devisData.length === 0) {
      console.log('⚠️  Fichier devis.json vide. Rien à migrer.');
      return;
    }

    console.log(`\n📦 Migration de ${devisData.length} devis...`);

    let success = 0;
    let errors = 0;

    for (const devis of devisData) {
      const { error } = await supabase
        .from('devis_requests')
        .insert({
          name: devis.name,
          phone: devis.phone,
          email: devis.email,
          service_type: devis.serviceType,
          pickup_address: devis.pickupAddress,
          delivery_address: devis.deliveryAddress,
          details: devis.details,
          status: mapDevisStatus(devis.status),
          notes: devis.notes || null,
          created_at: devis.createdAt
        });

      if (error) {
        console.error(`  ❌ Erreur pour ${devis.name}:`, error.message);
        errors++;
      } else {
        console.log(`  ✓ Migré: ${devis.name}`);
        success++;
      }
    }

    console.log(`\n✅ Migration devis terminée: ${success} réussis, ${errors} erreurs`);
  } catch (error) {
    console.error('❌ Erreur migration devis:', error.message);
  }
}

async function migrateCandidatures() {
  try {
    const candidaturesFile = path.join(process.cwd(), 'data', 'candidatures.json');
    
    // Vérifier si le fichier existe
    if (!fs.existsSync(candidaturesFile)) {
      console.log('⚠️  Aucun fichier candidatures.json trouvé. Migration ignorée.');
      return;
    }

    const candidaturesData = JSON.parse(fs.readFileSync(candidaturesFile, 'utf8'));

    if (candidaturesData.length === 0) {
      console.log('⚠️  Fichier candidatures.json vide. Rien à migrer.');
      return;
    }

    console.log(`\n👥 Migration de ${candidaturesData.length} candidatures...`);

    let success = 0;
    let errors = 0;

    for (const candidature of candidaturesData) {
      // Construire l'URL du CV (adapter selon votre structure)
      const cvUrl = candidature.cvPath || candidature.cv_url || null;

      const { error } = await supabase
        .from('candidatures')
        .insert({
          name: candidature.name,
          phone: candidature.phone,
          email: candidature.email || null,
          motivation: candidature.motivation || '',
          cv_url: cvUrl,
          status: mapCandidatureStatus(candidature.status),
          notes: candidature.notes || null,
          is_viewed: false,
          created_at: candidature.createdAt
        });

      if (error) {
        console.error(`  ❌ Erreur pour ${candidature.name}:`, error.message);
        errors++;
      } else {
        console.log(`  ✓ Migré: ${candidature.name}`);
        success++;
      }
    }

    console.log(`\n✅ Migration candidatures terminée: ${success} réussis, ${errors} erreurs`);
  } catch (error) {
    console.error('❌ Erreur migration candidatures:', error.message);
  }
}

// Mapper les statuts de l'ancien format vers le nouveau
function mapDevisStatus(oldStatus) {
  const statusMap = {
    'En attente': 'pending',
    'En cours': 'quoted',
    'Devis envoyé': 'quoted',
    'Accepté': 'accepted',
    'Refusé': 'rejected',
    'Traité': 'accepted'
  };
  return statusMap[oldStatus] || 'pending';
}

function mapCandidatureStatus(oldStatus) {
  const statusMap = {
    'En attente': 'pending',
    'En cours d\'étude': 'pending',
    'Convoqué entretien': 'pending',
    'Accepté': 'accepted',
    'Refusé': 'rejected',
    'En formation': 'accepted'
  };
  return statusMap[oldStatus] || 'pending';
}

// Fonction pour tester la connexion Supabase
async function testConnection() {
  try {
    console.log('\n🔍 Test de connexion à Supabase...');
    
    const { data, error } = await supabase
      .from('devis_requests')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Erreur de connexion:', error.message);
      return false;
    }

    console.log('✅ Connexion à Supabase réussie !');
    return true;
  } catch (error) {
    console.error('❌ Impossible de se connecter:', error.message);
    return false;
  }
}

// Exécution principale
(async () => {
  console.log('🚀 Démarrage de la migration vers Supabase...\n');

  // Test de connexion
  const connected = await testConnection();
  if (!connected) {
    console.error('\n❌ Migration annulée : impossible de se connecter à Supabase');
    process.exit(1);
  }

  // Migration
  await migrateDevis();
  await migrateCandidatures();

  console.log('\n🎉 Migration terminée !\n');
  process.exit(0);
})();