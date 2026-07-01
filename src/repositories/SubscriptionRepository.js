import { getDatabase } from "../database/database";
import SubscriptionModel from "../models/SubscriptionModel";

class SubscriptionRepository {

  async create(subscription) {
    const db = await getDatabase();

    const result = await db.runAsync(
      `INSERT INTO subscriptions
      (
        name,
        price,
        category,
        billing_cycle,
        start_date,
        next_payment_date,
        reminder_days,
        status,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        subscription.name,
        subscription.price,
        subscription.category,
        subscription.billing_cycle,
        subscription.start_date,
        subscription.next_payment_date,
        subscription.reminder_days,
        subscription.status,
        subscription.created_at,
      ]
    );

    return result.lastInsertRowId;
  }

  async update(subscription) {
    const db = await getDatabase();

    return await db.runAsync(
      `UPDATE subscriptions
      SET
        name=?,
        price=?,
        category=?,
        billing_cycle=?,
        start_date=?,
        next_payment_date=?,
        reminder_days=?,
        status=?
      WHERE id=?`,
      [
        subscription.name,
        subscription.price,
        subscription.category,
        subscription.billing_cycle,
        subscription.start_date,
        subscription.next_payment_date,
        subscription.reminder_days,
        subscription.status,
        subscription.id,
      ]
    );
  }

  async delete(id) {
    const db = await getDatabase();

    return await db.runAsync(
      `DELETE FROM subscriptions WHERE id=?`,
      [id]
    );
  }

  async getById(id) {
    const db = await getDatabase();

    const result = await db.getFirstAsync(
      `SELECT *
       FROM subscriptions
       WHERE id=?`,
      [id]
    );

    return SubscriptionModel.fromDatabase(result);
  }

  async getAll() {
    const db = await getDatabase();

    const result = await db.getAllAsync(
      `SELECT *
       FROM subscriptions
       ORDER BY created_at DESC`
    );

    return result.map(item => SubscriptionModel.fromDatabase(item));
  }

  async getAllActive() {
    const db = await getDatabase();

    const result = await db.getAllAsync(
      `SELECT *
       FROM subscriptions
       WHERE status='active'
       ORDER BY next_payment_date ASC`
    );

    return result.map(item => SubscriptionModel.fromDatabase(item));
  }

  async getInactiveSubscriptions() {
    const db = await getDatabase();

    const result = await db.getAllAsync(
      `SELECT *
       FROM subscriptions
       WHERE status='inactive'`
    );

    return result.map(item => SubscriptionModel.fromDatabase(item));
  }

  async getByCategory(category) {
    const db = await getDatabase();

    const result = await db.getAllAsync(
      `SELECT *
       FROM subscriptions
       WHERE category=?`,
      [category]
    );

    return result.map(item => SubscriptionModel.fromDatabase(item));
  }

  async getByBillingCycle(cycle) {
    const db = await getDatabase();

    const result = await db.getAllAsync(
      `SELECT *
       FROM subscriptions
       WHERE billing_cycle=?`,
      [cycle]
    );

    return result.map(item => SubscriptionModel.fromDatabase(item));
  }

  async search(keyword) {
    const db = await getDatabase();

    const result = await db.getAllAsync(
      `SELECT *
       FROM subscriptions
       WHERE name LIKE ?
       ORDER BY name`,
      [`%${keyword}%`]
    );

    return result.map(item => SubscriptionModel.fromDatabase(item));
  }

  async count() {
    const db = await getDatabase();

    return await db.getFirstAsync(
      `SELECT COUNT(*) AS total
       FROM subscriptions`
    );
  }

  async updateStatus(id, status) {
    const db = await getDatabase();

    return await db.runAsync(
      `UPDATE subscriptions
       SET status=?
       WHERE id=?`,
      [status, id]
    );
  }

  async getUpcomingSubscriptions() {
    const db = await getDatabase();

    const result = await db.getAllAsync(
      `SELECT *
       FROM subscriptions
       WHERE status='active'
       ORDER BY next_payment_date ASC`
    );

    return result.map(item => SubscriptionModel.fromDatabase(item));
  }
}

export default new SubscriptionRepository();