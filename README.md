# EduGlossary — Skeleton Astro with SEO & Security Enhancements

Structured educational glossary & terminology website, inspired by Webopedia.com layout without affiliate toplist features.

## 🚀 Current Status

- ✅ **Security Headers**: All 6 headers active (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- ✅ **404 Handling**: Dedicated 404 page with noindex meta tag
- ✅ **Search Fix**: Empty search results now link to `/glossary/categories/` instead of deprecated `/glossary/kategori/`
- ✅ **Cloudflare Pages**: Auto-deploy from GitHub to production environment

## 🛠️ How to Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:4321` to see the site.

## 📁 Folder Structure

```
src/
  content/
    config.ts        # data schema for glossary & articles
    glossary/*.md    # term definitions
    articles/*.md    # educational articles
  components/        # Header, Footer, Card components
  layouts/Layout.astro # HTML structure + head
  pages/
    index.astro         # home page
    glossary/         # term index & details
    articles/         # article index & details
  styles/global.css   # global CSS
```

## 📝 Adding Content

- **New terms**: Create `.md` files in `src/content/glossary/`
- **New articles**: Create `.md` files in `src/content/articles/`

## 🔍 SEO Checklist (Before Deploy)

- [x] ✅ Set `site: 'https://eduglossary.my.id'` in `astro.config.mjs`
- [x] ✅ Update `public/robots.txt` with correct domain
- [x] ✅ Add `og-default.png` (1200x630px) for fallback images
- [x] ✅ Set `coverImage` in article frontmatter
- [x] ✅ Pagefind search enabled (`npm install pagefind` + build)

## 🚀 Deployment

- ✅ **Cloudflare Pages**: Auto-deploy from GitHub main branch
- ✅ **Production URL**: https://eduglossary.my.id
- ✅ **Custom Domain**: `eduglossary.my.id` with SSL/TLS enabled
- ✅ **Auto-deploy**: Every Git push to main triggers new production deployment

## 🔍 Search & Navigation

- Search results now correctly link to `/glossary/categories/` instead of deprecated `/glossary/kategori/`
- Empty search states show proper "View Categories" link
- All internal links follow current URL structure

## 🔒 Security & Compliance

- ✅ HTTPS enforced with HSTS (max-age=31536000)
- ✅ CSP header prevents XSS and data exfiltration
- ✅ X-Frame-Options: DENY prevents clickjacking
- ✅ X-Content-Type-Options: nosniff prevents MIME type sniffing
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Permissions-Policy restricts browser features
- ✅ robots.txt controls crawler access appropriately

## 📚 Development Tips

- Use `npm run build` to generate production build
- Check Cloudflare dashboard for deployment status
- Use `wrangler pages deployment list` to view deployment history
- Monitor console logs for CSP violations (expected for Cloudflare beacon)

## 📝 License

MIT License - feel free to use, modify, and share.