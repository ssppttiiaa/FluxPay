import SubscriptionRepository from "../repositories/SubscriptionRepository";

class DashboardService {

  // Total subscription aktif
  async getTotalActiveSubscription() {

    const subscriptions =
      await SubscriptionRepository.getAllActive();

    return subscriptions.length;

  }

  // Total pengeluaran bulanan
  async getMonthlyExpense() {

    const subscriptions =
      await SubscriptionRepository.getAllActive();

    let total = 0;

    subscriptions.forEach(item => {

      total += Number(item.price);

    });

    return total;

  }

  // Tagihan mendatang
  async getUpcomingPayments(limit = 5) {

    const subscriptions =
      await SubscriptionRepository.getAllActive();

    subscriptions.sort((a, b) =>

      new Date(a.next_payment_date) -
      new Date(b.next_payment_date)

    );

    return subscriptions.slice(0, limit);

  }

  // Ringkasan kategori
  async getCategorySummary() {

    const subscriptions =
      await SubscriptionRepository.getAllActive();

    const summary = {};

    let grandTotal = 0;

    subscriptions.forEach(item => {

      grandTotal += Number(item.price);

      if (!summary[item.category]) {

        summary[item.category] = {

          category: item.category,
          total: 0,
          count: 0,
          percentage: 0,

        };

      }

      summary[item.category].total += Number(item.price);

      summary[item.category].count++;

    });

    Object.keys(summary).forEach(key => {

      summary[key].percentage = grandTotal === 0
        ? 0
        : Math.round(
          (summary[key].total / grandTotal) * 100
        );

    });

    return Object.values(summary);

  }

}

export default new DashboardService();