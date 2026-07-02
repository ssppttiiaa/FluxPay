import UserRepository from "../repositories/UserRepository";

class UserAPI {

  async profile(id) {
    return await UserRepository.getById(id);
  }

  async update(user) {
    return await UserRepository.update(user);
  }

}

export default new UserAPI();