# Status Proyek EduGlossary

- **Dokumentasi diperbarui:** 29 Oktober 2026 (WIB).
- **Deployment baseline sebelum perubahan ini:** commit `b0168ff` (remove monetization loader and publisher declaration) berhasil dideploy ke Cloudflare Pages pada 29 Oktober 2026; deployment `6377a63f-6f47-4353-bc92-6e091ab58ecf`, tahap `deploy = success`.
- **Status integrasi monetisasi:** tidak ada pemuat iklan, tag publisher, file deklarasi inventaris iklan, atau host iklan khusus di source saat ini. GA4, Clarity, dan CookieYes tetap dipertahankan. Skrip monetisasi baru membutuhkan persetujuan dan QA consent/security.
- **Verifikasi lokal 29 Oktober 2026:** `npm run check` PASS; `npm run build` PASS (Astro menghasilkan 110 halaman, Pagefind mengindeks 110 halaman / 7.365 kata); `git diff --check` PASS. Playwright lulus 12/12 tes yang sudah ada dan 6/6 smoke/accessibility tests sementara untuk keempat halaman konten baru pada desktop, mobile, dan small-mobile. Tes sementara dihapus setelah selesai.
- **Konten baru pada perubahan yang sedang dikerjakan:** satu artikel tentang CVE-2026-111497 (Brotli) dan tiga entri glosarium (Brotli, Remote Code Execution, Out-of-Bounds Write). Sumber primer vendor dan advisori pemerintah ditautkan langsung pada konten; setiap item memiliki visual SVG orisinal.
- **Cakupan status:** catatan audit historis berikut tidak otomatis membuktikan bahwa semua URL, semua viewport, dan seluruh tes telah dijalankan ulang pada tanggal snapshot ini. Deployment perubahan ini tetap harus diverifikasi dengan `cf` dan smoke test produksi setelah push.

## Konteks tooling/runtime 26 Oktober 2026 (historis)

- **Perubahan tooling/runtime:** pin Node.js 26, pembaruan dependency/check TypeScript 7, pembersihan konfigurasi MCP dan skrip QA lama sudah di-commit pada `66b7e32` dan berhasil dideploy. Pembaruan dokumentasi status lanjutan dikirim pada commit `d2dfd1e`; deployment tersebut juga berstatus `deploy = success`.
- **Batas status:** audit menyeluruh yang dijabarkan pada bagian berikut dilakukan 23 Oktober 2026; hasil rinci tersebut adalah historis dan tidak membuktikan seluruh halaman/fitur diuji ulang pada 26 Oktober.

## Identitas produksi dan baseline deployment (snapshot 26 Oktober 2026)

| Item | Nilai terverifikasi |
|---|---|
| Domain kanonik | https://eduglossary.my.id/ |
| Cloudflare Pages project | `eduglossary` |
| Alias Pages | https://edu-glossary.pages.dev/ |
| Branch produksi | `main` |
| Git commit tooling/runtime yang diverifikasi | `66b7e324b45462e8cda3103c5c7ac18a8a7b429b` |
| Pesan commit | `chore: align Node 26 tooling and clean project configs` |
| Cloudflare deployment ID | `c074cb43-518d-4bfb-a2a4-b6ab8477d85b` |
| URL deployment unik | https://c074cb43.edu-glossary.pages.dev/ |
| Waktu deployment | 26 Oktober 2026, 15:27–15:28 UTC |
| Hasil tahap deployment | `deploy = success` |
| Build statis pada verifikasi lokal 26 Oktober | Astro menghasilkan 106 halaman; Pagefind mengindeks 106 halaman / 7.216 kata |

Deployment unik di atas menggunakan SHA commit aplikasi yang cocok dengan GitHub `main` saat pemeriksaan. URL deployment tersebut dan domain kanonik diuji setelah deployment dinyatakan sukses.

## Verifikasi lokal dan smoke check — 26 Oktober 2026

| Pemeriksaan | Hasil | Cakupan/catatan |
|---|---|---|
| Node.js / npm | **PASS** | Node.js `v26.12.1`, npm `12.2.1` |
| `npm run check` | **PASS** | `astro sync` dan `tsc --noEmit --runExternalCode`; TypeScript dependency saat ini `7.1.0-beta` |
| `npm run build` | **PASS** | Astro membangun 106 halaman; Pagefind mengindeks 106 halaman dan 7.216 kata; cache-bust selesai |
| `npx playwright test --reporter=list` | **12/12 PASS** | Tes `tests/edge-computing.spec.ts` di desktop, mobile, dan small-mobile; bukan audit menyeluruh semua route produksi |
| `cf pages get eduglossary` / deployment list | **PASS** | Autentikasi `cf` valid; commit `66b7e32` dibangun dan dideploy dengan status `deploy = success` |
| Smoke check domain produksi | **8/8 HTTP 200** | `/`, artikel PHP/Node.js, Edge Computing, `/privacy-policy/`, `/contact/`, `/sitemap-index.xml`, `/sitemap-0.xml`, `/robots.txt` |
| Status push perubahan tooling/runtime | **PASS** | Commit `66b7e32` sudah berada di `origin/main` dan deployment `c074cb43` berstatus `deploy = success`; pembaruan dokumentasi status ini dikirim sebagai commit dokumentasi lanjutan |

