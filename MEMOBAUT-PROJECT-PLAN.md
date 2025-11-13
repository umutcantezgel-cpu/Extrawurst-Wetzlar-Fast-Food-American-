# memobaut.com - Vollständiger Projekt-Plan

**Status:** 🚧 In Umsetzung
**Datum:** 2025-11-13
**Architektur:** Astro + Tailwind + TypeScript

---

## ⚠️ Kritische Info: Original-Website nicht erreichbar

**Problem:** memobaut.com liefert 503 Service Unavailable
**Lösung:** Architektur mit intelligenten Defaults + Placeholder-Content
**Migration-Path:** Vollständig dokumentiert für späteren Content-Import

---

## 1. Angenommene Informationsarchitektur

### Firmenprofil (geschätzt)
- **Name:** Memo Bau / memobaut
- **Branche:** Bauunternehmen / Handwerk
- **Zielgruppe:** B2C (Hausbau, Renovierung) & B2B (Gewerbebau)
- **Region:** Deutschland (vermutlich lokal/regional)

### Sitemap (Soll)

#### Hauptseiten (Pflicht)
1. **Home** (`/`)
   - Hero mit USP
   - Leistungsübersicht (3-4 Hauptbereiche)
   - Referenzprojekte-Teaser
   - Vertrauensindikatoren (Jahre Erfahrung, Projekte, Team)
   - CTA zu Kontakt

2. **Leistungen** (`/leistungen/`)
   - Übersichtsseite mit Kategorien
   - Detail-Unterseiten:
     - `/leistungen/neubau/`
     - `/leistungen/sanierung/`
     - `/leistungen/umbau/`
     - `/leistungen/gewerbebau/`

3. **Referenzen** (`/referenzen/`)
   - Projekt-Galerie (Grid)
   - Filter nach Kategorie
   - Lightbox für Bilder
   - Projekt-Details (Umfang, Jahr, Ort)

4. **Über uns** (`/ueber-uns/`)
   - Firmengeschichte
   - Team-Vorstellung
   - Werte & Philosophie
   - Zertifikate/Qualifikationen

5. **Kontakt** (`/kontakt/`)
   - Kontaktformular (Honeypot + Server-Validierung)
   - Firmendaten (NAP für Local SEO)
   - Karte (Two-Click-Embed)
   - Öffnungszeiten

#### Legal-Seiten (Pflicht)
6. **Impressum** (`/impressum/`)
7. **Datenschutz** (`/datenschutz/`)

#### System-Seiten
8. **404** (`/404.html`)
9. **503 Wartung** (`/503.html`)
10. **Offline** (`/offline.html`)

#### Optional (später)
- Blog/News (`/aktuelles/`)
- Karriere (`/karriere/`)
- FAQs (`/faq/`)
- Download-Center (`/downloads/`)

---

## 2. Design-System (Brand-Extraktion)

### Farben (Placeholder - zu ersetzen)
**Primär:**
- Brand Primary: `#1E40AF` (Blau - typisch Baubranche)
- Brand Secondary: `#F59E0B` (Orange - Akzent)

**Neutral:**
- Text: `#1F2937` (Dunkelgrau)
- Background: `#FFFFFF` (Weiß)
- Gray-50 bis Gray-900 (Tailwind Palette)

**Funktional:**
- Success: `#10B981`
- Error: `#EF4444`
- Warning: `#F59E0B`

### Typografie
**Headlines:** Inter/Poppins Bold
**Body:** Inter Regular
**Mono:** Roboto Mono (für technische Details)

### Spacing
8px-Grid-System (wie Extrawurst)

---

## 3. Content-Platzhalter

### Hero (Homepage)
**H1:** "Qualität im Bauwesen seit [JAHR]"
**Subline:** "Von der Planung bis zur Schlüsselübergabe - Ihr zuverlässiger Partner für Neubau, Sanierung und Umbau"
**CTA:** "Projekt anfragen"

### Leistungen (Übersicht)
1. **Neubau**
   - Einfamilienhäuser
   - Mehrfamilienhäuser
   - Gewerbeobjekte

2. **Sanierung**
   - Altbausanierung
   - Energetische Sanierung
   - Denkmalschutz

3. **Umbau**
   - Modernisierung
   - Anbau
   - Dachausbau

