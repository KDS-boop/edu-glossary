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

- **Fonts**: `system-ui, -apple-system, "PERSON_NAME] UI", sans-serif` — **not IBM Plex yet**
- **Colors**: CSS custom properties in `:root` (`--color-bg`, `--color-text`, `--color-primary`, etc.)
- **Category colors**: `src/utils/categoryColors.ts`, icons: `src/utils/categoryIcons.ts`
- **Dark mode**: NOT implemented
- **Design tokens**: Single `src/styles/global.css`, no separate token system
- **IBM Plex fonts**: Planned for P5 refresh, not yet present

## Key Constraints

- `output: 'static'`, `trailingSlash: 'always'` — all URLs must have trailing slashes
- Content config is **v4-style** (`src/content/config.ts`), NOT v5's `src/content.config.ts`
- No SSR adapters; do not add `output: 'server'` or `output: 'hybrid'`
- Fontsource for fonts (no Google Fonts CDN)
- Single CSS file (`src/styles/global.css`) — no CSS modules or scoping

## SEO / Security
- Security headers enforced: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- 404 page has `noindex` meta
- Sitemap auto-generated via `@astrojs/sitemap`
- robots.txt: `src/pages/robots.txt.ts`
- `@astrojs/rss` is a dependency but **not configured** — RSS feed not yet generated

## Testing
Playwright is installed but no test script defined in `package.json`. No test suite to run.

## Deploy
Cloudflare Pages auto-deploy from GitHub `main` branch. Check `wrangler pages deployment list` for history.

## Roadmap Status (from project notes)

| Phase | Status | Notes |
|---|---|---|
| P4 — SEO & Search Visibility | In progress (monitoring) | Keyword research, content expansion, on-page SEO, search CTR monitoring |
| P5 — UI/UX Refresh | Proposed | IBM Plex fonts, dark mode, design tokens, visual QA |
| P6 — Search & Discoverability | Proposed | Expand Pagefind, search autocomplete, RSS/newsletter, CSV migration |

### Key facts for roadmap execution:
- Pagefind search UI **already exists** — P6 search bar work is partly done
- RSS dependency (`@astrojs/rss`) is installed but not configured — easy win for P6
- Dark mode requires adding CSS custom properties + toggle + localStorage persistence (P5)
- IBM Plex fonts need `npm install @fontsource-variable/ibm-plex` (P5)
- Adding glossary terms = create new `.md` file in `src/content/glossary/`
