# P4.2 — Keyword & Search Intent Research

**Date:** 2026-09-21
**Status:** Research only — no content changes, no new entries, no SEO implementation.
**Primary URL:** `https://edu-glossary.pages.dev/`

## Scope

- Full content inventory of all existing pages (22 glossary, 1 article, 5 hubs)
- Keyword mapping per category with primary/secondary/long-tail targets
- Search intent classification for every existing page
- Competitive landscape analysis (SERP patterns, competitor strengths/gaps)
- Article briefs for new long-form content opportunities
- Glossary expansion candidates (new terms to add)
- Cannibalization risk assessment
- Source register for all research inputs

## Methodology

1. **Content audit:** Read all 22 glossary `.md` files, 1 article, `hubs.ts`, `config.ts`, `index.astro` — extracted term, category, related terms, content depth
2. **SERP research:** Direct queries via web search for each existing term + category-level head terms; analysis of known competitor sites (TechTarget, Gartner, IBM, AWS, Simplilearn, Wikipedia)
3. **Intent classification:** Each page classified as Informational / Navigational / Transactional / Commercial Investigation based on query patterns
4. **Competitive gap analysis:** Identified underserved niches and content types competitors don't cover well
5. **Cannibalization check:** Cross-referenced keyword overlaps between existing pages and proposed new content

## Limitations

- Google SERP access rate-limited; analysis based on known SERP patterns for tech definitional queries + direct source fetching
- No Ahrefs/SEMrush/Moz tool access — keyword volume estimates based on known search behavior patterns for tech terms
- New site with no domain authority history — all recommendations assume low-DA starting point
- English-language only, no international SEO considerations

## Deliverables

| File | Purpose |
|------|---------|
| `site-inventory.md` | Complete inventory of all current pages with metadata |
| `keyword-topic-map.md` | Keyword clusters with primary/secondary/long-tail targets per category |
| `existing-content-intent-map.md` | Search intent classification for every existing page |
| `article-briefs.md` | Detailed briefs for 5 proposed new articles |
| `glossary-opportunities.md` | Candidate glossary terms for expansion, prioritized |
| `source-register.md` | All authoritative sources used in this research |
| `cannibalization-notes.md` | Keyword overlap risks and mitigation strategies |
