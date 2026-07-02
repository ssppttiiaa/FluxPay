import SubscriptionRepository from "../repositories/SubscriptionRepository";

class DashboardService {

  // Total subscription aktif
  async getTotalActiveSubscription() {
    const subscriptions = await SubscriptionRepository.getAllActive();
    return subscriptions.length;
  }

  // Total pengeluaran per bulan
  async getMonthlyExpense() {
    const subscriptions = await SubscriptionRepository.getAllActive();

    let total = 0;

    subscriptions.forEach(item => {
      total += item.price;
    });

    return total;
  }

  // Subscription yang akan datang
  async getUpcomingPayments(limit = 5) {
    const subscriptions = await SubscriptionRepository.getAllActive();

    subscriptions.sort((a, b) => {
      return new Date(a.next_payment_date) - new Date(b.next_payment_date);
    });

    return subscriptions.slice(0, limit);
  }

  // Ringkasan kategori
  async getCategorySummary() {

    const subscriptions = await SubscriptionRepository.getAllActive();

    const result = {};

    subscriptions.forEach(item => {

      if (!result[item.category]) {

        result[item.category] = {
          total: 0,
          count: 0
        };

      }

      result[item.category].total += item.price;
      result[item.category].count++;

    });

    return result;
  }

}

export default new DashboardService();