import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "@current_user";

class SessionService {

  async setCurrentUser(user) {

    await AsyncStorage.setItem(
      USER_KEY,
      JSON.stringify(user)
    );

  }

  async getCurrentUser() {

    const data = await AsyncStorage.getItem(USER_KEY);

    if (!data) return null;

    return JSON.parse(data);

  }

  async isLogin() {

    const user = await this.getCurrentUser();

    return user !== null;

  }

  async clearSession() {

    await AsyncStorage.removeItem(USER_KEY);

  }

}

export default new SessionService();