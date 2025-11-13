# Deployment Checklist - memobaut.com

## Pre-Deployment

- [ ] All content placeholders replaced with actual data
- [ ] Contact information verified (phone, address, email)
- [ ] Legal pages reviewed (Impressum, Datenschutz)
- [ ] Images optimized and added
- [ ] Logo files in place (favicon, apple-touch-icon)
- [ ] Environment variables documented
- [ ] Build successful locally: `npm run build`

## Netlify Setup

- [ ] Netlify account created
- [ ] Repository connected to Netlify
- [ ] Build settings configured:
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Node version: 18.x
- [ ] Environment variables set (if any)
- [ ] Custom domain configured: `memobaut.com`
- [ ] DNS records updated:
  - A record: @ → Netlify IP
  - CNAME record: www → Netlify subdomain
- [ ] SSL certificate provisioned
- [ ] Force HTTPS enabled
- [ ] Redirects verified (HTTP → HTTPS, www → non-www)

## Post-Deployment

- [ ] Website loads at https://memobaut.com
- [ ] All pages accessible
- [ ] Contact form functional
- [ ] Mobile menu works
- [ ] Navigation links work
- [ ] Images load correctly
- [ ] SSL certificate valid (green padlock)
- [ ] Security headers present (check with `curl -I`)
- [ ] Sitemap accessible: /sitemap-index.xml
- [ ] Robots.txt accessible: /robots.txt

## SEO Setup

- [ ] Google Search Console configured
- [ ] Sitemap submitted to Google
- [ ] Google Analytics setup (if applicable)
- [ ] Google Business Profile claimed and linked
- [ ] Social media meta tags verified (Open Graph, Twitter Cards)

## Monitoring

- [ ] Uptime monitoring configured
- [ ] Performance monitoring setup (Lighthouse CI in GitHub Actions)
- [ ] Error tracking setup (optional: Sentry)
- [ ] Analytics tracking verified

## Quality Verification

- [ ] Lighthouse score ≥90 (Performance)
- [ ] Lighthouse score ≥95 (Accessibility)
- [ ] Lighthouse score ≥90 (Best Practices)
- [ ] Lighthouse score ≥95 (SEO)
- [ ] Pa11y: 0 accessibility errors
- [ ] All links working (no 404s)
- [ ] Forms validated and functional
- [ ] Responsive design verified (mobile, tablet, desktop)

## Documentation

- [ ] README.md updated with deployment URL
- [ ] Team notified of deployment
- [ ] Access credentials documented (securely)
- [ ] Maintenance schedule defined

---

**Deployment Date:** _____________
**Deployed By:** _____________
**Production URL:** https://memobaut.com
**Status:** ⬜ Success ⬜ Issues (describe below)

**Notes:**
