import LocalNotificationService from "../services/LocalNotificationService";

export const testLocalNotification = async () => {

    console.log("===== LOCAL NOTIFICATION =====");

    const granted =
        await LocalNotificationService.requestPermission();

    if (!granted) {

        console.log("Permission ditolak");

        return;

    }

    await LocalNotificationService.sendNotification(

        "FluxPay",

        "Ini adalah notifikasi percobaan."

    );

    console.log("Notifikasi berhasil dikirim");

}