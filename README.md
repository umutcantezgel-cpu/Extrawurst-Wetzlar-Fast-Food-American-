# Extrawurst Wetzlar - Premium Fast Food Website

Eine moderne, responsive Multi-Page-Website für Extrawurst Wetzlar, ein Fast-Food-Restaurant in Wetzlar, Deutschland.

## 🌟 Features

- **Premium Design**: Kräftige Farben (Rot/Gelb), großformatige Food-Fotos, moderne Animationen
- **Multi-Page Structure**: Home, Menü, Aktionen, Über uns, FAQ, Kontakt, Impressum/Datenschutz, 404, 503
- **Interactive Components**:
  - Hero-Slider mit automatischem Wechsel
  - Dynamische Menü-Navigation mit Kategorien und Suche
  - Warenkorb mit Bestellfunktion
  - Bewertungen und Trust Badges
  - Deal-Banner und Aktionen
- **Responsive Design**: Optimiert für alle Bildschirmgrößen
- **Performance**: Schnelle Ladezeiten, optimierte Bilder
- **Accessibility**: Semantisches HTML, Fokusringe, ARIA-Labels
- **SEO-optimiert**: Meta-Tags, strukturierte Daten

## 🚀 Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **React Router** - Routing
- **TailwindCSS** - Styling
- **Framer Motion** - Animationen
- **React Query** - Data Fetching
- **Lucide React** - Icons
- **date-fns** - Datumsformatierung

## 📦 Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build erstellen
npm run build

# Preview des Production Builds
npm run preview
```

## 🏗️ Projekt-Struktur

```
src/
├── api/
│   └── base44Client.js       # API Client (Mock)
├── components/
│   ├── home/                  # Home-Komponenten
│   │   ├── DealCard.jsx
│   │   ├── PopularMenuItems.jsx
│   │   ├── ReviewsSection.jsx
│   │   └── TrustBadges.jsx
│   ├── layout/
│   │   └── Layout.jsx         # Navigation & Footer
│   ├── menu/
│   │   ├── CartDrawer.jsx     # Warenkorb
│   │   └── MenuItemCard.jsx   # Menü-Item Karte
│   └── ui/                    # UI Komponenten
│       ├── button.jsx
│       ├── input.jsx
│       ├── label.jsx
│       └── textarea.jsx
├── pages/                     # Seiten
│   ├── Home.jsx
│   ├── Menu.jsx
│   ├── Deals.jsx
│   ├── About.jsx
│   ├── FAQ.jsx
│   ├── Contact.jsx
│   ├── Legal.jsx
│   ├── NotFound.jsx
│   └── ServiceUnavailable.jsx
├── utils/
│   └── index.js               # Utility-Funktionen
├── App.jsx                    # App Root
├── main.jsx                   # Entry Point
└── index.css                  # Global Styles
```

## 🎨 Design-Prinzipien

- **Kräftige Farbpalette**: Rot (#DC2626), Orange (#F97316), Gelb (#FCD34D)
- **Bold Typography**: Inter als Hauptschrift, fette Schriftschnitte für Headlines
- **Micro-Interactions**: Hover-Effekte, Fokusringe, Animationen
- **Trust Signals**: Hygiene-Zertifikate, Qualitätsbadges, Kundenbewertungen

## 📱 Seiten-Übersicht

1. **Home** - Hero-Slider, Beliebte Gerichte, Aktionen, Bewertungen
2. **Menü** - Kategorien, Suche, Warenkorb, Bestellung
3. **Aktionen** - Laufende Deals und Angebote
4. **Über uns** - Restaurant-Story, Werte, Standort
5. **FAQ** - Häufig gestellte Fragen
6. **Kontakt** - Kontaktformular, Karte, Öffnungszeiten
7. **Legal** - Impressum & Datenschutzerklärung
8. **404** - Seite nicht gefunden
9. **503** - Service nicht verfügbar

## 🌐 Browser-Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 Lizenz

Copyright © 2024 Extrawurst Wetzlar. Alle Rechte vorbehalten.