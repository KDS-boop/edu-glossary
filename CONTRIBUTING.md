# Contributing

Panduan singkat untuk perubahan kode, konten, dan QA di EduGlossary.

## Sebelum mulai

- Pastikan branch dan working tree diketahui: `git status --short --branch`.
- Baca [aturan proyek](docs/PROJECT_RULES.md) dan [standar konten](docs/CONTENT_STANDARDS.md) untuk perubahan yang relevan.
- Gunakan Node.js major 24 sesuai .nvmrc dan .node-version.
- Pertahankan perubahan sekecil mungkin dan sesuai permintaan. Jangan menggabungkan refactor yang tidak terkait.

## Validasi lokal

Untuk perubahan umum, jalankan:

    `npx astro check`
    `npm run build`
    git diff` --check`

Untuk perubahan UI, interaksi, route, accessibility, atau konten yang dirender di browser, jalankan tes Playwright yang relevan:

    `npx playwright test`

Konfigurasi Playwright membangun situs dan menjalankan preview lokal. Jika browser atau runtime uji tidak tersedia, laporkan pemeriksaan yang tidak bisa dijalankan secara terbuka; jangan menyebutnya lulus.

## Git dan release

1. Tinjau `git diff` dan `git diff` --cached; pastikan tidak ada file hasil build, report tes, kredensial, atau perubahan di luar cakupan.
2. Stage file yang memang terkait tugas. Jangan otomatis memakai `git add -A` tanpa memeriksa perubahan.
3. Jalankan `git diff` --cached --check sebelum commit.
4. Gunakan pesan commit yang menggambarkan perubahan aktual.
5. Sesudah push ke `main`, pastikan HEAD remote sesuai commit yang dikirim, verifikasi status deployment Cloudflare Pages, lalu cek URL publik yang berubah.
6. Hasil QA harus membedakan pemeriksaan lokal, status deployment, dan smoke test produksi. HTTP 200 pada satu route bukan bukti bahwa seluruh situs lulus.

## Keamanan dan privasi

- Jangan commit token, API key, cookie, file kredensial, atau output yang mengandung rahasia.
- Jangan menambah kembali Google Tag Manager. Perubahan consent, Google Analytics, AdSense, Clarity, CSP, atau kebijakan privasi harus menjadi bagian dari tugas yang disetujui dan diuji khusus.
- Default QA adalah read-only. Jangan mengedit kode, konten, konfigurasi, atau dependency dalam tugas QA murni kecuali perubahan memang diminta.
