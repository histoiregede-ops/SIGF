import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";
import { QueryTypes } from "sequelize";
import { DatabaseConnection } from "../core/helpers/DatabaseConnection";

type TableRow = { tableName: string };

const rootDir = path.resolve(__dirname, "..", "..");
const dumpFiles = ["data_dump.sql", "data-dump1.sql"];

function quoteIdent(identifier: string): string {
  return `\`${identifier.replace(/`/g, "``")}\``;
}

async function listTables(databaseName: string): Promise<string[]> {
  const sequelize = DatabaseConnection.getInstance().sequelize;
  const rows = (await sequelize.query(
    `
      SELECT table_name AS tableName
      FROM information_schema.tables
      WHERE table_schema = :databaseName
      ORDER BY table_name
    `,
    { replacements: { databaseName }, type: QueryTypes.SELECT }
  )) as TableRow[];
  return rows.map((r) => r.tableName).filter((t) => t.toLowerCase() !== "sequelizemeta");
}

async function truncateAllTables(databaseName: string): Promise<void> {
  const sequelize = DatabaseConnection.getInstance().sequelize;
  const tables = await listTables(databaseName);
  if (!tables.length) {
    console.log("No tables found to truncate.");
    return;
  }

  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
  try {
    for (const table of tables) {
      await sequelize.query(`TRUNCATE TABLE ${quoteIdent(table)};`);
    }
  } finally {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  }

  console.log(`Truncated ${tables.length} table(s).`);
}

async function importDump(connection: mysql.Connection, absolutePath: string): Promise<void> {
  if (!fs.existsSync(absolutePath)) {
    console.warn(`Dump not found, skipped: ${absolutePath}`);
    return;
  }

  const sql = await fs.promises.readFile(absolutePath, "utf8");
  if (!sql.trim()) {
    console.warn(`Dump is empty, skipped: ${absolutePath}`);
    return;
  }

  console.log(`Importing ${path.basename(absolutePath)}...`);
  await connection.query(sql);
  console.log(`Imported ${path.basename(absolutePath)}.`);
}

async function main(): Promise<void> {
  const env = process.env.NODE_ENV || "development";
  const config = require("../core/config/database.json")[env];
  if (!config?.database) {
    throw new Error(`Database configuration missing for environment: ${env}`);
  }

  const db = DatabaseConnection.getInstance();
  await db.init();

  await truncateAllTables(config.database);

  const connection = await mysql.createConnection({
    host: config.options.host,
    port: config.options.port,
    user: config.username,
    password: config.password,
    database: config.database,
    charset: "utf8mb4",
    multipleStatements: true,
  });

  try {
    await connection.query("SET FOREIGN_KEY_CHECKS = 0;");
    for (const dumpFile of dumpFiles) {
      await importDump(connection, path.join(rootDir, dumpFile));
    }
  } finally {
    await connection.query("SET FOREIGN_KEY_CHECKS = 1;");
    await connection.end();
  }

  console.log("Dump-based seed completed successfully.");
}

main().catch((error) => {
  console.error("Dump-based seed failed:", error);
  process.exit(1);
});