TypeScript 7.1 masih dipasang dari versi beta. Karena itu, pertahankan lockfile dan jalankan pemeriksaan serta build pada CI; jangan menganggap toolchain ini sebagai TypeScript 7 stable.

## Audit produksi historis — 23 Oktober 2026

Audit terperinci di bawah ini dipertahankan sebagai bukti pemeriksaan pada tanggal tersebut. Pada 26 Oktober dilakukan smoke check HTTP terpilih, bukan pengulangan penuh terhadap semua 102 URL, semua ukuran viewport, atau semua aturan Axe.

### HTTP, tautan, dan indeks

| Pemeriksaan | Hasil | Catatan |
|---|---|---|
| URL dari sitemap | **102/102 HTTP 200** | Semua URL sitemap saat audit berhasil dibuka |
| Target internal tambahan | **83/83 HTTP 200** | Tautan dan aset internal yang dikumpulkan dari halaman sitemap |
| `/sitemap-index.xml` | **HTTP 200; XML valid** | Memuat sitemap anak |
| `/sitemap-0.xml` | **HTTP 200; XML valid** | Sitemap URL produksi |
| `/rss.xml` | **HTTP 200; XML valid** | Feed dapat diparse |
| `/robots.txt` | **HTTP 200** | File tersedia |
| Canonical | **102/102 valid** | Tidak ada canonical yang hilang atau menunjuk ke domain lain |
| H1 dan landmark main | **102/102 sesuai pemeriksaan** | Tepat satu H1 dan satu elemen `main` pada setiap halaman sitemap |
| Gambar | **0 gambar rusak terdeteksi** | Tidak ditemukan gambar tanpa `alt` pada pemindaian HTML |

Pemindai URL awal menganggap endpoint `/cdn-cgi/l/email-protection` sebagai 404. Endpoint tersebut berasal dari obfuscation email Cloudflare dan bukan halaman konten biasa; target ini dikeluarkan dari hitungan target internal saat audit akhir. Setelah pengecualian tersebut, 83 target internal tambahan yang diuji semuanya merespons 200.

### SEO, aksesibilitas, responsivitas, dan browser

| Pemeriksaan | Hasil | Cakupan/catatan |
|---|---|---|
| Panjang title | **102/102 dalam rentang audit** | Tidak ada title di atas 60 karakter pada sitemap produksi |
| Deskripsi meta | **102/102 dalam rentang audit** | Seluruhnya 70–170 karakter; ini heuristik audit, bukan batas mutlak mesin pencari |
| Axe accessibility | **0 pelanggaran pada 102/102 halaman** | Pemindaian mencakup WCAG 2 A/AA, WCAG 2.1 A/AA, WCAG 2.2 AA, dan best-practice rules |
| Overflow horizontal | **0 halaman bermasalah** | Diukur pada lebar 390 px untuk seluruh URL sitemap |
| Error JavaScript/konsol tertangkap | **0** | Selama pemindaian Chromium pascadeployment |
| Playwright suite dalam repo | **12/12 PASS** | Tes Edge Computing di desktop, mobile, dan small-mobile |
| Responsive smoke check produksi | **32/32 PASS** | 8 rute pilihan pada lebar 320, 390, 768, dan 1365 px |
| Pagefind | **PASS** | Query `blockchain` menghasilkan 13 hasil pada uji produksi tanpa error konsol |
| CookieYes URL warning | **0 pada pengujian domain produksi** | Peringatan yang sebelumnya tampak di localhost disebabkan URL localhost berbeda dari domain yang terdaftar; bukan temuan pada domain produksi dalam uji ini |

Pemindaian menguji URL sitemap lengkap. Smoke test multi-viewport memeriksa rute pilihan, bukan setiap halaman pada setiap ukuran layar. Pemeriksaan browser juga tidak menggantikan pengujian semua kebijakan consent, request pihak ketiga, browser/OS, atau audit performa lapangan.

## Validasi kode dan build — audit 23 Oktober 2026

| Perintah/pemeriksaan | Hasil | Cakupan/catatan |
|---|---|---|
| `npx astro check` | **PASS** | 0 error, 0 warning, 0 hint |
| `npm run build` | **PASS** | Astro static build menghasilkan 103 halaman; pipeline melanjutkan pembuatan indeks Pagefind dan cache-bust |
| `git diff --check` | **PASS** | Tidak ada whitespace error pada perubahan aplikasi terakhir |
| Git setelah push aplikasi | **CLEAN** | `main` selaras dengan `origin/main` sebelum pembaruan status ini |
| Cloudflare Pages | **PASS** | Deployment yang memakai commit aplikasi `b8f804d` berakhir dengan status sukses |

Perubahan aplikasi pada `b8f804d` mencakup:

