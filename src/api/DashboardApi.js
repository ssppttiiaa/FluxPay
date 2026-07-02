import DashboardService from "../services/DashboardService";

class DashboardAPI {

  async monthlyExpense() {
    return await DashboardService.getMonthlyExpense();
  }

  async totalActive() {
    return await DashboardService.getTotalActiveSubscription();
  }

  async upcomingPayments() {
    return await DashboardService.getUpcomingPayments();
  }

  async categorySummary() {
    return await DashboardService.getCategorySummary();
  }

}

export default new DashboardAPI();