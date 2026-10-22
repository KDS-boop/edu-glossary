# Standar Konten EduGlossary

Semua konten baru harus akurat, punya visual yang sesuai, mengikuti schema Astro saat ini, serta memberi nilai nyata bagi pembaca.

## Riset dan verifikasi

- Teliti topik sebelum menentukan outline final. Pastikan topik mengisi kebutuhan pembaca dan tidak menduplikasi intent halaman yang sudah ada.
- Utamakan sumber primer/resmi: dokumentasi vendor/proyek, advisori keamanan, standar protokol, regulator, paper asli, dan pengumuman penerbit.
- Gunakan sumber independen yang kredibel untuk konteks atau cross-check. Untuk fakta yang cepat berubah, utamakan data yang dipublikasikan/diperbarui dalam dua bulan terakhir bila tersedia dan relevan.
- Buka serta verifikasi setiap sumber yang dikutip; cek URL, judul, penerbit, tanggal, versi, dan apakah sumber benar-benar mendukung klaim.
- Jangan membuat statistik, CVE, dampak, kutipan, versi perbaikan, atau atribusi yang tidak terverifikasi. Pisahkan fakta resmi dari analisis dan skenario.
- Untuk isu keamanan, jelaskan cakupan terdampak, versi yang diperbaiki, tindakan mitigasi, batasan bukti, dan waktu pemeriksaan. Jangan menyimpulkan semua pengguna/website telah disusupi hanya karena sebuah kerentanan diumumkan.
- Cantumkan sumber di bagian yang relevan dan/atau bagian Sources. Jangan menyalin paragraf sumber secara panjang; sintesis dengan kata-kata sendiri.

## Panjang dan kualitas tulisan

- Artikel panduan standar: target sekitar **2.000–2.500 kata**; usahakan tidak di bawah **1.500 kata** kecuali topik sangat sempit atau pembaruan insiden yang memang singkat.
- Entri glosarium baru: target mendekati **1.500 kata** apabila cakupan konsep memungkinkan, tanpa menambah filler.
- Hitung kata pada isi yang benar-benar dirender, bukan frontmatter, metadata, atau menu navigasi. Jika belum mencapai target, perluas dengan penjelasan, contoh, trade-off, batasan, use case, atau FAQ yang substantif.
- Gunakan heading yang menjawab kebutuhan pembaca, definisi yang jelas, contoh konkret, dan bahasa yang konsisten. Hindari keyword stuffing dan pengulangan untuk mengejar jumlah kata.
- Artikel berbahasa Inggris harus konsisten menggunakan English yang natural; konten bahasa Indonesia harus konsisten dalam bahasa Indonesia. Jangan mencampur bahasa tanpa alasan editorial.

## Visual wajib

Setiap konten baru harus menyertakan visual relevan yang dibuat/ditetapkan untuk konten tersebut—jangan membiarkan field gambar kosong apabila schema dan template mendukung gambar.

- Sampul artikel biasanya berada di public/images/articles/; gunakan path publik pada coverImage.
- Entri glossary dapat menggunakan gambar melalui field image yang didukung loader Astro.
- Target format sampul: rasio **1200×630 (1.91:1)**, dengan komposisi yang tetap terbaca pada ukuran kecil.
- Isi coverImageAlt atau imageAlt dengan teks deskriptif yang menjelaskan informasi gambar. Jangan mengulang keyword secara berlebihan.
- SVG harus valid, punya viewBox/dimensi yang sesuai dan tidak menggunakan referensi eksternal yang tidak perlu. Untuk gambar raster, periksa ukuran, format, dan rendering pada hasil build.
- Verifikasi setiap path gambar mengarah ke aset yang ada; cek gambar di hasil render, bukan hanya keberadaan file sumber.

## Schema dan internal linking

### Glossary

Schema saat ini ditetapkan di src/content.config.ts. Field utama:
- term
- shortDefinition
- category
- letter (satu huruf kapital A–Z)
- updatedDate
- relatedTerms (opsional secara input; default array kosong)
- metaDescription, image, dan imageAlt (opsional sesuai schema)

Pastikan letter sesuai huruf pertama istilah; definisi singkat dapat dipahami sendiri; category sesuai taxonomy yang digunakan situs; tanggal benar; dan setiap related term benar-benar ada atau sengaja diperkenalkan bersama halaman terkait.

### Articles

Field utama pada schema saat ini:
- title, description, category, tags, relatedGlossary, author
- publishedDate, updatedDate, draft
- coverImage dan coverImageAlt bila visual digunakan

Gunakan format tanggal yang konsisten dengan berkas konten lain. Jangan menandai konten sebagai published jika masih draft. Verifikasi bahwa setiap nama dalam relatedGlossary cocok dengan entri yang ada.

## SEO, aksesibilitas, dan QA konten

- Pertahankan canonical domain dan pola URL yang dikonfigurasi; jangan membuat slug baru jika halaman yang ada sudah memenuhi intent yang sama.
- Description harus spesifik dan akurat. Jangan menambahkan tanggal, angka, atau klaim promosi yang tidak punya sumber.
- Gunakan struktur heading yang logis, link deskriptif, alt text yang bermakna, dan tabel yang tetap usable pada viewport kecil.
- Build dan cek hasil render untuk memastikan gambar, internal link, title, description, canonical, sitemap/RSS, dan indeks Pagefind konsisten.
- Untuk artikel baru/perubahan besar, jalankan tes browser pada desktop, mobile, dan small-mobile bila lingkungan tersedia; periksa overflow horizontal dan pelanggaran aksesibilitas serious/critical.
- Pastikan kata kunci dari sumber tidak membuat konten menyesatkan; ketepatan dan kegunaan lebih penting daripada panjang.

## Checklist sebelum menyelesaikan konten

- [ ] Topik dan intent telah diteliti; duplikasi halaman diperiksa.
- [ ] Klaim, sumber, tanggal, dan versi telah diverifikasi.
- [ ] Panjang isi sesuai target dan tidak berisi filler.
- [ ] Visual tersedia, relevan, terbuka pada build, dan punya alt text.
- [ ] Frontmatter lolos schema; related terms mengarah ke entri valid.
- [ ] Build, Pagefind, internal link, SEO metadata, dan tes relevan telah diperiksa.
- [ ] Ringkasan laporan menyebutkan tes yang benar-benar dijalankan serta setiap batasan.
