import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

const REMINDER_DAYS = [7, 3, 1];

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

  async setupChannel() {
    if (Platform.OS !== "android") {
      return;
    }

    await Notifications.setNotificationChannelAsync(
      "subscription-reminders",
      {
        name: "Pengingat Langganan",
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
      }
    );
  }

  async initialize() {
    const granted = await this.requestPermission();

    if (!granted) {
      console.log(
        "❌ Permission notifikasi tidak diberikan"
      );
      return false;
    }

    await this.setupChannel();

    console.log(
      "✅ Local notification berhasil diinisialisasi"
    );

    return true;
  }

  async scheduleSubscriptionReminders(subscription) {

    const granted = await this.initialize();

    if (!granted) {
      return;
    }

    const dueDate = this.parseDate(
      subscription.next_payment_date
    );

    if (!dueDate) {
      console.log(
        "❌ Tanggal pembayaran tidak valid:",
        subscription.next_payment_date
      );
      return;
    }

    // Hapus jadwal lama untuk subscription ini
    await this.cancelSubscriptionReminders(
      subscription.id
    );

    for (const daysBefore of REMINDER_DAYS) {

      const notificationDate =
        new Date(dueDate);

      notificationDate.setDate(
        notificationDate.getDate() - daysBefore
      );

      // Jangan jadwalkan tanggal yang sudah lewat
      if (notificationDate <= new Date()) {
        continue;
      }

      const notificationId =
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "FluxPay",
            body:
              daysBefore === 1
                ? `${subscription.name} akan jatuh tempo besok.`
                : `${subscription.name} akan jatuh tempo ${daysBefore} hari lagi.`,
            data: {
              type: "subscription-reminder",
              subscriptionId: subscription.id,
              daysBefore,
            },
          },

          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: notificationDate,
            channelId: "subscription-reminders",
          },
        });

      console.log(
        `✅ Reminder H-${daysBefore} dijadwalkan:`,
        notificationDate,
        notificationId
      );
    }
  }

  async cancelSubscriptionReminders(subscriptionId) {

    const scheduled =
      await Notifications.getAllScheduledNotificationsAsync();

    for (const notification of scheduled) {

      const data =
        notification.content?.data;

      if (
        data?.type === "subscription-reminder" &&
        String(data.subscriptionId) ===
        String(subscriptionId)
      ) {

        await Notifications.cancelScheduledNotificationAsync(
          notification.identifier
        );

        console.log(
          "🗑️ Reminder dibatalkan:",
          notification.identifier
        );
      }
    }
  }

  async sendNotification(title, body) {

    await this.initialize();

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: null,
    });
  }

  parseDate(dateString) {

    if (!dateString) {
      return null;
    }

    const parts =
      String(dateString).split("-");

    if (parts.length !== 3) {
      return null;
    }

    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    const date =
      new Date(year, month - 1, day);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date;
  }
}

export default new LocalNotificationService();