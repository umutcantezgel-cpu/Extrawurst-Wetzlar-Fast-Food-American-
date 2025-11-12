/**
 * No-Inline Scanner
 * Scans HTML files for inline scripts and styles
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist');

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];

  // Check for inline scripts
  const inlineScripts = content.match(/<script(?![^>]*src=)[^>]*>/g);
  if (inlineScripts) {
    inlineScripts.forEach((match) => {
      if (!match.includes('type="application/ld+json"')) {
        issues.push({
          type: 'inline-script',
          match,
        });
      }
    });
  }

  // Check for inline styles
  const inlineStyles = content.match(/<style[^>]*>/g);
  if (inlineStyles) {
    inlineStyles.forEach((match) => {
      issues.push({
        type: 'inline-style',
        match,
      });
    });
  }

  // Check for inline event handlers
  const inlineHandlers = content.match(/on\w+\s*=\s*["'][^"']*["']/g);
  if (inlineHandlers) {
    inlineHandlers.forEach((match) => {
      issues.push({
        type: 'inline-handler',
        match,
      });
    });
  }

  return issues;
}

function findHTMLFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findHTMLFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function main() {
  console.log('[No-Inline Scanner] Starting...\n');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('[No-Inline Scanner] Error: dist directory not found');
    process.exit(1);
  }

  const htmlFiles = findHTMLFiles(DIST_DIR);
  let totalIssues = 0;
  const fileIssues = {};

  htmlFiles.forEach((filePath) => {
    const relativePath = path.relative(DIST_DIR, filePath);
    const issues = scanFile(filePath);

    if (issues.length > 0) {
      fileIssues[relativePath] = issues;
      totalIssues += issues.length;
    }
  });

  if (totalIssues === 0) {
    console.log('[No-Inline Scanner] ✅ No inline code found\n');
    console.log(`  Scanned: ${htmlFiles.length} files`);
    console.log(`  Issues: 0`);
    console.log(`  Status: PASS\n`);
    return;
  }

  console.log('[No-Inline Scanner] ❌ Found inline code:\n');

  Object.entries(fileIssues).forEach(([file, issues]) => {
    console.log(`  ${file}:`);
    issues.forEach((issue) => {
      console.log(`    ❌ ${issue.type}: ${issue.match.substring(0, 60)}...`);
    });
    console.log('');
  });

  console.log(`[No-Inline Scanner] Summary:`);
  console.log(`  Files scanned: ${htmlFiles.length}`);
  console.log(`  Files with issues: ${Object.keys(fileIssues).length}`);
  console.log(`  Total issues: ${totalIssues}`);
  console.log(`  Status: FAIL\n`);

  process.exit(1);
}

main();
