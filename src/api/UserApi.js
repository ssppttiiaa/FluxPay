import UserService from "../services/UserService";

class UserAPI {

  async profile(id) {
    return await UserService.profile(id);
  }

  async update(user) {
    return await UserService.update(user);
  }

}

export default new UserAPI();