# EduGlossary — Agent Notes

## Repo Overview
Astro 4.16 static site (educational glossary + articles), deployed to Cloudflare Pages at `https://eduglossary.my.id`.

## Developer Commands

| Command | What it does |
|---|---|
| `npm run dev` | Astro dev server at `http://localhost:4321` |
| `npm run build` | `astro build && pagefind --site dist` — **must run both** |
| `npm run preview` | Preview production build locally |

**Never skip Pagefind** — `npm run build` chains it after `astro build`. Search breaks if omitted.

## Architecture

- **Content collections**: `src/content/config.ts` (glossary terms + articles)
  - Glossary schema: `term`, `shortDefinition`, `category`, `letter`, `updatedDate`, `relatedTerms`
  - Articles schema: `title`, `description`, `category`, `tags`, `author`, `coverImage`, `draft`, etc.
- **~30 glossary terms** already as `.md` files in `src/content/glossary/`
- **Pages**: `src/pages/` — static rendering, no SSR/API routes
- **Layout**: `src/layouts/Layout.astro` loads global CSS, SEO meta, JSON-LD schemas
- **Redirects**: old `/glossary/kategori/` URLs → `/glossary/categories/` (defined in `astro.config.mjs`)
- **Data**: `src/data/hubs.ts`, `src/data/authors.ts` for home page sections

## Search (Pagefind — Already Integrated)

Pagefind search UI is **already wired up** across the site:
- `Layout.astro` loads `/pagefind/pagefind-ui.css`, `/pagefind/pagefind-ui.js`, and `/search-utils.js`
- `index.astro` initializes `window.__eduglossary.search.init('#hero-search')`
- `Header.astro` initializes `window.__eduglossary.search.init('#search')`
- `data-pagefind-body` attribute on `<main>` for body indexing
- Build runs `pagefind --site dist` automatically

## Design System (Current State)

- **Fonts**: `system-ui, -apple-system, "Poppins" UI", sans-serif` — IBM Plex Sans added via Fontsource
- **Colors**: CSS custom properties in `:root` (`--color-bg`, `--color-text`, `--color-primary`, etc.)
- **Category colors**: `src/utils/categoryColors.ts`, icons: `src/utils/categoryIcons.ts`
- **Dark mode**: NOT implemented
- **Design tokens**: Single `src/styles/global.css`, no separate token system

## Key Constraints

- `output: 'static'`, `trailingSlash: 'always'` — all URLs must have trailing slashes
- Content config is **v4-style** (`src/content/config.ts`), NOT v5's `src/content.config.ts`
- No SSR adapters; do not add `output: 'server'` or `output: 'hybrid'`
- Fontsource for fonts (no Google Fonts CDN)
- Single CSS file (`src/styles/global.css`) — no CSS modules or scoping

## Footer Structure

The footer has exactly 3 sections in this order:
1. **Brand** — logo, description, author link (`/authors/eduglossary-team/`)
2. **Navigation** — Home, Learn, Glossary, Articles, About, Disclaimer
3. **Topics** — Blockchain, Cloud Computing, Software Development, Cybersecurity, AI & Data, Technology

CSS grid: `1.5fr repeat(2, minmax(0, 1fr))` on desktop (3 columns), `repeat(2, minmax(0, 1fr))` on tablet/mobile.

## SEO / Security

- Security headers enforced: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- 404 page has `noindex` meta
- Sitemap auto-generated via `@astrojs/sitemap`
- robots.txt: `src/pages/robots.txt.ts`
- `@astrojs/rss` is a dependency but **not configured** — RSS feed not yet generated

## Deploy

Cloudflare Pages auto-deploy from GitHub `main` branch. Check `wrangler pages deployment list` for history.

## Common Tasks

- **Add glossary term**: Create new `.md` file in `src/content/glossary/` with frontmatter matching the glossary schema
- **Add article**: Create new `.md` file in `src/content/articles/` with frontmatter matching the articles schema
- **Add route**: Create `.astro` file in `src/pages/` following existing conventions (trailing slash, Layout wrapper)
- **Update footer**: Edit `src/components/Footer.astro` — do not add more than 3 grid sections
