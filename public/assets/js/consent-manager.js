/**
 * Consent Manager
 * DSGVO/TTDSG compliant consent management
 * @module consent-manager
 */

const CONSENT_STORAGE_KEY = 'ew_consent_preferences';
const CONSENT_VERSION = '1.0';

class ConsentManager {
  constructor() {
    this.preferences = this.loadPreferences();
    this.init();
  }

  init() {
    // Listen for consent changes
    window.addEventListener('consent-changed', (e) => {
      this.handleConsentChange(e.detail);
    });

    // Apply current consent state
    this.applyConsent();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.version === CONSENT_VERSION) {
          return data.preferences;
        }
      }
    } catch (error) {
      console.error('Failed to load consent preferences:', error);
    }

    return {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
  }

  savePreferences(preferences) {
    try {
      const data = {
        version: CONSENT_VERSION,
        preferences,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(data));
      this.preferences = preferences;
    } catch (error) {
      console.error('Failed to save consent preferences:', error);
    }
  }

  handleConsentChange(preferences) {
    this.savePreferences(preferences);
    this.applyConsent();
  }

  applyConsent() {
    // Apply CSP based on consent
    this.updateCSP();

    // Dispatch event for other components
    window.dispatchEvent(
      new CustomEvent('consent-applied', {
        detail: this.preferences,
      })
    );
  }

  updateCSP() {
    // In a production environment, CSP would be set via HTTP headers
    // This is a client-side fallback for demonstration

    if (this.preferences.functional) {
      // Allow functional embeds (YouTube, Google Maps)
      console.log('[Consent] Functional consent granted');
    }

    if (this.preferences.analytics) {
      // Allow analytics scripts
      console.log('[Consent] Analytics consent granted');
    }

    if (this.preferences.marketing) {
      // Allow marketing scripts
      console.log('[Consent] Marketing consent granted');
    }
  }

  getPreferences() {
    return { ...this.preferences };
  }

  hasConsent(profile) {
    return this.preferences[profile] === true;
  }
}

// Initialize consent manager
const consentManager = new ConsentManager();

// Expose API
window.ConsentManager = {
  getPreferences: () => consentManager.getPreferences(),
  hasConsent: (profile) => consentManager.hasConsent(profile),
};

// Log initialization
console.log('[Consent Manager] Initialized with preferences:', consentManager.getPreferences());
