# Content Migration Guide - memobaut.com

This document outlines the process for migrating content from the original memobaut.com website and integrating content from Dropbox/Google Drive.

## Overview

Due to the original memobaut.com being unavailable (503 error), placeholder content has been used throughout the site. This guide explains how to replace placeholders with real content.

## Content Placeholders

### To Be Replaced

The following placeholders appear throughout the site and need to be updated:

1. **Contact Information**
   - `[TO BE PROVIDED]` - Phone number
   - `[TO BE PROVIDED]` - Street address
   - `[TO BE PROVIDED]` - City/postal code
   - `[TO BE PROVIDED]` - Opening hours (if different from defaults)

2. **Company Information (Impressum)**
   - `[Firmenname wird ergänzt]` - Full company name
   - `[Name Geschäftsführer/Inhaber wird ergänzt]` - Owner/CEO name
   - `[USt-IdNr. wird ergänzt]` - VAT ID
   - `[Amtsgericht wird ergänzt]` - Registration court
   - `[HRB/HRA-Nummer wird ergänzt]` - Registration number
   - `[Versicherungsname wird ergänzt]` - Insurance provider

3. **About Page Content**
   - `[Jahren]` - Years in business
   - `[Region]` - Service region
   - Team member information (optional)

4. **Project References**
   - `[Ort wird ergänzt]` - Project locations
   - Project images (currently placeholders)
   - Project details and descriptions

## Migration Process

### Step 1: Gather Source Materials

1. **From original memobaut.com** (when available):
   - Text content from all pages
   - Images (optimized for web)
   - Logo files (SVG preferred)
   - Brand assets

2. **From Dropbox "Essential" folders**:
   - Company documents
   - Project photos
   - Marketing materials
   - Legal documents (Impressum, Datenschutz)

3. **From Google Drive**:
   - Programming/code content
   - Technical documentation
   - Additional assets

### Step 2: Update Contact Information

**Files to update:**

1. `src/components/Footer.astro` (lines 45-65):
```astro
<li class="footer__contact-item">
  <span>[REPLACE WITH ACTUAL ADDRESS]</span>
</li>
<li class="footer__contact-item">
  <a href="tel:+49XXXXXXXXXX">[REPLACE WITH PHONE]</a>
</li>
```

2. `src/pages/kontakt/index.astro` (lines 60-85):
```astro
<p class="contact-info__text">
  [REPLACE WITH FULL ADDRESS]
</p>
```

3. `contracts/routes/seo.routes.json` (lines 24-30):
```json
"telephone": "[REPLACE WITH PHONE]",
"address": {
  "streetAddress": "[REPLACE]",
  "addressLocality": "[REPLACE]",
  "postalCode": "[REPLACE]"
}
```

### Step 3: Update Company Information

**File:** `src/pages/impressum/index.astro`

Replace all placeholders in the Impressum section with actual company data.

**File:** `src/pages/datenschutz/index.astro`

Update the data controller information section.

### Step 4: Add Project References

**File:** `src/pages/referenzen/index.astro`

Replace the placeholder projects array (lines 19-47) with real project data:

```typescript
const projects = [
  {
    title: 'ACTUAL PROJECT TITLE',
    category: 'Neubau|Sanierung|Umbau',
    location: 'ACTUAL CITY',
    year: 'YYYY',
    description: 'ACTUAL PROJECT DESCRIPTION',
    image: '/assets/images/projects/project-1.jpg', // Optional
  },
  // ... more projects
];
```

### Step 5: Add Images

1. **Optimize all images** before adding:
```bash
# Install image optimization tools
npm install -D sharp

# Run optimization script
npm run images:optimize
```

2. **Add images to** `public/assets/images/`:
   - `og-home.jpg` - Homepage Open Graph image
   - `og-leistungen.jpg` - Services Open Graph image
   - `og-referenzen.jpg` - Projects Open Graph image
   - `og-team.jpg` - About page Open Graph image
   - `og-kontakt.jpg` - Contact page Open Graph image
   - `projects/` - Project images
   - `hero/` - Hero section backgrounds

3. **Update image references** in components and pages

### Step 6: Update About Page

**File:** `src/pages/ueber-uns/index.astro`

1. Replace `[Jahren]` with actual years in business
2. Replace `[Region]` with service region
3. Expand company story in intro text
4. Optionally add team member section

### Step 7: Customize Services

**File:** `src/pages/leistungen/index.astro`

Review and customize the services descriptions to match actual offerings.

## Content Integration from Dropbox/Google Drive

### Dropbox "Essential" Folders

1. **Access Dropbox**:
   - Request access token from client
   - Or manually download "Essential" folders

2. **Organize Content**:
   - Company documents → `src/content/legal/`
   - Project photos → `public/assets/images/projects/`
   - Marketing materials → Review and integrate into pages

3. **Process Images**:
```bash
# Resize and optimize
# Target sizes:
# - Hero images: 1920x1080px
# - Project images: 800x600px
# - Thumbnails: 400x300px
npm run images:optimize
```

### Google Drive Integration

1. **Programming/Code Content**:
   - Review for reusable code snippets
   - Check for existing contact form handlers
   - Look for analytics integrations

2. **Documentation**:
   - Internal processes → Not public-facing
   - Technical specs → Keep for reference

## Validation After Migration

After updating content, run the following checks:

```bash
# 1. Build check
npm run build

# 2. Type check
npm run typecheck

# 3. Contract validation
npm run contracts:validate

# 4. Accessibility check
npm run a11y

# 5. Performance check
npm run lhci
```

## SEO Considerations

When migrating content:

1. **Preserve URLs**: If the original site had different URLs, add redirects in `public/_redirects`
2. **Update meta descriptions**: Make them unique and descriptive (150-160 chars)
3. **Update structured data**: Ensure all Schema.org data is accurate
4. **Generate sitemap**: Automatic with Astro, verify in `dist/sitemap-index.xml`

## Content Checklist

- [ ] All `[TO BE PROVIDED]` replaced with actual data
- [ ] Contact information updated (phone, address, email)
- [ ] Company legal information complete (Impressum)
- [ ] Privacy policy reviewed and updated (Datenschutz)
- [ ] About page customized with company story
- [ ] Services descriptions accurate
- [ ] Project references added with images
- [ ] All images optimized and added
- [ ] Open Graph images created (1200x630px)
- [ ] Logo files added (favicon, apple-touch-icon)
- [ ] Navigation links verified
- [ ] Footer links working
- [ ] SEO metadata reviewed
- [ ] Structured data validated

## Support

For questions about content migration, contact the development team or refer to:
- **README.md** - General project documentation
- **IMPLEMENTATION-SUMMARY.md** - Technical implementation details
- **contracts/** - Component and route specifications
