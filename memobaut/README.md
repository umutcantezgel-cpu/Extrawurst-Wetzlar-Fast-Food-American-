# memobaut.com - Premium Static Website

> Production-ready website for memobaut Bauunternehmen built with Astro, TailwindCSS, and TypeScript

## 🚀 Project Overview

This is a high-performance, fully accessible, and SEO-optimized static website for memobaut, a German construction company specializing in new construction, renovation, and remodeling.

### Key Features

- ✅ **Static-First Architecture**: Built with Astro 4.x for optimal performance
- ✅ **Contract-Driven Design**: JSON contracts define components, routes, and tokens
- ✅ **WCAG 2.2 AA Accessibility**: Fully compliant with modern accessibility standards
- ✅ **Performance Optimized**: LCP ≤2.5s, CLS ≤0.1, INP ≤200ms
- ✅ **Security Hardened**: Strict CSP, HSTS, SRI, X-Frame-Options: DENY
- ✅ **CI/CD Pipeline**: Automated quality gates with Lighthouse & Pa11y
- ✅ **Netlify Ready**: One-click deployment configuration included

## 📋 Tech Stack

- **Framework**: [Astro 4.x](https://astro.build)
- **Styling**: [TailwindCSS 3.x](https://tailwindcss.com)
- **Language**: TypeScript 5.x
- **Hosting**: Netlify (static + serverless functions)
- **CI/CD**: GitHub Actions
- **Quality Tools**: Lighthouse CI, Pa11y, ESLint

## 🏗️ Project Structure

```
memobaut/
├── .github/
│   └── workflows/          # CI/CD workflows
│       ├── ci.yml          # Quality gates (Lighthouse, Pa11y)
│       └── deploy.yml      # Netlify deployment
├── contracts/              # Design contracts (source of truth)
│   ├── components/         # Component API contracts
│   ├── routes/             # SEO & routing contracts
│   └── tokens/             # Design token contracts
├── public/                 # Static assets
│   ├── robots.txt
│   ├── favicon.svg
│   └── site.webmanifest
├── scripts/                # Build & validation scripts
│   └── validate-contracts.js
├── src/
│   ├── components/         # Reusable components
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── ContactForm.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   └── Navigation.astro
│   ├── layouts/            # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/              # Route pages
│   │   ├── index.astro
│   │   ├── leistungen/
│   │   ├── referenzen/
│   │   ├── ueber-uns/
│   │   ├── kontakt/
│   │   ├── impressum/
│   │   └── datenschutz/
│   └── styles/             # Global styles
│       ├── tokens.css      # Design tokens as CSS variables
│       └── global.css      # Base styles & reset
├── astro.config.mjs        # Astro configuration
├── netlify.toml            # Netlify deployment config
├── package.json            # Dependencies & scripts
├── tailwind.config.mjs     # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🚦 Getting Started

### Prerequisites

- Node.js ≥18.0.0
- npm ≥9.0.0

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:4321
```

### Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run typecheck    # TypeScript type checking
npm run lint         # Lint code
npm run test         # Run all tests (typecheck + contracts + lint)
```

### Quality Commands

```bash
npm run contracts:validate  # Validate JSON contracts
npm run lhci               # Run Lighthouse CI
npm run a11y               # Run Pa11y accessibility tests
```

## 📐 Contract-Driven Architecture

This project uses a **contract-driven approach** where all components, routes, and design tokens are defined in JSON contracts first, then implemented.

### Example: Button Contract

```json
{
  "component": "Button",
  "props": {
    "variant": ["primary", "secondary", "accent"],
    "size": ["sm", "md", "lg"]
  },
  "accessibility": {
    "wcag": "2.2 AA",
    "requirements": ["Minimum touch target: 44×44px"]
  }
}
```

Contracts ensure:
- **Consistency**: Single source of truth for design decisions
- **Documentation**: Self-documenting component APIs
- **Validation**: Automated checks for compliance
- **Collaboration**: Clear handoff between design and development

## 🎨 Design Tokens

Three-tier token system:

1. **Primitives** (`contracts/tokens/primitives.json`): Brand constants (colors, spacing, fonts)
2. **Semantic** (`contracts/tokens/semantic.json`): Purpose-driven (text-primary, bg-brand)
3. **Components** (`contracts/tokens/components.json`): Component-specific (button-primary-bg)

Tokens are compiled to CSS variables in `src/styles/tokens.css`.

## ♿ Accessibility

WCAG 2.2 AA compliant:

- ✅ Semantic HTML5 landmarks
- ✅ ARIA labels and roles
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Focus indicators (2px visible outline)
- ✅ Color contrast ≥4.5:1
- ✅ Minimum touch targets: 44×44px
- ✅ Skip to content link
- ✅ Screen reader tested
- ✅ Reduced motion support

Automated testing with Pa11y ensures continued compliance.

## 🔒 Security

Security-first approach:

- **CSP**: Strict Content Security Policy (no `unsafe-*`)
- **HSTS**: HTTP Strict Transport Security with preload
- **SRI**: Subresource Integrity for all assets
- **Headers**: X-Frame-Options: DENY, X-Content-Type-Options: nosniff
- **No inline scripts/styles**: All external with integrity hashes
- **Form validation**: Client + server-side validation
- **Honeypot**: Spam protection in contact form

## 🚀 Performance

Target metrics (Core Web Vitals):

- **LCP** (Largest Contentful Paint): ≤2.5s ✅
- **CLS** (Cumulative Layout Shift): ≤0.1 ✅
- **INP** (Interaction to Next Paint): ≤200ms ✅
- **FCP** (First Contentful Paint): ≤1.8s ✅

Optimizations:
- Static HTML generation (Astro)
- Minimal JavaScript (< 10KB)
- CSS minification with Lightning CSS
- Image optimization (WebP, AVIF)
- Preconnect to critical origins
- Critical CSS inlined

## 🌐 Deployment

### Netlify (Recommended)

1. **Connect Repository**:
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

2. **Configure Build**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

3. **Environment Variables** (if needed):
   - Set in Netlify Dashboard → Site settings → Environment variables

4. **Deploy**:
   - Push to `main` branch triggers automatic deployment
   - GitHub Actions runs quality gates first

### Manual Build

```bash
# Build for production
npm run build

# Preview locally
npm run preview

# Deploy dist/ folder to any static host
```

## 📝 Content Management

### Updating Content

1. **Pages**: Edit `.astro` files in `src/pages/`
2. **Components**: Edit `.astro` files in `src/components/`
3. **SEO**: Update `contracts/routes/seo.routes.json`
4. **Design Tokens**: Update JSON files in `contracts/tokens/`

### Adding New Pages

1. Create `.astro` file in `src/pages/`
2. Add SEO metadata to `contracts/routes/seo.routes.json`
3. Update navigation in `src/components/Navigation.astro`
4. Add to sitemap (automatic with Astro)

## 🧪 Testing

### Automated Tests

CI pipeline runs on every commit:

1. **TypeScript**: `npm run typecheck`
2. **Contracts**: `npm run contracts:validate`
3. **Linting**: `npm run lint`
4. **Build**: `npm run build`
5. **Lighthouse**: Performance, accessibility, SEO, best practices
6. **Pa11y**: WCAG 2.2 AA compliance

### Manual Testing Checklist

- [ ] Test all forms (contact form validation)
- [ ] Test navigation (mobile & desktop)
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Test screen reader (VoiceOver, NVDA)
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test responsive breakpoints (mobile, tablet, desktop)
- [ ] Verify all links work
- [ ] Check print styles

## 📊 Quality Gates

Deployments are **blocked** if any of these fail:

| Gate | Tool | Threshold | Blocking |
|------|------|-----------|----------|
| Performance | Lighthouse | ≥90/100 | ✅ |
| Accessibility | Lighthouse | ≥95/100 | ✅ |
| Best Practices | Lighthouse | ≥90/100 | ✅ |
| SEO | Lighthouse | ≥95/100 | ✅ |
| A11y (WCAG 2.2) | Pa11y | 0 errors | ✅ |
| Type Safety | TypeScript | 0 errors | ✅ |
| Contracts | Custom | Valid JSON | ✅ |

## 🔧 Configuration

### Environment Variables

Create `.env` file for local development:

```env
# Site URL (for canonical URLs and Open Graph)
PUBLIC_SITE_URL=https://memobaut.com

# Contact form endpoint (Netlify Function)
PUBLIC_CONTACT_ENDPOINT=/.netlify/functions/contact
```

### Netlify Configuration

See `netlify.toml` for:
- Build settings
- Security headers
- Redirects
- Asset processing

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json dist .astro
npm install
npm run build
```

### TypeScript Errors

```bash
# Run type check to see all errors
npm run typecheck
```

### Lighthouse Fails

```bash
# Run locally to debug
npm run build
npm run preview
npm run lhci
```

## 📚 Additional Documentation

- **IMPLEMENTATION-SUMMARY.md**: Detailed technical implementation guide
- **MEMOBAUT-PROJECT-PLAN.md**: Original project plan and architecture
- **contracts/**: All design and component contracts

## 👥 Team

- **Project**: memobaut Bauunternehmen
- **Website**: https://memobaut.com
- **Contact**: info@memobaut.com

## 📄 License

PROPRIETARY - All rights reserved by memobaut.

---

**Built with ❤️ using modern web standards**
