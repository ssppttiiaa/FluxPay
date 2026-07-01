# Frontend Development Plan: FluxPay
**Role:** Frontend Developer  
**Tech Stack:** React Native + Expo  
**Architecture Pattern:** Component-Driven, Offline-First (Local State & Dummy Data Preparation)

---

## 1. Daftar Screen yang Harus Dibuat

Berdasarkan desain UI/UX dan penyesuaian SRS, berikut adalah layar utama yang perlu dikembangkan:

1.  **Splash Screen:** Layar transisi berlogo FluxPay.
2.  **Onboarding Screen (Opsional):** Penjelasan singkat tentang fitur aplikasi (dapat dihilangkan jika waktu terbatas).
3.  **Login Screen:** Layar khusus untuk masuk ke aplikasi.
4.  **Register Screen:** Layar khusus untuk pembuatan akun baru secara lokal.
5.  **Beranda (Dashboard):** Ringkasan total pengeluaran, tagihan mendatang, persentase kategori (*Pie Chart*), dan langganan terbaru.
6.  **Langganan (Subscription List):** Daftar lengkap langganan aktif, fitur pencarian, dan filter kategori.
7.  **Tambah Langganan:** Formulir input layanan baru.
8.  **Kelola Langganan (Detail/Edit):** Tampilan spesifik satu langganan dengan opsi modifikasi.
9.  **Notifikasi:** Daftar riwayat pengingat jatuh tempo.
10. **Profil:** Pengaturan aplikasi, profil pengguna, serta fitur *Export CSV* (berupa dialog/bottom sheet atau langsung mengeksekusi ekspor tanpa pindah layar).

---

## 2. Daftar Reusable Components (UI Kit)

Fokus utama sebelum mengimplementasikan layar adalah membuat komponen yang dapat digunakan ulang:

*   **CustomButton:** Tombol utama, sekunder, dan *danger*.
*   **CustomInput:** Form input teks dan *password* (PIN) beserta validasi.
*   **SubscriptionCard:** Kartu *list item* langganan.
*   **SummaryCard:** Kartu ringkasan (misal: "Total Pengeluaran Bulan Ini").
*   **FloatingActionButton:** Tombol aksi melayang ("+") untuk Beranda dan Langganan.
*   **NotificationCard:** Kartu *list item* untuk riwayat notifikasi.
*   **CategoryChip:** *Chip*/*Pill* untuk label dan filter kategori.
*   **CustomHeader:** Navigasi *top-bar* kustom dengan judul dan tombol *back*.

**Empty States:**
Kondisi tampilan khusus (ilustrasi/teks) saat data kosong harus disiapkan untuk:
*   Belum ada langganan.
*   Belum ada notifikasi.
*   Belum ada data statistik.

---

## 3. Struktur Folder React Native yang Scalable

Terapkan struktur *Feature-Based* atau *Type-Based* yang bersih dan modular:

```text
/src
 ├── assets/             # File gambar, logo, font kustom
 ├── components/         # Reusable components (Button, Card, Input, Header)
 ├── constants/          # Design System (Colors, Typography, Spacing)
 ├── navigation/         # File konfigurasi navigasi Stack dan Bottom Tab
 ├── screens/            # Layar penuh sesuai pembagian pada Poin 1
 │    ├── auth/          # Splash, Onboarding, LoginScreen, RegisterScreen
 │    ├── main/          # Beranda, Langganan, Notifikasi, Profil
 │    └── subscription/  # TambahLangganan, KelolaLangganan
 ├── hooks/              # Custom React Hooks
 ├── utils/              # Fungsi helper (format mata uang, tanggal)
 ├── store/              # State management lokal UI (Context API / Zustand)
 └── App.tsx             # Entry point utama
```

---

## 4. Navigation Architecture

Arsitektur navigasi menggunakan `React Navigation`. Tab Statistik dilebur ke Beranda dan Export CSV ditangani langsung di dalam halaman Profil.

*   **`RootNavigator` (Stack)**
    *   `Splash` (Screen)
    *   **`AuthStack` (Stack)**
        *   `Onboarding` (Opsional)
        *   `LoginScreen`
        *   `RegisterScreen`
    *   **`MainApp` (Bottom Tab Navigator)**
        *   Tab 1: `Beranda`
        *   Tab 2: `Langganan`
        *   Tab 3: `Notifikasi`
        *   Tab 4: `Profil`
    *   **`SubscriptionModalStack` (Stack/Modal)**
        *   `TambahLangganan`
        *   `KelolaLangganan`

---

## 5. Prioritas Pengerjaan Frontend

Karena seluruh *screen* utama sudah tersedia di Figma, fokus pengembangan adalah implementasi efisien dengan urutan berikut:

1.  **Setup Expo Project:** Inisialisasi proyek dan instalasi dependensi (React Navigation, Vector Icons, dll).
2.  **Setup Navigation:** Rangkai *RootNavigator*, *AuthStack*, dan *MainApp* dengan kerangka layar kosong.
3.  **Setup Design System:** Definisikan Colors, Typography, dan Spacing di folder `constants/`.
4.  **Build Reusable Components:** Kembangkan komponen wajib (`CustomButton`, `CustomInput`, `SubscriptionCard`, dll.) beserta *Empty States*.
5.  **Implementasi Seluruh Screen:** *Slicing* halaman berdasarkan desain Figma, merakit komponen yang sudah dibuat menggunakan data statis/dummy.
6.  **Integrasi dengan SQLite & Backend Logic:** Menyambungkan antarmuka yang sudah selesai dengan penyimpanan data lokal *offline-first*, fungsionalitas ekspor, dan *reminder*.
