/**
 * Web Vitals RUM (Real User Monitoring)
 * Consent-aware performance tracking
 */

class WebVitalsTracker {
  constructor() {
    this.metrics = {
      LCP: null,
      INP: null,
      CLS: null,
      FCP: null,
      TTFB: null,
    };

    this.hasConsent = this.checkConsent();

    if (this.hasConsent) {
      this.init();
    }

    // Listen for consent changes
    window.addEventListener('consent-changed', (e) => {
      if (e.detail.functional) {
        this.hasConsent = true;
        this.init();
      }
    });
  }

  checkConsent() {
    try {
      const consent = JSON.parse(localStorage.getItem('ew_consent_preferences') || '{}');
      return consent.functional === true;
    } catch {
      return false;
    }
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;

    // LCP Observer
    this.observeLCP();

    // INP Observer (formerly FID)
    this.observeINP();

    // CLS Observer
    this.observeCLS();

    // FCP Observer
    this.observeFCP();

    // TTFB
    this.measureTTFB();

    // Send metrics on page unload
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.sendMetrics();
      }
    });
  }

  observeLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.LCP = Math.round(lastEntry.renderTime || lastEntry.loadTime);
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  }

  observeINP() {
    let maxDelay = 0;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const delay = entry.processingStart - entry.startTime;
        if (delay > maxDelay) {
          maxDelay = delay;
          this.metrics.INP = Math.round(delay);
        }
      }
    });

    if (PerformanceObserver.supportedEntryTypes.includes('event')) {
      observer.observe({ type: 'event', buffered: true });
    }
  }

  observeCLS() {
    let clsValue = 0;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.metrics.CLS = clsValue.toFixed(3);
    });

    observer.observe({ type: 'layout-shift', buffered: true });
  }

  observeFCP() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.FCP = Math.round(entry.startTime);
        }
      }
    });

    observer.observe({ type: 'paint', buffered: true });
  }

  measureTTFB() {
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    if (navigationEntry) {
      this.metrics.TTFB = Math.round(navigationEntry.responseStart);
    }
  }

  sendMetrics() {
    if (!this.hasConsent) return;

    const data = {
      ...this.metrics,
      url: window.location.pathname,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      connection: this.getConnectionInfo(),
      device: this.getDeviceInfo(),
    };

    // Use Beacon API for reliable sending even during page unload
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      navigator.sendBeacon('/api/vitals', blob);
    } else {
      // Fallback to fetch
      fetch('/api/vitals', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(() => {
        // Silent fail
      });
    }

    console.log('[Web Vitals]', data);
  }

  getConnectionInfo() {
    if ('connection' in navigator) {
      const conn = navigator.connection;
      return {
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData,
      };
    }
    return null;
  }

  getDeviceInfo() {
    return {
      screen: {
        width: window.screen.width,
        height: window.screen.height,
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      pixelRatio: window.devicePixelRatio,
      userAgent: navigator.userAgent,
    };
  }
}

// Initialize tracker
if (typeof window !== 'undefined') {
  window.webVitalsTracker = new WebVitalsTracker();
}
