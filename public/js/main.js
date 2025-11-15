/* Extrawurst Wetzlar - Main JavaScript */
/* Vanilla JS - No frameworks, optimized for performance */

(function() {
  'use strict';

  // ===== Mobile Navigation =====
  const initMobileNav = () => {
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (navToggle && mobileMenu) {
      navToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded',
          navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
      });

      // Close menu when clicking links
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  };

  // ===== Scroll Header Effect =====
  const initScrollHeader = () => {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  };

  // ===== Hero Slider =====
  const initHeroSlider = () => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');

    if (slides.length === 0) return;

    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        if (dots[i]) dots[i].classList.toggle('active', i === index);
      });
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    };

    const startSlideshow = () => {
      slideInterval = setInterval(nextSlide, 5000);
    };

    const stopSlideshow = () => {
      if (slideInterval) clearInterval(slideInterval);
    };

    // Initialize
    showSlide(currentSlide);
    startSlideshow();

    // Controls
    if (nextBtn) nextBtn.addEventListener('click', () => {
      nextSlide();
      stopSlideshow();
      startSlideshow();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
      prevSlide();
      stopSlideshow();
      startSlideshow();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        stopSlideshow();
        startSlideshow();
      });
    });

    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', stopSlideshow);
      heroSection.addEventListener('mouseleave', startSlideshow);
    }
  };

  // ===== Cookie Banner =====
  const initCookieBanner = () => {
    const banner = document.querySelector('.cookie-banner');
    const acceptBtn = document.querySelector('.cookie-accept');
    const declineBtn = document.querySelector('.cookie-decline');
    const settingsBtn = document.querySelector('.cookie-settings');

    if (!banner) return;

    // Check if user already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');

    if (!cookieConsent) {
      setTimeout(() => {
        banner.classList.add('show');
      }, 1000);
    }

    const hideBanner = () => {
      banner.classList.remove('show');
    };

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        hideBanner();
        // Initialize analytics here if needed
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        hideBanner();
      });
    }

    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        // Open cookie settings modal (implement if needed)
        alert('Cookie-Einstellungen öffnen - Details im Impressum');
      });
    }
  };

  // ===== Lazy Loading Images =====
  const initLazyLoading = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      return;
    }

    // Fallback for browsers without native support
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  };

  // ===== Form Validation =====
  const initFormValidation = () => {
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            input.setAttribute('aria-invalid', 'true');
          } else {
            input.classList.remove('error');
            input.setAttribute('aria-invalid', 'false');
          }
        });

        // Email validation
        const emailInputs = form.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (input.value && !emailRegex.test(input.value)) {
            isValid = false;
            input.classList.add('error');
            input.setAttribute('aria-invalid', 'true');
          }
        });

        if (isValid) {
          // Form is valid - submit or show success message
          const successMsg = document.createElement('div');
          successMsg.className = 'alert alert-success';
          successMsg.textContent = 'Nachricht erfolgreich gesendet!';
          successMsg.setAttribute('role', 'alert');
          form.insertBefore(successMsg, form.firstChild);

          setTimeout(() => successMsg.remove(), 5000);
          form.reset();
        } else {
          // Show error message
          const errorMsg = document.createElement('div');
          errorMsg.className = 'alert alert-error';
          errorMsg.textContent = 'Bitte füllen Sie alle Pflichtfelder korrekt aus.';
          errorMsg.setAttribute('role', 'alert');
          form.insertBefore(errorMsg, form.firstChild);

          setTimeout(() => errorMsg.remove(), 5000);
        }
      });
    });
  };

  // ===== Smooth Scroll =====
  const initSmoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    });
  };

  // ===== Accordion for FAQ =====
  const initAccordion = () => {
    const accordionBtns = document.querySelectorAll('.accordion-btn');

    accordionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        // Close all other accordions
        accordionBtns.forEach(otherBtn => {
          if (otherBtn !== btn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            otherBtn.nextElementSibling.style.maxHeight = null;
          }
        });

        // Toggle current accordion
        btn.setAttribute('aria-expanded', !isExpanded);
        if (!isExpanded) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = null;
        }
      });
    });
  };

  // ===== Active Navigation Link =====
  const initActiveNav = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');

    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath || (currentPath === '/' && linkPath === '/index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  };

  // ===== Performance Monitoring =====
  const monitorPerformance = () => {
    if ('PerformanceObserver' in window) {
      // Monitor LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor CLS (Cumulative Layout Shift)
      let clsScore = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
          }
        }
        console.log('CLS:', clsScore);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  };

  // ===== Initialize All =====
  const init = () => {
    initMobileNav();
    initScrollHeader();
    initHeroSlider();
    initCookieBanner();
    initLazyLoading();
    initFormValidation();
    initSmoothScroll();
    initAccordion();
    initActiveNav();

    // Only monitor performance in development
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      monitorPerformance();
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
