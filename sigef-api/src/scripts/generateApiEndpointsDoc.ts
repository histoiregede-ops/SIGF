import fs from "fs";
import path from "path";

type Endpoint = {
  moduleName: string;
  method: string;
  path: string;
};

const SRC_DIR = path.resolve(__dirname, "..");
const ROUTES_FILE = path.join(SRC_DIR, "routes.ts");
const OUTPUT_FILE = path.resolve(__dirname, "..", "..", "API_ENDPOINTS_BY_MODULE.md");
const BASE_PREFIX = "/api/v1";

function normSlash(p: string): string {
  return p.replace(/\\/g, "/");
}

function ensureLeadingSlash(p: string): string {
  return p.startsWith("/") ? p : `/${p}`;
}

function joinUrl(...parts: string[]): string {
  const joined = parts
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => p.replace(/^\/+|\/+$/g, ""))
    .join("/");
  return `/${joined}`.replace(/\/+/g, "/");
}

function parseTopLevelRoutes(content: string): Array<{ prefix: string; importName: string }> {
  const regex = /\.use\(\s*['"`]([^'"`]+)['"`]\s*,\s*([A-Za-z0-9_]+)\s*\)/g;
  const out: Array<{ prefix: string; importName: string }> = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(content))) {
    out.push({ prefix: m[1], importName: m[2] });
  }
  return out;
}

function parseImports(content: string): Record<string, string> {
  const imports: Record<string, string> = {};
  const regex = /import\s+([A-Za-z0-9_]+)\s+from\s+['"`]([^'"`]+)['"`]/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(content))) {
    imports[m[1]] = m[2];
  }
  return imports;
}

function parseSubRouters(content: string): Array<{ prefix: string; routerName: string }> {
  const regex = /\.use\(\s*['"`]([^'"`]+)['"`]\s*,(?:\s*\[[^\]]*\]\s*,)?\s*([A-Za-z0-9_]+)\s*\)/g;
  const out: Array<{ prefix: string; routerName: string }> = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(content))) {
    out.push({ prefix: m[1], routerName: m[2] });
  }
  return out;
}

function parseRouterEndpoints(content: string): Array<{ method: string; subPath: string }> {
  const regex = /\.(get|post|put|patch|delete)\(\s*['"`]([^'"`]+)['"`]/gi;
  const out: Array<{ method: string; subPath: string }> = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(content))) {
    out.push({ method: m[1].toUpperCase(), subPath: m[2] });
  }
  return out;
}

function methodExample(method: string, endpoint: string): string {
  if (method === "GET") {
    return `\`\`\`json
{
  "request": {
    "method": "GET",
    "url": "${endpoint}"
  },
  "response": {
    "success": true,
    "data": []
  }
}
\`\`\``;
  }

  if (method === "DELETE") {
    return `\`\`\`json
{
  "request": {
    "method": "DELETE",
    "url": "${endpoint}"
  },
  "response": {
    "success": true,
    "message": "Suppression effectuee"
  }
}
\`\`\``;
  }

  return `\`\`\`json
{
  "request": {
    "method": "${method}",
    "url": "${endpoint}",
    "body": {
      "libelle": "Exemple realiste",
      "description": "Valeur de test",
      "actif": true
    }
  },
  "response": {
    "success": true,
    "data": {
      "id": 1
    }
  }
}
\`\`\``;
}

function readFileSafe(filePath: string): string | null {
  if (!fs.existsSync(filePath)) return null;
  const st = fs.statSync(filePath);
  if (!st.isFile()) return null;
  return fs.readFileSync(filePath, "utf8");
}

function resolveImport(baseFile: string, importPath: string): string {
  const baseDir = path.dirname(baseFile);
  const full = path.resolve(baseDir, importPath);
  if (fs.existsSync(full) && fs.statSync(full).isFile()) return full;
  if (fs.existsSync(full) && fs.statSync(full).isDirectory()) {
    const idx = path.join(full, "index.ts");
    if (fs.existsSync(idx)) return idx;
  }
  if (fs.existsSync(`${full}.ts`)) return `${full}.ts`;
  if (fs.existsSync(path.join(full, "index.ts"))) return path.join(full, "index.ts");
  return full;
}

function uniqueEndpoints(items: Endpoint[]): Endpoint[] {
  const seen = new Set<string>();
  const out: Endpoint[] = [];
  for (const e of items) {
    const key = `${e.method} ${e.path}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(e);
    }
  }
  return out;
}

function buildMarkdown(endpoints: Endpoint[]): string {
  const grouped = new Map<string, Endpoint[]>();
  for (const e of endpoints) {
    if (!grouped.has(e.moduleName)) grouped.set(e.moduleName, []);
    grouped.get(e.moduleName)!.push(e);
  }

  const lines: string[] = [];
  lines.push("# API Endpoints par Module");
  lines.push("");
  lines.push(`Base URL: \`${BASE_PREFIX}\``);
  lines.push("");

  for (const [moduleName, moduleEndpoints] of grouped.entries()) {
    lines.push(`## ${moduleName}`);
    lines.push("");
    const sorted = moduleEndpoints.sort((a, b) =>
      `${a.path} ${a.method}`.localeCompare(`${b.path} ${b.method}`)
    );
    for (const ep of sorted) {
      lines.push(`### ${ep.method} \`${ep.path}\``);
      lines.push("");
      lines.push(methodExample(ep.method, ep.path));
      lines.push("");
    }
  }

  return lines.join("\n");
}

function buildTitresFoncierEndpoints(filePath: string): Endpoint[] {
  const content = readFileSafe(filePath);
  if (!content) return [];
  const parsed = parseRouterEndpoints(content);
  return parsed.map((p) => ({
    moduleName: "titres-fonciers",
    method: p.method,
    path: joinUrl(BASE_PREFIX, "titres-fonciers", p.subPath),
  }));
}

async function main(): Promise<void> {
  const routesContent = readFileSafe(ROUTES_FILE);
  if (!routesContent) {
    throw new Error(`Missing routes file: ${ROUTES_FILE}`);
  }

  const imports = parseImports(routesContent);
  const topLevels = parseTopLevelRoutes(routesContent);
  const endpoints: Endpoint[] = [];

  for (const top of topLevels) {
    const moduleImport = imports[top.importName];
    if (!moduleImport) continue;

    const moduleFile = resolveImport(ROUTES_FILE, moduleImport);
    const moduleName = top.prefix.replace(/^\//, "");
    const moduleContent = readFileSafe(moduleFile);
    if (!moduleContent) continue;

    if (moduleName === "titres-fonciers") {
      endpoints.push(...buildTitresFoncierEndpoints(moduleFile));
      continue;
    }

    const moduleImports = parseImports(moduleContent);
    const subRouters = parseSubRouters(moduleContent);

    for (const sub of subRouters) {
      const routerImport = moduleImports[sub.routerName];
      if (!routerImport) continue;
      const routerFile = resolveImport(moduleFile, routerImport);
      const routerContent = readFileSafe(routerFile);
      if (!routerContent) continue;

      const routes = parseRouterEndpoints(routerContent);
      for (const route of routes) {
        endpoints.push({
          moduleName,
          method: route.method,
          path: joinUrl(BASE_PREFIX, top.prefix, sub.prefix, ensureLeadingSlash(route.subPath)),
        });
      }
    }
  }

  const dedup = uniqueEndpoints(endpoints);
  const markdown = buildMarkdown(dedup);
  await fs.promises.writeFile(OUTPUT_FILE, markdown, "utf8");
  console.log(`Generated ${dedup.length} endpoints in ${normSlash(path.relative(process.cwd(), OUTPUT_FILE))}`);
}

main().catch((error) => {
  console.error("Failed to generate API endpoints document:", error);
  process.exit(1);
});
