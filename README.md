# Extrawurst Wetzlar - Premium Static Website

Enterprise-grade static website for Extrawurst Wetzlar, an American Fast Food restaurant in Wetzlar, Germany.

## 🎯 Project Overview

This is a premium, production-ready static website built with modern web technologies and enterprise-quality standards:

- **WCAG 2.2 AA** compliant accessibility
- **Core Web Vitals** optimized (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1)
- **Security hardened** (strict CSP, HSTS, SRI, Trusted Types)
- **DSGVO/TTDSG** compliant (consent management, two-click embeds)
- **SEO optimized** (structured data, sitemap, meta tags)
- **Automated quality gates** (Lighthouse CI, Pa11y, security scans)

**Project Value:** ≥ 20.000 € (see [VALUE_JUSTIFICATION.md](docs/VALUE_JUSTIFICATION.md))

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 20.0.0
- npm ≥ 10.0.0

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build static site
npm run build

# Preview production build
npm run preview
```

## 📦 Project Structure

```
extrawurst-wetzlar/
├── .github/workflows/  # CI/CD pipelines
├── contracts/          # JSON contracts (architecture specs)
├── docs/              # Documentation & reports
├── public/            # Static assets
├── scripts/           # Build & validation scripts
├── src/
│   ├── components/    # Astro components
│   ├── layouts/       # Page layouts
│   ├── pages/         # Astro pages (SSG)
│   └── styles/        # Global styles & tokens
└── ...
```

## 🧪 Testing & Validation

### Run All Tests

```bash
npm test
```

### Individual Test Suites

```bash
# Contract validation
npm run validate:contracts

# SRI generation & verification
npm run sri:gen
npm run sri:verify

# Accessibility tests
npm run a11y

# Lighthouse CI
npm run lhci

# Security scans
npm run security
```

## 🔐 Security Features

- **CSP Strict:** No `unsafe-*` directives
- **HSTS:** `max-age=31536000; includeSubDomains; preload`
- **SRI:** SHA-384 hashes for all assets
- **Trusted Types:** Script injection prevention
- **No inline code:** All scripts/styles external

## ♿ Accessibility

**WCAG 2.2 Level AA** compliant
- Semantic HTML5 landmarks
- Keyboard navigation
- Visible focus indicators (3px)
- Screen reader optimizations
- Minimum 44×44px touch targets

## 🎨 Design System

**3-Tier Token System:**
1. Primitive (brand constants)
2. Semantic (purpose-driven)
3. Component (specific patterns)

## 🌐 SEO & Performance

| Metric | Target |
|--------|--------|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |
| Lighthouse | ≥ 95 |

## 🚢 Deployment

Deploy `dist/` to:
- Netlify (recommended)
- Vercel
- Any static host

## 📚 Documentation

- [Definition of Done](docs/DoD-checklist.md)
- [Operations Manual](docs/ops/README.md)
- [Value Justification](docs/VALUE_JUSTIFICATION.md)

## 📝 License

Proprietary - © 2024 Extrawurst Wetzlar GmbH

---

**Built with:** Astro, Tailwind CSS, TypeScript
