import { getDatabase } from "./database";

/**
 * Membuat seluruh tabel yang dibutuhkan aplikasi.
 */
export const createTables = async () => {
  try {
    const db = await getDatabase();

  // USERS
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      phone TEXT,
      created_at TEXT NOT NULL
    );
  `);

  // SUBSCRIPTIONS
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      user_id INTEGER NOT NULL,

      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      category TEXT NOT NULL,
      billing_cycle TEXT NOT NULL,

      start_date TEXT NOT NULL,
      next_payment_date TEXT NOT NULL,

      reminder_days INTEGER DEFAULT 7,

      status TEXT DEFAULT 'active',

      created_at TEXT NOT NULL,

      FOREIGN KEY(user_id)
      REFERENCES users(id)
    );
  `);

  console.log("✅ Semua tabel berhasil dibuat");
};

    // ==========================
    // TABEL SUBSCRIPTIONS
    // ==========================
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        price INTEGER NOT NULL,

        category TEXT NOT NULL,

        billing_cycle TEXT NOT NULL,

        start_date TEXT NOT NULL,

        next_payment_date TEXT NOT NULL,

        reminder_days INTEGER DEFAULT 7,

        status TEXT DEFAULT 'active',

        created_at TEXT NOT NULL
      );
    `);

    // ==========================
    // INDEX
    // ==========================

    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_subscription_name
      ON subscriptions(name);
    `);

    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_subscription_category
      ON subscriptions(category);
    `);

    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_subscription_status
      ON subscriptions(status);
    `);

    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_subscription_date
      ON subscriptions(next_payment_date);
    `);

    console.log("✅ Database & tabel siap.");
  } catch (error) {
    console.log("❌ Migration Error:", error);
  }
};

/**
 * Menghapus tabel subscriptions.
 * Digunakan saat development/testing.
 */
export const dropTables = async () => {
  try {
    const db = await getDatabase();

    await db.execAsync(`
      DROP TABLE IF EXISTS subscriptions;
    `);

    console.log("🗑️ Table subscriptions dihapus.");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Reset database.
 * Menghapus lalu membuat ulang tabel.
 */
export const resetDatabase = async () => {
  try {
    await dropTables();
    await createTables();

    console.log("🔄 Database berhasil di-reset.");
  } catch (error) {
    console.log(error);
  }
};