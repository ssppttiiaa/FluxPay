import SubscriptionRepository from "../repositories/SubscriptionRepository";
import { diffDays, formatDate } from "../utils/dateUtils";

class NotificationService {
  // async getReminders() {

  //   const subscriptions = await SubscriptionRepository.getAllActive();

  //   const reminders = [];

  //   subscriptions.forEach((item) => {

  //     const days = diffDays(item.next_payment_date);

  //     if (days === 7 || days === 3 || days === 1) {

  //       reminders.push({

  //         id: item.id,

  //         title: `Tagihan ${item.name}`,

  //         message: `${item.name} akan ditagih ${days} hari lagi`,

  //         days,

  //         date: formatDate(item.next_payment_date),

  //         price: item.price,

  //         category: item.category,

  //       });

  //     }

  //   });

  //   reminders.sort((a, b) => a.days - b.days);

  //   return reminders;

  // }

  // async getExpiredSubscriptions() {

  //   const subscriptions = await SubscriptionRepository.getAllActive();

  //   return subscriptions.filter(item => diffDays(item.next_payment_date) < 0);

  // }

  // async getTodayReminderCount() {

  //   const reminders = await this.getReminders();

  //   return reminders.length;

  // }

  async getReminders() {
    return [];
  }

  async getExpiredSubscriptions() {
    return [];
  }

  async getTodayReminderCount() {
    return 0;
  }
}

export default new NotificationService();
