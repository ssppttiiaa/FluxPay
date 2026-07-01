# Implementation Plan: Downgrade to Expo SDK 54

Tujuan fase ini adalah menurunkan versi (downgrade) proyek FluxPay dari Expo SDK 56 ke SDK 54 agar sepenuhnya kompatibel dengan Expo Go 54.0.8 yang ada pada perangkat Anda, tanpa mengubah kode UI/komponen yang sudah dibuat.

## User Review Required

> [!WARNING]
> Proses ini akan **menghapus folder `node_modules`** Anda sementara dan menginstal ulang semua dependensi agar bersih.
> Saya juga akan **mematikan** server `npx expo start` yang sedang berjalan saat ini di terminal Anda.
> Jika Anda setuju, klik **Proceed**.

## Proposed Changes

### 1. Hentikan Server Expo yang Sedang Berjalan
Server bundler Metro (`npx expo start`) yang berjalan saat ini akan dihentikan agar file konfigurasi dapat diubah tanpa terkunci.

### 2. Update `package.json`
Saya akan menyesuaikan versi spesifik pada `package.json`:
*   `expo` menjadi `~54.0.8`.
*   Dependensi terkait seperti `react`, `react-native`, `react-native-safe-area-context`, dan `react-native-screens` akan disejajarkan otomatis.

#### [MODIFY] `package.json`

### 3. Clean Reinstall Dependencies (Langkah Migrasi Aman)
Untuk memastikan tidak ada file *cache* atau sisa dari SDK 56 yang menyebabkan *error* bentrok, saya akan mengeksekusi urutan *command* berikut secara otomatis di PowerShell:
```powershell
# 1. Hapus instalasi lama dan lockfile
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# 2. Instal expo versi 54.0.8
npm install expo@~54.0.8

# 3. Instal ulang semua package dasar
npm install

# 4. Biarkan Expo secara otomatis mengoreksi versi React, React Native, dan package pendukung lainnya sesuai SDK 54
npx expo install --fix
```

## Verification Plan

Setelah *downgrade* selesai, proyek akan memiliki versi React dan React Native yang sepenuhnya kompatibel dengan SDK 54.
Anda dapat memverifikasinya kembali dengan memindai QR code setelah server `npx expo start -c` (dengan clear cache) dijalankan kembali.
