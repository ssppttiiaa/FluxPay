import {
    diffDays,
    formatDate,
    getToday,
    isReminder1,
    isReminder3,
    isReminder7,
    isExpired
} from "../utils/dateUtils";

export const testReminder = async () => {

    console.log("===== DATE UTILS =====");

    const date = "2026-07-08";

    console.log("Hari ini :", getToday());

    console.log("Tanggal :", formatDate(date));

    console.log("Selisih Hari :", diffDays(date));

    console.log("Reminder H-7 :", isReminder7(date));

    console.log("Reminder H-3 :", isReminder3(date));

    console.log("Reminder H-1 :", isReminder1(date));

    console.log("Expired :", isExpired(date));

};