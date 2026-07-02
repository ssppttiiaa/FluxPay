import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

import SubscriptionRepository from "../repositories/SubscriptionRepository";

class ExportService {

async exportCSV() {

  const subscriptions = await SubscriptionRepository.getAll();

  let csv =
    "Nama,Harga,Kategori,Siklus,Tanggal Mulai,Tanggal Bayar,Status\n";

  subscriptions.forEach((item) => {

    csv +=
      `${item.name},` +
      `${item.price},` +
      `${item.category},` +
      `${item.billing_cycle},` +
      `${item.start_date},` +
      `${item.next_payment_date},` +
      `${item.status}\n`;

  });

  const fileUri =
    FileSystem.documentDirectory + "subscriptions.csv";

  await FileSystem.writeAsStringAsync(
    fileUri,
    csv,
    {
      encoding: FileSystem.EncodingType.UTF8,
    }
  );

  console.log("✅ CSV berhasil dibuat:", fileUri);

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(fileUri);
  }

  return fileUri;
}

}

export default new ExportService();