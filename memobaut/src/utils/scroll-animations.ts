/**
 * Scroll-triggered Animations Utility - memobaut.com
 * Performance-optimized scroll animations using Intersection Observer API
 */

interface ScrollAnimationOptions {
  /** CSS class to add when element becomes visible */
  activeClass?: string;
  /** Threshold for triggering animation (0-1) */
  threshold?: number;
  /** Root margin for early/late triggering */
  rootMargin?: string;
  /** Only trigger once */
  once?: boolean;
}

/**
 * Initialize scroll-triggered animations for elements with .animate-on-scroll class
 */
export function initScrollAnimations(
  options: ScrollAnimationOptions = {}
): void {
  const {
    activeClass = 'is-visible',
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    once = true,
  } = options;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // If user prefers reduced motion, immediately show all elements
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => el.classList.add(activeClass));
    return;
  }

  // Create Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(activeClass);

          // If once=true, stop observing after first trigger
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          // If once=false, remove class when element leaves viewport
          entry.target.classList.remove(activeClass);
        }
      });
    },
    {
      threshold,
      rootMargin,
    }
  );

  // Observe all elements with .animate-on-scroll class
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach((el) => observer.observe(el));
}

/**
 * Add scroll animation to a single element dynamically
 */
export function addScrollAnimation(
  element: Element,
  options: ScrollAnimationOptions = {}
): IntersectionObserver {
  const {
    activeClass = 'is-visible',
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    once = true,
  } = options;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(activeClass);
        if (once) {
          observer.disconnect();
        }
      } else if (!once) {
        entry.target.classList.remove(activeClass);
      }
    },
    { threshold, rootMargin }
  );

  observer.observe(element);
  return observer;
}

/**
 * Stagger animations for a group of elements
 * Adds increasing delay to each element
 */
export function staggerScrollAnimations(
  selector: string,
  delayIncrement: number = 100
): void {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    const htmlEl = el as HTMLElement;
    htmlEl.style.transitionDelay = `${index * delayIncrement}ms`;
  });
}

/**
 * Initialize on DOM ready
 */
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollAnimations();
    });
  } else {
    initScrollAnimations();
  }
}
