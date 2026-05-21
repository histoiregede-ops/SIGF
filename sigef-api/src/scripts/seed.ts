import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { DatabaseConnection } from '../core/helpers/DatabaseConnection';
import { TypesRegistre } from '../core/enums/TypesRegistre';

const rootDir = path.resolve(__dirname, '..', '..');
const sqlDumpPath = path.join(rootDir, 'data_dump.sql');

async function importSqlDump(config: any): Promise<void> {
  if (!fs.existsSync(sqlDumpPath)) {
    console.warn(`SQL dump not found: ${sqlDumpPath}`);
    return;
  }

  const sql = await fs.promises.readFile(sqlDumpPath, 'utf8');
  const connection = await mysql.createConnection({
    host: config.options.host,
    port: config.options.port,
    user: config.username,
    password: config.password,
    database: config.database,
    multipleStatements: true,
  });

  try {
    console.log('Importing SQL dump...');
    await connection.query(sql);
    console.log('SQL dump imported successfully.');
  } finally {
    await connection.end();
  }
}

async function seedTypeRegistres(): Promise<void> {
  const TypeRegistreModule = require('../modules/commun/models/TypeRegistre');
  const TypeRegistre = TypeRegistreModule.TypeRegistre;
  const typesRegistres = [
    { id: TypesRegistre.FORMALITES_PREALABLES, abbreviation: 'FP', libelle: 'Formalités préalables' },
    { id: TypesRegistre.OPPOSITIONS, abbreviation: 'OPP', libelle: 'Oppositions' },
    { id: TypesRegistre.DEPOTS, abbreviation: 'DPT', libelle: 'Dépôts' },
    { id: TypesRegistre.TITRES_FONCIERS, abbreviation: 'LF', libelle: 'Titres fonciers' },
    { id: TypesRegistre.ACTES, abbreviation: 'ACT', libelle: 'Actes' },
  ];

  for (const type of typesRegistres) {
    const [record, created] = await TypeRegistre.findOrCreate({
      where: { id: type.id },
      defaults: type
    });
    console.log(`TypeRegistre ${type.id}: ${created ? 'created' : 'already exists'}`);
  }
  console.log('Seeding TypeRegistres completed.');
}

async function seedSampleDossiers(): Promise<void> {
  const DossierModule = require('../modules/indexation/models/Dossier');
  const Dossier = DossierModule.Dossier;
  
  const typeIds = [
    TypesRegistre.FORMALITES_PREALABLES,
    TypesRegistre.DEPOTS, 
    TypesRegistre.TITRES_FONCIERS,
    TypesRegistre.OPPOSITIONS
  ];
  
  for (const typeId of typeIds) {
    for (let i = 1; i <= 10; i++) {
      const [dossier, created] = await Dossier.findOrCreate({
        where: { nom: `Sample ${typeId.charAt(0).toUpperCase() + typeId.slice(1)} Dossier ${i}` },
        defaults: {
          nom: `Sample ${typeId.charAt(0).toUpperCase() + typeId.slice(1)} Dossier ${i}`,
          typeRegistreId: typeId,
          description: `Sample description for ${typeId} dossier ${i}`
        }
      });
      console.log(`Dossier for ${typeId} #${i}: ${created ? 'created' : 'already exists'}`);
    }
  }
  console.log('✅ 10 Sample Dossiers par type (FP/OPP/DPT/LF) seeded successfully.');
}

async function seedAdmin(): Promise<void> {
  const UtilisateurModule = require('../modules/auth/models/Utilisateur');
  const ProfilModule = require('../modules/auth/models/Profil');
  const Utilisateur = UtilisateurModule.Utilisateur;
  const Profil = ProfilModule.Profil;
  const bcrypt = require('bcrypt');

  const adminData = {
    email: 'admin@sigef.com',
    identifiant: 'admin@sigef.com',
    nom: 'Administrateur',
    prenoms: 'SIGEF',
    motDePasse: bcrypt.hashSync('Admin123!', 10),
    actif: true
  };

  // Find or create admin profile
  const [profil, profilCreated] = await Profil.findOrCreate({
    where: { titre: 'Administrateur' },
    defaults: { titre: 'Administrateur', description: 'Profil administrateur' }
  });
  console.log(`Profil Administrateur: ${profilCreated ? 'created' : 'already exists'}`);

  // Find or create admin user
  const [user, userCreated] = await Utilisateur.findOrCreate({
    where: { email: adminData.email },
    defaults: { ...adminData, profilId: profil.id }
  });
  if (!userCreated) {
    // Update password if user exists but password is not hashed
    user.motDePasse = adminData.motDePasse;
    await user.save();
    console.log(`Utilisateur admin: updated password`);
  } else {
    console.log(`Utilisateur admin: created`);
  }
}

async function main(): Promise<void> {
  const env = process.env.NODE_ENV || 'development';
  const config = require('../core/config/database.json')[env];

  if (!config || !config.database) {
    throw new Error(`Database configuration missing for environment: ${env}`);
  }

  const db = DatabaseConnection.getInstance();
  await db.init();

  console.log('Seeding TypeRegistres...');
  await seedTypeRegistres();
  
  console.log('Seeding admin user...');
  await seedAdmin();
  
  console.log('Seeding sample Dossiers...');
  await seedSampleDossiers();
  
  if (fs.existsSync(sqlDumpPath)) {
    console.log('Importing SQL dump...');
    await importSqlDump(config);
  }
}

main().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});

