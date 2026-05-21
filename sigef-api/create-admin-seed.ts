import * as bcrypt from 'bcryptjs';
import { DatabaseConnection } from "./src/core/helpers/DatabaseConnection";
// Importation directe des entités TypeORM
import { Utilisateur } from "./src/modules/auth/models/Utilisateur";
import { Profil } from "./src/modules/auth/models/Profil";
import { CentreConservationFonciere } from "./src/modules/auth/models/CentreConservationFonciere";
import { Region } from "./src/modules/commun/models/Region";
import { Periode } from "./src/modules/commun/models/Periode";

async function createAdmin() {
  const dbConnection = DatabaseConnection.getInstance();
  await dbConnection.init();

  // Create dependencies safely
  let periodeDefault = await Periode.findOne({ where: { libelle: 'Période par défaut' } });
  if (!periodeDefault) {
    periodeDefault = await Periode.create({ libelle: 'Période par défaut' });
  }

  // Utilisation de 'libelle' (propriété) au lieu de 'titre' (colonne DB)
  let profilAdmin = await Profil.findOne({ where: { libelle: 'Administrateur' } });
  if (!profilAdmin) {
    profilAdmin = await Profil.create({ libelle: 'Administrateur', description: 'Super admin' });
  }

  let regionDefault = await Region.findOne({ where: { libelle: 'Région par défaut' } });
  if (!regionDefault) {
    regionDefault = await Region.create({
      libelle: 'Région par défaut',
      sigle: 'DEF',
      periodeId: periodeDefault.id,
      actuelle: true
    });
  }

  let centreDefault = await CentreConservationFonciere.findOne({ where: { libelle: 'Centre par défaut' } });
  if (!centreDefault) {
    centreDefault = await CentreConservationFonciere.create({
      libelle: 'Centre par défaut',
      adresse: 'Centre conservation foncière par défaut',
      regionId: regionDefault.id
    });
  }

  const identifiant = "admin";
  const email = "admin@sigef.com";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || "test12348";
  const hashed = bcrypt.hashSync(adminPassword, 10);

  let adminUser = await Utilisateur.findOne({ where: { identifiant } });
  if (!adminUser) {
    adminUser = await Utilisateur.create({
      nom: "Admin",
      prenoms: "SIGEF",
      identifiant: identifiant,
      email,
      motDePasse: hashed,
      contact: "+22899999999",
      actif: true,
      profilId: profilAdmin.id,
      centreConservationFonciereId: centreDefault.id
    });
  }

  console.log(`Admin ${adminUser ? 'OK' : 'Créé'}: ${identifiant}/${email}/${adminPassword}`);
  process.exit(0);
}

createAdmin().catch(console.error);
