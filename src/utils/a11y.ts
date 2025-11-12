/**
 * Accessibility Utilities
 * WCAG 2.2 AA+ compliance helpers
 */

/**
 * Focus Trap for modals and overlays
 */
export class FocusTrap {
  private element: HTMLElement;
  private focusableElements: HTMLElement[];
  private firstFocusable: HTMLElement | null = null;
  private lastFocusable: HTMLElement | null = null;
  private previousFocus: HTMLElement | null = null;

  constructor(element: HTMLElement) {
    this.element = element;
    this.focusableElements = [];
    this.updateFocusableElements();
  }

  private updateFocusableElements() {
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    this.focusableElements = Array.from(
      this.element.querySelectorAll(selector)
    ) as HTMLElement[];

    this.firstFocusable = this.focusableElements[0] || null;
    this.lastFocusable =
      this.focusableElements[this.focusableElements.length - 1] || null;
  }

  activate() {
    this.previousFocus = document.activeElement as HTMLElement;
    this.updateFocusableElements();

    if (this.firstFocusable) {
      this.firstFocusable.focus();
    }

    document.addEventListener('keydown', this.handleKeyDown);
  }

  deactivate() {
    document.removeEventListener('keydown', this.handleKeyDown);

    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === this.firstFocusable) {
        event.preventDefault();
        this.lastFocusable?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === this.lastFocusable) {
        event.preventDefault();
        this.firstFocusable?.focus();
      }
    }
  };
}

/**
 * Roving Tabindex for navigation menus
 */
export class RovingTabindex {
  private items: HTMLElement[];
  private currentIndex: number = 0;

  constructor(container: HTMLElement, itemSelector: string) {
    this.items = Array.from(
      container.querySelectorAll(itemSelector)
    ) as HTMLElement[];

    this.init();
  }

  private init() {
    this.items.forEach((item, index) => {
      item.setAttribute('tabindex', index === 0 ? '0' : '-1');
      item.addEventListener('keydown', (e) => this.handleKeyDown(e, index));
      item.addEventListener('focus', () => this.setFocus(index));
    });
  }

  private handleKeyDown(event: KeyboardEvent, index: number) {
    let newIndex = index;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        newIndex = (index + 1) % this.items.length;
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        newIndex = (index - 1 + this.items.length) % this.items.length;
        break;

      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;

      case 'End':
        event.preventDefault();
        newIndex = this.items.length - 1;
        break;

      default:
        return;
    }

    this.setFocus(newIndex);
  }

  private setFocus(index: number) {
    this.items[this.currentIndex].setAttribute('tabindex', '-1');
    this.currentIndex = index;
    this.items[this.currentIndex].setAttribute('tabindex', '0');
    this.items[this.currentIndex].focus();
  }
}

/**
 * Live Region announcer for dynamic content
 */
export class LiveRegionAnnouncer {
  private liveRegion: HTMLElement;

  constructor() {
    this.liveRegion = this.createLiveRegion();
  }

  private createLiveRegion(): HTMLElement {
    const existing = document.getElementById('live-region-announcer');
    if (existing) return existing;

    const region = document.createElement('div');
    region.id = 'live-region-announcer';
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    document.body.appendChild(region);

    return region;
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    this.liveRegion.setAttribute('aria-live', priority);
    this.liveRegion.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      this.liveRegion.textContent = '';
    }, 1000);
  }
}

/**
 * Skip Links Manager
 */
export function addSkipLinks() {
  const skipLinks = [
    { href: '#main-content', text: 'Zum Hauptinhalt springen' },
    { href: '#nav', text: 'Zur Navigation springen' },
    { href: '#footer', text: 'Zum Footer springen' },
  ];

  const container = document.createElement('div');
  container.className = 'skip-links';

  skipLinks.forEach((link) => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.text;
    a.className = 'skip-link';
    container.appendChild(a);
  });

  document.body.insertBefore(container, document.body.firstChild);
}

/**
 * Check and enforce minimum touch target size (44x44px)
 */
export function validateTouchTargets() {
  const minSize = 44; // 44px minimum per WCAG 2.5.5

  const interactiveSelectors = [
    'button',
    'a[href]',
    'input[type="button"]',
    'input[type="submit"]',
    'input[type="checkbox"]',
    'input[type="radio"]',
  ];

  interactiveSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      const element = el as HTMLElement;
      const rect = element.getBoundingClientRect();

      if (rect.width < minSize || rect.height < minSize) {
        console.warn(
          `[A11y] Touch target too small: ${selector}`,
          `Size: ${rect.width}x${rect.height}px (min: ${minSize}x${minSize}px)`
        );
      }
    });
  });
}

/**
 * Global A11y initialization
 */
export function initA11y() {
  // Add skip links
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSkipLinks);
  } else {
    addSkipLinks();
  }

  // Validate touch targets in development
  if (process.env.NODE_ENV === 'development') {
    window.addEventListener('load', validateTouchTargets);
  }

  // Initialize live region announcer
  window.liveAnnouncer = new LiveRegionAnnouncer();
}

// Type augmentation for window
declare global {
  interface Window {
    liveAnnouncer: LiveRegionAnnouncer;
  }
}
