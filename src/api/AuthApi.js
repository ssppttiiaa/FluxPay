import AuthService from "../services/AuthService";

class AuthAPI {

  async login(email, password) {
    return await AuthService.login(email, password);
  }

  async register(user) {
    return await AuthService.register(user);
  }

  async logout() {
    return await AuthService.logout();
  }

  async currentUser() {
    return await AuthService.getCurrentUser();
  }

  async isLogin() {
    return await AuthService.isLogin();
  }

}

export default new AuthAPI();