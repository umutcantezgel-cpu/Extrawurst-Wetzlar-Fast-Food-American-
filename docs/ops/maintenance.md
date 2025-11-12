# Maintenance Runbook

**Project:** Extrawurst Wetzlar Website

## Regular Maintenance Tasks

### Weekly Tasks

#### 1. Performance Monitoring

```bash
# Check latest Lighthouse scores
# Via GitHub Actions or Lighthouse CI

# Check Core Web Vitals
# Via Chrome DevTools or RUM tool
```

**Expected:** All green (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1)

#### 2. Uptime Verification

- Check uptime monitoring service
- Verify 99.9% uptime maintained
- Review any incidents

---

### Monthly Tasks

#### 1. Dependency Updates

```bash
# Check for outdated packages
npm outdated

# Update non-breaking changes
npm update

# Review and test
npm test

# Commit and deploy
git add package*.json
git commit -m "chore: update dependencies"
git push
```

#### 2. Security Audit

```bash
# Run npm audit
npm audit

# Fix vulnerabilities
npm audit fix

# If manual intervention needed
npm audit fix --force  # (use with caution)

# Test after fixes
npm test
npm run build
```

#### 3. Accessibility Check

```bash
# Run Pa11y
npm run a11y

# Review report in docs/reports/
```

**Expected:** 0 critical, 0 serious issues

---

### Quarterly Tasks

#### 1. Full Quality Review

```bash
# Run all tests
npm test

# Generate reports
npm run lhci
npm run a11y
npm run security

# Review reports in docs/reports/
```

#### 2. Content Review

- [ ] Review all page content for accuracy
- [ ] Update opening hours if changed
- [ ] Update menu prices if changed
- [ ] Verify contact information
- [ ] Check all links (internal & external)

#### 3. Legal Compliance

- [ ] Review Datenschutzerklärung (DSGVO changes?)
- [ ] Verify Impressum accuracy
- [ ] Check consent banner functionality
- [ ] Review cookie usage

#### 4. SLO Review

- Review all SLOs in [SLOs.md](SLOs.md)
- Update targets if needed
- Document any violations and remediation

---

### Annual Tasks

#### 1. Comprehensive Security Audit

```bash
# Full security scan
npm audit

# Review all security headers
# Check SecurityHeaders.com score

# Verify SRI coverage
npm run sri:verify

# Check CSP reports (if logging enabled)
```

#### 2. Accessibility Audit

- Full WCAG 2.2 AA audit
- Manual testing with screen readers
- Keyboard navigation testing
- Update components if needed

#### 3. Performance Optimization

- Review all images (compression, format)
- Check font loading strategy
- Analyze JavaScript bundle size
- Test on various devices/networks

#### 4. SEO Review

- Check Google Search Console
- Review structured data
- Update sitemap if needed
- Verify all meta tags current

---

## Maintenance Mode

### Entering Maintenance Mode

1. **Notify users (optional):**
   ```bash
   # Add banner to site
   # Or use 503 page
   ```

2. **Deploy 503 page:**
   ```bash
   # Manually serve 503.html
   # Or configure via hosting provider
   ```

3. **Perform maintenance:**
   - Update dependencies
   - Make necessary changes
   - Run full test suite

4. **Exit maintenance mode:**
   ```bash
   # Deploy updated site
   git push origin main
   ```

### Emergency Maintenance

If critical issue found:

1. **Assess severity:**
   - Security vulnerability: Immediate
   - Performance issue: Within 24h
   - Content error: Within 1 week

2. **Create hotfix branch:**
   ```bash
   git checkout -b hotfix/issue-description
   ```

3. **Fix and test:**
   ```bash
   npm test
   npm run build
   ```

4. **Deploy:**
   ```bash
   git push origin hotfix/issue-description
   # Create PR and merge
   ```

---

## Rollback Procedure

### Via Git

```bash
# Find commit to revert to
git log --oneline

# Revert to previous commit
git revert HEAD

# Or revert multiple commits
git revert HEAD~3..HEAD

# Push
git push origin main
```

### Via Hosting Provider

```bash
# Netlify
netlify rollback

# Vercel
vercel rollback [deployment-url]
```

---

## Backup & Disaster Recovery

### Source Code Backup

- **Primary:** GitHub repository
- **Backup:** Local clones
- **Frequency:** Real-time (Git)

### Recovery Steps

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd Extrawurst-Wetzlar-Fast-Food-American-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build:**
   ```bash
   npm run build
   ```

4. **Deploy:**
   ```bash
   # Via hosting provider CLI
   netlify deploy --prod --dir=dist
   ```

**RTO (Recovery Time Objective):** < 1 hour
**RPO (Recovery Point Objective):** < 5 minutes

---

## Maintenance Checklist

### Before Maintenance

- [ ] Notify stakeholders (if significant)
- [ ] Create backup/snapshot
- [ ] Review changes in staging environment
- [ ] Schedule during low-traffic window

### During Maintenance

- [ ] Follow runbook procedures
- [ ] Document any deviations
- [ ] Test thoroughly
- [ ] Monitor error logs

### After Maintenance

- [ ] Verify site functionality
- [ ] Check performance metrics
- [ ] Review monitoring dashboards
- [ ] Document completion
- [ ] Notify stakeholders

---

## Monitoring & Alerts

### Setup Alerts

**Recommended Tools:**
- UptimeRobot (uptime monitoring)
- Lighthouse CI (performance)
- Dependabot (security)

**Alert Thresholds:**
- Site down: Immediate notification
- Performance degradation (> 10%): Email within 1 hour
- Security vulnerability (high/critical): Immediate notification

---

## Contact & Escalation

**Primary Contact:** info@extrawurst-wetzlar.de
**Phone:** +49 6441 123456

**Escalation Path:**
1. Technical team member
2. Project manager
3. Business owner

---

**Last Updated:** 2024-01-15
**Next Review:** 2024-04-15
