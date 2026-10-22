# Aturan Proyek EduGlossary

Dokumen ini adalah acuan permanen untuk menjaga arsitektur, keamanan, dan proses perubahan. Snapshot kondisi aktual berada di [PROJECT_STATUS.md](PROJECT_STATUS.md); panduan editorial berada di [CONTENT_STANDARDS.md](CONTENT_STANDARDS.md).

## Arsitektur yang harus dipertahankan

- **Framework:** Astro 7, TypeScript strict, static site generation.
- **Output:** statis; URL mengikuti trailing slash yang dikonfigurasi.
- **Pencarian:** Pagefind dibuat dalam pipeline build resmi.
- **Styling:** Tailwind CSS v4 melalui integrasi Vite; ikuti token dan pola styling yang sudah ada.
- **Hosting:** Cloudflare Pages, branch produksi main, domain kanonik https://eduglossary.my.id/.
- **Node.js:** major 24, sesuai .nvmrc, .node-version, dan workflow CI.

Jangan menambah SSR/adapter, mengganti framework, merombak routing, atau memperkenalkan dependency baru tanpa kebutuhan yang nyata dan persetujuan untuk perubahan berdampak besar.

## Source of truth

- Skema collections: src/content.config.ts.
- Entri glosarium: src/content/glossary/.
- Artikel: src/content/articles/.
- Route dan komponen: src/pages/, src/components/, src/layouts/.
- Header, CSP, dan middleware: public/_headers dan functions/_middleware.js.
- Pipeline build: package.json; jangan melewati tahap Pagefind.
- Pengaturan build/deployment: astro.config.mjs, workflow CI, dan konfigurasi Cloudflare yang sudah ada.

Jangan menduplikasi konfigurasi pada file baru jika implementasi yang ada sudah menjadi source of truth.

## Keamanan, privasi, dan analytics

- Google Tag Manager tidak menjadi bagian dari konfigurasi aktif saat aturan ini ditulis. Jangan menambah GTM atau menghidupkan kembali konfigurasi lama tanpa persetujuan eksplisit.
- CookieYes, Google Analytics, AdSense, Clarity, CSP, dan halaman privasi saling terkait. Perubahan pada salah satunya harus mempertimbangkan consent sebelum request dibuat, header CSP, iframe, dan perilaku Reject All/Accept All.
- Jangan mengekspos kredensial dalam source, log, dokumentasi, commit, atau output terminal.
- Jangan melonggarkan CSP atau menambah host/security exception secara luas hanya untuk menutupi kegagalan tes.

## Aturan kerja

- Kerjakan hanya cakupan tugas yang diminta; hindari perubahan incidental.
- Saat tugas QA dinyatakan read-only, jangan memperbaiki file walaupun menemukan defect. Laporkan bukti dan minta instruksi perubahan jika diperlukan.
- Jangan mengubah package manifest/lockfile, Node pin, route, metadata global, schema, maupun fitur kecuali perubahan tersebut memang bagian dari tugas.
- Pertahankan sumber riset dan tanggalnya untuk klaim faktual yang dapat berubah.
- Gunakan lintasan akhir: diagnostik, production build beserta Pagefind, browser tests yang relevan, pemeriksaan diff, lalu verifikasi deployment setelah push.
- Laporkan batas pengujian dengan tepat; bedakan tes targeted dari full suite dan local build dari production verification.

## Dokumentasi

- README.md: orientasi singkat dan perintah utama.
- CONTRIBUTING.md: alur kontribusi, QA, dan release.
- docs/CONTENT_STANDARDS.md: aturan editorial dan visual.
- docs/PROJECT_STATUS.md: status terverifikasi beserta tanggal dan caveat.
- docs/archive/: bukti historis yang bukan pedoman operasional terkini.
- Catatan sesi/memori agent, hasil CodeGraph, dan file skill khusus agent bersifat lokal; jangan masukkan ke repo.
