import ExportService from "../services/ExportService";

export const testExport = async () => {

  console.log("===== TEST EXPORT =====");

  try {

    const uri = await ExportService.exportCSV();

    console.log("✅ Export berhasil");
    console.log(uri);

  } catch (error) {

    console.log("❌ Export gagal");
    console.log(error);

  }

};