import DashboardService from "../services/DashboardService";

export const testDashboard = async () => {

  console.log("===== DASHBOARD =====");

  console.log(
    "Total Aktif :",
    await DashboardService.getTotalActiveSubscription()
  );

  console.log(
    "Total Bulanan :",
    await DashboardService.getMonthlyExpense()
  );

  console.log(
    "Upcoming :",
    await DashboardService.getUpcomingPayments()
  );

  console.log(
    "Kategori :",
    await DashboardService.getCategorySummary()
  );

};