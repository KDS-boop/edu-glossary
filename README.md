# EduGlossary — Skeleton Astro

Struktur website edukasi & glossary istilah, terinspirasi tata letak webopedia.com, tanpa fitur toplist afiliasi.

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
    config.ts        # skema data glossary & articles
    glossary/*.md     # tiap file = 1 istilah
    articles/*.md      # tiap file = 1 artikel
  components/          # Header, Footer, GlossaryCard, ArticleCard
  layouts/Layout.astro # kerangka HTML + <head>
  pages/
    index.astro         # beranda
    glossary/           # index A-Z + halaman detail istilah
    articles/            # index + halaman detail artikel
  styles/global.css     # semua styling
```

## Menambah konten

- **Istilah baru** → buat file `.md` di `src/content/glossary/`, isi frontmatter sesuai `config.ts`.
- **Artikel baru** → buat file `.md` di `src/content/articles/`.

## Sebelum deploy — checklist SEO

Beberapa hal sudah dibenahi (canonical URL, Open Graph, Twitter card, JSON-LD schema `DefinedTerm`/`Article`, sitemap otomatis via `@astrojs/sitemap`, `robots.txt`). Yang masih perlu kamu lakukan manual:

1. Ganti `site: 'https://situskamu.com'` di `astro.config.mjs` dan `Sitemap:` di `public/robots.txt` dengan domain asli kamu.
2. Tambahkan gambar default `public/og-default.png` (ukuran disarankan 1200x630px) — dipakai sebagai fallback saat halaman tidak punya `coverImage`.
3. Isi `coverImage` di frontmatter artikel dengan path/URL gambar asli.

## Langkah lanjutan yang disarankan

1. Tambahkan **Pagefind** untuk pencarian client-side (`npm install pagefind` + jalankan setelah build).
2. Deploy gratis ke **Cloudflare Pages** atau **Vercel** — cukup hubungkan repo GitHub.
3. Kalau butuh banyak istilah, migrasi `glossary` dari file `.md` ke folder JSON/CSV import supaya lebih mudah dikelola dalam jumlah besar.
4. Tambahkan halaman kategori (`/glossary/kategori/[category].astro`) kalau daftar istilah sudah banyak.
