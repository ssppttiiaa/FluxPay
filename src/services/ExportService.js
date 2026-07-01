import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import MockRepo from '../repositories/MockSubscriptionRepository';
import { formatDateIndo } from '../utils/dateUtils';

export const exportToCSV = async () => {
  try {
    const allData = await MockRepo.getAll();

    // 1. Bikin judul atas tabel CSV
    let isiCSV = 'ID,Nama Layanan,Harga,Kategori,Siklus,Jatuh Tempo,Status\n';

    // 2. Masukkan data baris demi baris
    allData.forEach((item) => {
      const namaAman = `"${item.name.replace(/"/g, '""')}"`; // Biar nggak rusak kalau nama ada tanda komanya
      
      const baris = [
        item.id,
        namaAman,
        item.price,
        item.category,
        item.billing_cycle,
        formatDateIndo(item.next_payment_date),
        item.status
      ].join(',');

      isiCSV += baris + '\n';
    });

    // 3. Simpan jadi file fisik di dalam memori HP
    const namaFile = `FluxPay_Laporan_${Date.now()}.csv`;
    const lokasiFile = FileSystem.documentDirectory + namaFile;

    await FileSystem.writeAsStringAsync(lokasiFile, isiCSV, {
      encoding: FileSystem.EncodingType.UTF8
    });

    // 4. Buka menu Share bawaan HP (WhatsApp, Drive, Telegram, dll)
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(lokasiFile);
      return { status: 'success', message: 'Berhasil mengespor CSV!' };
    } else {
      return { status: 'error', message: 'Fitur share tidak didukung di laptop/browser' };
    }

  } catch (error) {
    console.error("Gagal membuat CSV:", error);
    return { status: 'error', message: error.message };
  }
};  