/**
 * Scans public/memories/ and writes manifest.json listing all images & videos.
 * Run automatically via npm predev / prebuild, or: npm run memories:manifest
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MEMORIES_DIR = path.join(__dirname, "..", "public", "memories");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".svg", ".bmp"]);
const VIDEO_EXT = new Set([".mp4", ".webm", ".ogg", ".mov", ".m4v"]);

const SKIP = new Set(["manifest.json", "README.txt", ".gitkeep"]);

function kindForFile(name) {
  const ext = path.extname(name).toLowerCase();
  if (IMAGE_EXT.has(ext)) return "image";
  if (VIDEO_EXT.has(ext)) return "video";
  return null;
}

function main() {
  if (!fs.existsSync(MEMORIES_DIR)) {
    fs.mkdirSync(MEMORIES_DIR, { recursive: true });
  }

  let names = [];
  try {
    names = fs.readdirSync(MEMORIES_DIR);
  } catch {
    names = [];
  }

  const items = names
    .filter((f) => !f.startsWith(".") && !SKIP.has(f))
    .map((file) => ({ file, kind: kindForFile(file) }))
    .filter((x) => x.kind)
    .sort((a, b) => a.file.localeCompare(b.file, undefined, { sensitivity: "base" }));

  const manifest = {
    generatedAt: new Date().toISOString(),
    items,
  };

  const outPath = path.join(MEMORIES_DIR, "manifest.json");
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`[memories] Wrote ${items.length} item(s) to ${path.relative(process.cwd(), outPath)}`);
}

main();
