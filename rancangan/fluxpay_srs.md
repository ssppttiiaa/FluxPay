# Software Requirement Specification (SRS)
## FluxPay - Subscription Manager

### 1. Project Overview
**FluxPay** adalah aplikasi *Subscription Manager* berbasis mobile (offline-first) yang dirancang untuk membantu pengguna mencatat, memantau, dan mengelola berbagai layanan langganan seperti platform *streaming* (Netflix, Spotify), keanggotaan gym, layanan *cloud* (Google One), dan pengeluaran rutin lainnya. Aplikasi ini beroperasi sepenuhnya secara lokal di perangkat pengguna, menjamin privasi data tanpa perlu koneksi internet untuk fungsionalitas utamanya.

### 2. Problem Statement
Di era digital, seseorang rata-rata berlangganan lebih dari 3 layanan berbayar. Seringkali pengguna lupa tanggal jatuh tempo, tidak menyadari total pengeluaran bulanan yang terus membengkak ("*subscription fatigue*"), dan kesulitan melacak ke mana saja uang mereka dihabiskan untuk layanan yang mungkin jarang digunakan. Tidak adanya alat pencatatan yang terpusat dan aman secara privasi membuat pengelolaan langganan menjadi rumit.

### 3. Goals and Objectives
*   **Membantu pengguna mencatat** semua layanan langganan dalam satu tempat terpusat.
*   **Mengingatkan pengguna** sebelum tanggal jatuh tempo pembayaran agar terhindar dari denda atau perpanjangan otomatis yang tidak diinginkan.
*   **Mengontrol pengeluaran bulanan** dengan memberikan visualisasi pengeluaran layanan langganan.
*   **Menyajikan informasi** secara terstruktur, rapi, dan mudah dipahami.

### 4. Stakeholders
*   **Pengguna Akhir (End Users):** Individu yang memiliki banyak layanan langganan dan membutuhkan alat untuk manajemen keuangan personal yang privat.
*   **Tim Pengembang (Developer):** Programmer, UI/UX Designer, dan pihak yang terlibat dalam pembuatan aplikasi FluxPay.

### 5. User Personas
**Nama:** Budi (25 Tahun) - Karyawan Swasta
*   **Karakteristik:** Sibuk, tech-savvy, senang mengkonsumsi berbagai konten digital.
*   **Langganan saat ini:** Netflix, Spotify, YouTube Premium, Gym, dan Google One.
*   **Pain Points:** Sering lupa tanggal perpanjangan langganan sehingga saldonya terpotong otomatis di saat tidak terduga, tidak tahu total pengeluaran pasti untuk langganan setiap bulannya.
*   **Goals:** Ingin aplikasi sederhana yang bisa mengingatkan H-1 sebelum tagihan masuk dan dapat melihat total pengeluaran agar bisa berhemat.

### 6. Functional Requirements
*   **FR-01 (Authentication):** Sistem harus memungkinkan pengguna membuat akun lokal (Register) dan masuk (Login) menggunakan PIN atau kredensial sederhana untuk menjaga privasi akses ke aplikasi di perangkat.
*   **FR-02 (Dashboard):** Sistem harus menampilkan ringkasan berupa total pengeluaran (bulanan/tahunan), jumlah langganan aktif, dan daftar tagihan terdekat (*upcoming*).
*   **FR-03 (CRUD Langganan):** Sistem harus memungkinkan pengguna untuk Menambah, Melihat Detail, Mengedit, dan Menghapus data langganan (Nama, Harga, Siklus Tagihan, Tanggal Jatuh Tempo, Kategori, Ikon).
*   **FR-04 (Kategori & Filter):** Sistem harus mendukung pengelompokan langganan berdasarkan kategori (Hiburan, Produktivitas, Utilitas, dll) dan menyediakan fitur filter kategori.
*   **FR-05 (Notifikasi Reminder):** Sistem harus dapat memicu *local push notification* sebagai pengingat sebelum tanggal jatuh tempo (misal: pengingat H-1, H-3).
*   **FR-06 (Statistik):** Sistem harus menampilkan *Pie Chart* atau grafik visual untuk proporsi pengeluaran berdasarkan masing-masing kategori.
*   **FR-07 (Ekspor Data):** Sistem harus menyediakan fungsi untuk mengunduh/ekspor data langganan pengguna ke dalam format CSV.

### 7. Non-Functional Requirements
*   **NFR-01 (Platform):** Aplikasi dibangun sebagai *Mobile App* menggunakan React Native dan Expo.
*   **NFR-02 (Storage):** Aplikasi harus berarsitektur *Offline-First*, menggunakan SQLite untuk penyimpanan data lokal.
*   **NFR-03 (Security/Privacy):** Seluruh data pengeluaran dan langganan hanya disimpan secara lokal di *storage* perangkat. Tidak ada sinkronisasi ke server pihak ketiga.
*   **NFR-04 (Performance):** Navigasi antar halaman harus responsif dan pemuatan data lokal ke layar harus instan.
*   **NFR-05 (Usability):** Antarmuka pengguna harus dibuat seintuitif mungkin tanpa proses pengisian form yang terlalu rumit.

