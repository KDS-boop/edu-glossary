# MEMORY.md — Long-Term Memory

This file contains curated long-term memories about the EduGlossary project.

## Project Overview

- **Project**: EduGlossary
- **Type**: Astro 4.16 static site (educational glossary + articles)
- **Deployment**: Cloudflare Pages at https://eduglossary.my.id
- **Search**: Pagefind for client-side search

## Key Decisions

- Using Astro static build with Pagefind for search
- Content stored as Markdown files in src/content/glossary/ and src/content/articles/
- Single CSS file approach (src/styles/global.css)
- No SSR — static output only

## Roadmap

- P4 — SEO & Search Visibility (In progress)
- P5 — UI/UX Refresh (Proposed) — IBM Plex fonts, dark mode
- P6 — Search & Discoverability (Proposed) — RSS feed, search improvements

## Notes

- RSS dependency (@astrojs/rss) installed but not yet configured
- Dark mode planned for P5
- IBM Plex fonts needed via @fontsource-variable/ibm-plex
