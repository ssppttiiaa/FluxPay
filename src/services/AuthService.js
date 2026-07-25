import UserRepository from "../repositories/UserRepository";
import UserModel from "../models/UserModel";
import SessionService from "./SessionService";

class AuthService {
  async register(data) {
    const user = await UserRepository.getByEmail(data.email);

    if (user) {
      throw new Error("Email sudah terdaftar.");
    }

    const newUser = new UserModel({
      full_name: data.full_name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      photo: "",
      created_at: new Date().toISOString(),
    });

    return await UserRepository.create(newUser);
  }

  async login(email, password) {
    console.log("EMAIL INPUT :", email);
    console.log("PASSWORD INPUT :", password);

    const user = await UserRepository.login(email, password);

    console.log("HASIL LOGIN :", user);

    if (!user) {
      throw new Error("Email atau Password salah.");
    }

    await SessionService.setCurrentUser(user);

    return user;
  }

  async logout() {
    return await SessionService.clearSession();
  }

  async getCurrentUser() {
    return await SessionService.getCurrentUser();
  }

  async isLogin() {
    return await SessionService.isLogin();
  }
}

export default new AuthService();