### 8. User Flow
1.  **Onboarding/Auth:** Buka Aplikasi -> Halaman Register (Buat Profil/PIN Lokal) -> Login.
2.  **Dashboard:** Setelah masuk, melihat Dashboard utama dengan informasi ringkas pengeluaran bulan ini.
3.  **Tambah Langganan:** Klik tombol "Tambah (+)" -> Isi form langganan -> Simpan -> Data langsung tampil di Dashboard dan List.
4.  **Melihat Detail & Edit:** Klik salah satu item langganan di daftar -> Buka halaman detail -> Klik Edit/Hapus jika diperlukan.
5.  **Melihat Statistik:** Pindah ke tab Statistik -> Lihat *Pie Chart* proporsi pengeluaran dari langganan aktif.
6.  **Ekspor Data:** Pindah ke tab Profil -> Klik menu "Export to CSV" -> File tersimpan di *file system* perangkat.

### 9. Use Case List
*   **UC-01:** Pengguna mendaftarkan profil/PIN secara lokal.
*   **UC-02:** Pengguna melakukan Login.
*   **UC-03:** Pengguna melihat Dashboard dan total tagihan.
*   **UC-04:** Pengguna menambahkan layanan langganan baru.
*   **UC-05:** Pengguna mengubah detail layanan langganan yang sudah ada.
*   **UC-06:** Pengguna menghapus layanan langganan.
*   **UC-07:** Pengguna melihat daftar lengkap dan memfilter langganan berdasarkan kategori.
*   **UC-08:** Pengguna menerima notifikasi pengingat sebelum tanggal jatuh tempo.
*   **UC-09:** Pengguna melihat grafik persentase (*Pie chart*) pengeluaran.
*   **UC-10:** Pengguna mengekspor data langganan dalam bentuk CSV.

### 10. System Features Breakdown
*   **Modul Autentikasi Lokal:** Formulir pendaftaran akun offline dan verifikasi saat membuka aplikasi.
*   **Modul Manajemen Langganan:** Manajemen data menggunakan Form, *Date Picker*, dan *Dropdown* (Siklus/Kategori).
*   **Modul Pengingat (Reminder):** Manajemen integrasi *local scheduled notifications* via Expo Notifications.
*   **Modul Visualisasi (Statistik):** Integrasi *library chart* untuk menampilkan metrik berbasis grafik.
*   **Modul Manajemen File:** Modul untuk *generate* dan mengunduh format CSV.

### 11. Screen Requirements
1.  **Splash Screen:** Layar awal yang menampilkan logo aplikasi saat pertama kali dibuka.
2.  **Login/Register Screen:** Formulir untuk pembuatan akun baru secara lokal atau masuk ke aplikasi.
3.  **Beranda:** Menampilkan kartu total pengeluaran bulanan, kartu tagihan mendatang, persentase analisis kategori, kartu langganan terbaru, serta tombol aksi mengambang (tombol "+") untuk menambah daftar langganan.
4.  **Langganan:** Menampilkan seluruh daftar langganan aktif beserta fitur pencarian, filter, dan tombol "+" untuk menambah langganan.
5.  **Tambah Langganan:** Formulir input untuk menambahkan layanan langganan baru (diakses melalui tombol "+" pada halaman Beranda dan Langganan).
6.  **Kelola Langganan:** Halaman untuk melihat detail, mengubah (edit), atau menghapus (delete) langganan.
7.  **Notifikasi:** Menampilkan riwayat pemberitahuan pengingat tagihan yang jatuh tempo.
8.  **Profil:** Menampilkan informasi pengguna dan opsi pengaturan tambahan.
9.  **Export CSV:** Antarmuka khusus untuk mengekspor seluruh data langganan ke dalam format CSV.

### 12. Data Requirements
Desain kasar Entity-Relationship / Tabel Database lokal (SQLite):
*   **Tabel `Users`**
    *   `id` (PK), `name`, `pin`
*   **Tabel `Categories`**
    *   `id` (PK), `name`, `icon`, `color_code`
*   **Tabel `Subscriptions`**
    *   `id` (PK), `user_id` (FK), `category_id` (FK), `name`, `price` (Real/Decimal), `billing_cycle` (String), `next_billing_date` (Date), `reminder_days` (Int).

### 13. Navigation Requirements
Sistem navigasi React Navigation disarankan menggunakan pola campuran:
*   **Bottom Tab Navigator (Main Menu):**
    *   Tab 1: Beranda
    *   Tab 2: Langganan
    *   Tab 3: Notifikasi
    *   Tab 4: Profil
*   **Stack Navigator:**
    *   AuthStack (Register, Login)
    *   AppStack (Tabs, Add Screen, Detail Screen, Edit Screen)

### 14. Acceptance Criteria
*   Aplikasi harus bisa dioperasikan secara penuh tanpa koneksi internet (Offline First).
*   Data langganan yang ditambahkan, diubah, atau dihapus harus tersimpan secara persisten di SQLite.
*   Notifikasi pengingat jatuh tempo (*reminder*) harus muncul pada notifikasi perangkat meskipun aplikasi sedang tidak dibuka (berada di *background*/*killed state*).
*   *Pie Chart* di tab Statistik harus merender porsi biaya dengan kalkulasi yang akurat secara matematis dari data langganan yang aktif.
*   Aksi "Export CSV" harus menghasilkan file .csv valid yang berisi semua rekaman langganan pengguna yang dapat dibuka oleh aplikasi penampil *spreadsheet*.
