import NotificationService from "../services/NotificationService";

export const testNotification = async () => {

    console.log("===== NOTIFICATION =====");

    const reminders = await NotificationService.getReminders();

    console.log("Reminder :");
    console.log(reminders);

    const expired = await NotificationService.getExpiredSubscriptions();

    console.log("Expired :");
    console.log(expired);

    const total = await NotificationService.getTodayReminderCount();

    console.log("Total Reminder :", total);

};