import ExportService from "../services/ExportService";

class ExportAPI {

  async exportCSV() {
    return await ExportService.exportCSV();
  }

}

export default new ExportAPI();