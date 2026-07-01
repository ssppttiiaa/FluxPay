# Walkthrough: Project Setup & Navigation Architecture

Saya telah berhasil melakukan instalasi dan setup awal proyek FluxPay di *root folder* sesuai dengan instruksi yang diberikan (menggunakan Expo Blank JavaScript).

## Apa yang telah dilakukan?

1.  **Inisialisasi Proyek**: Menjalankan `npx create-expo-app` menggunakan template *blank* secara langsung di dalam direktori `FLUXPAY`.
2.  **Instalasi Dependencies**: Memasang *React Navigation* (`@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`) beserta modul bawaan Expo (`react-native-screens`, `react-native-safe-area-context`).
3.  **Scaffolding Struktur Folder**:
    *   Membuat folder `src/assets`, `src/utils`, `src/components`, `src/constants`, `src/navigation`, dan `src/screens`.
4.  **Pembuatan Placeholder Screens (JSX)**:
    *   *Auth*: `Splash.jsx`, `LoginScreen.jsx`, `RegisterScreen.jsx`
    *   *Main*: `BerandaScreen.jsx`, `LanggananScreen.jsx`, `NotifikasiScreen.jsx`, `ProfilScreen.jsx`
    *   *Subscription*: `TambahLanggananScreen.jsx`, `KelolaLanggananScreen.jsx`
5.  **Konfigurasi Navigasi**:
    *   Membuat `AuthStack.jsx` (untuk *splash*, *login*, *register*).
    *   Membuat `MainTabNavigator.jsx` (navigasi bawah untuk 4 halaman utama).
    *   Membuat `RootNavigator.jsx` yang menggabungkan *AuthStack*, *MainTab*, dan layar *Modal* (tambah/kelola langganan).
    *   Memperbarui `App.js` sebagai *entry point* yang merender `<NavigationContainer>` dengan `RootNavigator`.

## Struktur File Lengkap
```text
FLUXPAY/
├── App.js                         # Menyatukan Navigation Container
├── package.json
└── src/
    ├── assets/                    # Tempat logo, font, ikon
    ├── components/                # Reusable components (Tombol, Card)
    ├── constants/                 # Warna, Tipografi
    ├── navigation/
    │   ├── AuthStack.jsx          # Stack Navigator untuk login/register
    │   ├── MainTabNavigator.jsx   # Tab Navigator (Beranda, Langganan, dll)
    │   └── RootNavigator.jsx      # Navigator utama pengatur state logic
    ├── screens/
    │   ├── auth/
    │   │   ├── Splash.jsx
    │   │   ├── LoginScreen.jsx
    │   │   └── RegisterScreen.jsx
    │   ├── main/
    │   │   ├── BerandaScreen.jsx
    │   │   ├── LanggananScreen.jsx
    │   │   ├── NotifikasiScreen.jsx
    │   │   └── ProfilScreen.jsx
    │   └── subscription/
    │       ├── TambahLanggananScreen.jsx
    │       └── KelolaLanggananScreen.jsx
    └── utils/                     # Helper (format mata uang, tanggal)
```

## Urutan Implementasi Frontend Selanjutnya

Karena fondasi proyek telah terpasang, rekomendasi langkah berikutnya adalah:
1.  **Mendefinisikan Design System**: Mengisi `src/constants/` dengan *Color Palette* dan *Typography* yang ada pada desain Figma Anda.
2.  **Membangun Reusable Components**: Mulai melakukan *coding* di folder `src/components/` untuk membuat `CustomButton`, `CustomInput`, dan `SubscriptionCard`.
3.  **Slicing UI Screens**: Mengganti teks "*Placeholder*" di dalam file-file `src/screens/` menjadi elemen UI nyata menggunakan komponen yang telah dibuat.

Anda dapat memverifikasi hasil kerangka ini dengan menjalankan `npx expo start`!