4. **Gewerbebau**
   - Bürogebäude
   - Lagerhallen
   - Produktionsstätten

### Über uns
**Mission:** "Wir bauen Träume - mit Expertise, Leidenschaft und Präzision"
**Team:** [Placeholder: Geschäftsführer, Bauleiter, Architekten]
**Werte:** Qualität, Zuverlässigkeit, Transparenz, Nachhaltigkeit

### Kontakt (NAP)
**Name:** memobaut [Vollständiger Firmenname TBD]
**Adresse:** [Straße, PLZ Ort] - TO BE PROVIDED
**Telefon:** [Telefonnummer] - TO BE PROVIDED
**Email:** info@memobaut.com

---

## 4. Technische Spezifikation

### Stack
- **Framework:** Astro 4.x (Static Site Generator)
- **Styling:** Tailwind CSS 3.x + PostCSS
- **Scripting:** TypeScript (ESM)
- **Forms:** Netlify Forms + Serverless Function
- **Images:** Optimized (WebP/AVIF), Responsive Srcset
- **CI/CD:** GitHub Actions
- **Deployment:** Netlify

### Performance-Budgets
- **LCP:** ≤2.5s (mobil)
- **CLS:** ≤0.1
- **INP:** ≤200ms
- **JavaScript:** ≤50KB initial
- **CSS:** ≤60KB

### Security
- **CSP:** Strict (no unsafe-*)
- **HSTS:** max-age=31536000; includeSubDomains; preload
- **SRI:** Alle CSS/JS/Fonts
- **Trusted Types:** Enabled
- **Consent:** Two-Click-Embeds, Cookie-Banner mit Reject

### Accessibility
- **WCAG:** 2.2 Level AA
- **Kontraste:** ≥4.5:1 (Text), ≥3:1 (UI)
- **Keyboard:** Vollständig navigierbar
- **Screen Reader:** ARIA-Labels, Landmarks, Live Regions

---

## 5. Vertrags-System (Contract-Driven)

### Komponenten-Contracts
```
/contracts/components/
  - card.contract.json
  - hero.contract.json
  - navigation.contract.json
  - footer.contract.json
  - project-gallery.contract.json
  - contact-form.contract.json
```

### Routen-Contracts
```
/contracts/routes/
  - seo.routes.json (alle Seiten)
  - orchestrator.json (Page Composition)
```

### Design-Tokens
```
/contracts/tokens/
  - primitives.json (Farben, Spacing, Typography)
  - semantic.json (Brand, Feedback, Interactive)
  - components.json (Button, Card, Input, etc.)
```

---

## 6. Ordner-Struktur

```
/memobaut-website/
├── contracts/
│   ├── components/
│   ├── routes/
│   └── tokens/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── ServiceCard.astro
│   │   ├── ProjectGallery.astro
│   │   └── ContactForm.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── leistungen/
│   │   ├── referenzen/
│   │   ├── ueber-uns/
│   │   ├── kontakt/
│   │   ├── impressum.astro
│   │   ├── datenschutz.astro
│   │   └── 404.astro
│   └── styles/
│       ├── tokens.css
│       └── global.css
├── public/
│   ├── assets/
│   │   ├── images/
│   │   ├── fonts/
│   │   └── icons/
│   ├── _headers
│   ├── _redirects
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── gen-sri.js
│   ├── validate-contracts.js
│   └── optimize-images.js
├── docs/
│   ├── content-migration.md
│   ├── deployment-guide.md
│   └── qa-checklist.md
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── astro.config.mjs
├── tailwind.config.mjs
├── netlify.toml
├── package.json
└── README.md
```

---

## 7. CI/CD Pipeline

### GitHub Actions Jobs
1. **Quality Gates** (blocking)
   - TypeScript Check
   - ESLint
   - Contract Validation
   - SRI Verification

2. **Lighthouse CI** (blocking)
   - Performance ≥95
   - Accessibility ≥98
   - Best Practices ≥98
   - SEO ≥95

3. **Accessibility** (blocking)
   - Pa11y: 0 critical/serious
   - Axe-Core scan

4. **Security** (blocking)
   - npm audit (no critical)
   - SBOM generation
   - License check

