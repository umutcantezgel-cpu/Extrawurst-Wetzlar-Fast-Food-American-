# Deployment Guide - memobaut.com

Complete guide for deploying memobaut.com to production.

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All content placeholders replaced with actual data
- [ ] Contact information verified
- [ ] Legal pages (Impressum, Datenschutz) reviewed by legal team
- [ ] All images optimized and added
- [ ] SEO metadata complete
- [ ] All quality gates passing locally
- [ ] DNS records ready (if new domain)

## Deployment Options

### Option 1: Netlify (Recommended)

#### Initial Setup

1. **Create Netlify Account**:
   - Go to https://app.netlify.com/signup
   - Sign up with GitHub (recommended) or email

2. **Connect Repository**:
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Authorize Netlify
   - Select your repository

3. **Configure Build Settings**:
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Set Environment Variables** (if needed):
   - Go to Site settings → Environment variables
   - Add any required variables:
     ```
     PUBLIC_SITE_URL=https://memobaut.com
     ```

5. **Deploy**:
   - Click "Deploy site"
   - Wait for build to complete (~2-3 minutes)
   - Site will be live at `https://random-name-123.netlify.app`

#### Custom Domain Setup

1. **Add Custom Domain**:
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter: `memobaut.com`
   - Click "Verify"

2. **Configure DNS**:

   **Option A: Netlify DNS (Recommended)**:
   - Transfer nameservers to Netlify
   - Netlify automatically configures all records
   - Automatic HTTPS with Let's Encrypt

   **Option B: External DNS**:
   - Add these records to your DNS provider:
   ```
   Type    Name    Value
   A       @       75.2.60.5
   CNAME   www     random-name-123.netlify.app
   ```

3. **Enable HTTPS**:
   - Go to Site settings → Domain management → HTTPS
   - Click "Verify DNS configuration"
   - Click "Provision certificate"
   - Wait ~1 minute for SSL certificate

4. **Force HTTPS**:
   - Enable "Force HTTPS" toggle
   - All HTTP requests will redirect to HTTPS

#### GitHub Integration

Netlify automatically deploys when you push to the main branch:

```bash
git add .
git commit -m "Update content"
git push origin main
# → Triggers automatic deployment
```

**Branch Deploys**:
- `main` branch → Production (memobaut.com)
- Pull requests → Preview deploys
- Other branches → Branch deploys (optional)

#### Environment-Specific Config

**Production**:
- Branch: `main`
- URL: `https://memobaut.com`
- Build command: `npm run build`

**Staging** (optional):
- Branch: `develop`
- URL: `https://staging--memobaut.netlify.app`
- Build command: `npm run build`

### Option 2: Other Static Hosts

#### Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

#### Cloudflare Pages

1. Connect GitHub repository
2. Build command: `npm run build`
3. Output directory: `dist`

#### GitHub Pages

```bash
# Build locally
npm run build

# Deploy to gh-pages branch
npm install -D gh-pages
npx gh-pages -d dist
```

## CI/CD Pipeline

### GitHub Actions Workflows

Two workflows are configured:

#### 1. CI Workflow (`.github/workflows/ci.yml`)

Runs on every push and pull request:

1. **Type Check**: Validates TypeScript
2. **Contract Validation**: Checks JSON contracts
3. **Lint**: Code quality checks
4. **Build**: Production build
5. **Lighthouse**: Performance tests (BLOCKING)
6. **Pa11y**: Accessibility tests (BLOCKING)

**Quality Gates** (must pass):
- Performance ≥90/100
- Accessibility ≥95/100
- Best Practices ≥90/100
- SEO ≥95/100
- WCAG 2.2 AA: 0 errors

#### 2. Deploy Workflow (`.github/workflows/deploy.yml`)

Runs when pushing to `main` branch:

1. Build project
2. Deploy to Netlify

### Required GitHub Secrets

Add these secrets in GitHub repo settings:

1. **NETLIFY_AUTH_TOKEN**:
   - Go to https://app.netlify.com/user/applications#personal-access-tokens
   - Click "New access token"
   - Name: "GitHub Actions"
   - Copy token
   - Add to GitHub: Settings → Secrets → New repository secret

2. **NETLIFY_SITE_ID**:
   - Go to your Netlify site
   - Site settings → General → Site details
   - Copy "Site ID"
   - Add to GitHub secrets

