# 🚀 Netlify Deployment - memobaut.com

Die Website ist jetzt **100% deployment-ready** für Netlify!

## ✅ Was ist fertig

- ✅ Komplette Website (7 Seiten) im Ordner `memobaut/`
- ✅ Netlify-Konfiguration (Root + Subdirectory)
- ✅ Node.js Version festgelegt (18.20.0)
- ✅ Kontaktformular mit Netlify Function
- ✅ Security Headers (CSP, HSTS, etc.)
- ✅ Build erfolgreich getestet
- ✅ Git Repository bereit

## 🎯 Deployment in 5 Minuten

### Schritt 1: Zu Netlify gehen

1. Öffne: **https://app.netlify.com**
2. Login/Signup (mit GitHub empfohlen)

### Schritt 2: Site importieren

1. Klicke **"Add new site"**
2. Wähle **"Import an existing project"**
3. Wähle **"Deploy with GitHub"**
4. Autorisiere Netlify (falls noch nicht geschehen)
5. Suche und wähle: **`Extrawurst-Wetzlar-Fast-Food-American-`**

### Schritt 3: Build Settings

Netlify sollte diese **automatisch erkennen**:

```
Base directory: memobaut
Build command: npm run build  
Publish directory: memobaut/dist
```

Falls nicht, gebe sie manuell ein.

### Schritt 4: Deploy!

1. Klicke **"Deploy site"**
2. Warte 2-3 Minuten
3. ✅ **Fertig!**

Die Website ist live unter: `https://random-name-123.netlify.app`

## 🌐 Custom Domain (memobaut.com)

Nach dem ersten Deploy:

1. Gehe zu **Site settings** → **Domain management**
2. Klicke **"Add custom domain"**
3. Gebe ein: `memobaut.com`
4. Folge den DNS-Anweisungen
5. SSL wird automatisch aktiviert

## 📝 Vor dem Go-Live

Die Website hat noch **Content-Platzhalter**:

### Wichtig zu ersetzen:
- `[TO BE PROVIDED]` - Telefonnummer
- `[TO BE PROVIDED]` - Adresse
- Impressum-Details
- Projekt-Bilder

**Siehe:** `memobaut/docs/content-migration.md` für vollständige Liste

## 🔧 Nach dem Deployment

### Testen:
```bash
# Website öffnen
https://memobaut.com

# Security Headers prüfen
curl -I https://memobaut.com
```

### Google Search Console:
1. Property hinzufügen: `memobaut.com`
2. Sitemap einreichen: `https://memobaut.com/sitemap-index.xml`

## 📚 Dokumentation

- **memobaut/QUICK-START.md** - Schnellanleitung
- **memobaut/README.md** - Vollständige Projektdoku
- **memobaut/DEPLOYMENT-CHECKLIST.md** - Deployment Checkliste
- **memobaut/docs/deployment-guide.md** - Detaillierte Anleitung

## 🆘 Support

Falls Probleme auftreten:

**Build schlägt fehl?**
```bash
cd memobaut
npm install
npm run build
# Sollte erfolgreich sein
```

**Weitere Hilfe:**
- Netlify Docs: https://docs.netlify.com
- Astro Docs: https://docs.astro.build

---

**Status:** ✅ **DEPLOYMENT-READY**  
**Branch:** `claude/premium-static-website-enterprise-011CV4W51ecoHf7eED8De4nW`  
**Build getestet:** ✅ Erfolgreich  
**Netlify-Config:** ✅ Optimiert