5. **Build & Deploy**
   - Astro build
   - Deploy to Netlify (Preview für PRs, Production für main)

---

## 8. Content-Migration-Strategie

### Phase 1: Aktuell (Placeholder)
- Generischer Content (beste Practices Baubranche)
- Placeholder-Bilder (mit korrekten Alt-Texten)
- Realistische Struktur

### Phase 2: Migration (wenn memobaut.com verfügbar)
1. **Crawl** der Live-Site
2. **Content-Extraktion:**
   - Texte → Markdown
   - Bilder → /public/assets/images/
   - Metadaten → JSON

3. **Mapping:**
   - Alt → Neu (URL-Struktur)
   - Content-Blöcke → Komponenten

4. **Integration:**
   - Replace Placeholder
   - Preserve Struktur

### Phase 3: Cloud-Content (Dropbox/GDrive)
1. **Manuelle Upload-Workflows:**
   - `/public/assets/cloud/` Ordner
   - Batch-Processing-Scripts

2. **Dokumentierte Prozesse:**
   - Bilder optimieren
   - Metadaten extrahieren
   - Integration in Galerie

---

## 9. Deployment-Checklist

### Pre-Deployment
- [ ] Alle Contracts validiert
- [ ] TypeScript Build erfolgreich
- [ ] Lighthouse CI ≥Zielwerte
- [ ] Pa11y 0 critical/serious
- [ ] Security-Headers konfiguriert
- [ ] Sitemap.xml generiert
- [ ] robots.txt konfiguriert
- [ ] 404/503/offline.html vorhanden

### Deployment
- [ ] Netlify Build erfolgreich
- [ ] Preview-URL getestet
- [ ] DNS vorbereitet (Staging)
- [ ] SSL-Zertifikat aktiv

### Post-Deployment
- [ ] Production-URL getestet
- [ ] Lighthouse auf Live-URL
- [ ] Search Console eingerichtet
- [ ] Analytics konfiguriert (mit Consent)

---

## 10. TODO-Liste (kritische Punkte)

### Sofort (für Placeholder-Version)
- [x] Projekt-Plan erstellen
- [ ] Repo initialisieren
- [ ] Contracts definieren
- [ ] Token-System aufbauen
- [ ] Core-Komponenten implementieren
- [ ] Hauptseiten erstellen
- [ ] CI/CD Pipeline einrichten
- [ ] Netlify konfigurieren

### Nach Content-Verfügbarkeit
- [ ] memobaut.com crawlen (wenn verfügbar)
- [ ] Echten Content migrieren
- [ ] Brand-Farben/Logos extrahieren
- [ ] Firmendaten (NAP) eintragen
- [ ] Referenzprojekte importieren

### Cloud-Integration (manuell)
- [ ] Dropbox-Ordner "Essential" sichten
- [ ] Google Drive "Programmieren/Code" sichten
- [ ] Relevante Dateien selektieren
- [ ] Upload-Workflow dokumentieren
- [ ] Integration in Website

---

## 11. Risiken & Mitigation

| Risiko | Impact | Mitigation |
|--------|--------|------------|
| memobaut.com bleibt offline | HOCH | Placeholder-Content, vollständige Docs für Migration |
| Cloud-Content nicht zugänglich | MITTEL | Manuelle Upload-Workflows, klare Anleitung |
| Brand-Farben unbekannt | NIEDRIG | Typische Baubranche-Palette, einfach austauschbar |
| NAP-Daten fehlen | MITTEL | Placeholder mit TODO-Markers, Local-SEO vorbereitet |

---

## 12. Erfolgskriterien

### Technisch
- ✅ Lighthouse ≥95 (alle Kategorien)
- ✅ WCAG 2.2 AA konform
- ✅ Security-Headers A+
- ✅ 0 Console-Errors
- ✅ Build-Zeit <2 Minuten

### Business
- ✅ Alle Hauptseiten vorhanden
- ✅ Kontaktformular funktional
- ✅ Mobile-First responsive
- ✅ Local-SEO ready

### Code-Qualität
- ✅ TypeScript ohne Errors
- ✅ 100% Contract Coverage
- ✅ Token-basiertes Design
- ✅ Keine Magic Values

---

**Status:** 📝 Plan komplett - Start Implementation
**Next:** Repo-Setup & Contract-Definition
