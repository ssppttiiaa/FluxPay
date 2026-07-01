import { DUMMY_SUBSCRIPTIONS } from '../utils/dummyData';

export default {
  // Ambil semua data (untuk fitur Export CSV nanti)
  getAll: async () => {
    return DUMMY_SUBSCRIPTIONS;
  },

  // Ambil data yang statusnya aktif saja (untuk Dashboard & Reminder)
  getAllActive: async () => {
    return DUMMY_SUBSCRIPTIONS.filter(item => item.status === 'active');
  }
};