- Membungkus tabel konten dengan area aksesibel yang bisa difokuskan keyboard dan digulir pada viewport sempit.
- Menata ulang level heading kartu glossary/artikel dan heading navigasi footer.
- Memendekkan document title dan merapikan deskripsi meta yang bermasalah.
- Menyesuaikan beberapa deskripsi artikel dan halaman legal/kategori tanpa mengubah intent halaman.

## Artefak konten yang diverifikasi

- Artikel krisis keamanan PHP/Node.js: `/articles/php-nodejs-security-crisis-october-2026/`.
- Artikel baru CVE-2026-111497 dan keamanan decoder Brotli: `/articles/brotli-cve-2026-111497-runtime-update-guide/`.
- Entri glosarium baru: `/glossary/brotli/`, `/glossary/remote-code-execution/`, dan `/glossary/out-of-bounds-write/`.
- Artikel insiden sertifikat eMudhra: `/articles/emudhra-ca-certificate-incident-october-2026/`.
- Panduan migrasi post-quantum cryptography: `/articles/post-quantum-cryptography-migration-guide/`.
- Visual artikel berada di `public/images/articles/` dan diperiksa sebagai aset produksi.

Pada audit produksi, URL artikel, kategori, glossary, homepage, halaman privasi, sitemap, RSS, dan aset internal yang ditautkan telah diperiksa. Seluruh 102 URL sitemap dan 83 target internal tambahan yang dihitung dalam audit akhir merespons HTTP 200.

## Stack dan aturan aktif

- Astro 7, TypeScript strict, static site generation, Tailwind CSS v4 melalui Vite, dan Pagefind.
- `npm run build` adalah pipeline build resmi: build Astro, pembuatan indeks Pagefind, lalu cache-bust aset pencarian. Jangan menggantinya dengan `astro build` saja untuk validasi produksi.
- Node.js lokal dipin ke **26.12.1** melalui `.nvmrc` dan `.node-version`; GitHub Actions dan Cloudflare Pages menggunakan major **26** (`NODE_VERSION=26`). Pertahankan konsistensi ini saat mengubah runtime.
- Cloudflare Pages mengambil branch produksi `main` dari repository GitHub `KDS-boop/edu-glossary`.
- Google Tag Manager tidak menjadi bagian dari konfigurasi aktif yang didokumentasikan. Jangan menambahkan GTM atau menghidupkan konfigurasi historis tanpa persetujuan eksplisit.
- Perubahan CookieYes, Google Analytics, Clarity, CSP, header keamanan, kebijakan privasi, atau integrasi monetisasi harus menjalani QA consent/security khusus. Tidak ada integrasi monetisasi pihak ketiga yang aktif pada snapshot ini.

## Snapshot resource Colab — laporan operator 23 Oktober 2026

Nilai berikut berasal dari output CLI Colab yang diberikan operator, bukan pembacaan saldo independen dari shell audit ini:

| Metrik | Snapshot yang dilaporkan |
|---|---:|
| Compute units tersedia | 76.09 |
| Usage rate | 1.27 compute units/jam |
| Active assignments | 1 |
| Assignment | GPU T4, High-RAM, status `IDLE` |
| Eksekusi terakhir yang tertera | `automation:drivemount` pada 23 Oktober 2026 pukul 01:00:22 |

Pembagian saldo dengan laju tersebut setara secara matematis dengan sekitar 59.9 jam apabila laju tetap. Itu **bukan** jaminan runtime aktif selama durasi itu dan bukan waktu kedaluwarsa runtime. Uptime host tidak boleh dianggap sebagai penghitung waktu mundur masa Colab. Saldo dan status runtime perlu diperiksa ulang langsung melalui CLI/antarmuka Colab sebelum pekerjaan panjang.

## Dokumentasi operasional

- `README.md` — orientasi, setup lokal, perintah, dan struktur repository.
- `CONTRIBUTING.md` — kontribusi, QA, Git, dan release.
- `docs/PROJECT_RULES.md` — arsitektur, keamanan, dan batasan perubahan.
- `docs/CONTENT_STANDARDS.md` — riset, akurasi, editorial, visual, dan QA konten.
- `docs/PROJECT_STATUS.md` — snapshot status terverifikasi terkini dan batasan QA.
- `docs/archive/` — catatan fase historis, bukan petunjuk operasional yang mengalahkan status saat ini.

## Riwayat snapshot sebelum 23 Oktober

Snapshot 22 Oktober sebelumnya mencatat rilis artikel keamanan serta cleanup dokumentasi. Referensi historisnya:

- Commit aplikasi/artikel saat itu: `94a089ad9689b1eba5aac2aef956830458ef74b7`, deployment `0d4a5a37-56ff-4f45-b06a-15f77b964771`.
- Commit cleanup dokumentasi: `dc53fe9e04cb48de65a87d4eb699c97924640ff8`, deployment `b9e7c8c7-ff91-4c57-9ba4-51cd4d77fe42`.
- Panduan kontribusi dan status diperbarui pada 22 Oktober dalam commit `9b0134f`.

Nilai di bagian ini adalah catatan historis dan tidak menggantikan commit/deployment terbaru pada bagian atas dokumen.
