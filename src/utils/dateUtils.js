import dayjs from 'dayjs';
import 'dayjs/locale/id'; 

dayjs.locale('id');

// Menghitung selisih hari dari hari ini ke tanggal jatuh tempo
export const getDaysDifference = (targetDateString) => {
  const today = dayjs().startOf('day');
  const target = dayjs(targetDateString).startOf('day');
  return target.diff(today, 'day');
};

// Mengubah format "2026-10-28" jadi "28 Oktober 2026"
export const formatDateIndo = (dateString) => {
  if (!dateString) return '-';
  return dayjs(dateString).format('DD MMMM YYYY');
};