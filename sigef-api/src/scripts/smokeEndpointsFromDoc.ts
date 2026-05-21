import fs from "fs";
import path from "path";

type Endpoint = { method: string; path: string };
type Result = { method: string; path: string; status: "PASS" | "FAIL" | "SKIP"; code?: number; note?: string };

const DOC_PATH = path.resolve(__dirname, "..", "..", "API_ENDPOINTS_BY_MODULE.md");
const REPORT_MD_PATH = path.resolve(__dirname, "..", "..", "SMOKE_TEST_REPORT.md");
const REPORT_JSON_PATH = path.resolve(__dirname, "..", "..", "SMOKE_TEST_REPORT.json");
const BASE_URL = process.env.SMOKE_BASE_URL || "http://localhost:3000";
const ADMIN_ID = process.env.SMOKE_ADMIN_IDENTIFIANT || "admin";
const ADMIN_PASSWORD = process.env.SMOKE_ADMIN_PASSWORD || "test12348";

function parseEndpoints(docContent: string): Endpoint[] {
  const matches = [...docContent.matchAll(/^###\s+(GET|POST|PUT|PATCH|DELETE)\s+`([^`]+)`/gm)];
  return matches.map((m) => ({ method: m[1], path: m[2] }));
}

function needsAuth(endpointPath: string): boolean {
  return !endpointPath.includes("/api/v1/auth/login") && !endpointPath.endsWith("/api/v1") && !endpointPath.includes("/test-regions");
}

function bodyFor(pathname: string): Record<string, unknown> {
  if (pathname.includes("/regions")) return { libelle: `Smoke Region ${Date.now()}`, sigle: `S${Math.floor(Math.random() * 900 + 100)}`, description: "Smoke test" };
  if (pathname.includes("/auth/register")) return { nom: "Smoke", prenoms: "User", identifiant: `smoke${Date.now()}`, email: `smoke${Date.now()}@sigef.local`, motDePasse: "Smoke@123", contact: "+22890000000" };
  return { libelle: "Smoke test", description: "Smoke test data", actif: true };
}

async function main(): Promise<void> {
  if (!fs.existsSync(DOC_PATH)) {
    throw new Error(`Missing endpoint doc: ${DOC_PATH}`);
  }

  const content = await fs.promises.readFile(DOC_PATH, "utf8");
  const endpoints = parseEndpoints(content);
  const results: Result[] = [];

  // Login once for protected endpoints
  let token = "";
  try {
    const loginRes = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifiant: ADMIN_ID, motDePasse: ADMIN_PASSWORD }),
    });
    const loginBody = await loginRes.json();
    token = loginBody.token || "";
    results.push({ method: "POST", path: "/api/v1/auth/login", status: loginRes.ok ? "PASS" : "FAIL", code: loginRes.status });
  } catch (error) {
    results.push({ method: "POST", path: "/api/v1/auth/login", status: "FAIL", note: String(error) });
  }

  const tested = new Set<string>();
  for (const endpoint of endpoints) {
    const key = `${endpoint.method} ${endpoint.path}`;
    if (tested.has(key)) continue;
    tested.add(key);

    if (endpoint.path.includes("/:")) {
      results.push({ ...endpoint, status: "SKIP", note: "Dynamic path placeholder" });
      continue;
    }

    if (endpoint.method !== "GET") {
      results.push({ ...endpoint, status: "SKIP", note: "Skipped in safe smoke mode (non-GET)" });
      continue;
    }

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (needsAuth(endpoint.path) && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${BASE_URL}${endpoint.path}`, { method: endpoint.method, headers });
      const ok = response.status < 500;
      results.push({ ...endpoint, status: ok ? "PASS" : "FAIL", code: response.status });
    } catch (error) {
      results.push({ ...endpoint, status: "FAIL", note: String(error) });
    }
  }

  const pass = results.filter((r) => r.status === "PASS").length;
  const fail = results.filter((r) => r.status === "FAIL").length;
  const skip = results.filter((r) => r.status === "SKIP").length;

  const md = [
    "# Smoke Test Report",
    "",
    `Base URL: \`${BASE_URL}\``,
    "",
    `- PASS: ${pass}`,
    `- FAIL: ${fail}`,
    `- SKIP: ${skip}`,
    "",
    "## Details",
    "",
    ...results.map((r) => `- [${r.status}] \`${r.method} ${r.path}\`${r.code ? ` -> ${r.code}` : ""}${r.note ? ` (${r.note})` : ""}`),
    "",
  ].join("\n");

  await fs.promises.writeFile(REPORT_MD_PATH, md, "utf8");
  await fs.promises.writeFile(REPORT_JSON_PATH, JSON.stringify(results, null, 2), "utf8");

  console.log(`Smoke report generated: ${path.basename(REPORT_MD_PATH)} (PASS=${pass}, FAIL=${fail}, SKIP=${skip})`);
  if (fail > 0) process.exit(1);
}

main().catch((error) => {
  console.error("Smoke test failed:", error);
  process.exit(1);
});
