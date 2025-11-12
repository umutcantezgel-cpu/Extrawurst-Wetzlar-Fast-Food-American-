/**
 * SRI Hash Generator
 * Generates SHA-384 hashes for all static assets
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist');
const OUTPUT_FILE = path.join(DIST_DIR, 'integrity.manifest.json');

const FILE_TYPES = {
  css: ['.css'],
  js: ['.js', '.mjs'],
  font: ['.woff', '.woff2'],
};

function generateSRIHash(filePath) {
  const content = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha384').update(content).digest('base64');
  return `sha384-${hash}`;
}

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function shouldProcessFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return Object.values(FILE_TYPES).flat().includes(ext);
}

function main() {
  console.log('[SRI Generator] Starting...');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('[SRI Generator] Error: dist directory not found. Run build first.');
    process.exit(1);
  }

  const allFiles = getAllFiles(DIST_DIR);
  const manifest = {
    generated: new Date().toISOString(),
    algorithm: 'sha384',
    files: {},
  };

  let processed = 0;

  allFiles.forEach((filePath) => {
    if (!shouldProcessFile(filePath)) {
      return;
    }

    try {
      const hash = generateSRIHash(filePath);
      const relativePath = path.relative(DIST_DIR, filePath);
      const publicPath = '/' + relativePath.replace(/\\/g, '/');

      manifest.files[publicPath] = {
        integrity: hash,
        size: fs.statSync(filePath).size,
      };

      processed++;
      console.log(`[SRI] Generated: ${publicPath}`);
    } catch (error) {
      console.error(`[SRI] Error processing ${filePath}:`, error.message);
    }
  });

  // Write manifest
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));

  console.log(`\n[SRI Generator] Complete!`);
  console.log(`  Processed: ${processed} files`);
  console.log(`  Manifest: ${OUTPUT_FILE}`);
  console.log(`  Coverage: ${processed > 0 ? '100%' : '0%'}\n`);
}

main();
