/**
 * Asset Profiler
 * Analyzes bundle sizes, unused CSS, image formats
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', '..', 'dist');

class AssetProfiler {
  constructor() {
    this.profile = {
      timestamp: new Date().toISOString(),
      budgets: {
        js: { limit: 35, unit: 'KB' },
        css: { limit: 45, unit: 'KB' },
        fonts: { limit: 100, unit: 'KB' },
        images: { limit: 200, unit: 'KB' },
      },
      assets: {
        javascript: [],
        css: [],
        fonts: [],
        images: [],
      },
      totals: {
        javascript: 0,
        css: 0,
        fonts: 0,
        images: 0,
      },
      violations: [],
    };
  }

  async analyze() {
    console.log('[Asset Profiler] Starting analysis...\n');

    if (!fs.existsSync(DIST_DIR)) {
      console.error('[Asset Profiler] Error: dist directory not found. Run build first.');
      process.exit(1);
    }

    this.scanAssets(DIST_DIR);
    this.checkBudgets();
    this.generateReport();
  }

  scanAssets(dir, baseDir = dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        this.scanAssets(filePath, baseDir);
      } else {
        const ext = path.extname(file).toLowerCase();
        const sizeKB = (stat.size / 1024).toFixed(2);
        const relativePath = path.relative(baseDir, filePath);

        const asset = {
          path: relativePath,
          size: parseFloat(sizeKB),
          unit: 'KB',
        };

        if (['.js', '.mjs'].includes(ext)) {
          this.profile.assets.javascript.push(asset);
          this.profile.totals.javascript += parseFloat(sizeKB);
        } else if (ext === '.css') {
          this.profile.assets.css.push(asset);
          this.profile.totals.css += parseFloat(sizeKB);
        } else if (['.woff', '.woff2'].includes(ext)) {
          this.profile.assets.fonts.push(asset);
          this.profile.totals.fonts += parseFloat(sizeKB);
        } else if (['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg', '.gif'].includes(ext)) {
          this.profile.assets.images.push(asset);
          this.profile.totals.images += parseFloat(sizeKB);
        }
      }
    });
  }

  checkBudgets() {
    console.log('[Asset Profiler] Checking budgets...\n');

    // Check per-page JS budget
    const jsPages = new Map();
    this.profile.assets.javascript.forEach((asset) => {
      const page = this.extractPageFromPath(asset.path);
      if (!jsPages.has(page)) {
        jsPages.set(page, 0);
      }
      jsPages.set(page, jsPages.get(page) + asset.size);
    });

    jsPages.forEach((size, page) => {
      if (size > this.profile.budgets.js.limit) {
        this.profile.violations.push({
          type: 'JavaScript Budget',
          page,
          actual: size,
          limit: this.profile.budgets.js.limit,
          unit: 'KB',
        });
      }
    });

    // Check total CSS
    if (this.profile.totals.css > this.profile.budgets.css.limit) {
      this.profile.violations.push({
        type: 'CSS Budget',
        actual: this.profile.totals.css.toFixed(2),
        limit: this.profile.budgets.css.limit,
        unit: 'KB',
      });
    }

    // Check fonts
    if (this.profile.totals.fonts > this.profile.budgets.fonts.limit) {
      this.profile.violations.push({
        type: 'Font Budget',
        actual: this.profile.totals.fonts.toFixed(2),
        limit: this.profile.budgets.fonts.limit,
        unit: 'KB',
      });
    }
  }

  extractPageFromPath(assetPath) {
    const match = assetPath.match(/^([^/]+)\//);
    return match ? match[1] : 'root';
  }

  generateReport() {
    const reportPath = path.join(__dirname, '..', '..', 'docs', 'reports', 'asset-profile.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.profile, null, 2));

    console.log('='.repeat(60));
    console.log('ASSET PROFILE SUMMARY');
    console.log('='.repeat(60));
    console.log(`JavaScript: ${this.profile.totals.javascript.toFixed(2)} KB (${this.profile.assets.javascript.length} files)`);
    console.log(`CSS: ${this.profile.totals.css.toFixed(2)} KB (${this.profile.assets.css.length} files)`);
    console.log(`Fonts: ${this.profile.totals.fonts.toFixed(2)} KB (${this.profile.assets.fonts.length} files)`);
    console.log(`Images: ${this.profile.totals.images.toFixed(2)} KB (${this.profile.assets.images.length} files)`);
    console.log('='.repeat(60));

    if (this.profile.violations.length > 0) {
      console.log('\n❌ BUDGET VIOLATIONS:\n');
      this.profile.violations.forEach((v) => {
        console.log(`  • ${v.type}: ${v.actual}${v.unit} (limit: ${v.limit}${v.unit})`);
      });
      console.log('');
    } else {
      console.log('\n✅ All budgets within limits\n');
    }

    console.log(`Report saved to: ${reportPath}\n`);
  }
}

const profiler = new AssetProfiler();
profiler.analyze().catch((error) => {
  console.error('Asset profiling failed:', error);
  process.exit(1);
});
