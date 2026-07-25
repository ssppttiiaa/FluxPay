import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import SubscriptionRepository from "../repositories/SubscriptionRepository";

class ExportService {
  async exportPDF() {
    // ambil semua data
    const subscriptions = await SubscriptionRepository.getAll();

    let total = 0;

    let rows = "";

    subscriptions.forEach((item, index) => {
      total += Number(item.price);

      rows += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td>${item.billing_cycle}</td>
          <td>Rp ${Number(item.price).toLocaleString("id-ID")}</td>
          <td>${item.status}</td>
        </tr>
      `;
    });

    const html = `
      <html>

      <head>

        <style>

          body{
            font-family: Arial;
            padding:30px;
          }

          h1{
            text-align:center;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:20px;
          }

          th,td{
            border:1px solid #000;
            padding:8px;
            text-align:left;
          }

          th{
            background:#eeeeee;
          }

          .footer{
            margin-top:20px;
            font-weight:bold;
          }

        </style>

      </head>

      <body>

        <h1>FluxPay Report</h1>

        <p>
          Tanggal Export :
          ${new Date().toLocaleDateString("id-ID")}
        </p>

        <table>

          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Kategori</th>
            <th>Siklus</th>
            <th>Harga</th>
            <th>Status</th>
          </tr>

          ${rows}

        </table>

        <p class="footer">
          Total Langganan :
          ${subscriptions.length}
        </p>

        <p class="footer">
          Total Pengeluaran :
          Rp ${total.toLocaleString("id-ID")}
        </p>

      </body>

      </html>
    `;

    const { uri } = await Print.printToFileAsync({
      html,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    }

    return uri;
  }
}

export default new ExportService();
