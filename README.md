# EduGlossary

EduGlossary adalah situs edukasi teknologi berisi glosarium A–Z dan artikel penjelasan. Situs menggunakan Astro static site generation (SSG), Pagefind untuk pencarian, dan Cloudflare Pages untuk hosting.

- **Produksi:** https://eduglossary.my.id/
- **Mirror Cloudflare Pages:** https://edu-glossary.pages.dev/
- **Branch deploy produksi:** main
- **Versi Node.js lokal:** `26.12.1` melalui `.nvmrc` dan `.node-version`; GitHub Actions dan Cloudflare Pages menggunakan major `26`.

## Mulai secara lokal

Gunakan Node.js `26.12.1` terlebih dahulu, lalu jalankan:

    npm ci
    npm run dev

Buka http://localhost:4321/.

## Perintah pengembangan

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server pengembangan Astro |
| `npm run build` | Membuat situs statis, membangun indeks Pagefind, lalu membuat cache-bust untuk aset pencarian |
| `npm run preview` | Menyajikan hasil build produksi secara lokal |
| `npm run check` | Menjalankan `astro sync` lalu pemeriksaan TypeScript 7 (`tsc --noEmit --runExternalCode`) |
| `npx playwright test` | Menjalankan tes browser Playwright di konfigurasi desktop, mobile, dan small-mobile |

**Catatan:** Pagefind sudah menjadi bagian dari `npm run build`. Jangan menjalankan build Astro saja sebagai pengganti pipeline produksi, karena indeks pencarian juga perlu diperbarui. `npm run check` menggunakan TypeScript `7.1.0-beta` bersama `@astrojs/ts-content-mapper`; pertahankan lockfile dan verifikasi jalur ini di CI. Playwright menjalankan build dan preview melalui `playwright.config.ts`; browser Playwright harus tersedia di mesin yang menjalankan tes.

## Struktur penting

    src/
      content.config.ts          # Skema collection glossary dan articles
      content/
        glossary/*.md            # Entri glosarium
        articles/*.md            # Artikel
      components/                 # Komponen antarmuka
      layouts/                    # Layout halaman
      pages/                      # Route Astro
      styles/                     # Styling global
    public/
      images/articles/            # Sampul artikel
      _headers                    # Header untuk Cloudflare Pages
      robots.txt
    functions/
      _middleware.js              # Middleware/header Cloudflare
    scripts/
      pagefind-cache-bust.mjs     # Cache-bust aset pencarian
    tests/
      *.spec.ts                   # Tes Playwright
    docs/
      CONTENT_STANDARDS.md        # Standar riset dan penulisan konten
      PROJECT_RULES.md            # Batasan arsitektur dan aturan perubahan
      PROJECT_STATUS.md           # Snapshot status terakhir yang diverifikasi
      archive/                    # Catatan historis, bukan panduan operasional

## Menambah atau memperbarui konten

1. Entri glosarium baru berada di `src/content/glossary/`; artikel baru berada di `src/content/articles/`.
2. Ikuti skema di `src/content.config.ts`, termasuk field tanggal dan teks alternatif gambar bila relevan.
3. Setiap konten baru harus memiliki visual yang sesuai dan bersumber/dirancang untuk konten itu sendiri.
4. Gunakan sumber primer atau resmi untuk fakta penting; validasi tanggal, versi, URL, serta klaim. Jangan mengarang angka atau sumber.
5. Ikuti panduan rinci di [CONTENT_STANDARDS.md](docs/CONTENT_STANDARDS.md).

## Aturan proyek dan QA

- Baca [PROJECT_RULES.md](docs/PROJECT_RULES.md) sebelum mengubah arsitektur, keamanan, privasi, atau deployment.
- Jalankan `npm run check`, `npm run build`, `npx playwright test` bila browser tersedia, dan `git diff --check` sesuai cakupan perubahan.
- QA bersifat read-only kecuali perubahan secara eksplisit diminta.
- Perubahan kode/konten harus tetap berada dalam cakupan tugas; jangan mengubah dependency, lockfile, routing, CSP, consent, analytics, atau konfigurasi deployment tanpa alasan yang jelas.
- Source saat ini tidak menggunakan integrasi monetisasi pihak ketiga. Jangan menambahkan skrip iklan, tag publisher, deklarasi inventaris iklan, atau host monetisasi ke CSP tanpa persetujuan dan QA khusus.
- Detail snapshot produksi dan pemeriksaan terakhir tersedia di [PROJECT_STATUS.md](docs/PROJECT_STATUS.md).

## Deployment

Cloudflare Pages membangun branch `main` dari repository GitHub. Setelah push, verifikasi status deployment terbaru dan uji route/aset yang berubah pada domain produksi. Build lokal yang berhasil saja belum membuktikan bahwa deployment produksi berhasil.

---

EduGlossary — dokumentasi proyek. Tanggal status diverifikasi dicatat dalam `docs/PROJECT_STATUS.md`.
