import fs from "fs";
import path from "path";

type Endpoint = { method: string; path: string };
type Result = {
  method: string;
  path: string;
  status: "PASS" | "FAIL" | "SKIP";
  code?: number;
  note?: string;
};

const DOC_PATH = path.resolve(__dirname, "..", "API_ENDPOINTS_BY_MODULE.md");
const REPORT_MD_PATH = path.resolve(__dirname, "..", "SMOKE_TEST_REPORT_ADVANCED.md");
const REPORT_JSON_PATH = path.resolve(__dirname, "..", "SMOKE_TEST_REPORT_ADVANCED.json");

const BASE_URL = process.env.SMOKE_BASE_URL || "http://localhost:3000";
const ADMIN_ID = process.env.SMOKE_ADMIN_IDENTIFIANT || "admin";
const ADMIN_PASSWORD = process.env.SMOKE_ADMIN_PASSWORD || "test12348";

function parseEndpoints(docContent: string): Endpoint[] {
  const matches = [...docContent.matchAll(/^###\s+(GET|POST|PUT|PATCH|DELETE)\s+`([^`]+)`/gm)];
  return matches.map((m) => ({ method: m[1], path: m[2] }));
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

function isPublicPath(p: string): boolean {
  return (
    p === "/api/v1" ||
    p.includes("/api/v1/test-regions") ||
    p.includes("/api/v1/auth/login") ||
    p.includes("/api/v1/auth/register") ||
    p.includes("/api/v1/auth/confirm") ||
    p.includes("/api/v1/auth/send-password-reset-link")
  );
}

function bodyFor(pathname: string): Record<string, unknown> {
  const n = Date.now();
  if (pathname.includes("/auth/centresConservationFonciere")) {
    return {
      nom: `Centre ${n}`,
      description: "Centre de test",
      regionId: 1,
    };
  }
  if (pathname.includes("/auth/profils")) {
    return {
      titre: `Profil ${n}`,
      description: "Profil de test",
    };
  }
  if (pathname.includes("/auth/utilisateurs")) {
    return {
      matricule: `MAT${n}`,
      nom: "User",
      prenoms: "Test",
      identifiant: `user${n}`,
      email: `user${n}@sigef.local`,
      motDePasse: "User@123456",
      contact: "+22890000002",
      profilId: 1,
      centreConservationFonciereId: 1,
    };
  }
  if (pathname.includes("/auth/indexeurs") || pathname.includes("/auth/controleurs")) {
    return {
      nom: "Agent",
      prenoms: "Test",
      identifiant: `agent${n}`,
      email: `agent${n}@sigef.local`,
      motDePasse: "Agent@123456",
      contact: "+22890000003",
      profilId: 1,
      centreConservationFonciereId: 1,
    };
  }
  if (pathname.includes("/auth/roles")) {
    return {
      id: `ROLE_${n}`,
      description: "Role de test",
    };
  }
  if (pathname.includes("/regions")) {
    return {
      libelle: `Region Advanced ${n}`,
      sigle: `A${Math.floor(Math.random() * 900 + 100)}`,
      description: "Advanced smoke region",
      actuelle: true,
    };
  }
  if (pathname.includes("/auth/register")) {
    return {
      nom: "Advanced",
      prenoms: "Smoke",
      identifiant: `adv${n}`,
      email: `adv${n}@sigef.local`,
      motDePasse: "Adv@123456",
      contact: "+22890000001",
    };
  }
  return {
    libelle: `Advanced ${n}`,
    description: "Advanced smoke payload",
    actif: true,
  };
}

function splitPath(pathname: string): string[] {
  return pathname.split("/").filter(Boolean);
}

function extractIdFromObject(obj: any): string | number | null {
  if (!obj || typeof obj !== "object") return null;
  if (obj.id !== undefined && obj.id !== null) return obj.id;
  if (obj.data && obj.data.id !== undefined && obj.data.id !== null) return obj.data.id;
  return null;
}

function findCollectionBase(pathname: string): string | null {
  const parts = splitPath(pathname);
  const idx = parts.findIndex((p) => p.startsWith(":"));
  if (idx < 0) return null;
  return `/${parts.slice(0, idx).join("/")}`;
}

async function callEndpoint(
  method: string,
  pathname: string,
  token: string,
  body?: Record<string, unknown>
): Promise<{ ok: boolean; code: number; text: string; json: any }> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (!isPublicPath(pathname) && token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${pathname}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return { ok: res.status < 500, code: res.status, text, json };
}

async function main(): Promise<void> {
  if (!fs.existsSync(DOC_PATH)) throw new Error(`Missing doc: ${DOC_PATH}`);

  const endpoints = uniqueEndpoints(parseEndpoints(await fs.promises.readFile(DOC_PATH, "utf8")));
  const results: Result[] = [];
  const idByCollection = new Map<string, string | number>();

  const login = await callEndpoint("POST", "/api/v1/auth/login", "", {
    identifiant: ADMIN_ID,
    motDePasse: ADMIN_PASSWORD,
  });
  const token = login.json?.token || "";
  results.push({
    method: "POST",
    path: "/api/v1/auth/login",
    status: login.ok ? "PASS" : "FAIL",
    code: login.code,
    note: login.ok ? undefined : "Admin login failed",
  });

  // 1) Prime IDs using list endpoints
  for (const ep of endpoints.filter((e) => e.method === "GET" && !e.path.includes("/:"))) {
    try {
      const r = await callEndpoint(ep.method, ep.path, token);
      if (Array.isArray(r.json) && r.json.length > 0) {
        const id = extractIdFromObject(r.json[0]);
        if (id !== null) idByCollection.set(ep.path.replace(/\/+$/, ""), id);
      }
    } catch {
      // ignore in priming phase
    }
  }

  // 2) Execute all endpoints
  for (const ep of endpoints) {
    const keyPath = ep.path.replace(/\/+$/, "");

    if (ep.method === "POST" && ep.path.includes("/auth/login")) {
      continue;
    }

    try {
      if (ep.path.includes("/:")) {
        const base = findCollectionBase(ep.path);
        if (!base) {
          results.push({ ...ep, status: "SKIP", note: "Cannot resolve dynamic base" });
          continue;
        }

        let resolvedId = idByCollection.get(base.replace(/\/+$/, ""));

        // Try create one when id missing and mutation-like endpoint
        if (!resolvedId && (ep.method === "GET" || ep.method === "PUT" || ep.method === "DELETE" || ep.method === "PATCH")) {
          const createCandidate = endpoints.find((x) => x.method === "POST" && x.path.replace(/\/+$/, "") === base.replace(/\/+$/, ""));
          if (createCandidate) {
            const createRes = await callEndpoint("POST", createCandidate.path, token, bodyFor(createCandidate.path));
            if (createRes.ok) {
              const createdId = extractIdFromObject(createRes.json);
              if (createdId !== null) {
                resolvedId = createdId;
                idByCollection.set(base.replace(/\/+$/, ""), createdId);
              }
            }
          }
        }

        if (!resolvedId) {
          results.push({ ...ep, status: "SKIP", note: "No resolvable id" });
          continue;
        }

        const realPath = ep.path.replace(/:[^/]+/g, String(resolvedId));
        const payload =
          ep.method === "PUT" || ep.method === "PATCH" ? bodyFor(realPath) : undefined;
        const r = await callEndpoint(ep.method, realPath, token, payload);
        results.push({
          method: ep.method,
          path: ep.path,
          status: r.ok ? "PASS" : "FAIL",
          code: r.code,
          note: r.ok ? undefined : r.text.slice(0, 160),
        });
        continue;
      }

      if (ep.method === "POST") {
        const r = await callEndpoint("POST", ep.path, token, bodyFor(ep.path));
        const createdId = extractIdFromObject(r.json);
        if (createdId !== null) idByCollection.set(ep.path.replace(/\/+$/, ""), createdId);
        results.push({
          method: ep.method,
          path: ep.path,
          status: r.ok ? "PASS" : "FAIL",
          code: r.code,
          note: r.ok ? undefined : r.text.slice(0, 160),
        });
        continue;
      }

      const r = await callEndpoint(ep.method, ep.path, token);
      results.push({
        method: ep.method,
        path: ep.path,
        status: r.ok ? "PASS" : "FAIL",
        code: r.code,
        note: r.ok ? undefined : r.text.slice(0, 160),
      });
    } catch (error) {
      results.push({
        method: ep.method,
        path: ep.path,
        status: "FAIL",
        note: String(error),
      });
    }
  }

  const pass = results.filter((r) => r.status === "PASS").length;
  const fail = results.filter((r) => r.status === "FAIL").length;
  const skip = results.filter((r) => r.status === "SKIP").length;

  const md = [
    "# Advanced Smoke Test Report",
    "",
    `Base URL: \`${BASE_URL}\``,
    `Test Date: ${new Date().toISOString()}`,
    `Credentials: admin / test12348`,
    "",
    `## Summary`,
    `- ✅ PASS: ${pass}`,
    `- ❌ FAIL: ${fail}`,
    `- ⏭️ SKIP: ${skip}`,
    `- 📊 Total: ${results.length}`,
    `- 📈 Success Rate: ${Math.round((pass / (pass + fail)) * 100)}%`,
    "",
    "## Details",
    "",
    ...results.map((r) => `- [${r.status}] \`${r.method} ${r.path}\`${r.code ? ` -> ${r.code}` : ""}${r.note ? ` (${r.note})` : ""}`),
    "",
  ].join("\n");

  await fs.promises.writeFile(REPORT_MD_PATH, md, "utf8");
  await fs.promises.writeFile(REPORT_JSON_PATH, JSON.stringify(results, null, 2), "utf8");
  
  console.log(`\n✨ Advanced smoke report generated: ${path.basename(REPORT_MD_PATH)}`);
  console.log(`   📊 PASS=${pass}, FAIL=${fail}, SKIP=${skip}`);
  console.log(`   📈 Success Rate: ${Math.round((pass / (pass + fail)) * 100)}%`);
  
  if (fail > 0) process.exit(1);
}

main().catch((error) => {
  console.error("Advanced smoke failed:", error);
  process.exit(1);
});