## Post-Deployment

### Verify Deployment

1. **Check Site**:
   - Visit https://memobaut.com
   - Test all pages
   - Verify contact form
   - Check mobile responsiveness

2. **Run Quality Checks**:
   ```bash
   # Lighthouse (production URL)
   npx lighthouse https://memobaut.com --view

   # Check security headers
   curl -I https://memobaut.com
   ```

3. **Test Core Features**:
   - [ ] Navigation works (all links)
   - [ ] Contact form submits
   - [ ] Mobile menu functions
   - [ ] Images load correctly
   - [ ] SSL certificate valid
   - [ ] Redirects work (HTTP → HTTPS, www → non-www)

### SEO Setup

1. **Google Search Console**:
   - Go to https://search.google.com/search-console
   - Add property: `memobaut.com`
   - Verify ownership (DNS TXT record or HTML file)
   - Submit sitemap: `https://memobaut.com/sitemap-index.xml`

2. **Google Analytics** (optional):
   - Create GA4 property
   - Add tracking code to `BaseLayout.astro`
   - Verify tracking

3. **Google Business Profile**:
   - Claim business listing
   - Add photos and information
   - Link to website

### Security Headers

Verify these headers are present (via Netlify):

```bash
curl -I https://memobaut.com

# Should include:
Content-Security-Policy: default-src 'self'; ...
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## Monitoring

### Uptime Monitoring

**Option 1: Netlify Analytics** (Paid):
- Enable in Site settings → Analytics
- Tracks visitors, bandwidth, performance

**Option 2: External Service**:
- [UptimeRobot](https://uptimerobot.com) (Free)
- [Pingdom](https://www.pingdom.com)
- [StatusCake](https://www.statuscake.com)

### Performance Monitoring

**Lighthouse CI** (Automated):
- Runs on every deployment
- Results in GitHub Actions artifacts

**PageSpeed Insights** (Manual):
- https://pagespeed.web.dev
- Test: `https://memobaut.com`

**WebPageTest** (Manual):
- https://www.webpagetest.org
- Detailed performance analysis

## Rollback Procedure

### Via Netlify UI

1. Go to Deploys tab
2. Find previous successful deploy
3. Click "Publish deploy"
4. Confirm rollback

### Via Git

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force origin main
```

## Troubleshooting

### Build Fails on Netlify

1. **Check build logs**:
   - Go to Deploys → Failed deploy
   - Click "Deploy log"
   - Look for error message

2. **Common issues**:
   - Missing environment variables
   - Node version mismatch
   - Dependency issues

3. **Fix**:
   ```bash
   # Test build locally
   npm run build

   # Check Node version
   node --version # Should be 18.x
   ```

### Site Not Loading

1. **Check DNS**:
   ```bash
   dig memobaut.com
   # Should resolve to Netlify IP
   ```

2. **Check SSL**:
   ```bash
   curl -I https://memobaut.com
   # Should return 200 OK
   ```

3. **Check Netlify status**:
   - https://www.netlifystatus.com

### Contact Form Not Working

1. **Check Netlify Function**:
   - Create `.netlify/functions/contact.js`
   - Or configure Netlify Forms

2. **Verify endpoint**:
   ```bash
   curl -X POST https://memobaut.com/.netlify/functions/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test"}'
   ```

## Maintenance

### Regular Tasks

**Weekly**:
- [ ] Check uptime reports
- [ ] Monitor form submissions
- [ ] Review analytics

**Monthly**:
- [ ] Update dependencies: `npm outdated`
- [ ] Run security audit: `npm audit`
- [ ] Review performance metrics
- [ ] Check broken links

**Quarterly**:
- [ ] Update content
- [ ] Refresh project references
- [ ] Review SEO rankings
- [ ] Audit accessibility

### Dependency Updates

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Major version updates (careful!)
npx npm-check-updates -u
npm install

# Run tests after updates
npm run test
npm run build
```

## Support Contacts

- **Hosting**: Netlify Support (support@netlify.com)
- **Domain**: Your domain registrar
- **Development**: [Your contact info]

## Resources

- **Netlify Docs**: https://docs.netlify.com
- **Astro Docs**: https://docs.astro.build
- **Lighthouse**: https://developer.chrome.com/docs/lighthouse
- **Web.dev**: https://web.dev
