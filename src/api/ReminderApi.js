import NotificationService from "../services/NotificationService";

class ReminderAPI {

  async getReminders() {
    return await NotificationService.getReminders();
  }

  async getExpired() {
    return await NotificationService.getExpiredSubscriptions();
  }

  async getTodayCount() {
    return await NotificationService.getTodayReminderCount();
  }

}

export default new ReminderAPI();