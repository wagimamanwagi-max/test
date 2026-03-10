# NaraPro Speaker Website + CMS

Landing page profesional untuk pembicara dengan animasi modern dan CMS ringan berbasis `localStorage`.

## Menjalankan

Karena ini proyek statis, jalankan server lokal apa saja, contoh:

```bash
python3 -m http.server 4173
```

Buka: `http://localhost:4173`

## Fitur

- UI/UX modern dengan efek glassmorphism, micro-interactions, dan scroll reveal.
- Section lengkap: hero, tentang, topik, testimoni, agenda, serta form booking.
- CMS popup untuk mengedit konten utama (nama, tagline, topik, testimoni, jadwal).
- Data CMS tersimpan di browser (`localStorage`) dan bisa di-reset ke default.

## Cara pakai CMS

1. Klik tombol **CMS** di kanan atas.
2. Ubah field konten sesuai kebutuhan.
3. Klik **Simpan Perubahan**.
4. Untuk kembali ke konten awal, klik **Reset Default**.
