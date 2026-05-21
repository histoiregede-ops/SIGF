import fs from "fs";
import path from "path";
import { QueryTypes } from "sequelize";
import { DatabaseConnection } from "../core/helpers/DatabaseConnection";

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

async function dropAllTables(databaseName: string): Promise<void> {
  const sequelize = DatabaseConnection.getInstance().sequelize;

  const tables = (await sequelize.query(
    `
      SELECT table_name AS tableName
      FROM information_schema.tables
      WHERE table_schema = :databaseName
    `,
    {
      replacements: { databaseName },
      type: QueryTypes.SELECT,
    }
  )) as Array<{ tableName: string }>;

  if (!tables.length) {
    console.log("No existing tables to drop.");
    return;
  }

  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
  try {
    for (const { tableName } of tables) {
      await sequelize.query(`DROP TABLE IF EXISTS \`${tableName}\`;`);
    }
  } finally {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  }

  console.log(`Dropped ${tables.length} table(s).`);
}

async function verifyTables(databaseName: string): Promise<void> {
  const sequelize = DatabaseConnection.getInstance().sequelize;
  const tables = (await sequelize.query(
    `
      SELECT table_name AS tableName
      FROM information_schema.tables
      WHERE table_schema = :databaseName
      ORDER BY table_name
    `,
    {
      replacements: { databaseName },
      type: QueryTypes.SELECT,
    }
  )) as Array<{ tableName: string }>;

  console.log(`Migration finished. ${tables.length} table(s) present.`);
  if (!tables.length) {
    throw new Error("Verification failed: no tables were created.");
  }
}

async function main(): Promise<void> {
  const env = process.env.NODE_ENV || "development";
  const config = require("../core/config/database.json")[env];

  if (!config?.database) {
    throw new Error(`Database configuration missing for environment: ${env}`);
  }

  const db = DatabaseConnection.getInstance();
  await db.init();

  console.log(`Connected to database "${config.database}" (${env}).`);
  console.log("Resetting database (drop all tables)...");
  await dropAllTables(config.database);

  console.log("Loading models and associations...");
  await loadModelsAndAssociations();

  console.log("Running full schema creation with sequelize.sync()...");
  await db.sequelize.sync({ force: false });

  await verifyTables(config.database);
  console.log("Database reset + migration completed successfully.");
}

main().catch((error) => {
  console.error("Reset/migration failed:", error);
  process.exit(1);
});
