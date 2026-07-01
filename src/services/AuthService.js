import UserRepository from "../repositories/UserRepository";
import UserModel from "../models/UserModel";
import SessionService from "./SessionService";

class AuthService {

  async register(data) {

    // Cek email sudah ada atau belum
    const user = await UserRepository.getByEmail(data.email);

    if (user) {
      throw new Error("Email sudah terdaftar.");
    }

    const newUser = new UserModel({

      full_name: data.full_name,

      email: data.email,

      password: data.password,

      phone: data.phone,

      created_at: new Date().toISOString(),

    });

    const id = await UserRepository.create(newUser);

    return id;
  }

  async login(email, password) {

    const user = await UserRepository.login(email, password);

    if (!user) {
      throw new Error("Email atau Password salah.");
    }

    // Simpan session
    SessionService.setCurrentUser(user);

    return user;
  }

  logout() {
    SessionService.clearSession();
  }

}

export default new AuthService();