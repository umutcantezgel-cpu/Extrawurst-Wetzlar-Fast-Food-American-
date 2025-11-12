# Operations Manual

**Project:** Extrawurst Wetzlar Website
**Version:** 1.0.0

## Overview

This operations manual provides guidance for running, monitoring, and maintaining the Extrawurst Wetzlar website in production.

## Contents

1. [SLO Catalog](SLOs.md) - Service Level Objectives
2. [Incident Response](incident_templates.md) - Incident templates and procedures
3. [Maintenance](maintenance.md) - Maintenance runbooks

## Quick Reference

### Health Check

```bash
curl https://extrawurst-wetzlar.de/health
```

Expected response: `200 OK`

### Deploy

```bash
git push origin main
# CI/CD pipeline will run automatically
# Monitor at: https://github.com/<org>/<repo>/actions
```

### Rollback

```bash
# Via Netlify UI
netlify rollback

# Or redeploy previous commit
git revert HEAD
git push origin main
```

## Emergency Contacts

- **Primary:** info@extrawurst-wetzlar.de
- **Phone:** +49 6441 123456
- **Hosting:** Netlify Support (if using Netlify)

## Monitoring Dashboards

- **Lighthouse CI:** Check GitHub Actions
- **Uptime:** Configure with service like UptimeRobot
- **Analytics:** (TBD if analytics are added with consent)

## Common Issues

### Site Down (503)

1. Check hosting provider status
2. Check CI/CD pipeline for failed deployments
3. Review recent commits
4. Roll back if needed

### Performance Degradation

1. Run Lighthouse audit
2. Check Core Web Vitals in Chrome DevTools
3. Review recent changes
4. Check third-party embeds (if consent given)

### Security Alert

1. Run `npm audit`
2. Update vulnerable dependencies: `npm audit fix`
3. Test locally
4. Deploy fix

## Maintenance Windows

**Recommended:** Tuesday 02:00-04:00 CET (lowest traffic)

**Notification:** Update `503.html` with expected return time

## Backup & Recovery

**Static Site:** All source code in Git repository
**Recovery Time Objective (RTO):** < 1 hour
**Recovery Point Objective (RPO):** < 5 minutes (via Git)

## Change Management

1. Create feature branch
2. Make changes
3. Run tests locally: `npm test`
4. Create pull request
5. CI/CD runs quality gates
6. Merge to main after approval
7. Automatic deployment

## Compliance

- **DSGVO:** Review consent settings quarterly
- **Security:** Update dependencies monthly
- **Accessibility:** Re-audit annually with Pa11y

---

For detailed procedures, see linked documents above.
