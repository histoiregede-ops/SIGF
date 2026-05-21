import fs from "fs";
import path from "path";

const modulesDir = path.resolve(__dirname, "../modules");

const dynamicMarkers = ["('/:id'", '("/:id"'];
const staticMarkers = ["/statistics/count", "/stats", "/search", "/export", "/by-"];

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

function hasAnyMarker(line: string, markers: string[]): boolean {
  return markers.some((marker) => line.includes(marker));
}

async function main(): Promise<void> {
  const files = await getRouterFiles(modulesDir);
  const changed: string[] = [];

  for (const filePath of files) {
    const content = await fs.promises.readFile(filePath, "utf8");
    const lines = content.split("\n");

    const firstDynamicIdx = lines.findIndex((line) => hasAnyMarker(line, dynamicMarkers));
    if (firstDynamicIdx < 0) {
      continue;
    }

    const staticIndices: number[] = [];
    for (let i = firstDynamicIdx + 1; i < lines.length; i += 1) {
      if (hasAnyMarker(lines[i], staticMarkers)) {
        staticIndices.push(i);
      }
    }

    if (!staticIndices.length) {
      continue;
    }

    const staticLines = staticIndices.map((idx) => lines[idx]);
    const filteredLines = lines.filter((_, idx) => !staticIndices.includes(idx));
    filteredLines.splice(firstDynamicIdx, 0, ...staticLines);

    const nextContent = filteredLines.join("\n");
    if (nextContent !== content) {
      await fs.promises.writeFile(filePath, nextContent, "utf8");
      changed.push(path.relative(process.cwd(), filePath));
    }
  }

  if (!changed.length) {
    console.log("No route order changes were needed.");
    return;
  }

  console.log(`Fixed route order in ${changed.length} file(s):`);
  for (const item of changed) {
    console.log(`- ${item}`);
  }
}

main().catch((error) => {
  console.error("Failed to fix route order:", error);
  process.exit(1);
});
