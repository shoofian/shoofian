# 🚀 Web Portofolio & CV Statis — Wahyu Shofian

Website portofolio profesional statis murni yang dirancang untuk pendidik Informatika dan analis penjaminan mutu perangkat lunak (QA Analyst). Website ini memuat seluruh data CV Anda secara lokal sehingga 100% gratis selamanya, aman dari peretasan, dan dimuat secara instan oleh pengunjung.

---

## 🛠️ Cara Mengubah / Memperbarui Konten

Seluruh data website Anda disimpan secara terpusat di dalam file JavaScript lokal:
👉 **[js/data.js](file:///c:/myWeb/js/data.js)**

Untuk memperbarui profil, riwayat mengajar, proyek, atau materi ajar, Anda tidak memerlukan database apa pun. Cukup ikuti langkah mudah berikut:

### 1. Buka File Data
Buka file `js/data.js` menggunakan editor teks pilihan Anda (seperti Notepad, VS Code, atau Sublime Text).

### 2. Edit Informasi Sesuai Kebutuhan
Di dalam file tersebut, Anda akan melihat variabel data yang terstruktur rapi:
*   **`STATIC_PROFILE`**: Ubah nama, tagline, biografi (dalam Bahasa Indonesia dan Inggris), kontak WhatsApp/Email, dan tautan sosial media (GitHub/LinkedIn). Anda juga bisa mengedit daftar keahlian (skills) di sini.
*   **`STATIC_SCHOOLS`**: Edit daftar sekolah tempat mengajar atau instansi yang terkait.
*   **`STATIC_EXPERIENCES`**: Kelola riwayat pengalaman mengajar, QA Analyst, pengembang aplikasi, dsb.
*   **`STATIC_PROJECTS`**: Tambahkan proyek baru (milik pribadi maupun karya siswa) dengan menyalin blok data proyek yang ada dan menyesuaikan judul, deskripsi, gambar thumbnail, serta link GitHub/demo.
*   **`STATIC_MATERIALS`**: Perbarui link bahan ajar PDF, slide presentasi, atau video tutorial YouTube yang Anda bagikan untuk siswa.

### 3. Simpan dan Jalankan Git Push
Setelah file disimpan, jalankan perintah ini di Command Prompt / terminal komputer Anda untuk mengirim pembaruan ke GitHub (Vercel akan mendeteksi dan memperbarui website online Anda secara otomatis dalam beberapa detik):

```bash
git add js/data.js
git commit -m "update: pembaruan konten portofolio"
git push
```

---

## 💻 Cara Menjalankan Website Secara Lokal (Preview)

Jika Anda ingin melihat perubahan di komputer Anda sebelum melakukan push:
1.  Buka terminal/Command Prompt di folder proyek `c:\myWeb`.
2.  Jalankan server lokal, contoh dengan Node.js:
    ```bash
    npx http-server -p 8000
    ```
    atau menggunakan Python:
    ```bash
    python -m http.server 8000
    ```
3.  Buka link [http://localhost:8000](http://localhost:8000) di browser Anda.
