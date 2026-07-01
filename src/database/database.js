import * as SQLite from "expo-sqlite";

let database = null;

/**
 * Membuka koneksi database SQLite.
 * Database hanya dibuat satu kali (Singleton).
 */
export const getDatabase = async () => {
  try {
    if (!database) {
      database = await SQLite.openDatabaseAsync("fluxpay.db");
      console.log("✅ Database berhasil dibuka.");
    }

    return database;
  } catch (error) {
    console.error("❌ Gagal membuka database:", error);
    throw error;
  }
};

/**
 * Menutup koneksi database (opsional).
 */
export const closeDatabase = async () => {
  try {
    if (database) {
      await database.closeAsync();
      database = null;
      console.log("✅ Database ditutup.");
    }
  } catch (error) {
    console.error("❌ Gagal menutup database:", error);
  }
};