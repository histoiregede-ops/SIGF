import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { DatabaseConnection } from "../core/helpers/DatabaseConnection";
import { TypesRegistre } from "../core/enums/TypesRegistre";

const modulesDir = path.resolve(__dirname, "../modules");

async function loadModelsAndAssociations(): Promise<void> {
  const modules = await fs.promises.readdir(modulesDir, { withFileTypes: true });

  for (const moduleEntry of modules) {
    if (!moduleEntry.isDirectory()) {
      continue;
    }

    const modulePath = path.join(modulesDir, moduleEntry.name);
    const modelsDir = path.join(modulePath, "models");

    if (fs.existsSync(modelsDir)) {
      const modelFiles = await fs.promises.readdir(modelsDir);
      for (const modelFile of modelFiles) {
        if (!modelFile.endsWith(".ts") && !modelFile.endsWith(".js")) {
          continue;
        }
        require(path.join(modelsDir, modelFile));
      }
    }

    const associationsPathTs = path.join(modelsDir, "_associations.ts");
    const associationsPathJs = path.join(modelsDir, "_associations.js");

    if (fs.existsSync(associationsPathTs)) {
      require(associationsPathTs);
    } else if (fs.existsSync(associationsPathJs)) {
      require(associationsPathJs);
    }
  }
}

async function seedTypeRegistres(): Promise<void> {
  const { TypeRegistre } = require("../modules/commun/models/TypeRegistre");
  const rows = [
    { id: TypesRegistre.FORMALITES_PREALABLES, abbreviation: "FP", libelle: "Formalites prealables" },
    { id: TypesRegistre.OPPOSITIONS, abbreviation: "OPP", libelle: "Oppositions" },
    { id: TypesRegistre.DEPOTS, abbreviation: "DEP", libelle: "Depots" },
    { id: TypesRegistre.TITRES_FONCIERS, abbreviation: "TF", libelle: "Titres fonciers" },
  ];

  for (const row of rows) {
    await TypeRegistre.findOrCreate({
      where: { id: row.id },
      defaults: row,
    });
  }
}

async function seedGeoBase(): Promise<void> {
  const { Periode } = require("../modules/commun/models/Periode");
  const { Region } = require("../modules/commun/models/Region");

  const [periode] = await Periode.findOrCreate({
    where: { libelle: "Actuelle" },
    defaults: { libelle: "Actuelle", sigle: "AC", description: "Periode active" },
  });

  const regions = [
    { libelle: "Maritime", sigle: "MAR" },
    { libelle: "Plateaux", sigle: "PLA" },
    { libelle: "Centrale", sigle: "CEN" },
    { libelle: "Kara", sigle: "KAR" },
    { libelle: "Savanes", sigle: "SAV" },
  ];

  for (const region of regions) {
    const [existing] = await Region.findOrCreate({
      where: { libelle: region.libelle },
      defaults: {
        ...region,
        description: `Region ${region.libelle}`,
        actuelle: true,
        periodeId: periode.id,
      },
    });

    if (!existing.periodeId) {
      await existing.update({ periodeId: periode.id, actuelle: true });
    }
  }
}

async function seedQualitesDocument(): Promise<void> {
  const { QualiteDocument } = require("../modules/commun/models/QualiteDocument");
  const rows = [
    { libelle: "BONNE", description: null, aSignaler: false },
    { libelle: "ILLISIBLE", description: null, aSignaler: true },
    { libelle: "MAUVAISE", description: "Pour les documents dégradés", aSignaler: true },
  ];

  for (const row of rows) {
    await QualiteDocument.findOrCreate({
      where: { libelle: row.libelle },
      defaults: row,
    });
  }
}

async function seedAuthBase(): Promise<void> {
  const { Role } = require("../modules/auth/models/Role");
  const { Profil } = require("../modules/auth/models/Profil");
  const { RoleProfil } = require("../modules/auth/models/RoleProfil");
  const { Utilisateur } = require("../modules/auth/models/Utilisateur");
  const { CentreConservationFonciere } = require("../modules/auth/models/CentreConservationFonciere");
  const { Region } = require("../modules/commun/models/Region");

  const roleIds = [
    { id: "ADMIN", description: "Administrateur applicatif" },
    { id: "INDEXEUR", description: "Indexation de dossiers" },
    { id: "CONTROLEUR", description: "Controle et validation" },
  ];
  for (const role of roleIds) {
    await Role.findOrCreate({ where: { id: role.id }, defaults: role });
  }

  const [profilAdmin] = await Profil.findOrCreate({
    where: { titre: "Administrateur" },
    defaults: { titre: "Administrateur", description: "Profil admin" },
  });

  await RoleProfil.findOrCreate({
    where: { profilId: profilAdmin.id, roleId: "ADMIN" },
    defaults: { actif: true },
  });

  const defaultRegion = await Region.findOne({ order: [["id", "ASC"]] });
  const [centre] = await CentreConservationFonciere.findOrCreate({
    where: { nom: "Centre principal" },
    defaults: {
      nom: "Centre principal",
      description: "Centre par defaut",
      regionId: defaultRegion?.id ?? null,
    },
  });

  const adminIdentifiant = process.env.SEED_ADMIN_IDENTIFIANT || "admin";
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@sigef.local";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "Admin@123";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const [admin] = await Utilisateur.findOrCreate({
    where: { identifiant: adminIdentifiant },
    defaults: {
      nom: "Super",
      prenoms: "Admin",
      identifiant: adminIdentifiant,
      email: adminEmail,
      motDePasse: hashedPassword,
      contact: "+22800000000",
      actif: true,
      profilId: profilAdmin.id,
      centreConservationFonciereId: centre.id,
    },
  });

  if (!admin.profilId || !admin.centreConservationFonciereId) {
    await admin.update({
      profilId: profilAdmin.id,
      centreConservationFonciereId: centre.id,
    });
  }
}

async function main(): Promise<void> {
  const db = DatabaseConnection.getInstance();
  await db.init();

  await loadModelsAndAssociations();

  const { ensureReferenceData } = require("../core/helpers/ensureReferenceData");
  await ensureReferenceData();
  await seedAuthBase();

  console.log("Safe seed completed successfully.");
}

main().catch((error) => {
  console.error("Safe seed failed:", error);
  process.exit(1);
});
