import ExportService from "../services/ExportService";

class ExportApi {
  async exportPDF() {
    return await ExportService.exportPDF();
  }
}

export default new ExportApi();
