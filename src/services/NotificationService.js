import * as Notifications from 'expo-notifications';
import MockRepo from '../repositories/MockSubscriptionRepository';
import { formatIDR } from '../utils/currencyUtils';
import { getDaysDifference } from '../utils/dateUtils';

// Aturan supaya pop-up notifikasi tetap muncul walaupun aplikasi sedang dibuka
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const requestNotificationPermission = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  return finalStatus === 'granted';
};

export const checkAndTriggerReminders = async () => {
  try {
    const activeSubs = await MockRepo.getAllActive();
    let jumlahNotifTerkesekusi = 0;

    for (const item of activeSubs) {
      const selisihHari = getDaysDifference(item.next_payment_date);

      // Logika utama kamu: Cek apakah hari ini pas H-7, H-3, atau H-1
      if (selisihHari === 7 || selisihHari === 3 || selisihHari === 1) {
        
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `⚠️ Pengingat Tagihan (${item.name})`,
            body: `Tagihan ${formatIDR(item.price)} jatuh tempo ${selisihHari} hari lagi!`,
          },
          trigger: null, // null = tembakkan detik ini juga ke layar HP
        });

        jumlahNotifTerkesekusi++;
      }
    }

    return { status: 'success', triggeredCount: jumlahNotifTerkesekusi };
  } catch (error) {
    console.error("Gagal menjalankan sistem reminder:", error);
    return { status: 'error', message: error.message };
  }
};