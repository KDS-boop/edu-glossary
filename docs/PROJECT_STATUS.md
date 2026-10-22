# Status Proyek EduGlossary

- **Snapshot per:** 22 Oktober 2026 (WIB)
- **Konten/produksi terakhir diverifikasi:** 22 Oktober 2026
- **Status:** situs dan dua artikel keamanan terbaru telah diverifikasi pada produksi sebelum cleanup dokumentasi ini.

## Identitas dan deployment

| Item | Nilai terakhir yang diverifikasi |
|---|---|
| Domain kanonik | https://eduglossary.my.id/ |
| Cloudflare Pages project | eduglossary |
| Alias Pages | https://edu-glossary.pages.dev/ |
| Branch produksi | main |
| Environment | production |
| Rilis konten/aplikasi terakhir | 94a089ad9689b1eba5aac2aef956830458ef74b7 |
| Deployment ID rilis tersebut | 0d4a5a37-56ff-4f45-b06a-15f77b964771 |
| URL deployment unik | https://0d4a5a37.edu-glossary.pages.dev/ |
| Status Cloudflare pada pemeriksaan terakhir | success |

Rilis di atas menambahkan dua artikel keamanan bertanggal 22 Oktober 2026. Cleanup dokumentasi tidak mengubah source konten, route, schema, atau konfigurasi runtime. ID deployment di tabel mengacu ke rilis konten/aplikasi yang dicatat, bukan menyatakan bahwa commit cleanup dokumentasi sudah dideploy.

## Artefak konten yang diverifikasi

- Artikel PHP dan Node.js: /articles/php-nodejs-security-crisis-october-2026/
- Artikel insiden sertifikat eMudhra: /articles/emudhra-ca-certificate-incident-october-2026/
- Ilustrasi untuk kedua artikel berada di public/images/articles/.

Smoke check terakhir pada 22 Oktober 2026 mendapat HTTP 200 untuk kedua halaman artikel, dua aset SVG, /sitemap-index.xml, dan /rss.xml di URL deployment/host yang diperiksa. HTML halaman memuat marker isi yang diharapkan, sitemap memuat kedua slug, dan feed RSS memuat kedua artikel.

## Build dan QA terakhir

| Pemeriksaan | Hasil terakhir | Cakupan/catatan |
|---|---|---|
| npx astro check | **PASS** | 0 error, 0 warning, 0 hint pada pemeriksaan konten terbaru |
| npm run build | **PASS** | 102 halaman statis; Pagefind mengindeks 102 halaman |
| Playwright + Axe (default, 4 workers) | **8/12; desktop timeout** | Empat tes desktop melewati 30 detik pada lingkungan PRoot saat tes paralel; delapan tes mobile/small-mobile lulus |
| Playwright desktop (serial, 1 worker) | **PASS: 4/4** | Semua empat tes desktop lulus saat diulang serial dengan timeout 60 detik |
| git diff --check | **PASS** | Tidak ada whitespace error setelah cleanup dokumentasi |
| Git sebelum cleanup | **CLEAN** | HEAD lokal sama dengan origin/main di 94a089a sebelum perubahan dokumentasi |

Sesudah perubahan dokumentasi ini, astro check dan production build berjalan kembali dan lulus. Untuk tes Edge Computing yang tidak terkait perubahan dokumentasi: run Playwright default timeout pada 4 tes desktop; rerun serial desktop lulus 4/4, sedangkan 8 tes mobile/small-mobile dari run pertama lulus. Jadi assertion tiap viewport lulus pada salah satu run, tetapi perintah suite default tetap keluar dengan error karena timeout paralel di lingkungan PRoot. Investigasi worker/timeout masih menjadi tugas QA terpisah. Dua artikel keamanan sendiri telah lulus 12/12 tes targeted pada sesi konten sebelumnya. Tidak ada source aplikasi yang diubah untuk menyiasati hasil tersebut.

## Stack dan aturan aktif

- Astro 7 dengan output statis, TypeScript strict, Tailwind CSS v4, dan Pagefind.
- Pipeline npm run build menjalankan build Astro, indeks Pagefind, lalu cache-bust pencarian.
- Node.js project pin: major **24** melalui .nvmrc dan .node-version; GitHub Actions juga menggunakan Node 24.
- Cloudflare Pages deploy otomatis dari branch main.
- Google Tag Manager tidak termasuk konfigurasi aktif yang didokumentasikan. Jangan menggunakan panduan GTM historis untuk mengubah implementasi sekarang tanpa persetujuan eksplisit.

## Catatan lingkungan

Shell default pada mesin ini melaporkan Node.js **v26.12.0** dan npm **12.2.1**, namun NVM juga menyediakan Node **v24.21.0** / npm **11.19.0**. Semua pemeriksaan Astro/build dalam cleanup ini dijalankan sesudah mengaktifkan Node 24 dengan memuat nvm.sh lalu menjalankan nvm use 24; jangan mengubah pin proyek untuk menyesuaikan default shell.

## Dokumentasi setelah cleanup

- Orientasi dan perintah: README.md
- Aturan kontribusi dan release: CONTRIBUTING.md
- Aturan arsitektur/keamanan: docs/PROJECT_RULES.md
- Standar penulisan dan visual: docs/CONTENT_STANDARDS.md
- Laporan fase terdahulu dipindahkan ke docs/archive/ dan ditandai sebagai catatan historis.

**Batas status:** identitas rilis pada tabel di atas adalah rilis aplikasi/konten terakhir yang mengubah source website. Perubahan cleanup ini hanya berisi dokumentasi, .gitignore, dan penghapusan file sesi/tooling lama; validasi deployment untuk commit dokumentasi dilakukan sesudah push dan tidak mengubah rilis konten tersebut.
