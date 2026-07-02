import * as Notifications from "expo-notifications";
import NotificationService from "./NotificationService";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class LocalNotificationService {

  async requestPermission() {

    const { status } =
      await Notifications.requestPermissionsAsync();

    return status === "granted";

  }

  async sendNotification(title, body) {

    await Notifications.scheduleNotificationAsync({

      content: {
        title,
        body,
      },

      trigger: null,

    });

  }

  async checkAndNotify() {

    const reminders = await NotificationService.getReminders();

    if (reminders.length === 0) {

      console.log("Tidak ada reminder hari ini");

      return;

    }

    for (const reminder of reminders) {

      await this.sendNotification(

        reminder.title,

        reminder.message

      );

    }

  }

}

export default new LocalNotificationService();