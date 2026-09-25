# EduGlossary

Glosarium istilah teknologi & artikel edukasi, dibangun dengan [Astro](https://astro.build). Live di **[eduglossary.my.id](https://eduglossary.my.id/)** (hosting Cloudflare Pages).

## Menjalankan di komputer kamu

```bash
npm install
npm run dev
```

Buka `http://localhost:4321`.

## Struktur folder

```
src/
  content/
    config.ts          # skema data glossary & articles
    glossary/*.md      # tiap file = 1 istilah
    articles/*.md      # tiap file = 1 artikel
  components/          # Header, Footer, GlossaryCard, ArticleCard
  layouts/Layout.astro # kerangka HTML + <head>
  pages/
    index.astro        # beranda
    404.astro          # halaman 404 kustom
    glossary/          # index A-Z, halaman detail istilah, halaman per kategori
    articles/          # index, halaman detail artikel, halaman per kategori
    learn/             # halaman topik "Learn" (paralel dengan kategori glossary)
  styles/global.css    # semua styling
public/
  _headers            # header kustom untuk Cloudflare Pages
  robots.txt
```

## Menambah konten

- **Istilah baru** → buat file `.md` di `src/content/glossary/`, isi frontmatter sesuai `config.ts`.
- **Artikel baru** → buat file `.md` di `src/content/articles/`.

## Status saat ini

- Domain kanonik: **eduglossary.my.id**, di-hosting di Cloudflare Pages, sitemap otomatis via `@astrojs/sitemap`.
- Konten live: 5 kategori glossary (Blockchain, Software Development, Cybersecurity, AI & Data, Cloud Computing) berisi puluhan istilah, plus artikel edukasi per kategori.
- SEO dasar sudah terpasang: canonical URL, Open Graph, Twitter card, JSON-LD schema (`DefinedTerm`/`Article`), `robots.txt`, halaman 404 kustom.
- Sedang berjalan: **fase P4 — Search Visibility & Content Expansion** (SEO teknis & crawlability, riset keyword & search intent, perluasan glosarium, perluasan content cluster, refinement SEO on-page, instrumentasi performa pencarian), dipantau lewat Google Search Console.

## Langkah lanjutan

1. Pastikan `public/og-default.png` (1200×630px) sudah ada sebagai fallback OG image untuk halaman tanpa `coverImage`.
2. Tambahkan **Pagefind** untuk pencarian client-side kalau belum aktif (`npm install pagefind` + jalankan setelah build).
3. Lanjutkan riset keyword & perluasan konten sesuai roadmap fase P4.
4. Kalau volume istilah terus bertambah, pertimbangkan migrasi `glossary` dari file `.md` ke folder JSON/CSV import supaya lebih mudah dikelola dalam jumlah besar.
