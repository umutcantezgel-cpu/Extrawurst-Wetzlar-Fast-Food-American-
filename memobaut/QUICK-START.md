# Quick Start - memobaut.com

Schnellanleitung für Deployment zu Netlify.

## 🚀 1-Klick Deployment zu Netlify

### Schritt 1: Repository zu Netlify hinzufügen

1. Gehe zu [app.netlify.com](https://app.netlify.com)
2. Klicke **"Add new site"** → **"Import an existing project"**
3. Wähle **"GitHub"** als Provider
4. Autorisiere Netlify für GitHub
5. Wähle das Repository: `Extrawurst-Wetzlar-Fast-Food-American-`

### Schritt 2: Build-Einstellungen

Netlify sollte diese automatisch erkennen, falls nicht:

```
Base directory: memobaut
Build command: npm run build
Publish directory: memobaut/dist
```

### Schritt 3: Environment Variables (Optional)

Falls benötigt, unter **Site settings** → **Environment variables**:

```
PUBLIC_SITE_URL=https://memobaut.com
```

### Schritt 4: Deploy

Klicke **"Deploy site"** → Warte 2-3 Minuten → Fertig! ✅

Die Website ist jetzt live unter: `https://random-name-123.netlify.app`

## 🌐 Custom Domain Setup (memobaut.com)

### Option A: Netlify DNS (Empfohlen)

1. **Site settings** → **Domain management** → **Add custom domain**
2. Gebe ein: `memobaut.com`
3. Klicke **"Verify"**
4. Folge den Anweisungen zum Nameserver-Wechsel bei deinem Domain-Registrar
5. Warte 24-48h für DNS-Propagation
6. SSL wird automatisch aktiviert

### Option B: Externe DNS

Füge diese Records zu deinem DNS-Provider hinzu:

```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     random-name-123.netlify.app
```

Dann in Netlify:
1. **Domain management** → **HTTPS** → **Verify DNS configuration**
2. Klicke **"Provision certificate"**
3. Aktiviere **"Force HTTPS"**

## ✅ Verifikation

Nach dem Deployment:

```bash
# Testen
curl -I https://memobaut.com

# Sollte zurückgeben:
# HTTP/2 200
# content-security-policy: default-src 'self'; ...
# strict-transport-security: max-age=31536000
```

## 📝 Inhalte aktualisieren

Alle Platzhalter (`[TO BE PROVIDED]`) findest du in:

**Kontaktinformationen:**
- `src/components/Footer.astro` (Zeilen 45-65)
- `src/pages/kontakt/index.astro` (Zeilen 60-85)
- `contracts/routes/seo.routes.json` (Zeilen 24-30)

**Impressum:**
- `src/pages/impressum/index.astro` (Komplette Seite)

**Siehe:** `docs/content-migration.md` für vollständige Liste

## 🆘 Probleme?

**Build schlägt fehl:**
```bash
# Lokal testen
cd memobaut
npm install
npm run build
```

**Seite lädt nicht:**
- Prüfe DNS: `dig memobaut.com`
- Prüfe SSL: Browser-Entwicklertools → Netzwerk
- Netlify Status: [netlifystatus.com](https://www.netlifystatus.com)

**Kontaktformular funktioniert nicht:**
- Netlify Function ist implementiert unter `netlify/functions/contact.js`
- Prüfe Logs in Netlify Dashboard → Functions

## 📚 Weitere Dokumentation

- **README.md** - Vollständige Projektdokumentation
- **docs/deployment-guide.md** - Detaillierte Deployment-Anleitung
- **docs/content-migration.md** - Content-Platzhalter ersetzen
- **DEPLOYMENT-CHECKLIST.md** - Pre/Post-Deployment Checkliste

## 🎯 Nach dem Deployment

1. **Content ergänzen** (siehe `docs/content-migration.md`)
2. **Google Search Console** einrichten
3. **Sitemap einreichen**: `https://memobaut.com/sitemap-index.xml`
4. **Performance testen**: [PageSpeed Insights](https://pagespeed.web.dev)

---

**Support:** Siehe README.md für Kontakte und weitere Ressourcen
