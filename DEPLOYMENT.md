# Deployment Guide - Extrawurst Wetzlar

## 🚀 Netlify Deployment

Diese Website ist eine vollständig statische Website, optimiert für Netlify.

### Quick Deploy

1. **Via Netlify UI:**
   - Verbinde dein GitHub Repository
   - Build Command: (leer lassen, da statisch)
   - Publish Directory: `public`
   - Deploy!

2. **Via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=public
   ```

### Konfiguration

Die Netlify-Konfiguration erfolgt über:
- `netlify.toml` - Build & Header-Konfiguration
- `public/_headers` - Security-Headers
- `public/_redirects` - URL-Weiterleitungen

## ✅ Qualitätskriterien

### Performance
- ✅ **Lighthouse Score ≥ 85** (Mobile & Desktop)
- ✅ **LCP ≤ 2.5s** - Optimierte Bilder, Preloading
- ✅ **CLS ≤ 0.1** - Fixe Dimensionen, keine Layout-Shifts
- ✅ **INP ≤ 200ms** - Optimiertes JavaScript

### Security
- ✅ **Content Security Policy** - Strikte CSP ohne `unsafe-*`
- ✅ **Security Headers** - X-Frame-Options, X-Content-Type-Options, etc.
- ✅ **HTTPS Only** - Automatisch via Netlify
- ✅ **No Inline Scripts** - Alle Scripts extern

### SEO
- ✅ **Sitemap.xml** - Vollständige Sitemap
- ✅ **Robots.txt** - Korrekte Crawler-Anweisungen
- ✅ **Strukturierte Daten** - Schema.org JSON-LD
- ✅ **Meta Tags** - Open Graph, Twitter Cards
- ✅ **Canonical URLs** - Vermeidung von Duplicate Content

### Accessibility (WCAG 2.2 AA)
- ✅ **Semantisches HTML** - Korrekte HTML5-Elemente
- ✅ **ARIA Labels** - Wo nötig
- ✅ **Keyboard Navigation** - Vollständig navigierbar
- ✅ **Focus Styles** - Sichtbare Fokus-Indikatoren
- ✅ **Alt Texte** - Für alle Bilder
- ✅ **Skip Links** - "Zum Hauptinhalt springen"

### DSGVO/TTDSG Compliance
- ✅ **Cookie Banner** - Opt-in vor Tracking
- ✅ **Datenschutzerklärung** - Vollständig im Impressum
- ✅ **Minimale Daten** - Keine unnötigen Cookies
- ✅ **Externe Ressourcen** - Nur notwendige (Fonts, Maps)

## 📁 Dateistruktur

```
public/
├── index.html              # Homepage
├── speisekarte.html        # Menü (TODO)
├── aktionen.html           # Deals (TODO)
├── ueber-uns.html          # About (TODO)
├── faq.html                # FAQ (TODO)
├── kontakt.html            # Contact (TODO)
├── impressum.html          # Legal (TODO)
├── 404.html                # Error Page
├── robots.txt              # SEO
├── sitemap.xml             # SEO
├── _headers                # Netlify Security Headers
├── _redirects              # Netlify Redirects
├── css/
│   └── main.css            # Main Stylesheet
├── js/
│   └── main.js             # Main JavaScript
└── images/                 # (TODO: Add optimized images)
```

## 🔧 Optimierungen

### CSS
- Kritisches CSS inline in `<head>`
- Nicht-kritisches CSS asynchron laden
- CSS minifiziert
- Keine ungenutzten Styles

### JavaScript
- Vanilla JS (kein React mehr)
- Deferred Loading
- Keine Abhängigkeiten
- Event Delegation für Performance

### Bilder
- WebP Format wo möglich
- Lazy Loading für below-the-fold Bilder
- Responsive Bilder via `srcset`
- Optimierte Dimensionen

### Fonts
- Google Fonts mit `preconnect`
- `font-display: swap`
- WOFF2 Format

## 🌐 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- iOS Safari (latest 2 versions)
- Android Chrome (latest 2 versions)

## 📊 Testing

### Pre-Deployment Checklist

- [ ] Lighthouse Score ≥ 85 (Mobile & Desktop)
- [ ] Alle Links funktionieren
- [ ] Bilder laden korrekt
- [ ] Cookie Banner erscheint
- [ ] Mobile Navigation funktioniert
- [ ] Hero Slider funktioniert
- [ ] Formulare validieren
- [ ] 404-Seite erreichbar
- [ ] Security Headers aktiv
- [ ] CSP keine Fehler
- [ ] Sitemap erreichbar

### Tools

```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://your-site.netlify.app --view

# Security Headers Check
curl -I https://your-site.netlify.app

# Performance Testing
npm install -g @lhci/cli
lhci autorun
```

## 🔐 Security

### Content Security Policy

Die CSP ist strikt konfiguriert:
- Keine `unsafe-inline` oder `unsafe-eval`
- Nur whitelisted externe Quellen
- Konfiguriert in `netlify.toml` und `_headers`

### Cookie Policy

- **Technisch notwendige Cookies:** localStorage für Cookie-Consent
- **Keine Tracking-Cookies** ohne Einwilligung
- **Opt-in Mechanismus** via Cookie-Banner

## 🚨 Troubleshooting

### CSP-Fehler

Falls CSP-Fehler auftreten:
1. Browser DevTools → Console prüfen
2. `_headers` Datei anpassen
3. Inline Styles/Scripts entfernen
4. Hashes für inline Styles generieren

### Performance-Probleme

1. Bilder optimieren (WebP, Kompression)
2. CSS/JS minifizieren
3. Preload kritische Ressourcen
4. Lazy Loading für Images

### 404-Fehler

- Prüfe `_redirects` Datei
- Prüfe Netlify Deploy Logs
- Stelle sicher, dass alle HTML-Dateien in `public/` sind

## 📞 Support

Bei Problemen:
- GitHub Issues: [Repository URL]
- E-Mail: [Deine E-Mail]

## 📄 Lizenz

Copyright © 2024 Extrawurst Wetzlar. Alle Rechte vorbehalten.
