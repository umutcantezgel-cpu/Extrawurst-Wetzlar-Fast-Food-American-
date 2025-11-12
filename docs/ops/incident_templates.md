# Incident Response Templates

## Incident Severity Levels

| Level | Description | Response Time | Example |
|-------|-------------|---------------|---------|
| P0 (Critical) | Site down or major security breach | Immediate | Complete outage, data breach |
| P1 (High) | Significant functionality broken | < 2 hours | Forms broken, major pages 404 |
| P2 (Medium) | Degraded performance or minor issues | < 24 hours | Slow load times, styling issues |
| P3 (Low) | Cosmetic issues, minor bugs | < 1 week | Typos, minor layout issues |

---

## Template 1: Site Outage (P0)

### Incident Report

**Incident ID:** INC-YYYY-MM-DD-001
**Severity:** P0 - Critical
**Status:** [Open/In Progress/Resolved]
**Start Time:** YYYY-MM-DD HH:MM UTC
**End Time:** YYYY-MM-DD HH:MM UTC
**Duration:** X hours Y minutes

### Summary

Brief description of the outage.

### Impact

- **Users Affected:** [Number/Percentage]
- **Services Down:** [List affected pages/features]
- **Business Impact:** [Revenue/reputation impact]

### Timeline

| Time (UTC) | Event |
|------------|-------|
| HH:MM | Incident detected |
| HH:MM | Investigation started |
| HH:MM | Root cause identified |
| HH:MM | Fix deployed |
| HH:MM | Incident resolved |

### Root Cause

Detailed explanation of what caused the incident.

### Resolution

Steps taken to resolve the incident.

### Prevention

Actions to prevent recurrence:
- [ ] Action item 1
- [ ] Action item 2
- [ ] Action item 3

### Post-Mortem

**What went well:**
- ...

**What went wrong:**
- ...

**Action items:**
- [ ] Implement monitoring for X
- [ ] Update runbook
- [ ] Add automated test for Y

---

## Template 2: Performance Degradation (P1/P2)

### Incident Report

**Incident ID:** INC-YYYY-MM-DD-002
**Severity:** P2 - Medium
**Status:** [Open/In Progress/Resolved]
**Detected:** YYYY-MM-DD HH:MM UTC

### Symptoms

- [ ] LCP > 2.5s
- [ ] INP > 200ms
- [ ] CLS > 0.1
- [ ] Lighthouse score < 95
- [ ] Other: ___________

### Measurements

| Metric | Before | After | Target |
|--------|--------|-------|--------|
| LCP | X.Xs | X.Xs | ≤ 2.5s |
| INP | Xms | Xms | ≤ 200ms |
| CLS | X.XX | X.XX | ≤ 0.1 |

### Investigation

**Potential Causes:**
- [ ] Large images
- [ ] Unoptimized JavaScript
- [ ] Third-party scripts
- [ ] Server response time
- [ ] Other: ___________

**Tools Used:**
- [ ] Lighthouse
- [ ] Chrome DevTools
- [ ] WebPageTest
- [ ] Other: ___________

### Resolution

Steps taken to improve performance:
1. ...
2. ...
3. ...

### Verification

- [ ] Re-run Lighthouse (score: ___)
- [ ] Verify Core Web Vitals
- [ ] Test on mobile device
- [ ] Test on slow connection

---

## Template 3: Security Incident (P0)

### Incident Report

**Incident ID:** SEC-YYYY-MM-DD-001
**Severity:** P0 - Critical
**Status:** [Open/Contained/Resolved]
**Detected:** YYYY-MM-DD HH:MM UTC

### Incident Type

- [ ] Data breach
- [ ] XSS attack
- [ ] Injection attack
- [ ] Dependency vulnerability
- [ ] Other: ___________

### Scope

- **Systems Affected:** [List]
- **Data Compromised:** [Yes/No - Details]
- **Users Affected:** [Number]

### Immediate Actions

- [ ] Isolate affected systems
- [ ] Disable compromised accounts
- [ ] Enable maintenance mode if needed
- [ ] Notify security team
- [ ] Preserve evidence/logs

### Investigation

**Attack Vector:**
- ...

**Vulnerability Exploited:**
- ...

**Timeline:**
| Time | Event |
|------|-------|
| ... | ... |

### Containment

Actions taken to contain the incident:
1. ...
2. ...

### Remediation

Steps to fix the vulnerability:
1. ...
2. ...

### Recovery

Steps to restore normal operations:
1. ...
2. ...

### Notifications

- [ ] Internal stakeholders
- [ ] Affected users (if applicable)
- [ ] Authorities (if required by DSGVO)
- [ ] Data protection officer

### Prevention

- [ ] Update security policies
- [ ] Add monitoring/alerting
- [ ] Update incident response plan
- [ ] Conduct security training

---

## Template 4: Accessibility Issue (P1)

### Incident Report

**Incident ID:** A11Y-YYYY-MM-DD-001
**Severity:** P1 - High
**Status:** [Open/In Progress/Resolved]

### Issue Description

Description of accessibility barrier.

### WCAG Violation

- **Level:** [A/AA/AAA]
- **Criterion:** [e.g., 1.4.3 Contrast]
- **Priority:** [Critical/Serious/Moderate/Minor]

### User Impact

- **Affected Users:** [e.g., screen reader users, keyboard-only users]
- **Pages Affected:** [List]

### Detection

- **Source:** [Pa11y/Manual test/User report]
- **Date:** YYYY-MM-DD

### Resolution

Steps to fix:
1. ...
2. ...

### Verification

- [ ] Re-run Pa11y (0 issues)
- [ ] Manual testing with screen reader
- [ ] Keyboard navigation testing
- [ ] Update tests to prevent regression

---

## Incident Response Checklist

### Immediate (0-30 minutes)

- [ ] Acknowledge incident
- [ ] Assess severity
- [ ] Notify relevant stakeholders
- [ ] Begin investigation
- [ ] Document timeline

### Short-term (30 minutes - 4 hours)

- [ ] Identify root cause
- [ ] Implement fix or workaround
- [ ] Test fix in staging
- [ ] Deploy to production
- [ ] Verify resolution

### Long-term (4+ hours)

- [ ] Complete incident report
- [ ] Conduct post-mortem
- [ ] Implement preventive measures
- [ ] Update documentation
- [ ] Update monitoring/alerts

---

**Last Updated:** 2024-01-15
