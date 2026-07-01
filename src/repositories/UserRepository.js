import { getDatabase } from "../database/database";
import UserModel from "../models/UserModel";

class UserRepository {

  async create(user) {

    const db = await getDatabase();

    const result = await db.runAsync(
      `INSERT INTO users
      (
        full_name,
        email,
        password,
        phone,
        created_at
      )
      VALUES (?, ?, ?, ?, ?)`,
      [
        user.full_name,
        user.email,
        user.password,
        user.phone,
        user.created_at,
      ]
    );

    return result.lastInsertRowId;

  }

  async getById(id) {

    const db = await getDatabase();

    const result = await db.getFirstAsync(

      `SELECT * FROM users WHERE id=?`,

      [id]

    );

    return UserModel.fromDatabase(result);

  }

  async getByEmail(email) {

    const db = await getDatabase();

    const result = await db.getFirstAsync(

      `SELECT * FROM users WHERE email=?`,

      [email]

    );

    return UserModel.fromDatabase(result);

  }

  async login(email, password) {

    const db = await getDatabase();

    const result = await db.getFirstAsync(

      `SELECT * FROM users
       WHERE email=?
       AND password=?`,

      [email, password]

    );

    return UserModel.fromDatabase(result);

  }

  async update(user) {

    const db = await getDatabase();

    return await db.runAsync(

      `UPDATE users
       SET
        full_name=?,
        phone=?
       WHERE id=?`,

      [

        user.full_name,

        user.phone,

        user.id

      ]

    );

  }

  async delete(id) {

    const db = await getDatabase();

    return await db.runAsync(

      `DELETE FROM users WHERE id=?`,

      [id]

    );

  }

}

export default new UserRepository();