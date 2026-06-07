# 🚀 SETUP GUIDE — Web Profile Guru Informatika + Supabase

Panduan lengkap untuk menghubungkan website ke Supabase dan hosting ke internet.
**Estimasi waktu: 15–20 menit**

---

## LANGKAH 1 — Buat Akun & Project Supabase

1. Buka **[supabase.com](https://supabase.com)** → klik **Start your project**
2. Daftar dengan GitHub atau email
3. Klik **New Project**
4. Isi:
   - **Organization**: pilih yang ada atau buat baru
   - **Project name**: `web-profile-guru` (bebas)
   - **Database Password**: buat password yang kuat, **simpan baik-baik!**
   - **Region**: pilih `Southeast Asia (Singapore)`
5. Klik **Create new project** → tunggu ~2 menit

---

## LANGKAH 2 — Jalankan Script SQL

1. Di Supabase Dashboard → klik **SQL Editor** (ikon database di sidebar kiri)
2. Klik **New Query**
3. Buka file `admin/sql/setup.sql` di komputer Anda
4. **Copy semua isinya** → paste ke SQL Editor Supabase
5. Klik tombol **Run** (▶️) atau tekan `Ctrl+Enter`
6. Pastikan muncul pesan **"Success"** ✅

---

## LANGKAH 3 — Dapatkan API Keys

1. Di Supabase Dashboard → klik **Settings** (ikon ⚙️) → **API**
2. Catat dua nilai ini:
   - **Project URL**: `https://xxxxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIs...` (teks panjang)

---

## LANGKAH 4 — Isi Konfigurasi di data.js

Buka file `js/data.js` dengan text editor (Notepad/VSCode).

Cari bagian ini (di bagian atas file):

```javascript
const SUPABASE_URL      = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

Ganti dengan nilai yang Anda salin tadi:

```javascript
const SUPABASE_URL      = 'https://xxxxxxxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6...';
```

Simpan file.

---

## LANGKAH 5 — Buat Akun Admin

1. Di Supabase Dashboard → klik **Authentication** → **Users**
2. Klik **Add user** → **Create new user**
3. Isi:
   - **Email**: email Anda (ini digunakan untuk login admin)
   - **Password**: password yang kuat
4. Klik **Create user**

> ⚠️ Gunakan email & password ini untuk login ke `admin/index.html`

---

## LANGKAH 6 — Test di Browser

1. Buka `index.html` di browser (double-click atau buka via file://)
2. Website harus menampilkan data dari Supabase ✅
3. Buka `admin/index.html` → login dengan email & password Supabase
4. Coba tambah proyek baru → refresh `index.html` → data harus muncul ✅

---

## LANGKAH 7 — Hosting ke Netlify (Gratis)

### Opsi A: Drag & Drop (Paling Mudah)
1. Buka **[netlify.com](https://netlify.com)** → daftar gratis
2. Di dashboard → klik **Add new site** → **Deploy manually**
3. **Drag and drop** folder `c:\myWeb` ke area yang tersedia
4. Tunggu ~30 detik → website Anda online! 🎉
5. Anda akan mendapat URL seperti: `https://amazing-name-123.netlify.app`

### Opsi B: Via GitHub (Auto-deploy)
1. Upload folder `myWeb` ke GitHub repository
2. Di Netlify → **Add new site** → **Import from Git**
3. Connect ke GitHub repository Anda
4. Setiap kali Anda push ke GitHub, website otomatis update

### Custom Domain (Opsional)
- Di Netlify → **Domain settings** → tambahkan domain Anda sendiri
- Contoh: `guru-informatika.com`

---

## LANGKAH 8 — (Opsional) Aktifkan Supabase Storage

Jika Anda ingin upload gambar langsung dari admin panel:

1. Di Supabase Dashboard → **Storage**
2. Pastikan bucket **"images"** sudah ada (dibuat oleh script SQL)
3. Jika belum ada → klik **New bucket** → nama: `images` → centang **Public bucket**
4. Selesai! Upload gambar di admin panel akan otomatis tersimpan di sini.

---

## ❓ FAQ

**Q: Apakah data aman?**
A: Ya. Supabase menggunakan PostgreSQL dengan enkripsi. Row Level Security (RLS) memastikan hanya admin terautentikasi yang bisa menulis data.

**Q: Berapa biaya Supabase?**
A: Gratis untuk:
- 500MB database
- 1GB storage
- 50.000 requests/bulan
- Cukup untuk website portofolio!

**Q: Bisakah website diakses tanpa internet?**
A: Tidak, karena data disimpan di cloud Supabase. Tapi pengunjung di seluruh dunia bisa mengaksesnya!

**Q: Bagaimana cara update konten setelah di-hosting?**
A: Buka URL admin panel Anda di browser (contoh: `https://amazing-name-123.netlify.app/admin/`), login, dan edit langsung. Perubahan langsung terlihat oleh semua pengunjung!

**Q: Lupa password admin?**
A: Buka Supabase Dashboard → Authentication → Users → klik user Anda → Reset password.

---

## 🆘 Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Website kosong / tidak ada data | Cek SUPABASE_URL dan SUPABASE_ANON_KEY di `js/data.js` |
| Login gagal | Pastikan user sudah dibuat di Supabase Auth |
| Upload gambar gagal | Pastikan bucket "images" ada dan bersifat public |
| Error CORS | Tambahkan URL website Anda di Supabase → Settings → API → CORS |
| Console error "Invalid API key" | Salin ulang anon key dari Supabase, pastikan tidak ada spasi |

---

*Panduan ini dibuat untuk Web Profile Guru Informatika v3 (Supabase)*
