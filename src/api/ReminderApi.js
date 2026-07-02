import NotificationService from "../services/NotificationService";

class ReminderAPI {

  async checkReminder() {
    return await NotificationService.checkReminders();
  }

}

export default new ReminderAPI();