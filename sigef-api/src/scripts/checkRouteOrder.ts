import fs from "fs";
import path from "path";

const modulesDir = path.resolve(__dirname, "../modules");

async function getRouterFiles(dir: string): Promise<string[]> {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getRouterFiles(fullPath)));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith("Router.ts")) {
      files.push(fullPath);
    }
  }

  return files;
}

function indexOfAny(content: string, needles: string[]): number {
  const idxs = needles.map((n) => content.indexOf(n)).filter((n) => n >= 0);
  return idxs.length ? Math.min(...idxs) : -1;
}

async function main(): Promise<void> {
  const routerFiles = await getRouterFiles(modulesDir);
  const issues: string[] = [];

  for (const filePath of routerFiles) {
    const content = await fs.promises.readFile(filePath, "utf8");

    const dynamicIdIdx = indexOfAny(content, [
      ".get('/:id'",
      '.get("/:id"',
      ".put('/:id'",
      '.put("/:id"',
      ".delete('/:id'",
      '.delete("/:id"',
    ]);

    if (dynamicIdIdx < 0) {
      continue;
    }

    const staticIdx = indexOfAny(content, [
      "/statistics/count",
      "/stats",
      "/search",
      "/export",
      "/by-",
    ]);

    if (staticIdx >= 0 && dynamicIdIdx < staticIdx) {
      issues.push(path.relative(process.cwd(), filePath));
    }
  }

  if (!issues.length) {
    console.log("Route order check passed.");
    return;
  }

  console.error("Route order issues detected (/:id appears before static route):");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }

  process.exit(1);
}

main().catch((error) => {
  console.error("Route order check failed:", error);
  process.exit(1);
});
