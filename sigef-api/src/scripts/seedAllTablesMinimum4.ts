import { QueryTypes } from "sequelize";
import { DatabaseConnection } from "../core/helpers/DatabaseConnection";

type TableRow = { tableName: string };
type ColumnRow = {
  columnName: string;
  dataType: string;
  columnType: string;
  isNullable: "YES" | "NO";
  columnDefault: string | null;
  extra: string;
  columnKey: string;
};
type ForeignKeyRow = {
  columnName: string;
  referencedTableName: string;
  referencedColumnName: string;
};

const TARGET_MIN_ROWS = 4;
const MAX_PASSES = 12;
const SYSTEM_TABLES = new Set(["SequelizeMeta", "sequelize_meta"]);

function isAuditColumn(columnName: string): boolean {
  return ["createdAt", "updatedAt", "deletedAt"].includes(columnName);
}

function quoteIdent(identifier: string): string {
  return `\`${identifier.replace(/`/g, "``")}\``;
}

function parseEnumValues(columnType: string): string[] {
  const m = columnType.match(/^enum\((.*)\)$/i);
  if (!m?.[1]) return [];
  return m[1]
    .split(",")
    .map((v) => v.trim().replace(/^'/, "").replace(/'$/, "").replace(/\\'/g, "'"));
}

function buildScalarValue(
  tableName: string,
  column: ColumnRow,
  rowIndex: number
): unknown {
  const columnLower = column.columnName.toLowerCase();
  const dt = column.dataType.toLowerCase();
  const enumValues = parseEnumValues(column.columnType);

  if (isAuditColumn(column.columnName)) {
    return new Date();
  }

  if (enumValues.length) {
    return enumValues[rowIndex % enumValues.length];
  }

  if (dt.includes("int")) return rowIndex + 1;
  if (dt === "bigint") return rowIndex + 1;
  if (dt === "decimal" || dt === "float" || dt === "double") return rowIndex + 0.5;
  if (dt === "tinyint" && column.columnType === "tinyint(1)") return 1;
  if (dt === "bit") return 1;
  if (dt === "boolean") return 1;
  if (dt === "date") return new Date();
  if (dt === "datetime" || dt === "timestamp") return new Date();
  if (dt === "time") return "12:00:00";
  if (dt === "year") return "2026";
  if (dt === "json") return "{}";

  if (dt === "char" || dt === "varchar" || dt.includes("text")) {
    if (columnLower.includes("email")) return `contact${rowIndex + 1}@sigef.local`;
    if (columnLower.includes("phone") || columnLower.includes("contact")) return `+228900000${rowIndex + 1}`;
    if (columnLower.includes("password") || columnLower.includes("motdepasse")) return "Admin@123";
    if (columnLower.includes("nom")) {
      const noms = ["Koffi", "Mensah", "Tchalla", "Lawson", "Akakpo", "Amouzou"];
      return noms[rowIndex % noms.length];
    }
    if (columnLower.includes("prenom")) {
      const prenoms = ["Ayao", "Afi", "Komi", "Mariam", "Yao", "Essi"];
      return prenoms[rowIndex % prenoms.length];
    }
    if (columnLower.includes("libelle") || columnLower.includes("titre")) {
      const labels = ["Principal", "Secondaire", "Urgent", "Standard", "Archive"];
      return `${labels[rowIndex % labels.length]} ${rowIndex + 1}`;
    }
    if (columnLower.includes("adresse")) {
      return `${10 + rowIndex} Rue des Palmiers, Lome`;
    }
    if (columnLower.includes("ville")) {
      const villes = ["Lome", "Kara", "Sokode", "Atakpame", "Dapaong"];
      return villes[rowIndex % villes.length];
    }
    if (columnLower.includes("region")) {
      const regions = ["Maritime", "Plateaux", "Centrale", "Kara", "Savanes"];
      return regions[rowIndex % regions.length];
    }
    if (columnLower.includes("sigle")) {
      const sigles = ["MAR", "PLA", "CEN", "KAR", "SAV", "ADM", "IDX", "CTL"];
      return sigles[rowIndex % sigles.length];
    }
    if (columnLower.includes("description")) {
      return `Donnee de reference ${tableName} ${rowIndex + 1}`;
    }
    return `Valeur ${rowIndex + 1}`;
  }

  return `${tableName}_${column.columnName}_${rowIndex}`;
}

async function getTables(databaseName: string): Promise<string[]> {
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

  return rows.map((r) => r.tableName).filter((t) => !SYSTEM_TABLES.has(t));
}

async function getColumns(databaseName: string, tableName: string): Promise<ColumnRow[]> {
  const sequelize = DatabaseConnection.getInstance().sequelize;
  return (await sequelize.query(
    `
      SELECT
        column_name AS columnName,
        data_type AS dataType,
        column_type AS columnType,
        is_nullable AS isNullable,
        column_default AS columnDefault,
        extra AS extra,
        column_key AS columnKey
      FROM information_schema.columns
      WHERE table_schema = :databaseName
        AND table_name = :tableName
      ORDER BY ordinal_position
    `,
    { replacements: { databaseName, tableName }, type: QueryTypes.SELECT }
  )) as ColumnRow[];
}

async function getForeignKeys(databaseName: string, tableName: string): Promise<ForeignKeyRow[]> {
  const sequelize = DatabaseConnection.getInstance().sequelize;
  return (await sequelize.query(
    `
      SELECT
        kcu.column_name AS columnName,
        kcu.referenced_table_name AS referencedTableName,
        kcu.referenced_column_name AS referencedColumnName
      FROM information_schema.key_column_usage kcu
      WHERE kcu.table_schema = :databaseName
        AND kcu.table_name = :tableName
        AND kcu.referenced_table_name IS NOT NULL
    `,
    { replacements: { databaseName, tableName }, type: QueryTypes.SELECT }
  )) as ForeignKeyRow[];
}

async function getRowCount(tableName: string): Promise<number> {
  const sequelize = DatabaseConnection.getInstance().sequelize;
  const rows = (await sequelize.query(
    `SELECT COUNT(*) AS c FROM ${quoteIdent(tableName)}`,
    { type: QueryTypes.SELECT }
  )) as Array<{ c: number }>;
  return Number(rows[0]?.c ?? 0);
}

async function getReferencedValue(
  referencedTableName: string,
  referencedColumnName: string,
  rowIndex: number
): Promise<unknown> {
  const sequelize = DatabaseConnection.getInstance().sequelize;
  const rows = (await sequelize.query(
    `
      SELECT ${quoteIdent(referencedColumnName)} AS ref
      FROM ${quoteIdent(referencedTableName)}
      ORDER BY 1
      LIMIT 1 OFFSET :off
    `,
    {
      replacements: { off: rowIndex % TARGET_MIN_ROWS },
      type: QueryTypes.SELECT,
    }
  )) as Array<{ ref: unknown }>;

  if (rows.length && rows[0].ref !== null && rows[0].ref !== undefined) {
    return rows[0].ref;
  }

  const fallback = (await sequelize.query(
    `
      SELECT ${quoteIdent(referencedColumnName)} AS ref
      FROM ${quoteIdent(referencedTableName)}
      LIMIT 1
    `,
    { type: QueryTypes.SELECT }
  )) as Array<{ ref: unknown }>;

  return fallback[0]?.ref;
}

async function insertOneRow(
  tableName: string,
  columns: ColumnRow[],
  foreignKeys: ForeignKeyRow[],
  rowIndex: number
): Promise<void> {
  const sequelize = DatabaseConnection.getInstance().sequelize;
  const fkByColumn = new Map(foreignKeys.map((f) => [f.columnName, f]));

  const insertColumns: string[] = [];
  const values: unknown[] = [];

  for (const column of columns) {
    const colName = column.columnName;
    const nullable = column.isNullable === "YES";
    const hasDefault = column.columnDefault !== null;
    const isAutoIncrement = column.extra.toLowerCase().includes("auto_increment");
    const isGenerated = column.extra.toLowerCase().includes("generated");

    if (isGenerated || isAutoIncrement) {
      continue;
    }

    if (isAuditColumn(colName)) {
      insertColumns.push(colName);
      values.push(new Date());
      continue;
    }

    const fk = fkByColumn.get(colName);
    if (fk) {
      const refValue = await getReferencedValue(
        fk.referencedTableName,
        fk.referencedColumnName,
        rowIndex
      );
      if (refValue === undefined || refValue === null) {
        if (nullable || hasDefault) {
          continue;
        }
        throw new Error(
          `FK dependency not ready for ${tableName}.${colName} -> ${fk.referencedTableName}.${fk.referencedColumnName}`
        );
      }
      insertColumns.push(colName);
      values.push(refValue);
      continue;
    }

    if (nullable && hasDefault) {
      continue;
    }

    if (nullable && !column.columnKey) {
      continue;
    }

    insertColumns.push(colName);
    values.push(buildScalarValue(tableName, column, rowIndex));
  }

  if (!insertColumns.length) {
    await sequelize.query(`INSERT INTO ${quoteIdent(tableName)} () VALUES ()`);
    return;
  }

  const placeholders = insertColumns.map(() => "?").join(", ");
  const sql = `INSERT INTO ${quoteIdent(tableName)} (${insertColumns
    .map(quoteIdent)
    .join(", ")}) VALUES (${placeholders})`;
  await sequelize.query(sql, { replacements: values });
}

async function ensureTableMinimumRows(databaseName: string, tableName: string): Promise<void> {
  const columns = await getColumns(databaseName, tableName);
  const foreignKeys = await getForeignKeys(databaseName, tableName);

  let count = await getRowCount(tableName);
  const missing = TARGET_MIN_ROWS - count;
  if (missing <= 0) return;

  for (let i = 0; i < missing; i += 1) {
    await insertOneRow(tableName, columns, foreignKeys, count + i);
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

  const tables = await getTables(config.database);
  const done = new Set<string>();
  const failed = new Map<string, string>();

  for (let pass = 1; pass <= MAX_PASSES; pass += 1) {
    let progress = false;

    for (const tableName of tables) {
      if (done.has(tableName)) continue;

      try {
        await ensureTableMinimumRows(config.database, tableName);
        const count = await getRowCount(tableName);
        if (count >= TARGET_MIN_ROWS) {
          done.add(tableName);
          failed.delete(tableName);
          progress = true;
        } else {
          failed.set(tableName, `Only ${count}/${TARGET_MIN_ROWS} rows`);
        }
      } catch (error) {
        failed.set(tableName, error instanceof Error ? error.message : String(error));
      }
    }

    if (done.size === tables.length || !progress) {
      break;
    }
  }

  console.log(`Tables targeted: ${tables.length}`);
  console.log(`Tables seeded with >= ${TARGET_MIN_ROWS} rows: ${done.size}`);

  if (failed.size) {
    console.log("Tables still failing:");
    for (const [table, reason] of failed.entries()) {
      console.log(`- ${table}: ${reason}`);
    }
  }

  if (done.size !== tables.length) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Global minimum seed failed:", error);
  process.exit(1);
});
