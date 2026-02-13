const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sources = [
  { srcDir: path.join(__dirname, '..', 'public', 'images', 'weapons'), outDir: path.join(__dirname, '..', 'public', 'images', 'weapons', 'thumbs') },
  { srcDir: path.join(__dirname, '..', 'public', 'images', 'bases'), outDir: path.join(__dirname, '..', 'public', 'images', 'bases', 'thumbs') },
];

const thumbWidth = 320;

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function processDir(srcDir, outDir) {
  await ensureDir(outDir);
  const entries = await fs.promises.readdir(srcDir, { withFileTypes: true });
  for (const ent of entries) {
    if (ent.isDirectory()) continue;
    const ext = path.extname(ent.name).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) continue;
    const srcPath = path.join(srcDir, ent.name);
    const outPath = path.join(outDir, ent.name);
    try {
      await sharp(srcPath).resize({ width: thumbWidth, withoutEnlargement: true }).toFile(outPath);
      console.log('Generated', outPath);
    } catch (err) {
      console.error('Failed', srcPath, err.message);
    }
  }
}

(async () => {
  for (const s of sources) {
    if (!fs.existsSync(s.srcDir)) {
      console.warn('Source dir not found, skipping:', s.srcDir);
      continue;
    }
    await processDir(s.srcDir, s.outDir);
  }
  console.log('Thumbnail generation complete');
})();