/**
 * Compress portfolio screenshots to WebP and refresh knowledge imageUrls.
 * Run: node scripts/optimize-images.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const shots = path.join(root, "public/assets/screenshots");

const BROWSER_FOLDERS = new Set([
  "fleetexlogistics",
  "rapidexpresslogistics",
  "rapidPortal",
  "POS",
]);

async function convertFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) return null;
  if (path.basename(filePath).startsWith(".")) return null;

  const folder = path.basename(path.dirname(filePath));
  const maxW = BROWSER_FOLDERS.has(folder) ? 1280 : 720;
  const outPath = filePath.replace(/\.(png|jpe?g|webp)$/i, ".webp");

  const input = sharp(filePath, { failOn: "none" });
  const meta = await input.metadata();
  const pipeline = sharp(filePath, { failOn: "none" }).rotate();

  if (meta.width && meta.width > maxW) {
    pipeline.resize({ width: maxW, withoutEnlargement: true });
  }

  await pipeline.webp({ quality: 72, effort: 4 }).toFile(outPath + ".tmp");
  fs.renameSync(outPath + ".tmp", outPath);

  // Remove original if different from output
  if (path.resolve(filePath) !== path.resolve(outPath) && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  const before = meta.size ?? 0;
  const after = fs.statSync(outPath).size;
  return { outPath, before, after, folder };
}

async function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

async function main() {
  const files = (await walk(shots)).filter((f) =>
    /\.(png|jpe?g|webp)$/i.test(f),
  );
  let saved = 0;
  let beforeTotal = 0;
  let afterTotal = 0;

  for (const file of files) {
    // Skip already-optimized webp that has no non-webp twin — still recompress oversized
    try {
      const result = await convertFile(file);
      if (!result) continue;
      beforeTotal += result.before || fs.statSync(result.outPath).size;
      afterTotal += result.after;
      saved += 1;
      console.log(
        `✓ ${path.relative(shots, result.outPath)} → ${(result.after / 1024).toFixed(0)}KB`,
      );
    } catch (e) {
      console.error(`✗ ${file}:`, e.message);
    }
  }

  // Patch knowledge.ts image extensions to .webp
  const knowledgePath = path.join(root, "data/knowledge.ts");
  let knowledge = fs.readFileSync(knowledgePath, "utf8");
  knowledge = knowledge.replace(
    /(\/assets\/screenshots\/[^"']+)\.(png|jpe?g)/gi,
    "$1.webp",
  );
  fs.writeFileSync(knowledgePath, knowledge);

  console.log(
    `\nConverted ${saved} images. Approx output total: ${(afterTotal / 1024 / 1024).toFixed(1)}MB`,
  );
}

main();
