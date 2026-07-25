import DashboardService from "../services/DashboardService";

class DashboardApi {

  async getMonthlyExpense() {
    return await DashboardService.getMonthlyExpense();
  }

  async getTotalActiveSubscription() {
    return await DashboardService.getTotalActiveSubscription();
  }

  async getUpcomingPayments(limit = 5) {
    return await DashboardService.getUpcomingPayments(limit);
  }

  async getCategorySummary() {
    return await DashboardService.getCategorySummary();
  }

}

export default new DashboardApi();