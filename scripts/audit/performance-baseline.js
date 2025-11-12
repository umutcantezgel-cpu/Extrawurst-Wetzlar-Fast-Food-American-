/**
 * Performance Baseline Script
 * Measures Core Web Vitals using Puppeteer
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const URLS_TO_TEST = [
  'http://localhost:4321/',
  'http://localhost:4321/speisekarte/',
  'http://localhost:4321/kontakt/',
];

class PerformanceAuditor {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      targets: {
        LCP: 1800, // 1.8s in ms
        INP: 150,  // 150ms
        CLS: 0.08,
        FCP: 1500,
      },
      pages: [],
    };
  }

  async measurePage(url) {
    console.log(`[Perf] Measuring ${url}...`);

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();

      // Emulate mobile device
      await page.emulate(puppeteer.KnownDevices['iPhone 13']);

      // Enable performance metrics
      await page.evaluateOnNewDocument(() => {
        window.performanceMetrics = {
          lcp: 0,
          cls: 0,
          fcp: 0,
        };

        // LCP Observer
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          window.performanceMetrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // CLS Observer
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          window.performanceMetrics.cls = clsValue;
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // FCP Observer
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              window.performanceMetrics.fcp = entry.startTime;
            }
          });
        });
        fcpObserver.observe({ type: 'paint', buffered: true });
      });

      await page.goto(url, { waitUntil: 'networkidle0' });

      // Wait for metrics to settle
      await page.waitForTimeout(3000);

      const metrics = await page.evaluate(() => window.performanceMetrics);

      const result = {
        url,
        metrics: {
          LCP: Math.round(metrics.lcp),
          CLS: metrics.cls.toFixed(3),
          FCP: Math.round(metrics.fcp),
        },
        passed: {
          LCP: metrics.lcp <= this.results.targets.LCP,
          CLS: metrics.cls <= this.results.targets.CLS,
          FCP: metrics.fcp <= this.results.targets.FCP,
        },
      };

      this.results.pages.push(result);

      console.log(`  LCP: ${result.metrics.LCP}ms ${result.passed.LCP ? '✅' : '❌'}`);
      console.log(`  CLS: ${result.metrics.CLS} ${result.passed.CLS ? '✅' : '❌'}`);
      console.log(`  FCP: ${result.metrics.FCP}ms ${result.passed.FCP ? '✅' : '❌'}\n`);

    } finally {
      await browser.close();
    }
  }

  async runAudit() {
    console.log('[Performance Audit] Starting...\n');
    console.log('⚠️  Make sure the dev server is running on localhost:4321\n');

    for (const url of URLS_TO_TEST) {
      await this.measurePage(url);
    }

    this.generateReport();
  }

  generateReport() {
    const reportPath = path.join(__dirname, '..', '..', 'docs', 'reports', 'performance-baseline.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));

    console.log('='.repeat(60));
    console.log('PERFORMANCE BASELINE SUMMARY');
    console.log('='.repeat(60));

    const allPassed = this.results.pages.every((page) =>
      Object.values(page.passed).every((v) => v)
    );

    if (allPassed) {
      console.log('✅ All pages meet performance targets\n');
    } else {
      console.log('❌ Some pages do not meet performance targets\n');
    }

    console.log(`Report saved to: ${reportPath}\n`);
  }
}

const auditor = new PerformanceAuditor();
auditor.runAudit().catch((error) => {
  console.error('Performance audit failed:', error);
  console.error('\nMake sure:\n1. You ran "npm run build"\n2. Dev server is running: "npm run preview"\n');
  process.exit(1);
});
